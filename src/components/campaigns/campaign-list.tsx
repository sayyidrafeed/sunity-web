import { useSearchParams } from 'react-router';
import { CampaignCard } from './campaign-card';
import { Pagination } from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';

interface CampaignListProps {
  data?: Array<{
    id: string;
    title: string;
    worshipPlace: {
      name: string;
      city: string;
      religionType: string;
      address?: string;
    };
    status: string;
    targetIdr: number;
    raisedIdr: number;
    donorCount: number;
    deadline: string;
    progressPercent: number;
    coverImage?: {
      assetId: string;
      publicUrl: string;
      storageKey: string;
    } | null;
  }>;
  pagination?: {
    page: number;
    limit: number;
    total: number;
  };
  isLoading?: boolean;
  isError?: boolean;
}

function CampaignCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-[20px] bg-white shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)] animate-pulse">
      <div className="p-3">
        <div className="h-[200px] w-full rounded-[15px] bg-slate-200" />
      </div>
      <div className="flex flex-col gap-4 p-5 pt-2">
        <div className="flex items-start justify-between gap-2">
          <div className="h-6 w-3/4 rounded bg-slate-200" />
          <div className="h-5 w-16 rounded-full bg-slate-200" />
        </div>
        <div className="h-4 w-1/3 rounded bg-slate-200" />
        <div className="flex justify-between">
          <div className="h-8 w-1/3 rounded bg-slate-200" />
          <div className="h-8 w-1/4 rounded bg-slate-200" />
        </div>
        <div className="flex flex-col gap-2">
          <div className="h-2 w-full rounded-full bg-slate-200" />
          <div className="flex justify-between">
            <div className="h-4 w-8 rounded bg-slate-200" />
            <div className="h-4 w-1/3 rounded bg-slate-200" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function CampaignList({ data = [], pagination, isLoading, isError }: CampaignListProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') ?? '1', 10);
  const status = searchParams.get('status');

  const handlePageChange = (page: number) => {
    setSearchParams((prev) => {
      prev.set('page', page.toString());
      return prev;
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetFilter = () => {
    setSearchParams(new URLSearchParams());
  };

  if (isError) {
    return (
      <section className="mt-12 flex flex-col gap-8 pb-20">
        <div className="flex flex-col gap-2">
          <h2 className="font-outfit text-2xl font-bold text-brand-text">
            {status?.toLowerCase() === 'selesai' ? 'Kampanye Selesai' : 'Kampanye Aktif'}
          </h2>
          <div className="h-px w-full bg-[#DDD]" />
        </div>
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mt-8 flex flex-col gap-2">
            <h3 className="font-outfit text-2xl font-bold text-red-500">Gagal Memuat Kampanye</h3>
            <p className="font-jakarta text-brand-gray">Terjadi kesalahan saat mengambil data dari server. Silakan coba lagi.</p>
          </div>
          <Button
            onClick={handleResetFilter}
            className="mt-8 h-10 rounded-full bg-brand-green px-8 text-sm font-semibold text-white transition-all hover:bg-brand-green/90"
          >
            Reset Filter & Coba Lagi
          </Button>
        </div>
      </section>
    );
  }

  const totalCampaigns = pagination?.total ?? 0;
  const itemsPerPage = pagination?.limit ?? 12;
  const totalPages = pagination ? Math.ceil(totalCampaigns / itemsPerPage) : 0;
  const startIndex = pagination ? (pagination.page - 1) * itemsPerPage : 0;
  const endIndex = pagination ? Math.min(startIndex + (data?.length || 0), totalCampaigns) : 0;

  return (
    <section className="mt-12 flex flex-col gap-8 pb-20">
      <div className="flex flex-col gap-2">
        <h2 className="font-outfit text-2xl font-bold text-brand-text">
          {status?.toLowerCase() === 'selesai' ? 'Kampanye Selesai' : 'Kampanye Aktif'}
        </h2>
        <div className="h-px w-full bg-[#DDD]" />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <CampaignCardSkeleton key={index} />
          ))}
        </div>
      ) : data.length > 0 ? (
        <>
          {/* Grid Layout */}
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {data.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex flex-col items-end gap-4">
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
              <span className="text-[12px] font-medium text-slate-400">
                Menampilkan {(startIndex + 1).toLocaleString('id-ID')}-{endIndex.toLocaleString('id-ID')} dari{' '}
                {totalCampaigns.toLocaleString('id-ID')} Kampanye
              </span>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <img src="/404-dashboard.avif" alt="Belum Ada Kampanye" className="h-auto w-[240px] object-contain" />
          <div className="mt-8 flex flex-col gap-2">
            <h3 className="font-outfit text-2xl font-bold text-brand-text">Belum Ada Kampanye yang Sesuai</h3>
            <p className="font-jakarta text-brand-gray">Coba gunakan kata kunci lain atau ubah filter pencarian.</p>
          </div>
          <Button
            onClick={handleResetFilter}
            className="mt-8 h-10 rounded-full bg-brand-green px-8 text-sm font-semibold text-white transition-all hover:bg-brand-green/90"
          >
            Reset Filter
          </Button>
        </div>
      )}
    </section>
  );
}
