import React, { useState, useMemo } from 'react';
import { toast } from 'sonner';
import type { FormValues } from '@/lib/validation/campaign';
import { INITIAL_FORM_VALUES, validateStep1, validateStep2, validateStep3 } from '@/lib/validation/campaign';
import type { WorshipPlace } from '@/lib/api/generated/types.gen';

export function useCampaignForm() {
  const [step, setStep] = useState(1);
  const [formValues, setFormValues] = useState<FormValues>(INITIAL_FORM_VALUES);
  const [showErrors, setShowErrors] = useState(false);

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

  const handleFieldChange = <K extends keyof FormValues>(field: K, value: FormValues[K]) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSelectWorshipPlace = (worshipPlace: WorshipPlace) => {
    // Map religionType from worshipPlace (it must match our enum)
    const rawReligion = worshipPlace.religionType;
    const mappedReligion = ['Masjid', 'Mushalla', 'Gereja', 'Pura', 'Vihara', 'Klenteng'].includes(rawReligion)
      ? (rawReligion as FormValues['agama'])
      : '';

    // Strip (+62) from contactPhone if present
    const rawPhone = worshipPlace.contactPhone || '';
    const cleanPhone = rawPhone.replace(/^\+62/, '').replace(/^0/, '');

    setFormValues((prev) => ({
      ...prev,
      selectedWorshipPlaceId: worshipPlace.id,
      namaRumahIbadah: worshipPlace.name,
      agama: mappedReligion,
      alamatRumahIbadah: worshipPlace.address,
      domisili: worshipPlace.city,
      namaNarahubung: worshipPlace.contactPerson || '',
      noTelpNarahubung: cleanPhone,
      kondisiSaatIni: worshipPlace.currentCondition || '',
      informasiPenanggungJawab: worshipPlace.personInCharge || '',
    }));
  };

  const handleClearWorshipPlace = () => {
    setFormValues((prev) => ({
      ...prev,
      selectedWorshipPlaceId: undefined,
      namaRumahIbadah: '',
      agama: '',
      alamatRumahIbadah: '',
      domisili: '',
      namaNarahubung: '',
      noTelpNarahubung: '',
      kondisiSaatIni: '',
      informasiPenanggungJawab: '',
    }));
  };

  // Compute validation errors based on current step
  const errors = useMemo(() => {
    if (step === 1) return validateStep1(formValues);
    if (step === 2) return validateStep2(formValues);
    if (step === 3) return validateStep3(formValues);
    return {};
  }, [step, formValues]);

  const currentStepIsValid = useMemo(() => {
    return Object.keys(errors).length === 0;
  }, [errors]);

  const handleNext = () => {
    if (currentStepIsValid) {
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

  const resetForm = () => {
    setStep(1);
    setFormValues(INITIAL_FORM_VALUES);
    setShowErrors(false);
  };

  return {
    step,
    setStep,
    formValues,
    setFormValues,
    showErrors,
    setShowErrors,
    errors,
    currentStepIsValid,
    handleFieldChange,
    handlePhoneChange,
    handleTargetDanaChange,
    handlePenghematanChange,
    handleBatasWaktuChange,
    handleTextareaChange,
    handleNumericInputChange,
    handleSelectWorshipPlace,
    handleClearWorshipPlace,
    handleNext,
    handlePrev,
    resetForm,
  };
}
