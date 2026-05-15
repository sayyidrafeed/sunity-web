/* eslint-disable @typescript-eslint/no-explicit-any */
import { ScrollArea } from '@/components/ui/scroll-area';
import { DonorItem } from './donor-item';

interface DonorListProps {
  donors: any[];
}

export function DonorList({ donors }: DonorListProps) {
  return (
    <div className="flex flex-col gap-6 rounded-[2.5rem] bg-white p-8 shadow-sm border border-brand-light-gray/10 sticky top-8">
      <h2 className="text-2xl font-bold text-brand-text">Donatur</h2>
      <ScrollArea className="h-[500px] pr-4">
        <div className="flex flex-col gap-6">
          {donors.map((donor) => (
            <DonorItem key={donor.id} donor={donor} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
