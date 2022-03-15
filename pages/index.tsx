import { PhotographIcon } from "@heroicons/react/outline";
import { chownSync } from "fs";
import React, { FormEventHandler, useState } from "react";
import { Web3Storage } from "web3.storage";

type Props = {
  web3storageToken:string
};

export async function getServerSideProps(){
  const token = process.env.WEB_STORAGE_ACCESS_TOKEN;
  return {
    props: {
      web3storageToken:token
    }
  }
}

const Home = (props: Props) => {
  const filePickerRef = React.useRef<HTMLInputElement>();
  const [selectedFile,setSelectedFile] = useState<any>();

  const handleFileChange = async (e) => {
    const file = filePickerRef.current.files[0];
    const fileTypes = ["image/jpeg", "image/jpg", "image/png"];
    const { size, type } = file;
    // Limit to either image/jpeg, image/jpg or image/png file
    if (!fileTypes.includes(type)) {
        console.error("File format must be either png or jpg");
        return false;
    }
    // Check file size to ensure it is less than 2MB.
    if (size / 1024 / 1024 > 2) {
        console.error("File size exceeded the limit of 2MB");
        return false;
    }
    // const reader = new FileReader();
    // if(e.target.files[0]){
    //   reader.readAsDataURL(e.target.files[0]);
    // }

    // reader.onload = (readerEvent) => {
    //   setSelectedFile(readerEvent.target.result);
    //   storeFile(readerEvent.target.result);

    const cid = await storeFile(filePickerRef.current.files[0])
    await retrieveFile(cid);
    
  }

  const makeStorageClient = () => {

    return new Web3Storage({token:props.web3storageToken})
  }
  const storeFile = async (file:File) =>{
    console.log("inside store file")
    try{
      const client = makeStorageClient();
      
      const cid = await client.put([file]);
      console.log("stored thumbnail with cid : ", cid)
      return cid;
    }catch(err){
      console.error(err);
    }
  }

  const retrieveFile = async (cid:string) => {
    const client = makeStorageClient();
    const res = await client.get(cid);
    console.log(`Got a response! [${res.status}] ${res.statusText}` )
    if(!res.ok){
      throw new Error(`Failed to get ${cid} - [${res.status}] ${res.statusText}`)
    }
    const file = await res.files()
    console.log(file);
    
  }

  return (
    <div>
      <div>
        <input onChange={handleFileChange} type="file" hidden ref={filePickerRef}/>
        <button onClick={() => filePickerRef.current.click()} className="bg-gray-800 text-gray-400 group hover:text-gray-300"> 
        <PhotographIcon  className="h-5 w-5 group-hover:scale-110 group-hover:rotate-6"/>
        Upload image </button>
        {selectedFile && (
          <img src={selectedFile} className='w-40  mt-4 h-32 object-contain object-center' onClick={()=>setSelectedFile(null)} alt=''/>
        )}
      </div>
    </div>
  )
};

export default Home;
