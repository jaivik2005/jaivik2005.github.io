'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { stats } from '@/lib/data';

export default function StatsStrip() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      className="relative py-16 border-y border-border/50"
      aria-label="Key statistics"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/3 via-accent-cyan/3 to-primary/3" aria-hidden="true" />
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group"
            >
              <p className="text-4xl sm:text-5xl font-bold gradient-text mb-1 group-hover:scale-110 transition-transform duration-200">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
