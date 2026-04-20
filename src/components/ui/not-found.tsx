import { Link } from 'react-router';

export function NotFound() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#FAF9F6] flex flex-col items-center justify-center p-6">
      {/* Background Blurs */}
      <div className="absolute -left-[215px] -top-[290px] h-[513px] w-[716px] rounded-full bg-[#F7C85C] opacity-[0.66] blur-[200px] pointer-events-none" />
      <div className="absolute -left-[661px] top-[133px] h-[513px] w-[716px] rounded-full bg-[#2F6B3F] opacity-[0.38] blur-[200px] pointer-events-none" />
      <div className="absolute -left-[651px] top-[780px] h-[513px] w-[716px] rounded-full bg-[#2F6B3F] opacity-[0.38] blur-[200px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center max-w-lg mx-auto text-center">
        {/* Illustration */}
        <img src="/404.avif" alt="404 Illustration" className="w-[280px] md:w-[371px] object-contain mb-8" />

        {/* Text */}
        <h1
          className="text-[48px] md:text-[60px] font-bold md:leading-[76px] tracking-tight text-[#2F6B3F] mb-2 md:mb-4"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          Error 404
        </h1>
        <p
          className="text-[16px] md:text-[18px] font-normal md:leading-[23px] tracking-tight text-[#1F1F1D] mb-8"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Halaman yang kamu cari tidak ada nih, yuk kembali ke Beranda
        </p>

        {/* Button */}
        <Link
          to="/"
          className="flex flex-row items-center justify-center gap-[10px] rounded-[59px] bg-[#F7C85C] px-[24px] py-[8px] text-[#15301C] transition-transform hover:scale-105 active:scale-95"
          style={{
            boxShadow: '0px 10px 16.5px rgba(247, 200, 92, 0.2)',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 500,
            fontSize: '16px',
            lineHeight: '20px',
            letterSpacing: '-0.006em',
          }}
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
