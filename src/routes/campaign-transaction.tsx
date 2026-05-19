import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Check } from 'lucide-react';
import { MOCK_CAMPAIGNS, MOCK_CAMPAIGN_DETAIL } from '@/data/mock-campaigns';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { donationStepOneSchema, type DonationStepOneInput } from '@/types/donation';
import { cn } from '@/lib/utils';

// ─── Step config types ────────────────────────────────────────────────────────

type StepState = 'done' | 'active' | 'pending';

interface StepConfig {
  number: string;
  label: string;
}

const STEPS: StepConfig[] = [
  { number: '01', label: 'Pilih Nominal' },
  { number: '02', label: 'Isi Data' },
  { number: '03', label: 'Pembayaran' },
];

// ─── Stepper indicator component ──────────────────────────────────────────────

function StepIndicator({ step, state, onClick }: { step: StepConfig; state: StepState; onClick?: () => void }) {
  const isDone = state === 'done';
  const isActive = state === 'active';
  const isPending = state === 'pending';

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isPending}
      className={cn(
        'flex flex-col items-center flex-1 focus:outline-none transition-all duration-300',
        isPending ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
        isDone && 'cursor-pointer hover:opacity-80'
      )}
    >
      <div
        className={cn(
          'w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 shadow-sm',
          isDone && 'bg-brand-green border-2 border-brand-green text-white shadow-brand-green/20',
          isActive && 'bg-white border-2 border-brand-yellow text-brand-yellow shadow-brand-yellow/10',
          isPending && 'bg-white border border-neutral-300 text-neutral-400'
        )}
      >
        {isDone ? <Check className="w-5 h-5 stroke-[3]" /> : step.number}
      </div>
      <span
        className={cn(
          'text-xs mt-2.5 text-center leading-none transition-colors duration-300',
          isDone && 'font-bold text-brand-green',
          isActive && 'font-bold text-brand-gray',
          isPending && 'font-semibold text-brand-light-gray'
        )}
      >
        {step.label}
      </span>
    </button>
  );
}

// ─── Connector line component ─────────────────────────────────────────────────

function StepConnector({ done }: { done: boolean }) {
  return <div className={cn('h-[2px] flex-1 -mt-6 rounded-full transition-colors duration-500', done ? 'bg-brand-green' : 'bg-neutral-200')} />;
}

// ─── Main Campaign Transaction Component ───────────────────────────────────────

export default function CampaignTransaction() {
  const { id } = useParams();
  const navigate = useNavigate();

  // activeStep: 1 = Pilih Nominal, 2 = Isi Data, 3 = Pembayaran
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);

  // Find target campaign or fallback to Masjid Al-Ikhlas (id: '3')
  const campaignMatch = MOCK_CAMPAIGNS.find((c) => c.id === id) || MOCK_CAMPAIGNS[2];
  const campaign = {
    ...MOCK_CAMPAIGN_DETAIL,
    ...campaignMatch,
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm<DonationStepOneInput>({
    resolver: zodResolver(donationStepOneSchema),
    mode: 'onChange',
    defaultValues: {
      nominal: 0,
      name: '',
      email: '',
      hideName: false,
    },
  });

  const watchNominal = watch('nominal');
  const watchHideName = watch('hideName');

  const isNominalValid = watchNominal >= 10000;

  // ── Auto transition from Step 1 to Step 2 ──────────────────────────────────
  // "Dimana jika input form 'Pilih Nominal Donasi' terisi maka warna 'Pilih Nominal' menjadi hijau,
  // lalu warna 'Isi Data' menjadi kuning, dan 'Pembayaran' tetap abu."
  useEffect(() => {
    if (isNominalValid) {
      if (activeStep === 1) {
        setActiveStep(2);
      }
    } else {
      // If nominal becomes invalid (< 10000), drop back to step 1
      setActiveStep(1);
    }
  }, [watchNominal, isNominalValid]);

  // Derive stepper indicator states
  const step1State: StepState = isNominalValid ? 'done' : 'active';
  const step2State: StepState = activeStep === 3 ? 'done' : isNominalValid ? 'active' : 'pending';
  const step3State: StepState = activeStep === 3 ? 'active' : 'pending';

  // ── Stepper Navigation ───────────────────────────────────────────────────────

  const handleStepClick = (stepIndex: 1 | 2 | 3) => {
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
  };

  // Primary Button Click action
  const handlePrimaryButtonClick = async () => {
    if (activeStep === 1) {
      if (isNominalValid) setActiveStep(2);
    } else if (activeStep === 2) {
      // Validate identity inputs (Step 2)
      const isIdentityValid = await trigger(['email', 'name']);
      if (isIdentityValid) {
        setActiveStep(3);
      }
    } else if (activeStep === 3) {
      // Let standard form submit handle it
    }
  };

  // Final Form Submission (Step 3)
  const onSubmit = (data: DonationStepOneInput) => {
    alert(
      `Langkah Pembayaran Berhasil!\nNominal: ${formatIdr(data.nominal)}\nNama: ${data.hideName ? 'Hamba Allah (Sembunyikan Nama)' : data.name || '-'}\nEmail: ${data.email}`
    );
  };

  // ── Formatting helpers ───────────────────────────────────────────────────────

  const PRESETS = [25000, 50000, 100000, 250000];

  const formatIdr = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
      .format(val)
      .replace(/\s+/g, '');
  };

  const formatNumberInput = (val: number) => {
    if (!val) return '';
    return new Intl.NumberFormat('id-ID').format(val);
  };

  const calculateRemainingDays = (deadlineStr: string) => {
    const deadlineDate = new Date(deadlineStr);
    const today = new Date();
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  // ── Control state shortcuts ──────────────────────────────────────────────────

  const isNominalSectionDisabled = activeStep === 3;
  const isIdentitySectionDisabled = activeStep === 1 || activeStep === 3;

  return (
    <div className="flex w-full justify-center bg-brand-surface pb-32 font-outfit">
      <div className="w-full max-w-[1329px] px-8 py-8 xl:px-10">
        <div className="flex flex-col gap-8">
          {/* Header Title & Back Button */}
          <div className="flex items-start gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full -ml-2 mt-1 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              onClick={() => navigate(`/campaigns/${campaign.id}`)}
            >
              <ArrowLeft className="h-8 w-8 stroke-[3] text-brand-text" />
            </Button>
            <div className="flex flex-col">
              <h1 className="text-4xl font-bold tracking-tight text-brand-text leading-none">Donasi Kampanye</h1>
              <p className="text-sm text-brand-light-gray mt-2">Kampanyes &gt; {campaign.worshipPlace.name} &gt; Donasi</p>
            </div>
          </div>

          {/* Main Content Split Grid */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start mt-4">
            {/* LEFT COLUMN: Campaign detail summary */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Campaign Image */}
              <div className="relative overflow-hidden rounded-[1.5rem] shadow-md border border-neutral-100">
                <img
                  src={campaign.images?.cover?.publicUrl || '/images/review-campaign-1.png'}
                  alt={campaign.title}
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>

              {/* Campaign Title & Info */}
              <div className="flex flex-col gap-4">
                <h2 className="text-3xl font-bold text-brand-text leading-tight tracking-tight">{campaign.title}</h2>

                <div className="h-px bg-neutral-200/80 my-1" />

                {/* Progress Detail */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-baseline gap-1.5 flex-wrap">
                    <span className="text-3xl font-extrabold text-brand-green leading-none">{formatIdr(campaign.raisedIdr)}</span>
                    <span className="text-sm text-brand-light-gray font-medium">/ {formatIdr(campaign.targetIdr)} terkumpul</span>
                  </div>

                  {/* Custom Styled Progress Bar */}
                  <Progress value={campaign.progressPercent} className="h-3.5 bg-neutral-200" indicatorClassName="bg-brand-green" />

                  {/* Bottom Stats */}
                  <div className="flex items-center gap-6 text-sm font-semibold text-brand-gray mt-1">
                    <div>
                      <span className="text-brand-text font-extrabold">{campaign.donorCount.toLocaleString('id-ID')}</span> Donatur
                    </div>
                    <div>
                      <span className="text-brand-text font-extrabold">{calculateRemainingDays(campaign.deadline)}</span> Hari Lagi
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Stepper Card Form (Integrated Single-Page UX) */}
            <div className="lg:col-span-7">
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

                  <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
                    {/* SECTION 1: Pilih Nominal Donasi */}
                    <div
                      className={cn(
                        'flex flex-col gap-3 transition-opacity duration-300',
                        isNominalSectionDisabled && 'opacity-60 pointer-events-none'
                      )}
                    >
                      <h3 className="text-lg font-bold text-brand-text">Pilih Nominal Donasi</h3>

                      {/* Custom Large Nominal Input */}
                      <div
                        className={cn(
                          'border-2 rounded-[1.25rem] p-5 flex items-center justify-between transition-all bg-white',
                          errors.nominal
                            ? 'border-brand-danger focus-within:ring-brand-danger/20'
                            : isNominalValid
                              ? 'border-brand-green focus-within:ring-brand-green/20'
                              : 'border-neutral-300 focus-within:ring-neutral-200',
                          isNominalSectionDisabled && 'bg-neutral-50 border-neutral-200'
                        )}
                      >
                        <div className="flex flex-col select-none">
                          <span
                            className={cn(
                              'text-4xl font-extrabold leading-none transition-colors',
                              isNominalValid ? 'text-brand-green' : 'text-neutral-400'
                            )}
                          >
                            Rp
                          </span>
                          <span className="text-[10px] text-brand-light-gray mt-1.5 font-bold tracking-wide leading-none">Minimal Rp10.000</span>
                        </div>
                        <input
                          type="text"
                          placeholder="0"
                          disabled={isNominalSectionDisabled}
                          className={cn(
                            'text-right text-5xl font-bold outline-none bg-transparent w-full ml-4 font-outfit transition-colors',
                            isNominalValid ? 'text-brand-green' : 'text-neutral-400 focus:text-brand-green',
                            isNominalSectionDisabled && 'text-brand-green cursor-not-allowed'
                          )}
                          value={watchNominal ? formatNumberInput(watchNominal) : ''}
                          onChange={(e) => {
                            const val = e.target.value.replace(/[^0-9]/g, '');
                            setValue('nominal', val ? parseInt(val, 10) : 0, {
                              shouldValidate: true,
                            });
                          }}
                        />
                      </div>
                      {errors.nominal && <p className="text-xs font-semibold text-brand-danger leading-none px-1">{errors.nominal.message}</p>}

                      {/* Preset Nominal Selection Buttons */}
                      <div className="grid grid-cols-4 gap-3 mt-1">
                        {PRESETS.map((preset) => {
                          const isSelected = watchNominal === preset;
                          return (
                            <button
                              key={preset}
                              type="button"
                              disabled={isNominalSectionDisabled}
                              onClick={() => setValue('nominal', preset, { shouldValidate: true })}
                              className={cn(
                                'py-3 px-1 border text-sm font-semibold rounded-xl text-center cursor-pointer transition-all duration-200',
                                isSelected
                                  ? 'border-brand-green bg-brand-green/5 text-brand-green border-2 font-bold shadow-sm'
                                  : 'border-brand-green/20 hover:border-brand-green/50 text-brand-green bg-white',
                                isNominalSectionDisabled && 'opacity-50 cursor-not-allowed'
                              )}
                            >
                              Rp{formatNumberInput(preset)}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* SECTION 2: Masukkan Identitas */}
                    <div className={cn('flex flex-col gap-4 transition-all duration-300', isIdentitySectionDisabled && 'opacity-60')}>
                      <h3 className="text-lg font-bold text-brand-text">Masukkan Identitas</h3>

                      <div className="flex flex-col gap-3.5">
                        {/* Name (Optional) */}
                        <div className="flex flex-col gap-2">
                          <Input
                            id="name"
                            type="text"
                            placeholder="Nama (Opsional)"
                            disabled={isIdentitySectionDisabled || watchHideName}
                            className={cn(
                              'h-12 rounded-xl border px-4 focus-visible:ring-brand-green/20 focus-visible:border-brand-green text-sm transition-all',
                              isIdentitySectionDisabled
                                ? 'bg-neutral-100 border-neutral-200 text-neutral-400 cursor-not-allowed'
                                : 'bg-neutral-50 border-neutral-300 text-brand-text'
                            )}
                            {...register('name')}
                          />
                          {errors.name && <p className="text-xs font-semibold text-brand-danger">{errors.name.message}</p>}
                        </div>

                        {/* Email (Required) */}
                        <div className="flex flex-col gap-2">
                          <Input
                            id="email"
                            type="email"
                            placeholder="Email*"
                            disabled={isIdentitySectionDisabled}
                            className={cn(
                              'h-12 rounded-xl border px-4 focus-visible:ring-brand-green/20 focus-visible:border-brand-green text-sm transition-all',
                              errors.email ? 'border-brand-danger' : 'border-neutral-300',
                              isIdentitySectionDisabled
                                ? 'bg-neutral-100 border-neutral-200 text-neutral-400 cursor-not-allowed'
                                : 'bg-neutral-50 border-neutral-300 text-brand-text'
                            )}
                            {...register('email')}
                          />
                          {errors.email && <p className="text-xs font-semibold text-brand-danger">{errors.email.message}</p>}
                        </div>

                        {/* Hide Name Switch */}
                        <div
                          className={cn(
                            'flex items-center justify-end gap-3.5 mt-1 select-none transition-opacity duration-300',
                            isIdentitySectionDisabled && 'pointer-events-none opacity-50'
                          )}
                        >
                          <Label htmlFor="hide-name" className="text-xs font-semibold text-brand-light-gray cursor-pointer">
                            Sembunyikan Nama
                          </Label>
                          <Switch
                            id="hide-name"
                            checked={watchHideName}
                            disabled={isIdentitySectionDisabled}
                            onCheckedChange={(checked) => {
                              setValue('hideName', checked);
                              if (checked) {
                                setValue('name', '');
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* SECTION 3: Summary Display and Navigation Button */}
                    <div className="flex flex-col gap-4 mt-2">
                      <div className="flex flex-col gap-1.5">
                        <span className="text-sm font-semibold text-brand-text">Total Donasi</span>
                        <span className="text-4xl font-extrabold text-brand-green leading-none">Rp{formatNumberInput(watchNominal || 0)}</span>
                      </div>

                      {activeStep === 3 ? (
                        // Step 3 primary submit button
                        <Button
                          type="submit"
                          className="w-full h-14 rounded-full text-base font-bold bg-brand-green text-white hover:bg-brand-green/90 shadow-md shadow-brand-green/10 mt-1 cursor-pointer transition-all duration-300"
                        >
                          Donasi Sekarang
                        </Button>
                      ) : (
                        // Step 1 / 2 "Selanjutnya" button
                        <Button
                          type="button"
                          onClick={handlePrimaryButtonClick}
                          disabled={activeStep === 1 && !isNominalValid}
                          className={cn(
                            'w-full h-14 rounded-full text-base font-bold transition-all duration-300 shadow-md mt-1 cursor-pointer',
                            activeStep === 1 && !isNominalValid
                              ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed shadow-none'
                              : 'bg-brand-green text-white hover:bg-brand-green/90 shadow-brand-green/10'
                          )}
                        >
                          Selanjutnya
                        </Button>
                      )}
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
