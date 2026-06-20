// import type { Metadata } from 'next';
// import Image from 'next/image';
// import Link from 'next/link';
// import { notFound } from 'next/navigation';
// import { ArrowLeft, ArrowRight, Github, ExternalLink, CheckCircle, Calendar } from 'lucide-react';
// import { projects } from '@/lib/data';
// import { AnimatedSection } from '@/components/sections/AnimatedSection';


// interface Props {
//   params: { slug: string };
// }

// export async function generateStaticParams() {
//   return projects.map((p) => ({ slug: p.slug }));
// }

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const project = projects.find((p) => p.slug === params.slug);
//   if (!project) return { title: 'Project Not Found' };
//   return {
//     title: project.title,
//     description: project.shortDescription,
//   };
// }

// export default function ProjectDetailPage({ params }: Props) {
//   const project = projects.find((p) => p.slug === params.slug);
//   if (!project) notFound();

//   const currentIndex = projects.findIndex((p) => p.slug === params.slug);
//   const prevProject = projects[currentIndex - 1] ?? null;
//   const nextProject = projects[currentIndex + 1] ?? null;

//   return (
//     <div className="min-h-screen pt-16">
//       {/* Back */}
//       <div className="container-max px-4 sm:px-6 lg:px-8 pt-8">
//         <AnimatedSection>
//           <Link
//             href="/projects"
//             className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
//           >
//             <ArrowLeft className="w-4 h-4" aria-hidden="true" />
//             Back to Projects
//           </Link>
//         </AnimatedSection>
//       </div>

//       {/* Hero image */}
//       <div className="relative h-72 sm:h-96 overflow-hidden">
//         <Image
//           src={project.image}
//           alt={`${project.title} screenshot`}
//           fill
//           className="object-cover"
//           priority
//           sizes="100vw"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" aria-hidden="true" />
//       </div>

//       <div className="container-max px-4 sm:px-6 lg:px-8 -mt-20 relative z-10 pb-20">
//         <div className="grid lg:grid-cols-3 gap-12">
//           {/* Main content */}
//           <div className="lg:col-span-2">
//             <AnimatedSection>
//               <div className="flex flex-wrap items-center gap-3 mb-4">
//                 <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
//                   {project.category}
//                 </span>
//                 <span
//                   className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
//                     project.status === 'Completed'
//                       ? 'bg-green-500/20 text-green-400 border border-green-500/30'
//                       : project.status === 'Maintained'
//                       ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
//                       : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
//                   }`}
//                 >
//                   {project.status}
//                 </span>
//                 <span className="flex items-center gap-1 text-xs text-muted-foreground">
//                   <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
//                   {project.year}
//                 </span>
//               </div>

//               <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
//                 {project.title}
//               </h1>
//               <p className="text-lg text-muted-foreground leading-relaxed mb-8">
//                 {project.description}
//               </p>
//             </AnimatedSection>

//             {/* Tech stack */}
//             <AnimatedSection delay={0.1}>
//               <div className="glass rounded-2xl p-6 border border-white/10 mb-8">
//                 <h2 className="font-semibold text-foreground mb-4">Tech Stack</h2>
//                 <div className="flex flex-wrap gap-2" role="list" aria-label="Technologies used">
//                   {project.tech.map((tech) => (
//                     <span key={tech} className="tech-badge text-sm" role="listitem">{tech}</span>
//                   ))}
//                 </div>
//               </div>
//             </AnimatedSection>

//             {/* Key features */}
//             <AnimatedSection delay={0.2}>
//               <div className="glass rounded-2xl p-6 border border-white/10 mb-8">
//                 <h2 className="font-semibold text-foreground mb-4">Key Features</h2>
//                 <ul className="space-y-2.5" role="list">
//                   {project.features.map((feature) => (
//                     <li key={feature} className="flex items-start gap-3 text-sm text-muted-foreground">
//                       <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
//                       <span>{feature}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </AnimatedSection>
//           </div>

//           {/* Sidebar */}
//           <AnimatedSection delay={0.15} className="lg:col-span-1">
//             <div className="space-y-4 sticky top-24">
//               {/* Links */}
//               <div className="glass rounded-2xl p-6 border border-white/10">
//                 <h2 className="font-semibold text-foreground mb-4">Links</h2>
//                 <div className="flex flex-col gap-3">
//                   {project.github && (
//                     <a
//                       href={project.github}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
//                     >
//                       <Github className="w-4 h-4" aria-hidden="true" />
//                       View Source Code
//                     </a>
//                   )}
//                   {project.demo && (
//                     <a
//                       href={project.demo}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
//                     >
//                       <ExternalLink className="w-4 h-4" aria-hidden="true" />
//                       Live Demo
//                     </a>
//                   )}
//                 </div>
//               </div>

//               {/* Project info */}
//               <div className="glass rounded-2xl p-6 border border-white/10">
//                 <h2 className="font-semibold text-foreground mb-4">Project Info</h2>
//                 <div className="space-y-3 text-sm">
//                   <div className="flex justify-between">
//                     <span className="text-muted-foreground">Category</span>
//                     <span className="font-medium">{project.category}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-muted-foreground">Year</span>
//                     <span className="font-medium">{project.year}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-muted-foreground">Status</span>
//                     <span className="font-medium">{project.status}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </AnimatedSection>
//         </div>

//         {/* Navigation */}
//         <div className="border-t border-border/50 pt-8 mt-8">
//           <div className="flex justify-between gap-4">
//             {prevProject ? (
//               <Link
//                 href={`/projects/${prevProject.slug}`}
//                 className="group flex items-center gap-3 glass rounded-xl p-4 border border-white/10 hover:border-primary/30 transition-all flex-1 max-w-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
//               >
//                 <ArrowLeft className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" aria-hidden="true" />
//                 <div className="min-w-0">
//                   <p className="text-xs text-muted-foreground mb-0.5">Previous</p>
//                   <p className="text-sm font-medium truncate">{prevProject.title}</p>
//                 </div>
//               </Link>
//             ) : <div />}

//             {nextProject ? (
//               <Link
//                 href={`/projects/${nextProject.slug}`}
//                 className="group flex items-center gap-3 glass rounded-xl p-4 border border-white/10 hover:border-primary/30 transition-all flex-1 max-w-xs text-right focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ml-auto"
//               >
//                 <div className="min-w-0 flex-1">
//                   <p className="text-xs text-muted-foreground mb-0.5">Next</p>
//                   <p className="text-sm font-medium truncate">{nextProject.title}</p>
//                 </div>
//                 <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" aria-hidden="true" />
//               </Link>
//             ) : <div />}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import type { Metadata } from 'next';
import ProjectsPageClient from './ProjectsPageClient';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Explore my portfolio projects, web applications, and software development work.',
};

export default function ProjectsPage() {
  return <ProjectsPageClient />;
}