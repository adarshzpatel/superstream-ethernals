import { useNFTCollection } from "@thirdweb-dev/react";
import React, { useEffect, useState } from "react";
import VideoCard from "../components/VideoCard";
import { STREAM_NFT_ADDRESS } from "../constants";
import useSuperstreamContract from "../hooks/useSuperstreamContract";
import BigNumber, { ethers } from "ethers";
import { useRecoilState } from "recoil";
import { videosListState } from "../recoil/states";
import { id } from "ethers/lib/utils";

const Home = () => {

 
  return (
    <div className="p-4">
      <div className=" flex  p-8  ease-out duration-500 items-center w-full bg-gradient-to-br rounded-2xl from-violet-800 via-purple-600  to-fuchsia-400">
        <div className="md:w-1/2 flex flex-col">
          <h1 className="text-4xl  font-display mb-2 font-bold">
            Welcome to Superstream ⚡
          </h1>
          <p className="text-violet-200 text-xl">
            {" "}
            A decentralized live streaming platform
          </p>
        </div>
        <div className="w-1/2 h-full border-l-2 -skew-x-12 px-12 font-display   border-white">
          <div className="md:flex hidden flex-col gap-2  justify-center">
            <p> 🔴 Live Stream</p>
            <p> 📢 Publish / Mint Stream NFT </p>
            <p> ✨ Follow your favorite streamers </p>
            <p> 💰 Receive Tips </p>
            <p> 🎫 Subscriptions ( Coming soon !) </p>
            <p> 📨 Super Chat ( Coming soon !) </p>
          </div>
        </div>
      </div>

      <div className="mt-8  gap-4 grid sm:grid-cols-2 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 ">
          {videos.map((item) => (
            <VideoCard key={item.nftId} data={item}/>
          ))}
      </div>
    </div>
  );
};

export default Home;
