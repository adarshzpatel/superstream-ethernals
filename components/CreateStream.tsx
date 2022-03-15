import { Dialog, Transition } from '@headlessui/react';
import { PlusIcon, XIcon } from '@heroicons/react/outline';

import React, { Fragment } from 'react'
import { uid } from 'uid';
import useLivpeerApi from '../hooks/useLivepeerApi';
import Superstream from "../artifacts/contracts/Superstream.sol/Superstream.json"
import toast from 'react-hot-toast';
import Loader from 'react-spinners/BeatLoader';
import useSuperstreamContract from '../hooks/useSuperstreamContract';


type Props = {
  isOpen:boolean,
  setIsOpen:(boolean)=>void
}





const CreateStream = ({isOpen,setIsOpen}: Props) => {
  const [pending,setPending] = React.useState<boolean>(false);
  const streamNameRef = React.useRef<HTMLInputElement>();
  const [error,setError] = React.useState<string>('');
  const livepeer = useLivpeerApi();
  const {contract} = useSuperstreamContract();

  const closeModal = () => setIsOpen(false);

  const createStream = async () => {
    try {
      setPending(true);
      const streamName = streamNameRef.current.value;
      const stream:any = await livepeer.createStream(streamName);
      const id = uid(16);
      console.log(stream);
      const tx = await contract.createStream(id,stream.data.id,stream.data.streamKey);
      await tx.wait();
      console.log(tx);
      closeModal();
      toast.success("Stream created successfully !!",{
        style: {
          borderRadius: '10px',
          background: '#374151',
          color: '#fff',
        },
      })
      setPending(false);
    } catch(err) {
      console.error(err);
      setError(error);
      setPending(false);
    }
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 backdrop-blur-lg" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
                <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-gray-800 shadow-xl rounded-2xl">
                {!pending &&    <div>

                <Dialog.Title
                  as="h3"
                  className="text-2xl font-display font-medium leading-6 text-gray-100"
                  >
                  Create a new Stream
                </Dialog.Title>
                <div className='flex flex-col gap-1 mt-4'>
                  <label htmlFor="stream_name" className='text-gray-300'>Title of stream</label>
                    <input autoComplete='false' id="stream_name" ref={streamNameRef} type="text" placeholder='Enter a name'/>
                </div>
           <div className="mt-4 flex gap-4">
               <button  onClick={createStream} className='bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700'><PlusIcon className='h-5 w-5'/> Create Stream</button>
                <button onClick={closeModal} className='bg-rose-500  hover:bg-rose-400 active:bg-rose-600'><XIcon className='h-5 w-5'/> Cancel </button>
                </div>
          
              </div>}
              {pending && <div className='p-8 flex items-center justify-center'> <Loader color='#fff'/></div>}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
  )
}

export default CreateStream