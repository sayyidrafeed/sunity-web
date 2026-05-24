/* eslint-disable max-lines */
export interface FormValues {
  // Step 1: Rumah Ibadah
  selectedWorshipPlaceId?: string;
  namaRumahIbadah: string;
  agama: 'Masjid' | 'Mushalla' | 'Gereja' | 'Pura' | 'Vihara' | 'Klenteng' | '';
  alamatRumahIbadah: string;
  domisili: string;
  namaNarahubung: string;
  noTelpNarahubung: string;
  kondisiSaatIni: string;
  informasiPenanggungJawab: string;
  coverImage: string; // Base64 string for preview
  coverImageFile: File | null; // File object for R2 upload

  // Step 2: Detail Kampanye
  judulKampanye: string;
  targetDana: string; // formatted IDR string
  batasWaktuDD: string;
  batasWaktuMM: string;
  batasWaktuYYYY: string;
  deskripsiKampanye: string;
  tujuanPenggunaanDana: string;
  panelCapacityKwp: string; // kWp solar panel capacity

  // Step 3: Estimasi Dampak
  energiDihasilkan: string;
  jumlahPenerima: string;
  penurunanEmisi: string;
  penghematanBiaya: string; // formatted IDR string
  deskripsiDampak: string;
}

export const INITIAL_FORM_VALUES: FormValues = {
  namaRumahIbadah: '',
  agama: '',
  alamatRumahIbadah: '',
  domisili: '',
  namaNarahubung: '',
  noTelpNarahubung: '',
  kondisiSaatIni: '',
  informasiPenanggungJawab: '',
  coverImage: '',
  coverImageFile: null,

  judulKampanye: '',
  targetDana: '',
  batasWaktuDD: '',
  batasWaktuMM: '',
  batasWaktuYYYY: '',
  deskripsiKampanye: '',
  tujuanPenggunaanDana: '',
  panelCapacityKwp: '',

  energiDihasilkan: '',
  jumlahPenerima: '',
  penurunanEmisi: '',
  penghematanBiaya: '',
  deskripsiDampak: '',
};

export function validateStep1(values: FormValues): Record<string, string> {
  const errors: Record<string, string> = {};

  // If a worship place is already selected, we don't validate Step 1 fields,
  // but we still require the cover image for the campaign.
  if (values.selectedWorshipPlaceId) {
    if (!values.coverImage) {
      errors.coverImage = 'Gambar sampul harus diunggah';
    }
    return errors;
  }

  if (!values.namaRumahIbadah.trim()) {
    errors.namaRumahIbadah = 'Nama rumah ibadah harus diisi';
  } else if (values.namaRumahIbadah.length > 200) {
    errors.namaRumahIbadah = 'Nama rumah ibadah maksimal 200 karakter';
  }

  if (!values.agama) {
    errors.agama = 'Tipe rumah ibadah harus dipilih';
  }

  if (!values.alamatRumahIbadah.trim()) {
    errors.alamatRumahIbadah = 'Alamat rumah ibadah harus diisi';
  } else if (values.alamatRumahIbadah.length > 500) {
    errors.alamatRumahIbadah = 'Alamat rumah ibadah maksimal 500 karakter';
  }

  if (!values.domisili.trim()) {
    errors.domisili = 'Domisili harus diisi';
  }

  if (!values.namaNarahubung.trim()) {
    errors.namaNarahubung = 'Nama narahubung harus diisi';
  }

  const phone = values.noTelpNarahubung.trim();
  if (!phone) {
    errors.noTelpNarahubung = 'No. telp narahubung harus diisi';
  } else {
    // Check regex format with prefix (+62)
    const fullPhone = `+62${phone}`;
    if (!/^\+62\d{8,13}$/.test(fullPhone)) {
      errors.noTelpNarahubung = 'No. telp narahubung tidak valid (8-13 digit)';
    }
  }

  if (!values.kondisiSaatIni.trim()) {
    errors.kondisiSaatIni = 'Kondisi saat ini harus diisi';
  } else if (values.kondisiSaatIni.length > 500) {
    errors.kondisiSaatIni = 'Kondisi saat ini maksimal 500 karakter';
  }

  if (!values.informasiPenanggungJawab.trim()) {
    errors.informasiPenanggungJawab = 'Informasi penanggung jawab harus diisi';
  } else if (values.informasiPenanggungJawab.length > 250) {
    errors.informasiPenanggungJawab = 'Informasi penanggung jawab maksimal 250 karakter';
  }

  if (!values.coverImage) {
    errors.coverImage = 'Gambar sampul harus diunggah';
  }

  return errors;
}

export function validateStep2(values: FormValues): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!values.judulKampanye.trim()) {
    errors.judulKampanye = 'Judul kampanye harus diisi';
  } else if (values.judulKampanye.length > 200) {
    errors.judulKampanye = 'Judul kampanye maksimal 200 karakter';
  }

  const cleanTarget = values.targetDana.replace(/\./g, '');
  if (!values.targetDana.trim()) {
    errors.targetDana = 'Target dana harus diisi';
  } else {
    const targetVal = Number(cleanTarget);
    if (isNaN(targetVal) || targetVal <= 100000) {
      errors.targetDana = 'Target dana harus lebih dari Rp 100.000';
    } else if (targetVal > 100000000000) {
      errors.targetDana = 'Target dana maksimal Rp 100.000.000.000';
    }
  }

  if (!values.panelCapacityKwp.trim()) {
    errors.panelCapacityKwp = 'Kapasitas panel surya (kWp) harus diisi';
  } else {
    const kwpVal = parseFloat(values.panelCapacityKwp.replace(/,/g, '.'));
    if (isNaN(kwpVal) || kwpVal <= 0) {
      errors.panelCapacityKwp = 'Kapasitas panel surya harus berupa angka positif';
    }
  }

  const dd = parseInt(values.batasWaktuDD);
  const mm = parseInt(values.batasWaktuMM);
  const yyyy = parseInt(values.batasWaktuYYYY);

  const currentYear = new Date().getFullYear();

  if (!values.batasWaktuDD || isNaN(dd) || dd < 1 || dd > 31) {
    errors.batasWaktu = 'Hari (DD) harus antara 01 - 31';
  } else if (!values.batasWaktuMM || isNaN(mm) || mm < 1 || mm > 12) {
    errors.batasWaktu = 'Bulan (MM) harus antara 01 - 12';
  } else if (!values.batasWaktuYYYY || isNaN(yyyy) || yyyy < currentYear || yyyy > 2100) {
    errors.batasWaktu = `Tahun (YYYY) harus antara ${currentYear} - 2100`;
  } else {
    // Check if valid date
    const date = new Date(yyyy, mm - 1, dd);
    if (date.getFullYear() !== yyyy || date.getMonth() !== mm - 1 || date.getDate() !== dd) {
      errors.batasWaktu = 'Batas waktu tidak valid';
    }
  }

  if (!values.deskripsiKampanye.trim()) {
    errors.deskripsiKampanye = 'Deskripsi kampanye harus diisi';
  } else if (values.deskripsiKampanye.length > 5000) {
    errors.deskripsiKampanye = 'Deskripsi kampanye maksimal 5000 karakter';
  }

  if (!values.tujuanPenggunaanDana.trim()) {
    errors.tujuanPenggunaanDana = 'Tujuan penggunaan dana harus diisi';
  }

  return errors;
}

export function validateStep3(values: FormValues): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!values.energiDihasilkan.trim()) {
    errors.energiDihasilkan = 'Energi yang dihasilkan harus diisi';
  } else {
    const kwh = parseFloat(values.energiDihasilkan);
    if (isNaN(kwh) || kwh < 0) {
      errors.energiDihasilkan = 'Energi yang dihasilkan harus bernilai 0 atau lebih';
    }
  }

  if (!values.jumlahPenerima.trim()) {
    errors.jumlahPenerima = 'Jumlah penerima manfaat harus diisi';
  } else {
    const beneficiaries = parseInt(values.jumlahPenerima);
    if (isNaN(beneficiaries) || beneficiaries <= 0) {
      errors.jumlahPenerima = 'Jumlah penerima manfaat harus lebih dari 0';
    }
  }

  if (!values.penurunanEmisi.trim()) {
    errors.penurunanEmisi = 'Penurunan emisi karbon harus diisi';
  } else {
    const co2 = parseFloat(values.penurunanEmisi);
    if (isNaN(co2) || co2 < 0) {
      errors.penurunanEmisi = 'Penurunan emisi harus bernilai 0 or lebih';
    }
  }

  const cleanSavings = values.penghematanBiaya.replace(/\./g, '');
  if (!values.penghematanBiaya.trim()) {
    errors.penghematanBiaya = 'Penghematan biaya listrik harus diisi';
  } else {
    const savings = Number(cleanSavings);
    if (isNaN(savings) || savings < 0) {
      errors.penghematanBiaya = 'Penghematan biaya harus bernilai 0 atau lebih';
    }
  }

  if (!values.deskripsiDampak.trim()) {
    errors.deskripsiDampak = 'Deskripsi dampak harus diisi';
  }

  return errors;
}
