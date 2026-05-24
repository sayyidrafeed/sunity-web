import { Check } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#0C111D]/45 backdrop-blur-[5px] z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-b from-[#E7F6EC] via-white to-white rounded-[36px] p-10 md:p-12 max-w-[480px] w-full flex flex-col items-center text-center shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-white/60 animate-in fade-in zoom-in-95 duration-200">
        {/* Concentric Green Rings for Success Checkmark */}
        <div className="w-[140px] h-[140px] rounded-full bg-[#EBF3ED]/80 flex items-center justify-center mb-7">
          <div className="w-[100px] h-[100px] rounded-full bg-[#CFE3D5] flex items-center justify-center">
            <div className="w-[72px] h-[72px] rounded-full bg-[#2F6B3F] flex items-center justify-center shadow-[0_4px_12px_rgba(47,107,63,0.3)]">
              <Check className="w-8 h-8 text-white stroke-[3.5]" />
            </div>
          </div>
        </div>

        {/* Heading */}
        <h2 className="font-outfit font-bold text-[26px] leading-[33px] text-[#1F1F1D] mb-3">Kampanye Berhasil Dibuat!</h2>

        {/* Description */}
        <p className="font-jakarta text-[15px] leading-[22px] text-[#5A5A57] max-w-[340px] mb-8">
          Kampanye berhasil dibuat dan siap untuk ditinjau lebih lanjut pada menu Kelola Kampanye.
        </p>

        {/* Action Button */}
        <button
          type="button"
          onClick={onClose}
          className="bg-[#2F6B3F] hover:bg-[#204E2D] text-white font-jakarta font-semibold text-[15px] h-[48px] px-14 rounded-full transition-all duration-200 cursor-pointer shadow-[0_4px_14px_rgba(47,107,63,0.35)] active:scale-[0.98]"
        >
          Selesai
        </button>
      </div>
    </div>
  );
}

export default SuccessModal;
