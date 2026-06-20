import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function getLevelLabel(level: number): string {
  if (level >= 85) return 'Proficient';
  if (level >= 70) return 'Advanced';
  if (level >= 50) return 'Intermediate';
  return 'Beginner';
}
