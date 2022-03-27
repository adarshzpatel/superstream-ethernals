import { useSigner } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import React from "react";
import { SUPERSTREAM_CONTRACT_ADDRESS } from "../constants";
import SuperstreamContract from "../artifacts/contracts/Superstream.sol/Superstream.json";
import { AlchemyProvider } from "ethers/node_modules/@ethersproject/providers";
import toast from "react-hot-toast";


type SessionData = {likes:number[],views:number,sessionId:string}
const useSuperstreamContract = () => {
  const signer = useSigner();
  const provider = new AlchemyProvider("maticmum", process.env.ALCHEMY_API);
  const contract = new ethers.Contract(
    SUPERSTREAM_CONTRACT_ADDRESS,
    SuperstreamContract.abi,
    signer || provider
  );

  const addProfile = async (
    profileId: number,
    username: string | string[],
    streamId: string,
    streamKey: string
  ): Promise<void> => {
    try {
      const tx = await contract.addProfile(
        profileId,
        username,
        streamId,
        streamKey
      );
      await tx.wait();
      console.log(tx);
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };
  const getProfileId = async (username: string | string[]): Promise<string> => {
    try {
      const profileId = await contract.getProfileId(username);

      return profileId.toString();
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };
  const getStreamId = async (username: string | string[]): Promise<string> => {
    try {
      const streamId = await contract.getStreamId(username);

      return streamId;
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };
  const getStreamKey = async (username: string | string[]): Promise<string> => {
    try {
      const streamKey = await contract.getStreamKey(username);
      return streamKey;
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  const checkIfUsernameExists = async (username: string): Promise<boolean> => {
    try {
      const usernameExists = await contract.usernameTaken(username);
      return usernameExists;
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  const getStreamInfo = async (
    username: string
  ): Promise<{ title: string; thumbnail: string }> => {
    try {
      const streamInfo = await contract.getStreamInfo(username);
      return { thumbnail: streamInfo[0], title: streamInfo[1] };
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  const updateStreamInfo = async (
    username: string,
    title: string,
    thumbnail: string
  ) => {
    try {
      const tx = await contract.updateDefaultStreamInfo(
        username,
        title,
        thumbnail
      );
      await tx.wait();
      toast.success("Stream Info Updated Successfully");
      return;
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  const addStream = async (streamNftId: number, sessionId: string) => {
    try {
      const tx = await contract.addStream(streamNftId, sessionId);
      await tx.wait();
      console.log(tx);
      return;
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  const checkIfPublished = async (sessionId:string|string[]) => {
    try {
      const isPublished = await contract.isPublished(sessionId);
      return isPublished;
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  const like = async (profileId:string,sessionId:string) => {
    try {
      const newLikeCount = await contract.like(profileId,sessionId);
      console.log(newLikeCount);
      return newLikeCount;
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  const follow = async (fromUsername:string,toFollowUsername:string) => {
    try {
      const tx = await contract.like(fromUsername,toFollowUsername);
      await tx.wait();
      console.log(tx);
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };
  

  
  const getSessionData = async (streamNftId:number):Promise<SessionData> => {
    try{
      const response = await contract.getSessionData(streamNftId);

      return {likes:response.likes,views:response.views.toNumber(),sessionId:response.sessionId};
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };
  const getSessionWithViewIncrement = async (streamNftId:number):Promise<void>=> {
    try{
      const response = await contract.getSessionDataWithViewIncrement(streamNftId);
      console.log(response);
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  const sendTip = async (toAddress:string,amount:number) => {
    try{
      const _amount = ethers.utils.parseEther(amount.toString());
      const response = await contract.tip(toAddress,_amount);
      await response.wait();
      console.log(response);

    } catch (err) {
      console.error(err);
      toast.error(err.data.message);
    }
  }
  
  return {
    contract,
    addProfile,
    getProfileId,
    getStreamId,
    getStreamKey,
    checkIfUsernameExists,
    getStreamInfo,
    updateStreamInfo,
    addStream,
    checkIfPublished,
    like,
    follow,
    getSessionData,
    getSessionWithViewIncrement,
    sendTip
  };
};

export default useSuperstreamContract;
