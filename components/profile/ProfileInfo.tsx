import Avatar from "./Avatar";
import { GiftIcon, HeartIcon } from "@heroicons/react/outline";
import { NFTMetadataOwner } from "@thirdweb-dev/sdk";
import React, { useEffect, useState } from "react";
import { parseAddress } from "../layout/UserMenu";
import SendTip from "../SendTip";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../../recoil/states";
import Copyable from "../Copyable";
import toast from "react-hot-toast";
import useSuperstreamContract from "../../hooks/useSuperstreamContract";
import { useSigner } from "@thirdweb-dev/react";
import {HeartIcon as HeartIconFilled} from "@heroicons/react/solid"

type Props = {
  profile: any
};



const ProfileInfo = ({ profile }: Props) => {
  const [tipModal,setTipModal] = useState<boolean>(false);
  const currentUser = useRecoilValue(currentUserState);
  const {follow} = useSuperstreamContract();
  const signer = useSigner();
  const [isFollowing,setIsFollowing] = useState<boolean>();
  const [isOwner,setIsOwner] = useState<boolean>();


  const isOwnProfile = async () => {
    const result = await currentUser?.profile?.owner === profile?.owner;
    setIsOwner(result);
  
  }

  const handleFollow = async () => {
    if(signer){
      await follow(profile?.username).catch(err=>{
        toast.success("You followed " + profile?.username )
      })
    } else {
      toast("Connect your Metamask !")
    }
  }

  const checkIfFollowing = async  () => {
    const result = await currentUser?.profile?.follows.includes(profile?.username);
    setIsFollowing(result);
  }

  useEffect(()=>{
    if(currentUser?.profile && profile){
      checkIfFollowing();
      isOwnProfile();
    }

  },[currentUser,profile])
  return (
    <div>
      <SendTip isOpen={tipModal} setIsOpen={setTipModal} toUser={profile?.username} toAddress={profile?.owner} />
      <div className="flex items-center gap-4">
        <Avatar src={"https://ipfs.io/ipfs/"+profile?.pfp} />
        <div className="flex-1 font-display">
          <h6 className="text-2xl font-bold">{profile?.username}</h6>
          <p className="text-medium text-gray-400">{profile?.followers.length} Followers  <Copyable text={parseAddress(profile?.owner)} copyText={profile?.owner}/></p>
        </div>
        <div className="flex gap-2">
          {<button disabled={isFollowing} onClick={handleFollow} className="text-lg bg-violet-600 hover:bg-violet-500 group  disabled:text-gray-400  disabled:bg-gray-800  gap-2">
            {!isFollowing && <HeartIcon className="group-hover:scale-110 group-hover:rotate-12 duration-300 ease-out h-6 w-6" />}
            {isFollowing && <HeartIconFilled className="group-hover:scale-110 group-hover:rotate-12 duration-300 ease-out h-6 w-6" />}
            {isFollowing ? "Following" : "Follow"}
          </button>}
          <button onClick={()=>setTipModal(true)} className="text-lg bg-emerald-500 hover:bg-emerald-400 group   gap-2">
            <GiftIcon className="group-hover:scale-110 group-hover:rotate-12 duration-300 ease-out h-6 w-6" />
            Send Tip
          </button>
      </div>
      </div>
      <div className="border-y border-gray-600 mt-4 py-2">
        <h6 className="font-display text-gray-300 font-bold text-lg">About</h6>
        <p className="text-gray-400 text-lg">
          {profile?.bio}
        </p>
      </div>
    </div>
  );
};

export default ProfileInfo;
