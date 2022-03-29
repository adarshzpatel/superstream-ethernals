import { useAddress, useNFTCollection } from "@thirdweb-dev/react";
import { NFTMetadataOwner } from "@thirdweb-dev/sdk";
import { BigNumber } from "ethers";
import { NextRouter, useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ProfileInfo from "../../components/profile/ProfileInfo";

import useSuperstreamContract from "../../hooks/useSuperstreamContract";
import useLivpeerApi from "../../hooks/useLivepeerApi";
import VideoCard from "../../components/VideoCard";
import { useRecoilState } from "recoil";
import { videosListState } from "../../recoil/states";
import moment from "moment";
import Link from "next/link";
import Videojs from "../../components/video-players/Videojs";
import Spinner from "../../components/Spinner";

type Props = {};

const ProfilePage = (props: Props) => {
  const router: NextRouter = useRouter();
  const { username } = router.query;
  const superstream = useSuperstreamContract();
  const livepeer = useLivpeerApi();
  const currentAccount = useAddress();
  const [profile, setProfile] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [hasProfile, setHasProfile] = useState<boolean>(false);
  const [stream, setStream] = useState<any>();

  const [videos, setVideos] = useRecoilState(videosListState);


  const checkIfUserHasProfile = async (): Promise<void> => {
    setLoading(true);
    try {
      const _profile:any = await superstream.getProfileByUsername(username);
      setProfile(_profile);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (username) {
      checkIfUserHasProfile();
    }
  }, [username]);

  const getStreamStatus = async () => {
    setLoading(true);
    const _stream = await livepeer.fetchStreamStatus(profile.streamId);
    setStream(_stream);
    console.log(stream);
    setLoading(false);
  };

  useEffect(() => {
    if (profile?.streamId) {
      getStreamStatus();
    }
  }, [profile]);

 
  

  if (profile) {
    return (
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
        <div className="static lg:col-span-2  w-full ">
          <div className="relative select-none overflow-hidden mb-4 flex rounded-md items-center justify-center bg-gradient-to-br w-full h-full from-sky-300 via-violet-500 to-fuchsia-500">
            <img
              src={"https://ipfs.io/ipfs/"+profile?.pfp}
              alt=""
              className="absolute object-cover object-center w-full blur-3xl"
            />
            <div className=" h-80  z-10  flex items-center justify-center  ">
              {stream?.isActive ? (
                <div className="relative h-96 aspect-video">
                <Videojs
                  src={
                    `https://cdn.livepeer.com/hls/${stream?.playbaclId}/index.m3u8`
                  }
                  />
                   </div>
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
          <h6 className="text-lg text-gray-300 border-b pb-3 border-1 border-gray-600 uppercase font-display tracking-wider fond-bold">
            More from {profile?.username}
          </h6>
          <div className="hidden lg:flex flex-col w-full gap-4 ">
            {videos?.map((data) => {
              if (data?.owner == profile?.owner) {
                return (
                  <Link href={`/video?id=${data?.metadata?.id.toString()}`}>
                <div className="w-full cursor-pointer">
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
            </Link>
                );
              }
            })}
          </div>
        </div>
      </div>
    );
  }

  return <div className="h-[85vh] flex flex-col gap-2 items-center justify-center"><Spinner className="w-12 fill-slate-400 mr-1 animate-spin text-slate-700" />Fetching profile...</div>;
};

export default ProfilePage;
