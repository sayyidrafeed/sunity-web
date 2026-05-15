/* eslint-disable @typescript-eslint/no-explicit-any */
import { LucideMapPin, LucideCircleCheck } from 'lucide-react';

interface CampaignDetailHeroProps {
  campaign: any;
}

export function CampaignDetailHero({ campaign }: CampaignDetailHeroProps) {
  return (
    <div className="relative overflow-hidden rounded-[2.5rem] shadow-xl">
      <img
        src={campaign.images?.cover?.publicUrl || '/images/review-campaign-1.png'}
        alt={campaign.title}
        className="aspect-[21/9] w-full object-cover"
      />

      {/* Floating Badges */}
      <div className="absolute top-6 left-6 flex gap-3">
        <div className="flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-brand-text backdrop-blur-sm shadow-sm">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-text text-[10px] text-white">🌙</span>
          {campaign.worshipPlace.religionType}
        </div>
        <div className="flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-brand-text backdrop-blur-sm shadow-sm">
          <LucideMapPin className="h-4 w-4 text-brand-text" />
          {campaign.worshipPlace.city}
        </div>
      </div>

      <div className="absolute top-6 right-6">
        <div className="flex items-center gap-2 rounded-full bg-[#3F5AF4]/90 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm shadow-sm">
          <LucideCircleCheck className="h-4 w-4 fill-white text-[#3F5AF4]" />
          Aktif
        </div>
      </div>
    </div>
  );
}
