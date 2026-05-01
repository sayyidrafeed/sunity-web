import { Link } from 'react-router';
import { CampaignCard } from './campaign-card';

const campaignReviews = [
  {
    id: 1,
    image: '/images/review-campaign-1.png',
    title: 'Dukung Pembangunan Rumah Ibadah',
    location: 'Jakarta',
    deadline: '20 Apr 2026',
    progress: 70,
    target: 'Rp100.000.000',
  },
  {
    id: 2,
    image: '/images/review-campaign-2.png',
    title: 'Energi Surya untuk Masjid',
    location: 'Bandung',
    deadline: '24 Apr 2026',
    progress: 70,
    target: 'Rp100.000.000',
  },
  {
    id: 3,
    image: '/images/review-campaign-3.png',
    title: 'Terangi Gereja Komunitas',
    location: 'Surabaya',
    deadline: '30 Apr 2026',
    progress: 70,
    target: 'Rp100.000.000',
  },
];

export function CampaignReviewSection() {
  return (
    <section className="bg-brand-surface px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-outfit text-5xl font-bold tracking-[-0.006em] text-brand-text">
          Lihat <span className="text-brand-green">Kampanye</span>
        </h2>

        <div className="mt-8 flex justify-center">
          <p className="font-jakarta text-2xl font-medium text-brand-green">
            <span className="font-outfit text-4xl font-bold">1.000+</span> Kampanye Telah Dipublikasikan
          </p>
        </div>

        <div className="mx-auto mt-8 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {campaignReviews.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            to="/campaigns"
            className="flex items-center gap-3 rounded-full bg-brand-green px-8 py-3 font-jakarta text-sm font-medium text-white shadow-[0_12px_24px_rgba(47,107,63,0.25)] transition hover:scale-[1.02] hover:brightness-90"
          >
            Lihat Semua
            <img src="/images/icon-arrow-green-white.png" alt="" aria-hidden="true" className="h-4 w-4 object-contain" />
          </Link>
        </div>
      </div>
    </section>
  );
}
