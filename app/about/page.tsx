import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import photo from './photo.jpeg';

import { MapPin, GraduationCap, Code2, Heart, Zap, Download, ArrowRight } from 'lucide-react';
import { AnimatedSection, SectionHeading } from '@/components/sections/AnimatedSection';
import { siteConfig } from '@/lib/data';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about Jaivik Prajapati — Computer Engineering student, Full Stack Developer, and Cybersecurity Enthusiast from Gujarat, India.',
};

const timeline = [
  {
    year: '2019',
    title: 'First Lines of Code',
    description: 'Wrote my first "Hello, World!" in C during school. That moment sparked a curiosity about how software works.',
    icon: '💡',
  },
  {
    year: '2021',
    title: 'Web Development Journey',
    description: 'Discovered HTML, CSS, and JavaScript. Built my first basic websites and fell in love with creating things people can interact with.',
    icon: '🌐',
  },
  {
    year: '2022',
    title: 'MERN Stack & Beyond',
    description: 'Dove into the MERN stack, built full-stack applications, and started exploring backend development with Node.js and Express.',
    icon: '⚡',
  },
  {
    year: '2023',
    title: 'Linux & Security',
    description: 'Switched to Linux as my primary OS and started exploring cybersecurity — network security, OWASP, and ethical hacking fundamentals.',
    icon: '🐧',
  },
  {
    year: '2024',
    title: 'Engineering Student at BVM',
    description: 'Joined BVM for B.E. Computer Engineering. Now combining formal education with hands-on project work and open-source contributions.',
    icon: '🎓',
  },
];

const values = [
  {
    icon: Code2,
    title: 'Clean Code',
    description: 'I believe well-written code is a form of communication. Readable, maintainable, and tested.',
  },
  {
    icon: Zap,
    title: 'Performance First',
    description: 'Every millisecond matters. I optimize for speed, accessibility, and Core Web Vitals from the start.',
  },
  {
    icon: Heart,
    title: 'Security Mindset',
    description: 'Security is not an afterthought. I approach every project with OWASP principles and defensive thinking.',
  },
  {
    icon: GraduationCap,
    title: 'Continuous Learning',
    description: 'Technology evolves fast. I read documentation, build side projects, and never stop being a student.',
  },
];

const funFacts = [
  { label: 'Favorite IDE', value: 'VS Code' },
  { label: 'Primary OS', value: 'Linux (Ubuntu)' },
  { label: 'Favorite Language', value: 'JavaScript / TypeScript' },
  { label: 'Coffee or Tea', value: 'Chai ☕' },
  { label: 'Tabs or Spaces', value: '2 Spaces' },
  { label: 'Terminal Theme', value: 'Tokyo Night' },
];

const interests = ['🏏 Cricket', '📚 Tech Blogs', '🎮 Gaming', '🐧 Linux Ricing', '🔐 CTF Challenges', '🎵 Music'];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <section className="section-padding aurora-bg relative overflow-hidden" aria-labelledby="about-heading">
        <div className="absolute inset-0 bg-grid opacity-20" aria-hidden="true" />
        <div className="container-max relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <AnimatedSection>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true" />
                  About Me
                </span>
                <h1 id="about-heading" className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
                  A developer who{' '}
                  <span className="gradient-text">loves</span> building
                </h1>
                <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
                  <p>
                    I'm <strong className="text-foreground">Jaivik Prajapati</strong>, a Computer Engineering
                    student at <strong className="text-foreground">Birla Vishvakarma Mahavidyalaya (BVM)</strong> in
                    Gujarat, India. I'm passionate about web development, cybersecurity, Linux, and cloud computing.
                  </p>
                  <p>
                    I love building scalable web applications that solve real problems. Whether it's crafting a
                    pixel-perfect UI or architecting a secure REST API, I approach every project with attention
                    to detail and a security-first mindset.
                  </p>
                  <p>
                    My goal is to become a skilled software engineer who contributes to innovative technology
                    solutions — and to never stop learning along the way.
                  </p>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                  <MapPin className="w-4 h-4 text-primary" aria-hidden="true" />
                  <span>Gujarat, India</span>
                  <span className="mx-2">·</span>
                  <GraduationCap className="w-4 h-4 text-primary" aria-hidden="true" />
                  <span>B.E. Computer Engineering, BVM</span>
                </div>

                <div className="flex flex-wrap gap-3">
                  <a
                    href="/resume.pdf"
                    download
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-all hover:-translate-y-0.5 shadow-glow hover:shadow-glow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <Download className="w-4 h-4" aria-hidden="true" />
                    Download Resume
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm border border-border hover:border-primary/50 hover:bg-primary/5 transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    Let's Connect
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </div>
              </AnimatedSection>
            </div>

            <AnimatedSection delay={0.2} className="flex justify-center">
              <div className="relative">
                <div className="block w-72 h-72 lg:w-80 lg:h-80 rounded-3xl overflow-hidden border border-white/10 shadow-glass-lg">
                  <Image
                    src={photo}
                    alt="Jaivik Prajapati"
                    width={320}
                    height={320}
                    className="object-cover w-full h-full"
                    priority
                  />
                </div>
                {/* Decorative elements */}
                <div className="absolute -bottom-4 -right-4 glass rounded-2xl p-4 text-sm font-semibold" aria-hidden="true">
                  <p className="text-primary">3+ Years</p>
                  <p className="text-muted-foreground text-xs">of coding</p>
                </div>
                <div className="absolute -top-4 -left-4 glass rounded-2xl p-4 text-sm font-semibold" aria-hidden="true">
                  <p className="text-accent-cyan">10+ Projects</p>
                  <p className="text-muted-foreground text-xs">shipped</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding" aria-labelledby="journey-heading">
        <div className="container-max">
          <SectionHeading badge="Journey" title="My" highlight="Story" description="How I went from curious student to full-stack developer." />

          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent-cyan to-transparent" aria-hidden="true" />
            <div className="space-y-8" role="list">
              {timeline.map((item, i) => (
                <AnimatedSection key={item.year} delay={i * 0.1}>
                  <div className="relative flex gap-6 pl-14" role="listitem">
                    <div
                      className="absolute left-0 w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center text-xl shadow-glass"
                      aria-hidden="true"
                    >
                      {item.icon}
                    </div>
                    <div className="flex-1 glass rounded-2xl p-5 border border-white/10">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-bold text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full">
                          {item.year}
                        </span>
                        <h3 className="font-semibold text-foreground">{item.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-muted/20" aria-labelledby="values-heading">
        <div className="container-max">
          <SectionHeading center badge="Principles" title="Working" highlight="Values" description="The principles that guide how I think, write code, and collaborate." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <AnimatedSection key={value.title} delay={i * 0.1}>
                <div className="group p-6 glass rounded-2xl border border-white/10 card-hover h-full">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors" aria-hidden="true">
                    <value.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Fun facts + Interests */}
      <section className="section-padding" aria-labelledby="personal-heading">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Fun facts */}
            <div>
              <SectionHeading badge="Personal" title="Fun" highlight="Facts" />
              <div className="grid grid-cols-2 gap-3">
                {funFacts.map((fact, i) => (
                  <AnimatedSection key={fact.label} delay={i * 0.08}>
                    <div className="glass rounded-xl p-4 border border-white/10">
                      <p className="text-xs text-muted-foreground mb-1">{fact.label}</p>
                      <p className="text-sm font-semibold text-foreground">{fact.value}</p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div>
              <SectionHeading badge="Beyond Code" title="Interests &" highlight="Hobbies" />
              <div className="flex flex-wrap gap-3">
                {interests.map((interest, i) => (
                  <AnimatedSection key={interest} delay={i * 0.07}>
                    <span className="px-4 py-2.5 glass rounded-xl text-sm font-medium border border-white/10 hover:border-primary/30 hover:text-primary transition-all duration-200 cursor-default">
                      {interest}
                    </span>
                  </AnimatedSection>
                ))}
              </div>
              <AnimatedSection delay={0.3} className="mt-8">
                <div className="glass rounded-2xl p-6 border border-white/10">
                  <h3 className="font-semibold text-foreground mb-2">Currently Learning</h3>
                  <div className="flex flex-wrap gap-2">
                    {['AWS Solutions Architect', 'Kubernetes', 'Penetration Testing', 'System Design'].map((item) => (
                      <span key={item} className="tech-badge">{item}</span>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
