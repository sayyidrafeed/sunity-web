/**
 * MonitoringPage — /admin/monitoring
 *
 * Empty state shown when no energy monitoring data is available.
 * Data will be available after a campaign is complete and installation
 * is confirmed.
 */
export function MonitoringPage() {
  return (
    <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: '#FAF9F6' }}>
      <section
        className="flex flex-col items-center gap-[8px]"
        style={{ width: '398px' }}
        aria-labelledby="monitoring-empty-title"
        aria-describedby="monitoring-empty-desc"
      >
        {/* Illustration */}
        <div className="flex items-center justify-center" style={{ width: '234px', height: '184px' }}>
          <img src="/404-dashboard.avif" alt="Ilustrasi tidak ada data monitoring energi" className="w-full h-full object-contain" />
        </div>

        {/* Text block */}
        <div className="flex flex-col items-center gap-[4px]" style={{ width: '398px' }}>
          <h1
            id="monitoring-empty-title"
            className="font-outfit font-medium text-[24px] leading-[30px] text-center tracking-[-0.006em] w-full"
            style={{ color: '#1F1F1D' }}
          >
            Tidak Ada Hasil
          </h1>
          <p
            id="monitoring-empty-desc"
            className="font-jakarta font-normal text-[18px] leading-[23px] text-center tracking-[-0.006em] w-full"
            style={{ color: '#5A5A57' }}
          >
            Dashboard Energi tersedia setelah kampanye selesai dan instalasi terkonfirmasi.
          </p>
        </div>
      </section>
    </div>
  );
}
