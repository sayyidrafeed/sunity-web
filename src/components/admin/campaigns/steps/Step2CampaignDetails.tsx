import React from 'react';
import type { FormValues } from '@/lib/validation/campaign';

interface Step2Props {
  formValues: FormValues;
  errors: Record<string, string>;
  showErrors: boolean;
  onFieldChange: <K extends keyof FormValues>(field: K, value: FormValues[K]) => void;
  onTargetDanaChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBatasWaktuChange: (field: 'batasWaktuDD' | 'batasWaktuMM' | 'batasWaktuYYYY', length: number) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTextareaChange: (field: keyof FormValues, limit: number) => (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function Step2CampaignDetails({
  formValues,
  errors,
  showErrors,
  onFieldChange,
  onTargetDanaChange,
  onBatasWaktuChange,
  onTextareaChange,
}: Step2Props) {
  return (
    <div className="flex flex-col gap-6 max-w-[700px] animate-in fade-in-50 duration-200">
      <div className="flex flex-col gap-1">
        <h3 className="font-outfit font-bold text-[20px] leading-[25px] text-[#1F1F1D]">Detail Kampanye</h3>
        <p className="font-jakarta text-[13px] text-[#5A5A57]">Masukkan informasi detail kampanye pendanaan panel surya.</p>
      </div>

      {/* Judul Kampanye */}
      <div className="flex flex-col gap-1.5">
        <label className="font-jakarta text-[14px] font-medium text-[#1F1F1D]">Judul Kampanye</label>
        <input
          type="text"
          placeholder="Masukkan Judul Kampanye"
          value={formValues.judulKampanye}
          onChange={(e) => onFieldChange('judulKampanye', e.target.value)}
          className={`w-full rounded-[12px] border bg-white h-[44px] px-4 text-[14px] text-[#1F1F1D] placeholder:text-[#A3A39E] focus:outline-none transition-colors ${
            showErrors && errors.judulKampanye ? 'border-red-500 focus:border-red-500' : 'border-[#E5E5E3] focus:border-[#2F6B3F]'
          }`}
        />
        {showErrors && errors.judulKampanye && <span className="text-red-500 text-[12px] font-jakarta">{errors.judulKampanye}</span>}
      </div>

      {/* Grid: Target Dana & Kapasitas Panel & Batas Waktu */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Target Dana */}
        <div className="flex flex-col gap-1.5">
          <label className="font-jakarta text-[14px] font-medium text-[#1F1F1D]">Target Dana</label>
          <div
            className={`flex items-center border rounded-[12px] bg-white px-4 h-[44px] transition-colors ${
              showErrors && errors.targetDana ? 'border-red-500 focus-within:border-red-500' : 'border-[#E5E5E3] focus-within:border-[#2F6B3F]'
            }`}
          >
            <span className="text-[#5A5A57] text-[14px] font-semibold mr-1.5 select-none">Rp</span>
            <input
              type="text"
              placeholder="Cth. 100.000.000"
              value={formValues.targetDana}
              onChange={onTargetDanaChange}
              className="bg-transparent border-none outline-none w-full text-[14px] text-[#1F1F1D] placeholder:text-[#A3A39E] h-full"
            />
          </div>
          {showErrors && errors.targetDana && <span className="text-red-500 text-[12px] font-jakarta">{errors.targetDana}</span>}
        </div>

        {/* Kapasitas Panel (kWp) */}
        <div className="flex flex-col gap-1.5">
          <label className="font-jakarta text-[14px] font-medium text-[#1F1F1D]">Kapasitas Panel Surya (kWp)</label>
          <div
            className={`flex items-center border rounded-[12px] bg-white px-4 h-[44px] transition-colors ${
              showErrors && errors.panelCapacityKwp ? 'border-red-500 focus-within:border-red-500' : 'border-[#E5E5E3] focus-within:border-[#2F6B3F]'
            }`}
          >
            <input
              type="text"
              placeholder="Cth. 5.0"
              value={formValues.panelCapacityKwp}
              onChange={(e) => onFieldChange('panelCapacityKwp', e.target.value)}
              className="bg-transparent border-none outline-none w-full text-[14px] text-[#1F1F1D] placeholder:text-[#A3A39E] h-full"
            />
            <span className="text-[#5A5A57] text-[14px] font-semibold ml-1.5 select-none">kWp</span>
          </div>
          {showErrors && errors.panelCapacityKwp && <span className="text-red-500 text-[12px] font-jakarta">{errors.panelCapacityKwp}</span>}
        </div>

        {/* Batas Waktu */}
        <div className="flex flex-col gap-1.5">
          <label className="font-jakarta text-[14px] font-medium text-[#1F1F1D]">Batas Waktu (Tenggat Pendanaan)</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              maxLength={2}
              placeholder="DD"
              value={formValues.batasWaktuDD}
              onChange={onBatasWaktuChange('batasWaktuDD', 2)}
              className={`w-[52px] h-[44px] text-center border bg-white rounded-[12px] focus:outline-none text-[14px] text-[#1F1F1D] placeholder:text-[#A3A39E] transition-colors ${
                showErrors && errors.batasWaktu ? 'border-red-500 focus:border-red-500' : 'border-[#E5E5E3] focus:border-[#2F6B3F]'
              }`}
            />
            <input
              type="text"
              maxLength={2}
              placeholder="MM"
              value={formValues.batasWaktuMM}
              onChange={onBatasWaktuChange('batasWaktuMM', 2)}
              className={`w-[52px] h-[44px] text-center border bg-white rounded-[12px] focus:outline-none text-[14px] text-[#1F1F1D] placeholder:text-[#A3A39E] transition-colors ${
                showErrors && errors.batasWaktu ? 'border-red-500 focus:border-red-500' : 'border-[#E5E5E3] focus:border-[#2F6B3F]'
              }`}
            />
            <input
              type="text"
              maxLength={4}
              placeholder="YYYY"
              value={formValues.batasWaktuYYYY}
              onChange={onBatasWaktuChange('batasWaktuYYYY', 4)}
              className={`w-[78px] h-[44px] text-center border bg-white rounded-[12px] focus:outline-none text-[14px] text-[#1F1F1D] placeholder:text-[#A3A39E] transition-colors ${
                showErrors && errors.batasWaktu ? 'border-red-500 focus:border-red-500' : 'border-[#E5E5E3] focus:border-[#2F6B3F]'
              }`}
            />
          </div>
          {showErrors && errors.batasWaktu && <span className="text-red-500 text-[12px] font-jakarta">{errors.batasWaktu}</span>}
        </div>
      </div>

      {/* Deskripsi Kampanye */}
      <div className="flex flex-col gap-1.5 relative">
        <label className="font-jakarta text-[14px] font-medium text-[#1F1F1D]">Deskripsi Kampanye</label>
        <div className="relative">
          <textarea
            placeholder="Deskripsikan Kampanye"
            value={formValues.deskripsiKampanye}
            onChange={onTextareaChange('deskripsiKampanye', 500)}
            className={`w-full rounded-[12px] border bg-white p-4 pr-16 text-[14px] text-[#1F1F1D] placeholder:text-[#A3A39E] focus:outline-none resize-none h-[120px] transition-colors ${
              showErrors && errors.deskripsiKampanye ? 'border-red-500 focus:border-red-500' : 'border-[#E5E5E3] focus:border-[#2F6B3F]'
            }`}
          />
          <span className="absolute top-3 right-4 font-jakarta text-[11px] text-[#A3A39E]">{formValues.deskripsiKampanye.length}/500</span>
        </div>
        {showErrors && errors.deskripsiKampanye && <span className="text-red-500 text-[12px] font-jakarta">{errors.deskripsiKampanye}</span>}
      </div>

      {/* Tujuan Penggunaan Dana */}
      <div className="flex flex-col gap-1.5 relative">
        <label className="font-jakarta text-[14px] font-medium text-[#1F1F1D]">Tujuan Penggunaan Dana</label>
        <div className="relative">
          <textarea
            placeholder="Deskripsikan Tujuan Penggunaan Dana"
            value={formValues.tujuanPenggunaanDana}
            onChange={onTextareaChange('tujuanPenggunaanDana', 250)}
            className={`w-full rounded-[12px] border bg-white p-4 pr-16 text-[14px] text-[#1F1F1D] placeholder:text-[#A3A39E] focus:outline-none resize-none h-[88px] transition-colors ${
              showErrors && errors.tujuanPenggunaanDana ? 'border-red-500 focus:border-red-500' : 'border-[#E5E5E3] focus:border-[#2F6B3F]'
            }`}
          />
          <span className="absolute top-3 right-4 font-jakarta text-[11px] text-[#A3A39E]">{formValues.tujuanPenggunaanDana.length}/250</span>
        </div>
        {showErrors && errors.tujuanPenggunaanDana && <span className="text-red-500 text-[12px] font-jakarta">{errors.tujuanPenggunaanDana}</span>}
      </div>
    </div>
  );
}

export default Step2CampaignDetails;
