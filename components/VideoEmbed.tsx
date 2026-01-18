"use client";

import { useEffect, useRef } from "react";

interface VideoEmbedProps {
  videoId: string;
  title: string;
}

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export default function VideoEmbed({ videoId, title }: VideoEmbedProps) {
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load YouTube IFrame API
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    // Initialize player when API is ready
    const initializePlayer = () => {
      if (window.YT && window.YT.Player) {
        playerRef.current = new window.YT.Player(`player-${videoId}`, {
          videoId: videoId,
          playerVars: {
            modestbranding: 1,
            rel: 0,
          },
        });
      }
    };

    if (window.YT && window.YT.Player) {
      initializePlayer();
    } else {
      window.onYouTubeIframeAPIReady = initializePlayer;
    }

    // Listen for custom seek events
    const handleSeek = (event: CustomEvent) => {
      if (playerRef.current && playerRef.current.seekTo) {
        playerRef.current.seekTo(event.detail.time, true);
        playerRef.current.playVideo();

        // Scroll video into view
        containerRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    };

    window.addEventListener("seekVideo" as any, handleSeek as EventListener);

    return () => {
      window.removeEventListener(
        "seekVideo" as any,
        handleSeek as EventListener,
      );
    };
  }, [videoId]);

  return (
    <div ref={containerRef} className="w-full">
      <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
        <div id={`player-${videoId}`} className="w-full h-full"></div>
      </div>
    </div>
  );
}
