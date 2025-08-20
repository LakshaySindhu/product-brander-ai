import Link from "next/link";
import { Sparkles } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center -mt-16">
      <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">
        Product Brander <span className="text-brand-accent">AI</span>
      </h1>
      <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl">
        Transform your simple product photos into stunning, professional branding images with a single click.
      </p>
      <Link href="/generate">
        <button className="flex items-center gap-2 px-8 py-4 bg-brand-accent text-white font-semibold rounded-lg shadow-lg hover:bg-brand-accent-hover transition-all duration-300 transform hover:scale-105">
          <Sparkles size={20} />
          Start Generating
        </button>
      </Link>
    </div>
  );
}