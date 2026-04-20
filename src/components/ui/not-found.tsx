import { Link } from 'react-router';

export function NotFound() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-brand-surface p-6">
      <div className="absolute -left-[215px] -top-[290px] h-[513px] w-[716px] rounded-full bg-brand-yellow opacity-[0.66] blur-[200px] pointer-events-none" />
      <div className="absolute -left-[661px] top-[133px] h-[513px] w-[716px] rounded-full bg-brand-green opacity-[0.38] blur-[200px] pointer-events-none" />
      <div className="absolute -left-[651px] top-[780px] h-[513px] w-[716px] rounded-full bg-brand-green opacity-[0.38] blur-[200px] pointer-events-none" />

      <div className="relative z-10 mx-auto flex max-w-lg flex-col items-center justify-center text-center">
        <img src="/404.avif" alt="404 Illustration" className="mb-8 w-[280px] object-contain md:w-[371px]" />

        <h1 className="font-outfit mb-2 text-[48px] font-bold tracking-tight text-brand-heading md:mb-4 md:text-[60px] md:leading-[76px]">
          Error 404
        </h1>
        <p className="font-jakarta mb-8 text-base font-normal tracking-tight text-brand-text md:text-[18px] md:leading-[23px]">
          Halaman yang kamu cari tidak ada nih, yuk kembali ke Beranda
        </p>

        <Link
          to="/"
          className="font-jakarta flex flex-row items-center justify-center gap-2.5 rounded-[59px] bg-brand-yellow px-6 py-2 text-base font-medium leading-5 tracking-[-0.006em] text-brand-button-text shadow-[0px_10px_16.5px_rgba(247,200,92,0.2)] motion-safe:transition-transform motion-safe:hover:scale-105 motion-safe:active:scale-95"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
