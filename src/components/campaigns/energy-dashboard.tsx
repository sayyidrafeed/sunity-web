/* eslint-disable @typescript-eslint/no-explicit-any */
import { EnergyGeneratedCard } from './energy/energy-generated-card';
import { CarbonReductionCard } from './energy/carbon-reduction-card';
import { CostSavingCard } from './energy/cost-saving-card';
import { EquivalentImpactCard } from './energy/equivalent-impact-card';

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
    <div className="grid grid-cols-1 gap-[22px] lg:grid-cols-2">
      {/* Energi Dihasilkan */}
      <EnergyGeneratedCard
        totalEnergyKwh={metrics.totalEnergyKwh}
        averageEnergyPerDayKwh={metrics.averageEnergyPerDayKwh}
        sinceDate={metrics.sinceDate}
        progressPercent={metrics.progressPercent}
      />

      {/* Pengurangan CO2 */}
      <CarbonReductionCard carbonReductionTon={metrics.carbonReductionTon} carbonReductionMomPercent={metrics.carbonReductionMomPercent} />

      {/* Penghematan Biaya */}
      <CostSavingCard costSavingsIdrMonthly={metrics.costSavingsIdrMonthly} />

      {/* Dampak Setara */}
      <EquivalentImpactCard equivalentHousesPerYear={metrics.equivalentHousesPerYear} />
    </div>
  );
}
