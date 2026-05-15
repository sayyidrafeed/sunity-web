/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card } from '@/components/ui/card';
import { LucideTrendingUp, LucideTrendingDown, LucideHome } from 'lucide-react';

interface EnergyDashboardProps {
  campaign: any;
}

export function EnergyDashboard({ campaign }: EnergyDashboardProps) {
  const metrics = campaign.energyDashboard;

  if (!metrics) {
    return (
      <div className="flex h-40 items-center justify-center rounded-[2.5rem] border border-brand-light-gray/10 bg-white">
        <p className="text-brand-gray">Data dashboard energi tidak tersedia untuk kampanye ini.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {/* Energi Dihasilkan */}
        <Card className="flex flex-col gap-8 rounded-[2.5rem] border-brand-light-gray/10 p-8 shadow-sm xl:row-span-2">
          <div className="flex flex-col gap-1">
            <h3 className="text-xl font-bold text-brand-text">Energi Dihasilkan</h3>
            <div className="flex items-baseline gap-4 mt-4">
              <div>
                <span className="text-4xl font-bold text-brand-orange">{metrics.totalEnergyKwh}</span>
                <span className="ml-2 text-sm font-medium text-brand-gray">KwH</span>
                <p className="text-xs text-brand-gray/60">Total Energi</p>
              </div>
              <div>
                <span className="text-2xl font-bold text-brand-green">~{metrics.averageEnergyPerDayKwh}</span>
                <span className="ml-1 text-sm font-medium text-brand-gray">KwH/Hari</span>
                <p className="text-xs text-brand-gray/60">Rata-Rata per Hari</p>
              </div>
            </div>
            <p className="mt-2 text-xs text-brand-gray/60">Sejak {metrics.sinceDate}</p>
          </div>

          <div className="flex flex-1 items-center justify-center py-4">
            <div className="relative h-56 w-56">
              {/* SVG Ring Progress */}
              <svg className="h-full w-full" viewBox="0 0 100 100">
                {/* Background Circle */}
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#F3F4F6" strokeWidth="10" />
                {/* Progress Circle (Orange) */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#f59e0b"
                  strokeWidth="10"
                  strokeDasharray={`${2 * Math.PI * 40}`}
                  strokeDashoffset={`${2 * Math.PI * 40 * (1 - metrics.progressPercent / 100)}`}
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                  className="transition-all duration-1000 ease-in-out"
                />
                {/* Inset Progress Circle (Green) */}
                <circle
                  cx="50"
                  cy="50"
                  r="30"
                  fill="transparent"
                  stroke="#059669"
                  strokeWidth="10"
                  strokeDasharray={`${2 * Math.PI * 30}`}
                  strokeDashoffset={`${2 * Math.PI * 30 * (1 - 0.7)}`} // Static secondary progress as design
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                  className="transition-all duration-1000 ease-in-out"
                />
              </svg>
            </div>
          </div>
        </Card>

        {/* Pengurangan CO2 */}
        <Card className="flex flex-col gap-6 rounded-[2.5rem] border-brand-light-gray/10 p-8 shadow-sm">
          <h3 className="text-xl font-bold text-brand-text">Pengurangan CO2</h3>
          <div className="flex flex-col gap-2">
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold text-brand-green">{metrics.carbonReductionTon}</span>
              <span className="text-xl font-bold text-brand-gray">Ton</span>
            </div>
            <p className="text-sm text-brand-gray/60">Berhasil Dikurangi</p>
          </div>
          <div className="flex items-center gap-2">
            <div
              className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-bold ${metrics.carbonReductionMomPercent >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
            >
              {metrics.carbonReductionMomPercent >= 0 ? <LucideTrendingUp size={14} /> : <LucideTrendingDown size={14} />}
              {Math.abs(metrics.carbonReductionMomPercent)}%
            </div>
            <span className="text-xs text-brand-gray/60">dari Bulan Lalu</span>
          </div>
        </Card>

        {/* Penghematan Biaya */}
        <Card className="flex flex-col gap-6 rounded-[2.5rem] border-brand-light-gray/10 p-8 shadow-sm">
          <h3 className="text-xl font-bold text-brand-text">Penghematan Biaya</h3>
          <div className="flex flex-col gap-2">
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-bold text-brand-green">Rp</span>
              <span className="text-5xl font-bold text-brand-green">{metrics.costSavingsIdrMonthly}</span>
              <span className="text-xl font-bold text-brand-gray">/ Bulan</span>
            </div>
            <p className="text-sm text-brand-gray/60">Dihemat</p>
          </div>
        </Card>

        {/* Dampak Setara */}
        <Card className="col-span-1 lg:col-span-2 flex items-center gap-6 rounded-[2.5rem] border-brand-light-gray/10 p-8 shadow-sm xl:col-span-2">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-green/10 text-brand-green">
            <LucideHome size={32} />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-lg font-bold text-brand-text">
              Setara Kebutuhan <span className="text-brand-green">{metrics.equivalentHousesPerYear} Rumah per Tahun</span>
            </p>
            <p className="text-xs text-brand-gray/60">Berdasarkan total energi yang dihasilkan dari sistem panel surya</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
