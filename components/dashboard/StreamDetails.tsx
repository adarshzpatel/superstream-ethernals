import moment from "moment";
import { NextRouter, useRouter } from "next/router";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import useLivpeerApi from "../../hooks/useLivepeerApi";
import { currentUserState } from "../../recoil/states";
import Copyable from "../Copyable";

const StreamDetails = ({stream}:any) => {
  const [title, setTitle] = useState<string>();
  const [selectedThumbnail, setSelectedThumbnail] = useState<string>();
  const currentUser = useRecoilValue(currentUserState);
  // const titleInputRef= useRef<HTMLInputElement>();
  // const thumbnailPickerRef = useRef<HTMLInputElement>();
  // const [editing ,setEditing] = useState<boolean>();

  // const superstream = useSuperstreamContract();


  // const fetchDefaultStreamInfo = async () => {

  //   const streamInfo = await superstream.getStreamInfo(stream.username);
  //   setSelectedThumbnail(streamInfo.thumbnail);
  //   setTitle(streamInfo.title);

  // }

  // const updateChanges = async () => {
  //     const newTitle = titleInputRef.current.value;
  //     const newThumbnail = selectedThumbnail;
  //     if(newTitle == ''){
  //       toast.error("New title cannot be empty string");
  //       router.reload();
  //       return;
  //     }
  //     if(newTitle == title){
  //       await superstream.updateStreamInfo(stream.username,title,newThumbnail);
  //     } else {
  //       await superstream.updateStreamInfo(stream.username,newTitle,newThumbnail);
  //     }
  // }

  // useEffect(()=>{
  //   if(stream.username){

  //       fetchDefaultStreamInfo();

  //   }
  // },[stream.username])

  //Editing Default Thumbnail & Title
  // const handleThumbnailChange = () => {
  //   try{setSelectedThumbnail(null);
  //   const file = thumbnailPickerRef.current.files[0];
  //   // Limit to either image/jpeg, image/jpg or image/png file
  //   const fileTypes = ["image/jpeg", "image/jpg", "image/png"];
  //   const { size, type } = file;
  //   // Limit to either image/jpeg, image/jpg or image/png file
  //   if (!fileTypes.includes(type)) {
  //     toast.error("File format must be either png or jpg");
  //     return false;
  //   }
  //   // Check file size to ensure it is less than 2MB.
  //   if (size / 1024 / 1024 > 2) {
  //     toast.error("File size exceeded the limit of 2MB");
  //     return false;
  //   }

  //   const reader: FileReader = new FileReader();
  //   if (file) {
  //     reader.readAsDataURL(file);
  //   }

  //   reader.onload = (readerEvent) => {
  //     setSelectedThumbnail(readerEvent.target.result.toString());
  //   };}catch(err){
  //     console.error(err);
  //   }
  // }

  return (
    <div className="">
      {/* <div className="bg-gray-800 border-2 rounded-md  text-gray-500 border-dashed  border-gray-600  overflow-hidden aspect-video h-64 flex items-center justify-center">
            {!selectedThumbnail && "No Default Livestream thumbnail selected" }
            {selectedThumbnail && <img src={selectedThumbnail} className='object-contain object-center h-full w-full'/>}
            
            <input type="file" onChange={handleThumbnailChange} ref={thumbnailPickerRef} name="thumbnail" hidden id="thumbnail-picker" />
          </div>
{editing && <input type="text" ref={titleInputRef} placeholder="Enter new stream title here ..." className="my-3 py-1 font-medium  w-full" />}
{!editing && <p className="my-3 text-xl"> {title ? title : "Stream Title"} </p>}
          <div className="flex gap-2 ">
           {!editing && <button onClick={()=>setEditing(true)}  className="font-normal text-sm bg-gray-800 hover:bg-gray-700">Edit Thumbnail & Title</button>}
           {editing &&  <button onClick={()=>thumbnailPickerRef.current.click()} className="font-normal text-sm bg-gray-800 hover:bg-gray-700">Upload thumbnail</button>}
           {editing && <button onClick={updateChanges} className="font-normal text-sm bg-emerald-600 hover:bg-emerald-500">Save Changes</button>}
           {editing && <button onClick={()=>setEditing(false)} className="font-normal text-sm bg-red-600 hover:bg--500">Cancel Changes</button>}

          </div> */}

      <div className="bg-gray-800 mb-4  border-gray-600 rounded-md text-gray-500 aspect-video  flex items-center justify-center ">
        {/* {stream.status ? "ONLINE" : "OFFLINE"} */}
      </div>

      <div>
        <h6 className="border-b text-xl font-display  pb-1 border-gray-600">
          Stream Details
        </h6>
        <table className="text-left">
          <tbody>
            <tr>
              <th className="w-32 h-12 font-normal  text-gray-400">Server</th>
              <td>
                {" "}
                <Copyable text="rtmp://rtmp.livepeer.com/live" />{" "}
              </td>
            </tr>
            <tr>
              <th className="w-12 h-12  font-normal text-gray-400">
                Stream Key
              </th>
              <td>
                {" "}
                <Copyable text={stream?.streamKey || "Unavailable"} />{" "}
              </td>
            </tr>
            <tr>
              <th className="w-12 h-12 font-normal  text-gray-400">
                Stream Url
              </th>
              <td>
                {" "}
                <Copyable
                  text={
                    currentUser?.hasProfile
                      ? `${window.location.origin}/u/${currentUser?.profile?.username}`
                      : "Unavailable"
                  }
                />
              </td>
            </tr>
            <tr>
              <th className="w-12 h-12 font-normal  text-gray-400">
                Last seen
              </th>
              <td>
                {stream?.lastSeen
                  ? moment(stream.lastSeen).format("MMMM Do yyyy , h:mm a")
                  : "Never"}
              </td>
            </tr>
            <tr>
              <th className="w-12 h-12 font-normal  text-gray-400">Status</th>
              <td>
                {" "}
                {stream?.status ? (
                  <div className="px-2 max-w-fit rounded-md bg-emerald-500">
                    Live
                  </div>
                ) : (
                  "Idle"
                )}{" "}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StreamDetails;
