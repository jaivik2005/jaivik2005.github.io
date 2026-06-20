import { MetadataRoute } from 'next';
import { projects, blogPosts } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://jaivik.xyz';

  const staticRoutes = [
    '',
    '/about',
    '/skills',
    '/projects',
    '/experience',
    '/education',
    '/certifications',
    '/blog',
    '/resume',
    '/contact',
  ].map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const projectRoutes = projects.map((p) => ({
    url: `${base}/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const blogRoutes = blogPosts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}
