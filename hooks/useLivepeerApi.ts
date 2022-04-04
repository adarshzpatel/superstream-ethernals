import axios from "axios";
import toast from "react-hot-toast";

export const PROFILES = [
  {
    name: "1080p",
    bitrate: 4000000,
    fps: 30,
    width: 1920,
    height: 1080,
  },
  {
    name: "720p",
    bitrate: 2000000,
    fps: 30,
    width: 1280,
    height: 720,
  },
  {
    name: "480p",
    bitrate: 1000000,
    fps: 30,
    width: 854,
    height: 480,
  },
  {
    name: "360p",
    bitrate: 500000,
    fps: 30,
    width: 640,
    height: 360,
  },
];

const useLivpeerApi = () => {
  const apiKey = process.env.NEXT_PUBLIC_LIVEPEER_API_KEY;
  const headers = {
    headers: {
      
      "content-type": "application/json",
      "Authorization": `Bearer e4176e35-6311-4e02-b84b-6ff910caaf25`,
    },
  };

  const createStream = async (name: string): Promise<object> => {
    try {
      const url = "https://livepeer.com/api/stream";
      const data = {
        name: name,
        profiles: PROFILES,
        record: true,
      };
    
      return await axios.post(url, data, headers);
    } catch (err) {
      console.error(err);    
    }
  };

  const fetchStreamStatus = async (streamId: string): Promise<object> => {
    try{
      const url = `https://livepeer.com/api/stream/${streamId}`;
      const response = await axios.get(url, headers);
      return response?.data;
    } catch(err) {
      console.error(err);
    }
  };

  const getSessionsList = async (parentId: string): Promise<any> => {
    try{
      const url = `https://livepeer.com/api/stream/${parentId}/sessions?record=1`
      const response = await axios.get(url,headers);
      return response?.data;
    } catch(err) {
      console.error(err);
    }
  };

  const getSession = async (id: string | string[]): Promise<any> => {
    try{
      const url = `https://livepeer.com/api/session/${id}`;
      const response = await axios.get(url,headers);
      return response?.data;
    } catch(err) {
      console.error(err);
    }
  };


  return { createStream, fetchStreamStatus,getSession,getSessionsList };
};
export default useLivpeerApi;
