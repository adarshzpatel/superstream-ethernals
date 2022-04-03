import { useNFTCollection } from "@thirdweb-dev/react";
import { NFTMetadataOwner } from "@thirdweb-dev/sdk";
import { removeListener } from "process";
import { useEffect } from "react";
import { atom, useRecoilState } from "recoil";
import { STREAM_NFT_ADDRESS } from "../constants";
import useSuperstreamContract from "./useSuperstreamContract";

const videoListState = atom({
  key: "videoList",
  default: [],
});

const useVideos = () => {
  const [videos, setVideos] = useRecoilState(videoListState);
  const streamNft = useNFTCollection(STREAM_NFT_ADDRESS);
  const { contract } = useSuperstreamContract();

  useEffect(() => {
    const callback = async (id, creator) => {
      async (id, creator) => {
        console.log(id);
        const item = await streamNft.get(id);
        setVideos([
          ...videos,
          {
            title: item?.metadata?.name,
            description: item?.metadata?.description,
            id: item?.metadata?.id,
            creator: item?.metadata?.creator,
            owner: item?.owner,
            createdAt: item?.metadata?.createdAt,
            animationUrl: item?.metadata?.animation_url,
            thumbnail: item?.metadata?.image,
            duration: item?.metadata?.duration,
            category: item?.metadata?.properties?.category,
            tags: item?.metadata?.properties?.tags,
          },
        ]);
      };
    };
    contract.on("StreamPublished", callback);
    return () => {
      removeListener("StreamPublished", callback);
      setVideos([])
    };
  }, []);
  const getAllVideos = async () => {
    const res = await streamNft.getAll();
    res.forEach((item) => {
      console.log(item);
      setVideos([
        ...videos,
        {
          title: item?.metadata?.name,
          description: item?.metadata?.description,
          id: item?.metadata?.id,
          creator: item?.metadata?.creator,
          owner: item?.owner,
          createdAt: item?.metadata?.createdAt,
          animationUrl: item?.metadata?.animation_url,
          thumbnail: item?.metadata?.image,
          duration: item?.metadata?.duration,
          category: item?.metadata?.properties?.category,
          tags: item?.metadata?.properties?.tags,
        },
      ]);
    });
  };

  const filterVideoByUsername = (username) => {
    return videos.filter((item) => item.creator == username);
  }

  const filterVideoByCategory = (category) => {
    return videos.filter((item)=> item.category == category ); 
  }

  useEffect(() => {
    getAllVideos();
  }, []);

  return { videos ,filterVideoByCategory,filterVideoByUsername };
};
export default useVideos;
