'use client';

const techItems = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB',
  'PostgreSQL', 'Docker', 'Linux', 'Python', 'Tailwind CSS', 'JWT',
  'REST APIs', 'Git', 'GitHub', 'Vercel', 'AWS', 'Figma', 'Postman',
  'VS Code', 'C++', 'JavaScript', 'HTML5', 'CSS3',
];

export default function TechMarquee() {
  const doubled = [...techItems, ...techItems];

  return (
    <section className="py-12 border-y border-border/50 overflow-hidden" aria-label="Technology stack">
      <div className="mb-6 text-center">
        <p className="text-xs text-muted-foreground font-semibold uppercase tracking-widest">
          Technologies I work with
        </p>
      </div>
      <div
        className="flex"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        }}
        aria-hidden="true"
      >
        <div className="flex gap-6 animate-marquee hover:[animation-play-state:paused]">
          {doubled.map((tech, i) => (
            <div
              key={`${tech}-${i}`}
              className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl glass-sm text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all duration-200 cursor-default border border-white/5 hover:border-primary/30"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
              {tech}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
