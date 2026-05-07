import { User, Clock } from 'lucide-react';
import { StatCard } from './stat-card';
import { CampaignStatusCard } from './campaign-status-card';
import { DonationSummaryCard } from './donation-summary-card';
import { TargetProgressCard } from './target-progress-card';
import { DonationTable } from './donation-table';

export function DashboardPage() {
  return (
    <div className="flex flex-col p-12 gap-10 bg-[#FAF9F6] min-h-screen">
      {/* Header */}
      <div className="flex flex-col gap-0.5">
        <p className="font-jakarta text-sm font-bold tracking-[-0.006em] text-[#A3A39E]">Halo!</p>
        <h1 className="font-outfit text-4xl font-medium tracking-[-0.006em] text-black">Dashboard</h1>
        <p className="font-jakarta text-xl font-normal tracking-[-0.006em] text-[#1F1F1D] mt-8">Pemasangan Panel Surya Masjid Al-Ikhlas</p>
      </div>

      {/* Main Content Grid */}
      <div className="flex flex-col gap-8 w-full max-w-[1034px]">
        {/* Top Row: Stat Cards & Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[22px]">
          <StatCard
            title="Jumlah Donatur"
            value="1.204"
            subtitle="8 Hari Ini"
            subtitlePrefix="+"
            icon={<User className="w-[15px] h-[15px] text-[#2F6B3F]" />}
          />
          <StatCard
            title="Sisa Hari"
            value="28"
            subtitle="Masa Tenggat 30 April 2026"
            valueColorClass="text-[#F7C85C]"
            iconBgColorClass="bg-[#FEF7E7]" // Light yellow
            icon={<Clock className="w-[15px] h-[15px] text-[#F7C85C]" />}
          />
          <CampaignStatusCard status="Aktif" subStatus="Sedang Berjalan" />
        </div>

        {/* Middle Row: Summary & Progress */}
        <div className="grid grid-cols-1 md:grid-cols-[465px_1fr] gap-[22px]">
          <DonationSummaryCard />
          <TargetProgressCard />
        </div>

        {/* Bottom Row: Table */}
        <div className="mt-6">
          <DonationTable />
        </div>
      </div>
    </div>
  );
}
