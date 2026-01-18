import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-blue-900 rounded flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="text-xl font-bold text-gray-900 group-hover:text-blue-900 transition-colors">
              TalkHub
            </span>
          </Link>

          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-gray-600 hover:text-blue-900 transition-colors font-medium"
            >
              Talks
            </Link>
            <a
              href="https://tedxudayana.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-900 transition-colors font-medium"
            >
              About
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
