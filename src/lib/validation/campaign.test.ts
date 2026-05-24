import { describe, it, expect } from 'vitest';
import type { FormValues } from './campaign';
import { INITIAL_FORM_VALUES, validateStep1, validateStep2, validateStep3 } from './campaign';

describe('Campaign Validation', () => {
  describe('validateStep1', () => {
    it('should fail validation with empty form values', () => {
      const errors = validateStep1(INITIAL_FORM_VALUES);
      expect(errors.namaRumahIbadah).toBeDefined();
      expect(errors.agama).toBeDefined();
      expect(errors.alamatRumahIbadah).toBeDefined();
      expect(errors.domisili).toBeDefined();
      expect(errors.namaNarahubung).toBeDefined();
      expect(errors.noTelpNarahubung).toBeDefined();
      expect(errors.kondisiSaatIni).toBeDefined();
      expect(errors.informasiPenanggungJawab).toBeDefined();
      expect(errors.coverImage).toBeDefined();
    });

    it('should pass validation if selectedWorshipPlaceId is present and coverImage is uploaded', () => {
      const values: FormValues = {
        ...INITIAL_FORM_VALUES,
        selectedWorshipPlaceId: 'some-uuid',
        coverImage: 'data:image/png;base64,...',
      };
      const errors = validateStep1(values);
      expect(Object.keys(errors).length).toBe(0);
    });

    it('should validate phone numbers correctly', () => {
      const values: FormValues = {
        ...INITIAL_FORM_VALUES,
        namaRumahIbadah: 'Masjid Agung',
        agama: 'Masjid',
        alamatRumahIbadah: 'Jl. Merdeka',
        domisili: 'Jakarta',
        namaNarahubung: 'Budi',
        noTelpNarahubung: '1234', // too short
        kondisiSaatIni: 'Baik',
        informasiPenanggungJawab: 'Yayasan',
        coverImage: 'data:image/png;base64,...',
      };

      let errors = validateStep1(values);
      expect(errors.noTelpNarahubung).toBeDefined();

      values.noTelpNarahubung = '81234567890'; // valid
      errors = validateStep1(values);
      expect(errors.noTelpNarahubung).toBeUndefined();
    });
  });

  describe('validateStep2', () => {
    const currentYear = new Date().getFullYear().toString();
    const validValues: FormValues = {
      ...INITIAL_FORM_VALUES,
      judulKampanye: 'Kampanye Keren',
      targetDana: '100.000.000',
      panelCapacityKwp: '5.5',
      batasWaktuDD: '25',
      batasWaktuMM: '12',
      batasWaktuYYYY: currentYear,
      deskripsiKampanye: 'Deskripsi panjang...',
      tujuanPenggunaanDana: 'Untuk membeli panel surya',
    };

    it('should pass validation with valid values', () => {
      const errors = validateStep2(validValues);
      expect(Object.keys(errors).length).toBe(0);
    });

    it('should fail validation with invalid dates', () => {
      const values = {
        ...validValues,
        batasWaktuDD: '32',
      };
      const errors = validateStep2(values);
      expect(errors.batasWaktu).toBeDefined();
    });

    it('should fail validation with invalid panel capacities', () => {
      const values = {
        ...validValues,
        panelCapacityKwp: '-2.5',
      };
      const errors = validateStep2(values);
      expect(errors.panelCapacityKwp).toBeDefined();
    });
  });

  describe('validateStep3', () => {
    const validValues: FormValues = {
      ...INITIAL_FORM_VALUES,
      energiDihasilkan: '120',
      jumlahPenerima: '350',
      penurunanEmisi: '78.5',
      penghematanBiaya: '5.000.000',
      deskripsiDampak: 'Dampak nyata...',
    };

    it('should pass validation with valid values', () => {
      const errors = validateStep3(validValues);
      expect(Object.keys(errors).length).toBe(0);
    });

    it('should fail validation if numbers are invalid', () => {
      const values = {
        ...validValues,
        energiDihasilkan: '-10',
      };
      const errors = validateStep3(values);
      expect(errors.energiDihasilkan).toBeDefined();
    });
  });
});
