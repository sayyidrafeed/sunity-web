import { useSearchParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { getAdminCampaignsOptions, getAdminDashboardOptions } from '@/lib/api/generated/@tanstack/react-query.gen';
import { User, Clock, Loader, AlertTriangle } from 'lucide-react';
import { StatCard } from './stat-card';
import { CampaignStatusCard } from './campaign-status-card';
import { DonationSummaryCard } from './donation-summary-card';
import { TargetProgressCard } from './target-progress-card';
import { DonationTable } from './donation-table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function DashboardPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const campaignIdFromUrl = searchParams.get('campaignId');

  // Fetch admin campaigns to populate the selector dropdown
  const { data: campaignsData, isLoading: isLoadingCampaigns } = useQuery(
    getAdminCampaignsOptions({
      query: {
        limit: 100,
      },
    })
  );

  const campaigns = campaignsData?.data ?? [];
  const selectedCampaignId = campaignIdFromUrl || campaigns[0]?.id;

  // Fetch dashboard metrics
  const {
    data: dashboardData,
    isLoading: isLoadingDashboard,
    isError,
    error,
  } = useQuery({
    ...getAdminDashboardOptions({
      query: {
        campaignId: selectedCampaignId || '',
      },
    }),
    enabled: !!selectedCampaignId,
  });

  const handleCampaignSelect = (id: string) => {
    setSearchParams({ campaignId: id });
  };

  const formatIDR = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  if (isLoadingCampaigns || (selectedCampaignId && isLoadingDashboard)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAF9F6]">
        <div className="flex flex-col items-center gap-4">
          <Loader className="w-8 h-8 text-[#2F6B3F] animate-spin" />
          <span className="font-jakarta text-[14px] text-[#5A5A57]">Memuat dashboard...</span>
        </div>
      </div>
    );
  }

  if (campaigns.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-12 bg-[#FAF9F6] gap-4">
        <AlertTriangle className="w-8 h-8 text-amber-500" />
        <h2 className="font-outfit text-2xl font-bold text-[#1F1F1D]">Belum Ada Kampanye</h2>
        <p className="font-jakarta text-brand-gray text-center max-w-sm">Silakan buat kampanye baru terlebih dahulu di menu "Kelola Kampanye".</p>
      </div>
    );
  }

  if (isError || !dashboardData) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-12 bg-[#FAF9F6] gap-4">
        <AlertTriangle className="w-8 h-8 text-red-500" />
        <h2 className="font-outfit text-2xl font-bold text-[#1F1F1D]">Gagal Memuat Dashboard</h2>
        <p className="font-jakarta text-red-500 text-center max-w-sm">{error instanceof Error ? error.message : 'Terjadi kesalahan'}</p>
      </div>
    );
  }

  const { stats, donation, campaign, recentDonations } = dashboardData;

  // Determine subStatus based on campaign status
  const subStatusMap: Record<string, string> = {
    DRAFT: 'Draf Kampanye',
    AKTIF: 'Sedang Berjalan',
    INSTALASI: 'Proses Pemasangan',
    SELESAI: 'Kampanye Berakhir',
    ARCHIVED: 'Kampanye Diarsipkan',
  };
  const subStatus = subStatusMap[stats.campaignStatus] || 'Status Kampanye';

  return (
    <div className="flex flex-col p-12 gap-10 bg-[#FAF9F6] min-h-screen">
      {/* Header with Selector Dropdown */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-0.5">
          <p className="font-jakarta text-sm font-bold tracking-[-0.006em] text-[#A3A39E]">Halo!</p>
          <h1 className="font-outfit text-4xl font-medium tracking-[-0.006em] text-black">Dashboard</h1>
        </div>

        {/* Campaign Selector Dropdown */}
        <div className="flex items-center gap-3">
          <span className="font-jakarta text-sm font-medium text-[#A3A39E]">Kampanye:</span>
          <Select value={selectedCampaignId} onValueChange={handleCampaignSelect}>
            <SelectTrigger className="w-[300px] rounded-full border-[#DDDDDD] bg-white font-jakarta text-sm">
              <SelectValue placeholder="Pilih Kampanye" />
            </SelectTrigger>
            <SelectContent>
              {campaigns.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <p className="font-jakarta text-xl font-normal tracking-[-0.006em] text-[#1F1F1D] mt-4">{campaign.title}</p>

      {/* Main Content Grid */}
      <div className="flex flex-col gap-8 w-full max-w-[1034px]">
        {/* Top Row: Stat Cards & Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[22px]">
          <StatCard
            title="Jumlah Donatur"
            value={stats.donorCount.toLocaleString('id-ID')}
            subtitle={`${stats.donorCountToday} Hari Ini`}
            subtitlePrefix="+"
            icon={<User className="w-[15px] h-[15px] text-[#2F6B3F]" />}
          />
          <StatCard
            title="Sisa Hari"
            value={stats.daysRemaining.toString()}
            subtitle={`Masa Tenggat ${new Date(campaign.deadline).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}`}
            valueColorClass="text-[#F7C85C]"
            iconBgColorClass="bg-[#FEF7E7]" // Light yellow
            icon={<Clock className="w-[15px] h-[15px] text-[#F7C85C]" />}
          />
          <CampaignStatusCard status={stats.campaignStatus} subStatus={subStatus} />
        </div>

        {/* Middle Row: Summary & Progress */}
        <div className="grid grid-cols-1 md:grid-cols-[465px_1fr] gap-[22px]">
          <DonationSummaryCard
            totalAmount={formatIDR(donation.raisedIdr)}
            trendText={`${dashboardData.energyImpact?.carbonReductionMomPercent ?? 0}% Dari Bulan Lalu`}
          />
          <TargetProgressCard
            progressPercentage={donation.progressPercent}
            sisaTarget={formatIDR(Math.max(0, donation.targetIdr - donation.raisedIdr))}
            targetDana={formatIDR(donation.targetIdr)}
          />
        </div>

        {/* Bottom Row: Table */}
        <div className="mt-6">
          <DonationTable donations={recentDonations} />
        </div>
      </div>
    </div>
  );
}
