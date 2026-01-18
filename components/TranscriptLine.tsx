"use client";

import { TranscriptSegment } from "@/lib/types";

interface TranscriptLineProps {
  segment: TranscriptSegment;
}

export default function TranscriptLine({ segment }: TranscriptLineProps) {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleClick = () => {
    // Dispatch custom event to seek video
    const seekEvent = new CustomEvent("seekVideo", {
      detail: { time: segment.startTime },
    });
    window.dispatchEvent(seekEvent);
  };

  return (
    <div
      onClick={handleClick}
      className="group py-3 px-4 hover:bg-blue-50 cursor-pointer rounded transition-colors border-l-2 border-transparent hover:border-blue-900"
    >
      <div className="flex gap-4">
        <time
          dateTime={`PT${segment.startTime}S`}
          className="text-sm font-mono text-blue-900 shrink-0 w-12 group-hover:font-bold"
        >
          {formatTime(segment.startTime)}
        </time>
        <p className="text-gray-700 leading-relaxed">{segment.text}</p>
      </div>
    </div>
  );
}
