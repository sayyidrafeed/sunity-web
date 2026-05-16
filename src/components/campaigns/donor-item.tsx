/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface DonorItemProps {
  donor: any;
}

export function DonorItem({ donor }: DonorItemProps) {
  const formattedAmount = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(donor.amount);

  return (
    <div className="flex items-center gap-4">
      <Avatar className="h-12 w-12 bg-brand-light-gray/20">
        <AvatarFallback className="text-brand-gray">A</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="font-bold text-brand-text">{donor.name}</span>
        <span className="text-sm font-medium text-brand-light-gray">{formattedAmount}</span>
      </div>
    </div>
  );
}
