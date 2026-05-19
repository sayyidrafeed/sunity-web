import { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { type DonationStepOneInput } from '@/types/donation';
import { PRESETS, formatNumberInput } from './utils';

interface NominalStepProps {
  isDisabled: boolean;
}

export const NominalStep = memo(function NominalStep({ isDisabled }: NominalStepProps) {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<DonationStepOneInput>();

  const watchNominal = watch('nominal');
  const isNominalValid = watchNominal >= 10000;

  return (
    <div className={cn('flex flex-col gap-3 transition-opacity duration-300', isDisabled && 'opacity-60 pointer-events-none')}>
      <h3 className="text-lg font-bold text-brand-text">Pilih Nominal Donasi</h3>

      {/* Custom Large Nominal Input */}
      <div
        className={cn(
          'border-2 rounded-[1.25rem] p-5 flex items-center justify-between transition-all bg-white',
          errors.nominal
            ? 'border-brand-danger focus-within:ring-brand-danger/20'
            : isNominalValid
              ? 'border-brand-green focus-within:ring-brand-green/20'
              : 'border-neutral-300 focus-within:ring-neutral-200',
          isDisabled && 'bg-neutral-50 border-neutral-200'
        )}
      >
        <div className="flex flex-col select-none">
          <span className={cn('text-4xl font-extrabold leading-none transition-colors', isNominalValid ? 'text-brand-green' : 'text-neutral-400')}>
            Rp
          </span>
          <span className="text-[10px] text-brand-light-gray mt-1.5 font-bold tracking-wide leading-none">Minimal Rp10.000</span>
        </div>
        <input
          type="text"
          placeholder="0"
          disabled={isDisabled}
          className={cn(
            'text-right text-5xl font-bold outline-none bg-transparent w-full ml-4 font-outfit transition-colors',
            isNominalValid ? 'text-brand-green' : 'text-neutral-400 focus:text-brand-green',
            isDisabled && 'text-brand-green cursor-not-allowed'
          )}
          value={watchNominal ? formatNumberInput(watchNominal) : ''}
          onChange={(e) => {
            const val = e.target.value.replace(/[^0-9]/g, '');
            setValue('nominal', val ? parseInt(val, 10) : 0, {
              shouldValidate: true,
            });
          }}
        />
      </div>
      {errors.nominal && <p className="text-xs font-semibold text-brand-danger leading-none px-1">{errors.nominal.message}</p>}

      {/* Preset Nominal Selection Buttons */}
      <div className="grid grid-cols-4 gap-3 mt-1">
        {PRESETS.map((preset) => {
          const isSelected = watchNominal === preset;
          return (
            <button
              key={preset}
              type="button"
              disabled={isDisabled}
              onClick={() =>
                setValue('nominal', preset, {
                  shouldValidate: true,
                })
              }
              className={cn(
                'py-3 px-1 border text-sm font-semibold rounded-xl text-center cursor-pointer transition-all duration-200',
                isSelected
                  ? 'border-brand-green bg-brand-green/5 text-brand-green border-2 font-bold shadow-sm'
                  : 'border-brand-green/20 hover:border-brand-green/50 text-brand-green bg-white',
                isDisabled && 'opacity-50 cursor-not-allowed'
              )}
            >
              Rp{formatNumberInput(preset)}
            </button>
          );
        })}
      </div>
    </div>
  );
});
