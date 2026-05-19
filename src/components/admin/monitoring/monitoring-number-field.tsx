import { type Control, type Path } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { EnergyFormValues } from '@/types/energy-monitoring';

interface MonitoringNumberFieldProps {
  control: Control<EnergyFormValues>;
  name: Path<EnergyFormValues>;
  label: string;
  placeholder: string;
  unit?: string;
  prefix?: string;
}

export function MonitoringNumberField({ control, name, label, placeholder, unit, prefix }: MonitoringNumberFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col gap-[4px] space-y-0">
          <div className="flex items-center gap-[16px]">
            <FormLabel className="font-jakarta font-medium text-[14px] text-[#1F1F1D] w-[140px] shrink-0">{label}</FormLabel>
            <div className="relative flex items-center gap-[12px]">
              {prefix && <span className="absolute left-[16px] font-jakarta font-medium text-[14px] text-[#1F1F1D]">{prefix}</span>}
              <FormControl>
                <Input
                  type="number"
                  placeholder={placeholder}
                  className={`text-center rounded-[12px] border-[#E5E5E3] h-[44px] font-jakarta text-[14px] ${
                    prefix ? 'pl-[40px] pr-[16px] w-[200px]' : 'w-[120px]'
                  }`}
                  {...field}
                  value={field.value ?? ''}
                  onChange={(e) => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))}
                />
              </FormControl>
              {unit && <span className="font-jakarta text-[14px] text-[#5A5A57]">{unit}</span>}
            </div>
          </div>
          <div className="pl-[156px]">
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
}
