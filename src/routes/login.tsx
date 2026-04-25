import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useQuery, useMutation } from '@tanstack/react-query';
import { sessionQueryOptions } from '@/lib/auth/client';
import { socialSignInMutation } from '@/lib/api/generated/@tanstack/react-query.gen';

export function Login() {
  const navigate = useNavigate();
  const { data: session, isLoading } = useQuery(sessionQueryOptions());

  useEffect(() => {
    if (session) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [session, navigate]);

  const { mutateAsync: signInSocial, isPending } = useMutation(socialSignInMutation());

  const handleLogin = async () => {
    try {
      const res = await signInSocial({
        body: {
          provider: 'google',
          callbackURL: '/admin/dashboard',
        },
      });
      const responseData = (res as unknown as Record<string, unknown>)?.data ?? res;
      if (responseData && typeof responseData === 'object' && 'url' in responseData && typeof responseData.url === 'string') {
        window.location.href = responseData.url;
      }
    } catch {
      // Failed to sign in. In a real app, show a toast notification here.
    }
  };

  if (isLoading) {
    return <div className="flex h-[calc(100vh-97px)] items-center justify-center">Loading...</div>;
  }

  return (
    <div className="relative w-full h-[calc(100vh-97px)] overflow-hidden bg-brand-surface">
      {/* Background Blurs */}
      <div className="absolute w-[716px] h-[513px] -left-[215px] -top-[290px] bg-brand-yellow opacity-[0.66] blur-[200px] rounded-full" />
      <div className="absolute w-[716px] h-[513px] -left-[661px] top-[133px] bg-brand-green opacity-[0.38] blur-[200px] rounded-full" />
      <div className="absolute w-[716px] h-[513px] -left-[651px] top-[820px] bg-brand-green opacity-[0.38] blur-[200px] rounded-full" />

      {/* Right Background Graphic */}
      <img
        src="/lightning-wall.avif"
        alt=""
        className="absolute right-0 top-0 h-full w-[827px] object-cover pointer-events-none"
        aria-hidden="true"
      />

      {/* Main Content Container */}
      <div className="container relative z-10 mx-auto flex h-full items-center px-6 lg:px-24">
        {/* Left Side: Text and Graphics */}
        <div className="flex flex-col gap-[22px] max-w-[596px]">
          <h1 className="font-outfit text-[45px] font-semibold leading-[57px] tracking-[-0.006em] text-brand-green">
            Bersama Hadirkan Energi Bersih untuk Rumah Ibadah.
          </h1>
          <p className="font-jakarta text-[18px] leading-[23px] tracking-[-0.006em] text-brand-text max-w-[546px]">
            Akses panel administrator untuk mengelola sistem, memantau kontribusi, dan mendukung misi menghadirkan energi bersih yang berkelanjutan
            bagi rumah ibadah.
          </p>

          <div className="mt-8">
            <img src="/solar-panel-mini.avif" alt="Ilustrasi Panel Surya" className="h-[238px] w-[178px] object-contain" />
          </div>
        </div>

        {/* Bottom Left Sunity Watermark */}
        <div className="absolute bottom-[40px] left-6 lg:left-24 flex items-center gap-[23px] opacity-[0.17] pointer-events-none z-20">
          <img src="/sunity-grey.avif" alt="Sunity Logo" className="h-[128px] w-[92px] object-contain" />
          <span className="font-outfit text-[100px] font-bold leading-[126px] tracking-[-0.006em] text-[#C0C0C0]">Sunity</span>
        </div>

        {/* Right Side: Login Card */}
        <div className="absolute right-6 lg:right-[100px] top-1/2 flex w-[466px] -translate-y-1/2 flex-col gap-[32px] rounded-[25px] border border-[#DDDDDD] bg-brand-surface p-[42px_36px] shadow-[0px_9px_41.8px_rgba(31,31,29,0.25)]">
          <div className="flex flex-col gap-[5px]">
            <h2 className="font-outfit text-[24px] font-medium leading-[30px] tracking-[-0.006em] text-black">Sign In</h2>
            <p className="font-jakarta text-[16px] leading-[20px] tracking-[-0.006em] text-black">
              Lanjutkan dengan akun Google untuk masuk sebagai administrator.
            </p>
          </div>

          <button
            onClick={handleLogin}
            disabled={isPending}
            className="flex h-[47px] w-full flex-row items-center justify-center gap-[8px] rounded-[10px] bg-brand-green shadow-[0px_10px_16.5px_rgba(47,107,63,0.25)] transition-all duration-300 hover:scale-[1.02] hover:bg-[#DEB453] active:bg-[#C6A04A] focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <div className="flex h-[23px] w-[23px] items-center justify-center rounded-sm">
              <img src="/google-icon.avif" alt="Google" className="h-[18px] w-[18px] object-contain" />
            </div>
            <span className="font-jakarta text-[16px] font-medium leading-[20px] tracking-[-0.006em] text-brand-surface">
              {isPending ? 'Memproses...' : 'Masuk dengan Google'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
