import { memo } from 'react';
import { Progress } from '@/components/ui/progress';
import { formatIdr, calculateRemainingDays } from './utils';

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
}

interface CampaignSummaryProps {
  campaign: Campaign;
}

export const CampaignSummary = memo(function CampaignSummary({ campaign }: CampaignSummaryProps) {
  return (
    <div className="flex flex-col gap-6">
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
  );
});
