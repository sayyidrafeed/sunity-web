import { Link } from 'react-router';
import { MapPin, Target, Church, Moon, Sun, Flower2, HelpCircle } from 'lucide-react';

interface CampaignCardProps {
  campaign: {
    id: string;
    title: string;
    worshipPlace: {
      name: string;
      city: string;
      religionType: string;
    };
    targetIdr: number;
    raisedIdr: number;
    deadline: string;
    progressPercent: number;
    status?: string;
    coverImage?: {
      publicUrl: string;
    } | null;
  };
}

const getReligionIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'masjid':
    case 'mushalla':
    case 'islam':
      return <Moon className="h-3 w-3" />;
    case 'gereja':
    case 'katolik':
    case 'protestan':
      return <Church className="h-3 w-3" />;
    case 'pura':
    case 'hindu':
      return <Flower2 className="h-3 w-3" />;
    case 'vihara':
    case 'buddha':
      return <Sun className="h-3 w-3" />;
    case 'klenteng':
    case 'konghucu':
      return <HelpCircle className="h-3 w-3" />;
    default:
      return <HelpCircle className="h-3 w-3" />;
  }
};

const formatIDR = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(amount)
    .replace(/\s/g, '');
};

const calculateDaysLeft = (deadline: string) => {
  const diff = new Date(deadline).getTime() - new Date().getTime();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return days > 0 ? days : 0;
};

export function CampaignCard({ campaign }: CampaignCardProps) {
  const daysLeft = calculateDaysLeft(campaign.deadline);

  return (
    <Link
      to={`/campaigns/${campaign.id}`}
      className="flex flex-col overflow-hidden rounded-[20px] bg-white shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)] transition-all hover:shadow-[0px_4px_25px_0px_rgba(0,0,0,0.1)] hover:-translate-y-1"
    >
      {/* Image Header */}
      <div className="relative h-[200px] w-full overflow-hidden p-3">
        <img
          src={campaign.coverImage?.publicUrl || '/images/placeholder-campaign.png'}
          alt={campaign.title}
          className="h-full w-full rounded-[15px] object-cover"
        />
        {campaign.status?.toLowerCase() === 'selesai' && (
          <div className="absolute right-6 top-6 flex items-center gap-1 rounded-full bg-brand-green px-3 py-1 text-[10px] font-bold text-white shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>Selesai</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4 p-5 pt-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-2 min-h-[48px] font-outfit text-lg font-bold leading-tight text-brand-text">{campaign.title}</h3>
          <div className="flex items-center gap-1 shrink-0 rounded-full bg-slate-50 px-2 py-1 text-[10px] font-medium text-slate-500">
            {getReligionIcon(campaign.worshipPlace.religionType)}
            <span>{campaign.worshipPlace.religionType}</span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-slate-400">
          <MapPin className="h-3 w-3" />
          <span className="text-xs font-medium">{campaign.worshipPlace.city}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-slate-400">Dana terkumpul</span>
            <span className="font-jakarta text-base font-bold text-brand-green">{formatIDR(campaign.raisedIdr)}</span>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="text-[10px] text-slate-400">Sisa Hari</span>
            <span className="font-jakarta text-base font-bold text-brand-green">{daysLeft}</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {/* Progress Bar */}
          <div className="h-2 w-full overflow-hidden rounded-full bg-[#E5E7EB]">
            <div className="h-full rounded-full bg-brand-green" style={{ width: `${Math.min(campaign.progressPercent, 100)}%` }} />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-brand-yellow">{campaign.progressPercent}%</span>
            <div className="flex items-center gap-1 text-brand-text">
              <Target className="h-3 w-3" />
              <span className="text-[10px] font-medium">Target:</span>
              <span className="text-[10px] font-bold">{formatIDR(campaign.targetIdr)}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
