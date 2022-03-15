import React from 'react';
import {Web3Storage} from "web3.storage";

const makeStorageClient = () => {
  return new Web3Storage({token:process.env.WEB3STORAGE_ACCESS_TOKEN})
}

const imageUpload = async () => {
  const data = new FormData();
}

const useWeb3Storage = () => {

  

}

export default Web3Storage