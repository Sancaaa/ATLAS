export interface Speaker {
  name: string;
  title: string;
  bio: string;
  imageUrl?: string;
}

export interface TranscriptSegment {
  id: string;
  startTime: number; // seconds
  endTime: number;
  text: string;
}

export interface Talk {
  slug: string;
  title: string;
  description: string;
  videoId: string; // YouTube video ID
  duration: number; // seconds
  publishedAt: string; // ISO date string
  speaker: Speaker;
  transcript: TranscriptSegment[];
  tags?: string[];
}
