import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { useEnergyMonitoring } from '@/hooks/use-energy-monitoring';
import { MonitoringKPICards } from './monitoring-kpi-cards';
import { MonitoringChart } from './monitoring-chart';
import { MonitoringTable } from './monitoring-table';
import { MonitoringDialog } from './monitoring-dialog';
import { Skeleton } from '@/components/ui/skeleton';
import type { EnergyData } from '@/types/energy-monitoring';

export function MonitoringPage() {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useEnergyMonitoring();
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedEnergyData, setSelectedEnergyData] = useState<EnergyData | null>(null);

  const handleEditClick = (item: EnergyData) => {
    setSelectedEnergyData(item);
    setIsDialogOpen(true);
  };

  const handleCreateClick = () => {
    setSelectedEnergyData(null);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setSelectedEnergyData(null);
    setIsDialogOpen(false);
  };

  return (
    <div className="flex flex-col p-12 gap-10 bg-[#FAF9F6] min-h-screen">
      {/* Header and Breadcrumbs */}
      <div className="flex flex-col gap-[8px]">
        <div className="flex items-center gap-[12px]">
          <button
            onClick={() => navigate(-1)}
            className="p-[4px] hover:bg-[#E5E5E3] rounded-full transition-colors cursor-pointer"
            aria-label="Kembali"
          >
            <ArrowLeft className="w-[32px] h-[32px] text-black" />
          </button>
          <h1 className="font-outfit text-[32px] font-semibold text-[#1F1F1D] tracking-[-0.006em]">Monitoring Energi</h1>
        </div>
        <nav className="font-jakarta text-[14px] text-[#A3A39E]" aria-label="Breadcrumb">
          Kelola Kampanye &gt; Masjid Al - Ikhlas &gt; <span className="text-[#5A5A57] font-medium">Monitoring Energi</span>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col gap-8 w-full max-w-[1034px]">
        {isLoading ? (
          // Loading Skeletons
          <div className="flex flex-col gap-8 w-full">
            {/* KPI Cards Skeletons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border border-[#E5E5E3] bg-white rounded-[24px] p-[24px] flex flex-col gap-[16px]">
                  <div className="flex items-center gap-[12px]">
                    <Skeleton className="w-[40px] h-[40px] rounded-full bg-[#E5E5E3]" />
                    <Skeleton className="h-[20px] w-[120px] bg-[#E5E5E3]" />
                  </div>
                  <div className="flex flex-col gap-[6px]">
                    <Skeleton className="h-[48px] w-[180px] bg-[#E5E5E3]" />
                    <Skeleton className="h-[14px] w-[80px] bg-[#E5E5E3]" />
                  </div>
                </div>
              ))}
            </div>

            {/* Chart Skeleton */}
            <div className="border border-[#E5E5E3] bg-white rounded-[24px] p-[24px] flex flex-col gap-[24px]">
              <div className="flex gap-[24px]">
                <Skeleton className="h-[20px] w-[100px] bg-[#E5E5E3]" />
                <Skeleton className="h-[20px] w-[130px] bg-[#E5E5E3]" />
                <Skeleton className="h-[20px] w-[120px] bg-[#E5E5E3]" />
              </div>
              <Skeleton className="h-[320px] w-full rounded-[12px] bg-[#E5E5E3]" />
            </div>

            {/* Table Skeleton */}
            <div className="flex flex-col gap-[24px]">
              <div className="flex items-center justify-between">
                <Skeleton className="h-[30px] w-[200px] bg-[#E5E5E3]" />
                <Skeleton className="h-[44px] w-[140px] rounded-full bg-[#E5E5E3]" />
              </div>
              <div className="border border-[#E5E5E3] bg-white rounded-[24px] overflow-hidden">
                <div className="p-[24px] flex flex-col gap-[16px]">
                  <Skeleton className="h-[40px] w-full bg-[#E5E5E3]" />
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Skeleton key={i} className="h-[52px] w-full bg-[#E5E5E3]" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : isError || !data ? (
          // Error State
          <div className="flex flex-col items-center justify-center p-12 bg-white border border-[#E5E5E3] rounded-[24px]">
            <p className="font-jakarta font-medium text-[16px] text-brand-danger">
              Gagal memuat data monitoring energi. Silakan coba beberapa saat lagi.
            </p>
          </div>
        ) : (
          // Render Dashboard Sub-components
          <>
            <MonitoringKPICards kpi={data.kpi} />
            <MonitoringChart data={data.chartData} />
            <MonitoringTable
              data={data.tableData}
              onEditClick={handleEditClick}
              onCreateClick={handleCreateClick}
              pendingDeleteId={pendingDeleteId}
              setPendingDeleteId={setPendingDeleteId}
            />
            <MonitoringDialog isOpen={isDialogOpen} onClose={handleDialogClose} energyData={selectedEnergyData} />
          </>
        )}
      </div>
    </div>
  );
}
export default MonitoringPage;
