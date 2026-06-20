import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 — Page Not Found',
};

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 aurora-bg">
      <div className="text-center max-w-md">
        <div className="relative inline-block mb-8">
          <div className="text-[8rem] font-black text-foreground/5 leading-none select-none" aria-hidden="true">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl animate-float" aria-hidden="true">🔍</div>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-foreground mb-3">
          Page not found
        </h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          Looks like this page got lost in the void. Let's get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow hover:shadow-glow-lg transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border border-border hover:border-primary/50 hover:bg-primary/5 transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Contact Me
          </Link>
        </div>
      </div>
    </div>
  );
}
