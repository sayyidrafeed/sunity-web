import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCampaignFilterStore } from '@/stores/campaign-filter-store';
import { useCampaigns } from '@/hooks/use-campaigns';

export function CampaignPagination() {
  const { page, setPage } = useCampaignFilterStore();
  const { pagination, isLoading } = useCampaigns();

  if (!pagination || pagination.total <= pagination.limit || isLoading) {
    return null;
  }

  const totalPages = Math.ceil(pagination.total / pagination.limit);
  const startRange = (pagination.page - 1) * pagination.limit + 1;
  const endRange = Math.min(pagination.page * pagination.limit, pagination.total);

  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= page - 1 && i <= page + 1)) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== '...') {
        pages.push('...');
      }
    }
    return pages;
  };

  return (
    <div className="mt-16 flex flex-col items-center gap-8 border-t border-[#E0E0E0] pt-12">
      <div className="flex items-center gap-2">
        {/* Previous Button */}
        <button
          onClick={() => setPage(Math.max(1, page - 1))}
          disabled={page === 1}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-[#E0E0E0] text-brand-gray transition hover:bg-gray-50 disabled:opacity-50"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-2">
          {getPageNumbers().map((p, i) =>
            p === '...' ? (
              <span key={`ellipsis-${i}`} className="px-2 text-brand-light-gray">
                ...
              </span>
            ) : (
              <button
                key={`page-${p}`}
                onClick={() => setPage(p as number)}
                className={`flex h-12 min-w-[48px] items-center justify-center rounded-full px-4 font-jakarta font-bold transition ${
                  page === p ? 'border-2 border-brand-green bg-[#E0E9E2] text-brand-green' : 'text-brand-gray hover:bg-gray-50'
                }`}
              >
                {p}
              </button>
            )
          )}
        </div>

        {/* Next Button */}
        <button
          onClick={() => setPage(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-green text-white shadow-lg transition hover:brightness-110 disabled:bg-gray-300 disabled:shadow-none"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-8 font-jakarta text-brand-gray">
        <div className="flex items-center gap-2">
          <span>Go to:</span>
          <input
            type="number"
            min={1}
            max={totalPages}
            defaultValue={page}
            onBlur={(e) => {
              const val = parseInt(e.target.value);
              if (val >= 1 && val <= totalPages) setPage(val);
            }}
            className="w-16 rounded-lg border border-[#E0E0E0] px-3 py-2 text-center outline-none focus:border-brand-green"
          />
        </div>
        <p>
          Menampilkan{' '}
          <span className="font-bold text-brand-text">
            {startRange}-{endRange}
          </span>{' '}
          dari <span className="font-bold text-brand-text">{pagination.total}</span> Kampanye
        </p>
      </div>
    </div>
  );
}
