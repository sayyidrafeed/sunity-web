import { Link } from 'react-router';

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
            <article key={campaign.id} className="rounded-[18px] bg-brand-green p-3 shadow-[0_20px_30px_rgba(47,107,63,0.24)]">
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
