'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { AnimatedSection } from './AnimatedSection';

const services = [
  {
    icon: '🌐',
    title: 'Web Development',
    description: 'Modern, responsive websites and web applications built with React, Next.js, and Tailwind CSS.',
  },
  {
    icon: '⚡',
    title: 'Full Stack Development',
    description: 'Complete MERN stack applications with secure authentication, database design, and RESTful APIs.',
  },
  {
    icon: '👤',
    title: 'Portfolio Development',
    description: 'Personal and business portfolios that stand out — SEO-optimized, fast, and conversion-focused.',
  },
  {
    icon: '🛡️',
    title: 'Cybersecurity Consulting',
    description: 'Security assessments, vulnerability analysis, and best practice guidance for web applications.',
  },
];

export default function ServicesAndCTA() {
  return (
    <>
      {/* Services */}
      <section className="section-padding" aria-labelledby="services-heading">
        <div className="container-max">
          <AnimatedSection className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" aria-hidden="true" />
              Services
            </span>
            <h2 id="services-heading" className="text-3xl sm:text-4xl font-bold mb-4">
              What I <span className="gradient-text">Offer</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              From concept to deployment, I build digital products that are fast, secure, and built to last.
            </p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((service, i) => (
              <AnimatedSection key={service.title} delay={i * 0.1}>
                <div className="group p-6 glass rounded-2xl border border-white/10 card-hover h-full gradient-border">
                  <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
                    {service.icon}
                  </div>
                  <h3 className="text-base font-semibold text-foreground mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                  <div className="mt-4">
                    <Link
                      href="/contact"
                      className="text-xs font-medium text-primary hover:text-primary/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                    >
                      Get a quote →
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding" aria-labelledby="cta-heading">
        <div className="container-max">
          <AnimatedSection>
            <div className="relative overflow-hidden rounded-3xl glass border border-white/10 p-12 text-center aurora-bg">
              {/* Background elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent-cyan/10" aria-hidden="true" />
              <div className="relative z-10">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="inline-flex mb-6"
                  aria-hidden="true"
                >
                  <Sparkles className="w-8 h-8 text-accent-cyan" />
                </motion.div>
                <h2 id="cta-heading" className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                  Let's build something{' '}
                  <span className="gradient-text">together</span>
                </h2>
                <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8 leading-relaxed">
                  Whether you have a project in mind, an idea to explore, or just want to connect —
                  I'd love to hear from you.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow hover:shadow-glow-lg transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    Start a conversation
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                  <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold border border-border hover:border-primary/50 hover:bg-primary/5 text-foreground transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    Explore my work
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
