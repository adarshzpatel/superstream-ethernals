import React from 'react';
import { useSigner } from 'wagmi';
import useSuperstreamContract, { User } from './useSuperstreamContract';


const INITIAL_STATE:User = {
  username:'',
  userAddress:'',
  about:'',
  followers:[],
  follows:[],
  thumbnailUrl:'',
  liked:[]
}

const useUser = () => {
  const [signer] = useSigner();
  const [addressHasAccount,setAddressHasAccount] = React.useState<boolean>(false);
  const [currentUser,setCurrentUser] = React.useState<User>()
  const superstream = useSuperstreamContract();
  
  const checkIfAddressHasAccount = async () => {
      const _address = await signer?.data?.getAddress();
      if(_address){
        const hasAccount = await superstream.addressHasAccount(_address);
        setAddressHasAccount(hasAccount);
      }
  };

  const getUserData = async () => {
    if(!signer.loading && !signer.error){
      const _address = await signer?.data?.getAddress();
      const userData = await superstream.getUserByAddress(_address);
      setCurrentUser(userData);    
    } else {
      setCurrentUser(INITIAL_STATE);
      console.log("Please connect your wallet")
      setAddressHasAccount(false);
    }
  }

  React.useEffect(()=>{
    if(!signer.loading){
      checkIfAddressHasAccount();
    } else {
      setCurrentUser(INITIAL_STATE);
      setAddressHasAccount(false);
    }
  },[signer]);

  React.useEffect(()=>{
    if(addressHasAccount){
      getUserData();
    } 
  },[addressHasAccount]);
  
  return {currentUser,addressHasAccount,checkIfAddressHasAccount,getUserData}
}

export default useUser;