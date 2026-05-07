import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';

const MOCK_DONATIONS = [
  { id: 1, name: 'Johkowee', amount: 'Rp100.000', date: 'DD/MM/YYYY', time: '14.02' },
  { id: 2, name: 'Johkowee', amount: 'Rp100.000', date: 'DD/MM/YYYY', time: '14.02' },
  { id: 3, name: 'Johkowee', amount: 'Rp100.000', date: 'DD/MM/YYYY', time: '14.02' },
  { id: 4, name: 'Johkowee', amount: 'Rp100.000', date: 'DD/MM/YYYY', time: '14.02' },
  { id: 5, name: 'Johkowee', amount: 'Rp100.000', date: 'DD/MM/YYYY', time: '14.02' },
  { id: 6, name: 'Johkowee', amount: 'Rp100.000', date: 'DD/MM/YYYY', time: '14.02' },
  { id: 7, name: 'Johkowee', amount: 'Rp100.000', date: 'DD/MM/YYYY', time: '14.02' },
  { id: 8, name: 'Johkowee', amount: 'Rp100.000', date: 'DD/MM/YYYY', time: '14.02' },
  { id: 9, name: 'Johkowee', amount: 'Rp100.000', date: 'DD/MM/YYYY', time: '14.02' },
  { id: 10, name: 'Johkowee', amount: 'Rp100.000', date: 'DD/MM/YYYY', time: '14.02' },
];

export function DonationTable({ className }: { className?: string }) {
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
            {MOCK_DONATIONS.map((donation, index) => (
              <TableRow
                key={donation.id}
                className={cn('border-b-[#DDDDDD] transition-colors hover:bg-muted/50', index === MOCK_DONATIONS.length - 1 && 'border-0')}
              >
                <TableCell className="font-jakarta text-base font-medium text-[#1F1F1D] py-4 px-8 capitalize">{donation.name}</TableCell>
                <TableCell className="font-jakarta text-base font-normal text-[#5A5A57] py-4 px-2.5">{donation.amount}</TableCell>
                <TableCell className="font-jakarta text-base font-normal text-[#5A5A57] py-4 px-2.5">{donation.date}</TableCell>
                <TableCell className="font-jakarta text-base font-normal text-[#5A5A57] py-4 px-2.5">{donation.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
