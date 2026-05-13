import { CampaignFilters, CampaignGrid, CampaignPagination } from '@/components/campaigns';

export default function CampaignsPage() {
  return (
    <div className="bg-brand-surface pb-24">
      {/* Header Section */}
      <section className="bg-white pt-16 pb-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col gap-2">
            <span className="font-jakarta text-lg font-medium text-brand-green">Halo! 👋</span>
            <h1 className="font-outfit text-5xl font-bold text-brand-heading">Jelajahi Kampanye</h1>
          </div>

          <div className="mt-12">
            <CampaignFilters />
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="pt-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <CampaignGrid />
          <CampaignPagination />
        </div>
      </section>
    </div>
  );
}
