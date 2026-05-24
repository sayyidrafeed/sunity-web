/* eslint-disable max-lines */
import React, { useState, useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ChevronDown, Upload, Search, X, Building2 } from 'lucide-react';
import { toast } from 'sonner';
import type { FormValues } from '@/lib/validation/campaign';
import { useDebounce } from '@/hooks/use-debounce';
import { getAdminWorshipPlacesOptions } from '@/lib/api/generated/@tanstack/react-query.gen';
import type { WorshipPlace } from '@/lib/api/generated/types.gen';

interface Step1Props {
  formValues: FormValues;
  errors: Record<string, string>;
  showErrors: boolean;
  onFieldChange: <K extends keyof FormValues>(field: K, value: FormValues[K]) => void;
  onPhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTextareaChange: (field: keyof FormValues, limit: number) => (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSelectWorshipPlace: (wp: WorshipPlace) => void;
  onClearWorshipPlace: () => void;
}

export function Step1WorshipPlaceInfo({
  formValues,
  errors,
  showErrors,
  onFieldChange,
  onPhoneChange,
  onTextareaChange,
  onSelectWorshipPlace,
  onClearWorshipPlace,
}: Step1Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Search state for existing worship places
  const [searchVal, setSearchVal] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const debouncedSearch = useDebounce(searchVal, 300);

  // Fetch existing worship places based on debounced search
  const { data: searchResults, isLoading } = useQuery({
    ...getAdminWorshipPlacesOptions({
      query: {
        search: debouncedSearch || undefined,
        limit: 5,
      },
    }),
    enabled: isDropdownOpen,
  });

  // Handle clicking outside the search dropdown to close it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const triggerImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Ukuran file maksimal adalah 2MB');
        return;
      }
      if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
        toast.error('Format file harus PNG, JPG, atau JPEG');
        return;
      }
      onFieldChange('coverImageFile', file);

      const reader = new FileReader();
      reader.onloadend = () => {
        onFieldChange('coverImage', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const isSelected = !!formValues.selectedWorshipPlaceId;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in-50 duration-200">
      {/* Form Fields Column */}
      <div className="lg:col-span-2 flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h3 className="font-outfit font-bold text-[20px] leading-[25px] text-[#1F1F1D]">Informasi Rumah Ibadah</h3>
          <p className="font-jakarta text-[13px] text-[#5A5A57]">Masukkan data rumah ibadah yang akan didukung oleh kampanye ini.</p>
        </div>

        {/* Existing Worship Place Search Combobox */}
        <div className="flex flex-col gap-1.5 relative" ref={dropdownRef}>
          <label className="font-jakarta text-[14px] font-medium text-[#1F1F1D]">Pilih dari Rumah Ibadah Terdaftar (Opsional)</label>
          {isSelected ? (
            <div className="flex items-center justify-between bg-[#EAF0EC] border border-[#2F6B3F]/30 rounded-[12px] px-4 py-3 text-[14px] text-[#2F6B3F] font-medium">
              <div className="flex items-center gap-2.5">
                <Building2 className="w-5 h-5 text-[#2F6B3F]" />
                <div>
                  <div className="font-bold">{formValues.namaRumahIbadah}</div>
                  <div className="text-[12px] text-[#5A5A57]">
                    {formValues.agama} • {formValues.domisili}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={onClearWorshipPlace}
                className="p-1 hover:bg-[#CFE3D5] rounded-full text-[#5A5A57] hover:text-[#1F1F1D] transition-colors cursor-pointer"
                aria-label="Batalkan pilihan rumah ibadah"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="relative">
              <div className="flex items-center border border-[#E5E5E3] rounded-[12px] bg-white px-4 h-[44px] focus-within:border-[#2F6B3F] focus-within:ring-1 focus-within:ring-[#2F6B3F]/20 transition-all">
                <Search className="w-4 h-4 text-[#A3A39E] mr-2 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Cari berdasarkan nama rumah ibadah terdaftar..."
                  value={searchVal}
                  onChange={(e) => {
                    setSearchVal(e.target.value);
                    setIsDropdownOpen(true);
                  }}
                  onFocus={() => setIsDropdownOpen(true)}
                  className="bg-transparent border-none outline-none w-full text-[14px] text-[#1F1F1D] placeholder:text-[#A3A39E] h-full"
                />
                {searchVal && (
                  <button
                    type="button"
                    onClick={() => setSearchVal('')}
                    className="p-0.5 rounded-full hover:bg-gray-100 text-[#A3A39E] hover:text-[#5A5A57]"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Autocomplete Dropdown */}
              {isDropdownOpen && (
                <div className="absolute top-[48px] left-0 right-0 bg-white border border-[#E5E5E3] rounded-[16px] shadow-lg py-2 z-20 font-jakarta text-[14px] max-h-[220px] overflow-y-auto">
                  {isLoading ? (
                    <div className="px-4 py-3 text-[#A3A39E] text-center">Mencari...</div>
                  ) : searchResults?.data && searchResults.data.length > 0 ? (
                    searchResults.data.map((wp) => (
                      <button
                        key={wp.id}
                        type="button"
                        onClick={() => {
                          onSelectWorshipPlace(wp);
                          setSearchVal('');
                          setIsDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2.5 hover:bg-[#FAF9F6] transition-colors flex flex-col gap-0.5 border-b border-gray-50 last:border-b-0"
                      >
                        <span className="font-semibold text-[#1F1F1D]">{wp.name}</span>
                        <span className="text-[12px] text-[#A3A39E]">
                          {wp.religionType} • {wp.city}
                        </span>
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-[#A3A39E] text-center">
                      Tidak ada rumah ibadah terdaftar yang ditemukan. Silakan isi form di bawah.
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="h-[1px] bg-[#E5E5E3]/60 my-1" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
          {/* Nama Rumah Ibadah */}
          <div className="flex flex-col gap-1.5">
            <label className="font-jakarta text-[14px] font-medium text-[#1F1F1D]">Nama Rumah Ibadah</label>
            <input
              type="text"
              placeholder="Masukkan Nama Rumah Ibadah"
              disabled={isSelected}
              value={formValues.namaRumahIbadah}
              onChange={(e) => onFieldChange('namaRumahIbadah', e.target.value)}
              className={`w-full rounded-[12px] border h-[44px] px-4 text-[14px] text-[#1F1F1D] placeholder:text-[#A3A39E] focus:outline-none transition-colors ${
                isSelected
                  ? 'bg-gray-100/60 border-[#E5E5E3] text-[#5A5A57] cursor-not-allowed'
                  : showErrors && errors.namaRumahIbadah
                    ? 'border-red-500 bg-white focus:border-red-500'
                    : 'border-[#E5E5E3] bg-white focus:border-[#2F6B3F]'
              }`}
            />
            {showErrors && errors.namaRumahIbadah && <span className="text-red-500 text-[12px] font-jakarta">{errors.namaRumahIbadah}</span>}
          </div>

          {/* Tipe Rumah Ibadah */}
          <div className="flex flex-col gap-1.5">
            <label className="font-jakarta text-[14px] font-medium text-[#1F1F1D]">Tipe Rumah Ibadah</label>
            <div className="relative">
              <select
                disabled={isSelected}
                value={formValues.agama}
                onChange={(e) => onFieldChange('agama', e.target.value as FormValues['agama'])}
                className={`w-full rounded-[12px] border h-[44px] px-4 pr-10 text-[14px] text-[#1F1F1D] focus:outline-none appearance-none transition-colors ${
                  isSelected
                    ? 'bg-gray-100/60 border-[#E5E5E3] text-[#5A5A57] cursor-not-allowed'
                    : showErrors && errors.agama
                      ? 'border-red-500 bg-white focus:border-red-500'
                      : 'border-[#E5E5E3] bg-white focus:border-[#2F6B3F]'
                }`}
              >
                <option value="" disabled hidden>
                  Pilih Tipe Rumah Ibadah
                </option>
                <option value="Masjid">Masjid</option>
                <option value="Mushalla">Mushalla</option>
                <option value="Gereja">Gereja</option>
                <option value="Pura">Pura</option>
                <option value="Vihara">Vihara</option>
                <option value="Klenteng">Klenteng</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A3A39E] pointer-events-none" />
            </div>
            {showErrors && errors.agama && <span className="text-red-500 text-[12px] font-jakarta">{errors.agama}</span>}
          </div>

          {/* Alamat Rumah Ibadah */}
          <div className="flex flex-col gap-1.5">
            <label className="font-jakarta text-[14px] font-medium text-[#1F1F1D]">Alamat Rumah Ibadah</label>
            <textarea
              placeholder="Masukkan Alamat Rumah Ibadah"
              disabled={isSelected}
              value={formValues.alamatRumahIbadah}
              onChange={(e) => onFieldChange('alamatRumahIbadah', e.target.value)}
              className={`w-full rounded-[12px] border p-4 text-[14px] text-[#1F1F1D] placeholder:text-[#A3A39E] focus:outline-none resize-none h-[120px] transition-colors ${
                isSelected
                  ? 'bg-gray-100/60 border-[#E5E5E3] text-[#5A5A57] cursor-not-allowed'
                  : showErrors && errors.alamatRumahIbadah
                    ? 'border-red-500 bg-white focus:border-red-500'
                    : 'border-[#E5E5E3] bg-white focus:border-[#2F6B3F]'
              }`}
            />
            {showErrors && errors.alamatRumahIbadah && <span className="text-red-500 text-[12px] font-jakarta">{errors.alamatRumahIbadah}</span>}
          </div>

          {/* Domisili */}
          <div className="flex flex-col gap-1.5">
            <div className="flex flex-col gap-1.5">
              <label className="font-jakarta text-[14px] font-medium text-[#1F1F1D]">Domisili (Kota/Kabupaten)</label>
              <input
                type="text"
                placeholder="Cth. Jakarta"
                disabled={isSelected}
                value={formValues.domisili}
                onChange={(e) => onFieldChange('domisili', e.target.value)}
                className={`w-full rounded-[12px] border h-[44px] px-4 text-[14px] text-[#1F1F1D] placeholder:text-[#A3A39E] focus:outline-none transition-colors ${
                  isSelected
                    ? 'bg-gray-100/60 border-[#E5E5E3] text-[#5A5A57] cursor-not-allowed'
                    : showErrors && errors.domisili
                      ? 'border-red-500 bg-white focus:border-red-500'
                      : 'border-[#E5E5E3] bg-white focus:border-[#2F6B3F]'
                }`}
              />
              {showErrors && errors.domisili && <span className="text-red-500 text-[12px] font-jakarta">{errors.domisili}</span>}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mt-1">
          {/* Nama Narahubung */}
          <div className="flex flex-col gap-1.5">
            <label className="font-jakarta text-[14px] font-medium text-[#1F1F1D]">Nama Narahubung</label>
            <input
              type="text"
              placeholder="Masukkan Nama Narahubung"
              disabled={isSelected}
              value={formValues.namaNarahubung}
              onChange={(e) => onFieldChange('namaNarahubung', e.target.value)}
              className={`w-full rounded-[12px] border h-[44px] px-4 text-[14px] text-[#1F1F1D] placeholder:text-[#A3A39E] focus:outline-none transition-colors ${
                isSelected
                  ? 'bg-gray-100/60 border-[#E5E5E3] text-[#5A5A57] cursor-not-allowed'
                  : showErrors && errors.namaNarahubung
                    ? 'border-red-500 bg-white focus:border-red-500'
                    : 'border-[#E5E5E3] bg-white focus:border-[#2F6B3F]'
              }`}
            />
            {showErrors && errors.namaNarahubung && <span className="text-red-500 text-[12px] font-jakarta">{errors.namaNarahubung}</span>}
          </div>

          {/* No. Telp Narahubung */}
          <div className="flex flex-col gap-1.5">
            <label className="font-jakarta text-[14px] font-medium text-[#1F1F1D]">No. Telp Narahubung</label>
            <div
              className={`flex items-center border rounded-[12px] px-4 h-[44px] transition-colors ${
                isSelected
                  ? 'bg-gray-100/60 border-[#E5E5E3] cursor-not-allowed'
                  : showErrors && errors.noTelpNarahubung
                    ? 'border-red-500 bg-white focus-within:border-red-500'
                    : 'border-[#E5E5E3] bg-white focus-within:border-[#2F6B3F]'
              }`}
            >
              <span className="text-[#5A5A57] text-[14px] font-normal mr-1.5 select-none">(+62)</span>
              <input
                type="text"
                placeholder="Cth. 85924516288"
                disabled={isSelected}
                value={formValues.noTelpNarahubung}
                onChange={onPhoneChange}
                className="bg-transparent border-none outline-none w-full text-[14px] text-[#1F1F1D] placeholder:text-[#A3A39E] h-full disabled:cursor-not-allowed"
              />
            </div>
            {showErrors && errors.noTelpNarahubung && <span className="text-red-500 text-[12px] font-jakarta">{errors.noTelpNarahubung}</span>}
          </div>
        </div>

        {/* Kondisi Saat Ini */}
        <div className="flex flex-col gap-1.5 relative">
          <label className="font-jakarta text-[14px] font-medium text-[#1F1F1D]">Kondisi Saat Ini</label>
          <div className="relative">
            <textarea
              placeholder="Deskripsikan Kondisi Rumah Ibadah"
              disabled={isSelected}
              value={formValues.kondisiSaatIni}
              onChange={onTextareaChange('kondisiSaatIni', 500)}
              className={`w-full rounded-[12px] border p-4 pr-16 text-[14px] text-[#1F1F1D] placeholder:text-[#A3A39E] focus:outline-none resize-none h-[120px] transition-colors ${
                isSelected
                  ? 'bg-gray-100/60 border-[#E5E5E3] text-[#5A5A57] cursor-not-allowed'
                  : showErrors && errors.kondisiSaatIni
                    ? 'border-red-500 bg-white focus:border-red-500'
                    : 'border-[#E5E5E3] bg-white focus:border-[#2F6B3F]'
              }`}
            />
            <span className="absolute top-3 right-4 font-jakarta text-[11px] text-[#A3A39E]">{formValues.kondisiSaatIni.length}/500</span>
          </div>
          {showErrors && errors.kondisiSaatIni && <span className="text-red-500 text-[12px] font-jakarta">{errors.kondisiSaatIni}</span>}
        </div>

        {/* Informasi Penanggung Jawab */}
        <div className="flex flex-col gap-1.5 relative">
          <label className="font-jakarta text-[14px] font-medium text-[#1F1F1D]">Informasi Penanggung Jawab</label>
          <div className="relative">
            <textarea
              placeholder="Masukkan Informasi Penanggung Jawab"
              disabled={isSelected}
              value={formValues.informasiPenanggungJawab}
              onChange={onTextareaChange('informasiPenanggungJawab', 250)}
              className={`w-full rounded-[12px] border p-4 pr-16 text-[14px] text-[#1F1F1D] placeholder:text-[#A3A39E] focus:outline-none resize-none h-[88px] transition-colors ${
                isSelected
                  ? 'bg-gray-100/60 border-[#E5E5E3] text-[#5A5A57] cursor-not-allowed'
                  : showErrors && errors.informasiPenanggungJawab
                    ? 'border-red-500 bg-white focus:border-red-500'
                    : 'border-[#E5E5E3] bg-white focus:border-[#2F6B3F]'
              }`}
            />
            <span className="absolute top-3 right-4 font-jakarta text-[11px] text-[#A3A39E]">{formValues.informasiPenanggungJawab.length}/250</span>
          </div>
          {showErrors && errors.informasiPenanggungJawab && (
            <span className="text-red-500 text-[12px] font-jakarta">{errors.informasiPenanggungJawab}</span>
          )}
        </div>
      </div>

      {/* Image Upload Column */}
      <div className="lg:col-span-1 flex flex-col items-center gap-4 mt-[33px]">
        {/* Upload Card */}
        <div
          onClick={triggerImageUpload}
          className={`w-full max-w-[340px] aspect-[4/3] rounded-[24px] border-2 border-dashed flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-colors relative overflow-hidden ${
            formValues.coverImage
              ? 'border-[#2F6B3F]/30 bg-white'
              : showErrors && errors.coverImage
                ? 'border-red-500 bg-red-50/20 hover:bg-red-50/40'
                : 'border-[#2F6B3F]/40 bg-[#EAF0EC]/40 hover:bg-[#EAF0EC]/60'
          }`}
        >
          <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/png, image/jpeg, image/jpg" className="hidden" />

          {formValues.coverImage ? (
            <img src={formValues.coverImage} alt="Pratinjau sampul kampanye" className="w-full h-full object-cover rounded-[20px]" />
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="w-[62px] h-[62px] rounded-full bg-white flex items-center justify-center shadow-sm">
                <Upload className="w-6 h-6 text-[#2F6B3F]" />
              </div>
              <span className="font-jakarta text-[16px] font-bold text-[#2F6B3F]">Unggah Gambar</span>
            </div>
          )}
        </div>

        <span className="font-jakarta text-[12px] text-[#A3A39E] text-center max-w-[280px]">Allowed formats: PNG, JPG. Max size: 2MB</span>
        {showErrors && errors.coverImage && <span className="text-red-500 text-[12px] font-jakarta">{errors.coverImage}</span>}

        <button
          type="button"
          onClick={triggerImageUpload}
          className="w-full max-w-[340px] bg-[#2F6B3F] hover:bg-[#245330] text-white font-jakarta font-semibold text-[14px] h-[44px] rounded-full flex items-center justify-center transition-colors cursor-pointer shadow-sm"
        >
          {formValues.coverImage ? 'Ganti' : 'Pilih Gambar'}
        </button>
      </div>
    </div>
  );
}

export default Step1WorshipPlaceInfo;
