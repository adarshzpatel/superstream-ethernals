import React, { useRef, useState } from "react";
import { useAddress, useNFTCollection } from "@thirdweb-dev/react";
import toast from "react-hot-toast";
import { PROFILE_NFT_ADDRESS } from "../constants";
import useLivpeerApi from "../hooks/useLivepeerApi";
import useWeb3Storage from "../hooks/useWeb3Storage";
import useSuperstreamContract from "../hooks/useSuperstreamContract";
import axios from "axios";
import { useRecoilState } from "recoil";
import { currentUserState } from "../recoil/states";
import { NextRouter, useRouter } from "next/router";
import { ethers } from "ethers";
import { userInfo } from "os";

type Props = {
  web3storageToken:string
};

export const getStaticProps = async () => {
  const web3storageToken = process.env.ACCESS_TOKEN;
  return {
    props : {
      web3storageToken
    }
  }
}
const profile = (props:Props) => {
  const currentAccount = useAddress();
  const router:NextRouter = useRouter();
  const [currentUser,setCurrentUser] = useRecoilState(currentUserState);
  const [minting,setMinting] = useState<boolean>();
  const filePickerRef = useRef<HTMLInputElement>();
  const [selectedFile, setSelectedFile] = useState<string>();
  const {addProfile,checkIfUsernameExists} = useSuperstreamContract()
  const livepeerApi = useLivpeerApi();
  const {storeFile} = useWeb3Storage();
  const [error,setError] = useState<string[]>([]);
  const superstream = useSuperstreamContract();

  const handleRedirect = async () => {
    
    const usernameTaken = await superstream.checkIfUsernameExists(currentUser?.data?.name);
    if(usernameTaken){
      router.push('/')
    }
  }
  
  React.useEffect(()=> {
    if(currentUser.data ){
      handleRedirect();
    }
  },[currentUser])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMinting(true);
    const username = e.target.username.value;
    const bio = e.target.bio.value;
    const file = filePickerRef.current.files[0];    
    const usernameTaken = await checkIfUsernameExists(username);
    if(!file) {
      setError([...error,"Please Choose a profile picture"])
    }
    if(!username && !bio){
      setError([...error,"Please fill all fields"])
    } 
    if(usernameTaken) {
      setError([...error,"Username already taken !!"])
    }
    if(username && !usernameTaken && bio && file){
      try{
      // Create Stream in Livepeer -- get streamId,streamKey
      const streamObject:any = await livepeerApi.createStream(username);
      console.log(streamObject.data);
      // Upload pfp to ipfs -- get pfpCid
      const pfpUri = await storeFile(file,props.web3storageToken);
      console.log("Profile Picutre Uploaded to " +pfpUri);
      // mint profile nft -- get profileId
      toast("Minting profile NFT");
      const profileId = await mintProfile(username,bio,pfpUri);
      console.log({profileN:ethers.BigNumber.from(profileId).toNumber()});;
      toast.success("Minted profile Nft successfully");
      await addProfile(profileId,username,streamObject.data.id,streamObject.data.streamKey)
      toast.success("Profile Created Successfully")
      window.location.reload();
      setMinting(false);
    } catch(err) {
      console.error(err);
      toast.error(err.message);
    }
  }
  setMinting(false)
  };
  



  const handleFileChange = () => {
    const file = filePickerRef.current.files[0];
    // Limit to either image/jpeg, image/jpg or image/png file
    const fileTypes = ["image/jpeg", "image/jpg", "image/png"];
    const { size, type } = file;
    // Limit to either image/jpeg, image/jpg or image/png file
    if (!fileTypes.includes(type)) {
      toast.error("File format must be either png or jpg");
      return false;
    }
    // Check file size to ensure it is less than 2MB.
    if (size / 1024 / 1024 > 2) {
      toast.error("File size exceeded the limit of 2MB");
      return false;
    }

    const reader: FileReader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result.toString());
    };
  };

  const mintProfile = async (_username: string, _bio: string, _pfpUri:string) => {
    try {
      if (currentAccount) {
        const metadata = {
          name: _username,
          description: _bio,
          image: _pfpUri
        };
        console.log("Minting profile")
        const response = await axios.post('/api/mint/profile',{
          address:currentAccount,
          metadata:metadata
        })
        console.log(response.data);
        return ethers.BigNumber.from(response.data.tokenId).toNumber();
      }
    } catch (error) {
      toast.error(error.messsage)
      console.error(error);
    }
  };

  if(!currentAccount){
    return (
      <div className="text-2xl font-medium">
        PLease Connect to Metamask!
      </div>
    )
  }

  return (
    <div className="flex flex-col divide-y gap-4  divide-gray-600 items-center justify-center max-w-screen-md mx-auto">
      <h1 className="text-3xl text-left w-full  font-bold font-display ">
        Mint a Superstream Profile
      </h1>
      
      <form className="grid grid-cols-3 pt-4  w-full mx-auto" onSubmit={handleSubmit}>
        <div className="flex flex-col col-span-2">
          <label htmlFor="useranme">Username</label>
          <input type="text" name="username" placeholder="Enter username" />
        </div>
        
        <div className="flex flex-col pl-8 col-span-1 row-span-2">
          <label>Upload Profile Picture</label>
          <div onClick={() => filePickerRef.current.click()} className="cursor-pointer overflow-hidden rounded-full bg-gray-800  border-dashed flex items-center justify-center h-40 w-40">
            <input type="file" ref={filePickerRef} onChange={handleFileChange} hidden />
            {!selectedFile && (
    
               <p className="text-xs font-bol"> Upload Profile Picture </p>
         
            )}
            {selectedFile && (
              <img
                src={selectedFile}
                alt="profile-picture"
                className="h-full w-full"
              />
            )}
          </div>
        </div>
        <div className="flex flex-col col-span-2">
          <label htmlFor="bio">Bio</label>
          <textarea name="bio" placeholder="Say something about yourself" />
        </div>
        
        <button
          type="submit"
          disabled={minting}
          className="mt-2 py-2 rounded-xl max-w-fit px-6 bg-violet-600 disabled:bg-opacity-75 disabled:text-gray-400 hover:bg-violet-500"
        >
          {minting ?"Creating Profile...": "Create Profile " }
        </button>
          </form>
        {error.length > 0 && <div className="w-full text-red-400 py-4">
        {error?.map(err=>(
          <p> * {err}</p>
          ))}
          </div>}
    
    </div>
  );
};

export default profile;
