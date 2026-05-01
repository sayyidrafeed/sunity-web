export function HeroSection() {
  return (
    <section className="relative z-0 mx-auto mt-8 max-w-7xl px-6 pb-24">
      <div className="relative min-h-[520px] overflow-visible rounded-[32px]">
        <div className="absolute inset-0 z-0 overflow-hidden rounded-[32px]">
          <img src="/images/solar-panel.png" alt="Solar panel" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <img
          src="/images/solar-out.png"
          alt="Solar keluar"
          className="absolute right-[-24px] bottom-[-155px] z-10 w-[1248px] max-w-none opacity-95 drop-shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
        />

        <div className="absolute left-10 top-1/2 z-20 max-w-2xl -translate-y-1/2 text-white">
          <h1 className="font-outfit text-[60px] font-bold leading-[1.1] tracking-[-0.006em] drop-shadow-[0_0_18px_rgba(0,0,0,0.5)]">
            Bersama Hadirkan Energi Bersih untuk Rumah Ibadah.
          </h1>

          <p className="mt-5 max-w-xl font-jakarta text-base leading-relaxed text-white/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)]">
            Sunity adalah platform donasi berbasis komunitas untuk mendukung pemasangan energi surya di rumah ibadah. Bersama, kita bisa menghadirkan
            energi bersih dan memberi dampak nyata bagi lingkungan dan masyarakat.
          </p>

          <div className="mt-6 w-fit rounded-full border border-white/45 bg-white/15 p-2 shadow-[0_10px_30px_rgba(0,0,0,0.22)] backdrop-blur-md">
            <button className="flex items-center gap-4 rounded-full bg-[#FAF9F6] px-7 py-3 font-jakarta text-sm font-medium text-brand-green shadow-sm transition hover:bg-[#E6F4EA]">
              Lihat Kampanye
              <span className="text-lg">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
