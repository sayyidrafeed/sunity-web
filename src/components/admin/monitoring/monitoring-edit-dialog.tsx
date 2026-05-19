import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { MonitoringForm } from './monitoring-form';
import { useUpdateEnergyData } from '@/hooks/use-energy-monitoring';
import type { EnergyData, EnergyFormValues } from '@/types/energy-monitoring';
import { toast } from 'sonner';

const MONTH_OPTIONS = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

interface MonitoringEditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  energyData: EnergyData;
}

export function MonitoringEditDialog({ isOpen, onClose, energyData }: MonitoringEditDialogProps) {
  const updateMutation = useUpdateEnergyData();

  // Prefill defaultValues if we are in Edit mode
  const defaultValues: Partial<EnergyFormValues> = {
    month: MONTH_OPTIONS[energyData.month - 1] || '',
    year: energyData.year,
    productionKwh: energyData.kwh,
    co2ReductionKg: energyData.co2,
    savingAmount: energyData.price,
  };

  const handleSubmit = (values: EnergyFormValues) => {
    const monthNum = MONTH_OPTIONS.indexOf(values.month) + 1;
    const payload = {
      id: energyData.id,
      month: monthNum,
      year: values.year,
      kwh: values.productionKwh,
      co2: values.co2ReductionKg,
      price: values.savingAmount,
    };

    updateMutation.mutate(payload, {
      onSuccess: () => {
        toast.success('Data energi berhasil diperbarui');
        onClose();
      },
      onError: () => {
        toast.error('Gagal memperbarui data energi');
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[95vw] md:max-w-2xl bg-[#FAF9F6] rounded-[24px] border-[#E5E5E3] p-[24px] gap-[24px] !rounded-[24px]">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0">
          <DialogTitle className="font-outfit font-semibold text-[24px] text-[#1F1F1D]">Edit Data</DialogTitle>
        </DialogHeader>

        <MonitoringForm
          key={energyData.id}
          defaultValues={defaultValues}
          onSubmit={handleSubmit}
          onCancel={onClose}
          isSubmitting={updateMutation.isPending}
        />
      </DialogContent>
    </Dialog>
  );
}
