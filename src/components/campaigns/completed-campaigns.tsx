import { CampaignCard } from './campaign-card';

const MOCK_COMPLETED_CAMPAIGNS = [
  {
    id: 'completed-1',
    title: 'Dukung Pembangunan Rumah Ibadah',
    worshipPlace: { name: 'Gereja Katolik', city: 'Jakarta', religionType: 'Katolik' },
    targetIdr: 100000000,
    raisedIdr: 100000000,
    deadline: new Date(Date.now() + 29 * 24 * 60 * 60 * 1000).toISOString(), // Mocking '29' days left to match screenshot
    progressPercent: 100,
    coverImage: { publicUrl: '/images/placeholder-campaign.png' }, // Or any other placeholder
  },
  {
    id: 'completed-2',
    title: 'Dukung Pembangunan Rumah Ibadah',
    worshipPlace: { name: 'Gereja Katolik', city: 'Jakarta', religionType: 'Katolik' },
    targetIdr: 100000000,
    raisedIdr: 100000000,
    deadline: new Date(Date.now() + 29 * 24 * 60 * 60 * 1000).toISOString(),
    progressPercent: 100,
    coverImage: { publicUrl: '/images/placeholder-campaign.png' },
  },
  {
    id: 'completed-3',
    title: 'Dukung Pembangunan Rumah Ibadah',
    worshipPlace: { name: 'Gereja Katolik', city: 'Jakarta', religionType: 'Katolik' },
    targetIdr: 100000000,
    raisedIdr: 100000000,
    deadline: new Date(Date.now() + 29 * 24 * 60 * 60 * 1000).toISOString(),
    progressPercent: 100,
    coverImage: { publicUrl: '/images/placeholder-campaign.png' },
  },
];

export function CompletedCampaigns() {
  return (
    <section className="mt-12 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h2 className="font-outfit text-2xl font-bold text-brand-text">Kampanye Selesai</h2>
        <div className="h-px w-full bg-[#DDD]" />
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
        {MOCK_COMPLETED_CAMPAIGNS.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>
    </section>
  );
}
