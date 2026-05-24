import React from 'react';
import type { FormValues } from '@/lib/validation/campaign';

interface Step3Props {
  formValues: FormValues;
  errors: Record<string, string>;
  showErrors: boolean;
  onNumericInputChange: (field: keyof FormValues) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPenghematanChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTextareaChange: (field: keyof FormValues, limit: number) => (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function Step3ImpactEstimate({ formValues, errors, showErrors, onNumericInputChange, onPenghematanChange, onTextareaChange }: Step3Props) {
  return (
    <div className="flex flex-col gap-6 max-w-[700px] animate-in fade-in-50 duration-200">
      <div className="flex flex-col gap-1">
        <h3 className="font-outfit font-bold text-[20px] leading-[25px] text-[#1F1F1D]">Estimasi Dampak</h3>
        <p className="font-jakarta text-[13px] text-[#5A5A57]">Masukkan estimasi dampak positif dari pemasangan panel surya ini.</p>
      </div>

      {/* Top row grid: Energi + Penerima */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Energi yang Dihasilkan */}
        <div className="flex flex-col gap-1.5">
          <label className="font-jakarta text-[14px] font-medium text-[#1F1F1D]">Energi yang Dihasilkan</label>
          <div className="flex items-center gap-3 mt-1">
            <input
              type="text"
              placeholder="Cth. 50"
              value={formValues.energiDihasilkan}
              onChange={onNumericInputChange('energiDihasilkan')}
              className={`w-[88px] h-[44px] rounded-[12px] border bg-white px-3 text-center text-[14px] text-[#1F1F1D] placeholder:text-[#A3A39E] focus:outline-none transition-colors ${
                showErrors && errors.energiDihasilkan ? 'border-red-500 focus:border-red-500' : 'border-[#E5E5E3] focus:border-[#2F6B3F]'
              }`}
            />
            <span className="font-jakarta text-[14px] text-[#5A5A57]">kWh/Bulan</span>
          </div>
          {showErrors && errors.energiDihasilkan && <span className="text-red-500 text-[12px] font-jakarta">{errors.energiDihasilkan}</span>}
        </div>

        {/* Jumlah Penerima Manfaat */}
        <div className="flex flex-col gap-1.5">
          <label className="font-jakarta text-[14px] font-medium text-[#1F1F1D]">Jumlah Penerima Manfaat</label>
          <div className="flex items-center gap-3 mt-1">
            <input
              type="text"
              placeholder="Cth. 150"
              value={formValues.jumlahPenerima}
              onChange={onNumericInputChange('jumlahPenerima')}
              className={`w-[88px] h-[44px] rounded-[12px] border bg-white px-3 text-center text-[14px] text-[#1F1F1D] placeholder:text-[#A3A39E] focus:outline-none transition-colors ${
                showErrors && errors.jumlahPenerima ? 'border-red-500 focus:border-red-500' : 'border-[#E5E5E3] focus:border-[#2F6B3F]'
              }`}
            />
            <span className="font-jakarta text-[14px] text-[#5A5A57]">Jemaat</span>
          </div>
          {showErrors && errors.jumlahPenerima && <span className="text-red-500 text-[12px] font-jakarta">{errors.jumlahPenerima}</span>}
        </div>
      </div>

      {/* Bottom row grid: Emisi + Penghematan */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Penurunan Emisi Karbon */}
        <div className="flex flex-col gap-1.5">
          <label className="font-jakarta text-[14px] font-medium text-[#1F1F1D]">Penurunan Emisi Karbon</label>
          <div className="flex items-center gap-3 mt-1">
            <input
              type="text"
              placeholder="Cth. 50"
              value={formValues.penurunanEmisi}
              onChange={onNumericInputChange('penurunanEmisi')}
              className={`w-[88px] h-[44px] rounded-[12px] border bg-white px-3 text-center text-[14px] text-[#1F1F1D] placeholder:text-[#A3A39E] focus:outline-none transition-colors ${
                showErrors && errors.penurunanEmisi ? 'border-red-500 focus:border-red-500' : 'border-[#E5E5E3] focus:border-[#2F6B3F]'
              }`}
            />
            <span className="font-jakarta text-[14px] text-[#5A5A57]">Kg CO2/Bulan</span>
          </div>
          {showErrors && errors.penurunanEmisi && <span className="text-red-500 text-[12px] font-jakarta">{errors.penurunanEmisi}</span>}
        </div>

        {/* Penghematan Biaya Listrik */}
        <div className="flex flex-col gap-1.5">
          <label className="font-jakarta text-[14px] font-medium text-[#1F1F1D]">Penghematan Biaya Listrik</label>
          <div className="flex items-center gap-3 mt-1">
            <div
              className={`flex items-center border rounded-[12px] bg-white px-3 h-[44px] w-[180px] transition-colors ${
                showErrors && errors.penghematanBiaya
                  ? 'border-red-500 focus-within:border-red-500'
                  : 'border-[#E5E5E3] focus-within:border-[#2F6B3F]'
              }`}
            >
              <span className="text-[#5A5A57] text-[14px] font-normal mr-1.5 select-none">Rp</span>
              <input
                type="text"
                placeholder="100.000"
                value={formValues.penghematanBiaya}
                onChange={onPenghematanChange}
                className="bg-transparent border-none outline-none w-full text-[14px] text-[#1F1F1D] placeholder:text-[#A3A39E] h-full"
              />
            </div>
            <span className="font-jakarta text-[14px] text-[#5A5A57]">/Bulan</span>
          </div>
          {showErrors && errors.penghematanBiaya && <span className="text-red-500 text-[12px] font-jakarta">{errors.penghematanBiaya}</span>}
        </div>
      </div>

      {/* Deskripsi Dampak */}
      <div className="flex flex-col gap-1.5 relative">
        <label className="font-jakarta text-[14px] font-medium text-[#1F1F1D]">Deskripsi Dampak</label>
        <div className="relative">
          <textarea
            placeholder="Deskripsikan Dampak yang Akan Dicapai"
            value={formValues.deskripsiDampak}
            onChange={onTextareaChange('deskripsiDampak', 500)}
            className={`w-full rounded-[12px] border bg-white p-4 pr-16 text-[14px] text-[#1F1F1D] placeholder:text-[#A3A39E] focus:outline-none resize-none h-[120px] transition-colors ${
              showErrors && errors.deskripsiDampak ? 'border-red-500 focus:border-red-500' : 'border-[#E5E5E3] focus:border-[#2F6B3F]'
            }`}
          />
          <span className="absolute top-3 right-4 font-jakarta text-[11px] text-[#A3A39E]">{formValues.deskripsiDampak.length}/500</span>
        </div>
        {showErrors && errors.deskripsiDampak && <span className="text-red-500 text-[12px] font-jakarta">{errors.deskripsiDampak}</span>}
      </div>
    </div>
  );
}

export default Step3ImpactEstimate;
