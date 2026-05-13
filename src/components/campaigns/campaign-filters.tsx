import { Search, ChevronDown } from 'lucide-react';
import { useCampaignFilterStore } from '@/stores/campaign-filter-store';
import type { CampaignType, CampaignStatus } from '@/stores/campaign-filter-store';
import { useCampaigns } from '@/hooks/use-campaigns';

export function CampaignFilters() {
  const { search, setSearch, city, setCity, type, setType, status, setStatus } = useCampaignFilterStore();

  const { filters } = useCampaigns();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-4">
        <span className="font-jakarta font-bold text-brand-text">Browse By</span>

        {/* Type Filter */}
        <div className="relative group">
          <select
            value={type}
            onChange={(e) => setType(e.target.value as CampaignType | '')}
            className="appearance-none rounded-full border border-[#E0E0E0] bg-white px-6 py-2.5 font-jakarta text-sm font-medium text-brand-gray outline-none transition focus:border-brand-green"
          >
            <option value="">Rumah Ibadah</option>
            {filters?.types?.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <ChevronDown size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-brand-gray" />
        </div>

        {/* City Filter */}
        <div className="relative group">
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="appearance-none rounded-full border border-[#E0E0E0] bg-white px-6 py-2.5 font-jakarta text-sm font-medium text-brand-gray outline-none transition focus:border-brand-green"
          >
            <option value="">Kota</option>
            {filters?.cities?.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <ChevronDown size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-brand-gray" />
        </div>

        {/* Status Filter */}
        <div className="relative group">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as CampaignStatus | '')}
            className="appearance-none rounded-full border border-[#E0E0E0] bg-white px-6 py-2.5 font-jakarta text-sm font-medium text-brand-gray outline-none transition focus:border-brand-green"
          >
            <option value="">Status</option>
            {filters?.statuses?.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <ChevronDown size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-brand-gray" />
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative w-full">
        <Search size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-light-gray" />
        <input
          type="text"
          placeholder="Cari Kampanye..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-full border border-[#E0E0E0] bg-white py-4 pl-14 pr-6 font-jakarta text-base text-brand-text outline-none transition focus:border-brand-green focus:ring-1 focus:ring-brand-green"
        />
      </div>
    </div>
  );
}
