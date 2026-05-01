const steps = [
  {
    icon: '/images/icon-campaign.png',
    title: 'Kampanye',
    description:
      'Jelajahi Kampanye pemasangan energi surya untuk rumah ibadah di berbagai daerah.',
  },
  {
    icon: '/images/icon-contribute.png',
    title: 'Contribute',
    description:
      'Pilih Kampanye dan berikan donasi sesuai kemampuanmu dengan mudah dan aman.',
  },
  {
    icon: '/images/icon-track.png',
    title: 'Track',
    description:
      'Pantau perkembangan Kampanye dan penggunaan dana secara transparan.',
  },
  {
    icon: '/images/icon-impact.png',
    title: 'Impact',
    description:
      'Lihat dampak nyata dari kontribusimu dalam menghadirkan energi bersih.',
  },
];

export function HowItWorksSection() {
  return (
    <section id="cara-kerja" className="relative overflow-hidden bg-brand-green px-6 py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
        {/* LEFT */}
        <div className="relative z-10 pl-4 lg:pl-8">
          <h2 className="font-outfit text-4xl font-bold leading-tight text-white lg:text-[52px]">
            <span className="text-brand-yellow">Bagaimana</span> Alurnya?
          </h2>

          <div className="mt-10 space-y-8 pl-2">
            {steps.map((step) => (
              <div key={step.title} className="flex items-start gap-6">
                <img
                  src={step.icon}
                  alt={step.title}
                  className="mt-1 h-14 w-14 object-contain"
                />

                <div>
                  <h3 className="font-outfit text-3xl font-bold text-white">{step.title}</h3>

                  <p className="mt-1 max-w-md font-jakarta text-base leading-relaxed text-white/90">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative z-10 flex justify-center">
          <div className="relative h-[520px] w-full max-w-[520px]">
            <div className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-yellow/50 blur-[80px]" />

            <div className="absolute right-4 top-24 h-[330px] w-[190px] rounded-[36px] border-[10px] border-brand-surface bg-brand-yellow" />

            <div className="absolute left-1/2 top-8 h-[440px] w-[260px] -translate-x-1/2 rounded-[34px] bg-[#173D2A] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
              <div className="mx-auto mb-5 flex items-center justify-center gap-2">
                <span className="h-3 w-3 rounded-full bg-white" />
                <span className="h-2 w-20 rounded-full bg-white" />
              </div>

              <div className="h-[350px] rounded-[26px] bg-brand-surface" />
            </div>

            <div className="absolute left-6 top-28 flex items-center gap-2 rounded-lg bg-brand-surface/80 px-4 py-2 shadow-lg backdrop-blur-md">
              <img src="/images/icon-sunity-badge.png" alt="Sunity" className="h-7 w-7 object-contain" />
              <div>
                <p className="font-outfit text-sm font-bold leading-none text-brand-green">Sunity</p>
                <p className="mt-1 font-jakarta text-[10px] font-semibold leading-none text-brand-green/80">
                  Crowdfunding Platform
                </p>
              </div>
            </div>

            <div className="absolute right-0 top-44 flex items-center gap-2 rounded-lg bg-brand-surface/80 px-4 py-2 shadow-lg backdrop-blur-md">
              <img src="/images/icon-shield.png" alt="Aman" className="h-7 w-7 object-contain" />
              <p className="font-jakarta text-sm font-semibold text-brand-green">Aman dan Terpercaya</p>
            </div>

            <div className="absolute left-10 top-72 flex items-center gap-2 rounded-lg bg-brand-surface/80 px-4 py-2 shadow-lg backdrop-blur-md">
              <img src="/images/icon-target.png" alt="Dampak" className="h-7 w-7 object-contain" />
              <p className="font-jakarta text-sm font-semibold text-brand-green">Dampak Terpantau</p>
            </div>

            <div className="absolute bottom-20 right-8 flex items-center gap-2 rounded-lg bg-brand-surface/80 px-4 py-2 shadow-lg backdrop-blur-md">
              <img src="/images/icon-transparency.png" alt="Transparansi" className="h-7 w-7 object-contain" />
              <p className="font-jakarta text-sm font-semibold text-brand-green">Transparansi Penuh</p>
            </div>
          </div>
        </div>
      </div>

      <p className="pointer-events-none absolute bottom-[-80px] left-10 right-8 font-outfit text-[180px] font-bold leading-none text-black/10 lg:text-[400px]">
        Sunity
      </p>
    </section>
  );
}