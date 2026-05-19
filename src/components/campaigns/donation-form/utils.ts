import { donationStepOneSchema } from '@/types/donation';
import type { StepConfig } from './types';

export const STEPS: StepConfig[] = [
  { number: '01', label: 'Pilih Nominal' },
  { number: '02', label: 'Isi Data' },
  { number: '03', label: 'Pembayaran' },
];

export const PRESETS = [25000, 50000, 100000, 250000];

export function formatIdr(val: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(val)
    .replace(/\s+/g, '');
}

export function formatNumberInput(val: number): string {
  if (!val) return '';
  return new Intl.NumberFormat('id-ID').format(val);
}

/** Valid email per donation step-one schema (required for step 2 completion). */
export function isValidDonationEmail(email: string): boolean {
  return donationStepOneSchema.shape.email.safeParse(email).success;
}

/** Name is optional; green only when non-empty and within schema limits. */
export function isValidDonationName(name: string): boolean {
  if (name.trim() === '') return false;
  return donationStepOneSchema.shape.name.safeParse(name).success;
}

export function calculateRemainingDays(deadlineStr: string): number {
  const deadlineDate = new Date(deadlineStr);
  const today = new Date();
  const diffTime = deadlineDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
}
