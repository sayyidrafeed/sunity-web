import { useState, type FormEvent } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function generatePaginationItems(currentPage: number, totalPages: number) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, '...', totalPages];
  }

  if (currentPage >= totalPages - 3) {
    return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const [goToInput, setGoToInput] = useState('');
  const items = generatePaginationItems(currentPage, totalPages);

  const handleGoToSubmit = (e: FormEvent) => {
    e.preventDefault();
    const page = parseInt(goToInput, 10);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
    setGoToInput('');
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-slate-400 transition-colors hover:bg-slate-100 disabled:opacity-50 disabled:hover:bg-slate-50"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {items.map((item, index) => {
        if (item === '...') {
          return (
            <span key={`ellipsis-${index}`} className="px-1 text-slate-300">
              ...
            </span>
          );
        }

        const pageNum = item as number;
        const isActive = pageNum === currentPage;

        return (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            aria-label={`Page ${pageNum}`}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-lg text-sm transition-colors',
              isActive ? 'bg-brand-green font-bold text-white shadow-sm hover:bg-brand-green/90' : 'font-medium text-slate-400 hover:bg-slate-50'
            )}
          >
            {pageNum}
          </button>
        );
      })}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-slate-400 transition-colors hover:bg-slate-100 disabled:opacity-50 disabled:hover:bg-slate-50"
      >
        <ChevronRight className="h-4 w-4" />
      </button>

      <form onSubmit={handleGoToSubmit} className="ml-4 flex items-center gap-2">
        <label htmlFor="goToPage" className="text-sm text-slate-500">
          Go to:
        </label>
        <input
          id="goToPage"
          type="number"
          min={1}
          max={totalPages}
          value={goToInput}
          onChange={(e) => setGoToInput(e.target.value)}
          placeholder="eg 24"
          className="flex h-8 w-[60px] items-center rounded-lg border border-slate-200 px-2 text-sm font-medium text-slate-700 outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green"
        />
      </form>
    </div>
  );
}
