import React from 'react';
import { Check } from 'lucide-react';

interface CampaignStepperProps {
  currentStep: number;
}

export function CampaignStepper({ currentStep }: CampaignStepperProps) {
  const steps = [
    { id: 1, label: 'Data Rumah Ibadah' },
    { id: 2, label: 'Detail Kampanye' },
    { id: 3, label: 'Estimasi Dampak' },
    { id: 4, label: 'Tinjauan' },
  ];

  return (
    <div className="flex flex-col gap-2 items-center justify-center w-full max-w-[840px] mx-auto mb-16 select-none pb-8">
      <div className="flex items-center justify-between w-full">
        {steps.map((s, idx) => {
          const isCompleted = currentStep > s.id;
          const isActive = currentStep === s.id;

          return (
            <React.Fragment key={s.id}>
              {/* Step Node */}
              <div className="flex flex-col items-center relative">
                {/* Circle */}
                <div
                  className={`w-[44px] h-[44px] rounded-full border-2 flex items-center justify-center font-jakarta font-semibold text-[15px] transition-all duration-300 ${
                    isCompleted
                      ? 'bg-[#2F6B3F] border-[#2F6B3F] text-white'
                      : isActive
                        ? 'bg-transparent border-[#F7C85C] text-[#F7C85C]'
                        : 'bg-transparent border-[#E5E5E3] text-[#A3A39E]'
                  }`}
                >
                  {isCompleted ? <Check className="w-5 h-5 stroke-[3]" /> : String(s.id).padStart(2, '0')}
                </div>
                {/* Label */}
                <span
                  className={`absolute top-[52px] font-jakarta text-[13px] leading-tight transition-colors duration-300 text-center whitespace-nowrap ${
                    isActive || isCompleted ? 'font-semibold text-[#1F1F1D]' : 'font-normal text-[#A3A39E]'
                  }`}
                >
                  {s.label}
                </span>
              </div>
              {/* Connector Line */}
              {idx < steps.length - 1 && (
                <div className={`flex-1 h-[2px] mx-4 transition-colors duration-[400ms] ${currentStep > s.id ? 'bg-[#2F6B3F]' : 'bg-[#E5E5E3]'}`} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default CampaignStepper;
