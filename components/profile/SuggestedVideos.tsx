import Link from "next/link";
import React from "react";

type Props = {};

const RelatedVidoesByCategory = (props: Props) => {
  return (
    <div className="hidden flex-col lg:flex gap-4">
      <h6 className="text-lg text-gray-300 border-b pb-3 border-1 border-gray-600 uppercase font-display tracking-wider fond-bold">
        More from {profile?.username}
      </h6>
      <div className="hidden lg:flex flex-col w-full gap-4 ">
        {videos?.map((data) => (
          <Link href={`/video?id=${data?.metadata?.id.toString()}`}>
            <div className="w-full cursor-pointer">
              <div className="animate-pulse rounded-lg relative aspect-video mb-2 bg-slate-500  w-full">
                <img src={data?.metadata?.image} alt="" />
                <div className="bg-slate-900 text-xs text-white absolute right-2 bottom-2 p-1 rounded-md">
                  {moment
                    .duration(
                      Math.ceil(data?.metadata?.duration / 60) * 60 * 1000
                    )
                    .humanize()}
                </div>
              </div>
              <h6 className="text-lg   overflow-ellipsis flex whitespace-pre-wrap">
                {data?.metadata?.name.slice(0, 60) +
                  (data?.metadata?.name.length > 60 ? "..." : "")}
              </h6>
              <p className="text-gray-400 text-sm ">
                {moment(data?.metadata?.created_at).fromNow()}{" "}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedVidoesByCategory;
