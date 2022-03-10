import { HookCallbacks } from "async_hooks";
import React from "react";
import {fetchStreamStatus} from "../utils/livepeerApi"
import useSuperstreamContract from "./useSuperstreamContract";


type Livestream = {
  isLoading:boolean
  isActive:boolean
  streamId: string
  streamKey?: string
  name:string
  playbackId:string
  error:string
  lastSeen:string
  creator_address:string
}

const useLivestream = (streamId:string)=> {

  const contract = useSuperstreamContract();
  const [data,setData] = React.useState<Livestream>();
  const [isLoading,setLoading] = React.useState<boolean>(false);
  const [error,setError] = React.useState<string>('');

  const getLivestreamData = async (streamId:string)=> {
    //Get creator address / user from the smart contract
    setLoading(true);
    const contractData = await contract.fetchStreamById(streamId).catch(err=>setError(err));
    const {name,isActive,playbackId,lastSeen} = await fetchStreamStatus(streamId).catch(err=>setError(err));
    setLoading(false);
    setData({streamId,name,isActive,playbackId,lastSeen,creator_address:contractData.creator_address,isLoading,error})
  }

  React.useEffect(()=>{
    getLivestreamData(streamId);
  },[streamId])
  
  return data;

}

export default useLivestream;