import { LucideChevronRight, LucideSchool } from 'lucide-react';
import type { Campaign } from '@/types/campaign';

interface CampaignDescriptionProps {
  campaign: Campaign;
}

export function CampaignDescription({ campaign }: CampaignDescriptionProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* Static Header with Chevron */}
      <div className="flex items-center justify-between rounded-3xl bg-white px-8 py-6 shadow-sm border border-brand-light-gray/10">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green">
            <LucideSchool className="h-6 w-6" />
          </div>
          <span className="text-xl font-bold text-brand-text">Rincian Rumah Ibadah</span>
        </div>
        <LucideChevronRight className="h-6 w-6 text-brand-gray" />
      </div>

      {/* Text Content */}
      <div className="flex flex-col gap-8 rounded-[2.5rem] bg-white p-10 shadow-sm border border-brand-light-gray/10">
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl font-bold text-brand-heading">Deskripsi</h2>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-bold text-brand-text">About</h3>
              <p className="text-brand-gray leading-relaxed">{campaign.description}</p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-bold text-brand-text">Impact</h3>
              <p className="text-brand-gray leading-relaxed">{campaign.impact?.impactDescription || 'No impact information available'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
