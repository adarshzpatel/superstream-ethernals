import React from "react";
import { VideoPlayer, MediaUi, AspectRatio } from "@vidstack/player/react";

type Props = {
  src: string;
  poster?: string;
};

const Video = ({ src, poster }: Props) => {
  return (
    <div className="aspect-video h-64 w-full"   >
      <VideoPlayer
        src={src}
        height={480}
  
        poster={poster}
        controls
        autoplay
        loading="lazy"
      >
        {/* `<source>` and `<track>` elements can go here. */}
        <MediaUi slot="ui">{/* UI elements go here. */}</MediaUi>
      </VideoPlayer>
    </div>
  );
};

export default Video;
