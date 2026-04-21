import { Link, NavLink } from 'react-router';

export function Navbar() {
  const navItems = [
    { name: 'Beranda', path: '/' },
    { name: 'Cara Kerja', path: '/how-it-works' },
    { name: 'Kampanye', path: '/campaigns' },
    { name: 'Tentang Kami', path: '/about' },
  ];

  return (
    <nav className="sticky top-0 z-50 flex h-[97px] w-full items-center justify-center border-b-[0.5px] border-[#C0C0C0] bg-brand-surface shadow-[0_4px_17.4px_rgba(0,0,0,0.25)]">
      <div className="flex h-full w-full max-w-[1329px] items-center justify-between px-4 xl:px-0">
        {/* Logo */}
        <Link to="/" className="group flex items-center gap-[13px]" aria-label="Beranda Sunity">
          <img src="/sunity.avif" alt="Sunity Logo" className="h-[56px] w-[40px] object-contain" />
          <span className="font-outfit text-[36px] font-bold leading-[45px] tracking-[-0.006em] text-brand-green transition-colors group-hover:text-brand-yellow">
            Sunity
          </span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-[18px]">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `flex h-[40px] items-center justify-center px-6 py-2.5 font-jakarta text-[16px] tracking-[-0.006em] transition-all ${
                  isActive
                    ? 'border-b-[3px] border-brand-green font-bold text-brand-green'
                    : 'rounded-[38px] font-medium text-brand-light-gray hover:text-brand-green'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Admin Login Button */}
        <Link
          to="/login"
          className="group flex h-[40px] items-center justify-center gap-2 rounded-[59px] border-[1.5px] border-transparent bg-brand-green px-5 py-2 shadow-[0_10px_16.5px_rgba(47,107,63,0.25)] transition-all hover:border-brand-green hover:bg-transparent hover:shadow-none"
        >
          <span className="font-jakarta text-[16px] font-medium leading-[20px] tracking-[-0.006em] text-brand-surface transition-colors group-hover:text-brand-green">
            Admin Login
          </span>
          <img src="/white-arrow.avif" alt="" aria-hidden="true" className="w-[20px] object-contain transition-opacity group-hover:hidden" />
          <img src="/green-arrow.avif" alt="" aria-hidden="true" className="hidden w-[20px] object-contain transition-opacity group-hover:block" />
        </Link>
      </div>
    </nav>
  );
}
