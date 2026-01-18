import Link from "next/link";
import { Talk } from "@/lib/types";

interface TalkCardProps {
  talk: Talk;
}

export default function TalkCard({ talk }: TalkCardProps) {
  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} min`;
  };

  const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Link href={`/talk/${talk.slug}`} className="group block">
      <article className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-white">
        {/* Thumbnail */}
        <div className="relative aspect-video bg-gray-100 overflow-hidden">
          <img
            src={`https://img.youtube.com/vi/${talk.videoId}/maxresdefault.jpg`}
            alt={`Thumbnail for ${talk.title}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
            {formatDuration(talk.duration)}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-900 transition-colors">
            {talk.title}
          </h2>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {talk.description}
          </p>

          <div className="flex items-center justify-between text-sm">
            <div>
              <p className="font-medium text-gray-900">{talk.speaker.name}</p>
              <p className="text-gray-500 text-xs">{talk.speaker.title}</p>
            </div>
            <p className="text-gray-400 text-xs">
              {formatDate(talk.publishedAt)}
            </p>
          </div>

          {/* Tags */}
          {talk.tags && talk.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {talk.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-blue-50 text-blue-900 px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
