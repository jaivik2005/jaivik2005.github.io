import type { Metadata } from 'next';
import CertificationsPageClient from './CertificationsPageClient';

export const metadata: Metadata = {
  title: 'Certifications',
  description: 'Professional certifications earned by Jaivik Prajapati in web development, cybersecurity, cloud computing, and Linux.',
};

export default function CertificationsPage() {
  return <CertificationsPageClient />;
}
