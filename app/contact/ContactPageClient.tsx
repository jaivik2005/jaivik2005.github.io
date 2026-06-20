'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail, MapPin, Clock, Github, Linkedin, Instagram,
  Send, CheckCircle, AlertCircle, Loader2
} from 'lucide-react';
import { AnimatedSection, SectionHeading } from '@/components/sections/AnimatedSection';
import { siteConfig } from '@/lib/data';
import { cn } from '@/lib/utils';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000, 'Message must not exceed 2000 characters'),
  // Honeypot
  website: z.string().max(0, 'Bot detected'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const socials = [
  { icon: Github, label: 'GitHub', href: siteConfig.author.github, handle: '@jaivikprajapati' },
  { icon: Linkedin, label: 'LinkedIn', href: siteConfig.author.linkedin, handle: 'jaivikprajapati' },
  { icon: Instagram, label: 'Instagram', href: siteConfig.author.instagram, handle: '@jaivikprajapati' },
  { icon: Mail, label: 'Email', href: `mailto:${siteConfig.author.email}`, handle: siteConfig.author.email },
];

export default function ContactPageClient() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [charCount, setCharCount] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
        }),
      });

      if (!res.ok) throw new Error('Failed to send');

      setStatus('success');
      reset();
      setCharCount(0);
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <section className="section-padding aurora-bg relative overflow-hidden" aria-label="Contact page header">
        <div className="absolute inset-0 bg-grid opacity-20" aria-hidden="true" />
        <div className="container-max relative z-10 text-center">
          <SectionHeading
            center
            badge="Contact"
            title="Let's"
            highlight="Connect"
            description="Have a project in mind, a question, or just want to say hi? I'd love to hear from you."
          />
        </div>
      </section>

      <section className="section-padding" aria-label="Contact form and information">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Left: Info */}
            <div>
              <AnimatedSection>
                <h2 className="text-2xl font-bold text-foreground mb-2">Get in touch</h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  I'm currently open to new opportunities and collaborations. Whether it's a project,
                  internship, or just a tech conversation — reach out and I'll get back to you shortly.
                </p>
              </AnimatedSection>

              {/* Contact details */}
              <div className="space-y-4 mb-10">
                <AnimatedSection delay={0.1}>
                  <div className="flex items-center gap-3 glass rounded-xl p-4 border border-white/10">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Location</p>
                      <p className="text-sm text-muted-foreground">Gujarat, India</p>
                    </div>
                  </div>
                </AnimatedSection>

                <AnimatedSection delay={0.15}>
                  <div className="flex items-center gap-3 glass rounded-xl p-4 border border-white/10">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Email</p>
                      <a
                        href={`mailto:${siteConfig.author.email}`}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                      >
                        {siteConfig.author.email}
                      </a>
                    </div>
                  </div>
                </AnimatedSection>

                <AnimatedSection delay={0.2}>
                  <div className="flex items-center gap-3 glass rounded-xl p-4 border border-white/10">
                    <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                      <Clock className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Response Time</p>
                      <p className="text-sm text-muted-foreground">Usually within 24–48 hours</p>
                    </div>
                  </div>
                </AnimatedSection>
              </div>

              {/* Social links */}
              <AnimatedSection delay={0.25}>
                <h3 className="text-sm font-semibold text-foreground mb-4">Find me on</h3>
                <div className="grid grid-cols-2 gap-3">
                  {socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target={social.href.startsWith('http') ? '_blank' : undefined}
                      rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="group flex items-center gap-3 glass rounded-xl p-3 border border-white/10 hover:border-primary/30 hover:bg-primary/5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <social.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" aria-hidden="true" />
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-foreground">{social.label}</p>
                        <p className="text-xs text-muted-foreground truncate">{social.handle}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </AnimatedSection>
            </div>

            {/* Right: Form */}
            <AnimatedSection delay={0.15}>
              <div className="glass rounded-2xl border border-white/10 p-6 sm:p-8">
                <h2 className="text-xl font-bold text-foreground mb-6">Send a message</h2>

                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                      role="alert"
                    >
                      <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" aria-hidden="true" />
                      <h3 className="text-xl font-semibold text-foreground mb-2">Message sent!</h3>
                      <p className="text-muted-foreground text-sm mb-6">
                        Thanks for reaching out. I'll get back to you within 24–48 hours.
                      </p>
                      <button
                        onClick={() => setStatus('idle')}
                        className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        Send another message
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-4"
                      aria-label="Contact form"
                      noValidate
                    >
                      {/* Honeypot */}
                      <input
                        {...register('website')}
                        type="text"
                        className="absolute -left-[9999px]"
                        tabIndex={-1}
                        aria-hidden="true"
                        autoComplete="off"
                      />

                      {/* Name + Email */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">
                            Name <span className="text-destructive" aria-label="required">*</span>
                          </label>
                          <input
                            id="name"
                            type="text"
                            {...register('name')}
                            className={cn(
                              'w-full px-4 py-2.5 glass rounded-xl border text-sm bg-transparent text-foreground placeholder:text-muted-foreground',
                              'focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all',
                              errors.name ? 'border-destructive' : 'border-white/10 focus:border-primary/50'
                            )}
                            placeholder="Your name"
                            aria-describedby={errors.name ? 'name-error' : undefined}
                            aria-invalid={!!errors.name}
                          />
                          {errors.name && (
                            <p id="name-error" className="mt-1 text-xs text-destructive flex items-center gap-1" role="alert">
                              <AlertCircle className="w-3 h-3" aria-hidden="true" />
                              {errors.name.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                            Email <span className="text-destructive" aria-label="required">*</span>
                          </label>
                          <input
                            id="email"
                            type="email"
                            {...register('email')}
                            className={cn(
                              'w-full px-4 py-2.5 glass rounded-xl border text-sm bg-transparent text-foreground placeholder:text-muted-foreground',
                              'focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all',
                              errors.email ? 'border-destructive' : 'border-white/10 focus:border-primary/50'
                            )}
                            placeholder="your@email.com"
                            aria-describedby={errors.email ? 'email-error' : undefined}
                            aria-invalid={!!errors.email}
                          />
                          {errors.email && (
                            <p id="email-error" className="mt-1 text-xs text-destructive flex items-center gap-1" role="alert">
                              <AlertCircle className="w-3 h-3" aria-hidden="true" />
                              {errors.email.message}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Subject */}
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-1.5">
                          Subject <span className="text-destructive" aria-label="required">*</span>
                        </label>
                        <input
                          id="subject"
                          type="text"
                          {...register('subject')}
                          className={cn(
                            'w-full px-4 py-2.5 glass rounded-xl border text-sm bg-transparent text-foreground placeholder:text-muted-foreground',
                            'focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all',
                            errors.subject ? 'border-destructive' : 'border-white/10 focus:border-primary/50'
                          )}
                          placeholder="What's this about?"
                          aria-describedby={errors.subject ? 'subject-error' : undefined}
                          aria-invalid={!!errors.subject}
                        />
                        {errors.subject && (
                          <p id="subject-error" className="mt-1 text-xs text-destructive flex items-center gap-1" role="alert">
                            <AlertCircle className="w-3 h-3" aria-hidden="true" />
                            {errors.subject.message}
                          </p>
                        )}
                      </div>

                      {/* Message */}
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">
                          Message <span className="text-destructive" aria-label="required">*</span>
                        </label>
                        <textarea
                          id="message"
                          rows={5}
                          {...register('message', {
                            onChange: (e) => setCharCount(e.target.value.length),
                          })}
                          className={cn(
                            'w-full px-4 py-2.5 glass rounded-xl border text-sm bg-transparent text-foreground placeholder:text-muted-foreground resize-none',
                            'focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all',
                            errors.message ? 'border-destructive' : 'border-white/10 focus:border-primary/50'
                          )}
                          placeholder="Tell me about your project or question..."
                          aria-describedby={errors.message ? 'message-error' : 'char-count'}
                          aria-invalid={!!errors.message}
                        />
                        <div className="flex items-center justify-between mt-1">
                          {errors.message ? (
                            <p id="message-error" className="text-xs text-destructive flex items-center gap-1" role="alert">
                              <AlertCircle className="w-3 h-3" aria-hidden="true" />
                              {errors.message.message}
                            </p>
                          ) : <span />}
                          <p
                            id="char-count"
                            className={cn('text-xs', charCount > 1900 ? 'text-destructive' : 'text-muted-foreground')}
                            aria-live="polite"
                          >
                            {charCount}/2000
                          </p>
                        </div>
                      </div>

                      {/* Error state */}
                      {status === 'error' && (
                        <div className="flex items-center gap-2 p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-sm text-destructive" role="alert">
                          <AlertCircle className="w-4 h-4" aria-hidden="true" />
                          Something went wrong. Please try again or email me directly.
                        </div>
                      )}

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed shadow-glow-sm hover:shadow-glow transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        aria-live="polite"
                      >
                        {status === 'loading' ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" aria-hidden="true" />
                            Send Message
                          </>
                        )}
                      </button>

                      <p className="text-xs text-center text-muted-foreground">
                        I typically respond within 24–48 hours.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}
