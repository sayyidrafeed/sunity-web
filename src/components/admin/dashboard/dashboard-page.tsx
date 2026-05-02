import { useState } from 'react';
import { useNavigate, Link } from 'react-router'; // 👈 TAMBAHIN IMPORT Link

export function DashboardPage() {
  const navigate = useNavigate();

  // State untuk status dropdown
  const [status, setStatus] = useState('Aktif');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [pendingStatus, setPendingStatus] = useState('');

  const handleLogout = () => {
    navigate('/admin/login');
  };

  const recentDonations = [
    { name: 'Johkowee', amount: 'Rp100.000', date: 'DD/MM/YYYY', time: '14.02' },
    { name: 'Johkowee', amount: 'Rp100.000', date: 'DD/MM/YYYY', time: '14.02' },
    { name: 'Johkowee', amount: 'Rp100.000', date: 'DD/MM/YYYY', time: '14.02' },
    { name: 'Johkowee', amount: 'Rp100.000', date: 'DD/MM/YYYY', time: '14.02' },
    { name: 'Johkowee', amount: 'Rp100.000', date: 'DD/MM/YYYY', time: '14.02' },
  ];

  const cardStyle = 'bg-white p-6 rounded-2xl border border-[#DDD] shadow-[0px_14px_37.8px_rgba(54,53,53,0.1)]';

  // Fungsi untuk menentukan warna berdasarkan status
  const getStatusColor = (statusValue: string) => {
    switch (statusValue) {
      case 'Aktif':
        return '#3951DC';
      case 'Instalasi':
        return '#D97706';
      case 'Selesai':
        return '#01B268';
      default:
        return '#3951DC';
    }
  };

  // Fungsi untuk menentukan teks secondary berdasarkan status
  const getStatusSubtext = (statusValue: string) => {
    switch (statusValue) {
      case 'Aktif':
        return 'Sedang Berjalan';
      case 'Instalasi':
        return 'Proses Pemasangan';
      case 'Selesai':
        return 'Kampanye Selesai';
      default:
        return 'Sedang Berjalan';
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
            {/* Dashboard - Aktif (sesuai halaman sekarang) */}
            <button className="flex items-center gap-3 w-full bg-white/10 p-3 rounded-lg font-medium">
              <img src="/dashboard.svg" alt="Dashboard" className="w-5 h-5" /> Dashboard
            </button>

            {/* Monitoring Energi - PAKE Link */}
            <Link to="/admin/monitoring" className="flex items-center gap-3 w-full p-3 text-white/60 hover:text-white transition">
              <img src="/monitoring.svg" alt="Monitoring" className="w-5 h-5" /> Monitoring Energi
            </Link>

            {/* Kelola Kampanye - PAKE Link (tapi belum ada halamannya) */}
            <Link to="/admin/campaigns" className="flex items-center gap-3 w-full p-3 text-white/60 hover:text-white transition">
              <img src="/kampanye.svg" alt="Kampanye" className="w-5 h-5" /> Kelola Kampanye
            </Link>
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
      <div className="flex-1 p-8 h-screen overflow-y-auto">
        <header className="mb-8">
          <p className="text-gray-500 mb-1">Halo!</p>
          <h2 className="text-[36px] font-['Outfit'] font-medium text-gray-800 mb-1">Dashboard</h2>
          <p className="text-gray-800">Pemasangan Panel Surya Masjid Al-Ikhlas</p>
        </header>

        {/* Top Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className={cardStyle}>
            <p className="text-gray-500 text-sm">Jumlah Donatur</p>
            <p className="text-4xl font-['Outfit'] font-semibold text-[#2F6B3F] mt-2">1.204</p>
            <p className="text-sm text-gray-400 mt-2">＋ 8 Hari Ini</p>
          </div>

          <div className={cardStyle}>
            <p className="text-[#F7C85C] text-sm">Sisa Hari</p>
            <p className="text-4xl font-['Outfit'] font-semibold text-[#F7C85C] mt-2">28</p>
            <p className="text-sm text-gray-400 mt-2">Masa Tenggat 30 April 2026</p>
          </div>

          {/* Status Kampanye Card dengan Dropdown */}
          <div className={`${cardStyle} relative`}>
            <div className="flex justify-between items-center cursor-pointer" onClick={() => setShowDropdown(!showDropdown)}>
              <div>
                <p className="text-sm" style={{ color: getStatusColor(status) }}>
                  Status Kampanye
                </p>
                <p className="text-4xl font-['Outfit'] font-semibold mt-2" style={{ color: getStatusColor(status) }}>
                  {status}
                </p>
                <p className="text-sm mt-2" style={{ color: getStatusColor(status) }}>
                  {getStatusSubtext(status)}
                </p>
              </div>
              <span className="text-xl" style={{ color: getStatusColor(status) }}>
                ▼
              </span>
            </div>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute top-20 right-6 bg-white border border-gray-200 rounded-lg shadow-lg z-10 w-32">
                {['Aktif', 'Instalasi', 'Selesai'].map((option) => (
                  <button
                    key={option}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                    onClick={() => {
                      setPendingStatus(option);
                      setShowModal(true);
                      setShowDropdown(false);
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Middle Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-[#5CD17B] to-[#2F6B3F] p-6 rounded-2xl text-white shadow-[0px_14px_37.8px_rgba(54,53,53,0.1)] flex flex-col justify-between">
            <div>
              <p className="text-white/80">Total Dana Terkumpul</p>
              <p className="text-4xl font-bold mt-2">Rp100.000.000</p>
            </div>
            <p className="text-sm mt-2 text-white/80">↑ 12% Dari Minggu Lalu</p>
          </div>

          <div className={cardStyle + ' flex items-center gap-8'}>
            <div className="relative w-28 h-28 flex-shrink-0">
              <svg className="w-full h-full" viewBox="0 0 120 120">
                <circle className="text-gray-100" strokeWidth="12" stroke="currentColor" fill="transparent" r="50" cx="60" cy="60" />
                <circle
                  className="text-[#1E6041]"
                  strokeWidth="12"
                  strokeDasharray="314.159"
                  strokeDashoffset="62.831"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="50"
                  cx="60"
                  cy="60"
                  transform="rotate(-90 60 60)"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-bold text-gray-800">80%</span>
                <span className="text-[10px] text-gray-500">Tercapai</span>
              </div>
            </div>

            <div className="flex flex-col gap-4 w-full">
              <div>
                <p className="text-sm text-gray-500">Sisa Target</p>
                <p className="text-lg font-bold text-[#1E6041]">Rp25.000.000</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Target Dana</p>
                <p className="text-lg font-bold text-[#1E6041]">Rp125.000.000</p>
              </div>
            </div>
          </div>
        </div>

        {/* Donasi Terbaru Table */}
        <div className={cardStyle + ' overflow-hidden p-0'}>
          <div className="p-6 border-b border-[#DDD]">
            <h3 className="font-['Outfit'] font-medium text-lg text-gray-800">Donasi Terbaru</h3>
          </div>
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                {['Nama Donatur', 'Jumlah Donasi', 'Tanggal', 'Jam'].map((h) => (
                  <th key={h} className="px-6 py-3 text-xs text-gray-500 uppercase">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DDD]">
              {recentDonations.map((d, i) => (
                <tr key={i} className="hover:bg-gray-500/5 transition">
                  <td className="px-6 py-4">{d.name}</td>
                  <td className="px-6 py-4 font-semibold text-[#1E6041]">{d.amount}</td>
                  <td className="px-6 py-4 text-gray-500">{d.date}</td>
                  <td className="px-6 py-4 text-gray-500">{d.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL KONFIRMASI */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-80 text-center">
            <div className="flex justify-center mb-4">
              <img src="/question-warning.svg" alt="Konfirmasi" className="w-16 h-16" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-800">Ganti Status Kampanye?</h3>
            <p className="text-sm text-gray-500 mb-6">
              Apakah Anda yakin ingin mengubah status menjadi <span className="font-semibold text-[#2F6B3F]">{pendingStatus}</span>?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-50 transition"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  setStatus(pendingStatus);
                  setShowModal(false);
                }}
                className="flex-1 py-2 bg-[#2F6B3F] text-white rounded-full hover:bg-[#255633] transition"
              >
                Konfirmasi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
