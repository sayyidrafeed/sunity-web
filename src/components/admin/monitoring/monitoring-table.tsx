import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import type { EnergyData } from '@/types/energy-monitoring';
import { Pencil, Trash2, Plus, ChevronLeft, ChevronRight } from 'lucide-react';

interface MonitoringTableProps {
  data: EnergyData[];
  onEditClick: (item: EnergyData) => void;
  onDeleteClick: (item: EnergyData) => void;
}

const INDO_MONTHS = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

export function MonitoringTable({ data, onEditClick, onDeleteClick }: MonitoringTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Pagination logic
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

  const formatIDR = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    })
      .format(num)
      .replace(/\s/g, ''); // Rp120.000 instead of Rp 120.000
  };

  return (
    <div className="flex flex-col gap-[24px]">
      {/* Table Header Section */}
      <div className="flex items-center justify-between">
        <h2 className="font-outfit font-semibold text-[24px] leading-[30px] text-[#1F1F1D]">Riwayat Data Energi</h2>
        <Button
          disabled
          className="bg-[#2F6B3F] hover:bg-[#245330] text-white disabled:opacity-50 disabled:cursor-not-allowed rounded-full px-[24px] py-[12px] font-jakarta font-semibold text-[14px] leading-[20px] flex items-center gap-[8px]"
        >
          <Plus className="w-[16px] h-[16px]" />
          Tambah Data
        </Button>
      </div>

      {/* Table Content */}
      <div className="border border-[#E5E5E3] bg-white rounded-[24px] overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-[#E5E5E3] bg-[#EBF3ED] hover:bg-[#EBF3ED]/50">
              <TableHead className="font-jakarta font-semibold text-[14px] text-[#2F6B3F] py-[18px] pl-[24px]">Bulan, Tahun</TableHead>
              <TableHead className="font-jakarta font-semibold text-[14px] text-[#2F6B3F] py-[18px]">Produksi KwH</TableHead>
              <TableHead className="font-jakarta font-semibold text-[14px] text-[#2F6B3F] py-[18px]">Hemat Biaya</TableHead>
              <TableHead className="font-jakarta font-semibold text-[14px] text-[#2F6B3F] py-[18px]">
                CO<sub>2</sub> Dikurangi
              </TableHead>
              <TableHead className="font-jakarta font-semibold text-[14px] text-[#2F6B3F] py-[18px] pr-[24px] text-right">Edit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((item) => (
              <TableRow key={item.id} className="border-b border-[#F1F1EF] hover:bg-neutral-50/50">
                <TableCell className="font-jakarta font-medium text-[16px] text-[#1F1F1D] py-[16px] pl-[24px]">
                  {INDO_MONTHS[item.month - 1]} {item.year}
                </TableCell>
                <TableCell className="font-jakarta text-[16px] text-[#5A5A57] py-[16px]">{item.kwh}</TableCell>
                <TableCell className="font-jakarta text-[16px] text-[#5A5A57] py-[16px]">{formatIDR(item.price)}</TableCell>
                <TableCell className="font-jakarta text-[16px] text-[#5A5A57] py-[16px]">{item.co2}</TableCell>
                <TableCell className="py-[16px] pr-[24px] text-right">
                  <div className="flex items-center justify-end gap-[8px]">
                    <button
                      onClick={() => onEditClick(item)}
                      disabled
                      className="p-[10px] rounded-full bg-[#F1F1EF] hover:bg-[#E5E5E3] text-[#5A5A57] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label="Ubah data"
                    >
                      <Pencil className="w-[16px] h-[16px]" />
                    </button>
                    <button
                      onClick={() => onDeleteClick(item)}
                      disabled
                      className="p-[10px] rounded-full bg-[#F1F1EF] hover:bg-[#E5E5E3] text-[#5A5A57] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label="Hapus data"
                    >
                      <Trash2 className="w-[16px] h-[16px]" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Table Pagination Section */}
      <div className="flex items-center justify-between mt-[8px]">
        <div className="font-jakarta font-medium text-[14px] text-[#A3A39E]">
          Menampilkan {Math.min(startIndex + 1, totalItems)} - {Math.min(startIndex + itemsPerPage, totalItems)} dari {totalItems} Data
        </div>

        {totalPages > 1 && (
          <div className="flex items-center gap-[8px]">
            {/* Left Button */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="w-[40px] h-[40px] border border-[#E5E5E3] rounded-[10px] bg-white hover:bg-neutral-50 text-[#5A5A57] flex items-center justify-center"
            >
              <ChevronLeft className="w-[20px] h-[20px]" />
            </Button>

            {/* Current Page */}
            <div className="w-[40px] h-[40px] rounded-[10px] bg-white border border-[#E5E5E3] text-[#1F1F1D] font-jakarta font-semibold text-[14px] flex items-center justify-center shadow-none">
              {currentPage}
            </div>

            {/* Right Button */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="w-[40px] h-[40px] border border-[#E5E5E3] rounded-[10px] bg-white hover:bg-neutral-50 text-[#5A5A57] flex items-center justify-center"
            >
              <ChevronRight className="w-[20px] h-[20px]" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
