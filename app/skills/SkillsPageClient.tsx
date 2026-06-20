'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn, getLevelLabel } from '@/lib/utils';
import { skills } from '@/lib/data';
import { AnimatedSection, SectionHeading } from '@/components/sections/AnimatedSection';
import TiltCard from '@/components/sections/TiltCard';

const categories = [
  { key: 'all', label: 'All Skills' },
  { key: 'frontend', label: 'Frontend' },
  { key: 'backend', label: 'Backend' },
  { key: 'database', label: 'Database' },
  { key: 'languages', label: 'Languages' },
  { key: 'cybersecurity', label: 'Cybersecurity' },
  { key: 'devops', label: 'DevOps & Cloud' },
  { key: 'tools', label: 'Tools' },
] as const;

type CategoryKey = typeof categories[number]['key'];

function SkillBar({ level, name }: { level: number; name: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="w-full">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs text-muted-foreground">{name}</span>
        <span className="text-xs font-medium text-primary">{level}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-muted overflow-hidden" role="progressbar" aria-valuenow={level} aria-valuemin={0} aria-valuemax={100} aria-label={`${name} proficiency: ${level}%`}>
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-primary to-accent-cyan"
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
        />
      </div>
    </div>
  );
}

type SkillItem = { name: string; level: number; icon: string };

function SkillCard({ skill }: { skill: SkillItem }) {
  const [hovered, setHovered] = useState(false);
  const level = getLevelLabel(skill.level);

  return (
    <TiltCard intensity={6}>
      <div
        className={cn(
          'group relative p-4 glass rounded-xl border transition-all duration-300 cursor-default h-full',
          hovered ? 'border-primary/50 shadow-glow-sm' : 'border-white/10'
        )}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        role="listitem"
      >
        <div className="flex items-start justify-between mb-3">
          <span className="text-2xl" aria-hidden="true">{skill.icon}</span>
          <span
            className={cn(
              'text-xs font-semibold px-2 py-0.5 rounded-full',
              level === 'Proficient' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
              level === 'Advanced' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
              level === 'Intermediate' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
              'bg-muted text-muted-foreground border border-border'
            )}
          >
            {level}
          </span>
        </div>
        <p className="font-semibold text-foreground text-sm mb-2">{skill.name}</p>
        <SkillBar level={skill.level} name={skill.name} />
      </div>
    </TiltCard>
  );
}

export default function SkillsPageClient() {
  const [active, setActive] = useState<CategoryKey>('all');

  const getSkills = (): SkillItem[] => {
    if (active === 'all') {
      return Object.values(skills).flat();
    }
    return skills[active as keyof typeof skills] || [];
  };

  const displayedSkills = getSkills();

  return (
    <div className="min-h-screen pt-16">
      <section className="section-padding aurora-bg relative overflow-hidden" aria-label="Skills page header">
        <div className="absolute inset-0 bg-grid opacity-20" aria-hidden="true" />
        <div className="container-max relative z-10 text-center">
          <SectionHeading
            center
            badge="Skills"
            title="Technical"
            highlight="Expertise"
            description="Technologies and tools I've worked with, from frontend frameworks to cybersecurity fundamentals."
          />
        </div>
      </section>

      <section className="section-padding" aria-labelledby="skills-grid-heading">
        <div className="container-max">
          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 mb-10" role="tablist" aria-label="Skill category filter">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActive(cat.key)}
                role="tab"
                aria-selected={active === cat.key}
                className={cn(
                  'px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                  active === cat.key
                    ? 'bg-primary text-primary-foreground shadow-glow-sm'
                    : 'glass border border-white/10 text-muted-foreground hover:text-foreground hover:border-primary/30'
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Skills grid */}
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
            role="list"
            aria-label={`${active === 'all' ? 'All' : active} skills`}
          >
            {displayedSkills.map((skill, i) => (
              <AnimatedSection key={`${active}-${skill.name}`} delay={i * 0.04}>
                <SkillCard skill={skill} />
              </AnimatedSection>
            ))}
          </motion.div>

          {/* Legend */}
          <AnimatedSection delay={0.3} className="mt-10">
            <div className="glass rounded-2xl p-6 border border-white/10">
              <p className="text-sm font-semibold text-foreground mb-4">Proficiency Scale</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: 'Beginner', desc: '< 50%', color: 'text-muted-foreground bg-muted border-border' },
                  { label: 'Intermediate', desc: '50–69%', color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20' },
                  { label: 'Advanced', desc: '70–84%', color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
                  { label: 'Proficient', desc: '85%+', color: 'text-green-400 bg-green-500/10 border-green-500/20' },
                ].map((level) => (
                  <div key={level.label} className="flex items-center gap-2">
                    <span className={cn('text-xs font-semibold px-2 py-0.5 rounded-full border', level.color)}>
                      {level.label}
                    </span>
                    <span className="text-xs text-muted-foreground">{level.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
