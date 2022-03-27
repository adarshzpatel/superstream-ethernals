import Avatar from "./Avatar";
import { GiftIcon, HeartIcon } from "@heroicons/react/outline";
import { NFTMetadataOwner } from "@thirdweb-dev/sdk";
import React, { useEffect, useState } from "react";
import { parseAddress } from "../layout/UserMenu";
import SendTip from "../SendTip";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../../recoil/states";

type Props = {
  profile: NFTMetadataOwner;
};



const ProfileInfo = ({ profile }: Props) => {
  const [tipModal,setTipModal] = useState<boolean>(false);
  const currentUser = useRecoilValue(currentUserState);

  const isOwnProfile = async () => {
    if(currentUser?.data?.name == profile?.metadata?.name) return (true) ;
    else return false;
  }

  const follow = () => {

  }
  return (
    <div>
      <SendTip isOpen={tipModal} setIsOpen={setTipModal} toUser={profile?.metadata.name} toAddress={profile?.owner} />
      <div className="flex items-center gap-4">
        <Avatar src={profile?.metadata?.image} />
        <div className="flex-1 font-display">
          <h6 className="text-2xl font-bold">{profile?.metadata?.name}</h6>
          <p className="text-lg font-medium text-gray-400">
            {parseAddress(profile?.owner)}
          </p>
        </div>
        <div className="flex gap-2">
      <button onClick={follow} className="text-lg bg-violet-600 hover:bg-violet-500 group   gap-2">
            <HeartIcon className="group-hover:scale-110 group-hover:rotate-12 duration-300 ease-out h-6 w-6" />
            Follow
          </button>
          <button onClick={()=>setTipModal(true)} className="text-lg bg-emerald-500 hover:bg-emerald-400 group   gap-2">
            <GiftIcon className="group-hover:scale-110 group-hover:rotate-12 duration-300 ease-out h-6 w-6" />
            Send Tip
          </button>
      </div>
      </div>
      <div className="border-y border-gray-600 mt-4 py-2">
        <h6 className="font-display text-gray-300 font-bold text-lg">About</h6>
        <p className="text-gray-400 text-lg">
          {profile?.metadata?.description}
        </p>
      </div>
    </div>
  );
};

export default ProfileInfo;
