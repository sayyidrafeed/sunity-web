import { Link } from 'react-router';

export function Footer() {
  return (
    <footer id="tentang-kami" className="relative overflow-hidden bg-brand-surface px-6 pb-10 pt-20">
      <img
        src="/images/footer-line.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-20 z-0 w-full object-cover opacity-80"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.8fr_1fr]">
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <img src="/sunity.avif" alt="Sunity" className="h-12 w-9 object-contain" />

              <div>
                <p className="font-outfit text-3xl font-bold leading-none text-brand-green">Sunity</p>
                <p className="mt-1 font-jakarta text-sm font-medium text-brand-green">Crowdfunding Platform</p>
              </div>
            </div>

            <p className="mt-5 max-w-[290px] font-jakarta text-sm leading-relaxed text-brand-text">
              Platform donasi berbasis komunitas yang mendukung pemasangan energi surya di rumah ibadah. Bersama, kita menghadirkan energi bersih dan
              menciptakan dampak nyata bagi lingkungan dan masyarakat.
            </p>
          </div>

          <div>
            <h4 className="font-jakarta text-sm font-semibold uppercase tracking-wide text-brand-light-gray">Company</h4>

            <div className="mt-4 flex flex-col gap-3 font-jakarta text-sm text-brand-text">
              <Link to="/about" className="transition hover:text-brand-green">
                About Us
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-jakarta text-sm font-semibold uppercase tracking-wide text-brand-light-gray">Navigation</h4>

            <div className="mt-4 flex flex-col gap-3 font-jakarta text-sm text-brand-text">
              <Link to="/" className="transition hover:text-brand-green">
                Home
              </Link>
              <Link to="/#cara-kerja" className="transition hover:text-brand-green">
                Cara Kerja
              </Link>
              <Link to="/campaigns" className="transition hover:text-brand-green">
                Kampanye
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-jakarta text-sm font-semibold uppercase tracking-wide text-brand-light-gray">Contact</h4>

            <div className="mt-4 flex flex-col gap-3 font-jakarta text-sm text-brand-text">
              <div className="flex items-center gap-3">
                <img src="/images/footer-phone.png" alt="" aria-hidden="true" className="h-4 w-4 object-contain" />
                <span>0821-1888-9208</span>
              </div>

              <div className="flex items-center gap-3">
                <img src="/images/footer-email.png" alt="" aria-hidden="true" className="h-4 w-4 object-contain" />
                <span>sunity@gmail.com</span>
              </div>
            </div>

            <div className="mt-7">
              <p className="font-jakarta text-sm font-semibold uppercase tracking-wide text-brand-light-gray">Follow Us</p>

              <div className="mt-3 flex items-center gap-4">
                <a href="#" aria-label="Instagram" className="transition hover:brightness-90">
                  <img src="/images/footer-instagram.png" alt="" aria-hidden="true" className="h-9 w-9 object-contain" />
                </a>

                <a href="#" aria-label="LinkedIn" className="transition hover:brightness-90">
                  <img src="/images/footer-linkedin.png" alt="" aria-hidden="true" className="h-9 w-9 object-contain" />
                </a>

                <a href="#" aria-label="YouTube" className="transition hover:brightness-90">
                  <img src="/images/footer-youtube.png" alt="" aria-hidden="true" className="h-9 w-9 object-contain" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-border" />

        <div className="mt-7 flex flex-col items-center justify-between gap-4 font-jakarta text-sm text-brand-gray md:flex-row">
          <p>© 2026 Sunity. All Right Reserved</p>

          <div className="flex items-center gap-2">
            <a href="#" className="transition hover:text-brand-green">
              Terms & Conditions
            </a>
            <span>|</span>
            <a href="#" className="transition hover:text-brand-green">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
