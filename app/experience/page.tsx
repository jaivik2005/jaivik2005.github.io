import type { Metadata } from 'next';
import { Briefcase, Github, Calendar, MapPin, ChevronRight } from 'lucide-react';
import { experience } from '@/lib/data';
import { AnimatedSection, SectionHeading } from '@/components/sections/AnimatedSection';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Experience',
  description: 'Work experience and projects by Jaivik Prajapati — full-stack development, open source, and freelance.',
};

const typeColors = {
  project: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  freelance: 'bg-green-500/10 text-green-400 border-green-500/20',
  internship: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  opensource: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
};

const typeLabels = {
  project: 'Projects',
  freelance: 'Freelance',
  internship: 'Internship',
  opensource: 'Open Source',
};

export default function ExperiencePage() {
  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <section className="section-padding aurora-bg relative overflow-hidden" aria-label="Experience page header">
        <div className="absolute inset-0 bg-grid opacity-20" aria-hidden="true" />
        <div className="container-max relative z-10 text-center">
          <SectionHeading
            center
            badge="Career"
            title="My"
            highlight="Experience"
            description="Projects, open source contributions, and internship opportunities I've pursued."
          />
        </div>
      </section>

      <section className="section-padding" aria-label="Experience timeline">
        <div className="container-max max-w-4xl">
          {/* Open to Internship Banner */}
          <AnimatedSection className="mb-12">
            <div className="relative overflow-hidden glass rounded-2xl border border-primary/20 p-6 bg-primary/5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                  <Briefcase className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="font-semibold text-foreground mb-1 text-lg">Open to Internship Opportunities</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
                    I'm actively looking for internship opportunities in full-stack development, backend engineering,
                    or cybersecurity. If you're building something interesting and need a motivated developer,{' '}
                    <Link href="/contact" className="text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded">
                      let's talk
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent-cyan/50 to-transparent" aria-hidden="true" />

            <div className="space-y-8" role="list" aria-label="Work experience">
              {experience.map((exp, i) => (
                <AnimatedSection key={exp.id} delay={i * 0.1}>
                  <div className="relative pl-16" role="listitem">
                    {/* Timeline dot */}
                    <div
                      className="absolute left-0 w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center shadow-glass"
                      aria-hidden="true"
                    >
                      {exp.type === 'opensource' ? (
                        <Github className="w-5 h-5 text-orange-400" />
                      ) : (
                        <Briefcase className="w-5 h-5 text-blue-400" />
                      )}
                    </div>

                    <article className="glass rounded-2xl border border-white/10 p-6">
                      {/* Header */}
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                        <div>
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span
                              className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${typeColors[exp.type]}`}
                            >
                              {typeLabels[exp.type]}
                            </span>
                          </div>
                          <h2 className="text-xl font-bold text-foreground">{exp.title}</h2>
                          <p className="text-primary font-medium">{exp.company}</p>
                        </div>
                        <div className="text-right text-sm text-muted-foreground space-y-1">
                          <div className="flex items-center gap-1.5 justify-end">
                            <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>{exp.duration}</span>
                          </div>
                          <div className="flex items-center gap-1.5 justify-end">
                            <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>{exp.location}</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                        {exp.description}
                      </p>

                      {/* Highlights */}
                      <ul className="space-y-2 mb-4" role="list" aria-label="Key highlights">
                        {exp.highlights.map((h) => (
                          <li key={h} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Tech */}
                      <div className="flex flex-wrap gap-1.5" role="list" aria-label="Technologies">
                        {exp.tech.map((t) => (
                          <span key={t} className="tech-badge" role="listitem">{t}</span>
                        ))}
                      </div>
                    </article>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
