import { useSearchParams } from 'react-router';
import { CampaignCard } from './campaign-card';
import { Pagination } from '@/components/ui/pagination';

const MOCK_CAMPAIGNS = [
  {
    id: '1',
    title: 'Dukung Pembangunan Rumah Ibadah',
    worshipPlace: { name: 'Gereja Katolik', city: 'Jakarta', religionType: 'Katolik' },
    targetIdr: 100000000,
    raisedIdr: 70000000,
    deadline: '2026-06-15T00:00:00Z',
    progressPercent: 70,
    coverImage: { publicUrl: '/images/campaigns/featured/campaign-besakih.png' },
  },
  {
    id: '2',
    title: 'Dukung Pembangunan Rumah Ibadah',
    worshipPlace: { name: 'Gereja Protestan', city: 'Jakarta', religionType: 'Protestan' },
    targetIdr: 100000000,
    raisedIdr: 70000000,
    deadline: '2026-06-15T00:00:00Z',
    progressPercent: 70,
    coverImage: { publicUrl: '/images/campaigns/featured/campaign-klenteng.png' },
  },
  {
    id: '3',
    title: 'Dukung Pembangunan Rumah Ibadah',
    worshipPlace: { name: 'Masjid Al-Ikhlas', city: 'Jakarta', religionType: 'Islam' },
    targetIdr: 100000000,
    raisedIdr: 70000000,
    deadline: '2026-06-15T00:00:00Z',
    progressPercent: 70,
    coverImage: { publicUrl: '/images/campaigns/featured/campaign-vihara.png' },
  },
  {
    id: '4',
    title: 'Dukung Pembangunan Rumah Ibadah',
    worshipPlace: { name: 'Vihara Buddha', city: 'Jakarta', religionType: 'Buddha' },
    targetIdr: 100000000,
    raisedIdr: 70000000,
    deadline: '2026-06-15T00:00:00Z',
    progressPercent: 70,
    coverImage: { publicUrl: '/images/campaigns/featured/campaign-besakih.png' },
  },
  {
    id: '5',
    title: 'Dukung Pembangunan Rumah Ibadah',
    worshipPlace: { name: 'Pura Hindu', city: 'Jakarta', religionType: 'Hindu' },
    targetIdr: 100000000,
    raisedIdr: 70000000,
    deadline: '2026-06-15T00:00:00Z',
    progressPercent: 70,
    coverImage: { publicUrl: '/images/campaigns/featured/campaign-klenteng.png' },
  },
  {
    id: '6',
    title: 'Dukung Pembangunan Rumah Ibadah',
    worshipPlace: { name: 'Klenteng Konghucu', city: 'Jakarta', religionType: 'Konghucu' },
    targetIdr: 100000000,
    raisedIdr: 70000000,
    deadline: '2026-06-15T00:00:00Z',
    progressPercent: 70,
    coverImage: { publicUrl: '/images/campaigns/featured/campaign-vihara.png' },
  },
  // Repeat for 12 items as in design
  {
    id: '7',
    title: 'Dukung Pembangunan Rumah Ibadah',
    worshipPlace: { name: 'Gereja Katolik', city: 'Jakarta', religionType: 'Katolik' },
    targetIdr: 100000000,
    raisedIdr: 70000000,
    deadline: '2026-06-15T00:00:00Z',
    progressPercent: 70,
    coverImage: { publicUrl: '/images/campaigns/featured/campaign-besakih.png' },
  },
  {
    id: '8',
    title: 'Dukung Pembangunan Rumah Ibadah',
    worshipPlace: { name: 'Gereja Protestan', city: 'Jakarta', religionType: 'Protestan' },
    targetIdr: 100000000,
    raisedIdr: 70000000,
    deadline: '2026-06-15T00:00:00Z',
    progressPercent: 70,
    coverImage: { publicUrl: '/images/campaigns/featured/campaign-klenteng.png' },
  },
  {
    id: '9',
    title: 'Dukung Pembangunan Rumah Ibadah',
    worshipPlace: { name: 'Masjid Al-Ikhlas', city: 'Jakarta', religionType: 'Islam' },
    targetIdr: 100000000,
    raisedIdr: 70000000,
    deadline: '2026-06-15T00:00:00Z',
    progressPercent: 70,
    coverImage: { publicUrl: '/images/campaigns/featured/campaign-vihara.png' },
  },
  {
    id: '10',
    title: 'Dukung Pembangunan Rumah Ibadah',
    worshipPlace: { name: 'Vihara Buddha', city: 'Jakarta', religionType: 'Buddha' },
    targetIdr: 100000000,
    raisedIdr: 70000000,
    deadline: '2026-06-15T00:00:00Z',
    progressPercent: 70,
    coverImage: { publicUrl: '/images/campaigns/featured/campaign-besakih.png' },
  },
  {
    id: '11',
    title: 'Dukung Pembangunan Rumah Ibadah',
    worshipPlace: { name: 'Pura Hindu', city: 'Jakarta', religionType: 'Hindu' },
    targetIdr: 100000000,
    raisedIdr: 70000000,
    deadline: '2026-06-15T00:00:00Z',
    progressPercent: 70,
    coverImage: { publicUrl: '/images/campaigns/featured/campaign-klenteng.png' },
  },
  {
    id: '12',
    title: 'Dukung Pembangunan Rumah Ibadah',
    worshipPlace: { name: 'Klenteng Konghucu', city: 'Jakarta', religionType: 'Konghucu' },
    targetIdr: 100000000,
    raisedIdr: 70000000,
    deadline: '2026-06-15T00:00:00Z',
    progressPercent: 70,
    coverImage: { publicUrl: '/images/campaigns/featured/campaign-vihara.png' },
  },
];

export function CampaignList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') ?? '1', 10);

  const totalCampaigns = 1024;
  const itemsPerPage = 12;
  const totalPages = Math.ceil(totalCampaigns / itemsPerPage);

  const handlePageChange = (page: number) => {
    setSearchParams((prev) => {
      prev.set('page', page.toString());
      return prev;
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="mt-12 flex flex-col gap-8 pb-20">
      <div className="flex flex-col gap-2">
        <h2 className="font-outfit text-2xl font-bold text-brand-text">Kampanye Aktif</h2>
        <div className="h-px w-full bg-[#DDD]" />
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
        {MOCK_CAMPAIGNS.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex flex-col items-end gap-4">
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        <span className="text-[12px] font-medium text-slate-400">
          Menampilkan {itemsPerPage} dari {totalCampaigns.toLocaleString('id-ID')} Kampanye
        </span>
      </div>
    </section>
  );
}
