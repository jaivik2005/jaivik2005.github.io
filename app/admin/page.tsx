import type { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Lock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Admin Login',
  description: 'Admin dashboard login',
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 aurora-bg">
      <div className="glass rounded-3xl border border-white/10 p-8 w-full max-w-md shadow-glass-lg">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-primary" aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Admin Panel</h1>
          <p className="text-muted-foreground text-sm mt-2">Restricted access — authorized personnel only.</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
            <Lock className="w-4 h-4 text-yellow-400 flex-shrink-0" aria-hidden="true" />
            <p className="text-sm text-yellow-300">
              This admin panel requires authentication. Sign in to manage your portfolio content.
            </p>
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Not the site owner?{' '}
              <Link href="/" className="text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded">
                Return to portfolio
              </Link>
            </p>
          </div>

          <div className="border-t border-border/50 pt-4">
            <p className="text-xs text-muted-foreground text-center leading-relaxed">
              Admin dashboard includes: blog management, project management,
              contact message inbox, and site analytics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
