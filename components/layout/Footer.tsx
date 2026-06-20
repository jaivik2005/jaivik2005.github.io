import Link from 'next/link';
import { Github, Linkedin, Instagram, Mail, Code2, Heart, ExternalLink } from 'lucide-react';
import { siteConfig } from '@/lib/data';

const footerLinks = {
  Navigation: [
    { label: 'About', href: '/about' },
    { label: 'Skills', href: '/skills' },
    { label: 'Projects', href: '/projects' },
    { label: 'Experience', href: '/experience' },
  ],
  Resources: [
    { label: 'Blog', href: '/blog' },
    { label: 'Certifications', href: '/certifications' },
    { label: 'Education', href: '/education' },
    { label: 'Resume', href: '/resume' },
  ],
  Contact: [
    { label: 'Contact Me', href: '/contact' },
    { label: 'GitHub', href: siteConfig.author.github, external: true },
    { label: 'LinkedIn', href: siteConfig.author.linkedin, external: true },
    { label: 'Instagram', href: siteConfig.author.instagram, external: true },
  ],
};

const socials = [
  {
    icon: Github,
    href: siteConfig.author.github,
    label: 'GitHub profile',
  },
  {
    icon: Linkedin,
    href: siteConfig.author.linkedin,
    label: 'LinkedIn profile',
  },
  {
    icon: Instagram,
    href: siteConfig.author.instagram,
    label: 'Instagram profile',
  },
  {
    icon: Mail,
    href: `mailto:${siteConfig.author.email}`,
    label: 'Send email',
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative border-t border-border/50 bg-background"
      role="contentinfo"
    >
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" aria-hidden="true" />

      <div className="container-max px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="flex items-center gap-2 mb-4 w-fit group"
              aria-label="Jaivik Prajapati — Home"
            >
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center group-hover:shadow-glow transition-shadow duration-300">
                <Code2 className="w-4.5 h-4.5 text-white" aria-hidden="true" />
              </div>
              <span className="font-semibold text-lg">
                <span className="gradient-text">Jaivik</span>
                <span className="text-foreground/80"> Prajapati</span>
              </span>
            </Link>

            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mb-6">
              Computer Engineering student, Full Stack Developer, and Cybersecurity Enthusiast
              building modern web applications from Gujarat, India.
            </p>

            <div className="flex items-center gap-3" role="list" aria-label="Social media links">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="w-9 h-9 rounded-lg glass-sm flex items-center justify-center text-muted-foreground hover:text-primary hover:shadow-glow-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label={social.label}
                  role="listitem"
                >
                  <social.icon className="w-4 h-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <nav key={category} aria-label={`${category} links`}>
              <h3 className="text-sm font-semibold text-foreground mb-4">
                {category}
              </h3>
              <ul className="space-y-2.5" role="list">
                {links.map((link) => (
                  <li key={link.href}>
                    {'external' in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center gap-1.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                      >
                        {link.label}
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-70 transition-opacity" aria-hidden="true" />
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            &copy; {currentYear} Jaivik Prajapati. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1.5">
            Built with{' '}
            <Heart className="w-3.5 h-3.5 text-red-500 fill-current" aria-hidden="true" />
            {' '}using Next.js &amp; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
