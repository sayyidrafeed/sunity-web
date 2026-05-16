import { MapPin, Phone, User, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';

export interface WorshipPlaceData {
  name: string;
  address?: string;
  phone?: string;
}

export interface AdminData {
  name: string;
  description?: string;
}

interface WorshipPlaceDialogProps {
  trigger: React.ReactNode;
  worshipPlace: WorshipPlaceData;
  admin: AdminData;
}

const UNAVAILABLE_PLACEHOLDER = '-';

export function WorshipPlaceDialog({ trigger, worshipPlace, admin }: WorshipPlaceDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-[533px] rounded-[25px] p-[25px_32px] border-none bg-brand-surface shadow-2xl">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
          <DialogTitle className="text-xl font-bold text-brand-heading">Data Rumah Ibadah</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Worship Place Info Card */}
          <div className="rounded-2xl bg-white p-5 space-y-4 border border-brand-light-gray/10 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-surface">
                <Building className="h-5 w-5 text-brand-green" />
              </div>
              <span className="font-semibold text-brand-heading">{worshipPlace.name}</span>
            </div>
            {worshipPlace.address && (
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-surface">
                  <MapPin className="h-5 w-5 text-brand-green" />
                </div>
                <span className="text-sm text-brand-gray">{worshipPlace.address}</span>
              </div>
            )}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-surface">
                <Phone className="h-5 w-5 text-brand-green" />
              </div>
              <span className="text-sm text-brand-gray">{worshipPlace.phone || UNAVAILABLE_PLACEHOLDER}</span>
            </div>
          </div>

          {/* Admin Info Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-brand-heading">Info Administrator</h3>
            <div className="rounded-2xl bg-white p-5 space-y-3 border border-brand-light-gray/10 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-surface">
                  <User className="h-5 w-5 text-brand-green" />
                </div>
                <span className="font-semibold text-brand-heading">{admin.name}</span>
              </div>
              {admin.description && (
                <div className="rounded-xl bg-brand-surface p-3">
                  <p className="text-sm leading-relaxed text-brand-gray">{admin.description}</p>
                </div>
              )}
            </div>
          </div>

          <DialogClose asChild>
            <Button className="w-full h-12 mt-[42px] rounded-full bg-brand-green font-bold text-white hover:bg-brand-green/90 transition-all shadow-lg shadow-brand-green/10">
              Kembali
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
