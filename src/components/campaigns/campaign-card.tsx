import { MapPin, Target, Calendar } from 'lucide-react';
import { formatRupiah } from '@/lib/utils/format-currency';
import { getReligionInfo } from '@/lib/utils/religion-icons';
import type { GetCampaignsResponse } from '@/lib/api/generated/types.gen';

type Campaign = NonNullable<Extract<GetCampaignsResponse, { data: unknown }>['data']>[number];

interface CampaignCardProps {
  campaign: Campaign;
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  const religion = getReligionInfo(campaign.worshipPlace.religionType);

  const daysRemaining = Math.max(0, Math.ceil((new Date(campaign.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)));

  return (
    <article className="group flex flex-col gap-6 rounded-[30px] border border-[#E0E0E0] bg-white p-5 transition-all hover:shadow-xl">
      {/* Image Section */}
      <div className="relative h-[240px] w-full overflow-hidden rounded-[20px]">
        <img
          src={campaign.coverImage?.publicUrl || '/images/placeholder-campaign.png'}
          alt={campaign.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/placeholder-campaign.png';
          }}
        />
        <div className="absolute top-4 left-4 rounded-full bg-white/90 px-4 py-1.5 backdrop-blur-sm">
          <span className="font-jakarta text-xs font-bold text-brand-green">{campaign.status}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col gap-4">
        <h3 className="line-clamp-2 min-h-[64px] font-outfit text-2xl font-medium leading-tight text-brand-text">{campaign.title}</h3>

        <div className="flex flex-wrap gap-2">
          <span className="flex items-center gap-1.5 rounded-full bg-[#F5F5F5] px-3 py-1 font-jakarta text-sm font-medium text-brand-gray">
            <span>{religion.emoji}</span>
            {religion.label}
          </span>
          <span className="flex items-center gap-1.5 rounded-full bg-[#F5F5F5] px-3 py-1 font-jakarta text-sm font-medium text-brand-gray">
            <MapPin size={14} className="text-brand-green" />
            {campaign.worshipPlace.city}
          </span>
        </div>

        <div className="flex items-center justify-between font-jakarta text-sm">
          <div className="flex flex-col">
            <span className="text-brand-light-gray">Dana Terkumpul</span>
            <span className="font-bold text-brand-green">{formatRupiah(campaign.raisedIdr)}</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-brand-light-gray">Sisa Hari</span>
            <span className="flex items-center gap-1 font-bold text-brand-text">
              <Calendar size={14} className="text-brand-green" />
              {daysRemaining} Hari
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flex flex-col gap-2">
          <div className="h-3 w-full overflow-hidden rounded-full bg-[#DDDDDD]">
            <div
              className="h-full rounded-full bg-brand-green transition-all duration-1000"
              style={{ width: `${Math.min(100, campaign.progressPercent)}%` }}
            />
          </div>
          <div className="flex items-center justify-between font-jakarta text-sm">
            <span className="font-bold text-[#DEB453]">{campaign.progressPercent}%</span>
            <span className="flex items-center gap-1 text-brand-light-gray">
              <Target size={14} className="text-brand-green" />
              Target: <span className="font-bold text-brand-text">{formatRupiah(campaign.targetIdr)}</span>
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
