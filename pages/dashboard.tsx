import { useSigner } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import SessionDetails from "../components/dashboard/SessionDetails";
import StreamDetails from "../components/dashboard/StreamDetails";
import Loading from "../components/Loading";
import Spinner from "../components/Spinner";
import useLivpeerApi from "../hooks/useLivepeerApi";
import { currentUserState} from "../recoil/states";

const Dashboard = () => {
  const signer = useSigner();
  const currentUser = useRecoilValue(currentUserState);
  const [loading,setLoading] = useState(true);
  const [stream,setStream] = useState<any>();
  const livepeer = useLivpeerApi();
  const getStreamStatus = async () => {
    setLoading(true);
    const data = await livepeer.fetchStreamStatus(currentUser.profile.streamId);
    setStream(data);
    setLoading(false);
  }

  useEffect(() => {
    if(currentUser?.profile?.streamId){
      getStreamStatus();
    }
  },[currentUser]);


    
  if(!signer){
    return <div className="h-[85vh] flex items-center justify-center text-lg">
      Please Connect your metamask wallet!
    </div>
  }

  if(loading) {
    return <Loading/>
  }


  return (
    <div className="lg:px-4">
      <h1 className="text-3xl  font-display">Dashboard  </h1>
      <hr className="border-gray-600 my-4" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <StreamDetails stream={stream}/>
      <SessionDetails  streamId={currentUser?.profile?.streamId}/>
      </div>
    </div>
  );
};
export default Dashboard;
