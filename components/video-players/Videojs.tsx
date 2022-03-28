import { useRef, useEffect, useState, useCallback, createContext } from "react";
import videojs from "video.js";
import "videojs-contrib-hls";
import "videojs-contrib-quality-levels";
import videojsqualityselector from "videojs-hls-quality-selector";
import "video.js/dist/video-js.css";

const Videojs = ({ src }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  const options = {
    autoplay: true,
    controls: true,

    sources: [
      {
        src,
      },
    ],
  };

  useEffect(() => {
    if (!playerRef.current) {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      const player = (playerRef.current = videojs(videoElement, options, () => {
        console.log("player is ready");
      }));

      player.hlsQualitySelector = videojsqualityselector;
      player.hlsQualitySelector({ displayCurrentQuality: true,});

      player.on("error", (err) => {
        console.log(err);
        player.src(src);
      });
    } else {
      // you can update player here [update player through props]
      const player = playerRef.current;
      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [options, videoRef]);

  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player>
      <video ref={videoRef} className="video-js vjs-big-play-centered vjs-theme-fantasy" />
    </div>
  );
};

export default Videojs;
