import { memo } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { type StepConfig, type StepState } from './types';

interface StepIndicatorProps {
  step: StepConfig;
  state: StepState;
  onClick?: () => void;
}

export const StepIndicator = memo(function StepIndicator({ step, state, onClick }: StepIndicatorProps) {
  const isDone = state === 'done';
  const isActive = state === 'active';
  const isPending = state === 'pending';

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isPending}
      className={cn(
        'flex flex-col items-center flex-1 focus:outline-none transition-all duration-300',
        isPending ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
        isDone && 'cursor-pointer hover:opacity-80'
      )}
    >
      <div
        className={cn(
          'w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 shadow-sm',
          isDone && 'bg-brand-green border-2 border-brand-green text-white shadow-brand-green/20',
          isActive && 'bg-white border-2 border-brand-yellow text-brand-yellow shadow-brand-yellow/10',
          isPending && 'bg-white border border-neutral-300 text-neutral-400'
        )}
      >
        {isDone ? <Check className="w-5 h-5 stroke-[3]" /> : step.number}
      </div>
      <span
        className={cn(
          'text-xs mt-2.5 text-center leading-none transition-colors duration-300',
          isDone && 'font-bold text-brand-green',
          isActive && 'font-bold text-brand-gray',
          isPending && 'font-semibold text-brand-light-gray'
        )}
      >
        {step.label}
      </span>
    </button>
  );
});

interface StepConnectorProps {
  done: boolean;
}

export const StepConnector = memo(function StepConnector({ done }: StepConnectorProps) {
  return <div className={cn('h-[2px] flex-1 -mt-6 rounded-full transition-colors duration-500', done ? 'bg-brand-green' : 'bg-neutral-200')} />;
});
