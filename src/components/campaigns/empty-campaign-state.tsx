import { useCampaignFilterStore } from '@/stores/campaign-filter-store';

export function EmptyCampaignState() {
  const { resetFilters } = useCampaignFilterStore();

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <img src="/public/404-dashboard.avif" alt="Empty state" className="mb-8 h-64 w-auto object-contain" />
      <h3 className="mb-2 font-outfit text-2xl font-bold text-brand-heading">Belum Ada Kampanye yang Sesuai</h3>
      <p className="mb-8 max-w-md font-jakarta text-brand-gray">
        Coba gunakan kata kunci lain atau ubah filter pencarian untuk menemukan apa yang Anda cari.
      </p>
      <button
        onClick={resetFilters}
        className="rounded-full bg-brand-green px-8 py-3 font-jakarta font-semibold text-white transition hover:bg-opacity-90"
      >
        Reset Filter
      </button>
    </div>
  );
}
