import * as React from 'react';
import { cn } from '@/lib/utils';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel';

import { featuredCampaigns, type FeaturedCampaignItem } from '@/data/featured-campaigns';

interface FeaturedCampaignProps {
  campaigns?: FeaturedCampaignItem[];
  donateButtonLabel?: string;
  sectionTitle?: string;
}

export function FeaturedCampaign({
  campaigns = featuredCampaigns,
  donateButtonLabel = 'Donasi Sekarang',
  sectionTitle = 'Butuh Dukungan',
}: FeaturedCampaignProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  const activeCampaign = campaigns[current] ?? campaigns[0];

  React.useEffect(() => {
    if (!api) return;

    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    handleSelect();

    api.on('select', handleSelect);

    return () => {
      api.off('select', handleSelect);
    };
  }, [api]);

  if (!activeCampaign) {
    return null;
  }

  return (
    <section className="mt-4">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="font-outfit text-2xl font-bold text-brand-text">{sectionTitle}</h2>

          <div className="h-px w-full bg-border" />
        </div>

        <div className="flex flex-col items-center">
          <div className="flex w-full overflow-hidden rounded-[20px] shadow-lg">
            <div className="relative z-10 flex flex-1 flex-col justify-between overflow-hidden bg-brand-green p-12 text-white shadow-[10px_0_15px_-5px_rgba(0,0,0,0.3)]">
              {/* Layer 1 - Background gradient */}
              <div className="absolute inset-y-0 left-[14%] right-0 bg-gradient-to-r from-brand-green to-brand-green-light" />

              {/* Layer 2 - Text panel */}
              <div className="absolute inset-y-0 left-0 w-[84%] bg-gradient-to-r from-brand-green to-brand-green-light" />

              <div className="relative z-10 flex flex-col gap-8">
                <h3 className="max-w-[380px] font-outfit text-[40px] font-bold leading-[1.15] tracking-[-0.02em]">{activeCampaign.title}</h3>

                <a href={activeCampaign.url} className="w-fit text-sm font-medium underline underline-offset-4 opacity-90 hover:opacity-100">
                  {donateButtonLabel}
                </a>
              </div>

              <div className="relative z-10 font-jakarta text-[32px] font-bold">#SunityEcoFaith</div>
            </div>

            <div className="w-[60%] max-w-[826px]">
              <Carousel setApi={setApi} className="w-full">
                <CarouselContent>
                  {campaigns.map((campaign) => (
                    <CarouselItem key={campaign.id}>
                      <div className="h-[615px] w-full">
                        <img src={campaign.image} alt={campaign.title} className="h-full w-full object-cover" />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-[7px]">
            {campaigns.map((campaign, index) => (
              <button
                key={campaign.id}
                type="button"
                onClick={() => api?.scrollTo(index)}
                className={cn('h-2 rounded-full transition-all duration-300', current === index ? 'w-6 bg-brand-green' : 'w-2 bg-border')}
                aria-label={`Pindah ke slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
