import React from "react";
import {fetchStreamStatus} from "../utils/livepeerApi"



const useLivestream = (streamId:string) => {
  const [isLoading,setIsLoading] = React.useState<boolean>(true);
  const [isActive,setIsActive] = React.useState<boolean>(false)
  const [playbackId,setPlaybackId] = React.useState<string>('');
  const [error,setError] = React.useState<string>('');
  const [name,setName] = React.useState<string>('');
  const [lastSeen,setLastSeen] = React.useState<number>();

  React.useEffect(()=>{
    setIsLoading(true);
    fetchStreamStatus(streamId).then((result) => {
      const {data} = result;
      setIsActive(data.isActive);
      setName(data.name);
      setPlaybackId(data.playbackId);
      setLastSeen(data.lastSeen);
    }).catch((err) => {
      console.error(err);
      setError(err?.message || err );
    });
    setIsLoading(false);
  },[streamId])
  
  return {isLoading,error,playbackId,isActive,lastSeen,name};

}

export default useLivestream;