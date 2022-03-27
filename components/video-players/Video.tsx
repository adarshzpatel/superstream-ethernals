import React from "react";
import { VideoPlayer, MediaUi } from "@vidstack/player/react";

type Props = {
  src: string;
  poster?: string;
};

const Video = ({ src, poster }: Props) => {
  return (
    <div>
      <VideoPlayer
        height={480}
        width={848}
        src={src}
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
