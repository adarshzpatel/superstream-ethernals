import { NextRouter, useRouter } from "next/router";
import React from "react";
import Avatar from "../components/Avatar";
import Layout from "../components/Layout";
import FollowButton from "../components/FollowButton";
import useLivestream from "../hooks/useLivestream"
import VideoJs from "../components/VideoJS";

type Livestream = {
  isActive:boolean
  playbackId:string
  lastSeen:number
  name:string
  error:string
  isLoading:boolean
}


type User ={
  address: string
  isLive:boolean
  follows: string[] // address list
  followers:string[] 
  followerCount:number
  streamKey:string
}

const UserStreamPage = () => {  
  const streamId = "c6e8adc9-9cbc-4c6a-b15a-cddcc6c3eac7"
  const stream:Livestream = useLivestream(streamId);
  const router: NextRouter = useRouter();
  let username = router.query.username
  const [isFollowing,setIsFollowing] = React.useState<boolean>(false);
  
  const toggleFollow = () => {
    setIsFollowing(isFollowing => !isFollowing);
  }
  
  return (
    <Layout>
        <div className="flex items-center justify-center w-full rounded-md bg-black mb-4">
           <VideoJs streamIsActive={stream.isActive} playbackId={stream.playbackId}/>
        </div>
      <div className="mb-8">
      <h1 className="text-2xl font-semibold font-display mb-1">{stream.name}</h1>
      <p className="flex gap-1 text-gray-400 items-center"> 100 Watching |  6 Likes </p>
      </div>
      <div className="flex items-center gap-4">
        <Avatar
          isLive={stream.isActive}
          src="https://pbs.twimg.com/profile_images/1491044018926796805/uBM0c32A_400x400.jpg"
        />
        <div className="flex-1">
          <h2 className="text-xl font-medium">{username}</h2>
          <p className="text-sm text-gray-400">69 Followers</p>
        </div>
        <div>
          <FollowButton isFollowing={isFollowing} toggleFollow={toggleFollow}/>
        </div>
      </div>
    </Layout>
  );
};

export default UserStreamPage;
