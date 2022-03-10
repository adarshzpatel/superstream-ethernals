import React from "react";
import videojs from "video.js";
import "videojs-contrib-hls"
import "videojs-hls-quality-selector"
import "videojs-contrib-quality-levels";
import "video.js/dist/video-js.css";


type Props = {
  streamIsActive:boolean,
  playbackId:string 
}

const VideoJs: React.FC<Props> = ({streamIsActive,playbackId}) => {
  const [videoEl, setVideoEl] = React.useState(null);
  const onVideo = React.useCallback((el) => {
    setVideoEl(el);
  }, []);

  React.useEffect(() => {
    if (videoEl == null) return;
    if (streamIsActive && playbackId) {
      const player = videojs(videoEl, {
        autoplay: true,
        controls: true,
        fluid: true,
        resonsive: true,
        sources: [
          { src: `https://cdn.livepeer.com/hls/${playbackId}/index.m3u8` },
        ],
      });

      player.hlsQualitySelector();

     
      player.on("error", () => {
        player.src(`https://cdn.livepeer.com/hls/${playbackId}/index.m3u8`);
      });

      return () => {
        if (player !== null) {
          player.dispose();
        }
      };
    }
  }, [streamIsActive]);

  return (
    <div className="relative bg-black h-full w-full rounded-md overflow-hidden">
      <div data-vjs-player>
        <video
          id="video"
          ref={onVideo}
          className="h-full w-full video-js vjs-theme-city"
          controls
          playsInline
        />
      </div>
      <div className="bg-white text-gray-900 rounded-md flex items-center justify-center absolute right-2 top-2 py-1  px-2 text-xs">
        <div
          className={`animate-pulse ${
            streamIsActive ? "bg-green-700" : "bg-yellow-600"
          } h-2 w-2 mr-2 rounded-full`}
        ></div>
        {streamIsActive ? "Live" : "Waiting for Video"}
      </div>
    </div>
  );
};

export default VideoJs;
