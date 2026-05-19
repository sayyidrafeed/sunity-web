import { z } from 'zod';

/**
 * Zod schema for validating Donation Step 1: Pilih Nominal & Isi Data
 */
export const donationStepOneSchema = z.object({
  nominal: z.coerce
    .number<number>({ error: 'Nominal donasi harus berupa angka' })
    .min(10000, { message: 'Minimal nominal donasi adalah Rp10.000' }),
  name: z.string().max(100, { message: 'Nama maksimal 100 karakter' }).optional().or(z.literal('')),
  email: z
    .string()
    .min(1, { message: 'Email harus diisi' })
    .email({ message: 'Format email tidak valid' }),
  hideName: z.boolean(),
});

/**
 * TypeScript type inferred from the validation schema (for React Hook Form state)
 */
export type DonationStepOneInput = z.infer<typeof donationStepOneSchema>;

/**
 * Backend-aligned request payload representation
 */
export interface CreateDonationStepOnePayload {
  campaignId: string;
  nominal: number;
  name?: string; // Optional name if hideName is true or name not filled
  email: string;
  hideName: boolean;
}
