import { NextPage } from 'next';
import { NextRouter, useRouter } from 'next/router'
import React from 'react'
import useLivpeerApi from '../../hooks/useLivepeerApi';
import useSuperstreamContract from '../../hooks/useSuperstreamContract';

type Props = {}

const StreamPage:NextPage = (props: Props) => {
  const router:NextRouter = useRouter();

  const livepeer = useLivpeerApi();



  React.useEffect(()=>{
    // fetchStream();
  },[])
  return (
    <div></div>
  )
}

export default StreamPage;