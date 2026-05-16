import { Card } from '@/components/ui/card';
import { LucideTrendingUp, LucideTrendingDown } from 'lucide-react';

interface CarbonReductionCardProps {
  carbonReductionTon: string;
  carbonReductionMomPercent: number;
}

export function CarbonReductionCard({ carbonReductionTon, carbonReductionMomPercent }: CarbonReductionCardProps) {
  const isPositive = carbonReductionMomPercent >= 0;

  return (
    <Card className="flex flex-col gap-6 rounded-[2.5rem] border-brand-light-gray/10 p-8 shadow-sm">
      <h3 className="text-xl font-bold text-brand-text">Pengurangan CO₂</h3>
      <div className="flex flex-col gap-2">
        <div className="flex items-baseline gap-2">
          <span className="text-5xl font-bold text-brand-green">{carbonReductionTon}</span>
          <span className="text-xl font-bold text-brand-gray">Ton</span>
        </div>
        <p className="text-sm text-brand-gray/60">Berhasil Dikurangi</p>
      </div>
      <div className="flex items-center gap-2">
        <div
          className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-bold ${
            isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {isPositive ? <LucideTrendingUp size={14} /> : <LucideTrendingDown size={14} />}
          {Math.abs(carbonReductionMomPercent)}%
        </div>
        <span className="text-xs text-brand-gray/60">dari Bulan Lalu</span>
      </div>
    </Card>
  );
}
