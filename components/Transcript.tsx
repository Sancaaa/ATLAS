import { TranscriptSegment } from "@/lib/types";
import TranscriptLine from "./TranscriptLine";

interface TranscriptProps {
  segments: TranscriptSegment[];
}

export default function Transcript({ segments }: TranscriptProps) {
  return (
    <section className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Transcript</h2>
      <div className="space-y-1">
        {segments.map((segment) => (
          <TranscriptLine key={segment.id} segment={segment} />
        ))}
      </div>
      <p className="text-sm text-gray-500 mt-6 italic">
        Click on any line to jump to that moment in the video
      </p>
    </section>
  );
}
