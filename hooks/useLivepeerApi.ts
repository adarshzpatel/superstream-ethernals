
import axios from 'axios';


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

  const createStream = async(name:string):Promise<object> => {
    const url = "https://livepeer.com/api/stream";
    const data = {
      name: name,
      profiles: PROFILES,
    };
    const headers = {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${apiKey}`,
      },
    };
    return await axios.post(url, data, headers);
  }
  
    const fetchStreamStatus = async (streamId:string):Promise<object> => {
    const url = `https://livepeer.com/api/stream/${streamId}`;
    const headers = {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${apiKey}`,
      },
    };
    const response = await axios.get(url, headers);
    return response?.data;
  };
  
  return {createStream,fetchStreamStatus};
}
export default useLivpeerApi;