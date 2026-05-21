export type FeaturedCampaignItem = {
  id: string | number;
  title: string;
  image: string;
};

export const featuredCampaigns: FeaturedCampaignItem[] = [
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
