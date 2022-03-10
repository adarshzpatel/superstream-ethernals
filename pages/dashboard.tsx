import React from 'react'
import { useAccount } from 'wagmi'
import Loader from "react-spinners/BeatLoader"
import {Dialog} from "@headlessui/react"
import { PlusIcon } from '@heroicons/react/outline'
import useSuperstreamContract from '../hooks/useSuperstreamContract'
import CreateStream from '../components/CreateStream'
type Props = {}

const dashboard = (props: Props) => {
  const [isCreateModalOpen,setIsCreateModalOpen] = React.useState(false);
  const [{data,error,loading}] = useAccount();
  // const contract = useSuperstreamContract();
  
  const handleCreateStream = () => {
    setIsCreateModalOpen(true);
  }

  const renderStreams = () => {
    if(error) {
      return <div className='text-red-500 text-lg'>{error}</div>
    }
    if(loading) {
      return <Loader color='#fff' />
    }
    return (
      <div>
        
      </div>
    )
  }
  return (
    <div>
      <h1 className='text-2xl mb-8 font-display font-bold '>My Streams</h1>
      {renderStreams()}
      <button onClick={handleCreateStream} className='bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600'><PlusIcon className='h-5 w-5'/> Create Stream</button>
      <CreateStream isOpen={isCreateModalOpen} setIsOpen={setIsCreateModalOpen}/>
    </div>
  )
}

export default dashboard