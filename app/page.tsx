import { talks } from "@/lib/data";
import TalkCard from "@/components/TalkCard";

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Ideas Worth Sharing
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover inspiring talks from thought leaders, innovators, and
          changemakers who are shaping our world.
        </p>
      </section>

      {/* Talks Grid */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Featured Talks
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {talks.map((talk) => (
            <TalkCard key={talk.slug} talk={talk} />
          ))}
        </div>
      </section>

      {/* Empty State (if no talks) */}
      {talks.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500">
            No talks available yet. Check back soon!
          </p>
        </div>
      )}
    </div>
  );
}
