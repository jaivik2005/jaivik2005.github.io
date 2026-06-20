'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { roles } from '@/lib/data';

export default function TypewriterText() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const current = roles[currentIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (isPaused) {
      timeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, 1800);
      return () => clearTimeout(timeout);
    }

    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, displayed.length + 1));
      }, 60);
    } else if (!isDeleting && displayed.length === current.length) {
      setIsPaused(true);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, displayed.length - 1));
      }, 30);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setCurrentIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, isPaused, currentIndex]);

  return (
    <div className="flex items-center gap-0.5 min-h-[2.5rem] sm:min-h-[3rem]" aria-live="polite" aria-atomic="true">
      <span
        className="text-xl sm:text-2xl md:text-3xl font-semibold gradient-text"
        aria-label={roles[currentIndex]}
      >
        {displayed}
      </span>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
        className="inline-block w-0.5 h-7 sm:h-8 bg-primary ml-0.5 rounded-full"
        aria-hidden="true"
      />
    </div>
  );
}
