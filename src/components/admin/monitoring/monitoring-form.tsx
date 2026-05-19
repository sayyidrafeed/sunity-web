import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { EnergyFormValues } from '@/types/energy-monitoring';

const MONTH_OPTIONS = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

const numVal = (name: string) =>
  z.number({ error: `${name} harus berupa angka` }).positive(`${name} harus lebih besar dari 0`);

const formSchema = z.object({
  month: z.string().min(1, 'Bulan harus dipilih'),
  year: z.number({ error: 'Tahun harus berupa angka' }).int().min(2000).max(2100),
  productionKwh: numVal('Produksi KwH'),
  co2ReductionKg: numVal('Produksi CO2'),
  savingAmount: numVal('Hemat Biaya'),
});

interface MonitoringFormProps {
  defaultValues?: Partial<EnergyFormValues>;
  onSubmit: (values: EnergyFormValues) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export function MonitoringForm({ defaultValues, onSubmit, onCancel, isSubmitting = false }: MonitoringFormProps) {
  const form = useForm<EnergyFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      month: defaultValues?.month || '',
      year: defaultValues?.year || new Date().getFullYear(),
      productionKwh: defaultValues?.productionKwh,
      co2ReductionKg: defaultValues?.co2ReductionKg,
      savingAmount: defaultValues?.savingAmount,
    },
  });

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
                    onChange={(e) => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="productionKwh"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-[4px] space-y-0">
              <div className="flex items-center gap-[16px]">
                <FormLabel className="font-jakarta font-medium text-[14px] text-[#1F1F1D] w-[140px] shrink-0">Produksi KwH</FormLabel>
                <div className="flex items-center gap-[12px]">
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Cth. 120"
                      className="w-[120px] text-center rounded-[12px] border-[#E5E5E3] h-[44px] font-jakarta text-[14px]"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))}
                    />
                  </FormControl>
                  <span className="font-jakarta text-[14px] text-[#5A5A57]">KwH</span>
                </div>
              </div>
              <div className="pl-[156px]">
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="co2ReductionKg"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-[4px] space-y-0">
              <div className="flex items-center gap-[16px]">
                <FormLabel className="font-jakarta font-medium text-[14px] text-[#1F1F1D] w-[140px] shrink-0">Produksi CO2</FormLabel>
                <div className="flex items-center gap-[12px]">
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Cth. 120"
                      className="w-[120px] text-center rounded-[12px] border-[#E5E5E3] h-[44px] font-jakarta text-[14px]"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))}
                    />
                  </FormControl>
                  <span className="font-jakarta text-[14px] text-[#5A5A57]">Kg</span>
                </div>
              </div>
              <div className="pl-[156px]">
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="savingAmount"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-[4px] space-y-0">
              <div className="flex items-center gap-[16px]">
                <FormLabel className="font-jakarta font-medium text-[14px] text-[#1F1F1D] w-[140px] shrink-0">Hemat Biaya</FormLabel>
                <div className="relative flex items-center">
                  <span className="absolute left-[16px] font-jakarta font-medium text-[14px] text-[#1F1F1D]">Rp</span>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Cth. 100.000"
                      className="w-[200px] pl-[40px] pr-[16px] rounded-[12px] border-[#E5E5E3] h-[44px] font-jakarta text-[14px]"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))}
                    />
                  </FormControl>
                </div>
              </div>
              <div className="pl-[156px]">
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

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
      </form>
    </Form>
  );
}
