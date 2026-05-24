import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { Plus, Search, ChevronDown, MoreHorizontal, ArrowRight, CheckCircle2, Clock, Trash2, AlertTriangle, Loader } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { useAdminCampaignsQuery } from '@/hooks/useAdminCampaignsQuery';
import { useUpdateCampaignStatusMutation, useDeleteCampaignMutation } from '@/hooks/useCampaignMutations';

type CampaignStatus = 'DRAFT' | 'AKTIF' | 'INSTALASI' | 'SELESAI' | 'ARCHIVED';

// Custom SVG icon for "Instalasi" matching the mock-up (circle with down arrow pointing to a bar)
function InstalasiIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="8 12 12 16 16 12" />
      <line x1="12" y1="8" x2="12" y2="16" />
    </svg>
  );
}

interface Campaign {
  id: string;
  title: string;
  targetIdr: number;
  raisedIdr: number;
  progressPercent: number;
  status: string;
  coverImage: string | null | undefined;
  deadline: string;
  dateCreated: string;
}

const PREDEFINED_IMAGES = [
  { label: 'Gereja Advent', url: '/images/review-campaign-1.png' },
  { label: 'Masjid Al-Ikhlas', url: '/images/review-campaign-2.png' },
  { label: 'Gereja Katedral', url: '/images/review-campaign-3.png' },
  { label: 'Solar Panel Standard', url: '/public/solar-panel.avif' },
];

export function CampaignsPage() {
  const navigate = useNavigate();

  // Queries and Mutations
  const { data: apiResponse, isLoading, error, isError } = useAdminCampaignsQuery();
  const updateStatusMutation = useUpdateCampaignStatusMutation();
  const deleteMutation = useDeleteCampaignMutation();

  // Transform API response to Campaign interface
  const campaigns: Campaign[] = useMemo(() => {
    if (!apiResponse?.data) return [];
    return apiResponse.data.map((item) => ({
      id: item.id,
      title: item.title,
      targetIdr: item.targetIdr,
      raisedIdr: item.raisedIdr,
      progressPercent: item.progressPercent,
      status: item.status,
      coverImage: item.coverImage?.publicUrl || null,
      deadline: item.deadline,
      dateCreated: '', // API doesn't provide this, fallback to empty
    }));
  }, [apiResponse]);

  // State Management
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'aktif' | 'instalasi' | 'selesai'>('all');

  // Sorting State
  const [sortBy, setSortBy] = useState<'terbaru' | 'batas-waktu' | 'progress-dana'>('terbaru');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [openSortDropdown, setOpenSortDropdown] = useState<'none' | 'terbaru' | 'batas-waktu' | 'progress-dana'>('none');

  // Modal / Dialog States
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  // Active Direct-Status-Change Dropdown State
  const [activeStatusMenuId, setActiveStatusMenuId] = useState<string | null>(null);

  // Active Row Options (Three-dots) Dropdown State
  const [activeActionsMenuId, setActiveActionsMenuId] = useState<string | null>(null);

  // Dynamic Tab Counts
  const tabCounts = useMemo(() => {
    return {
      all: campaigns.length,
      aktif: campaigns.filter((c) => c.status.toUpperCase() === 'AKTIF').length,
      instalasi: campaigns.filter((c) => c.status.toUpperCase() === 'INSTALASI').length,
      selesai: campaigns.filter((c) => c.status.toUpperCase() === 'SELESAI').length,
    };
  }, [campaigns]);

  // Currency Formatter Helper
  const formatIDR = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Close all custom dropdowns
  const closeAllMenus = () => {
    setActiveStatusMenuId(null);
    setActiveActionsMenuId(null);
    setOpenSortDropdown('none');
  };

  // Handle Sort Selection
  const handleSort = (type: 'terbaru' | 'batas-waktu' | 'progress-dana', order: 'asc' | 'desc') => {
    setSortBy(type);
    setSortOrder(order);
    setOpenSortDropdown('none');
  };

  // Process & Filter Campaigns
  const filteredAndSortedCampaigns = useMemo(() => {
    // 1. Search filter
    let result = campaigns.filter((c) => c.title.toLowerCase().includes(searchQuery.toLowerCase()));

    // 2. Tab filter
    if (activeTab !== 'all') {
      result = result.filter((c) => c.status.toUpperCase() === activeTab.toUpperCase());
    }

    // 3. Sorting
    result.sort((a, b) => {
      let valA = 0;
      let valB = 0;

      if (sortBy === 'terbaru') {
        valA = new Date(a.dateCreated || 0).getTime();
        valB = new Date(b.dateCreated || 0).getTime();
      } else if (sortBy === 'batas-waktu') {
        valA = new Date(a.deadline).getTime();
        valB = new Date(b.deadline).getTime();
      } else if (sortBy === 'progress-dana') {
        valA = a.progressPercent;
        valB = b.progressPercent;
      }

      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [campaigns, searchQuery, activeTab, sortBy, sortOrder]);

  // Delete Campaign Opener
  const openDeleteModal = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setIsDeleteOpen(true);
    setActiveActionsMenuId(null);
  };

  // Delete Campaign Submitter
  const handleDeleteSubmit = async () => {
    if (!selectedCampaign) return;
    try {
      await deleteMutation.mutateAsync(selectedCampaign.id);
      setIsDeleteOpen(false);
      toast.success('Kampanye berhasil dihapus');
      setSelectedCampaign(null);
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : 'Gagal menghapus kampanye. Silakan coba lagi.';
      toast.error(errMsg);
    }
  };

  // Change status directly
  const handleStatusChange = async (campaignId: string, newStatus: CampaignStatus) => {
    try {
      await updateStatusMutation.mutateAsync({ campaignId, status: newStatus });
      setActiveStatusMenuId(null);
      toast.success(`Status kampanye berhasil diubah menjadi ${newStatus}`);
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : 'Gagal mengubah status. Silakan coba lagi.';
      toast.error(errMsg);
    }
  };

  return (
    <div className="flex flex-col p-12 gap-10 bg-[#FAF9F6] min-h-screen relative" onClick={closeAllMenus}>
      {/* Header and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-[24px]">
        <h1 className="font-outfit text-[32px] font-semibold text-[#1F1F1D] tracking-[-0.006em]">Kelola Kampanye</h1>

        {/* High fidelity search input */}
        <div
          className="relative w-full md:w-[340px] h-[48px] bg-white rounded-full border border-[#E5E5E3] px-5 flex items-center shadow-sm hover:border-[#2F6B3F]/50 transition-colors focus-within:!border-[#2F6B3F] focus-within:ring-1 focus-within:ring-[#2F6B3F]/20"
          onClick={(e) => e.stopPropagation()}
        >
          <input
            type="text"
            placeholder="Cari Kampanye..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-full bg-transparent border-none outline-none font-jakarta text-[14px] text-[#1F1F1D] placeholder:text-[#A3A39E]"
          />
          <Search className="w-5 h-5 text-[#A3A39E] flex-shrink-0 absolute right-5 pointer-events-none" />
        </div>
      </div>

      {/* Actions: + Buat Kampanye */}
      <div className="flex justify-start">
        <button
          type="button"
          onClick={() => {
            navigate('/admin/campaigns/create');
          }}
          className="bg-[#2F6B3F] hover:bg-[#245330] text-white font-jakarta font-semibold text-[14px] px-[24px] py-[12px] rounded-full flex items-center gap-[8px] transition-colors cursor-pointer shadow-sm active:scale-[0.98]"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          Buat Kampanye
        </button>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center p-16 bg-white border border-[#E5E5E3] rounded-[24px] gap-4">
          <Loader className="w-8 h-8 text-[#2F6B3F] animate-spin" />
          <span className="font-jakarta text-[14px] text-[#5A5A57]">Memuat kampanye...</span>
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="flex flex-col items-center justify-center p-16 bg-white border border-[#E5E5E3] rounded-[24px] gap-4">
          <AlertTriangle className="w-8 h-8 text-[#D32124]" />
          <div className="flex flex-col items-center gap-2">
            <span className="font-jakarta text-[16px] text-[#1F1F1D] font-medium">Gagal memuat kampanye</span>
            <span className="font-jakarta text-[14px] text-[#5A5A57]">{error instanceof Error ? error.message : 'Terjadi kesalahan'}</span>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#2F6B3F] hover:bg-[#245330] text-white font-jakarta font-semibold text-[14px] px-[20px] py-[10px] rounded-full transition-colors cursor-pointer h-[40px] active:scale-[0.98] mt-2"
          >
            Coba Lagi
          </button>
        </div>
      )}

      {/* Tabs and Filters section - only show if not loading/error */}
      {!isLoading && !isError && (
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-[24px] border-b border-[#E5E5E3] pb-[1px]">
          {/* Left Tabs with dynamic counts */}
          <div className="flex items-center gap-[24px] overflow-x-auto select-none">
            {(['all', 'aktif', 'instalasi', 'selesai'] as const).map((tab) => {
              const isActive = activeTab === tab;
              const label = tab === 'all' ? 'All' : tab.charAt(0).toUpperCase() + tab.slice(1).toLowerCase();
              const count = tabCounts[tab];

              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`relative font-jakarta text-[15px] leading-[20px] pb-[14px] transition-colors cursor-pointer whitespace-nowrap ${
                    isActive ? 'font-bold text-[#2F6B3F]' : 'font-normal text-[#A3A39E] hover:text-[#5A5A57]'
                  }`}
                >
                  {label} ({count}){isActive && <div className="absolute bottom-[-1px] left-0 right-0 h-[3px] bg-[#2F6B3F] rounded-full" />}
                </button>
              );
            })}
          </div>

          {/* Right Sorting filters */}
          <div className="flex flex-wrap items-center gap-[12px] pb-[12px] lg:pb-0" onClick={(e) => e.stopPropagation()}>
            {/* SORT 1: Terbaru */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setOpenSortDropdown(openSortDropdown === 'terbaru' ? 'none' : 'terbaru')}
                className={`bg-white border border-[#E5E5E3] text-[#5A5A57] hover:text-[#1F1F1D] font-jakarta text-[14px] px-[16px] py-[8px] rounded-full flex items-center gap-[6px] cursor-pointer hover:bg-[#FAF9F6] transition-colors shadow-sm select-none ${
                  sortBy === 'terbaru' ? 'border-[#2F6B3F] text-[#2F6B3F] font-medium' : ''
                }`}
              >
                <span>Terbaru</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openSortDropdown === 'terbaru' ? 'rotate-180' : ''}`} />
              </button>
              {openSortDropdown === 'terbaru' && (
                <div className="absolute right-0 mt-2 w-[160px] bg-white border border-[#E5E5E3] rounded-[16px] shadow-lg py-2 z-30 font-jakarta text-[14px]">
                  <button
                    type="button"
                    onClick={() => handleSort('terbaru', 'desc')}
                    className={`w-full text-left px-4 py-2 hover:bg-[#FAF9F6] transition-colors ${sortBy === 'terbaru' && sortOrder === 'desc' ? 'text-[#2F6B3F] font-semibold' : 'text-[#5A5A57]'}`}
                  >
                    Terbaru Dahulu
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSort('terbaru', 'asc')}
                    className={`w-full text-left px-4 py-2 hover:bg-[#FAF9F6] transition-colors ${sortBy === 'terbaru' && sortOrder === 'asc' ? 'text-[#2F6B3F] font-semibold' : 'text-[#5A5A57]'}`}
                  >
                    Terlama Dahulu
                  </button>
                </div>
              )}
            </div>

            {/* SORT 2: Batas Waktu */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setOpenSortDropdown(openSortDropdown === 'batas-waktu' ? 'none' : 'batas-waktu')}
                className={`bg-white border border-[#E5E5E3] text-[#5A5A57] hover:text-[#1F1F1D] font-jakarta text-[14px] px-[16px] py-[8px] rounded-full flex items-center gap-[6px] cursor-pointer hover:bg-[#FAF9F6] transition-colors shadow-sm select-none ${
                  sortBy === 'batas-waktu' ? 'border-[#2F6B3F] text-[#2F6B3F] font-medium' : ''
                }`}
              >
                <span>Batas Waktu</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openSortDropdown === 'batas-waktu' ? 'rotate-180' : ''}`} />
              </button>
              {openSortDropdown === 'batas-waktu' && (
                <div className="absolute right-0 mt-2 w-[160px] bg-white border border-[#E5E5E3] rounded-[16px] shadow-lg py-2 z-30 font-jakarta text-[14px]">
                  <button
                    type="button"
                    onClick={() => handleSort('batas-waktu', 'asc')}
                    className={`w-full text-left px-4 py-2 hover:bg-[#FAF9F6] transition-colors ${sortBy === 'batas-waktu' && sortOrder === 'asc' ? 'text-[#2F6B3F] font-semibold' : 'text-[#5A5A57]'}`}
                  >
                    Tenggat Terdekat
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSort('batas-waktu', 'desc')}
                    className={`w-full text-left px-4 py-2 hover:bg-[#FAF9F6] transition-colors ${sortBy === 'batas-waktu' && sortOrder === 'desc' ? 'text-[#2F6B3F] font-semibold' : 'text-[#5A5A57]'}`}
                  >
                    Tenggat Terjauh
                  </button>
                </div>
              )}
            </div>

            {/* SORT 3: Progress Dana */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setOpenSortDropdown(openSortDropdown === 'progress-dana' ? 'none' : 'progress-dana')}
                className={`bg-white border border-[#E5E5E3] text-[#5A5A57] hover:text-[#1F1F1D] font-jakarta text-[14px] px-[16px] py-[8px] rounded-full flex items-center gap-[6px] cursor-pointer hover:bg-[#FAF9F6] transition-colors shadow-sm select-none ${
                  sortBy === 'progress-dana' ? 'border-[#2F6B3F] text-[#2F6B3F] font-medium' : ''
                }`}
              >
                <span>Progress Dana</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openSortDropdown === 'progress-dana' ? 'rotate-180' : ''}`} />
              </button>
              {openSortDropdown === 'progress-dana' && (
                <div className="absolute right-0 mt-2 w-[180px] bg-white border border-[#E5E5E3] rounded-[16px] shadow-lg py-2 z-30 font-jakarta text-[14px]">
                  <button
                    type="button"
                    onClick={() => handleSort('progress-dana', 'desc')}
                    className={`w-full text-left px-4 py-2 hover:bg-[#FAF9F6] transition-colors ${sortBy === 'progress-dana' && sortOrder === 'desc' ? 'text-[#2F6B3F] font-semibold' : 'text-[#5A5A57]'}`}
                  >
                    Progress Tertinggi
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSort('progress-dana', 'asc')}
                    className={`w-full text-left px-4 py-2 hover:bg-[#FAF9F6] transition-colors ${sortBy === 'progress-dana' && sortOrder === 'asc' ? 'text-[#2F6B3F] font-semibold' : 'text-[#5A5A57]'}`}
                  >
                    Progress Terendah
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Campaigns Cards List - only show if not loading/error */}
      {!isLoading && !isError && (
        <div className="flex flex-col gap-6 w-full max-w-[1034px] pb-12">
          {filteredAndSortedCampaigns.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-16 bg-white border border-[#E5E5E3] rounded-[24px] text-center gap-2">
              <span className="font-jakarta text-[16px] text-[#A3A39E] font-medium">
                Tidak ada kampanye yang cocok dengan pencarian atau filter Anda.
              </span>
            </div>
          ) : (
            filteredAndSortedCampaigns.map((campaign) => {
              const isSelesai = campaign.status.toUpperCase() === 'SELESAI';
              const isAktif = campaign.status.toUpperCase() === 'AKTIF';
              const isInstalasi = campaign.status.toUpperCase() === 'INSTALASI';

              // Badge color scheme
              let badgeBg = '';
              let badgeText = '';
              let badgeIcon = null;

              if (isSelesai) {
                badgeBg = 'bg-[#E6F4EA]';
                badgeText = 'text-[#137333]';
                badgeIcon = <CheckCircle2 className="w-[16px] h-[16px] text-[#137333] flex-shrink-0" />;
              } else if (isAktif) {
                badgeBg = 'bg-[#E8F0FE]';
                badgeText = 'text-[#3F5AF4]';
                badgeIcon = <Clock className="w-[16px] h-[16px] text-[#3F5AF4] flex-shrink-0" />;
              } else if (isInstalasi) {
                badgeBg = 'bg-[#FEF3C7]';
                badgeText = 'text-[#D97706]';
                badgeIcon = <InstalasiIcon className="w-[16px] h-[16px] text-[#D97706] flex-shrink-0" />;
              }

              return (
                <div
                  key={campaign.id}
                  className="bg-white border border-[#E5E5E3] rounded-[24px] p-[24px] flex flex-col md:flex-row gap-[24px] transition-shadow hover:shadow-[0_4px_20px_rgba(0,0,0,0.05)] relative"
                >
                  {/* Left side: Cover Image */}
                  <div className="w-full md:w-[240px] h-[140px] rounded-[16px] overflow-hidden flex-shrink-0 bg-[#E5E5E3]">
                    <img
                      src={campaign.coverImage || PREDEFINED_IMAGES[0].url}
                      alt={campaign.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = PREDEFINED_IMAGES[0].url;
                      }}
                    />
                  </div>

                  {/* Right side: details and actions */}
                  <div className="flex-1 flex flex-col justify-between py-[4px] gap-[16px]">
                    {/* Title & Top Right Status Badge / Actions */}
                    <div className="flex flex-col md:flex-row justify-between items-start gap-[12px] pr-0 md:pr-[120px]">
                      <h3 className="font-outfit font-bold text-[20px] leading-[25px] text-[#1F1F1D]">{campaign.title}</h3>
                    </div>

                    {/* Fund Details and Progress bar */}
                    <div className="flex flex-col gap-[8px]">
                      <div className="font-jakarta text-[16px] leading-[20px]">
                        <span className="font-bold text-[#2F6B3F]">{formatIDR(campaign.raisedIdr)}</span>
                        <span className="font-normal text-[#A3A39E]">/{formatIDR(campaign.targetIdr)} terkumpul</span>
                      </div>

                      {/* Progress Bar Container */}
                      <div className="w-full md:w-[480px] h-[10px] bg-[#EAF0EC] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#2F6B3F] rounded-full transition-all duration-500"
                          style={{ width: `${Math.min(campaign.progressPercent, 100)}%` }}
                        />
                      </div>
                    </div>

                    {/* Action Buttons (Bottom Right) */}
                    <div className="flex justify-end gap-[12px] mt-auto">
                      <button
                        type="button"
                        onClick={() => navigate('/admin/monitoring')}
                        className="bg-[#2F6B3F] hover:bg-[#245330] text-white font-jakarta font-semibold text-[14px] px-[20px] py-[10px] rounded-full flex items-center gap-[6px] transition-colors cursor-pointer h-[40px] active:scale-[0.98]"
                      >
                        Lihat Detail
                        <ArrowRight className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </div>

                  {/* Absolute status badge & Options (Top Right) */}
                  <div className="absolute top-[24px] right-[24px] flex items-center gap-[12px]" onClick={(e) => e.stopPropagation()}>
                    {/* Status Dropdown Badge */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setActiveStatusMenuId(activeStatusMenuId === campaign.id ? null : campaign.id)}
                        className={`${badgeBg} ${badgeText} font-jakarta font-medium text-[13px] px-[12px] py-[6px] rounded-full flex items-center gap-[6px] border border-transparent hover:border-black/10 transition-all cursor-pointer`}
                      >
                        {badgeIcon}
                        <span>{campaign.status.charAt(0) + campaign.status.slice(1).toLowerCase()}</span>
                        <ChevronDown className="w-[12px] h-[12px] opacity-70" />
                      </button>

                      {activeStatusMenuId === campaign.id && (
                        <div className="absolute right-0 mt-2 w-[140px] bg-white border border-[#E5E5E3] rounded-[16px] shadow-lg py-2 z-20 font-jakarta text-[13px]">
                          <button
                            type="button"
                            onClick={() => handleStatusChange(campaign.id, 'AKTIF')}
                            className="w-full text-left px-4 py-2 hover:bg-[#FAF9F6] text-[#3F5AF4] hover:text-[#2d40b3] font-medium flex items-center gap-2"
                          >
                            <Clock className="w-3.5 h-3.5" />
                            Aktif
                          </button>
                          <button
                            type="button"
                            onClick={() => handleStatusChange(campaign.id, 'INSTALASI')}
                            className="w-full text-left px-4 py-2 hover:bg-[#FAF9F6] text-[#D97706] hover:text-[#b46205] font-medium flex items-center gap-2"
                          >
                            <InstalasiIcon className="w-3.5 h-3.5" />
                            Instalasi
                          </button>
                          <button
                            type="button"
                            onClick={() => handleStatusChange(campaign.id, 'SELESAI')}
                            className="w-full text-left px-4 py-2 hover:bg-[#FAF9F6] text-[#137333] hover:text-[#0a4d20] font-medium flex items-center gap-2"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Selesai
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Actions Trigger (Three-dots) */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setActiveActionsMenuId(activeActionsMenuId === campaign.id ? null : campaign.id)}
                        className="p-2 hover:bg-[#FAF9F6] rounded-full border border-transparent hover:border-[#E5E5E3] transition-colors cursor-pointer text-[#5A5A57]"
                      >
                        <MoreHorizontal className="w-[20px] h-[20px]" />
                      </button>

                      {activeActionsMenuId === campaign.id && (
                        <div className="absolute right-0 mt-2 w-[160px] bg-white border border-[#E5E5E3] rounded-[16px] shadow-lg py-2 z-20 font-jakarta text-[13px]">
                          <button
                            type="button"
                            onClick={() => openDeleteModal(campaign)}
                            className="w-full text-left px-4 py-2 hover:bg-[#FAF9F6] text-[#D32124] flex items-center gap-2"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Hapus Kampanye
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* DELETE CAMPAIGN CONFIRMATION DIALOG */}
      <Dialog open={isDeleteOpen} onOpenChange={(open) => !open && setIsDeleteOpen(false)}>
        <DialogContent className="max-w-[90vw] md:max-w-md bg-[#FAF9F6] rounded-[24px] border-[#E5E5E3] p-[24px] gap-[20px] !rounded-[24px] text-[#1F1F1D]">
          <DialogHeader className="flex flex-col items-center text-center gap-2">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-[#D32124]">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <DialogTitle className="font-outfit font-semibold text-[20px] text-[#1F1F1D]">Hapus Kampanye</DialogTitle>
          </DialogHeader>

          <p className="font-jakarta text-[14px] text-[#5A5A57] text-center leading-relaxed">
            Apakah Anda yakin ingin menghapus kampanye <strong>"{selectedCampaign?.title}"</strong>? Tindakan ini tidak dapat dibatalkan.
          </p>

          <DialogFooter className="flex flex-col-reverse sm:flex-row justify-center gap-3 w-full sm:space-x-0">
            <button
              type="button"
              onClick={() => setIsDeleteOpen(false)}
              disabled={deleteMutation.isPending}
              className="w-full sm:w-auto rounded-full px-6 py-2.5 font-jakarta font-semibold text-[14px] text-[#5A5A57] border border-[#E5E5E3] hover:bg-gray-50 transition-colors h-[40px] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={handleDeleteSubmit}
              disabled={deleteMutation.isPending}
              className="w-full sm:w-auto bg-[#D32124] hover:bg-[#b01b1e] text-white rounded-full px-6 py-2.5 font-jakarta font-semibold text-[14px] transition-colors h-[40px] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {deleteMutation.isPending && <Loader className="w-4 h-4 animate-spin" />}
              Hapus
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CampaignsPage;
