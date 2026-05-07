import { CheckCircle2, ChevronDown, HelpCircle } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

// Status to SubStatus mapping
const STATUS_SUBSTATUS_MAP: Record<string, string> = {
  Aktif: 'Sedang Berjalan',
  Instalasi: 'Proses Pemasangan',
  Selesai: 'Kampanye Berakhir',
};

// Derived list of available status options from the mapping
const STATUS_OPTIONS = Object.keys(STATUS_SUBSTATUS_MAP);

interface CampaignStatusCardProps {
  status: string;
  subStatus: string;
  className?: string;
}

export function CampaignStatusCard({
  status: initialStatus = 'Aktif',
  subStatus: initialSubStatus = 'Sedang Berjalan',
  className,
}: CampaignStatusCardProps) {
  const [status, setStatus] = useState(initialStatus);
  const [subStatus, setSubStatus] = useState(initialSubStatus);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingStatus, setPendingStatus] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sync props to state when they change (prop updates after mount)
  useEffect(() => {
    setStatus(initialStatus);
    setSubStatus(initialSubStatus);
  }, [initialStatus, initialSubStatus]);

  // Close dropdown when clicking outside or pressing Escape
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleStatusSelect = (newStatus: string) => {
    if (newStatus === status) {
      setIsDropdownOpen(false);
      return;
    }
    setPendingStatus(newStatus);
    setIsModalOpen(true);
    setIsDropdownOpen(false);
  };

  const confirmStatusChange = () => {
    const newSubStatus = STATUS_SUBSTATUS_MAP[pendingStatus];
    if (newSubStatus) {
      setStatus(pendingStatus);
      setSubStatus(newSubStatus);
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <Card className={cn('rounded-[25px] border-[#DDDDDD] bg-[#FAF9F6] shadow-[0px_14px_37.8px_rgba(54,53,53,0.1)] p-8', className)}>
        <CardContent className="p-0 flex flex-col gap-6 relative">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-2.5 px-2.5 py-1 bg-[#E2E6FD] rounded-[20px]">
              <CheckCircle2 className="w-[18px] h-[18px] text-[#3951DC]" />
              <h3 className="font-jakarta text-base font-bold text-[#9DACFF]">Status Kampanye</h3>
            </div>
          </div>

          {/* Action Chevron Button */}
          <button
            type="button"
            aria-label="Ubah status kampanye"
            aria-expanded={isDropdownOpen}
            aria-haspopup="menu"
            className="absolute right-0 top-0 text-[#3951DC] p-1 rounded-full hover:bg-[#E2E6FD]/50 transition-all duration-300 z-10"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <ChevronDown className={cn('w-6 h-6 transition-transform duration-300', isDropdownOpen && 'rotate-180')} />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div
              ref={dropdownRef}
              role="menu"
              className="absolute right-0 top-10 w-[147px] bg-[#FAF9F6] border border-[#DDDDDD] shadow-[0px_14px_37.8px_rgba(54,53,53,0.1)] rounded-[12px] py-2 z-20 animate-in fade-in zoom-in duration-200"
            >
              {STATUS_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  role="menuitem"
                  aria-label={`Ubah status ke ${option}`}
                  aria-current={status === option ? 'true' : 'false'}
                  className={cn(
                    'w-full px-4 py-2 text-left font-jakarta text-sm transition-colors hover:bg-[#E2E6FD]/50 focus:bg-[#E2E6FD]/50 focus:outline-none',
                    status === option ? 'text-[#3951DC] font-bold' : 'text-[#363535]'
                  )}
                  onClick={() => handleStatusSelect(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <div className="font-outfit text-5xl font-semibold leading-tight tracking-[-0.006em] text-[#3951DC]">{status}</div>
            <p className="font-jakarta text-base text-[#3951DC]">{subStatus}</p>
          </div>
        </CardContent>
      </Card>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white border border-[#DDDDDD] shadow-[0px_10px_32px_rgba(54,53,53,0.3)] rounded-[25px] w-[424px] p-8 flex flex-col items-center gap-6 animate-in zoom-in-95 duration-300">
            <div className="relative">
              <div className="w-20 h-20 bg-[#E8F5E9] rounded-full flex items-center justify-center">
                <HelpCircle className="w-10 h-10 text-[#307548]" />
              </div>
            </div>

            <div className="text-center flex flex-col gap-2">
              <h2 className="font-jakarta text-xl font-bold text-[#363535]">Ganti Status Kampanye?</h2>
              <p className="font-jakarta text-sm text-[#666666] px-4">Apakah Anda yakin ingin mengubah status kampanye ini?</p>
            </div>

            <div className="flex items-center gap-3 w-full mt-2">
              <button
                className="flex-1 px-6 py-2.5 rounded-full border border-[#DDDDDD] font-jakarta font-semibold text-[#666666] hover:bg-gray-50 transition-colors"
                onClick={() => setIsModalOpen(false)}
              >
                Batal
              </button>
              <button
                className="flex-1 px-6 py-2.5 rounded-full bg-[#307548] font-jakarta font-semibold text-white hover:bg-[#255e39] transition-colors"
                onClick={confirmStatusChange}
              >
                Konfirmasi
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
