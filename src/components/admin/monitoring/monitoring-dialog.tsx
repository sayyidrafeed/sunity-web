import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { MonitoringForm } from './monitoring-form';
import { useCreateEnergyData, useUpdateEnergyData } from '@/hooks/use-energy-monitoring';
import type { EnergyData, EnergyFormValues } from '@/types/energy-monitoring';
import { toast } from 'sonner';

const MONTH_OPTIONS = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

interface MonitoringDialogProps {
  isOpen: boolean;
  onClose: () => void;
  energyData?: EnergyData | null;
}

export function MonitoringDialog({ isOpen, onClose, energyData }: MonitoringDialogProps) {
  const createMutation = useCreateEnergyData();
  const updateMutation = useUpdateEnergyData();

  const isEdit = !!energyData;
  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  // Prefill defaultValues if we are in Edit mode
  const defaultValues: Partial<EnergyFormValues> | undefined = energyData
    ? {
        month: MONTH_OPTIONS[energyData.month - 1] || '',
        year: energyData.year,
        productionKwh: energyData.kwh,
        co2ReductionKg: energyData.co2,
        savingAmount: energyData.price,
      }
    : undefined;

  const handleSubmit = (values: EnergyFormValues) => {
    const monthNum = MONTH_OPTIONS.indexOf(values.month) + 1;
    const payload = {
      month: monthNum,
      year: values.year,
      kwh: values.productionKwh,
      co2: values.co2ReductionKg,
      price: values.savingAmount,
    };

    if (isEdit && energyData) {
      updateMutation.mutate(
        { ...payload, id: energyData.id },
        {
          onSuccess: () => {
            toast.success('Data energi berhasil diperbarui');
            onClose();
          },
          onError: () => {
            toast.error('Gagal memperbarui data energi');
          },
        }
      );
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => {
          toast.success('Data energi berhasil ditambahkan');
          onClose();
        },
        onError: () => {
          toast.error('Gagal menambahkan data energi');
        },
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[95vw] md:max-w-2xl bg-[#FAF9F6] rounded-[24px] border-[#E5E5E3] p-[24px] gap-[24px] !rounded-[24px]">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0">
          <DialogTitle className="font-outfit font-semibold text-[24px] text-[#1F1F1D]">{isEdit ? 'Edit Data' : 'Tambah Data'}</DialogTitle>
        </DialogHeader>

        {/* Since DialogContent mounts and unmounts, or persists, we should key the form by the energyData id or 'new' to reset state */}
        <MonitoringForm
          key={energyData?.id || 'new-form'}
          defaultValues={defaultValues}
          onSubmit={handleSubmit}
          onCancel={onClose}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
}
