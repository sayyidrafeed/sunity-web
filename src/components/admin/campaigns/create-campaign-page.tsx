import { useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

import { useCampaignForm } from '@/hooks/useCampaignForm';
import { useCampaignMutation } from '@/hooks/useCampaignMutation';

import { CampaignStepper } from './common/CampaignStepper';
import { SuccessModal } from './common/SuccessModal';

import { Step1WorshipPlaceInfo } from './steps/Step1WorshipPlaceInfo';
import { Step2CampaignDetails } from './steps/Step2CampaignDetails';
import { Step3ImpactEstimate } from './steps/Step3ImpactEstimate';
import { Step4Review } from './steps/Step4Review';

export function CreateCampaignPage() {
  const navigate = useNavigate();
  const campaignMutation = useCampaignMutation();

  const {
    step,
    setStep,
    formValues,
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
  } = useCampaignForm();

  const handleSubmit = async () => {
    try {
      await campaignMutation.mutateAsync(formValues);
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : 'Gagal membuat kampanye. Silakan coba lagi.';
      toast.error(errMsg);
    }
  };

  const isPending = campaignMutation.isPending;
  const isSuccess = campaignMutation.isSuccess;

  return (
    <div className="flex flex-col p-12 gap-10 bg-[#FAF9F6] min-h-screen relative font-jakarta text-[#1F1F1D]">
      {/* Header and Breadcrumbs */}
      <div className="flex flex-col gap-[8px]">
        <div className="flex items-center gap-[16px]">
          <button
            type="button"
            onClick={() => navigate('/admin/campaigns')}
            disabled={isPending}
            className="p-2 hover:bg-white rounded-full border border-transparent hover:border-[#E5E5E3] transition-colors cursor-pointer text-[#1F1F1D] disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Kembali ke Kelola Kampanye"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="font-outfit text-[32px] font-bold text-[#1F1F1D] tracking-[-0.006em]">Buat Kampanye</h1>
        </div>
        <div className="font-jakarta text-[14px] text-[#A3A39E] pl-[48px]">Kelola Kampanye &gt; Buat Kampanye</div>
      </div>

      {/* Stepper Header */}
      <CampaignStepper currentStep={step} />

      {/* Main Wizard Form Container */}
      <div className="w-full max-w-[1034px] bg-transparent pb-16 flex-1 flex flex-col justify-between">
        <div className="flex-1">
          {step === 1 && (
            <Step1WorshipPlaceInfo
              formValues={formValues}
              errors={errors}
              showErrors={showErrors}
              onFieldChange={handleFieldChange}
              onPhoneChange={handlePhoneChange}
              onTextareaChange={handleTextareaChange}
              onSelectWorshipPlace={handleSelectWorshipPlace}
              onClearWorshipPlace={handleClearWorshipPlace}
            />
          )}

          {step === 2 && (
            <Step2CampaignDetails
              formValues={formValues}
              errors={errors}
              showErrors={showErrors}
              onFieldChange={handleFieldChange}
              onTargetDanaChange={handleTargetDanaChange}
              onBatasWaktuChange={handleBatasWaktuChange}
              onTextareaChange={handleTextareaChange}
            />
          )}

          {step === 3 && (
            <Step3ImpactEstimate
              formValues={formValues}
              errors={errors}
              showErrors={showErrors}
              onNumericInputChange={handleNumericInputChange}
              onPenghematanChange={handlePenghematanChange}
              onTextareaChange={handleTextareaChange}
            />
          )}

          {step === 4 && <Step4Review formValues={formValues} setStep={setStep} setShowErrors={setShowErrors} />}
        </div>

        {/* Wizard Bottom Buttons Navigation */}
        <div className="flex justify-between items-center mt-12 pt-6 border-t border-[#E5E5E3]/80">
          {/* Button Sebelumnya */}
          <button
            type="button"
            onClick={handlePrev}
            disabled={step === 1 || isPending}
            className={`font-jakarta font-semibold text-[14px] px-[24px] py-[12px] rounded-full flex items-center gap-[8px] transition-all duration-200 h-[44px] ${
              step === 1 || isPending
                ? 'border border-[#E5E5E3] text-[#A3A39E] cursor-not-allowed opacity-50'
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
              disabled={isPending}
              className={`font-jakarta font-semibold text-[14px] px-[24px] py-[12px] rounded-full flex items-center gap-[8px] transition-all duration-200 h-[44px] cursor-pointer active:scale-[0.98] ${
                !currentStepIsValid ? 'bg-[#E5E5E3] text-[#A3A39E] hover:bg-[#D6D6D3]' : 'bg-[#2F6B3F] hover:bg-[#245330] text-white shadow-sm'
              }`}
            >
              Selanjutnya &rarr;
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isPending}
              className="bg-[#2F6B3F] hover:bg-[#245330] text-white font-jakarta font-semibold text-[14px] px-[28px] py-[12px] rounded-full flex items-center justify-center gap-[8px] transition-colors cursor-pointer h-[44px] shadow-sm active:scale-[0.98] disabled:bg-[#E5E5E3] disabled:text-[#A3A39E] disabled:cursor-not-allowed"
            >
              {isPending ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-[#A3A39E] mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Memproses...
                </>
              ) : (
                'Buat Kampanye'
              )}
            </button>
          )}
        </div>
      </div>

      {/* Success Modal Overlay */}
      <SuccessModal
        isOpen={isSuccess}
        onClose={() => {
          resetForm();
          navigate('/admin/campaigns');
        }}
      />
    </div>
  );
}

export default CreateCampaignPage;
