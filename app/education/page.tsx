import type { Metadata } from 'next';
import { GraduationCap, Calendar, MapPin, BookOpen } from 'lucide-react';
import { education } from '@/lib/data';
import { AnimatedSection, SectionHeading } from '@/components/sections/AnimatedSection';

export const metadata: Metadata = {
  title: 'Education',
  description: 'Education background of Jaivik Prajapati — B.E. Computer Engineering at BVM.',
};

export default function EducationPage() {
  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <section className="section-padding aurora-bg relative overflow-hidden" aria-label="Education page header">
        <div className="absolute inset-0 bg-grid opacity-20" aria-hidden="true" />
        <div className="container-max relative z-10 text-center">
          <SectionHeading
            center
            badge="Education"
            title="Academic"
            highlight="Background"
            description="My formal education journey and the knowledge it's building."
          />
        </div>
      </section>

      <section className="section-padding" aria-label="Education timeline">
        <div className="container-max max-w-4xl">
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent-cyan/50 to-transparent" aria-hidden="true" />

            <div className="space-y-8" role="list" aria-label="Education history">
              {education.map((edu, i) => (
                <AnimatedSection key={edu.id} delay={i * 0.1}>
                  <div className="relative pl-16" role="listitem">
                    {/* Icon */}
                    <div
                      className="absolute left-0 w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center shadow-glass"
                      aria-hidden="true"
                    >
                      <GraduationCap className={`w-5 h-5 ${edu.current ? 'text-primary' : 'text-muted-foreground'}`} />
                    </div>

                    <article className={`glass rounded-2xl border p-6 ${edu.current ? 'border-primary/20' : 'border-white/10'}`}>
                      {/* Header */}
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                        <div>
                          {edu.current && (
                            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 mb-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse-glow" aria-hidden="true" />
                              Currently Pursuing
                            </span>
                          )}
                          <h2 className="text-lg font-bold text-foreground">{edu.degree}</h2>
                          <p className="text-primary font-semibold">{edu.institution}</p>
                        </div>
                        <div className="text-right text-sm text-muted-foreground space-y-1">
                          <div className="flex items-center gap-1.5 justify-end">
                            <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>{edu.duration}</span>
                          </div>
                          <div className="flex items-center gap-1.5 justify-end">
                            <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>{edu.location}</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                        {edu.description}
                      </p>

                      {/* Courses */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <BookOpen className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                          <span className="text-sm font-semibold text-foreground">Relevant Coursework</span>
                        </div>
                        <div className="flex flex-wrap gap-2" role="list" aria-label="Courses">
                          {edu.courses.map((course) => (
                            <span key={course} className="tech-badge" role="listitem">{course}</span>
                          ))}
                        </div>
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
