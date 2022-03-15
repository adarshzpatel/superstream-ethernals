import React from 'react'
import { useAccount } from 'wagmi'
import Loader from "react-spinners/BeatLoader"
import { PlusIcon } from '@heroicons/react/outline'
import CreateStream from '../components/CreateStream'
import useSuperstreamContract from '../hooks/useSuperstreamContract'
import Copyable from '../components/Copyable'
import { ethers } from 'ethers'
import useLivpeerApi from '../hooks/useLivepeerApi'
type Props = {}

type Stream = {
  id:string
  name:string,
  streamId:string,
  isActive:boolean,
  views:number;
}


const dashboard = (props: Props) => {
  const [streams,setStreams] =  React.useState({});
  const [isCreateModalOpen,setIsCreateModalOpen] = React.useState(false);
  const [{data:accountData,error:accountError,loading:accountLoading}] = useAccount();
  const contract = useSuperstreamContract();
  const livepeer = useLivpeerApi();
  const handleCreateStream = () => {
    setIsCreateModalOpen(true);
  }

  const getAllStreams = async (_address:string) => {
    try{
      let _streams:Stream[] = [];
      console.log("Fetching streams for " + _address);
      const streams = await contract.getAllStreams(_address);
       streams.map(async (item) => {
        const {id,streamId,views} = item;
        const streamStatus:any = await livepeer.fetchStreamStatus(streamId);
        _streams.push({id,streamId,views,isActive:streamStatus.isActive,name:streamStatus.name})
      });
      console.log(_streams);
    } catch(err) {
      console.log(err);
    }
  }

  React.useEffect(()=>{
    console.log("heelo")
    if(accountData?.address){
      getAllStreams(accountData?.address);
    }
  },[accountData]);


  return (
    <div>
      <h1 className='text-2xl mb-4 font-display font-bold '>My Streams</h1>
      <p className='flex gap-2'>Server : <Copyable text='rtmp.livepeer.com/live'/></p>
  
      <button onClick={handleCreateStream} className='bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600'><PlusIcon className='h-5 w-5'/> Create Stream</button>
      <CreateStream isOpen={isCreateModalOpen} setIsOpen={setIsCreateModalOpen}/>
    </div>
  )
}

export default dashboard