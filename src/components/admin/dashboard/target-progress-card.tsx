import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface TargetProgressCardProps {
  progressPercentage?: number;
  sisaTarget?: string;
  targetDana?: string;
  className?: string;
}

export function TargetProgressCard({
  progressPercentage = 80,
  sisaTarget = 'Rp25.000.000',
  targetDana = 'Rp125.000.000',
  className,
}: TargetProgressCardProps) {
  return (
    <Card className={cn('rounded-[25px] border-[#DDDDDD] bg-[#FAF9F6] shadow-[0px_14px_37.8px_rgba(54,53,53,0.1)] p-8', className)}>
      <CardContent className="p-0 flex items-center gap-9">
        <div className="w-[148px] h-[148px] relative flex-shrink-0">
          <CircularProgressbar
            value={progressPercentage}
            text={`${progressPercentage}%`}
            strokeWidth={12}
            styles={buildStyles({
              rotation: 0,
              strokeLinecap: 'round',
              textSize: '20px', // we will override text style manually below
              pathTransitionDuration: 0.5,
              pathColor: '#2F6B3F', // Primary Green
              textColor: 'transparent', // hide default text to style our own
              trailColor: '#E0E9E2', // Light Green trail
              backgroundColor: 'transparent',
            })}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
            <span className="font-outfit font-medium text-2xl tracking-[-0.006em] text-black">{progressPercentage}%</span>
            <span className="font-outfit font-medium text-xs tracking-[-0.006em] text-black">Tercapai</span>
          </div>
        </div>

        <div className="flex flex-col gap-9 w-full">
          <div className="flex flex-col gap-1">
            <p className="font-jakarta text-base font-bold text-[#A3A39E]">Sisa Target</p>
            <h4 className="font-outfit text-2xl font-medium tracking-[-0.006em] text-[#2F6B3F]">{sisaTarget}</h4>
          </div>

          <div className="flex flex-col gap-1">
            <p className="font-jakarta text-base font-bold text-[#A3A39E]">Target Dana</p>
            <h4 className="font-outfit text-2xl font-medium tracking-[-0.006em] text-[#2F6B3F]">{targetDana}</h4>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
