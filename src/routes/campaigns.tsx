import { useSearchParams } from 'react-router';
import { CampaignHero } from '@/components/campaigns/campaign-hero';
import { CampaignFilter } from '@/components/campaigns/campaign-filter';
import { FeaturedCampaign } from '@/components/campaigns/featured-campaign';
import { CampaignList } from '@/components/campaigns/campaign-list';
import { CompletedCampaigns } from '@/components/campaigns/completed-campaigns';

export default function Campaigns() {
  const [searchParams] = useSearchParams();
  const hasParams = Array.from(searchParams.keys()).length > 0;

  return (
    <div className="flex w-full justify-center bg-brand-surface pb-20">
      <div className="w-full max-w-[1329px] px-8 xl:px-10">
        <CampaignHero />
        {!hasParams && <FeaturedCampaign />}
        <CampaignFilter />
        <CampaignList />
        {!hasParams && <CompletedCampaigns />}
      </div>
    </div>
  );
}
