import { Card } from '@/components/ui/card';

interface CostSavingCardProps {
  costSavingsIdrMonthly: string;
}

export function CostSavingCard({ costSavingsIdrMonthly }: CostSavingCardProps) {
  return (
    <Card className="flex flex-col gap-6 rounded-[2.5rem] border-brand-light-gray/10 p-8 shadow-sm">
      <h3 className="text-xl font-bold text-brand-text">Penghematan Biaya</h3>
      <div className="flex flex-col gap-2">
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-bold text-brand-green">Rp</span>
          <span className="text-5xl font-bold text-brand-green">{costSavingsIdrMonthly}</span>
          <span className="text-xl font-bold text-brand-gray">/ Bulan</span>
        </div>
        <p className="text-sm text-brand-gray/60">Dihemat</p>
      </div>
    </Card>
  );
}
