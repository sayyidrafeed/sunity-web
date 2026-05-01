import { useEffect } from 'react';
import { useLocation } from 'react-router';

import { HeroSection } from '@/components/home/hero-section';
import { HowItWorksSection } from '@/components/home/how-it-works-section';
import { CampaignReviewSection } from '@/components/home/campaign-review-section';

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const section = document.querySelector(location.hash);

      if (section) {
        section.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }
  }, [location]);

  return (
    <main>
      <HeroSection />
      <HowItWorksSection />
      <CampaignReviewSection />
    </main>
  );
}
