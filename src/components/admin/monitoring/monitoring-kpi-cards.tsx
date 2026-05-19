import { Card, CardContent } from '@/components/ui/card';
import type { EnergyKPI } from '@/types/energy-monitoring';
import { Banknote, Zap, Cloud } from 'lucide-react';

interface MonitoringKPICardsProps {
  kpi: EnergyKPI;
}

export function MonitoringKPICards({ kpi }: MonitoringKPICardsProps) {
  // Format price (e.g. 750000 -> 750K)
  const formatPriceK = (price: number) => {
    if (price >= 1000) {
      return `${Math.round(price / 1000)}K`;
    }
    return price.toString();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
      {/* Cost Savings Card */}
      <Card className="border border-[#E5E5E3] bg-white rounded-[24px] shadow-none">
        <CardContent className="p-[24px] flex flex-col gap-[16px]">
          <div className="flex items-center gap-[12px]">
            <div className="flex items-center justify-center w-[40px] h-[40px] rounded-full bg-[#EBF3ED] text-[#2F6B3F]">
              <Banknote className="w-[20px] h-[20px]" />
            </div>
            <span className="font-jakarta font-medium text-[16px] leading-[20px] text-[#5A5A57]">Penghematan Biaya</span>
          </div>
          <div className="flex flex-col gap-[4px]">
            <div className="flex items-baseline gap-[4px]">
              <span className="font-outfit font-medium text-[20px] leading-[26px] text-[#2F6B3F]">Rp</span>
              <span className="font-outfit font-semibold text-[48px] leading-[54px] text-[#1F1F1D]">{formatPriceK(kpi.totalPriceSaved)}</span>
              <span className="font-jakarta font-medium text-[16px] leading-[20px] text-[#5A5A57] ml-[4px]">/ Bulan</span>
            </div>
            <span className="font-jakarta font-normal text-[14px] leading-[18px] text-[#A3A39E]">Data Estimasi</span>
          </div>
        </CardContent>
      </Card>

      {/* KwH Production Card */}
      <Card className="border border-[#E5E5E3] bg-white rounded-[24px] shadow-none">
        <CardContent className="p-[24px] flex flex-col gap-[16px]">
          <div className="flex items-center gap-[12px]">
            <div className="flex items-center justify-center w-[40px] h-[40px] rounded-full bg-[#FFF9EB] text-[#F7C85C]">
              <Zap className="w-[20px] h-[20px]" />
            </div>
            <span className="font-jakarta font-medium text-[16px] leading-[20px] text-[#5A5A57]">Produksi KwH</span>
          </div>
          <div className="flex flex-col gap-[4px]">
            <div className="flex items-baseline gap-[4px]">
              <span className="font-outfit font-semibold text-[48px] leading-[54px] text-[#F7C85C]">{kpi.totalKwhProduced}</span>
              <span className="font-jakarta font-medium text-[16px] leading-[20px] text-[#5A5A57] ml-[8px]">KwH/Bulan</span>
            </div>
            <span className="font-jakarta font-normal text-[14px] leading-[18px] text-[#A3A39E]">Data Estimasi</span>
          </div>
        </CardContent>
      </Card>

      {/* CO2 Reduction Card */}
      <Card className="border border-[#E5E5E3] bg-white rounded-[24px] shadow-none">
        <CardContent className="p-[24px] flex flex-col gap-[16px]">
          <div className="flex items-center gap-[12px]">
            <div className="flex items-center justify-center w-[40px] h-[40px] rounded-full bg-[#F0F4F8] text-[#708090]">
              <Cloud className="w-[20px] h-[20px]" />
            </div>
            <span className="font-jakarta font-medium text-[16px] leading-[20px] text-[#5A5A57]">
              Pengurangan CO<sub>2</sub>
            </span>
          </div>
          <div className="flex flex-col gap-[4px]">
            <div className="flex items-baseline gap-[4px]">
              <span className="font-outfit font-semibold text-[48px] leading-[54px] text-[#708090]">{kpi.totalCo2Reduced}</span>
              <span className="font-jakarta font-medium text-[16px] leading-[20px] text-[#5A5A57] ml-[8px]">Kg/Bulan</span>
            </div>
            <span className="font-jakarta font-normal text-[14px] leading-[18px] text-[#A3A39E]">Data Estimasi</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
