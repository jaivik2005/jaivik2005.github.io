import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  LayoutDashboard, FileText, FolderOpen, MessageSquare, 
  Star, TrendingUp, Eye, Mail, ArrowRight
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Portfolio admin dashboard',
  robots: { index: false, follow: false },
};

const cards = [
  { label: 'Blog Posts', value: '3', icon: FileText, color: 'text-blue-400 bg-blue-500/10 border-blue-500/20', href: '/admin/blogs' },
  { label: 'Projects', value: '4', icon: FolderOpen, color: 'text-green-400 bg-green-500/10 border-green-500/20', href: '/admin/projects' },
  { label: 'Messages', value: '0', icon: MessageSquare, color: 'text-purple-400 bg-purple-500/10 border-purple-500/20', href: '/admin/messages' },
  { label: 'Page Views', value: '—', icon: Eye, color: 'text-orange-400 bg-orange-500/10 border-orange-500/20', href: '#' },
];

const quickLinks = [
  { label: 'New Blog Post', href: '/admin/blogs/new', icon: FileText },
  { label: 'Add Project', href: '/admin/projects/new', icon: FolderOpen },
  { label: 'View Messages', href: '/admin/messages', icon: Mail },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen pt-16 p-4 sm:p-8">
      <div className="container-max max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <LayoutDashboard className="w-6 h-6 text-primary" aria-hidden="true" />
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          </div>
          <p className="text-muted-foreground">Manage your portfolio content and monitor site activity.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {cards.map((card) => (
            <Link
              key={card.label}
              href={card.href}
              className="group glass rounded-2xl border border-white/10 p-5 card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-3 ${card.color}`} aria-hidden="true">
                <card.icon className="w-5 h-5" />
              </div>
              <p className="text-2xl font-bold text-foreground">{card.value}</p>
              <p className="text-sm text-muted-foreground">{card.label}</p>
            </Link>
          ))}
        </div>

        {/* Quick links */}
        <div className="glass rounded-2xl border border-white/10 p-6 mb-8">
          <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
            Quick Actions
          </h2>
          <div className="grid sm:grid-cols-3 gap-3">
            {quickLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="group flex items-center justify-between p-4 rounded-xl border border-border hover:border-primary/30 hover:bg-primary/5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <div className="flex items-center gap-2">
                  <link.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" aria-hidden="true" />
                  <span className="text-sm font-medium">{link.label}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>

        {/* Notice */}
        <div className="glass rounded-2xl border border-primary/20 p-6 bg-primary/5">
          <div className="flex items-start gap-3">
            <Star className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold text-foreground mb-1">Portfolio Admin Panel</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                This admin panel lets you manage your portfolio content. Updates here reflect on your public site.
                The contact message inbox stores all form submissions from your visitors.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
