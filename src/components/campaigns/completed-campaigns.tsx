import { useQuery } from '@tanstack/react-query';
import { getCampaignsOptions } from '@/lib/api/generated/@tanstack/react-query.gen';
import { CampaignCard } from './campaign-card';

export function CompletedCampaigns() {
  const { data, isLoading, isError } = useQuery(
    getCampaignsOptions({
      query: {
        status: 'SELESAI',
        limit: 3,
      },
    })
  );

  if (isLoading) {
    return (
      <section className="mt-12 flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h2 className="font-outfit text-2xl font-bold text-brand-text">Kampanye Selesai</h2>
          <div className="h-px w-full bg-[#DDD]" />
        </div>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="flex h-[380px] flex-col overflow-hidden rounded-[20px] bg-white shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)] animate-pulse"
            />
          ))}
        </div>
      </section>
    );
  }

  if (isError || !data?.data || data.data.length === 0) {
    return null;
  }

  return (
    <section className="mt-12 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h2 className="font-outfit text-2xl font-bold text-brand-text">Kampanye Selesai</h2>
        <div className="h-px w-full bg-[#DDD]" />
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
        {data.data.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>
    </section>
  );
}
