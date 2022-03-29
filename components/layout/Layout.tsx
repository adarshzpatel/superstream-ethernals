import { useAddress, useNFTCollection, useSigner } from "@thirdweb-dev/react";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { STREAM_NFT_ADDRESS } from "../../constants";
import useSuperstreamContract from "../../hooks/useSuperstreamContract";
import { currentUserState, videosListState } from "../../recoil/states";
import Header from "./Header";

import Sidebar from "./Sidebar";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const currentUserAddress = useAddress();
  const superstream = useSuperstreamContract();
  const [videos, setVideos] = useRecoilState(videosListState);
  const videoNFTCollection = useNFTCollection(STREAM_NFT_ADDRESS);
  const signer = useSigner();

  const checkIfUserHasProfile = async () => {
    setCurrentUser({ ...currentUser, loading: true });
    console.log("Checking...");
    const _profile: any = await superstream.getProfileByAddress();
    if (_profile?.username) {
      setCurrentUser({
        ...currentUser,
        hasProfile: true,
        loading: false,
        profile: _profile,
      });
    } else {
      setCurrentUser({ ...currentUser, hasProfile: false, loading: false });
    }
  };

  useEffect(() => {
    if (signer) {
      checkIfUserHasProfile();
    }
  }, [signer]);
  // const fetchVideos = async () => {
  //   try {
  //     const _videoNFTs = await videoNFTCollection.getAll();
  //     setVideos(_videoNFTs);
  //     console.log(videos);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   fetchVideos();
  // }, [currentUserAddress]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="w-full flex flex-1">
        <Sidebar />
        <div className="p-4 ml-60  flex-1">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
