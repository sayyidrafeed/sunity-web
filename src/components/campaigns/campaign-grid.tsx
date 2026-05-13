import { CampaignCard } from './campaign-card';
import { CampaignSkeleton } from './campaign-skeleton';
import { EmptyCampaignState } from './empty-campaign-state';
import { useCampaigns } from '@/hooks/use-campaigns';

export function CampaignGrid() {
  const { campaigns, isLoading } = useCampaigns();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-14 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <CampaignSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (campaigns.length === 0) {
    return <EmptyCampaignState />;
  }

  return (
    <div className="grid grid-cols-1 gap-14 md:grid-cols-2 lg:grid-cols-3">
      {campaigns.map((campaign) => (
        <CampaignCard key={campaign.id} campaign={campaign} />
      ))}
    </div>
  );
}
