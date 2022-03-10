import { Dialog, Transition } from '@headlessui/react';
import { PlusIcon, XIcon } from '@heroicons/react/outline';
import React, { Fragment } from 'react'

type Props = {
  isOpen:boolean,
  setIsOpen:(boolean)=>void
}

const CreateStream = ({isOpen=true,setIsOpen}: Props) => {
  const closeModal = () => setIsOpen(false);
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
                <Dialog.Title
                  as="h3"
                  className="text-2xl font-display font-medium leading-6 text-gray-100"
                >
                  Create a new Stream
                </Dialog.Title>
                <div className='flex flex-col gap-1 mt-4'>
                  <label htmlFor="stream_name" className='text-gray-300'>Title of stream</label>
                    <input id="stream_name" type="text" placeholder='Enter a name'/>
                </div>
                <div className="mt-4 flex gap-4">
                <button className='bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600'><PlusIcon className='h-5 w-5'/> Create Stream</button>
                <button className='bg-rose-500  hover:bg-emerald-400 active:bg-emerald-600'><XIcon className='h-5 w-5'/> Cancel </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
  )
}

export default CreateStream