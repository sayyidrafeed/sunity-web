import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';

interface DonationTableProps {
  className?: string;
  donations?: Array<{
    id: string;
    donorName: string;
    amount: number;
    date: string;
    method: string;
  }>;
}

const formatIDR = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  } catch {
    return dateString;
  }
};

const formatTime = (dateString: string) => {
  try {
    const date = new Date(dateString);
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return '';
  }
};

export function DonationTable({ className, donations = [] }: DonationTableProps) {
  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <h2 className="font-outfit text-2xl font-medium tracking-[-0.006em] text-[#1F1F1D]">Donasi Terbaru</h2>

      <div className="rounded-[15px] filter drop-shadow-[0px_0px_15.6px_rgba(0,0,0,0.1)] bg-[#FAF9F6] border border-[#DDDDDD] overflow-hidden">
        <Table>
          <TableHeader className="bg-[#E0E9E2]">
            <TableRow className="border-b-[#DDDDDD] hover:bg-[#E0E9E2]">
              <TableHead className="font-jakarta text-base font-medium text-[#70A27B] h-9 px-8">Nama Donatur</TableHead>
              <TableHead className="font-jakarta text-base font-medium text-[#70A27B] h-9 px-2.5">Jumlah Donasi</TableHead>
              <TableHead className="font-jakarta text-base font-medium text-[#70A27B] h-9 px-2.5">Tanggal</TableHead>
              <TableHead className="font-jakarta text-base font-medium text-[#70A27B] h-9 px-2.5">Jam</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {donations.length > 0 ? (
              donations.map((donation, index) => (
                <TableRow
                  key={donation.id}
                  className={cn('border-b-[#DDDDDD] transition-colors hover:bg-muted/50', index === donations.length - 1 && 'border-0')}
                >
                  <TableCell className="font-jakarta text-base font-medium text-[#1F1F1D] py-4 px-8 capitalize">{donation.donorName}</TableCell>
                  <TableCell className="font-jakarta text-base font-normal text-[#5A5A57] py-4 px-2.5">{formatIDR(donation.amount)}</TableCell>
                  <TableCell className="font-jakarta text-base font-normal text-[#5A5A57] py-4 px-2.5">{formatDate(donation.date)}</TableCell>
                  <TableCell className="font-jakarta text-base font-normal text-[#5A5A57] py-4 px-2.5">{formatTime(donation.date)}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center font-jakarta text-base text-[#A3A39E]">
                  Belum ada donasi masuk
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
