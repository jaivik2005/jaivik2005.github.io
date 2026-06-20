'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Github, ExternalLink } from 'lucide-react';
import { projects } from '@/lib/data';
import { AnimatedSection, SectionHeading } from './AnimatedSection';
import TiltCard from './TiltCard';

export default function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <section className="section-padding" aria-labelledby="featured-projects-heading">
      <div className="container-max">
        <SectionHeading
          badge="Projects"
          title="Featured"
          highlight="Work"
          description="A selection of projects I've built — from full-stack MERN applications to security tools."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featured.map((project, i) => (
            <AnimatedSection key={project.slug} delay={i * 0.1}>
              <TiltCard className="h-full">
                <div className="group h-full glass rounded-2xl overflow-hidden border border-white/10 card-hover gradient-border">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={`${project.title} screenshot`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" aria-hidden="true" />
                    {/* Status badge */}
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

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-2">
                      {project.shortDescription}
                    </p>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-1.5 mb-4" role="list" aria-label="Technologies used">
                      {project.tech.slice(0, 3).map((tech) => (
                        <span key={tech} className="tech-badge" role="listitem">
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 3 && (
                        <span className="tech-badge">+{project.tech.length - 3}</span>
                      )}
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-3 pt-2 border-t border-border/50">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                      >
                        View Details
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
                </div>
              </TiltCard>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border border-border hover:border-primary/50 hover:bg-primary/5 text-foreground transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            View All Projects
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
