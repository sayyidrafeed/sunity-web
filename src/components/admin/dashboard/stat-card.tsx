import type { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  subtitlePrefix?: ReactNode;
  icon: ReactNode;
  iconBgColorClass?: string;
  valueColorClass?: string;
  className?: string;
}

export function StatCard({
  title,
  value,
  subtitle,
  subtitlePrefix,
  icon,
  iconBgColorClass = 'bg-[#E0E9E2]', // default light green
  valueColorClass = 'text-[#2F6B3F]', // default dark green
  className,
}: StatCardProps) {
  return (
    <Card className={cn('rounded-[25px] border-[#DDDDDD] bg-[#FAF9F6] shadow-[0px_14px_37.8px_rgba(54,53,53,0.1)] p-8', className)}>
      <CardContent className="p-0 flex flex-col gap-6">
        <div className="flex items-center gap-2.5">
          <div className={cn('flex h-7 w-7 items-center justify-center rounded-full', iconBgColorClass)}>{icon}</div>
          <h3 className="font-jakarta text-base font-bold text-[#A3A39E]">{title}</h3>
        </div>
        <div className="flex flex-col gap-2">
          <div className={cn('font-outfit text-5xl font-semibold leading-tight tracking-[-0.006em]', valueColorClass)}>{value}</div>
          <div className="flex items-center gap-2">
            {subtitlePrefix && <span className="font-outfit text-2xl font-medium text-[#2F6B3F]">{subtitlePrefix}</span>}
            <p className="font-jakarta text-base text-[#5A5A57]">{subtitle}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
