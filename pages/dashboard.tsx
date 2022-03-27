import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import SessionDetails from "../components/dashboard/SessionDetails";

import StreamDetails from "../components/dashboard/StreamDetails";
import useLivpeerApi from "../hooks/useLivepeerApi";
import useSuperstreamContract from "../hooks/useSuperstreamContract";
import { currentUserState } from "../recoil/states";

type Props = {};

const dashboard: NextPage = (props: Props) => {
  const currentUser = useRecoilValue(currentUserState);
  const [streamId, setStreamId] = useState<string>();
  const [streamStatus, setStreamStatus] = useState<any>({});
  const superstream = useSuperstreamContract();
  const livepeer = useLivpeerApi();

  const fetchStreamId = async () => {
    const _streamId = await superstream.getStreamId(currentUser.data.name);
    setStreamId(_streamId);
    console.log({_streamId});
  };

 

  const fetchStream = async () => {
    const _status = await livepeer.fetchStreamStatus(streamId);
    console.log({_status});
    setStreamStatus(_status);
  };

  useEffect(() => {
    if (currentUser?.data?.name) {
      fetchStreamId();
    }
  }, [currentUser]);

  useEffect(() => {
    if (streamId) {
      setInterval(()=>{
        fetchStream();
      },20000)
      
    }
  }, [streamId]);

  return (
    <div className="lg:px-4">
      <h1 className="text-3xl  font-display">Dashboard  </h1>
      <hr className="border-gray-600 my-4" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

      <StreamDetails
    username={currentUser?.data?.name}
      status={streamStatus?.isActive}
      streamKey={streamStatus?.streamKey}
      lastSeen={streamStatus?.lastSeen}
      />
      {/* <hr className="border-gray-600 my-4" /> */}
      <SessionDetails streamId={streamId} />
      </div>
    </div>
  );
};
export default dashboard;
