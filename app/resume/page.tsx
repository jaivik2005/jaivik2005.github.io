import type { Metadata } from 'next';
import { Download, FileText, RefreshCw } from 'lucide-react';
import { AnimatedSection, SectionHeading } from '@/components/sections/AnimatedSection';
import { education, skills, projects, certifications } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Resume',
  description: 'Resume of Jaivik Prajapati — Full Stack Developer, Computer Engineering student at BVM.',
};

export default function ResumePage() {
  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <section className="section-padding aurora-bg relative overflow-hidden" aria-label="Resume page header">
        <div className="absolute inset-0 bg-grid opacity-20" aria-hidden="true" />
        <div className="container-max relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <SectionHeading
                badge="Resume"
                title="My"
                highlight="Resume"
                description="A summary of my education, skills, and projects."
              />
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow hover:shadow-glow-lg transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Download className="w-4 h-4" aria-hidden="true" />
                Download PDF
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Resume content */}
      <div className="container-max px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
        <div className="glass rounded-3xl border border-white/10 overflow-hidden shadow-glass-lg">
          {/* Resume header */}
          <div className="bg-gradient-to-r from-primary/10 via-accent-cyan/5 to-primary/10 border-b border-white/10 p-8 text-center">
            <AnimatedSection>
              <h1 className="text-3xl font-bold text-foreground mb-2">Jaivik Prajapati</h1>
              <p className="text-lg text-primary font-medium mb-3">Full Stack Developer · Computer Engineering Student</p>
              <p className="text-sm text-muted-foreground mb-4">Gujarat, India · jaivikprajapati@email.com · github.com/jaivikprajapati</p>
              <p className="text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Passionate Computer Engineering student specializing in full-stack web development, cybersecurity,
                and Linux. Experienced in building production-grade MERN applications with a focus on clean code,
                security, and performance.
              </p>
            </AnimatedSection>
          </div>

          <div className="p-8 space-y-10">
            {/* Education */}
            <AnimatedSection>
              <section aria-labelledby="resume-education">
                <h2 id="resume-education" className="text-xl font-bold text-foreground mb-6 flex items-center gap-2 pb-3 border-b border-border/50">
                  <span className="w-1 h-6 rounded-full bg-primary inline-block" aria-hidden="true" />
                  Education
                </h2>
                <div className="space-y-4">
                  {education.map((edu) => (
                    <div key={edu.id} className="flex flex-col sm:flex-row sm:justify-between gap-1">
                      <div>
                        <p className="font-semibold text-foreground">{edu.degree}</p>
                        <p className="text-primary text-sm">{edu.institution}</p>
                        <p className="text-muted-foreground text-xs">{edu.location}</p>
                      </div>
                      <div className="text-sm text-muted-foreground shrink-0">{edu.duration}</div>
                    </div>
                  ))}
                </div>
              </section>
            </AnimatedSection>

            {/* Skills summary */}
            <AnimatedSection delay={0.1}>
              <section aria-labelledby="resume-skills">
                <h2 id="resume-skills" className="text-xl font-bold text-foreground mb-6 flex items-center gap-2 pb-3 border-b border-border/50">
                  <span className="w-1 h-6 rounded-full bg-accent-cyan inline-block" aria-hidden="true" />
                  Technical Skills
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {Object.entries({
                    'Frontend': skills.frontend.map(s => s.name).join(', '),
                    'Backend': skills.backend.map(s => s.name).join(', '),
                    'Databases': skills.database.map(s => s.name).join(', '),
                    'Languages': skills.languages.map(s => s.name).join(', '),
                    'Cybersecurity': skills.cybersecurity.map(s => s.name).join(', '),
                    'DevOps & Tools': [...skills.devops, ...skills.tools].map(s => s.name).join(', '),
                  }).map(([cat, list]) => (
                    <div key={cat}>
                      <p className="text-sm font-semibold text-foreground mb-1">{cat}</p>
                      <p className="text-sm text-muted-foreground">{list}</p>
                    </div>
                  ))}
                </div>
              </section>
            </AnimatedSection>

            {/* Projects */}
            <AnimatedSection delay={0.2}>
              <section aria-labelledby="resume-projects">
                <h2 id="resume-projects" className="text-xl font-bold text-foreground mb-6 flex items-center gap-2 pb-3 border-b border-border/50">
                  <span className="w-1 h-6 rounded-full bg-green-400 inline-block" aria-hidden="true" />
                  Projects
                </h2>
                <div className="space-y-5">
                  {projects.slice(0, 3).map((p) => (
                    <div key={p.slug}>
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                        <p className="font-semibold text-foreground">{p.title}</p>
                        <span className="text-xs text-muted-foreground">{p.year}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{p.shortDescription}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {p.tech.map((t) => (
                          <span key={t} className="tech-badge text-xs">{t}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </AnimatedSection>

            {/* Certifications */}
            <AnimatedSection delay={0.3}>
              <section aria-labelledby="resume-certs">
                <h2 id="resume-certs" className="text-xl font-bold text-foreground mb-6 flex items-center gap-2 pb-3 border-b border-border/50">
                  <span className="w-1 h-6 rounded-full bg-yellow-400 inline-block" aria-hidden="true" />
                  Certifications
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {certifications.map((cert) => (
                    <div key={cert.id} className="flex flex-col sm:flex-row sm:justify-between gap-1 glass rounded-xl p-3 border border-white/10">
                      <div>
                        <p className="text-sm font-semibold text-foreground">{cert.title}</p>
                        <p className="text-xs text-muted-foreground">{cert.issuer}</p>
                      </div>
                      <span className="text-xs text-muted-foreground shrink-0">{cert.date}</span>
                    </div>
                  ))}
                </div>
              </section>
            </AnimatedSection>
          </div>

          {/* Footer */}
          <div className="border-t border-border/50 px-8 py-4 flex items-center justify-between text-xs text-muted-foreground bg-muted/20">
            <div className="flex items-center gap-2">
              <RefreshCw className="w-3 h-3" aria-hidden="true" />
              <span>Last updated: June 2025</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-3 h-3" aria-hidden="true" />
              <span>jaivik.xyz/resume</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
