import moment from "moment";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Link from 'next/link'
import { useNFTCollection } from "@thirdweb-dev/react";
import { PROFILE_NFT_ADDRESS } from "../constants";
import { NFTMetadataOwner } from "@thirdweb-dev/sdk";


type Props = {
  data:any
};

const VideoCard = ({data}: Props) => {
  const profileNft  = useNFTCollection(PROFILE_NFT_ADDRESS);
  const [user,setUser] = useState<NFTMetadataOwner>();
  const getUser = async () => {
    if(data?.owner){
      const _user =await profileNft.get(data?.metadata?.id.toString());
      setUser(_user);
      console.log(user);
    }
  };

  useEffect(()=>{
    getUser();
  },data)
  console.log(data);
  return (
    <div>
      {" "}
      {/* VideoCard */}
      <Link href="/">
        <div className="p-3 rounded-lg  group hover:scale-105 hover:shadow-xl duration-200 ease-out cursor-pointer  hover:bg-gray-800 max-w-sm">
          <div className="animate-pulse rounded-lg relative aspect-video mb-2 bg-slate-500  w-full">
            <img src={data?.metadata?.image} alt="" />
            <div className="bg-slate-900 text-xs text-white absolute right-2 bottom-2 p-1 rounded-md">
              {moment.duration(Math.ceil(data?.metadata?.duration / 60) *60 *1000).humanize()}
            </div>
          </div>
          <h6 className="text-lg  overflow-ellipsis flex whitespace-pre-wrap">
            {data?.metadata?.name.slice(
              0,
              60
            ) + ( data?.metadata?.name.length > 60 ? "..." : '')}
          </h6>
          <div className="flex gap-2">
            <div className="h-10 w-10 rounded-full bg-gray-600">
            {user?.metadata?.image && <img src={user?.metadata?.image} alt="profile-pic" />}
            </div>
              <div>
          <p
            className="text-gray-
            300 font-display font-bold "
            >
          {user?.metadata.name || "User"}
          </p>
          <p className="text-gray-400 text-sm ">
             {moment(data?.metadata?.created_at).fromNow()}{" "}
          </p>
              </div>
            </div>
        </div>
      </Link>
    </div>
  );
};

export default VideoCard;
