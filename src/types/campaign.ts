/**
 * Campaign status type that supports both API format (AKTIF) and legacy format (Aktif)
 */
export type CampaignStatus = 'DRAFT' | 'AKTIF' | 'INSTALASI' | 'SELESAI' | 'ARCHIVED' | 'Aktif' | 'Selesai' | (string & {});

/**
 * Base campaign interface with all required properties for components
 */
export interface Campaign {
  id: string;
  title: string;
  description: string;
  status: string;
  raisedIdr: number;
  targetIdr: number;
  donorCount: number;
  deadline: string;
  progressPercent: number;
  worshipPlace: {
    name: string;
    city: string;
    religionType: string;
    address?: string;
  };
  energyImpact?: {
    panelCapacityKwp: string;
    estimatedKwhAnnual?: string;
    estimatedIdrSavings?: number;
  };
  impact?: {
    fundUsage?: string;
    energyProducedKwhMonthly?: string;
    beneficiaries?: number;
    carbonReductionKgMonthly?: string;
    electricitySavingsIdrMonthly?: number;
    impactDescription?: string;
  };
  images?: {
    cover?: {
      publicUrl: string;
      assetId?: string;
      storageKey?: string;
    } | null;
    gallery?: Array<{
      assetId: string;
      publicUrl: string;
      storageKey: string;
      caption?: string;
    }>;
    transparency?: Array<{
      assetId: string;
      publicUrl: string;
      storageKey: string;
      caption?: string;
    }>;
    installation?: Array<{
      assetId: string;
      publicUrl: string;
      storageKey: string;
      caption?: string;
    }>;
  };
  published?: boolean;
  energyDashboard?: {
    totalEnergyKwh: string;
    averageEnergyPerDayKwh: string;
    sinceDate: string;
    progressPercent: number;
    carbonReductionTon: string;
    carbonReductionMomPercent: number;
    costSavingsIdrMonthly: string;
    equivalentHousesPerYear: number;
  };
}
