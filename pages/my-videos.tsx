import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import useVideos from '../hooks/useVideos'
import { currentUserState } from '../recoil/states'

type Props = {}

const myVides:NextPage = (props: Props) => {
  
  const currentUser = useRecoilValue(currentUserState);
  const [myVideos,setMyVideos] = useState([]); 
  const {videos} = useVideos();
  
  const getMyVideos =async () => {
    
  }
  useEffect(()=>{
    if(currentUser?.profile?.username){

      console.log(myVideos);
    }
  },[currentUser]);

  return (
    <div></div>
  )
}

export default myVides