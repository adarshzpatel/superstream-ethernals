
import React from 'react'
import {DuplicateIcon} from "@heroicons/react/outline";
import toast from 'react-hot-toast';

type Props = {
  text:string
  copyText?:string
}

const notify = () => toast.success("Copied to Clipboard",{
  style: {
    borderRadius: '10px',
    background: '#374151',
    color: '#fff',
  },
})

const Copyable = (props: Props) => {
  const copyToClipboard = () => {
    window.navigator.clipboard.writeText(props.copyText);
    notify();
  }

  return (
    <span onClick={copyToClipboard} className='group cursor-pointer flex items-center gap-2'>
      {props.text}
      <DuplicateIcon className="h-6 w-6 group-active:scale-95"/>
    </span>
  )
}

export default Copyable