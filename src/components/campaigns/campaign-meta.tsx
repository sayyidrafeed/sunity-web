/* eslint-disable @typescript-eslint/no-explicit-any */
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface CampaignMetaProps {
  campaign: any;
}

export function CampaignMeta({ campaign }: CampaignMetaProps) {
  const formattedRaised = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(campaign.raisedIdr);

  const formattedTarget = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(campaign.targetIdr);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-brand-light-gray/20 text-xs text-brand-gray">A</AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium text-brand-gray">Administrator</span>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-brand-green">{formattedRaised}</span>
          <span className="text-sm text-brand-light-gray font-medium">/ {formattedTarget} terkumpul</span>
        </div>

        <div className="relative flex items-center gap-4">
          <Progress value={campaign.progressPercent} className="h-3 bg-[#E5E5E3]" indicatorClassName="bg-brand-green" />
          <span className="text-lg font-bold text-brand-light-gray">{campaign.progressPercent}%</span>
        </div>
      </div>

      <div className="flex gap-12">
        <div className="flex flex-col">
          <span className="text-2xl font-bold text-brand-text">{campaign.donorCount.toLocaleString('id-ID')}</span>
          <span className="text-sm font-medium text-brand-light-gray">Donatur</span>
        </div>
        <div className="flex flex-col">
          <span className="text-2xl font-bold text-brand-text">29</span>
          <span className="text-sm font-medium text-brand-light-gray">Hari Lagi</span>
        </div>
      </div>
    </div>
  );
}
