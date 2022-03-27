import { useAddress, useNFTCollection } from '@thirdweb-dev/react'
import { NFTMetadataOwner } from '@thirdweb-dev/sdk'
import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { PROFILE_NFT_ADDRESS, STREAM_NFT_ADDRESS } from '../../constants'
import useSuperstreamContract from '../../hooks/useSuperstreamContract'
import { currentUserState, videosListState } from '../../recoil/states'
import Header from './Header'

import Sidebar from './Sidebar'

type Props = {
  children:React.ReactNode
}

const Layout = ({children}: Props) => {
  const [currentUser,setCurrentUser] = useRecoilState(currentUserState);
  const currentUserAddress = useAddress();
  const profileNFT = useNFTCollection(PROFILE_NFT_ADDRESS);
  const superstream = useSuperstreamContract();
  const [videos, setVideos] = useRecoilState(videosListState);
  const videoNFTCollection = useNFTCollection(STREAM_NFT_ADDRESS);

  const checkIfUserHasProfile = async ():Promise<void> => {
    try{
        const _profile:NFTMetadataOwner[] = await profileNFT.getOwned(currentUserAddress);
        console.log(_profile);
        const usernameTaken = await superstream.checkIfUsernameExists(_profile[0].metadata.name);
        if (_profile.length > 0  && usernameTaken){
          console.log("Profile NFT Found");
          setCurrentUser({data:_profile[0].metadata,hasProfile:true,loading:false});
          return;
        } else {
          console.log("You don't have a Profile ")
          setCurrentUser({hasProfile:false,loading:false})
          return;
        }
    } catch(err){
      console.error(err);
      setCurrentUser({hasProfile:false,loading:false})
    }
  }

  useEffect(()=>{
    if (currentUserAddress){
      checkIfUserHasProfile();
    }
  },[currentUserAddress]);
  
  const fetchVideos = async () => {
    try {
      const _videoNFTs = await videoNFTCollection.getAll();
      setVideos(_videoNFTs);
      console.log(videos);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [currentUserAddress]);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Sidebar/>
      <div className='w-full flex  '>
        <div className='p-4 pl-20 flex-1'>
      {children}
        </div>
      </div>
    </div>
  )
}

export default Layout