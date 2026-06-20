'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Mail, MapPin, Github, Linkedin, ChevronDown } from 'lucide-react';
import TypewriterText from './TypewriterText';
import { siteConfig } from '@/lib/data';

const techIcons = [
  { name: 'React', color: '#61DAFB', symbol: '⚛' },
  { name: 'Node.js', color: '#339933', symbol: 'N' },
  { name: 'TypeScript', color: '#3178C6', symbol: 'TS' },
  { name: 'MongoDB', color: '#47A248', symbol: 'M' },
  { name: 'Docker', color: '#2496ED', symbol: '🐋' },
  { name: 'Linux', color: '#FCC624', symbol: '🐧' },
];

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden aurora-bg pt-16"
      aria-label="Hero section"
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-30" aria-hidden="true" />

      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full bg-primary/5 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-accent-cyan/5 blur-3xl"
        />
      </div>

      {/* Floating tech icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {techIcons.map((icon, i) => (
          <motion.div
            key={icon.name}
            className="absolute glass-sm rounded-xl px-3 py-2 text-xs font-bold shadow-glass hidden lg:flex items-center gap-1.5"
            style={{
              top: `${20 + (i % 3) * 25}%`,
              left: i < 3 ? `${5 + i * 8}%` : undefined,
              right: i >= 3 ? `${5 + (i - 3) * 8}%` : undefined,
              color: icon.color,
              borderColor: `${icon.color}30`,
            }}
            animate={{
              y: [0, -12, 0],
              rotate: [0, i % 2 === 0 ? 3 : -3, 0],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
          >
            <span>{icon.symbol}</span>
            <span style={{ color: 'inherit' }}>{icon.name}</span>
          </motion.div>
        ))}
      </div>

      <div className="container-max px-4 sm:px-6 lg:px-8 relative z-10 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div className="order-2 lg:order-1">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse-glow" aria-hidden="true" />
                Available for opportunities
              </span>
            </motion.div>

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <p className="text-muted-foreground text-lg mb-2">Hi, I'm</p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-3 leading-tight">
                Jaivik{' '}
                <span className="gradient-text">Prajapati</span>
              </h1>
            </motion.div>

            {/* Typewriter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="mb-6"
            >
              <TypewriterText />
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-8 max-w-lg"
            >
              Computer Engineering student at{' '}
              <span className="text-foreground font-medium">BVM</span>,
              passionate about building scalable web applications, exploring Linux systems,
              and diving deep into cybersecurity.
            </motion.p>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="flex items-center gap-2 text-sm text-muted-foreground mb-8"
            >
              <MapPin className="w-4 h-4 text-primary" aria-hidden="true" />
              <span>Gujarat, India</span>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-3 mb-8"
            >
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 shadow-glow hover:shadow-glow-lg hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                View Projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
              </Link>
              <a
                href="/resume.pdf"
                download
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border border-border hover:border-primary/50 hover:bg-primary/5 text-foreground transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Download className="w-4 h-4" aria-hidden="true" />
                Download Resume
              </a>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border border-accent-cyan/30 text-accent-cyan hover:bg-accent-cyan/10 hover:border-accent-cyan/50 transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
                Contact Me
              </Link>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-4"
              role="list"
              aria-label="Social profiles"
            >
              <a
                href={siteConfig.author.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                aria-label="GitHub profile"
                role="listitem"
              >
                <Github className="w-4 h-4" aria-hidden="true" />
                <span>GitHub</span>
              </a>
              <span className="w-px h-4 bg-border" aria-hidden="true" />
              <a
                href={siteConfig.author.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                aria-label="LinkedIn profile"
                role="listitem"
              >
                <Linkedin className="w-4 h-4" aria-hidden="true" />
                <span>LinkedIn</span>
              </a>
            </motion.div>
          </div>

          {/* Right: Profile image */}
          <motion.div
            className="order-1 lg:order-2 flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative">
              {/* Rotating gradient border */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-accent-cyan to-primary opacity-60 blur-sm scale-105"
                aria-hidden="true"
              />
              <div className="relative w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-2 border-white/10 shadow-glass-lg">
                <Image
                  src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Jaivik Prajapati — Full Stack Developer"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 640px) 224px, (max-width: 1024px) 288px, 320px"
                />
              </div>

              {/* Floating badge 1 */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-4 -left-4 glass rounded-xl px-3 py-2 text-xs font-semibold shadow-glass"
                aria-hidden="true"
              >
                <span className="text-green-400">●</span> Open to Work
              </motion.div>

              {/* Floating badge 2 */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -top-4 -right-4 glass rounded-xl px-3 py-2 text-xs font-semibold shadow-glass"
                aria-hidden="true"
              >
                💻 MERN Stack
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-xs text-muted-foreground">Scroll down</span>
        <motion.div
          animate={{ y: [0, 8, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border border-border flex items-start justify-center p-1"
        >
          <div className="w-1 h-2 rounded-full bg-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
}
