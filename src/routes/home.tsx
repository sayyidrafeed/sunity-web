import { HeroSection } from '@/components/home/hero-section';
import { HowItWorksSection } from '@/components/home/how-it-works-section';
import { CampaignReviewSection } from '@/components/home/campaign-review-section';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <HowItWorksSection />
      <CampaignReviewSection />
    </main>
  );
}
