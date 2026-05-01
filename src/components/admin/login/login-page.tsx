import { useState } from 'react';
import { useNavigate } from 'react-router';

export function LoginPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/admin/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-jakarta relative overflow-hidden">
      
      {/* Background Gradient Kuning - Tetap di pojok kiri atas */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#F7C85C] rounded-full blur-[150px] opacity-60 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

      {/* Main Section */}
      <div className="flex h-screen">
        {/* Sisi Kiri - Judul, Deskripsi & Solar Panel */}
        <div className="w-1/2 flex flex-col justify-center px-20 z-10">
          <h1 className="font-outfit font-semibold text-6xl text-[#2F6B3F] mb-6 leading-tight">
            Bersama Hadirkan Energi Bersih untuk Rumah Ibadah.
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed mb-10 max-w-lg">
            Akses panel administrator untuk mengelola sistem, memantau kontribusi, dan mendukung misi menghadirkan energi bersih yang berkelanjutan bagi rumah ibadah.
          </p>

          {/* Solar Panel SVG - DIGEDEIN & DINAIKIN */}
          <div className="w-64 -mt-8">
            <img src="/solar-panel.svg" alt="Solar Panel" className="w-full h-auto" />
          </div>
        </div>

        {/* Sisi Kanan - Background dengan thunder.svg */}
        <div className="w-1/2 rounded-tl-[100px] flex items-center justify-center relative overflow-hidden">
          
          {/* Komponen thunder.svg sebagai Background Sisi Kanan */}
          <img 
            src="/thunder.svg" 
            alt="Thunder Background" 
            className="absolute inset-0 w-full h-full object-cover opacity-100"
          />
          
          {/* Card Login */}
          <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-sm z-10">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Sign In</h2>
            </div>
            
            <p className="text-gray-600 text-sm mb-8 text-center max-w-xs mx-auto">
              Lanjutkan dengan akun Google untuk masuk sebagai administrator.
            </p>

            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-[#2F6B3F] text-white rounded-lg hover:bg-[#255633] transition font-medium"
            >
              {/* SVG Ikon Google */}
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866.549 3.921 1.453l2.814-2.814C17.503 2.988 15.139 2 12.545 2 7.021 2 2.545 6.477 2.545 12s4.476 10 10 10c5.731 0 9.455-4.083 9.455-9.636 0-.851-.092-1.638-.25-2.361H12.545z" />
              </svg>
              {loading ? 'Memproses...' : 'Masuk dengan Google'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}