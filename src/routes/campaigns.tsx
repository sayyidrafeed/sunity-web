import { useSearchParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { getCampaignsOptions } from '@/lib/api/generated/@tanstack/react-query.gen';
import { CampaignHero } from '@/components/campaigns/campaign-hero';
import { CampaignFilter } from '@/components/campaigns/campaign-filter';
import { FeaturedCampaign } from '@/components/campaigns/featured-campaign';
import { CampaignList } from '@/components/campaigns/campaign-list';
import { CompletedCampaigns } from '@/components/campaigns/completed-campaigns';

export default function Campaigns() {
  const [searchParams] = useSearchParams();
  const filterKeys = ['q', 'rumah_ibadah', 'kota', 'status'];
  const hasActiveFilters = filterKeys.some((key) => searchParams.has(key));

  // Extract and map search params to API params
  const q = searchParams.get('q') || undefined;
  const rawRumahIbadah = searchParams.get('rumah_ibadah');
  const type = (
    rawRumahIbadah === 'Gereja Katolik' || rawRumahIbadah === 'Gereja Kristen'
      ? 'Gereja'
      : rawRumahIbadah === 'all'
        ? undefined
        : rawRumahIbadah || undefined
  ) as 'Masjid' | 'Mushalla' | 'Gereja' | 'Pura' | 'Vihara' | 'Klenteng' | undefined;
  const city = searchParams.get('kota') || undefined;

  const rawStatus = searchParams.get('status');
  let status: 'DRAFT' | 'AKTIF' | 'INSTALASI' | 'SELESAI' | 'ARCHIVED' | 'Completed' | undefined = undefined;
  if (
    rawStatus === 'AKTIF' ||
    rawStatus === 'DRAFT' ||
    rawStatus === 'INSTALASI' ||
    rawStatus === 'SELESAI' ||
    rawStatus === 'ARCHIVED' ||
    rawStatus === 'Completed'
  ) {
    status = rawStatus;
  }

  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = 12;

  // Query campaigns
  const { data, isLoading, isError } = useQuery(
    getCampaignsOptions({
      query: {
        page,
        limit,
        search: q,
        type,
        city,
        status,
      },
    })
  );

  return (
    <div className="flex w-full justify-center bg-brand-surface pb-20">
      <div className="w-full max-w-[1329px] px-8 xl:px-10">
        <CampaignHero />
        <CampaignFilter availableFilters={data?.filters} />
        {!hasActiveFilters && <FeaturedCampaign />}
        <CampaignList data={data?.data} pagination={data?.pagination} isLoading={isLoading} isError={isError} />
        {!hasActiveFilters && <CompletedCampaigns />}
      </div>
    </div>
  );
}
