import { useParams, useNavigate } from 'react-router';
import { MOCK_CAMPAIGN_DETAIL, MOCK_DONORS, MOCK_CAMPAIGNS } from '@/data/mock-campaigns';
import { CampaignDetailHero } from '@/components/campaigns/campaign-detail-hero';
import { CampaignMeta } from '@/components/campaigns/campaign-meta';
import { CampaignTabs } from '@/components/campaigns/campaign-tabs';
import { DonorList } from '@/components/campaigns/donor-list';
import { DonationActions } from '@/components/campaigns/donation-actions';

export default function CampaignDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // In real app, we would fetch data using the id
  const campaignListMatch = MOCK_CAMPAIGNS.find((c) => c.id === id);
  const campaign = {
    ...MOCK_CAMPAIGN_DETAIL,
    ...campaignListMatch,
  };
  const donors = MOCK_DONORS;

  return (
    <div className="flex w-full justify-center bg-brand-surface pb-32">
      <div className="w-full max-w-[1329px] px-8 py-8 xl:px-10">
        <div className="flex flex-col gap-8">
          {/* Header Title & Back Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-black/5 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <div>
              <h1 className="text-3xl font-bold text-brand-heading">{campaign.title}</h1>
              <p className="text-sm text-brand-gray">Kampanyes &gt; {campaign.worshipPlace.name}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Left Column */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              <CampaignDetailHero campaign={campaign} />
              <CampaignMeta campaign={campaign} />
              <CampaignTabs campaign={campaign} />
            </div>

            {/* Right Column (Donor List) */}
            <div className="lg:col-span-1">
              <DonorList donors={donors} />
            </div>
          </div>
        </div>
      </div>

      {/* Floating Actions */}
      <DonationActions />
    </div>
  );
}
