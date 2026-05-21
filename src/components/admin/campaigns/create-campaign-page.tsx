import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Check, ChevronDown, Upload, Pencil } from 'lucide-react';
import { toast } from 'sonner';

interface FormValues {
  // Step 1: Rumah Ibadah
  namaRumahIbadah: string;
  agama: string;
  alamatRumahIbadah: string;
  domisili: string;
  namaNarahubung: string;
  noTelpNarahubung: string;
  kondisiSaatIni: string;
  informasiPenanggungJawab: string;
  coverImage: string;

  // Step 2: Detail Kampanye
  judulKampanye: string;
  targetDana: string;
  batasWaktuDD: string;
  batasWaktuMM: string;
  batasWaktuYYYY: string;
  deskripsiKampanye: string;
  tujuanPenggunaanDana: string;

  // Step 3: Estimasi Dampak
  energiDihasilkan: string;
  jumlahPenerima: string;
  penurunanEmisi: string;
  penghematanBiaya: string;
  deskripsiDampak: string;
}

const INITIAL_FORM_VALUES: FormValues = {
  namaRumahIbadah: '',
  agama: '',
  alamatRumahIbadah: '',
  domisili: '',
  namaNarahubung: '',
  noTelpNarahubung: '',
  kondisiSaatIni: '',
  informasiPenanggungJawab: '',
  coverImage: '',

  judulKampanye: '',
  targetDana: '',
  batasWaktuDD: '',
  batasWaktuMM: '',
  batasWaktuYYYY: '',
  deskripsiKampanye: '',
  tujuanPenggunaanDana: '',

  energiDihasilkan: '',
  jumlahPenerima: '',
  penurunanEmisi: '',
  penghematanBiaya: '',
  deskripsiDampak: '',
};

export function CreateCampaignPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formValues, setFormValues] = useState<FormValues>(INITIAL_FORM_VALUES);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Formatting helpers
  const formatNumberString = (val: string) => {
    const clean = val.replace(/\D/g, '');
    if (!clean) return '';
    return new Intl.NumberFormat('id-ID').format(Number(clean));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '');
    setFormValues((prev) => ({ ...prev, noTelpNarahubung: val }));
  };

  const handleTargetDanaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatNumberString(e.target.value);
    setFormValues((prev) => ({ ...prev, targetDana: formatted }));
  };

  const handlePenghematanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatNumberString(e.target.value);
    setFormValues((prev) => ({ ...prev, penghematanBiaya: formatted }));
  };

  const handleBatasWaktuChange =
    (field: 'batasWaktuDD' | 'batasWaktuMM' | 'batasWaktuYYYY', length: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const clean = e.target.value.replace(/\D/g, '');
      if (clean.length <= length) {
        setFormValues((prev) => ({ ...prev, [field]: clean }));
      }
    };

  const handleTextareaChange = (field: keyof FormValues, limit: number) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (val.length <= limit) {
      setFormValues((prev) => ({ ...prev, [field]: val }));
    }
  };

  const handleNumericInputChange = (field: keyof FormValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const clean = e.target.value.replace(/\D/g, '');
    setFormValues((prev) => ({ ...prev, [field]: clean }));
  };

  // File Upload Logic
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
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormValues((prev) => ({ ...prev, coverImage: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Step Validation logic
  const getValidationErrors = (currStep: number) => {
    const errors: Record<string, string> = {};
    if (currStep === 1) {
      if (!formValues.namaRumahIbadah.trim()) {
        errors.namaRumahIbadah = 'Nama rumah ibadah harus diisi';
      }
      if (!formValues.agama) {
        errors.agama = 'Agama harus dipilih';
      }
      if (!formValues.alamatRumahIbadah.trim()) {
        errors.alamatRumahIbadah = 'Alamat rumah ibadah harus diisi';
      }
      if (!formValues.domisili.trim()) {
        errors.domisili = 'Domisili harus diisi';
      }
      if (!formValues.namaNarahubung.trim()) {
        errors.namaNarahubung = 'Nama narahubung harus diisi';
      }
      if (!formValues.noTelpNarahubung.trim()) {
        errors.noTelpNarahubung = 'No. telp narahubung harus diisi';
      }
      if (!formValues.kondisiSaatIni.trim()) {
        errors.kondisiSaatIni = 'Kondisi saat ini harus diisi';
      }
      if (!formValues.informasiPenanggungJawab.trim()) {
        errors.informasiPenanggungJawab = 'Informasi penanggung jawab harus diisi';
      }
      if (!formValues.coverImage) {
        errors.coverImage = 'Gambar sampul harus diunggah';
      }
    } else if (currStep === 2) {
      if (!formValues.judulKampanye.trim()) {
        errors.judulKampanye = 'Judul kampanye harus diisi';
      }
      if (!formValues.targetDana.trim()) {
        errors.targetDana = 'Target dana harus diisi';
      }

      const dd = parseInt(formValues.batasWaktuDD);
      const mm = parseInt(formValues.batasWaktuMM);
      const yyyy = parseInt(formValues.batasWaktuYYYY);

      if (!formValues.batasWaktuDD || isNaN(dd) || dd < 1 || dd > 31) {
        errors.batasWaktu = 'Hari (DD) harus antara 01 - 31';
      } else if (!formValues.batasWaktuMM || isNaN(mm) || mm < 1 || mm > 12) {
        errors.batasWaktu = 'Bulan (MM) harus antara 01 - 12';
      } else if (!formValues.batasWaktuYYYY || isNaN(yyyy) || yyyy < 2026 || yyyy > 2100) {
        errors.batasWaktu = 'Tahun (YYYY) harus antara 2026 - 2100';
      }

      if (!formValues.deskripsiKampanye.trim()) {
        errors.deskripsiKampanye = 'Deskripsi kampanye harus diisi';
      }
      if (!formValues.tujuanPenggunaanDana.trim()) {
        errors.tujuanPenggunaanDana = 'Tujuan penggunaan dana harus diisi';
      }
    } else if (currStep === 3) {
      if (!formValues.energiDihasilkan.trim()) {
        errors.energiDihasilkan = 'Energi yang dihasilkan harus diisi';
      }
      if (!formValues.jumlahPenerima.trim()) {
        errors.jumlahPenerima = 'Jumlah penerima manfaat harus diisi';
      }
      if (!formValues.penurunanEmisi.trim()) {
        errors.penurunanEmisi = 'Penurunan emisi karbon harus diisi';
      }
      if (!formValues.penghematanBiaya.trim()) {
        errors.penghematanBiaya = 'Penghematan biaya listrik harus diisi';
      }
      if (!formValues.deskripsiDampak.trim()) {
        errors.deskripsiDampak = 'Deskripsi dampak harus diisi';
      }
    }
    return errors;
  };

  const isStepValid = (currStep: number) => {
    const errors = getValidationErrors(currStep);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    const errors = getValidationErrors(step);
    const isValid = Object.keys(errors).length === 0;
    if (isValid) {
      setStep((prev) => prev + 1);
      setShowErrors(false);
    } else {
      setShowErrors(true);
      const firstErrorKey = Object.keys(errors)[0];
      const firstErrorMessage = errors[firstErrorKey];
      toast.error(firstErrorMessage);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
      setShowErrors(false);
    }
  };

  const handleSubmit = () => {
    const targetVal = Number(formValues.targetDana.replace(/\./g, ''));
    const dd = formValues.batasWaktuDD.padStart(2, '0');
    const mm = formValues.batasWaktuMM.padStart(2, '0');
    const yyyy = formValues.batasWaktuYYYY;
    const dateStr = `${yyyy}-${mm}-${dd}T00:00:00Z`;

    // Load existing from localStorage
    const saved = localStorage.getItem('sunity_campaigns');
    let list = [];
    if (saved) {
      try {
        list = JSON.parse(saved);
      } catch {
        // Ignored
      }
    } else {
      list = [
        {
          id: '1',
          title: 'Dukung Pemasangan Panel Surya Gereja Advent',
          targetIdr: 100000000,
          raisedIdr: 100000000,
          progressPercent: 100,
          status: 'SELESAI',
          coverImage: '/images/review-campaign-1.png',
          deadline: '2026-04-30T00:00:00Z',
          dateCreated: '2026-01-10T00:00:00Z',
        },
        {
          id: '2',
          title: 'Dukung Pemasangan Panel Surya Masjid Al – Ikhlas',
          targetIdr: 100000000,
          raisedIdr: 70000000,
          progressPercent: 70,
          status: 'AKTIF',
          coverImage: '/images/review-campaign-2.png',
          deadline: '2026-08-15T00:00:00Z',
          dateCreated: '2026-03-12T00:00:00Z',
        },
        {
          id: '3',
          title: 'Dukung Pemasangan Panel Surya Gereja Katedral',
          targetIdr: 100000000,
          raisedIdr: 90000000,
          progressPercent: 90,
          status: 'INSTALASI',
          coverImage: '/images/review-campaign-3.png',
          deadline: '2026-06-30T00:00:00Z',
          dateCreated: '2026-02-20T00:00:00Z',
        },
      ];
    }

    const newCampaign = {
      id: String(Date.now()),
      title: formValues.judulKampanye,
      targetIdr: targetVal,
      raisedIdr: 0,
      progressPercent: 0,
      status: 'AKTIF',
      coverImage: formValues.coverImage,
      deadline: dateStr,
      dateCreated: new Date().toISOString(),
    };

    list.unshift(newCampaign);
    localStorage.setItem('sunity_campaigns', JSON.stringify(list));

    // Show success modal overlay
    setShowSuccessModal(true);
  };

  const steps = [
    { id: 1, label: 'Data Rumah Ibadah' },
    { id: 2, label: 'Detail Kampanye' },
    { id: 3, label: 'Estimasi Dampak' },
    { id: 4, label: 'Tinjauan' },
  ];

  return (
    <div className="flex flex-col p-12 gap-10 bg-[#FAF9F6] min-h-screen relative font-jakarta">
      {/* Header and Breadcrumbs */}
      <div className="flex flex-col gap-[8px]">
        <div className="flex items-center gap-[16px]">
          <button
            type="button"
            onClick={() => navigate('/admin/campaigns')}
            className="p-2 hover:bg-white rounded-full border border-transparent hover:border-[#E5E5E3] transition-colors cursor-pointer text-[#1F1F1D]"
            aria-label="Kembali ke Kelola Kampanye"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="font-outfit text-[32px] font-bold text-[#1F1F1D] tracking-[-0.006em]">Buat Kampanye</h1>
        </div>
        <div className="font-jakarta text-[14px] text-[#A3A39E] pl-[48px]">Kelola Kampanye &gt; Buat Kampanye</div>
      </div>

      {/* Stepper Header */}
      <div className="flex flex-col gap-2 items-center justify-center w-full max-w-[840px] mx-auto mb-16 select-none pb-8">
        <div className="flex items-center justify-between w-full">
          {steps.map((s, idx) => {
            const isCompleted = step > s.id;
            const isActive = step === s.id;
            return (
              <React.Fragment key={s.id}>
                {/* Step Node */}
                <div className="flex flex-col items-center relative">
                  {/* Circle */}
                  <div
                    className={`w-[44px] h-[44px] rounded-full border-2 flex items-center justify-center font-jakarta font-semibold text-[15px] transition-all duration-300 ${
                      isCompleted
                        ? 'bg-[#2F6B3F] border-[#2F6B3F] text-white'
                        : isActive
                          ? 'bg-transparent border-[#F7C85C] text-[#F7C85C]'
                          : 'bg-transparent border-[#E5E5E3] text-[#A3A39E]'
                    }`}
                  >
                    {isCompleted ? <Check className="w-5 h-5 stroke-[3]" /> : String(s.id).padStart(2, '0')}
                  </div>
                  {/* Label */}
                  <span
                    className={`absolute top-[52px] font-jakarta text-[13px] leading-tight transition-colors duration-300 text-center whitespace-nowrap ${
                      isActive || isCompleted ? 'font-semibold text-[#1F1F1D]' : 'font-normal text-[#A3A39E]'
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
                {/* Connector Line */}
                {idx < steps.length - 1 && (
                  <div className={`flex-1 h-[2px] mx-4 transition-colors duration-[400ms] ${step > s.id ? 'bg-[#2F6B3F]' : 'bg-[#E5E5E3]'}`} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Main Wizard Form Container */}
      <div className="w-full max-w-[1034px] bg-transparent pb-16 flex-1 flex flex-col justify-between">
        <div className="flex-1">
          {/* STEP 1: Data Rumah Ibadah */}
          {step === 1 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in-50 duration-200">
              {/* Form Fields Column */}
              <div className="lg:col-span-2 flex flex-col gap-6">
                <h3 className="font-outfit font-bold text-[20px] leading-[25px] text-[#1F1F1D] mb-2">Informasi Rumah Ibadah</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                  {/* Nama Rumah Ibadah */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-jakarta text-[14px] font-medium text-[#1F1F1D]">Nama Rumah Ibadah</label>
                    <input
                      type="text"
                      placeholder="Masukkan Nama Rumah Ibadah"
                      value={formValues.namaRumahIbadah}
                      onChange={(e) => setFormValues((prev) => ({ ...prev, namaRumahIbadah: e.target.value }))}
                      className={`w-full rounded-[12px] border bg-white h-[44px] px-4 text-[14px] text-[#1F1F1D] placeholder:text-[#A3A39E] focus:outline-none transition-colors ${
                        showErrors && !formValues.namaRumahIbadah.trim()
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-[#E5E5E3] focus:border-[#2F6B3F]'
                      }`}
                    />
                    {showErrors && !formValues.namaRumahIbadah.trim() && (
                      <span className="text-red-500 text-[12px] font-jakarta">Nama rumah ibadah harus diisi</span>
                    )}
                  </div>

                  {/* Agama */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-jakarta text-[14px] font-medium text-[#1F1F1D]">Agama</label>
                    <div className="relative">
                      <select
                        value={formValues.agama}
                        onChange={(e) => setFormValues((prev) => ({ ...prev, agama: e.target.value }))}
                        className={`w-full rounded-[12px] border bg-white h-[44px] px-4 pr-10 text-[14px] text-[#1F1F1D] focus:outline-none appearance-none transition-colors ${
                          showErrors && !formValues.agama ? 'border-red-500 focus:border-red-500' : 'border-[#E5E5E3] focus:border-[#2F6B3F]'
                        }`}
                      >
                        <option value="" disabled hidden>
                          Agama
                        </option>
                        <option value="Islam">Islam</option>
                        <option value="Kristen">Kristen</option>
                        <option value="Katolik">Katolik</option>
                        <option value="Hindu">Hindu</option>
                        <option value="Buddha">Buddha</option>
                        <option value="Konghucu">Konghucu</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A3A39E] pointer-events-none" />
                    </div>
                    {showErrors && !formValues.agama && <span className="text-red-500 text-[12px] font-jakarta">Agama harus dipilih</span>}
                  </div>

                  {/* Alamat Rumah Ibadah */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-jakarta text-[14px] font-medium text-[#1F1F1D]">Alamat Rumah Ibadah</label>
                    <textarea
                      placeholder="Masukkan Alamat Rumah Ibadah"
                      value={formValues.alamatRumahIbadah}
                      onChange={(e) => setFormValues((prev) => ({ ...prev, alamatRumahIbadah: e.target.value }))}
                      className={`w-full rounded-[12px] border bg-white p-4 text-[14px] text-[#1F1F1D] placeholder:text-[#A3A39E] focus:outline-none resize-none h-[120px] transition-colors ${
                        showErrors && !formValues.alamatRumahIbadah.trim()
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-[#E5E5E3] focus:border-[#2F6B3F]'
                      }`}
                    />
                    {showErrors && !formValues.alamatRumahIbadah.trim() && (
                      <span className="text-red-500 text-[12px] font-jakarta">Alamat rumah ibadah harus diisi</span>
                    )}
                  </div>

                  {/* Domisili & Contacts Column */}
                  <div className="flex flex-col gap-5">
                    {/* Domisili */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-jakarta text-[14px] font-medium text-[#1F1F1D]">Domisili</label>
                      <input
                        type="text"
                        placeholder="Cth. Jakarta"
                        value={formValues.domisili}
                        onChange={(e) => setFormValues((prev) => ({ ...prev, domisili: e.target.value }))}
                        className={`w-full rounded-[12px] border bg-white h-[44px] px-4 text-[14px] text-[#1F1F1D] placeholder:text-[#A3A39E] focus:outline-none transition-colors ${
                          showErrors && !formValues.domisili.trim()
                            ? 'border-red-500 focus:border-red-500'
                            : 'border-[#E5E5E3] focus:border-[#2F6B3F]'
                        }`}
                      />
                      {showErrors && !formValues.domisili.trim() && (
                        <span className="text-red-500 text-[12px] font-jakarta">Domisili harus diisi</span>
                      )}
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
                      value={formValues.namaNarahubung}
                      onChange={(e) => setFormValues((prev) => ({ ...prev, namaNarahubung: e.target.value }))}
                      className={`w-full rounded-[12px] border bg-white h-[44px] px-4 text-[14px] text-[#1F1F1D] placeholder:text-[#A3A39E] focus:outline-none transition-colors ${
                        showErrors && !formValues.namaNarahubung.trim()
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-[#E5E5E3] focus:border-[#2F6B3F]'
                      }`}
                    />
                    {showErrors && !formValues.namaNarahubung.trim() && (
                      <span className="text-red-500 text-[12px] font-jakarta">Nama narahubung harus diisi</span>
                    )}
                  </div>

                  {/* No. Telp Narahubung */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-jakarta text-[14px] font-medium text-[#1F1F1D]">No. Telp Narahubung</label>
                    <div
                      className={`flex items-center border rounded-[12px] bg-white px-4 h-[44px] transition-colors ${
                        showErrors && !formValues.noTelpNarahubung.trim()
                          ? 'border-red-500 focus-within:border-red-500'
                          : 'border-[#E5E5E3] focus-within:border-[#2F6B3F]'
                      }`}
                    >
                      <span className="text-[#5A5A57] text-[14px] font-normal mr-1.5 select-none">(+62)</span>
                      <input
                        type="text"
                        placeholder="Cth. 85924516288"
                        value={formValues.noTelpNarahubung}
                        onChange={handlePhoneChange}
                        className="bg-transparent border-none outline-none w-full text-[14px] text-[#1F1F1D] placeholder:text-[#A3A39E] h-full"
                      />
                    </div>
                    {showErrors && !formValues.noTelpNarahubung.trim() && (
                      <span className="text-red-500 text-[12px] font-jakarta">No. telp narahubung harus diisi</span>
                    )}
                  </div>
                </div>

                {/* Kondisi Saat Ini */}
                <div className="flex flex-col gap-1.5 relative">
                  <label className="font-jakarta text-[14px] font-medium text-[#1F1F1D]">Kondisi Saat Ini</label>
                  <div className="relative">
                    <textarea
                      placeholder="Deskripsikan Kondisi Rumah Ibadah"
                      value={formValues.kondisiSaatIni}
                      onChange={handleTextareaChange('kondisiSaatIni', 500)}
                      className={`w-full rounded-[12px] border bg-white p-4 pr-16 text-[14px] text-[#1F1F1D] placeholder:text-[#A3A39E] focus:outline-none resize-none h-[120px] transition-colors ${
                        showErrors && !formValues.kondisiSaatIni.trim()
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-[#E5E5E3] focus:border-[#2F6B3F]'
                      }`}
                    />
                    <span className="absolute top-3 right-4 font-jakarta text-[11px] text-[#A3A39E]">{formValues.kondisiSaatIni.length}/500</span>
                  </div>
                  {showErrors && !formValues.kondisiSaatIni.trim() && (
                    <span className="text-red-500 text-[12px] font-jakarta">Kondisi saat ini harus diisi</span>
                  )}
                </div>

                {/* Informasi Penanggung Jawab */}
                <div className="flex flex-col gap-1.5 relative">
                  <label className="font-jakarta text-[14px] font-medium text-[#1F1F1D]">Informasi Penanggung Jawab</label>
                  <div className="relative">
                    <textarea
                      placeholder="Masukkan Informasi Penanggung Jawab"
                      value={formValues.informasiPenanggungJawab}
                      onChange={handleTextareaChange('informasiPenanggungJawab', 250)}
                      className={`w-full rounded-[12px] border bg-white p-4 pr-16 text-[14px] text-[#1F1F1D] placeholder:text-[#A3A39E] focus:outline-none resize-none h-[88px] transition-colors ${
                        showErrors && !formValues.informasiPenanggungJawab.trim()
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-[#E5E5E3] focus:border-[#2F6B3F]'
                      }`}
                    />
                    <span className="absolute top-3 right-4 font-jakarta text-[11px] text-[#A3A39E]">
                      {formValues.informasiPenanggungJawab.length}/250
                    </span>
                  </div>
                  {showErrors && !formValues.informasiPenanggungJawab.trim() && (
                    <span className="text-red-500 text-[12px] font-jakarta">Informasi penanggung jawab harus diisi</span>
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
                      : showErrors
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
                {showErrors && !formValues.coverImage && <span className="text-red-500 text-[12px] font-jakarta">Gambar sampul harus diunggah</span>}

                <button
                  type="button"
                  onClick={triggerImageUpload}
                  className="w-full max-w-[340px] bg-[#2F6B3F] hover:bg-[#245330] text-white font-jakarta font-semibold text-[14px] h-[44px] rounded-full flex items-center justify-center transition-colors cursor-pointer shadow-sm"
                >
                  {formValues.coverImage ? 'Ganti' : 'Pilih Gambar'}
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Detail Kampanye */}
          {step === 2 && (
            <div className="flex flex-col gap-6 max-w-[700px] animate-in fade-in-50 duration-200">
              <h3 className="font-outfit font-bold text-[20px] leading-[25px] text-[#1F1F1D]">Detail Kampanye</h3>

              {/* Judul Kampanye */}
              <div className="flex flex-col gap-1.5">
                <label className="font-jakarta text-[14px] font-medium text-[#1F1F1D]">Judul Kampanye</label>
                <input
                  type="text"
                  placeholder="Masukkan Judul Kampanye"
                  value={formValues.judulKampanye}
                  onChange={(e) => setFormValues((prev) => ({ ...prev, judulKampanye: e.target.value }))}
                  className={`w-full rounded-[12px] border bg-white h-[44px] px-4 text-[14px] text-[#1F1F1D] placeholder:text-[#A3A39E] focus:outline-none transition-colors ${
                    showErrors && !formValues.judulKampanye.trim() ? 'border-red-500 focus:border-red-500' : 'border-[#E5E5E3] focus:border-[#2F6B3F]'
                  }`}
                />
                {showErrors && !formValues.judulKampanye.trim() && (
                  <span className="text-red-500 text-[12px] font-jakarta">Judul kampanye harus diisi</span>
                )}
              </div>

              {/* Target Dana & Batas Waktu Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Target Dana */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-jakarta text-[14px] font-medium text-[#1F1F1D]">Target Dana</label>
                  <div
                    className={`flex items-center border rounded-[12px] bg-white px-4 h-[44px] transition-colors ${
                      showErrors && !formValues.targetDana.trim()
                        ? 'border-red-500 focus-within:border-red-500'
                        : 'border-[#E5E5E3] focus-within:border-[#2F6B3F]'
                    }`}
                  >
                    <span className="text-[#5A5A57] text-[14px] font-semibold mr-1.5 select-none">Rp</span>
                    <input
                      type="text"
                      placeholder="Cth. 100.000.000"
                      value={formValues.targetDana}
                      onChange={handleTargetDanaChange}
                      className="bg-transparent border-none outline-none w-full text-[14px] text-[#1F1F1D] placeholder:text-[#A3A39E] h-full"
                    />
                  </div>
                  {showErrors && !formValues.targetDana.trim() && (
                    <span className="text-red-500 text-[12px] font-jakarta">Target dana harus diisi</span>
                  )}
                </div>

                {/* Batas Waktu */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-jakarta text-[14px] font-medium text-[#1F1F1D]">Batas Waktu</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      maxLength={2}
                      placeholder="DD"
                      value={formValues.batasWaktuDD}
                      onChange={handleBatasWaktuChange('batasWaktuDD', 2)}
                      className={`w-[52px] h-[44px] text-center border bg-white rounded-[12px] focus:outline-none text-[14px] text-[#1F1F1D] placeholder:text-[#A3A39E] transition-colors ${
                        showErrors &&
                        (!formValues.batasWaktuDD ||
                          isNaN(parseInt(formValues.batasWaktuDD)) ||
                          parseInt(formValues.batasWaktuDD) < 1 ||
                          parseInt(formValues.batasWaktuDD) > 31)
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-[#E5E5E3] focus:border-[#2F6B3F]'
                      }`}
                    />
                    <input
                      type="text"
                      maxLength={2}
                      placeholder="MM"
                      value={formValues.batasWaktuMM}
                      onChange={handleBatasWaktuChange('batasWaktuMM', 2)}
                      className={`w-[52px] h-[44px] text-center border bg-white rounded-[12px] focus:outline-none text-[14px] text-[#1F1F1D] placeholder:text-[#A3A39E] transition-colors ${
                        showErrors &&
                        (!formValues.batasWaktuMM ||
                          isNaN(parseInt(formValues.batasWaktuMM)) ||
                          parseInt(formValues.batasWaktuMM) < 1 ||
                          parseInt(formValues.batasWaktuMM) > 12)
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-[#E5E5E3] focus:border-[#2F6B3F]'
                      }`}
                    />
                    <input
                      type="text"
                      maxLength={4}
                      placeholder="YYYY"
                      value={formValues.batasWaktuYYYY}
                      onChange={handleBatasWaktuChange('batasWaktuYYYY', 4)}
                      className={`w-[78px] h-[44px] text-center border bg-white rounded-[12px] focus:outline-none text-[14px] text-[#1F1F1D] placeholder:text-[#A3A39E] transition-colors ${
                        showErrors &&
                        (!formValues.batasWaktuYYYY ||
                          isNaN(parseInt(formValues.batasWaktuYYYY)) ||
                          parseInt(formValues.batasWaktuYYYY) < 2026 ||
                          parseInt(formValues.batasWaktuYYYY) > 2100)
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-[#E5E5E3] focus:border-[#2F6B3F]'
                      }`}
                    />
                  </div>
                  {showErrors && getValidationErrors(2).batasWaktu && (
                    <span className="text-red-500 text-[12px] font-jakarta">{getValidationErrors(2).batasWaktu}</span>
                  )}
                </div>
              </div>

              {/* Deskripsi Kampanye */}
              <div className="flex flex-col gap-1.5 relative">
                <label className="font-jakarta text-[14px] font-medium text-[#1F1F1D]">Deskripsi Kampanye</label>
                <div className="relative">
                  <textarea
                    placeholder="Deskripsikan Kampanye"
                    value={formValues.deskripsiKampanye}
                    onChange={handleTextareaChange('deskripsiKampanye', 500)}
                    className={`w-full rounded-[12px] border bg-white p-4 pr-16 text-[14px] text-[#1F1F1D] placeholder:text-[#A3A39E] focus:outline-none resize-none h-[120px] transition-colors ${
                      showErrors && !formValues.deskripsiKampanye.trim()
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-[#E5E5E3] focus:border-[#2F6B3F]'
                    }`}
                  />
                  <span className="absolute top-3 right-4 font-jakarta text-[11px] text-[#A3A39E]">{formValues.deskripsiKampanye.length}/500</span>
                </div>
                {showErrors && !formValues.deskripsiKampanye.trim() && (
                  <span className="text-red-500 text-[12px] font-jakarta">Deskripsi kampanye harus diisi</span>
                )}
              </div>

              {/* Tujuan Penggunaan Dana */}
              <div className="flex flex-col gap-1.5 relative">
                <label className="font-jakarta text-[14px] font-medium text-[#1F1F1D]">Tujuan Penggunaan Dana</label>
                <div className="relative">
                  <textarea
                    placeholder="Deskripsikan Tujuan Penggunaan Dana"
                    value={formValues.tujuanPenggunaanDana}
                    onChange={handleTextareaChange('tujuanPenggunaanDana', 250)}
                    className={`w-full rounded-[12px] border bg-white p-4 pr-16 text-[14px] text-[#1F1F1D] placeholder:text-[#A3A39E] focus:outline-none resize-none h-[88px] transition-colors ${
                      showErrors && !formValues.tujuanPenggunaanDana.trim()
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-[#E5E5E3] focus:border-[#2F6B3F]'
                    }`}
                  />
                  <span className="absolute top-3 right-4 font-jakarta text-[11px] text-[#A3A39E]">{formValues.tujuanPenggunaanDana.length}/250</span>
                </div>
                {showErrors && !formValues.tujuanPenggunaanDana.trim() && (
                  <span className="text-red-500 text-[12px] font-jakarta">Tujuan penggunaan dana harus diisi</span>
                )}
              </div>
            </div>
          )}

          {/* STEP 3: Estimasi Dampak */}
          {step === 3 && (
            <div className="flex flex-col gap-6 max-w-[700px] animate-in fade-in-50 duration-200">
              <h3 className="font-outfit font-bold text-[20px] leading-[25px] text-[#1F1F1D]">Estimasi Dampak</h3>

              {/* Top row grid: Energi + Penerima */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Energi yang Dihasilkan */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-jakarta text-[14px] font-medium text-[#1F1F1D]">Energi yang Dihasilkan</label>
                  <div className="flex items-center gap-3 mt-1">
                    <input
                      type="text"
                      placeholder="50"
                      value={formValues.energiDihasilkan}
                      onChange={handleNumericInputChange('energiDihasilkan')}
                      className={`w-[88px] h-[44px] rounded-[12px] border bg-white px-3 text-center text-[14px] text-[#1F1F1D] placeholder:text-[#A3A39E] focus:outline-none transition-colors ${
                        showErrors && !formValues.energiDihasilkan.trim()
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-[#E5E5E3] focus:border-[#2F6B3F]'
                      }`}
                    />
                    <span className="font-jakarta text-[14px] text-[#5A5A57]">Kwh/Bulan</span>
                  </div>
                  {showErrors && !formValues.energiDihasilkan.trim() && (
                    <span className="text-red-500 text-[12px] font-jakarta">Energi yang dihasilkan harus diisi</span>
                  )}
                </div>

                {/* Jumlah Penerima Manfaat */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-jakarta text-[14px] font-medium text-[#1F1F1D]">Jumlah Penerima Manfaat</label>
                  <div className="flex items-center gap-3 mt-1">
                    <input
                      type="text"
                      placeholder="150"
                      value={formValues.jumlahPenerima}
                      onChange={handleNumericInputChange('jumlahPenerima')}
                      className={`w-[88px] h-[44px] rounded-[12px] border bg-white px-3 text-center text-[14px] text-[#1F1F1D] placeholder:text-[#A3A39E] focus:outline-none transition-colors ${
                        showErrors && !formValues.jumlahPenerima.trim()
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-[#E5E5E3] focus:border-[#2F6B3F]'
                      }`}
                    />
                    <span className="font-jakarta text-[14px] text-[#5A5A57]">Jemaat</span>
                  </div>
                  {showErrors && !formValues.jumlahPenerima.trim() && (
                    <span className="text-red-500 text-[12px] font-jakarta">Jumlah penerima manfaat harus diisi</span>
                  )}
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
                      placeholder="50"
                      value={formValues.penurunanEmisi}
                      onChange={handleNumericInputChange('penurunanEmisi')}
                      className={`w-[88px] h-[44px] rounded-[12px] border bg-white px-3 text-center text-[14px] text-[#1F1F1D] placeholder:text-[#A3A39E] focus:outline-none transition-colors ${
                        showErrors && !formValues.penurunanEmisi.trim()
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-[#E5E5E3] focus:border-[#2F6B3F]'
                      }`}
                    />
                    <span className="font-jakarta text-[14px] text-[#5A5A57]">Kg CO2/Bulan</span>
                  </div>
                  {showErrors && !formValues.penurunanEmisi.trim() && (
                    <span className="text-red-500 text-[12px] font-jakarta">Penurunan emisi karbon harus diisi</span>
                  )}
                </div>

                {/* Penghematan Biaya Listrik */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-jakarta text-[14px] font-medium text-[#1F1F1D]">Penghematan Biaya Listrik</label>
                  <div className="flex items-center gap-3 mt-1">
                    <div
                      className={`flex items-center border rounded-[12px] bg-white px-3 h-[44px] w-[180px] transition-colors ${
                        showErrors && !formValues.penghematanBiaya.trim()
                          ? 'border-red-500 focus-within:border-red-500'
                          : 'border-[#E5E5E3] focus-within:border-[#2F6B3F]'
                      }`}
                    >
                      <span className="text-[#5A5A57] text-[14px] font-normal mr-1.5 select-none">Rp</span>
                      <input
                        type="text"
                        placeholder="100.000"
                        value={formValues.penghematanBiaya}
                        onChange={handlePenghematanChange}
                        className="bg-transparent border-none outline-none w-full text-[14px] text-[#1F1F1D] placeholder:text-[#A3A39E] h-full"
                      />
                    </div>
                    <span className="font-jakarta text-[14px] text-[#5A5A57]">/Bulan</span>
                  </div>
                  {showErrors && !formValues.penghematanBiaya.trim() && (
                    <span className="text-red-500 text-[12px] font-jakarta">Penghematan biaya listrik harus diisi</span>
                  )}
                </div>
              </div>

              {/* Deskripsi Dampak */}
              <div className="flex flex-col gap-1.5 relative">
                <label className="font-jakarta text-[14px] font-medium text-[#1F1F1D]">Deskripsi Dampak</label>
                <div className="relative">
                  <textarea
                    placeholder="Deskripsikan Dampak yang Akan Dicapai"
                    value={formValues.deskripsiDampak}
                    onChange={handleTextareaChange('deskripsiDampak', 500)}
                    className={`w-full rounded-[12px] border bg-white p-4 pr-16 text-[14px] text-[#1F1F1D] placeholder:text-[#A3A39E] focus:outline-none resize-none h-[120px] transition-colors ${
                      showErrors && !formValues.deskripsiDampak.trim()
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-[#E5E5E3] focus:border-[#2F6B3F]'
                    }`}
                  />
                  <span className="absolute top-3 right-4 font-jakarta text-[11px] text-[#A3A39E]">{formValues.deskripsiDampak.length}/500</span>
                </div>
                {showErrors && !formValues.deskripsiDampak.trim() && (
                  <span className="text-red-500 text-[12px] font-jakarta">Deskripsi dampak harus diisi</span>
                )}
              </div>
            </div>
          )}

          {/* STEP 4: Tinjauan (High-Fidelity Review) */}
          {step === 4 && (
            <div className="flex flex-col gap-8 max-w-[1034px] animate-in fade-in-50 duration-200">
              {/* Card 1: Informasi Rumah Ibadah */}
              <div className="bg-white border border-[#E5E5E3] rounded-[24px] p-8 shadow-sm flex flex-col gap-6 relative">
                <div className="flex items-center justify-between border-b border-[#E5E5E3] pb-3">
                  <h3 className="font-outfit font-bold text-[20px] leading-[25px] text-[#1F1F1D]">Informasi Rumah Ibadah</h3>
                  <button
                    type="button"
                    onClick={() => {
                      setStep(1);
                      setShowErrors(false);
                    }}
                    className="flex items-center gap-1.5 border border-[#2F6B3F] hover:bg-[#2F6B3F]/5 text-[#2F6B3F] font-jakarta font-medium text-[13px] px-3.5 py-1.5 rounded-full cursor-pointer transition-colors"
                  >
                    <span>Edit</span>
                    <Pencil className="w-3.5 h-3.5 text-[#2F6B3F]" />
                  </button>
                </div>

                <div className="flex flex-col gap-5 w-full">
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

                    {/* Agama */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-jakarta text-[14px] font-medium text-[#1F1F1D]">Agama</label>
                      <div className="relative">
                        <select
                          disabled
                          value={formValues.agama}
                          className="w-full rounded-[12px] border border-[#E5E5E3] bg-[#FAF9F6]/60 h-[44px] px-4 pr-10 text-[14px] text-[#5A5A57] appearance-none cursor-not-allowed"
                        >
                          <option value={formValues.agama}>{formValues.agama}</option>
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
                      <span className="absolute top-3 right-4 font-jakarta text-[11px] text-[#A3A39E]">
                        {formValues.informasiPenanggungJawab.length}/250
                      </span>
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
                    onClick={() => {
                      setStep(2);
                      setShowErrors(false);
                    }}
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
                        <span className="absolute top-3 right-4 font-jakarta text-[11px] text-[#A3A39E]">
                          {formValues.deskripsiKampanye.length}/500
                        </span>
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
                        <span className="absolute top-3 right-4 font-jakarta text-[11px] text-[#A3A39E]">
                          {formValues.tujuanPenggunaanDana.length}/250
                        </span>
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
                    onClick={() => {
                      setStep(3);
                      setShowErrors(false);
                    }}
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
                        <span className="font-jakarta text-[14px] text-[#5A5A57]">Kwh/Bulan</span>
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
          )}
        </div>

        {/* Wizard Bottom Buttons Navigation */}
        <div className="flex justify-between items-center mt-12 pt-6 border-t border-[#E5E5E3]/80">
          {/* Button Sebelumnya */}
          <button
            type="button"
            onClick={handlePrev}
            disabled={step === 1}
            className={`font-jakarta font-semibold text-[14px] px-[24px] py-[12px] rounded-full flex items-center gap-[8px] transition-all duration-200 h-[44px] ${
              step === 1
                ? 'border border-[#E5E5E3] text-[#A3A39E] cursor-not-allowed'
                : 'border border-[#2F6B3F] text-[#2F6B3F] hover:bg-[#2F6B3F]/10 cursor-pointer active:scale-[0.98]'
            }`}
          >
            &larr; Sebelumnya
          </button>

          {/* Button Selanjutnya / Buat Kampanye */}
          {step < 4 ? (
            <button
              type="button"
              onClick={handleNext}
              className={`font-jakarta font-semibold text-[14px] px-[24px] py-[12px] rounded-full flex items-center gap-[8px] transition-all duration-200 h-[44px] cursor-pointer active:scale-[0.98] ${
                !isStepValid(step) ? 'bg-[#E5E5E3] text-[#A3A39E] hover:bg-[#D6D6D3]' : 'bg-[#2F6B3F] hover:bg-[#245330] text-white shadow-sm'
              }`}
            >
              Selanjutnya &rarr;
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-[#2F6B3F] hover:bg-[#245330] text-white font-jakarta font-semibold text-[14px] px-[28px] py-[12px] rounded-full flex items-center gap-[8px] transition-colors cursor-pointer h-[44px] shadow-sm active:scale-[0.98]"
            >
              Buat Kampanye
            </button>
          )}
        </div>
      </div>

      {/* Success Modal Overlay */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-[#0C111D]/45 backdrop-blur-[5px] z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-b from-[#E7F6EC] via-white to-white rounded-[36px] p-10 md:p-12 max-w-[480px] w-full flex flex-col items-center text-center shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-white/60 animate-in fade-in zoom-in-95 duration-200">
            {/* Concentric Green Rings for Success Checkmark */}
            <div className="w-[140px] h-[140px] rounded-full bg-[#EBF3ED]/80 flex items-center justify-center mb-7">
              <div className="w-[100px] h-[100px] rounded-full bg-[#CFE3D5] flex items-center justify-center">
                <div className="w-[72px] h-[72px] rounded-full bg-[#2F6B3F] flex items-center justify-center shadow-[0_4px_12px_rgba(47,107,63,0.3)]">
                  <Check className="w-8 h-8 text-white stroke-[3.5]" />
                </div>
              </div>
            </div>

            {/* Heading */}
            <h2 className="font-outfit font-bold text-[26px] leading-[33px] text-[#1F1F1D] mb-3">Kampanye Berhasil Dibuat!</h2>

            {/* Description */}
            <p className="font-jakarta text-[15px] leading-[22px] text-[#5A5A57] max-w-[340px] mb-8">
              Kampanye berhasil dibuat dan siap untuk ditinjau lebih lanjut pada menu Kelola Kampanye.
            </p>

            {/* Action Button */}
            <button
              type="button"
              onClick={() => {
                setShowSuccessModal(false);
                navigate('/admin/campaigns');
              }}
              className="bg-[#2F6B3F] hover:bg-[#204E2D] text-white font-jakarta font-semibold text-[15px] h-[48px] px-14 rounded-full transition-all duration-200 cursor-pointer shadow-[0_4px_14px_rgba(47,107,63,0.35)] active:scale-[0.98]"
            >
              Selesai
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateCampaignPage;
