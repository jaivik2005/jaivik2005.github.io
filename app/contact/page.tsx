import type { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Jaivik Prajapati — available for projects, internships, and collaborations.',
};

export default function ContactPage() {
  return <ContactPageClient />;
}
