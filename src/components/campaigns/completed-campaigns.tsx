import { useQuery } from '@tanstack/react-query';
import { getCampaignsOptions } from '@/lib/api/generated/@tanstack/react-query.gen';
import { CampaignCard } from './campaign-card';

export function CompletedCampaigns() {
  const { data, isLoading } = useQuery(
    getCampaignsOptions({
      query: {
        page: 1,
        limit: 3,
        status: 'SELESAI',
      },
    })
  );

  const campaigns = data?.data ?? [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-10">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-brand-green border-t-transparent" />
      </div>
    );
  }

  if (campaigns.length === 0) {
    return null;
  }

  return (
    <section className="mt-12 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h2 className="font-outfit text-2xl font-bold text-brand-text">Kampanye Selesai</h2>
        <div className="h-px w-full bg-[#DDD]" />
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
        {campaigns.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>
    </section>
  );
}
