import type { Metadata } from 'next';
// import SkillsPageClient from './SkillsPageClient';

import SkillsPageClient from './skills/SkillsPageClient';
export const metadata: Metadata = {
  title: 'Skills',
  description: 'Technical skills and expertise of Jaivik Prajapati — frontend, backend, databases, cybersecurity, and DevOps.',
};

export default function SkillsPage() {
  return <SkillsPageClient />;
}
