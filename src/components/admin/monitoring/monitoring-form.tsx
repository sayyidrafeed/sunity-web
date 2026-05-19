import { useForm, type UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MonitoringNumberField } from './monitoring-number-field';
import type { EnergyFormValues } from '@/types/energy-monitoring';

export const MONTH_OPTIONS = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];

export const formSchema = z.object({
  month: z.string().min(1, 'Bulan harus dipilih'),
  year: z.number({ error: 'Tahun harus berupa angka' }).int().min(2000).max(2100),
  productionKwh: z.number({ error: 'Produksi KwH harus berupa angka' }).positive('Produksi KwH harus lebih besar dari 0'),
  co2ReductionKg: z.number({ error: 'Produksi CO2 harus berupa angka' }).positive('Produksi CO2 harus lebih besar dari 0'),
  savingAmount: z.number({ error: 'Hemat Biaya harus berupa angka' }).positive('Hemat Biaya harus lebih besar dari 0'),
});

interface MonitoringFormProps {
  form?: UseFormReturn<EnergyFormValues>;
  defaultValues?: Partial<EnergyFormValues>;
  onSubmit: (values: EnergyFormValues) => void;
  onCancel?: () => void;
  isSubmitting?: boolean;
  showFooter?: boolean;
}

export function MonitoringForm({
  form: externalForm,
  defaultValues,
  onSubmit,
  onCancel,
  isSubmitting = false,
  showFooter = true,
}: MonitoringFormProps) {
  const localForm = useForm<EnergyFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      month: defaultValues?.month || '',
      year: defaultValues?.year || new Date().getFullYear(),
      productionKwh: defaultValues?.productionKwh,
      co2ReductionKg: defaultValues?.co2ReductionKg,
      savingAmount: defaultValues?.savingAmount,
    },
  });

  const form = externalForm || localForm;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-[20px]">
        <div className="grid grid-cols-2 gap-[24px]">
          <FormField
            control={form.control}
            name="month"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-[8px] space-y-0">
                <FormLabel className="font-jakarta font-medium text-[14px] text-[#1F1F1D]">Bulan</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full rounded-[12px] border-[#E5E5E3] bg-[#E5E5E3]/40 h-[44px] font-jakarta text-[14px]">
                      <SelectValue placeholder="Bulan" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="font-jakarta">
                    {MONTH_OPTIONS.map((m) => (
                      <SelectItem key={m} value={m}>
                        {m}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-[8px] space-y-0">
                <FormLabel className="font-jakarta font-medium text-[14px] text-[#1F1F1D]">Tahun</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Cth. 2026"
                    className="w-full rounded-[12px] border-[#E5E5E3] bg-[#E5E5E3]/40 h-[44px] font-jakarta text-[14px]"
                    {...field}
                    value={field.value ?? ''}
                    onChange={(e) => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <MonitoringNumberField control={form.control} name="productionKwh" label="Produksi KwH" placeholder="Cth. 120" unit="KwH" />

        <MonitoringNumberField control={form.control} name="co2ReductionKg" label="Produksi CO2" placeholder="Cth. 120" unit="Kg" />

        <MonitoringNumberField control={form.control} name="savingAmount" label="Hemat Biaya" placeholder="Cth. 100.000" prefix="Rp" />

        {showFooter && (
          <div className="flex justify-end gap-[12px] mt-[8px]">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
              className="rounded-full px-[32px] py-[12px] font-jakarta font-semibold text-[14px] text-[#2F6B3F] border-[#2F6B3F] hover:bg-[#2F6B3F]/10 transition-colors h-[44px] cursor-pointer"
            >
              Batal
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#2F6B3F] hover:bg-[#245330] text-white rounded-full px-[32px] py-[12px] font-jakarta font-semibold text-[14px] transition-colors h-[44px] min-w-[100px] cursor-pointer"
            >
              {isSubmitting ? 'Simpan...' : 'Simpan'}
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
}
