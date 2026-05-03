import { NavLink, useNavigate } from 'react-router';

interface NavItem {
  label: string;
  href: string;
  icon: string;
  iconAlt: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/admin/dashboard',
    icon: '/admin-dashboard-icon.avif',
    iconAlt: 'Dashboard',
  },
  {
    label: 'Monitoring Energi',
    href: '/admin/monitoring',
    icon: '/admin-monitoring-icon.avif',
    iconAlt: 'Monitoring Energi',
  },
  {
    label: 'Kelola Kampanye',
    href: '/admin/campaigns',
    icon: '/admin-campaign-icon.avif',
    iconAlt: 'Kelola Kampanye',
  },
];

const ICON_FILTER_GREEN = 'brightness(0) saturate(100%) invert(28%) sepia(36%) saturate(907%) hue-rotate(91deg) brightness(95%) contrast(95%)';

const ICON_FILTER_WHITE = 'brightness(0) invert(1)';

export function AdminSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // TODO: clear auth state when backend is integrated
    void navigate('/');
  };

  return (
    <aside
      className="relative w-[275px] min-h-screen flex-shrink-0 flex flex-col"
      style={{ backgroundColor: '#2F6B3F' }}
      aria-label="Admin navigation"
    >
      <div className="flex flex-row items-center justify-center gap-[13px] w-full" style={{ paddingTop: '54px' }}>
        <img src="/sunity-admin-logo.avif" alt="Sunity logo mark" className="w-[26px] h-[36px] object-contain flex-shrink-0" />
        <span className="font-outfit font-bold text-[36px] leading-[45px] tracking-[-0.006em]" style={{ color: '#F7C85C' }} aria-hidden="true">
          Sunity
        </span>
      </div>

      <nav aria-label="Admin menu" className="flex flex-col gap-[9px] px-[27px] mt-[116px]">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              [
                'flex flex-row items-center px-[10px] gap-[8px] w-[221px] h-[40px] rounded-[8px] no-underline transition-colors duration-150',
                isActive ? 'bg-[#EAF0EC]' : 'bg-transparent',
              ].join(' ')
            }
          >
            {({ isActive }) => (
              <>
                <img
                  src={item.icon}
                  alt=""
                  aria-hidden="true"
                  className="w-5 h-5 object-contain flex-shrink-0"
                  style={{
                    filter: isActive ? ICON_FILTER_GREEN : ICON_FILTER_WHITE,
                  }}
                />
                <span
                  className={[
                    'font-jakarta text-[16px] leading-[20px] tracking-[-0.006em]',
                    isActive ? 'font-medium text-[#2F6B3F]' : 'font-normal text-[#FAF9F6]',
                  ].join(' ')}
                >
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="flex-1" />

      <div className="flex flex-col gap-[13px] px-[27px] pb-8">
        <button
          type="button"
          onClick={handleLogout}
          className="flex flex-row items-center px-[10px] gap-[8px] w-[221px] h-[40px] bg-transparent border-none cursor-pointer rounded-[8px] transition-colors duration-150 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
          aria-label="Logout dari admin panel"
        >
          <img
            src="/logout-icon.avif"
            alt=""
            aria-hidden="true"
            className="w-5 h-5 object-contain flex-shrink-0"
            style={{ filter: ICON_FILTER_WHITE }}
          />
          <span className="font-jakarta font-normal text-[16px] leading-[20px] tracking-[-0.006em] text-[#FAF9F6]">Logout</span>
        </button>

        <div
          className="flex flex-row items-center px-[10px] gap-[10px] w-[221px] h-[62px] rounded-[8px] bg-brand-surface"
          role="complementary"
          aria-label="Profil admin"
        >
          {/* Avatar placeholder */}
          <div className="w-[38px] h-[38px] rounded-full flex-shrink-0" style={{ backgroundColor: '#D9D9D9' }} aria-hidden="true" />

          {/* Info */}
          <div className="flex flex-col gap-[4px]">
            <span className="font-jakarta font-semibold text-[16px] leading-[20px] tracking-[-0.006em] text-[#1F1F1D]">Habatusauda</span>
            <span className="font-jakarta font-normal text-[14px] leading-[18px] tracking-[-0.006em] text-[#A3A39E]">Administrator</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
