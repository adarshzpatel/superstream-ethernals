import moment from "moment";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import useSuperstreamContract from "../hooks/useSuperstreamContract";
import { Profile } from "../recoil/states";

type Props = {
  data: any;
};

const VideoCard = ({ data }: Props) => {
  const superstream = useSuperstreamContract();
  const [user, setUser] = useState<Profile>();

  const getUser = async () => {
    if (data?.owner) {
      const res = await superstream.getProfileByUsername(data?.metadata?.creator)
      setUser(res);
    }
  };

  useEffect(() => {
    getUser();
  }, [data]);

  return (
    <div className="w-full">
      {/* VideoCard */}
      <Link href={`/video?id=${data?.metadata?.id.toString()}`}>
        <div className="hover:p-3 rounded-lg  group hover:scale-105 hover:shadow-xl duration-200 ease-out cursor-pointer  hover:bg-gray-800 max-w-sm">
          <div className="animate-pulse rounded-lg overflow-hidden relative aspect-video mb-2 bg-slate-500  w-full">
            <img src={data?.metadata?.image} alt="" />
            <div className="bg-slate-900 text-xs text-white absolute right-2 bottom-2 p-1 rounded-md">
              {moment
                .duration(Math.ceil(data?.metadata?.duration / 60) * 60 * 1000)
                .humanize()}
            </div>
          </div>
          <h6 className="text-lg mb-2  overflow-ellipsis flex whitespace-pre-wrap">
            {data?.metadata?.name.slice(0, 60) +
              (data?.metadata?.name.length > 60 ? "..." : "")}
          </h6>
          <div className="flex gap-2">
            <div className="h-10 w-10 ring-1 ring-white overflow-hidden rounded-full bg-gray-600">
              {user?.pfp && (
                <img src={user?.pfp} alt="profile-pic" />
              )}
            </div>
            <div>
              <p
                className="text-gray-
            300 font-display font-bold "
              >
                {user?.username || "User"}
              </p>
              <p className="text-gray-400 text-sm ">
                {moment(data?.metadata?.created_at).fromNow()}{" "}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default VideoCard;
