'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock, Tag } from 'lucide-react';
import { blogPosts } from '@/lib/data';
import { AnimatedSection, SectionHeading } from './AnimatedSection';
import { formatDate } from '@/lib/utils';

export default function LatestBlog() {
  return (
    <section className="section-padding bg-muted/20" aria-labelledby="latest-blog-heading">
      <div className="container-max">
        <SectionHeading
          badge="Blog"
          title="Latest"
          highlight="Writings"
          description="Thoughts on web development, Linux, cybersecurity, and everything I'm learning along the way."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {blogPosts.map((post, i) => (
            <AnimatedSection key={post.slug} delay={i * 0.1}>
              <article className="group h-full glass rounded-2xl overflow-hidden border border-white/10 card-hover gradient-border">
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" aria-hidden="true" />
                  <div className="absolute top-3 left-3">
                    <span className="tech-badge text-xs">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                      {post.readTime}
                    </span>
                    <span>·</span>
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                  </div>

                  <h3 className="text-base font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-4">
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-3" role="list" aria-label="Post tags">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 text-xs text-muted-foreground px-2 py-0.5 rounded-full bg-muted border border-border"
                        role="listitem"
                      >
                        <Tag className="w-2.5 h-2.5" aria-hidden="true" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                  >
                    Read more
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border border-border hover:border-primary/50 hover:bg-primary/5 text-foreground transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            View All Posts
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
