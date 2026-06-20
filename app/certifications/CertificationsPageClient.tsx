'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Calendar, Tag, Search } from 'lucide-react';
import { certifications } from '@/lib/data';
import { AnimatedSection, SectionHeading } from '@/components/sections/AnimatedSection';
import { cn } from '@/lib/utils';

type Cert = typeof certifications[number];

const categories = ['All', ...Array.from(new Set(certifications.map((c) => c.category)))];

function CertModal({ cert, onClose }: { cert: Cert; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={`Certificate: ${cert.title}`}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="glass rounded-2xl border border-white/20 max-w-md w-full overflow-hidden shadow-glass-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative h-48">
            <Image
              src={cert.image}
              alt={cert.title}
              fill
              className="object-cover"
              sizes="480px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" aria-hidden="true" />
            <button
              onClick={onClose}
              className="absolute top-3 right-3 w-8 h-8 rounded-full glass border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
          <div className="p-5">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <h2 className="text-lg font-bold text-foreground">{cert.title}</h2>
                <p className="text-primary font-medium text-sm">{cert.issuer}</p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                {cert.date}
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-4" role="list" aria-label="Skills covered">
              {cert.skills.map((s) => (
                <span key={s} className="flex items-center gap-1 tech-badge" role="listitem">
                  <Tag className="w-2.5 h-2.5" aria-hidden="true" />
                  {s}
                </span>
              ))}
            </div>
            {cert.verifyUrl && cert.verifyUrl !== '#' && (
              <a
                href={cert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all w-full justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
                Verify Certificate
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function CertificationsPageClient() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Cert | null>(null);

  const filtered = certifications.filter((c) => {
    const matchCat = activeCategory === 'All' || c.category === activeCategory;
    const q = search.toLowerCase();
    const matchSearch = !q || c.title.toLowerCase().includes(q) || c.issuer.toLowerCase().includes(q) || c.skills.some((s) => s.toLowerCase().includes(q));
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen pt-16">
      <section className="section-padding aurora-bg relative overflow-hidden" aria-label="Certifications page header">
        <div className="absolute inset-0 bg-grid opacity-20" aria-hidden="true" />
        <div className="container-max relative z-10 text-center">
          <SectionHeading
            center
            badge="Credentials"
            title="My"
            highlight="Certifications"
            description="Professional certifications and courses I've completed across web dev, cybersecurity, and cloud."
          />
        </div>
      </section>

      <section className="section-padding" aria-label="Certifications grid">
        <div className="container-max">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
              <input
                type="search"
                placeholder="Search certifications..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 glass rounded-xl border border-white/10 text-sm bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                aria-label="Search certifications"
              />
            </div>
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
              {categories.map((cat) => (
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

          {filtered.length > 0 ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map((cert, i) => (
                <AnimatedSection key={cert.id} delay={i * 0.07}>
                  <button
                    onClick={() => setSelected(cert)}
                    className="group w-full text-left glass rounded-2xl border border-white/10 overflow-hidden card-hover gradient-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label={`View ${cert.title} certificate`}
                  >
                    <div className="relative h-36 overflow-hidden">
                      <Image
                        src={cert.image}
                        alt={cert.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" aria-hidden="true" />
                      <div className="absolute bottom-2 left-2">
                        <span className="tech-badge text-xs">{cert.category}</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-1">
                        {cert.title}
                      </p>
                      <p className="text-xs text-muted-foreground mb-2">{cert.issuer}</p>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" aria-hidden="true" />
                          {cert.date}
                        </span>
                        <span className="text-xs text-primary">View →</span>
                      </div>
                    </div>
                  </button>
                </AnimatedSection>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-4xl mb-4" aria-hidden="true">🔍</p>
              <p className="text-muted-foreground">No certifications found.</p>
            </div>
          )}
        </div>
      </section>

      {selected && <CertModal cert={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
