import { Speaker } from '@/lib/types';

interface SpeakerBioProps {
  speaker: Speaker;
}

export default function SpeakerBio({ speaker }: SpeakerBioProps) {
  return (
    <section className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">About the Speaker</h2>
      
      <div className="flex gap-6 items-start">
        {speaker.imageUrl && (
          <div className="shrink-0">
            <img 
              src={speaker.imageUrl} 
              alt={speaker.name}
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
            />
          </div>
        )}
        
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-1">
            {speaker.name}
          </h3>
          <p className="text-blue-900 font-medium mb-4">
            {speaker.title}
          </p>
          <p className="text-gray-700 leading-relaxed">
            {speaker.bio}
          </p>
        </div>
      </div>
    </section>
  );
}