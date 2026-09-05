import React from 'react';
import { Sparkles, User, Bell } from 'lucide-react';
import { ASSETS } from '../data/menuData';

interface HeaderProps {
  onOpenVipStatus?: () => void;
  activeReservationCount?: number;
}

export const Header: React.FC<HeaderProps> = ({ onOpenVipStatus, activeReservationCount = 0 }) => {
  return (
    <header className="w-full max-w-md mx-auto px-4 py-3 flex items-center justify-between border-b border-white/5 sticky top-0 bg-[#121212]/95 backdrop-blur-md z-40">
      {/* Brand logo & name */}
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-full overflow-hidden border border-[#ff5400]/40 p-0.5 shadow-sm shadow-[#ff5400]/20 bg-[#1c1917] flex items-center justify-center">
          <img
            src={ASSETS.logo}
            alt="Jellive Salgados"
            className="w-full h-full object-cover rounded-full"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="flex flex-col leading-tight">
          <span className="text-[13px] font-extrabold text-white tracking-tight flex items-center gap-1">
            Jellive
          </span>
          <span className="text-[9px] font-bold text-[#f59e0b] tracking-wider uppercase">
            SALGADOS
          </span>
        </div>
      </div>

      {/* Center Tag: GRANDE ESTREIA */}
      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3d0909]/70 border border-[#b91c1c]/50">
        <span className="w-2 h-2 rounded-full bg-[#ef4444] animate-pulse"></span>
        <span className="text-[10px] font-bold tracking-wider text-[#fca5a5] uppercase">
          GRANDE ESTREIA
        </span>
      </div>

      {/* Right side: Countdown status & button */}
      <div className="flex items-center gap-2">
        <div className="hidden sm:flex flex-col items-end text-right">
          <span className="text-[11px] font-semibold text-stone-300">Countdown</span>
          <span className="text-[9px] font-medium text-stone-400">Launch 2026</span>
        </div>
        
        <button
          onClick={onOpenVipStatus}
          aria-label="Ver Agendamento VIP"
          className="relative w-8 h-8 rounded-full bg-[#1c1917] border border-white/15 flex items-center justify-center text-stone-300 hover:text-white hover:border-[#ff5400] transition-colors"
        >
          <img
            src={ASSETS.logo}
            alt="VIP Status"
            className="w-6 h-6 rounded-full object-cover"
            referrerPolicy="no-referrer"
          />
          {activeReservationCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#ff5400] text-[9px] font-extrabold text-white rounded-full flex items-center justify-center border-2 border-[#121212]">
              {activeReservationCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
