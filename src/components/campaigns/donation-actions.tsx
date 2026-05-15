import { Button } from '@/components/ui/button';
import { LucideHandHelping, LucideShare2 } from 'lucide-react';

export function DonationActions() {
  return (
    <div className="fixed bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-4 rounded-full bg-white/80 p-3 shadow-2xl backdrop-blur-md border border-brand-light-gray/10 z-50">
      <Button className="h-14 rounded-full bg-brand-green px-8 text-lg font-bold text-white hover:bg-brand-green/90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-brand-green/20">
        Donasi Sekarang
        <LucideHandHelping className="ml-2 h-6 w-6" />
      </Button>
      <Button
        variant="outline"
        className="h-14 w-14 rounded-full border-brand-green text-brand-green hover:bg-brand-green hover:text-white transition-all hover:scale-105 active:scale-95"
      >
        <LucideShare2 className="h-6 w-6" />
      </Button>
    </div>
  );
}
