/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LucideLayoutList, LucideFileText, LucideZap } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import { CampaignDescription } from './campaign-description';
import { EnergyDashboard } from './energy-dashboard';

// Proposed Interface for Expense/Transparency
// TODO: Align with SDK types once available
export interface CampaignExpense {
  date: string;
  amount: number;
  description: string;
}

const MOCK_EXPENSES: CampaignExpense[] = Array(5).fill({
  date: 'DD/MM/YYYY',
  amount: 400000,
  description: 'Lorem Ipsum Dolor Sit Amet',
});

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

interface CampaignTabsProps {
  campaign: any;
}

export function CampaignTabs({ campaign }: CampaignTabsProps) {
  const navigate = useNavigate();
  const { id, tab = 'ringkasan' } = useParams();

  const handleTabChange = (value: string) => {
    if (value === 'ringkasan') {
      navigate(`/campaigns/${id}`);
    } else {
      navigate(`/campaigns/${id}/${value}`);
    }
  };

  return (
    <Tabs value={tab} onValueChange={handleTabChange} className="w-full">
      <TabsList className="mb-8 h-auto w-full justify-start rounded-none border-b border-brand-light-gray/20 bg-transparent p-0">
        <TabsTrigger
          value="ringkasan"
          className="flex items-center gap-2 rounded-none border-b-2 border-transparent px-4 py-3 text-brand-light-gray data-[state=active]:border-brand-green data-[state=active]:bg-transparent data-[state=active]:text-brand-green data-[state=active]:shadow-none"
        >
          <LucideLayoutList className="h-4 w-4" />
          <span className="font-semibold">Ringkasan</span>
        </TabsTrigger>
        <TabsTrigger
          value="transparansi"
          className="flex items-center gap-2 rounded-none border-b-2 border-transparent px-4 py-3 text-brand-light-gray data-[state=active]:border-brand-green data-[state=active]:bg-transparent data-[state=active]:text-brand-green data-[state=active]:shadow-none"
        >
          <LucideFileText className="h-4 w-4" />
          <span className="font-semibold">Laporan Transparansi</span>
        </TabsTrigger>

        {campaign.status === 'Selesai' && (
          <TabsTrigger
            value="energy"
            className="flex items-center gap-2 rounded-none border-b-2 border-transparent px-4 py-3 text-brand-light-gray data-[state=active]:border-brand-green data-[state=active]:bg-transparent data-[state=active]:text-brand-green data-[state=active]:shadow-none"
          >
            <LucideZap className="h-4 w-4" />
            <span className="font-semibold">Dashboard Energi</span>
          </TabsTrigger>
        )}
      </TabsList>

      <TabsContent value="ringkasan" className="mt-0">
        <CampaignDescription campaign={campaign} />
      </TabsContent>

      <TabsContent value="transparansi" className="mt-0">
        <div className="flex flex-col gap-8 rounded-[2.5rem] border border-brand-light-gray/10 bg-white p-10 shadow-sm">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold text-brand-text">Transparansi Penggunaan Dana</h2>
            <p className="text-sm text-brand-gray">Rincian penggunaan dana dari Kampanye ini:</p>
          </div>

          <div className="w-full">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-brand-green/30 hover:bg-transparent">
                  <TableHead className="w-[30%] text-brand-green font-semibold">Tanggal</TableHead>
                  <TableHead className="w-[30%] text-brand-green font-semibold">Jumlah</TableHead>
                  <TableHead className="w-[40%] text-brand-green font-semibold">Keterangan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_EXPENSES.map((expense, index) => (
                  <TableRow key={index} className="border-none hover:bg-transparent">
                    <TableCell className="py-4 text-brand-gray">{expense.date}</TableCell>
                    <TableCell className="py-4 text-brand-gray">{formatCurrency(expense.amount)}</TableCell>
                    <TableCell className="py-4 text-brand-gray">{expense.description}</TableCell>
                  </TableRow>
                ))}

                {/* Summary section embedded in table rows for perfect alignment */}
                <TableRow className="border-none hover:bg-transparent">
                  <TableCell className="border-b border-brand-light-gray/40 pb-3 pt-8 text-sm text-brand-gray">Dicairkan</TableCell>
                  <TableCell className="border-b border-brand-light-gray/40 pb-3 pt-8 text-sm font-medium text-brand-gray">
                    {formatCurrency(2000000)}
                  </TableCell>
                  <TableCell className="pb-3 pt-8"></TableCell>
                </TableRow>
                <TableRow className="border-none hover:bg-transparent">
                  <TableCell className="py-3 text-sm text-brand-gray">Belum Dicairkan</TableCell>
                  <TableCell className="py-3 text-base font-bold text-brand-text">{formatCurrency(98000000)}</TableCell>
                  <TableCell className="py-3"></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="energy" className="mt-0">
        <EnergyDashboard campaign={campaign} />
      </TabsContent>
    </Tabs>
  );
}
