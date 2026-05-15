import * as React from 'react';
import { cn } from '@/lib/utils';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel';

const FEATURED_CAMPAIGNS = [
  {
    id: 1,
    title: 'Hadirkan Cahaya Surya, Terangi Kesucian Pura Besaikh',
    image: '/images/campaigns/featured/campaign-besakih.png',
  },
  {
    id: 2,
    title: 'Dukung Panel Surya untuk Kelenteng di Jawa Tengah',
    image: '/images/campaigns/featured/campaign-klenteng.png',
  },
  {
    id: 3,
    title: 'Energi Terbarukan untuk Vihara Borobudur',
    image: '/images/campaigns/featured/campaign-vihara.png',
  },
];

export function FeaturedCampaign() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section className="mt-4">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="font-outfit text-2xl font-bold text-brand-text">Butuh Dukungan</h2>
          <div className="h-px w-full bg-[#DDD]" />
        </div>

        <div className="flex flex-col items-center">
          <div className="flex w-full overflow-hidden rounded-[20px] shadow-lg">
            {/* Left Section - Static Text */}
            <div className="relative z-10 flex flex-1 flex-col justify-between bg-[radial-gradient(67.62%_141.94%_at_155.34%_50.08%,_#5CD17B_0%,_#2F6B3F_100%)] p-12 text-white shadow-[10px_0_15px_-5px_rgba(0,0,0,0.3)]">
              <div className="flex flex-col gap-8">
                <h3 className="font-outfit text-[44px] font-bold leading-tight">{FEATURED_CAMPAIGNS[current].title}</h3>
                <a href="#" className="w-fit text-sm font-medium underline underline-offset-4 opacity-90 hover:opacity-100">
                  Donasi Sekarang
                </a>
              </div>

              <div className="font-jakarta text-[32px] font-bold">#SunityEcoFaith</div>
            </div>

            {/* Right Section - Swipeable Images */}
            <div className="w-[60%] max-w-[826px]">
              <Carousel setApi={setApi} className="w-full">
                <CarouselContent>
                  {FEATURED_CAMPAIGNS.map((campaign) => (
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

          {/* Pagination Dots - Centered to entire web */}
          <div className="mt-6 flex items-center justify-center gap-[7px]">
            {FEATURED_CAMPAIGNS.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={cn('h-2 rounded-full transition-all duration-300', current === index ? 'w-6 bg-[#2F6B3F]' : 'w-2 bg-[#DDD]')}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
