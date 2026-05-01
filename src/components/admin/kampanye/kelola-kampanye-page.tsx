import { useState } from 'react';
import { Link, useNavigate } from 'react-router';

export function KelolaKampanyePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');

  const campaigns = [
    {
      id: 1,
      title: 'Dukungan Pemasangan Panel Surya Gereja Advent',
      status: 'Selesai',
      current: 100000000,
      target: 100000000,
      img: '/images/campaign-card-1.png',
    },
    {
      id: 2,
      title: 'Dukungan Pemasangan Panel Surya Masjid Al-Ikhlas',
      status: 'Aktif',
      current: 70000000,
      target: 100000000,
      img: '/images/mosque.png',
    },
    {
      id: 3,
      title: 'Dukungan Pemasangan Panel Surya Gereja Katedral',
      status: 'Instalasi',
      current: 90000000,
      target: 100000000,
      img: '/images/campaign-card-2.png',
    },
  ];

  const filteredCampaigns = activeTab === 'All' ? campaigns : campaigns.filter((c) => c.status === activeTab);

  const handleLogout = () => {
    navigate('/admin/login');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aktif':
        return 'bg-blue-50 text-blue-600';
      case 'Instalasi':
        return 'bg-orange-50 text-orange-600';
      case 'Selesai':
        return 'bg-green-50 text-green-600';
      default:
        return 'bg-gray-50 text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex font-['Plus_Jakarta_Sans']">
      {/* Sidebar */}
      <div className="w-64 h-screen bg-[#2F6B3F] p-8 flex flex-col justify-between text-white sticky top-0 shrink-0">
        <div>
          <div className="flex items-center gap-2 mb-10">
            <img src="/sunity2.svg" alt="Sunity" className="w-8 h-8" />
            <h1 className="text-2xl text-[#F7C85C] font-['Outfit'] font-semibold">Sunity</h1>
          </div>
          <nav className="space-y-4">
            <Link to="/admin/dashboard" className="flex items-center gap-3 w-full p-3 text-white/60 hover:text-white transition">
              <img src="/dashboard.svg" alt="Dashboard" className="w-5 h-5" /> Dashboard
            </Link>
            <Link to="/admin/monitoring" className="flex items-center gap-3 w-full p-3 text-white/60 hover:text-white transition">
              <img src="/monitoring.svg" alt="Monitoring" className="w-5 h-5" /> Monitoring Energi
            </Link>
            <button className="flex items-center gap-3 w-full bg-white/10 p-3 rounded-lg font-medium">
              <img src="/kampanye.svg" alt="Kampanye" className="w-5 h-5" /> Kelola Kampanye
            </button>
          </nav>
        </div>

        <div className="flex flex-col gap-4">
          <button onClick={handleLogout} className="flex items-center gap-3 text-white/60 hover:text-white transition">
            <span>⎋</span> Logout
          </button>
          <div className="bg-white p-3 rounded-xl flex items-center gap-3 text-gray-800">
            <img src="/habatusauda.svg" alt="Avatar" className="w-10 h-10 rounded-full object-cover" />
            <div>
              <p className="text-sm font-bold">Habatusauda</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-8 h-screen overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <p className="text-gray-500 mb-1">Halo!</p>
            <h2 className="text-[36px] font-['Outfit'] font-medium text-gray-800 mb-1">Kelola Kampanye</h2>
            <p className="text-gray-800">Kelola dan pantau semua kampanye penggalangan dana</p>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Cari Kampanye..."
              className="pl-4 pr-10 py-2 border border-gray-300 rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-[#2F6B3F] focus:border-transparent"
            />
          </div>
        </header>

        <div className="flex justify-between items-center mb-6">
          <button className="bg-[#2F6B3F] text-white px-6 py-2 rounded-xl flex items-center gap-2 hover:bg-[#255633] transition">
            <span className="text-xl">+</span> Buat Kampanye
          </button>
        </div>

        <div className="flex gap-6 border-b border-gray-200 mb-6">
          {['All', 'Aktif', 'Instalasi', 'Selesai'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 transition ${
                activeTab === tab ? 'border-b-2 border-[#2F6B3F] text-[#2F6B3F] font-bold' : 'text-gray-500 hover:text-[#2F6B3F]'
              }`}
            >
              {tab} ({tab === 'All' ? campaigns.length : campaigns.filter((c) => c.status === tab).length})
            </button>
          ))}
        </div>

        {/* Campaign List */}
        <div className="space-y-6">
          {filteredCampaigns.map((c) => (
            <div key={c.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex gap-6 hover:shadow-md transition">
              <img
                src={c.img}
                alt={c.title}
                className="w-48 h-32 object-cover rounded-xl"
                onError={(e) => (e.currentTarget.src = '/placeholder.jpg')}
              />

              {/* Bagian konten - tombol sudah dipindah ke kanan */}
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-lg text-gray-800">{c.title}</h3>
                  <span className={`px-4 py-1 rounded-full text-sm font-medium ${getStatusColor(c.status)}`}>{c.status}</span>
                </div>

                <p className="text-[#2F6B3F] font-semibold mt-2">
                  Rp{c.current.toLocaleString()} / Rp{c.target.toLocaleString()} terkumpul
                </p>

                <div className="w-full bg-gray-200 h-2 rounded-full mt-2 mb-4">
                  <div className="bg-[#2F6B3F] h-2 rounded-full" style={{ width: `${(c.current / c.target) * 100}%` }}></div>
                </div>

                {/* Tombol dipindahkan ke kanan */}
                <div className="flex justify-end items-center gap-2 mt-4">
                  {c.status !== 'Selesai' && (
                    <button className="px-4 py-2 border border-[#2F6B3F] text-[#2F6B3F] rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-green-50 transition">
                      Edit
                    </button>
                  )}
                  <button className="px-4 py-2 bg-[#2F6B3F] text-white rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-[#255633] transition">
                    Lihat Detail →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
