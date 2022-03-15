import { ethers } from "ethers";
import { uid } from "uid";
import * as wagmi from "wagmi";
import {useProvider,useSigner} from "wagmi";
import SuperstreamContract from "../artifacts/contracts/Superstream.sol/Superstream.json"
import useLivpeerApi from "./useLivepeerApi";

export type User = {
  username:string
  about:string
  thumbnailUrl:string
  followers:string[]
  follows:string[]
  liked:string[]
  userAddress:string
}

const useSuperstreamContract = () => {
  const [signer] = useSigner();
  const provider = useProvider();
  const livepeer = useLivpeerApi();  
  const contract = wagmi.useContract({
    addressOrName: "0x0636D13EF27de47afAF3C30831069435b6ee2752",
    contractInterface:SuperstreamContract.abi,
    signerOrProvider: signer.data || provider
  })

  const addressHasAccount = async (address:string):Promise<boolean> => {
    try{
      const hasAccount = await contract.addressHasAccount(address)
      return hasAccount;
    } catch(err){
      console.error(err);
    }
  } 

  const usernameExists = async (username:string|string[]):Promise<boolean> => {
    try{
      const result = await contract.userExists(username);
      return result;
    } catch(err){
      console.error(err);
    }

  } 

  const createUser = async (username:string,about:string):Promise<void> => {
    await contract.createUser(username,about).then(async(tx)=>{
      await tx.wait();
      console.log(`User with username ${username} created successfully`)
      console.log("https://mumbai.polygonscan.com/tx/"+tx.hash);
    }).catch(err=>{
      console.error(err);
    })
  }

  const getUserByAddress = async (address:string):Promise<User> => {
    try{
      const data = await contract.getUserByAddress(address)
      return {
        username:data.username,
        about:data.about,
        thumbnailUrl:data.thumbnailUrl,
        followers:data.followers,
        follows:data.follows,
        liked:data.liked,
        userAddress:data.userAddress
      }
    } catch(err){
      console.error(err);
    }
  }

  const getUserByUsername = async (username:string | string[]):Promise<User> => {
    
    const data = await contract.getUserByUsername(username).catch(err=>console.log(err));
    return {
      username:data.username,
      about:data.about,
      thumbnailUrl:data.thumbnailUrl,
      followers:data.followers,
      follows:data.follows,
      liked:data.liked,
      userAddress:data.userAddress
    }
  }

  const getAllUser = async () => {}

  const follow = (username:string) => {}

  const createStream = async(name:string):Promise<void> => {
    try{
      const livepeerStream = await livepeer.createStream(name);
      const id = uid(16);
      const {streamId,streamKey}:any = livepeerStream;
      const tx = await contract.createStream(id,streamId,streamKey);
    }catch(err){
      console.error(err);
    }
  }
  
  const getLivestreamById = (id:string) => {}

  const getStreamKey = (id:string) => {}

  const like = (id:string) => {}

  const tip = async (username:string,amount:number):Promise<void> => {
    const _amount = ethers.utils.parseEther(amount.toString());
    await contract.tip(username,{value:_amount}).then(()=>{
      console.log(`Tipped ${amount} MATIC to ${username} `);
    }).catch(err => {
      console.error(err);
    })
  }


  return {contract,createUser,getUserByAddress,getUserByUsername,addressHasAccount,usernameExists};
}

export default useSuperstreamContract;