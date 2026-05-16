import { Card } from '@/components/ui/card';
import { EnergyRingChart } from './energy-ring-chart';

interface EnergyGeneratedCardProps {
  totalEnergyKwh: string;
  averageEnergyPerDayKwh: string;
  sinceDate: string;
  progressPercent: number;
}

export function EnergyGeneratedCard({ totalEnergyKwh, averageEnergyPerDayKwh, sinceDate, progressPercent }: EnergyGeneratedCardProps) {
  return (
    <Card className="flex flex-col gap-8 rounded-[2.5rem] border-brand-light-gray/10 p-8 shadow-sm xl:row-span-2">
      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-bold text-brand-text">Energi Dihasilkan</h3>
        <div className="flex items-baseline gap-4 mt-4">
          <div>
            <span className="text-4xl font-bold text-brand-orange">{totalEnergyKwh}</span>
            <span className="ml-2 text-sm font-medium text-brand-gray">KwH</span>
            <p className="text-xs text-brand-gray/60">Total Energi</p>
          </div>
          <div>
            <span className="text-2xl font-bold text-brand-green">~{averageEnergyPerDayKwh}</span>
            <span className="ml-1 text-sm font-medium text-brand-gray">KwH/Hari</span>
            <p className="text-xs text-brand-gray/60">Rata-Rata per Hari</p>
          </div>
        </div>
        <p className="mt-2 text-xs text-brand-gray/60">Sejak {sinceDate}</p>
      </div>

      <div className="flex flex-1 items-center justify-center py-4">
        <EnergyRingChart progressPercent={progressPercent} />
      </div>
    </Card>
  );
}
