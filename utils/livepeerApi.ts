import axios from 'axios';


type CreateStream = (name:string) => any;
type FetchStreamStatus = (streamId:string) => any;

const apiKey = process.env.NEXT_PUBLIC_LIVEPEER_API_KEY;

export const PROFILES = [
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

export const createStream:CreateStream = async (name) => {
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

};

export const fetchStreamStatus:FetchStreamStatus = async (streamId) => {
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

