import { Link, useNavigate } from 'react-router';

export function MonitoringPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex font-['Plus_Jakarta_Sans']">
      {/* Sidebar */}
      <div className="w-64 h-screen bg-[#2F6B3F] p-8 flex flex-col justify-between text-white sticky top-0 shrink-0">
        <div>
          <div className="flex items-center gap-2 mb-10">
            <img src="/sunity2.svg" alt="Sunity" className="w-8 h-8" />
            <h1 className="text-2xl text-[#F7C85C] font-['Outfit'] font-bold">Sunity</h1>
          </div>
          <nav className="space-y-4">
            <Link to="/admin/dashboard" className="flex items-center gap-3 w-full p-3 text-white/60 hover:text-white transition">
              <img src="/dashboard.svg" alt="Dashboard" className="w-5 h-5" /> Dashboard
            </Link>
            <button className="flex items-center gap-3 w-full bg-white/10 p-3 rounded-lg font-medium">
              <img src="/monitoring.svg" alt="Monitoring" className="w-5 h-5" /> Monitoring Energi
            </button>
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
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="flex flex-col items-center">
          <img 
            src="/no-hasil.svg" 
            alt="Tidak Ada Hasil" 
            className="w-full max-w-lg object-contain" 
          />
        </div>
      </div>
    </div>
  );
}