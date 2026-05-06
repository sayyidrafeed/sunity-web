import { useState } from 'react';
import { useNavigate } from 'react-router';

export function LoginPage() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');

  const handleLogin = () => {
    setStatus('loading');

    // Simulate login flow
    setTimeout(() => {
      // Toggle between success and error for testing purposes based on a random or sequential logic
      // We will make it error on first try, success on second try to demonstrate both states
      const attempts = Number(sessionStorage.getItem('login_attempts') || '0');

      if (attempts === 0) {
        sessionStorage.setItem('login_attempts', '1');
        setStatus('error');
      } else {
        sessionStorage.removeItem('login_attempts');
        // Simulated success redirect
        navigate('/admin/dashboard');
      }
    }, 1500);
  };

  return (
    <div className="relative flex min-h-[calc(100vh-6rem)] w-full overflow-hidden bg-brand-surface">
      {/* Background Layer */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Blur Ellipses */}
        <div className="absolute left-[-215px] top-[-290px] h-[513px] w-[716px] rounded-full bg-brand-yellow opacity-[0.15] blur-[200px]" />
        <div className="absolute left-[-661px] top-[133px] h-[513px] w-[716px] rounded-full bg-brand-green opacity-[0.15] blur-[200px]" />
        <div className="absolute left-[-651px] top-[780px] h-[513px] w-[716px] rounded-full bg-brand-green opacity-[0.15] blur-[200px]" />

        {/* Right Background Image */}
        <div className="absolute inset-y-0 right-0 z-0 pointer-events-none hidden lg:block">
          <img src="/thunder-bg.avif" alt="Background pattern" className="h-full w-[827px] object-cover object-left" />
        </div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col px-8 py-12 lg:flex-row lg:items-center lg:py-0 xl:px-[96px]">
        {/* Left Section (Typography & Graphics) */}
        <div className="flex w-full max-w-[596px] flex-col items-start gap-[22px] lg:mt-0 lg:h-[calc(100vh-6rem)] lg:justify-center">
          <div className="flex flex-col items-start gap-[22px]">
            <h1 className="font-outfit text-[36px] font-semibold leading-[1.2] tracking-[-0.006em] text-brand-green md:text-[45px] md:leading-[57px]">
              Bersama Hadirkan Energi Bersih untuk Rumah Ibadah.
            </h1>
            <p className="max-w-[546px] font-jakarta text-[16px] font-normal leading-[1.4] tracking-[-0.006em] text-[#1F1F1D] md:text-[18px] md:leading-[23px]">
              Akses panel administrator untuk mengelola sistem, memantau kontribusi, dan mendukung misi menghadirkan energi bersih yang berkelanjutan
              bagi rumah ibadah.
            </p>
          </div>

          <div className="relative mt-8 h-[238px] w-[178px] lg:mt-12">
            <div className="absolute bottom-[35px] left-1/2 h-[30px] w-[130px] -translate-x-1/2 rounded-[50%] bg-[#BFD1C3]" />
            <img src="/solar-panel.svg" alt="Solar Panel Illustration" className="absolute inset-0 z-10 h-full w-full object-contain" />
          </div>
        </div>

        {/* Right Section (Login Card) */}
        <div className="mt-16 flex w-full justify-center lg:ml-[170px] lg:mt-0 lg:w-[466px] lg:justify-start">
          <div
            className={`flex w-full max-w-[466px] flex-col items-start gap-[32px] rounded-[25px] border border-[#DDDDDD] p-8 shadow-[0_9px_41.8px_rgba(31,31,29,0.25)] sm:p-[42px_36px] transition-colors duration-300 ${
              status === 'error' ? 'bg-[#FBE9E9] border-transparent' : 'bg-brand-surface'
            }`}
          >
            <div className="flex w-full flex-col items-start gap-[5px]">
              <h2 className="font-outfit text-[24px] font-medium leading-[30px] tracking-[-0.006em] text-black">Sign In</h2>
              <p className="font-jakarta text-[16px] font-normal leading-[20px] tracking-[-0.006em] text-black">
                Lanjutkan dengan akun Google untuk masuk sebagai administrator.
              </p>
            </div>

            <div className="flex w-full flex-col items-start gap-[12px]">
              <button
                type="button"
                onClick={handleLogin}
                disabled={status === 'loading'}
                className="flex w-full items-center justify-center gap-[8px] rounded-[10px] bg-brand-green p-[12px_10px] shadow-[0_10px_16.5px_rgba(47,107,63,0.25)] transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:hover:scale-100"
              >
                <img src="/google-icon.avif" alt="Google Icon" className="h-[23px] w-[23px] brightness-0 invert" />
                <span className="font-jakarta text-[16px] font-medium leading-[20px] tracking-[-0.006em] text-brand-surface">
                  {status === 'loading' ? 'Memproses..' : 'Masuk dengan Google'}
                </span>
              </button>

              {status === 'error' && (
                <div className="flex w-full items-center justify-center gap-[8px] animate-in fade-in slide-in-from-top-2">
                  <div className="flex h-[15px] w-[15px] items-center justify-center rounded-full bg-brand-danger text-white">
                    <svg width="9" height="9" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M11.4669 3.72684C11.7558 4.01577 11.7558 4.48423 11.4669 4.77316L8.53381 7.70624L11.4669 10.6393C11.7558 10.9283 11.7558 11.3967 11.4669 11.6856C11.178 11.9746 10.7095 11.9746 10.4206 11.6856L7.4875 8.75253L4.55443 11.6856C4.2655 11.9746 3.79704 11.9746 3.50811 11.6856C3.21918 11.3967 3.21918 10.9283 3.50811 10.6393L6.44119 7.70624L3.50811 4.77316C3.21918 4.48423 3.21918 4.01577 3.50811 3.72684C3.79704 3.43791 4.2655 3.43791 4.55443 3.72684L7.4875 6.65992L10.4206 3.72684C10.7095 3.43791 11.178 3.43791 11.4669 3.72684Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <span className="font-jakarta text-[14px] font-normal leading-[18px] tracking-[-0.006em] text-brand-danger">
                    Gagal masuk dengan Google. Silakan coba lagi.
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Watermark Sunity */}
      <div className="pointer-events-none absolute bottom-0 left-[96px] z-0 flex items-center gap-[23px] pb-12 opacity-[0.17]">
        <img src="/sunity-grey.avif" alt="Sunity Grey Logo" className="h-[128px] w-[92px] object-contain" />
        <span className="font-outfit text-[100px] font-bold leading-[126px] tracking-[-0.006em] text-[#C0C0C0]">Sunity</span>
      </div>
    </div>
  );
}
