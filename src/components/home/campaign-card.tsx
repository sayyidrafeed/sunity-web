import { Link } from 'react-router';

type Campaign = {
  id: number;
  image: string;
  title: string;
  location: string;
  deadline: string;
  progress: number;
  target: string;
};

export function CampaignCard({ campaign }: { campaign: Campaign }) {
  return (
    <article className="rounded-[18px] bg-brand-green p-3 shadow-[0_20px_30px_rgba(47,107,63,0.24)]">
      <img src={campaign.image} alt={campaign.title} className="h-[135px] w-full rounded-[12px] object-cover" />

      <div className="mt-4 flex items-start justify-between gap-3">
        <h3 className="max-w-[140px] font-outfit text-lg font-bold leading-tight text-white">{campaign.title}</h3>

        <p className="mt-1 flex items-center gap-1 font-jakarta text-[11px] text-white">
          <img src="/images/icon-location-2.png" alt="" aria-hidden="true" className="h-3.5 w-3.5 object-contain" />
          {campaign.location}
        </p>
      </div>

      <p className="mt-3 flex items-center gap-1 font-jakarta text-[11px] text-white">
        <img src="/images/icon-date-2.png" alt="" aria-hidden="true" className="h-3.5 w-3.5 object-contain" />
        Batas Donasi: {campaign.deadline}
      </p>

      <div className="mt-5 h-3 overflow-hidden rounded-full bg-brand-surface">
        <div className="h-full rounded-full bg-brand-yellow" style={{ width: `${campaign.progress}%` }} />
      </div>

      <div className="mt-2 flex items-center justify-between font-jakarta text-[11px] text-white">
        <span>{campaign.progress}%</span>

        <span className="flex items-center gap-1">
          <img src="/images/icon-target-3.png" alt="" aria-hidden="true" className="h-3.5 w-3.5 object-contain" />
          Target: {campaign.target}
        </span>
      </div>

      <div className="mt-5 flex justify-end">
        <Link
          to="/campaigns"
          aria-label={`Lihat kampanye ${campaign.title}`}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-yellow shadow-md transition hover:scale-105 hover:brightness-90"
        >
          <img src="/images/icon-arrow-yellow-white.png" alt="" aria-hidden="true" className="h-4 w-4 object-contain" />
        </Link>
      </div>
    </article>
  );
}
