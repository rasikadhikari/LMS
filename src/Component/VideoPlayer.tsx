import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: false,
        maxBufferLength: 30,
        maxBufferSize: 60 * 1000 * 1000,
        liveSyncDurationCount: 3,
      });

      hls.loadSource("https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8");
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        console.log("HLS Manifest Loaded");
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        console.error("HLS.js error:", data);
      });

      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";
    }
  }, []);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Play failed:", error);
      });
      setIsPlaying(true);
    }
  };

  return (
    <div>
      <video
        ref={videoRef}
        controls
        muted={true}
        style={{ width: "100%", maxHeight: "500px" }}
      ></video>
      {!isPlaying && (
        <button
          onClick={handlePlay}
          style={{ marginTop: "10px", padding: "10px", cursor: "pointer" }}
        >
          Play Video
        </button>
      )}
    </div>
  );
}

export default VideoPlayer;
