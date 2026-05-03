import Link from "next/link";

export default function LandingHeader() {
  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="flex justify-between items-center h-16 px-8 max-w-[1280px] mx-auto">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="text-xl font-bold tracking-tighter text-gray-900"
          >
            Scenoo
          </Link>
          <nav className="hidden md:flex gap-6">
            <a
              href="#features"
              className="text-blue-600 font-semibold hover:text-blue-500 transition-colors"
            >
              Features
            </a>
            <a
              href="#faq"
              className="text-gray-600 hover:text-blue-500 transition-colors"
            >
              Q&A
            </a>
            <a
              href="#blog"
              className="text-gray-600 hover:text-blue-500 transition-colors"
            >
              Blog
            </a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/projects"
            className="text-gray-600 hover:text-gray-900 text-label-md"
          >
            Log In
          </Link>
          <Link
            href="/projects"
            className="bg-brand-amber text-white px-4 py-2 rounded text-label-md hover:opacity-90 transition-opacity"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}
