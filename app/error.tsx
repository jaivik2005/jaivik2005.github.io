'use client';

import Link from 'next/link';

export default function ErrorPage({ reset }: { reset?: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 aurora-bg">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6 animate-float" aria-hidden="true">⚠️</div>
        <h1 className="text-3xl font-bold text-foreground mb-3">Something went wrong</h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          An unexpected error occurred. Please try again or contact me if the issue persists.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
