export type StepState = 'done' | 'active' | 'pending';

export interface StepConfig {
  number: string;
  label: string;
}

export interface DonationContextType {
  activeStep: 1 | 2 | 3;
  setActiveStep: (step: 1 | 2 | 3) => void;
  isNominalValid: boolean;
  watchNominal: number;
  watchHideName: boolean;
  isNominalSectionDisabled: boolean;
  isIdentitySectionDisabled: boolean;
  campaign: unknown; // Campaign type can be extended later
}
