import type { Metadata } from 'next';
import BlogPageClient from './BlogPageClient';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Guides, tutorials, and notes on web development, Linux, cybersecurity, and programming by Jaivik Prajapati.',
};

export default function BlogPage() {
  return <BlogPageClient />;
}
