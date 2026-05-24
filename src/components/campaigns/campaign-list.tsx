import { useSearchParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { getCampaignsOptions } from '@/lib/api/generated/@tanstack/react-query.gen';
import { CampaignCard } from './campaign-card';
import { Pagination } from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';

export function CampaignList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') ?? '1', 10);

  // Filter Logic
  const q = searchParams.get('q') ?? '';
  const rumahIbadah = searchParams.get('rumah_ibadah');
  const kota = searchParams.get('kota');
  const status = searchParams.get('status');

  // Map filters to API params
  let typeParam: 'Masjid' | 'Mushalla' | 'Gereja' | 'Pura' | 'Vihara' | 'Klenteng' | undefined;
  if (rumahIbadah && rumahIbadah !== 'all') {
    if (rumahIbadah.startsWith('Gereja')) {
      typeParam = 'Gereja';
    } else {
      typeParam = rumahIbadah as 'Masjid' | 'Mushalla' | 'Gereja' | 'Pura' | 'Vihara' | 'Klenteng';
    }
  }

  let statusParam: 'DRAFT' | 'AKTIF' | 'INSTALASI' | 'SELESAI' | 'ARCHIVED' | 'Completed' | undefined;
  if (status && status !== 'all') {
    if (status.toLowerCase() === 'aktif') {
      statusParam = 'AKTIF';
    } else if (status.toLowerCase() === 'berhasil') {
      statusParam = 'SELESAI';
    }
  }

  const { data, isLoading } = useQuery(
    getCampaignsOptions({
      query: {
        page: currentPage,
        limit: 12,
        search: q || undefined,
        city: kota || undefined,
        type: typeParam,
        status: statusParam,
      },
    })
  );

  const campaigns = data?.data ?? [];
  const pagination = data?.pagination;
  const totalCampaigns = pagination?.total ?? 0;
  const totalPages = Math.ceil(totalCampaigns / 12);
  const startIndex = (currentPage - 1) * 12;
  const endIndex = Math.min(startIndex + campaigns.length, totalCampaigns);

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-green border-t-transparent" />
      </div>
    );
  }

  return (
    <section className="mt-12 flex flex-col gap-8 pb-20">
      <div className="flex flex-col gap-2">
        <h2 className="font-outfit text-2xl font-bold text-brand-text">
          {status?.toLowerCase() === 'selesai' ? 'Kampanye Selesai' : 'Kampanye Aktif'}
        </h2>
        <div className="h-px w-full bg-[#DDD]" />
      </div>

      {campaigns.length > 0 ? (
        <>
          {/* Grid Layout */}
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {campaigns.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex flex-col items-end gap-4">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            <span className="text-[12px] font-medium text-slate-400">
              Menampilkan {(startIndex + 1).toLocaleString('id-ID')}-{endIndex.toLocaleString('id-ID')} dari {totalCampaigns.toLocaleString('id-ID')}{' '}
              Kampanye
            </span>
          </div>
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
