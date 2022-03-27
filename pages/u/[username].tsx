import { useAddress, useNFTCollection } from "@thirdweb-dev/react";
import { NFTMetadataOwner } from "@thirdweb-dev/sdk";
import { BigNumber } from "ethers";
import { NextRouter, useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ProfileInfo from "../../components/profile/ProfileInfo";
import { PROFILE_NFT_ADDRESS } from "../../constants";
import useSuperstreamContract from "../../hooks/useSuperstreamContract";
import LiveVideo from "../../components/video-players/LiveVideo";
import useLivpeerApi from "../../hooks/useLivepeerApi";
import VideoCard from "../../components/VideoCard";
import { useRecoilState } from "recoil";
import { videosListState } from "../../recoil/states";
import moment from "moment";

type Props = {};

const ProfilePage = (props: Props) => {
  const router: NextRouter = useRouter();
  const { username } = router.query;
  const superstream = useSuperstreamContract();
  const livepeer = useLivpeerApi();
  const currentAccount = useAddress();
  const [profile, setProfile] = useState<NFTMetadataOwner>();
  const [profileId, setProfileId] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [hasProfile, setHasProfile] = useState<boolean>(false);
  const [stream, setStream] = useState<any>();
  const profileNFT = useNFTCollection(PROFILE_NFT_ADDRESS);
  const [videos, setVideos] = useRecoilState(videosListState);

  const getStreamStatus = async () => {
    const _streamId = await superstream.getStreamId(profile?.metadata.name);
    const _stream = await livepeer.fetchStreamStatus(_streamId);
    setStream(_stream);
    console.log(stream);
  };

  useEffect(() => {
    setLoading(true);
    if (profile?.metadata) {
      getStreamStatus();
    }
    setLoading(false);
  }, [profile]);

  const getProfileId = async () => {
    setLoading(true);
    try {
      const pid = await superstream.getProfileId(username);
      console.log("Got Profile Id : " + pid);
      setProfileId(pid);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
    console.log(profile);
  };

  useEffect(() => {
    if (username) {
      console.log("Getting profileId");
      getProfileId();
    }
  }, [username]);

  const checkIfUserHasProfile = async (): Promise<void> => {
    setLoading(true);
    try {
      if (profileId) {
        const _profile = await profileNFT.get(profileId);
        if (_profile) {
          setHasProfile(true);
          console.log("Profile NFT Found");
          setProfile(_profile);
        } else {
          setHasProfile(false);
          console.log("You don't have a Profile ");
        }
      } else {
        console.log("Profile Id Not Found!");
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (profileId) {
      checkIfUserHasProfile();
    }
  }, [profileId]);

  if (profile) {
    return (
      <div className="grid lg:grid-cols-4 grid-cols-1 gap-4">
        <div className="static lg:col-span-3  w-full ">
          <div className="relative select-none overflow-hidden mb-4 flex rounded-md items-center justify-center bg-gradient-to-br w-full h-full from-sky-300 via-violet-500 to-fuchsia-500">
            <img
              src={profile?.metadata.image}
              alt=""
              className="absolute object-cover object-center w-full blur-3xl"
            />
            <div className=" h-80 z-10  flex items-center justify-center  ">
              {stream?.isActive ? (
                <LiveVideo
                  src={
                    stream.playbackId &&
                    `https://cdn.livepeer.com/hls/${stream.playbackId}/index.m3u8`
                  }
                />
              ) : (
                <div className="font-bold font-display uppercase text-4xl">
                  User is Offline !!
                </div>
              )}
            </div>
          </div>
          <ProfileInfo profile={profile} />
        </div>
        <div className="hidden flex-col lg:flex gap-4">
          <h6 className="text-lg text-gray-300 border-b border-1 border-gray-600 uppercase font-display tracking-wider fond-bold">
            More from {profile?.metadata.name}
          </h6>
          <div className="hidden lg:flex flex-col w-full ">
            {videos?.map((data) => {
              if (data?.owner == profile?.owner) {
                return (
                <div className="w-full ">
                    <div className="animate-pulse rounded-lg relative aspect-video mb-2 bg-slate-500  w-full">
                      <img src={data?.metadata?.image} alt="" />
                      <div className="bg-slate-900 text-xs text-white absolute right-2 bottom-2 p-1 rounded-md">
                        {moment
                          .duration(
                            Math.ceil(data?.metadata?.duration / 60) * 60 * 1000
                          )
                          .humanize()}
                      </div>
                    </div>
                    <h6 className="text-lg   overflow-ellipsis flex whitespace-pre-wrap">
                      {data?.metadata?.name.slice(0, 60) +
                        (data?.metadata?.name.length > 60 ? "..." : "")}
                    </h6>
                    <p className="text-gray-400 text-sm ">
                      {moment(data?.metadata?.created_at).fromNow()}{" "}
                    </p>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    );
  }

  return <div>Loading...</div>;
};

export default ProfilePage;
