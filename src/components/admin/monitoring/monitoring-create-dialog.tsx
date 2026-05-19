import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MonitoringForm, formSchema, MONTH_OPTIONS } from './monitoring-form';
import { MonitoringCsvZone } from './monitoring-csv-zone';
import { parseMonitoringCsv } from '@/lib/csv-parser';
import { useCreateEnergyDataManual, useCreateEnergyDataCsv } from '@/hooks/use-energy-monitoring';
import type { EnergyFormValues, EnergyData } from '@/types/energy-monitoring';
import { toast } from 'sonner';

interface MonitoringCreateDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

type InputMode = 'manual' | 'csv' | null;

export function MonitoringCreateDialog({ isOpen, onClose }: MonitoringCreateDialogProps) {
  const createManualMutation = useCreateEnergyDataManual();
  const createCsvMutation = useCreateEnergyDataCsv();

  const [activeMode, setActiveMode] = useState<InputMode>(null);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [csvData, setCsvData] = useState<Omit<EnergyData, 'id' | 'year'>[] | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const form = useForm<EnergyFormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      month: '',
      year: new Date().getFullYear(),
      productionKwh: undefined,
      co2ReductionKg: undefined,
      savingAmount: undefined,
    },
  });

  const isSubmitting = createManualMutation.isPending || createCsvMutation.isPending;

  const blankForm = {
    month: '',
    year: new Date().getFullYear(),
    productionKwh: undefined,
    co2ReductionKg: undefined,
    savingAmount: undefined,
  } as const;

  const handleManualInteraction = () => {
    if (activeMode !== 'manual') {
      setActiveMode('manual');
      setCsvFile(null);
      setCsvData(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleCsvInteraction = () => {
    if (activeMode !== 'csv') {
      setActiveMode('csv');
      form.reset(blankForm);
    }
  };

  const handleFileSelect = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const result = parseMonitoringCsv(text);

        // Show warnings if there are any errors
        if (result.errors.length > 0) {
          const errorSummary = result.errors
            .slice(0, 5) // Show first 5 errors
            .map((e) => `Baris ${e.line}: ${e.message}`)
            .join('\n');

          const moreErrors = result.errors.length > 5 ? `\n... dan ${result.errors.length - 5} error lainnya` : '';

          toast.warning(`${result.data.length} data berhasil dimuat, ${result.errors.length} baris diabaikan:\n${errorSummary}${moreErrors}`);
        }

        // Allow import even with errors, but warn if no valid rows
        if (result.data.length === 0) {
          toast.error('Tidak ada data valid yang dapat diimpor dari CSV');
          return;
        }

        setCsvFile(file);
        setCsvData(result.data);
        setActiveMode('csv');
        form.reset(blankForm);

        if (result.errors.length === 0) {
          toast.success(`Berhasil memuat ${result.data.length} data dari CSV`);
        }
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Gagal membaca file CSV';
        toast.error(message);
      }
    };
    reader.readAsText(file);
  };

  const handleFileRemove = () => {
    setCsvFile(null);
    setCsvData(null);
    setActiveMode(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleManualSubmit = (values: EnergyFormValues) => {
    const monthNum = MONTH_OPTIONS.indexOf(values.month) + 1;
    createManualMutation.mutate(
      {
        month: monthNum,
        year: values.year,
        kwh: values.productionKwh,
        co2: values.co2ReductionKg,
        price: values.savingAmount,
      },
      {
        onSuccess: () => {
          toast.success('Data energi berhasil ditambahkan');
          handleClose();
        },
        onError: () => toast.error('Gagal menambahkan data energi'),
      }
    );
  };

  const handleCsvSubmit = () => {
    if (!csvData) return;
    createCsvMutation.mutate(csvData, {
      onSuccess: () => {
        toast.success('Semua data dari CSV berhasil ditambahkan');
        handleClose();
      },
      onError: () => toast.error('Gagal menambahkan data dari CSV'),
    });
  };

  const handleClose = () => {
    setActiveMode(null);
    setCsvFile(null);
    setCsvData(null);
    form.reset();
    onClose();
  };

  const triggerSubmit = () => {
    if (activeMode === 'manual') form.handleSubmit(handleManualSubmit)();
    else if (activeMode === 'csv') handleCsvSubmit();
  };

  const isManualValid = form.formState.isValid;
  const isCsvValid = !!csvFile && !!csvData && csvData.length > 0;
  const isSubmitDisabled =
    activeMode === null || (activeMode === 'manual' && !isManualValid) || (activeMode === 'csv' && !isCsvValid) || isSubmitting;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-[95vw] md:max-w-4xl bg-[#FAF9F6] rounded-[24px] border-[#E5E5E3] p-[32px] gap-[24px] !rounded-[24px] font-jakarta">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 border-b border-[#E5E5E3] pb-[16px]">
          <DialogTitle className="font-outfit font-semibold text-[24px] text-[#1F1F1D]">Tambah Data</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-[24px] md:gap-[32px] items-stretch mt-[8px]">
          <div
            className={`transition-all duration-300 ${activeMode === 'csv' ? 'opacity-40' : 'opacity-100'}`}
            onMouseDownCapture={handleManualInteraction}
            onKeyDownCapture={handleManualInteraction}
          >
            <h3 className="font-outfit font-semibold text-[18px] text-[#1F1F1D] mb-[16px]">Input Manual</h3>
            <MonitoringForm form={form} onSubmit={handleManualSubmit} showFooter={false} />
          </div>

          <div className="hidden md:block w-[1px] bg-[#E5E5E3] self-stretch" />

          <MonitoringCsvZone
            csvFile={csvFile}
            csvDataCount={csvData?.length || 0}
            activeMode={activeMode}
            onActivate={handleCsvInteraction}
            onFileSelect={handleFileSelect}
            onFileRemove={handleFileRemove}
            isDragging={isDragging}
            setIsDragging={setIsDragging}
            fileInputRef={fileInputRef}
          />
        </div>

        <div className="flex justify-end gap-[12px] border-t border-[#E5E5E3] pt-[20px] mt-[12px]">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isSubmitting}
            className="rounded-full px-[32px] py-[12px] font-semibold text-[14px] text-[#2F6B3F] border-[#2F6B3F] hover:bg-[#2F6B3F]/10 transition-colors h-[44px] cursor-pointer"
          >
            Batal
          </Button>
          <Button
            type="button"
            onClick={triggerSubmit}
            disabled={isSubmitDisabled}
            className={`rounded-full px-[32px] py-[12px] font-semibold text-[14px] transition-colors h-[44px] min-w-[120px] cursor-pointer text-white ${
              isSubmitDisabled ? 'bg-[#C6DAC9] cursor-not-allowed' : 'bg-[#2F6B3F] hover:bg-[#245330]'
            }`}
          >
            {isSubmitting ? 'Tambah...' : 'Tambah'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
