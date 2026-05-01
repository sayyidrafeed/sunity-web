import { useEffect, useState } from 'react';

const banners = [
  {
    title: 'Hadirkan Cahaya Surya, Terangi Kesucian Pura Besakih',
    image: '/images/campaign-besakih.png',
    text: 'text-white',
    gradient: 'from-brand-green via-[#3B9858] to-brand-green',
  },
  {
    title: 'Dukung Klenteng Hong Tiek Terus Beroperasi',
    image: '/images/campaign-klenteng.png',
    text: 'text-[#8B1E1E]',
    gradient: 'from-brand-yellow via-[#FFD96A] to-[#E9B833]',
  },
  {
    title: 'Menjaga Kelestarian Bumi, Menjaga Kesucian Vihara.',
    image: '/images/campaign-vihara.png',
    text: 'text-white',
    gradient: 'from-[#C84A3D] via-[#D76859] to-[#A93A31]',
  },
];

const worshipOptions = ['Masjid', 'Gereja', 'Pura', 'Vihara', 'Klenteng'];
const statusOptions = ['Butuh Dukungan', 'Sedang Berjalan', 'Terdanai', 'Selesai'];

const activeCampaigns = [
  {
    id: 1,
    title: 'Dukung Pembangunan Rumah Ibadah',
    location: 'Jakarta',
    category: 'Katolik',
    collected: 'Rp50.000.000',
    daysLeft: 20,
    progress: 50,
    target: 'Rp100.000.000',
    image: '/images/campaign-card-1.png',
  },
  {
    id: 2,
    title: 'Bantu Panel Surya untuk Gereja Santo Paulus',
    location: 'Bandung',
    category: 'Katolik',
    collected: 'Rp72.000.000',
    daysLeft: 14,
    progress: 72,
    target: 'Rp100.000.000',
    image: '/images/campaign-card-2.png',
  },
  {
    id: 3,
    title: 'Terangi Rumah Ibadah di Pelosok Desa',
    location: 'Yogyakarta',
    category: 'Katolik',
    collected: 'Rp35.000.000',
    daysLeft: 28,
    progress: 35,
    target: 'Rp100.000.000',
    image: '/images/campaign-card-3.png',
  },
  {
    id: 4,
    title: 'Energi Bersih untuk Kapel Maria',
    location: 'Surabaya',
    category: 'Katolik',
    collected: 'Rp90.000.000',
    daysLeft: 8,
    progress: 90,
    target: 'Rp100.000.000',
    image: '/images/campaign-card-4.png',
  },
  {
    id: 5,
    title: 'Bantu Gereja Hemat Energi Surya',
    location: 'Semarang',
    category: 'Katolik',
    collected: 'Rp45.000.000',
    daysLeft: 22,
    progress: 45,
    target: 'Rp100.000.000',
    image: '/images/campaign-card-5.png',
  },
  {
    id: 6,
    title: 'Panel Surya untuk Rumah Doa',
    location: 'Malang',
    category: 'Katolik',
    collected: 'Rp60.000.000',
    daysLeft: 18,
    progress: 60,
    target: 'Rp100.000.000',
    image: '/images/campaign-card-6.png',
  },
  {
    id: 7,
    title: 'Cahaya Surya untuk Komunitas Iman',
    location: 'Denpasar',
    category: 'Katolik',
    collected: 'Rp25.000.000',
    daysLeft: 31,
    progress: 25,
    target: 'Rp100.000.000',
    image: '/images/campaign-card-7.png',
  },
  {
    id: 8,
    title: 'Dukung Energi Mandiri Gereja',
    location: 'Medan',
    category: 'Katolik',
    collected: 'Rp80.000.000',
    daysLeft: 10,
    progress: 80,
    target: 'Rp100.000.000',
    image: '/images/campaign-card-8.png',
  },
  {
    id: 9,
    title: 'Wujudkan Rumah Ibadah Ramah Lingkungan',
    location: 'Makassar',
    category: 'Katolik',
    collected: 'Rp40.000.000',
    daysLeft: 24,
    progress: 40,
    target: 'Rp100.000.000',
    image: '/images/campaign-card-9.png',
  },
  {
    id: 10,
    title: 'Bantu Instalasi Panel Surya Paroki',
    location: 'Bogor',
    category: 'Katolik',
    collected: 'Rp65.000.000',
    daysLeft: 16,
    progress: 65,
    target: 'Rp100.000.000',
    image: '/images/campaign-card-10.png',
  },
  {
    id: 11,
    title: 'Energi Terbarukan untuk Rumah Ibadah',
    location: 'Tangerang',
    category: 'Katolik',
    collected: 'Rp55.000.000',
    daysLeft: 19,
    progress: 55,
    target: 'Rp100.000.000',
    image: '/images/campaign-card-11.png',
  },
  {
    id: 12,
    title: 'Gerakan Surya untuk Gereja Lokal',
    location: 'Bekasi',
    category: 'Katolik',
    collected: 'Rp30.000.000',
    daysLeft: 27,
    progress: 30,
    target: 'Rp100.000.000',
    image: '/images/campaign-card-12.png',
  },
];

export default function Campaigns() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [openDropdown, setOpenDropdown] = useState<'worship' | 'status' | null>(null);
  const [selectedWorship, setSelectedWorship] = useState('Rumah Ibadah');
  const [selectedStatus, setSelectedStatus] = useState('Status');

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveIndex((current) => (current + 1) % banners.length);
    }, 3000);

    return () => clearTimeout(timer);
  }, [activeIndex]);

  return (
    <main className="min-h-screen bg-brand-surface px-10 py-10">
      <p className="font-jakarta text-lg text-gray-500">Halo!</p>

      <h1 className="mt-2 font-outfit text-[52px] font-bold text-brand-green">Jelajahi Kampanye</h1>

      <div className="mt-8 flex items-center gap-3">
        <p className="font-jakarta text-xl text-gray-700">Browse By</p>

        <div className="relative">
          <button
            type="button"
            onClick={() => setOpenDropdown(openDropdown === 'worship' ? null : 'worship')}
            className="flex items-center gap-3 rounded-full bg-white px-6 py-3 font-jakarta text-sm text-gray-500 shadow transition hover:text-brand-green"
          >
            {selectedWorship}
            <img
              src="/images/dropdown-arrow.png"
              alt=""
              aria-hidden="true"
              className={`h-4 w-4 object-contain transition-transform duration-300 ${openDropdown === 'worship' ? 'rotate-180' : 'rotate-0'}`}
            />
          </button>

          {openDropdown === 'worship' && (
            <div className="absolute left-0 top-14 z-40 w-48 overflow-hidden rounded-2xl bg-white py-2 shadow-[0_12px_30px_rgba(0,0,0,0.12)]">
              {worshipOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    setSelectedWorship(option);
                    setOpenDropdown(null);
                  }}
                  className="block w-full px-5 py-3 text-left font-jakarta text-sm text-gray-600 transition hover:bg-[#E6F4EA] hover:text-brand-green"
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>

        <button className="rounded-full bg-white px-6 py-3 font-jakarta text-sm text-gray-400 shadow">Kota</button>

        <div className="relative">
          <button
            type="button"
            onClick={() => setOpenDropdown(openDropdown === 'status' ? null : 'status')}
            className="flex items-center gap-3 rounded-full bg-white px-6 py-3 font-jakarta text-sm text-gray-500 shadow transition hover:text-brand-green"
          >
            {selectedStatus}
            <img
              src="/images/dropdown-arrow.png"
              alt=""
              aria-hidden="true"
              className={`h-4 w-4 object-contain transition-transform duration-300 ${openDropdown === 'status' ? 'rotate-180' : 'rotate-0'}`}
            />
          </button>

          {openDropdown === 'status' && (
            <div className="absolute left-0 top-14 z-40 w-52 overflow-hidden rounded-2xl bg-white py-2 shadow-[0_12px_30px_rgba(0,0,0,0.12)]">
              {statusOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    setSelectedStatus(option);
                    setOpenDropdown(null);
                  }}
                  className="block w-full px-5 py-3 text-left font-jakarta text-sm text-gray-600 transition hover:bg-[#E6F4EA] hover:text-brand-green"
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-1 items-center justify-between rounded-full bg-white px-6 py-3 shadow">
          <span className="font-jakarta text-sm text-gray-400">Cari Kampanye...</span>
          <img src="/images/search-icon.png" alt="Search" className="h-6 w-6 object-contain" />
        </div>
      </div>

      <h2 className="mt-10 font-outfit text-3xl font-bold text-gray-900">Butuh Dukungan</h2>

      <section className="mt-8 overflow-hidden rounded-[22px] bg-white shadow-lg">
        <div className="relative h-[420px]">
          {banners.map((banner, index) => (
            <div
              key={banner.title}
              className={`absolute inset-0 grid grid-cols-[40%_60%] transition-all duration-700 ease-in-out ${
                index === activeIndex
                  ? 'translate-x-0 opacity-100'
                  : index < activeIndex
                    ? '-translate-x-full opacity-0'
                    : 'translate-x-full opacity-0'
              }`}
            >
              <div className={`relative flex h-full flex-col justify-center overflow-hidden bg-gradient-to-r ${banner.gradient} px-10`}>
                <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-r from-transparent to-black/10" />
                <div className="pointer-events-none absolute inset-y-0 right-10 w-20 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                <div className="relative z-10 flex -translate-y-12 flex-col justify-center gap-6">
                  <h3 className={`font-outfit text-[42px] font-bold leading-tight ${banner.text}`}>{banner.title}</h3>

                  <button className={`w-fit font-jakarta text-sm underline ${banner.text}`}>Donasi Sekarang</button>

                  <p className={`font-outfit text-2xl font-bold ${banner.text}`}>#SunityEcoFaith</p>
                </div>
              </div>

              <img src={banner.image} alt={banner.title} className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </section>

      <div className="mt-6 flex justify-center gap-3">
        {banners.map((banner, index) => (
          <button
            key={banner.title}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Lihat banner ${index + 1}`}
            className={`h-4 rounded-full transition-all duration-300 ${index === activeIndex ? 'w-16 bg-brand-green' : 'w-4 bg-gray-200'}`}
          />
        ))}
      </div>

      <section className="mt-14">
        <h2 className="font-outfit text-3xl font-bold text-gray-900">Kampanye Aktif</h2>

        <div className="mt-4 h-px w-full bg-gray-200" />

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {activeCampaigns.map((campaign) => (
            <article key={campaign.id} className="rounded-[20px] border border-gray-200 bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
              <div className="relative overflow-hidden rounded-[16px]">
                <img src={campaign.image} alt={campaign.title} className="h-[180px] w-full object-cover" />

                <div className="absolute right-3 top-3 flex h-7 items-center gap-2 rounded-full border border-blue-500 bg-[#EEF2FF] px-3">
                  <img src="/images/icon-active.png" alt="" aria-hidden="true" className="h-4 w-4 shrink-0" />
                  <span className="font-jakarta text-xs font-medium text-blue-600">Aktif</span>
                </div>
              </div>

              <div className="mt-5 flex items-start justify-between gap-4">
                <h3 className="font-outfit text-xl font-bold leading-tight text-gray-900">{campaign.title}</h3>

                <div className="mt-1 flex items-center gap-1 font-jakarta text-xs text-gray-500">
                  <img src="/images/icon-catholic.png" alt="" aria-hidden="true" className="h-4 w-4 object-contain" />
                  {campaign.category}
                </div>
              </div>

              <p className="mt-2 flex items-center gap-1 font-jakarta text-sm text-gray-400">
                <img src="/images/icon-location.png" alt="" aria-hidden="true" className="h-4 w-4 object-contain" />
                {campaign.location}
              </p>

              <div className="mt-6 flex items-end justify-between">
                <div>
                  <p className="font-jakarta text-xs text-gray-400">Dana Terkumpul</p>
                  <p className="font-outfit text-xl font-bold text-brand-green">{campaign.collected}</p>
                </div>

                <div className="text-right">
                  <p className="font-jakarta text-xs text-gray-400">Sisa Hari</p>
                  <p className="font-outfit text-xl font-bold text-brand-green">{campaign.daysLeft}</p>
                </div>
              </div>

              <div className="mt-3 h-4 overflow-hidden rounded-full bg-gray-200">
                <div className="h-full rounded-full bg-brand-green" style={{ width: `${campaign.progress}%` }} />
              </div>

              <div className="mt-2 flex items-center justify-between font-jakarta text-sm">
                <span className="font-semibold text-brand-yellow">{campaign.progress}%</span>

                <span className="flex items-center gap-1 font-semibold text-gray-900">
                  <img src="/images/icon-target-2.png" alt="" aria-hidden="true" className="h-4 w-4 object-contain" />
                  Target: {campaign.target}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
