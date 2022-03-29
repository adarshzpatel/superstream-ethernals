import {
  EyeIcon,
  GiftIcon,
  HeartIcon,
  ThumbUpIcon,
} from "@heroicons/react/outline";
import { useNFTCollection } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import moment from "moment";
import { NextPage } from "next";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRecoilValue } from "recoil";
import Avatar from "../components/profile/Avatar";
import SendTip from "../components/SendTip";
import Spinner from "../components/Spinner";
import Videojs from "../components/video-players/Videojs";
import { PROFILE_NFT_ADDRESS, STREAM_NFT_ADDRESS } from "../constants";
import useSuperstreamContract from "../hooks/useSuperstreamContract";
import { videosListState } from "../recoil/states";

type Props = {};

const video: NextPage = (props: Props) => {
  const router: NextRouter = useRouter();
  const id = router.query.id;
  const videos = useRecoilValue(videosListState);
  const [currentVideo, setCurrentVideo] = useState<any>({});
  const profileNft = useNFTCollection(PROFILE_NFT_ADDRESS);
  const videoNft = useNFTCollection(STREAM_NFT_ADDRESS);
  const [videoExist, setVideoExist] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [profile, setProfile] = useState<any>();
  const superstream = useSuperstreamContract();
  const [tipModal, setTipModal] = useState<boolean>(false);

  const fetchProfileData = async () => {
    if (currentVideo?.owner) {
      const _user = await profileNft.getOwned(currentVideo?.owner);
      setProfile(_user[0]);
      setLoading(false);
    }
  };

  const handleFollow = () => {
    toast("👩‍💻 Developer is currently working on this feature !!🛠");
  };
  const handleLike = () => {
    toast("👩‍💻 Developer is currently working on this feature !!🛠");
  };

  const fetchVideo = async () => {
    setLoading(true);
    try {
      const _video = await videoNft.get(ethers.BigNumber.from(id));
      setCurrentVideo(_video);
      console.log({ VideoFound: _video });
      setVideoExist(true);
    } catch (err) {
      setVideoExist(false);
      toast.error(err.message);
      console.error(err);
    }
  };

  useEffect(() => {
    if (id) {
      fetchVideo();
    }
  }, [id]);

  useEffect(() => {
    if (currentVideo?.owner) {
      fetchProfileData();
    }
  }, [currentVideo]);

  if (loading) {
    return (
      <div className="h-[90vh] w-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!loading && !videoExist) {
    return (
      <div className="h-[90vh] w-full flex items-center justify-center">
        Video Does not exist.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3  gap-4">
      <SendTip
        isOpen={tipModal}
        setIsOpen={setTipModal}
        toUser={profile?.metadata.name}
        toAddress={profile?.owner}
      />
      <div className="lg:col-span-2">
        {/* Main */}
        <div className="mb-4 h-[480px] flex justify-center bg-black">
          <Videojs
            src={currentVideo?.metadata?.animation_url}
            // poster={currentVideo?.metadata?.image}
          />
        </div>
        <h1 className="text-2xl font-medium leading-relaxed">
          {currentVideo?.metadata?.name}
        </h1>
        <div className="flex justify-between">
          <p className="flex gap-2 items-center text-gray-400">
            {" "}
            <EyeIcon className="h-5 w-5" /> 0 Views |{" "}
            <ThumbUpIcon className="h-5 w-5" /> 0 Likes
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={handleFollow}
              className="bg-violet-600 hover:bg-violet-500"
            >
              <HeartIcon className="h-5 w-5" /> Follow
            </button>
            <button
              onClick={handleLike}
              className="bg-sky-500 hover:bg-sky-400"
            >
              {" "}
              <ThumbUpIcon className="h-5 w-5" /> Like
            </button>
            <button
              onClick={() => setTipModal(true)}
              className="bg-emerald-500 hover:bg-emerald-400"
            >
              {" "}
              <GiftIcon className="h-5 w-5" />
              Tip
            </button>
          </div>
        </div>

        <hr className="border-gray-600 my-4" />

        <div className="flex gap-4">
          <Avatar src={profile?.metadata.image} />
          <div className="flex-1 font-display">
            <Link
              href={
                profile?.metadata?.id
                  ? `/u/${profile.metadata.id.toString()}`
                  : ""
              }
            >
              <h6 className="text-xl mt-2 font-bold">
                {profile?.metadata.name}
              </h6>
            </Link>
            <p className="text  mb-2 font-medium text-gray-300">
              {profile?.owner}
            </p>
            <p className="text-gray-400 font-body ">
              {currentVideo?.metadata.description}
            </p>
          </div>
        </div>
      </div>
      <div className="col-span-1">
        <h6 className="text-lg pb-1 text-gray-300 border-b border-1 border-gray-600 uppercase font-display tracking-wider fond-bold">
          SUGGESTED VIDEOS
        </h6>

        <div className="flex flex-col gap-2 p-2">
          {videos?.map((item) => (
            <Link
              key={item?.metadata?.id.toString()}
              href={`/video?id=${item?.metadata?.id.toString()}`}
            >
              <div className="flex gap-2 cursor-pointer rounded-md p-2 hover:scale-105 hover:bg-slate-800 duration-200 ease-out">
                <div className="h-28 p-2  aspect-video bg-gray-500 animate-pulse rounded-md">
                  <img src={item?.metadata?.image} alt="" />
                </div>
                <div>
                  <h1 className="text-lg font-medium cursor-pointer hover:text-violet-400  ">
                    {item?.metadata?.name}
                  </h1>
                  <p>{item?.metadata?.creator}</p>
                  <p className="text-sm text-gray-400">
                    {moment(new Date(item?.metadata?.created_at)).fromNow()}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default video;
