import { Card } from '@/components/ui/card';
import { LucideHome } from 'lucide-react';

interface EquivalentImpactCardProps {
  equivalentHousesPerYear: number;
}

export function EquivalentImpactCard({ equivalentHousesPerYear }: EquivalentImpactCardProps) {
  return (
    <Card className="col-span-1 lg:col-span-2 flex items-center gap-6 rounded-[2.5rem] border-brand-light-gray/10 p-8 shadow-sm xl:col-span-2">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-green/10 text-brand-green">
        <LucideHome size={32} />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-lg font-bold text-brand-text">
          Setara Kebutuhan <span className="text-brand-green">{equivalentHousesPerYear} Rumah per Tahun</span>
        </p>
        <p className="text-xs text-brand-gray/60">Berdasarkan total energi yang dihasilkan dari sistem panel surya</p>
      </div>
    </Card>
  );
}
