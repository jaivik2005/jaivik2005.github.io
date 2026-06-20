'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  once?: boolean;
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
  direction = 'up',
  once = true,
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: '-60px' });

  const initial = {
    opacity: 0,
    y: direction === 'up' ? 24 : direction === 'down' ? -24 : 0,
    x: direction === 'left' ? 24 : direction === 'right' ? -24 : 0,
  };

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : initial}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function StaggerContainer({ children, className }: StaggerContainerProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const items = Array.isArray(children) ? children : [children];

  return (
    <div ref={ref} className={cn(className)}>
      {items.map((child, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}

export function SectionHeading({
  badge,
  title,
  highlight,
  description,
  className,
  center = false,
}: {
  badge?: string;
  title: string;
  highlight?: string;
  description?: string;
  className?: string;
  center?: boolean;
}) {
  return (
    <div className={cn(center ? 'text-center' : '', 'mb-12', className)}>
      {badge && (
        <AnimatedSection>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" aria-hidden="true" />
            {badge}
          </span>
        </AnimatedSection>
      )}
      <AnimatedSection delay={0.1}>
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
          {title}{' '}
          {highlight && <span className="gradient-text">{highlight}</span>}
        </h2>
      </AnimatedSection>
      {description && (
        <AnimatedSection delay={0.2}>
          <p className={cn('text-muted-foreground text-lg leading-relaxed', center ? 'mx-auto' : '', 'max-w-2xl')}>
            {description}
          </p>
        </AnimatedSection>
      )}
    </div>
  );
}
