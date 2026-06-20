import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock, Calendar, Tag, Share2 } from 'lucide-react';
import { blogPosts } from '@/lib/data';
import { AnimatedSection } from '@/components/sections/AnimatedSection';
import { formatDate } from '@/lib/utils';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return { title: 'Post Not Found' };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.image }],
      type: 'article',
      publishedTime: post.date,
    },
  };
}

const sampleContent: Record<string, string[]> = {
  'express-js-beginner-to-advanced': [
    'Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.',
    'In this guide, we\'ll cover everything from basic routing and middleware to advanced patterns like error handling, authentication, and production deployment.',
    '## Getting Started',
    'First, install Express.js using npm: `npm install express`',
    'Create your first Express server by calling `express()` and listening on a port. Express handles HTTP methods (GET, POST, PUT, DELETE) through clean, chainable route handlers.',
    '## Middleware',
    'Middleware functions are functions that have access to the request object, response object, and the `next` function. They can execute any code, modify the req/res objects, end the request-response cycle, or call the next middleware.',
    '## Advanced Patterns',
    'As your application grows, you\'ll want to use Router to organize routes, implement proper error handling with a global error handler, add authentication middleware using JWT, and structure your application with MVC patterns.',
  ],
  'complete-mongodb-guide': [
    'MongoDB is a source-available cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with optional schemas.',
    '## Installation & Connection',
    'Connect to MongoDB using the official Node.js driver or Mongoose ODM. Mongoose provides a straightforward, schema-based solution to model your application data.',
    '## CRUD Operations',
    'MongoDB\'s CRUD operations are intuitive. Create documents with `insertOne` or `insertMany`, read with `find` and `findOne`, update with `updateOne` or `updateMany`, and delete with `deleteOne` or `deleteMany`.',
    '## Aggregation Pipeline',
    'The aggregation pipeline is MongoDB\'s powerful data transformation framework. Chain stages like `$match`, `$group`, `$project`, `$sort`, and `$lookup` to analyze and transform your data.',
  ],
  'linux-commands-cheatsheet': [
    'Whether you\'re a developer, sysadmin, or security researcher, mastering Linux commands will make you significantly more productive.',
    '## File System Navigation',
    'Use `ls -la` to list files with permissions, `cd` to navigate directories, `pwd` to print current directory, `find` to search files, and `tree` for visual directory structure.',
    '## File Operations',
    'Copy with `cp`, move/rename with `mv`, delete with `rm`, create directories with `mkdir`, and view file contents with `cat`, `less`, or `head`/`tail`.',
    '## Process Management',
    'View running processes with `ps aux` or `top`/`htop`, kill processes with `kill -9 PID`, manage background jobs with `&`, `fg`, `bg`.',
    '## Networking',
    'Check connectivity with `ping`, inspect network with `netstat -tuln`, transfer files with `scp` or `rsync`, and make HTTP requests with `curl`.',
  ],
};

export default function BlogPostPage({ params }: Props) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const paragraphs = sampleContent[post.slug] ?? [post.excerpt];
  const relatedPosts = blogPosts.filter((p) => p.slug !== post.slug && p.tags.some((t) => post.tags.includes(t))).slice(0, 2);

  return (
    <div className="min-h-screen pt-16">
      {/* Back */}
      <div className="container-max px-4 sm:px-6 lg:px-8 pt-8">
        <AnimatedSection>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back to Blog
          </Link>
        </AnimatedSection>
      </div>

      {/* Hero */}
      <div className="relative h-64 sm:h-80 overflow-hidden mb-12">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" aria-hidden="true" />
      </div>

      <div className="container-max px-4 sm:px-6 lg:px-8 -mt-24 relative z-10 pb-20">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Article */}
          <article className="lg:col-span-3">
            <AnimatedSection>
              {/* Meta */}
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-4">
                <span className="tech-badge">{post.category}</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                  {post.readTime}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 leading-tight">
                {post.title}
              </h1>
            </AnimatedSection>

            {/* Tags */}
            <AnimatedSection delay={0.1}>
              <div className="flex flex-wrap gap-2 mb-8" role="list" aria-label="Post tags">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 text-xs text-muted-foreground px-3 py-1 rounded-full glass border border-white/10 hover:border-primary/30 hover:text-primary transition-colors cursor-default"
                    role="listitem"
                  >
                    <Tag className="w-2.5 h-2.5" aria-hidden="true" />
                    {tag}
                  </span>
                ))}
              </div>
            </AnimatedSection>

            {/* Content */}
            <AnimatedSection delay={0.15}>
              <div className="prose prose-invert prose-sm sm:prose-base max-w-none">
                {paragraphs.map((para, i) => {
                  if (para.startsWith('## ')) {
                    return (
                      <h2 key={i} className="text-xl font-bold text-foreground mt-8 mb-4">
                        {para.slice(3)}
                      </h2>
                    );
                  }
                  if (para.startsWith('# ')) {
                    return (
                      <h1 key={i} className="text-2xl font-bold text-foreground mt-8 mb-4">
                        {para.slice(2)}
                      </h1>
                    );
                  }
                  return (
                    <p key={i} className="text-muted-foreground leading-relaxed mb-4">
                      {para}
                    </p>
                  );
                })}
              </div>
            </AnimatedSection>

            {/* Share */}
            <AnimatedSection delay={0.2}>
              <div className="mt-12 pt-8 border-t border-border/50">
                <p className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Share2 className="w-4 h-4" aria-hidden="true" />
                  Share this post
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://jaivik.xyz/blog/${post.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl glass border border-white/10 text-sm hover:border-primary/30 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    Share on X
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://jaivik.xyz/blog/${post.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl glass border border-white/10 text-sm hover:border-primary/30 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    Share on LinkedIn
                  </a>
                </div>
              </div>
            </AnimatedSection>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <AnimatedSection delay={0.2} className="sticky top-24 space-y-6">
              {/* Author */}
              <div className="glass rounded-2xl p-5 border border-white/10">
                <h2 className="font-semibold text-foreground mb-3 text-sm">Written by</h2>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/30 flex-shrink-0">
                    <Image
                      src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100"
                      alt="Jaivik Prajapati"
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Jaivik Prajapati</p>
                    <p className="text-xs text-muted-foreground">Full Stack Developer</p>
                  </div>
                </div>
              </div>

              {/* Related */}
              {relatedPosts.length > 0 && (
                <div className="glass rounded-2xl p-5 border border-white/10">
                  <h2 className="font-semibold text-foreground mb-3 text-sm">Related Posts</h2>
                  <div className="space-y-3">
                    {relatedPosts.map((rp) => (
                      <Link
                        key={rp.slug}
                        href={`/blog/${rp.slug}`}
                        className="group block hover:bg-muted/50 rounded-lg p-2 -mx-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {rp.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">{rp.readTime}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </AnimatedSection>
          </aside>
        </div>
      </div>
    </div>
  );
}
