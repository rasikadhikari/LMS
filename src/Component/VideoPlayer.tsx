import React, { useEffect, useRef } from "react";
import hls from "hls.js";

function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (!videoRef.current) return;
    if (hls.isSupported()) {
      var Hls = new hls();
      Hls.loadSource(
        "https://devstreaming-cdn.apple.com/videos/streaming/examples/historic_planet_content_2023-10-26-3d-video/main.m3u8"
      );
      Hls.attachMedia(videoRef.current);
      Hls.on(hls.Events.MANIFEST_PARSED, function () {
        videoRef.current?.play();
      });
    }
  }, []);
  return (
    <div>
      <video ref={videoRef} controls></video>
    </div>
  );
}

export default VideoPlayer;
