import { useState, useEffect, useCallback } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent } from '@/components/ui/card';
import { donationStepOneSchema, type DonationStepOneInput } from '@/types/donation';
import { NominalStep } from './nominal-step';
import { IdentityStep } from './identity-step';
import { PaymentSummaryStep } from './payment-summary-step';
import { StepIndicator, StepConnector } from './stepper';
import { STEPS } from './utils';
import { type StepState } from './types';

interface Campaign {
  id: string;
  title: string;
  images?: {
    cover?: {
      publicUrl: string;
    };
  };
  raisedIdr: number;
  targetIdr: number;
  progressPercent: number;
  donorCount: number;
  deadline: string;
  worshipPlace: {
    name: string;
  };
}

interface DonationFormProps {
  campaign: Campaign;
}

export function DonationForm(_props: DonationFormProps) {
  // State management
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);

  // Form setup
  const methods = useForm<DonationStepOneInput>({
    resolver: zodResolver(donationStepOneSchema),
    mode: 'onChange',
    defaultValues: {
      nominal: 0,
      name: '',
      email: '',
      hideName: false,
    },
  });

  const { trigger, watch, handleSubmit } = methods;
  const watchNominal = watch('nominal');

  // Validation state
  const isNominalValid = watchNominal >= 10000;

  // ── Auto transition from Step 1 to Step 2 ──────────────────────────────────
  // When nominal is valid, auto-advance to step 2
  // When nominal becomes invalid and we're past step 1, go back to step 1
  useEffect(() => {
    if (isNominalValid) {
      if (activeStep === 1) {
        setActiveStep(2);
      }
    } else {
      // If nominal becomes invalid (< 10000), drop back to step 1 (only if not already there)
      if (activeStep !== 1) {
        setActiveStep(1);
      }
    }
  }, [watchNominal, isNominalValid, activeStep]);

  // Derive stepper indicator states
  const step1State: StepState = isNominalValid ? 'done' : 'active';
  const step2State: StepState = activeStep === 3 ? 'done' : isNominalValid ? 'active' : 'pending';
  const step3State: StepState = activeStep === 3 ? 'active' : 'pending';

  // ── Stepper Navigation ───────────────────────────────────────────────────────
  const handleStepClick = useCallback(
    (stepIndex: 1 | 2 | 3) => {
      // Can go back to step 1 anytime
      if (stepIndex === 1) {
        setActiveStep(1);
      }
      // Can go to step 2 only if nominal is valid
      else if (stepIndex === 2 && isNominalValid) {
        setActiveStep(2);
      }
      // Can go to step 3 only if nominal is valid AND step 2 was completed once or currently active
      else if (stepIndex === 3 && isNominalValid && activeStep === 3) {
        setActiveStep(3);
      }
    },
    [isNominalValid, activeStep]
  );

  // Primary Button Click action
  const handlePrimaryButtonClick = useCallback(async () => {
    if (activeStep === 1) {
      if (isNominalValid) setActiveStep(2);
    } else if (activeStep === 2) {
      // Validate identity inputs (Step 2)
      const isIdentityValid = await trigger(['email', 'name']);
      if (isIdentityValid) {
        setActiveStep(3);
      }
    }
  }, [activeStep, isNominalValid, trigger]);

  // Final Form Submission (Step 3)
  const onSubmit = (data: DonationStepOneInput) => {
    // TODO: Replace with actual API call
    const { formatIdr } = require('./utils');
    alert(
      `Langkah Pembayaran Berhasil!\nNominal: ${formatIdr(data.nominal)}\nNama: ${data.hideName ? 'Hamba Allah (Sembunyikan Nama)' : data.name || '-'}\nEmail: ${data.email}`
    );
  };

  // ── Control state shortcuts ──────────────────────────────────────────────────
  const isNominalSectionDisabled = activeStep === 3;
  const isIdentitySectionDisabled = activeStep === 1 || activeStep === 3;

  return (
    <Card className="rounded-[2.5rem] border border-neutral-100 bg-white shadow-xl shadow-neutral-100 p-8 sm:p-10">
      <CardContent className="p-0 flex flex-col gap-8">
        {/* Stepper Progress */}
        <div className="flex items-center justify-center gap-1.5 mb-2 w-full max-w-[480px] mx-auto">
          <StepIndicator step={STEPS[0]} state={step1State} onClick={() => handleStepClick(1)} />

          <StepConnector done={isNominalValid} />

          <StepIndicator step={STEPS[1]} state={step2State} onClick={() => handleStepClick(2)} />

          <StepConnector done={activeStep === 3} />

          <StepIndicator step={STEPS[2]} state={step3State} onClick={() => handleStepClick(3)} />
        </div>

        {/* Form with all steps */}
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
            {/* SECTION 1: Pilih Nominal Donasi */}
            <NominalStep isDisabled={isNominalSectionDisabled} />

            {/* SECTION 2: Masukkan Identitas */}
            <IdentityStep isDisabled={isIdentitySectionDisabled} />

            {/* SECTION 3: Summary Display and Navigation Button */}
            <PaymentSummaryStep activeStep={activeStep} isNominalValid={isNominalValid} onPrimaryButtonClick={handlePrimaryButtonClick} />
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
}
