import React from "react";
import { AspectRatio, HlsPlayer, MediaUi } from "@vidstack/player/react";

type Props = {
  src: string;
  poster?: string;
};

const LiveVideo = ({ src, poster }: Props) => {
  return (
      <AspectRatio ratio="16/9" minHeight="360p" >

      <HlsPlayer
        src={src}
        poster={poster}
        controls
        loading="lazy"
        autoplay
        hlsConfig={{ lowLatencyMode: true }}
        >
        {/* `<source>` and `<track>` elements can go here. */}
        <MediaUi slot="ui">{/* UI elements go here. */}</MediaUi>
      </HlsPlayer>
        </AspectRatio>

  );
};

export default LiveVideo;
