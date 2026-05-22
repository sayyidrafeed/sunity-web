export type FeaturedCampaignItem = {
  id: string | number;
  title: string;
  image: string;
  url: string;
};

export const featuredCampaigns: FeaturedCampaignItem[] = [
  {
    id: 1,
    title: 'Hadirkan Cahaya Surya, Terangi Kesucian Pura Besakih',
    image: '/images/campaigns/featured/campaign-besakih.png',
    url: '/campaigns/1',
  },
  {
    id: 2,
    title: 'Dukung Panel Surya untuk Kelenteng di Jawa Tengah',
    image: '/images/campaigns/featured/campaign-klenteng.png',
    url: '/campaigns/2',
  },
  {
    id: 3,
    title: 'Energi Terbarukan untuk Vihara Borobudur',
    image: '/images/campaigns/featured/campaign-vihara.png',
    url: '/campaigns/3',
  },
];
