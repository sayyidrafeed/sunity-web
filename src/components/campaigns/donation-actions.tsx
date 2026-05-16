import { Button } from '@/components/ui/button';
import { LucideHandHelping, LucideShare2 } from 'lucide-react';
import { WorshipPlaceDialog } from '@/components/campaigns/worship-place-dialog';

interface DonationActionsProps {
  campaign?: {
    worshipPlace?: {
      name: string;
      address?: string;
    };
    admin?: {
      name: string;
      description?: string;
    };
  };
}

export function DonationActions({ campaign }: DonationActionsProps) {
  const worshipPlace = campaign?.worshipPlace ?? {
    name: 'Masjid Al - Ikhlas',
    address: 'Jl. Swasembada Timur XXII No. 11',
  };

  const admin = {
    name: campaign?.admin?.name ?? 'Nama Administrator',
    description:
      campaign?.admin?.description ?? 'Lorem Ipsum Dolor Sit Amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna.',
  };

  return (
    <div className="fixed bottom-8 left-1/2 z-50 flex -translate-x-1/2 items-center gap-4">
      <Button className="group h-14 rounded-full border-[1.5px] border-transparent bg-brand-green px-8 text-lg font-bold text-white shadow-[0_10px_16.5px_rgba(47,107,63,0.25)] transition-all hover:border-brand-green hover:bg-transparent hover:text-brand-green hover:shadow-none active:scale-95">
        <span className="transition-colors">Donasi Sekarang</span>
        <LucideHandHelping className="ml-2 h-6 w-6 transition-colors" />
      </Button>

      <WorshipPlaceDialog
        worshipPlace={worshipPlace}
        admin={admin}
        trigger={
          <Button
            variant="outline"
            className="h-14 rounded-full border-brand-green bg-white px-8 text-lg font-bold text-brand-green transition-all hover:scale-105 hover:bg-brand-green hover:text-white active:scale-95"
          >
            Bagikan
            <LucideShare2 className="ml-2 h-6 w-6" />
          </Button>
        }
      />
    </div>
  );
}
