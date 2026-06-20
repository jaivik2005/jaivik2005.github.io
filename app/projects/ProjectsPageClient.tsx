'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Github, ExternalLink, Search } from 'lucide-react';
import { projects } from '@/lib/data';
import { AnimatedSection, SectionHeading } from '@/components/sections/AnimatedSection';
import TiltCard from '@/components/sections/TiltCard';
import { cn } from '@/lib/utils';

const allCategories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];

export default function ProjectsPageClient() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = projects.filter((p) => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q) ||
      p.tech.some((t) => t.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-16">
      <section className="section-padding aurora-bg relative overflow-hidden" aria-label="Projects page header">
        <div className="absolute inset-0 bg-grid opacity-20" aria-hidden="true" />
        <div className="container-max relative z-10 text-center">
          <SectionHeading
            center
            badge="Portfolio"
            title="My"
            highlight="Projects"
            description="Applications I've built — from full-stack MERN apps to security tools and more."
          />
        </div>
      </section>

      <section className="section-padding" aria-label="Projects list">
        <div className="container-max">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
              <input
                type="search"
                placeholder="Search projects..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 glass rounded-xl border border-white/10 text-sm bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                aria-label="Search projects"
              />
            </div>

            {/* Category tabs */}
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter projects by category">
              {allCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  role="tab"
                  aria-selected={activeCategory === cat}
                  className={cn(
                    'px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                    activeCategory === cat
                      ? 'bg-primary text-primary-foreground shadow-glow-sm'
                      : 'glass border border-white/10 text-muted-foreground hover:text-foreground hover:border-primary/30'
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          {filtered.length > 0 ? (
            <motion.div
              key={`${activeCategory}-${search}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((project, i) => (
                <AnimatedSection key={project.slug} delay={i * 0.08}>
                  <TiltCard className="h-full">
                    <article className="group h-full glass rounded-2xl overflow-hidden border border-white/10 card-hover gradient-border">
                      <div className="relative h-52 overflow-hidden">
                        <Image
                          src={project.image}
                          alt={`${project.title} screenshot`}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" aria-hidden="true" />
                        <div className="absolute top-3 left-3 flex gap-2">
                          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-black/50 text-white border border-white/20">
                            {project.category}
                          </span>
                        </div>
                        <div className="absolute top-3 right-3">
                          <span
                            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                              project.status === 'Completed'
                                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                : project.status === 'Maintained'
                                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                                : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                            }`}
                          >
                            {project.status}
                          </span>
                        </div>
                      </div>

                      <div className="p-5">
                        <h2 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {project.title}
                        </h2>
                        <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-2">
                          {project.shortDescription}
                        </p>
                        <div className="flex flex-wrap gap-1.5 mb-4" role="list" aria-label="Technologies">
                          {project.tech.slice(0, 4).map((tech) => (
                            <span key={tech} className="tech-badge" role="listitem">{tech}</span>
                          ))}
                          {project.tech.length > 4 && (
                            <span className="tech-badge">+{project.tech.length - 4}</span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 pt-2 border-t border-border/50">
                          <Link
                            href={`/projects/${project.slug}`}
                            className="flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                          >
                            Details
                            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                          </Link>
                          <div className="flex items-center gap-2 ml-auto">
                            {project.github && (
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                                aria-label={`${project.title} GitHub repository`}
                              >
                                <Github className="w-4 h-4" aria-hidden="true" />
                              </a>
                            )}
                            {project.demo && (
                              <a
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                                aria-label={`${project.title} live demo`}
                              >
                                <ExternalLink className="w-4 h-4" aria-hidden="true" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </article>
                  </TiltCard>
                </AnimatedSection>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20">
              <p className="text-4xl mb-4" aria-hidden="true">🔍</p>
              <p className="text-muted-foreground">No projects found matching your search.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
