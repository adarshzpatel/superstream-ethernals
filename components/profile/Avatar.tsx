import React from 'react'

type Props = {
  src?:string
  isLive?:boolean
}

const Avatar = ({src,isLive=false}: Props) => {
  return (<div className='relative'>
    <div className='h-20  w-20 ring-1 ring-white   rounded-full overflow-hidden bg-gray-500'>
      {src && (<img src={src} alt='avatar'className='h-ful w-full'/> )}
    </div>
      {isLive && (<div className='absolute text-xs -bottom-2 tracking-widest font-bold bg-red-500 rounded-xl px-1  left-3  bg-red shadow'>LIVE</div>)}
  </div>
  )
}

export default Avatar