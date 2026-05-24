/* eslint-disable max-lines */
import { Pencil, ChevronDown } from 'lucide-react';
import type { FormValues } from '@/lib/validation/campaign';

interface Step4Props {
  formValues: FormValues;
  setStep: (step: number) => void;
  setShowErrors: (show: boolean) => void;
}

export function Step4Review({ formValues, setStep, setShowErrors }: Step4Props) {
  const handleEditRedirect = (targetStep: number) => {
    setStep(targetStep);
    setShowErrors(false);
  };

  return (
    <div className="flex flex-col gap-8 max-w-[1034px] animate-in fade-in-50 duration-200">
      {/* Card 1: Informasi Rumah Ibadah */}
      <div className="bg-white border border-[#E5E5E3] rounded-[24px] p-8 shadow-sm flex flex-col gap-6 relative">
        <div className="flex items-center justify-between border-b border-[#E5E5E3] pb-3">
          <h3 className="font-outfit font-bold text-[20px] leading-[25px] text-[#1F1F1D]">Informasi Rumah Ibadah</h3>
          <button
            type="button"
            onClick={() => handleEditRedirect(1)}
            className="flex items-center gap-1.5 border border-[#2F6B3F] hover:bg-[#2F6B3F]/5 text-[#2F6B3F] font-jakarta font-medium text-[13px] px-3.5 py-1.5 rounded-full cursor-pointer transition-colors"
          >
            <span>Edit</span>
            <Pencil className="w-3.5 h-3.5 text-[#2F6B3F]" />
          </button>
        </div>

        <div className="flex flex-col gap-5 w-full">
          {formValues.selectedWorshipPlaceId && (
            <div className="bg-[#EAF0EC] border border-[#2F6B3F]/20 rounded-[12px] px-4 py-2.5 text-[13px] text-[#2F6B3F] font-semibold self-start">
              ✓ Menggunakan Rumah Ibadah Terdaftar (ID: {formValues.selectedWorshipPlaceId})
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            {/* Nama Rumah Ibadah */}
            <div className="flex flex-col gap-1.5">
              <label className="font-jakarta text-[14px] font-medium text-[#1F1F1D]">Nama Rumah Ibadah</label>
              <input
                type="text"
                disabled
                value={formValues.namaRumahIbadah}
                className="w-full rounded-[12px] border border-[#E5E5E3] bg-[#FAF9F6]/60 h-[44px] px-4 text-[14px] text-[#5A5A57] cursor-not-allowed"
              />
            </div>

            {/* Tipe Rumah Ibadah */}
            <div className="flex flex-col gap-1.5">
              <label className="font-jakarta text-[14px] font-medium text-[#1F1F1D]">Tipe Rumah Ibadah</label>
              <div className="relative">
                <select
                  disabled
                  value={formValues.agama}
                  className="w-full rounded-[12px] border border-[#E5E5E3] bg-[#FAF9F6]/60 h-[44px] px-4 pr-10 text-[14px] text-[#5A5A57] appearance-none cursor-not-allowed"
                >
                  <option value={formValues.agama}>{formValues.agama || 'Belum dipilih'}</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A3A39E]" />
              </div>
            </div>

            {/* Alamat Rumah Ibadah */}
            <div className="flex flex-col gap-1.5">
              <label className="font-jakarta text-[14px] font-medium text-[#1F1F1D]">Alamat Rumah Ibadah</label>
              <textarea
                disabled
                value={formValues.alamatRumahIbadah}
                className="w-full rounded-[12px] border border-[#E5E5E3] bg-[#FAF9F6]/60 p-4 text-[14px] text-[#5A5A57] resize-none h-[120px] cursor-not-allowed"
              />
            </div>

            {/* Domisili */}
            <div className="flex flex-col gap-1.5">
              <label className="font-jakarta text-[14px] font-medium text-[#1F1F1D]">Domisili</label>
              <input
                type="text"
                disabled
                value={formValues.domisili}
                className="w-full rounded-[12px] border border-[#E5E5E3] bg-[#FAF9F6]/60 h-[44px] px-4 text-[14px] text-[#5A5A57] cursor-not-allowed"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            {/* Nama Narahubung */}
            <div className="flex flex-col gap-1.5">
              <label className="font-jakarta text-[14px] font-medium text-[#1F1F1D]">Nama Narahubung</label>
              <input
                type="text"
                disabled
                value={formValues.namaNarahubung}
                className="w-full rounded-[12px] border border-[#E5E5E3] bg-[#FAF9F6]/60 h-[44px] px-4 text-[14px] text-[#5A5A57] cursor-not-allowed"
              />
            </div>

            {/* No. Telp Narahubung */}
            <div className="flex flex-col gap-1.5">
              <label className="font-jakarta text-[14px] font-medium text-[#1F1F1D]">No. Telp Narahubung</label>
              <div className="flex items-center border border-[#E5E5E3] rounded-[12px] bg-[#FAF9F6]/60 px-4 h-[44px] cursor-not-allowed">
                <span className="text-[#A3A39E] text-[14px] font-normal mr-1.5 select-none">(+62)</span>
                <input
                  type="text"
                  disabled
                  value={formValues.noTelpNarahubung}
                  className="bg-transparent border-none outline-none w-full text-[14px] text-[#5A5A57] h-full cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Kondisi Saat Ini */}
          <div className="flex flex-col gap-1.5 relative w-full">
            <label className="font-jakarta text-[14px] font-medium text-[#1F1F1D]">Kondisi Saat Ini</label>
            <div className="relative">
              <textarea
                disabled
                value={formValues.kondisiSaatIni}
                className="w-full rounded-[12px] border border-[#E5E5E3] bg-[#FAF9F6]/60 p-4 pr-16 text-[14px] text-[#5A5A57] resize-none h-[120px] cursor-not-allowed"
              />
              <span className="absolute top-3 right-4 font-jakarta text-[11px] text-[#A3A39E]">{formValues.kondisiSaatIni.length}/500</span>
            </div>
          </div>

          {/* Informasi Penanggung Jawab */}
          <div className="flex flex-col gap-1.5 relative w-full">
            <label className="font-jakarta text-[14px] font-medium text-[#1F1F1D]">Informasi Penanggung Jawab</label>
            <div className="relative">
              <textarea
                disabled
                value={formValues.informasiPenanggungJawab}
                className="w-full rounded-[12px] border border-[#E5E5E3] bg-[#FAF9F6]/60 p-4 pr-16 text-[14px] text-[#5A5A57] resize-none h-[88px] cursor-not-allowed"
              />
              <span className="absolute top-3 right-4 font-jakarta text-[11px] text-[#A3A39E]">{formValues.informasiPenanggungJawab.length}/250</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card 2: Detail Kampanye */}
      <div className="bg-white border border-[#E5E5E3] rounded-[24px] p-8 shadow-sm flex flex-col gap-6 relative">
        <div className="flex items-center justify-between border-b border-[#E5E5E3] pb-3">
          <h3 className="font-outfit font-bold text-[20px] leading-[25px] text-[#1F1F1D]">Detail Kampanye</h3>
          <button
            type="button"
            onClick={() => handleEditRedirect(2)}
            className="flex items-center gap-1.5 border border-[#2F6B3F] hover:bg-[#2F6B3F]/5 text-[#2F6B3F] font-jakarta font-medium text-[13px] px-3.5 py-1.5 rounded-full cursor-pointer transition-colors"
          >
            <span>Edit</span>
            <Pencil className="w-3.5 h-3.5 text-[#2F6B3F]" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Fields column */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {/* Judul Kampanye */}
            <div className="flex flex-col gap-1.5">
              <label className="font-jakarta text-[14px] font-medium text-[#1F1F1D]">Judul Kampanye</label>
              <input
                type="text"
                disabled
                value={formValues.judulKampanye}
                className="w-full rounded-[12px] border border-[#E5E5E3] bg-[#FAF9F6]/60 h-[44px] px-4 text-[14px] text-[#5A5A57] cursor-not-allowed"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Target Dana */}
              <div className="flex flex-col gap-1.5">
                <label className="font-jakarta text-[14px] font-medium text-[#1F1F1D]">Target Dana</label>
                <div className="flex items-center border border-[#E5E5E3] rounded-[12px] bg-[#FAF9F6]/60 px-4 h-[44px] cursor-not-allowed">
                  <span className="text-[#A3A39E] text-[14px] font-semibold mr-1.5 select-none">Rp</span>
                  <input
                    type="text"
                    disabled
                    value={formValues.targetDana}
                    className="bg-transparent border-none outline-none w-full text-[14px] text-[#5A5A57] h-full cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Kapasitas Panel */}
              <div className="flex flex-col gap-1.5">
                <label className="font-jakarta text-[14px] font-medium text-[#1F1F1D]">Kapasitas Panel</label>
                <div className="flex items-center border border-[#E5E5E3] rounded-[12px] bg-[#FAF9F6]/60 px-4 h-[44px] cursor-not-allowed">
                  <input
                    type="text"
                    disabled
                    value={formValues.panelCapacityKwp}
                    className="bg-transparent border-none outline-none w-full text-[14px] text-[#5A5A57] h-full cursor-not-allowed"
                  />
                  <span className="text-[#A3A39E] text-[14px] font-semibold ml-1.5 select-none">kWp</span>
                </div>
              </div>

              {/* Batas Waktu */}
              <div className="flex flex-col gap-1.5">
                <label className="font-jakarta text-[14px] font-medium text-[#1F1F1D]">Batas Waktu</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    disabled
                    value={formValues.batasWaktuDD}
                    className="w-[52px] h-[44px] text-center border border-[#E5E5E3] bg-[#FAF9F6]/60 rounded-[12px] text-[14px] text-[#5A5A57] cursor-not-allowed"
                  />
                  <input
                    type="text"
                    disabled
                    value={formValues.batasWaktuMM}
                    className="w-[52px] h-[44px] text-center border border-[#E5E5E3] bg-[#FAF9F6]/60 rounded-[12px] text-[14px] text-[#5A5A57] cursor-not-allowed"
                  />
                  <input
                    type="text"
                    disabled
                    value={formValues.batasWaktuYYYY}
                    className="w-[78px] h-[44px] text-center border border-[#E5E5E3] bg-[#FAF9F6]/60 rounded-[12px] text-[14px] text-[#5A5A57] cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            {/* Deskripsi Kampanye */}
            <div className="flex flex-col gap-1.5 relative">
              <label className="font-jakarta text-[14px] font-medium text-[#1F1F1D]">Deskripsi Kampanye</label>
              <div className="relative">
                <textarea
                  disabled
                  value={formValues.deskripsiKampanye}
                  className="w-full rounded-[12px] border border-[#E5E5E3] bg-[#FAF9F6]/60 p-4 pr-16 text-[14px] text-[#5A5A57] resize-none h-[120px] cursor-not-allowed"
                />
                <span className="absolute top-3 right-4 font-jakarta text-[11px] text-[#A3A39E]">{formValues.deskripsiKampanye.length}/500</span>
              </div>
            </div>

            {/* Tujuan Penggunaan Dana */}
            <div className="flex flex-col gap-1.5 relative">
              <label className="font-jakarta text-[14px] font-medium text-[#1F1F1D]">Tujuan Penggunaan Dana</label>
              <div className="relative">
                <textarea
                  disabled
                  value={formValues.tujuanPenggunaanDana}
                  className="w-full rounded-[12px] border border-[#E5E5E3] bg-[#FAF9F6]/60 p-4 pr-16 text-[14px] text-[#5A5A57] resize-none h-[88px] cursor-not-allowed"
                />
                <span className="absolute top-3 right-4 font-jakarta text-[11px] text-[#A3A39E]">{formValues.tujuanPenggunaanDana.length}/250</span>
              </div>
            </div>
          </div>

          {/* Image Card (disabled) */}
          <div className="lg:col-span-1 flex flex-col items-center gap-4 mt-6 lg:mt-0">
            <label className="font-jakarta text-[14px] font-medium text-[#1F1F1D] self-start">Gambar Sampul</label>
            <div className="w-full aspect-[4/3] rounded-[24px] border border-[#E5E5E3] bg-[#FAF9F6]/60 flex items-center justify-center overflow-hidden">
              {formValues.coverImage ? (
                <img src={formValues.coverImage} alt="Pratinjau sampul kampanye" className="w-full h-full object-cover" />
              ) : (
                <span className="text-[#A3A39E] text-[13px] font-jakarta">Tidak ada gambar</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Card 3: Estimasi Dampak */}
      <div className="bg-white border border-[#E5E5E3] rounded-[24px] p-8 shadow-sm flex flex-col gap-6 relative">
        <div className="flex items-center justify-between border-b border-[#E5E5E3] pb-3">
          <h3 className="font-outfit font-bold text-[20px] leading-[25px] text-[#1F1F1D]">Estimasi Dampak</h3>
          <button
            type="button"
            onClick={() => handleEditRedirect(3)}
            className="flex items-center gap-1.5 border border-[#2F6B3F] hover:bg-[#2F6B3F]/5 text-[#2F6B3F] font-jakarta font-medium text-[13px] px-3.5 py-1.5 rounded-full cursor-pointer transition-colors"
          >
            <span>Edit</span>
            <Pencil className="w-3.5 h-3.5 text-[#2F6B3F]" />
          </button>
        </div>

        <div className="flex flex-col gap-5 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Energi yang Dihasilkan */}
            <div className="flex flex-col gap-1.5">
              <label className="font-jakarta text-[14px] font-medium text-[#1F1F1D]">Energi yang Dihasilkan</label>
              <div className="flex items-center gap-3 mt-1">
                <input
                  type="text"
                  disabled
                  value={formValues.energiDihasilkan}
                  className="w-[88px] h-[44px] rounded-[12px] border border-[#E5E5E3] bg-[#FAF9F6]/60 px-3 text-center text-[14px] text-[#5A5A57] cursor-not-allowed"
                />
                <span className="font-jakarta text-[14px] text-[#5A5A57]">kWh/Bulan</span>
              </div>
            </div>

            {/* Jumlah Penerima Manfaat */}
            <div className="flex flex-col gap-1.5">
              <label className="font-jakarta text-[14px] font-medium text-[#1F1F1D]">Jumlah Penerima Manfaat</label>
              <div className="flex items-center gap-3 mt-1">
                <input
                  type="text"
                  disabled
                  value={formValues.jumlahPenerima}
                  className="w-[88px] h-[44px] rounded-[12px] border border-[#E5E5E3] bg-[#FAF9F6]/60 px-3 text-center text-[14px] text-[#5A5A57] cursor-not-allowed"
                />
                <span className="font-jakarta text-[14px] text-[#5A5A57]">Jemaat</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Penurunan Emisi Karbon */}
            <div className="flex flex-col gap-1.5">
              <label className="font-jakarta text-[14px] font-medium text-[#1F1F1D]">Penurunan Emisi Karbon</label>
              <div className="flex items-center gap-3 mt-1">
                <input
                  type="text"
                  disabled
                  value={formValues.penurunanEmisi}
                  className="w-[88px] h-[44px] rounded-[12px] border border-[#E5E5E3] bg-[#FAF9F6]/60 px-3 text-center text-[14px] text-[#5A5A57] cursor-not-allowed"
                />
                <span className="font-jakarta text-[14px] text-[#5A5A57]">Kg CO2/Bulan</span>
              </div>
            </div>

            {/* Penghematan Biaya Listrik */}
            <div className="flex flex-col gap-1.5">
              <label className="font-jakarta text-[14px] font-medium text-[#1F1F1D]">Penghematan Biaya Listrik</label>
              <div className="flex items-center gap-3 mt-1">
                <div className="flex items-center border border-[#E5E5E3] rounded-[12px] bg-[#FAF9F6]/60 px-3 h-[44px] w-[180px] cursor-not-allowed">
                  <span className="text-[#5A5A57] text-[14px] font-normal mr-1.5 select-none">Rp</span>
                  <input
                    type="text"
                    disabled
                    value={formValues.penghematanBiaya}
                    className="bg-transparent border-none outline-none w-full text-[14px] text-[#5A5A57] h-full cursor-not-allowed"
                  />
                </div>
                <span className="font-jakarta text-[14px] text-[#5A5A57]">/Bulan</span>
              </div>
            </div>
          </div>

          {/* Deskripsi Dampak */}
          <div className="flex flex-col gap-1.5 relative w-full">
            <label className="font-jakarta text-[14px] font-medium text-[#1F1F1D]">Deskripsi Dampak</label>
            <div className="relative">
              <textarea
                disabled
                value={formValues.deskripsiDampak}
                className="w-full rounded-[12px] border border-[#E5E5E3] bg-[#FAF9F6]/60 p-4 pr-16 text-[14px] text-[#5A5A57] resize-none h-[120px] cursor-not-allowed"
              />
              <span className="absolute top-3 right-4 font-jakarta text-[11px] text-[#A3A39E]">{formValues.deskripsiDampak.length}/500</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Step4Review;
