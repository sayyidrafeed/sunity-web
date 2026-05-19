import { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { type DonationStepOneInput } from '@/types/donation';

interface IdentityStepProps {
  isDisabled: boolean;
}

export const IdentityStep = memo(function IdentityStep({ isDisabled }: IdentityStepProps) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<DonationStepOneInput>();

  const watchHideName = watch('hideName');

  return (
    <div className={cn('flex flex-col gap-4 transition-all duration-300', isDisabled && 'opacity-60')}>
      <h3 className="text-lg font-bold text-brand-text">Masukkan Identitas</h3>

      <div className="flex flex-col gap-3.5">
        {/* Name (Optional) */}
        <div className="flex flex-col gap-2">
          <Input
            id="name"
            type="text"
            placeholder="Nama (Opsional)"
            disabled={isDisabled || watchHideName}
            className={cn(
              'h-12 rounded-xl border px-4 focus-visible:ring-brand-green/20 focus-visible:border-brand-green text-sm transition-all',
              isDisabled
                ? 'bg-neutral-100 border-neutral-200 text-neutral-400 cursor-not-allowed'
                : 'bg-neutral-50 border-neutral-300 text-brand-text'
            )}
            {...register('name')}
          />
          {errors.name && <p className="text-xs font-semibold text-brand-danger">{errors.name.message}</p>}
        </div>

        {/* Email (Required) */}
        <div className="flex flex-col gap-2">
          <Input
            id="email"
            type="email"
            placeholder="Email*"
            disabled={isDisabled}
            className={cn(
              'h-12 rounded-xl border px-4 focus-visible:ring-brand-green/20 focus-visible:border-brand-green text-sm transition-all',
              errors.email ? 'border-brand-danger' : 'border-neutral-300',
              isDisabled
                ? 'bg-neutral-100 border-neutral-200 text-neutral-400 cursor-not-allowed'
                : 'bg-neutral-50 border-neutral-300 text-brand-text'
            )}
            {...register('email')}
          />
          {errors.email && <p className="text-xs font-semibold text-brand-danger">{errors.email.message}</p>}
        </div>

        {/* Hide Name Switch */}
        <div
          className={cn(
            'flex items-center justify-end gap-3.5 mt-1 select-none transition-opacity duration-300',
            isDisabled && 'pointer-events-none opacity-50'
          )}
        >
          <Label htmlFor="hide-name" className="text-xs font-semibold text-brand-light-gray cursor-pointer">
            Sembunyikan Nama
          </Label>
          <Switch
            id="hide-name"
            checked={watchHideName}
            disabled={isDisabled}
            onCheckedChange={(checked) => {
              setValue('hideName', checked);
              if (checked) {
                setValue('name', '');
              }
            }}
          />
        </div>
      </div>
    </div>
  );
});
