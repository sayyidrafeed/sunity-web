import { useParams, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft } from 'lucide-react';
import { MOCK_CAMPAIGNS, MOCK_CAMPAIGN_DETAIL } from '@/data/mock-campaigns';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { donationStepOneSchema, type DonationStepOneInput } from '@/types/donation';
import { cn } from '@/lib/utils';

export default function CampaignTransaction() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find target campaign or fallback to first active campaign
  const campaignMatch = MOCK_CAMPAIGNS.find((c) => c.id === id) || MOCK_CAMPAIGNS[2]; // Fallback to Masjid Al-Ikhlas (id: '3')
  const campaign = {
    ...MOCK_CAMPAIGN_DETAIL,
    ...campaignMatch,
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
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

  // Preset options
  const PRESETS = [25000, 50000, 100000, 250000];

  // Formatting helpers
  const formatIdr = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
      .format(val)
      .replace(/\s+/g, ''); // Rp70.000.000 instead of Rp 70.000.000
  };

  const formatNumberInput = (val: number) => {
    if (!val) return '';
    return new Intl.NumberFormat('id-ID').format(val);
  };

  const handlePresetSelect = (preset: number) => {
    setValue('nominal', preset, { shouldValidate: true });
  };

  const calculateRemainingDays = (deadlineStr: string) => {
    const deadlineDate = new Date(deadlineStr);
    const today = new Date();
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const onSubmit = (data: DonationStepOneInput) => {
    alert(
      `Langkah 1 Berhasil!\nPayload yang siap dikirim:\nNominal: ${formatIdr(data.nominal)}\nNama: ${data.hideName ? 'Hamba Allah (Sembunyikan Nama)' : data.name || '-'}\nEmail: ${data.email}`
    );
  };

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

            {/* RIGHT COLUMN: Stepper Card Form */}
            <div className="lg:col-span-7">
              <Card className="rounded-[2.5rem] border border-neutral-100 bg-white shadow-xl shadow-neutral-100 p-8 sm:p-10">
                <CardContent className="p-0 flex flex-col gap-8">
                  {/* Stepper Progress */}
                  <div className="flex items-center justify-center gap-1.5 mb-2 w-full max-w-[480px] mx-auto">
                    {/* Step 1 */}
                    <div className="flex flex-col items-center flex-1">
                      <div className="w-12 h-12 rounded-full border border-brand-yellow flex items-center justify-center font-bold text-lg text-brand-yellow bg-white shadow-sm shadow-brand-yellow/10">
                        01
                      </div>
                      <span className="text-xs font-bold text-brand-gray mt-2.5 text-center leading-none">Pilih Nominal</span>
                    </div>

                    <div className="h-[1px] bg-neutral-200 flex-1 -mt-6" />

                    {/* Step 2 */}
                    <div className="flex flex-col items-center flex-1 opacity-60">
                      <div className="w-12 h-12 rounded-full border border-neutral-300 flex items-center justify-center font-bold text-lg text-brand-light-gray bg-white">
                        02
                      </div>
                      <span className="text-xs font-semibold text-brand-light-gray mt-2.5 text-center leading-none">Isi Data</span>
                    </div>

                    <div className="h-[1px] bg-neutral-200 flex-1 -mt-6" />

                    {/* Step 3 */}
                    <div className="flex flex-col items-center flex-1 opacity-60">
                      <div className="w-12 h-12 rounded-full border border-neutral-300 flex items-center justify-center font-bold text-lg text-brand-light-gray bg-white">
                        03
                      </div>
                      <span className="text-xs font-semibold text-brand-light-gray mt-2.5 text-center leading-none">Pembayaran</span>
                    </div>
                  </div>

                  {/* Form Container */}
                  <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                    {/* SECTION 1: Nominal */}
                    <div className="flex flex-col gap-3">
                      <h3 className="text-lg font-bold text-brand-text">Pilih Nominal Donasi</h3>

                      {/* Custom Large Nominal Input */}
                      <div
                        className={cn(
                          'border-2 rounded-[1.25rem] p-5 flex items-center justify-between bg-white transition-all',
                          errors.nominal
                            ? 'border-brand-danger focus-within:ring-brand-danger/20'
                            : 'border-brand-green focus-within:ring-brand-green/20 focus-within:border-brand-green'
                        )}
                      >
                        <div className="flex flex-col select-none">
                          <span className="text-4xl font-extrabold text-brand-green leading-none">Rp</span>
                          <span className="text-[10px] text-brand-light-gray mt-1.5 font-bold tracking-wide leading-none">Minimal Rp10.000</span>
                        </div>
                        <input
                          type="text"
                          placeholder="0"
                          className="text-right text-5xl font-bold text-neutral-400 focus:text-brand-green outline-none bg-transparent w-full ml-4 font-outfit"
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
                              onClick={() => handlePresetSelect(preset)}
                              className={cn(
                                'py-3 px-1 border text-sm font-semibold rounded-xl text-center cursor-pointer transition-all',
                                isSelected
                                  ? 'border-brand-green bg-brand-green/5 text-brand-green border-2 font-bold shadow-sm'
                                  : 'border-brand-green/20 hover:border-brand-green/50 text-brand-green bg-white'
                              )}
                            >
                              Rp{formatNumberInput(preset)}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* SECTION 2: Identity inputs */}
                    <div className="flex flex-col gap-4">
                      <h3 className="text-lg font-bold text-brand-text">Masukkan Identitas</h3>

                      <div className="flex flex-col gap-3.5">
                        {/* Name (Optional) */}
                        <div className="flex flex-col gap-2">
                          <Input
                            id="name"
                            type="text"
                            placeholder="Nama (Opsional)"
                            className="h-12 rounded-xl border border-neutral-300 bg-neutral-50 px-4 focus-visible:ring-brand-green/20 focus-visible:border-brand-green text-sm"
                            disabled={watchHideName}
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
                            className={cn(
                              'h-12 rounded-xl border bg-neutral-50 px-4 focus-visible:ring-brand-green/20 focus-visible:border-brand-green text-sm',
                              errors.email ? 'border-brand-danger' : 'border-neutral-300'
                            )}
                            {...register('email')}
                          />
                          {errors.email && <p className="text-xs font-semibold text-brand-danger">{errors.email.message}</p>}
                        </div>

                        {/* Hide Name Switch */}
                        <div className="flex items-center justify-end gap-3.5 mt-1 select-none">
                          <Label htmlFor="hide-name" className="text-xs font-semibold text-brand-light-gray cursor-pointer">
                            Sembunyikan Nama
                          </Label>
                          <Switch
                            id="hide-name"
                            checked={watchHideName}
                            onCheckedChange={(checked) => {
                              setValue('hideName', checked);
                              if (checked) {
                                setValue('name', ''); // Reset name if hidden
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* SECTION 3: Summary Display and Button */}
                    <div className="flex flex-col gap-4 mt-2">
                      <div className="flex flex-col gap-1.5">
                        <span className="text-sm font-semibold text-brand-text">Total Donasi</span>
                        <span className="text-4xl font-extrabold text-brand-green leading-none">Rp{formatNumberInput(watchNominal || 0)}</span>
                      </div>

                      <Button
                        type="submit"
                        disabled={!isValid}
                        className={cn(
                          'w-full h-14 rounded-full text-base font-bold transition-all shadow-md shadow-brand-green/10 mt-1 cursor-pointer',
                          isValid
                            ? 'bg-brand-green text-white hover:bg-brand-green/90'
                            : 'bg-neutral-200 text-neutral-400 cursor-not-allowed shadow-none'
                        )}
                      >
                        Donasi Sekarang
                      </Button>
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
