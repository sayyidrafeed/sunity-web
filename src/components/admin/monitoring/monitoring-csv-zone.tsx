import { Button } from '@/components/ui/button';
import { UploadCloud, FileSpreadsheet, X, Download } from 'lucide-react';

interface MonitoringCsvZoneProps {
  csvFile: File | null;
  csvDataCount: number;
  activeMode: 'manual' | 'csv' | null;
  onActivate: () => void;
  onFileSelect: (file: File) => void;
  onFileRemove: () => void;
  isDragging: boolean;
  setIsDragging: (val: boolean) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
}

export function MonitoringCsvZone({
  csvFile,
  csvDataCount,
  activeMode,
  onActivate,
  onFileSelect,
  onFileRemove,
  isDragging,
  setIsDragging,
  fileInputRef,
}: MonitoringCsvZoneProps) {
  const isCsvActive = activeMode === 'csv';
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileSelect(file);
  };

  return (
    <div
      className={`flex flex-col transition-all duration-300 ${activeMode === 'manual' ? 'opacity-40' : 'opacity-100'}`}
      onMouseDownCapture={onActivate}
    >
      <h3 className="font-outfit font-semibold text-[18px] text-[#1F1F1D] mb-[16px]">Unggah CSV</h3>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          const file = e.dataTransfer?.files?.[0];
          if (file) onFileSelect(file);
        }}
        className={`flex-1 flex flex-col items-center justify-center border-2 border-dashed rounded-[20px] p-[24px] text-center min-h-[220px] transition-colors ${
          isDragging
            ? 'border-[#2F6B3F] bg-[#2F6B3F]/5'
            : csvFile || isCsvActive
              ? 'border-[#2F6B3F] bg-[#EBF3ED]/40'
              : 'border-[#2F6B3F]/30 hover:border-[#2F6B3F]/60 bg-white'
        }`}
      >
        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".csv" className="hidden" id="csv-file-input" />

        {csvFile ? (
          <div className="flex flex-col items-center gap-[12px]">
            <FileSpreadsheet className="w-[48px] h-[48px] text-[#2F6B3F]" />
            <div className="flex flex-col gap-[2px]">
              <p className="font-semibold text-[14px] text-[#1F1F1D] max-w-[200px] truncate">{csvFile.name}</p>
              <p className="text-[12px] text-[#5A5A57]">{csvDataCount} baris data termuat</p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onFileRemove();
              }}
              className="flex items-center gap-[4px] text-[12px] text-brand-danger font-medium mt-[4px] hover:underline cursor-pointer"
            >
              <X className="w-[14px] h-[14px]" /> Hapus File
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-[12px]">
            <UploadCloud className={`w-[48px] h-[48px] transition-colors ${isCsvActive ? 'text-[#2F6B3F]' : 'text-[#A3BFA8]'}`} />
            <Button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className={`rounded-full px-[24px] py-[8px] font-semibold text-[13px] h-[36px] transition-colors cursor-pointer ${
                isCsvActive ? 'bg-[#2F6B3F] hover:bg-[#245330] text-white' : 'bg-[#A3BFA8] hover:bg-[#8FAD95] text-white'
              }`}
            >
              Unggah CSV
            </Button>
            <p className="text-[11px] text-[#8C8C88] max-w-[240px] leading-[15px] mt-[4px]">
              Format wajib: <br />
              <span className="font-mono text-[#5A5A57]">month, kwh_produced, idr_saved, kg_co2_reduced</span>
            </p>
          </div>
        )}
      </div>

      <div className="mt-[16px] text-center">
        <a
          href="/public/template-monitoring.csv"
          download
          className={`inline-flex items-center gap-[6px] text-[13px] font-semibold underline hover:text-[#245330] transition-colors ${
            isCsvActive ? 'text-[#2F6B3F]' : 'text-[#A3BFA8]'
          }`}
        >
          <Download className="w-[14px] h-[14px]" /> Download Template
        </a>
      </div>
    </div>
  );
}
