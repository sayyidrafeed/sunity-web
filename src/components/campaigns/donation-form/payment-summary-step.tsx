import { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { type DonationStepOneInput } from '@/types/donation';
import { formatNumberInput } from './utils';

interface PaymentSummaryStepProps {
  activeStep: 1 | 2 | 3;
  isNominalValid: boolean;
  onPrimaryButtonClick: () => Promise<void>;
}

export const PaymentSummaryStep = memo(function PaymentSummaryStep({ activeStep, isNominalValid, onPrimaryButtonClick }: PaymentSummaryStepProps) {
  const {
    watch,
    formState: { isSubmitting },
  } = useFormContext<DonationStepOneInput>();

  const watchNominal = watch('nominal');

  return (
    <div className="flex flex-col gap-4 mt-2">
      <div className="flex flex-col gap-1.5">
        <span className="text-sm font-semibold text-brand-text">Total Donasi</span>
        <span className="text-4xl font-extrabold text-brand-green leading-none">Rp{formatNumberInput(watchNominal || 0)}</span>
      </div>

      {activeStep === 3 ? (
        // Step 3 primary submit button
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-14 rounded-full text-base font-bold bg-brand-green text-white hover:bg-brand-green/90 shadow-md shadow-brand-green/10 mt-1 cursor-pointer transition-all duration-300 disabled:opacity-50"
        >
          {isSubmitting ? 'Memproses...' : 'Donasi Sekarang'}
        </Button>
      ) : (
        // Step 1 / 2 "Selanjutnya" button
        <Button
          type="button"
          onClick={onPrimaryButtonClick}
          disabled={activeStep === 1 && !isNominalValid}
          className={cn(
            'w-full h-14 rounded-full text-base font-bold transition-all duration-300 shadow-md mt-1 cursor-pointer',
            activeStep === 1 && !isNominalValid
              ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed shadow-none'
              : 'bg-brand-green text-white hover:bg-brand-green/90 shadow-brand-green/10'
          )}
        >
          Selanjutnya
        </Button>
      )}
    </div>
  );
});
