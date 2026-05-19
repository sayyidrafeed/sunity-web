import { useParams, useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { MOCK_CAMPAIGNS, MOCK_CAMPAIGN_DETAIL } from '@/data/mock-campaigns';
import { Button } from '@/components/ui/button';
import { NotFound } from '@/components/ui/not-found';
import { DonationForm, CampaignSummary } from '@/components/campaigns/donation-form';

export default function CampaignTransaction() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find target campaign or fallback to Masjid Al-Ikhlas (id: '3')
  // Using a proper find by id instead of hardcoded array index for resilience
  const campaignMatch = MOCK_CAMPAIGNS.find((c) => c.id === id) || MOCK_CAMPAIGNS.find((c) => c.id === '3');

  // If no campaign is found, show 404 page
  if (!campaignMatch) {
    return <NotFound />;
  }

  const campaign = {
    ...MOCK_CAMPAIGN_DETAIL,
    ...campaignMatch,
  };

  return (
    <div className="flex w-full justify-center bg-brand-surface pb-32 font-outfit">
      <div className="w-full max-w-[1329px] px-8 py-8 xl:px-10">
        <div className="flex flex-col gap-8">
          {/* Header Title & Back Button */}
          <div className="flex items-start gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full -ml-2 mt-1 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              onClick={() => navigate(`/campaigns/${campaign.id}`)}
            >
              <ArrowLeft className="h-8 w-8 stroke-[3] text-brand-text" />
            </Button>
            <div className="flex flex-col">
              <h1 className="text-4xl font-bold tracking-tight text-brand-text leading-none">Donasi Kampanye</h1>
              <p className="text-sm text-brand-light-gray mt-2">Kampanyes &gt; {campaign.worshipPlace.name} &gt; Donasi</p>
            </div>
          </div>

          {/* Main Content Split Grid */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start mt-4">
            {/* LEFT COLUMN: Campaign detail summary */}
            <div className="lg:col-span-5">
              <CampaignSummary campaign={campaign} />
            </div>

            {/* RIGHT COLUMN: Donation Form */}
            <div className="lg:col-span-7">
              <DonationForm campaign={campaign} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
