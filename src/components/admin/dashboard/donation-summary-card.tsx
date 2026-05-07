import { TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DonationSummaryCardProps {
  title?: string;
  totalAmount?: string;
  trendText?: string;
  className?: string;
}

export function DonationSummaryCard({
  title = 'Total Dana Terkumpul',
  totalAmount = 'Rp100.000.000',
  trendText = '12% Dari Minggu Lalu',
  className,
}: DonationSummaryCardProps) {
  return (
    <div
      className={cn(
        'rounded-[25px] p-8 shadow-[0px_10px_14px_rgba(47,107,63,0.2)] bg-gradient-to-tr from-[#5CD17B] to-[#2F6B3F] text-[#FAF9F6] min-h-[213px] flex flex-col justify-between',
        className
      )}
    >
      <h3 className="font-jakarta text-base font-bold">{title}</h3>
      <div className="flex flex-col gap-2">
        <div className="font-outfit text-5xl font-semibold tracking-[-0.006em]">{totalAmount}</div>
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-white" />
          <p className="font-jakarta text-base text-white">{trendText}</p>
        </div>
      </div>
    </div>
  );
}
