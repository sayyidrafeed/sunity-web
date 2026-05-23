import { useParams, useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { getCampaignsByIdOptions } from '@/lib/api/generated/@tanstack/react-query.gen';
import { MOCK_DONORS } from '@/data/mock-campaigns';
import { CampaignDetailHero } from '@/components/campaigns/campaign-detail-hero';
import { CampaignMeta } from '@/components/campaigns/campaign-meta';
import { CampaignTabsList, CampaignTabsContent } from '@/components/campaigns/campaign-tabs';
import { DonorList } from '@/components/campaigns/donor-list';
import { DonationActions } from '@/components/campaigns/donation-actions';
import { Tabs } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ArrowLeft, LoaderCircle } from 'lucide-react';

export default function CampaignDetail() {
  const { id, tab = 'ringkasan' } = useParams();
  const navigate = useNavigate();

  const {
    data: campaign,
    isLoading,
    error,
  } = useQuery({
    ...getCampaignsByIdOptions({
      path: { id: id || '' },
    }),
    enabled: !!id,
  });

  const donors = MOCK_DONORS;

  const handleTabChange = (value: string) => {
    const path = value === 'ringkasan' ? `/campaigns/${id}` : `/campaigns/${id}/${value}`;
    navigate(path, { replace: true, preventScrollReset: true });
  };

  if (isLoading) {
    return (
      <div className="flex h-[80vh] w-full items-center justify-center bg-brand-surface">
        <LoaderCircle className="h-10 w-10 animate-spin text-brand-green" />
      </div>
    );
  }

  if (error || !campaign) {
    return (
      <div className="flex h-[80vh] w-full flex-col items-center justify-center bg-brand-surface gap-4">
        <p className="text-xl font-semibold text-brand-text">Kampanye tidak ditemukan atau terjadi kesalahan.</p>
        <Button onClick={() => navigate('/campaigns')}>Kembali ke Daftar Kampanye</Button>
      </div>
    );
  }

  return (
    <div className="flex w-full justify-center bg-brand-surface pb-32">
      <div className="w-full max-w-[1329px] px-8 py-8 xl:px-10">
        <div className="flex flex-col gap-8">
          {/* Header Title & Back Button */}
          <div className="flex items-start gap-3">
            <Button variant="ghost" size="icon" className="rounded-full -ml-2 mt-0.5" onClick={() => navigate('/campaigns')}>
              <ArrowLeft className="h-8 w-8 stroke-[3]" />
            </Button>
            <div className="flex flex-col">
              <h1 className="text-4xl font-bold tracking-tight text-brand-text leading-tight">{campaign.title}</h1>
              <p className="text-base text-brand-gray mt-1">Kampanye &gt; {campaign.worshipPlace.name}</p>
            </div>
          </div>

          <Tabs value={tab} onValueChange={handleTabChange} className="w-full">
            <div className="flex flex-col gap-8">
              {/* Full Width Sections */}
              <CampaignDetailHero campaign={campaign} />
              <CampaignMeta campaign={campaign} />

              {/* Full Width Tab Triggers */}
              <CampaignTabsList campaign={campaign} />

              {/* Split Content Below Tabs */}
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Left Column (Active Tab Content) */}
                <div className="lg:col-span-2 flex flex-col gap-8">
                  <CampaignTabsContent campaign={campaign} />
                </div>

                {/* Right Column (Persistent Donor List) */}
                <div className="lg:col-span-1">
                  <DonorList donors={donors} />
                </div>
              </div>
            </div>
          </Tabs>
        </div>
      </div>

      {/* Floating Actions */}
      <DonationActions campaign={campaign} />
    </div>
  );
}
