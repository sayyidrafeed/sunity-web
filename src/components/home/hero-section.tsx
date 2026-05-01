import { Link } from 'react-router';

export function HeroSection() {
  return (
    <section className="relative z-0 mx-auto mt-8 max-w-7xl overflow-x-hidden px-6 pb-24">
      <div className="relative min-h-[520px] overflow-visible rounded-[32px]">
        <div className="absolute inset-0 z-0 overflow-hidden rounded-[32px]">
          <img src="/images/solar-panel.png" alt="Solar panel" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="absolute right-4 top-4 z-30 lg:right-7 lg:top-7">
          <div className="flex items-center gap-[6px]">
            <div className="rounded-full bg-brand-surface py-2 pl-5 pr-7 shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
              <span className="font-jakarta text-sm font-medium text-gray-800">Bersama 10.000+ Kontributor</span>
            </div>
            <div className="h-7 w-7 rounded-full border-[3px] border-brand-surface bg-transparent" />
          </div>

          <div className="mt-[-2px] flex justify-end pr-1">
            <div className="flex -space-x-2 rounded-full bg-brand-surface px-2 py-1 shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
              <img src="/images/avatar-1.png" alt="Kontributor 1" className="h-7 w-7 rounded-full border-2 border-brand-surface object-cover" />
              <img src="/images/avatar-2.png" alt="Kontributor 2" className="h-7 w-7 rounded-full border-2 border-brand-surface object-cover" />
              <img src="/images/avatar-3.png" alt="Kontributor 3" className="h-7 w-7 rounded-full border-2 border-brand-surface object-cover" />
              <img src="/images/avatar-4.png" alt="Kontributor 4" className="h-7 w-7 rounded-full border-2 border-brand-surface object-cover" />
            </div>
          </div>
        </div>

        <img
          src="/images/solar-out.png"
          alt="Solar keluar"
          className="absolute bottom-[-150px] right-[-23px] z-10 w-[720px] max-w-none opacity-95 drop-shadow-[0_10px_30px_rgba(0,0,0,0.2)] sm:w-[900px] lg:w-[1248px]"
        />

        <div className="absolute left-6 top-1/2 z-30 max-w-2xl -translate-y-1/2 text-white lg:left-10">
          <h1 className="font-outfit text-4xl font-bold leading-[1.1] tracking-[-0.006em] drop-shadow-[0_0_18px_rgba(0,0,0,0.5)] lg:text-[60px]">
            Bersama Hadirkan Energi Bersih untuk Rumah Ibadah.
          </h1>

          <p className="mt-5 max-w-xl font-jakarta text-base leading-relaxed text-white/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)]">
            Sunity adalah platform donasi berbasis komunitas untuk mendukung pemasangan energi surya di rumah ibadah. Bersama, kita bisa menghadirkan energi bersih dan memberi dampak nyata bagi lingkungan dan masyarakat.
          </p>

          <div className="mt-6 w-fit rounded-full border border-white/45 bg-white/15 p-2 shadow-[0_10px_30px_rgba(0,0,0,0.22)] backdrop-blur-md">
            <Link
              to="/campaigns"
              className="flex items-center gap-4 rounded-full bg-brand-surface px-7 py-3 font-jakarta text-sm font-medium text-brand-green shadow-sm transition-all duration-300 hover:scale-[1.02] hover:bg-[#E6F4EA] hover:shadow-md"
            >
              Lihat Kampanye
              <span className="text-lg">→</span>
            </Link>
          </div>
        </div>

        <div className="absolute -bottom-[88px] left-0 z-20 flex h-[112px] w-full items-center gap-6 bg-brand-surface px-6 [clip-path:polygon(0_0,88%_0,100%_100%,0_100%)] lg:w-[760px] lg:gap-12 lg:px-8">
          <div className="flex items-center gap-3 lg:gap-4">
            <p className="font-outfit text-4xl font-bold leading-none text-brand-green lg:text-[64px]">
              <span className="mr-1 align-top text-base">Rp</span>50jt+
            </p>
            <p className="font-jakarta text-sm font-medium leading-tight text-brand-green lg:text-base">
              Terkumpul
              <br />
              Setiap
              <br />
              Minggu
            </p>
          </div>

          <div className="flex items-center gap-3 lg:gap-4">
            <p className="font-outfit text-4xl font-bold leading-none text-brand-green lg:text-[64px]">1.000+</p>
            <p className="font-jakarta text-sm font-medium leading-tight text-brand-green lg:text-base">
              Kampanye
              <br />
              Berdampak
            </p>
          </div>
        </div>

        <div className="absolute -bottom-[70px] right-7 z-20 hidden gap-4 md:flex">
          <div className="relative rounded-[28px] border border-white/50 bg-white/25 p-2 shadow-[0_12px_30px_rgba(0,0,0,0.2)] backdrop-blur-md">
            <div className="absolute -top-6 left-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/60 bg-brand-green shadow-md">
              <img src="/images/leaf-icon.png" alt="Leaf icon" className="h-7 w-7 object-contain" />
            </div>

            <div className="rounded-[22px] bg-brand-surface px-7 py-5 text-center">
              <p className="font-outfit text-xl font-bold text-brand-green">12 Ton CO₂</p>
              <p className="mt-1 font-jakarta text-xs leading-tight text-gray-700">
                Berhasil
                <br />
                Dikurangi
              </p>
            </div>
          </div>

          <div className="relative rounded-[28px] border border-white/50 bg-white/25 p-2 shadow-[0_12px_30px_rgba(0,0,0,0.2)] backdrop-blur-md">
            <div className="absolute -top-6 left-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/60 bg-brand-green shadow-md">
              <img src="/images/hands-icon.png" alt="Hands icon" className="h-7 w-7 object-contain" />
            </div>

            <div className="rounded-[22px] bg-brand-surface px-7 py-5 text-center">
              <p className="font-outfit text-xl font-bold text-brand-green">2.000+</p>
              <p className="mt-1 font-jakarta text-xs leading-tight text-gray-700">
                Rumah Ibadah
                <br />
                <span className="font-bold">Berhasil Didanai</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}