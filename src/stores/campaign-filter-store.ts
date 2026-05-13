import { create } from 'zustand';
import type { GetCampaignsData } from '@/lib/api/generated/types.gen';

type CampaignQuery = NonNullable<GetCampaignsData['query']>;
export type CampaignType = CampaignQuery['type'];
export type CampaignStatus = CampaignQuery['status'];

interface CampaignFilterState {
  search: string;
  city: string;
  type: CampaignType | '';
  status: CampaignStatus | '';
  page: number;
  limit: number;

  setSearch: (search: string) => void;
  setCity: (city: string) => void;
  setType: (type: CampaignType | '') => void;
  setStatus: (status: CampaignStatus | '') => void;
  setPage: (page: number) => void;
  resetFilters: () => void;
}

export const useCampaignFilterStore = create<CampaignFilterState>((set) => ({
  search: '',
  city: '',
  type: '',
  status: '',
  page: 1,
  limit: 12,

  setSearch: (search) => set({ search, page: 1 }),
  setCity: (city) => set({ city, page: 1 }),
  setType: (type) => set({ type, page: 1 }),
  setStatus: (status) => set({ status, page: 1 }),
  setPage: (page) => set({ page }),
  resetFilters: () =>
    set({
      search: '',
      city: '',
      type: '',
      status: '',
      page: 1,
    }),
}));
