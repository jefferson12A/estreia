import React from 'react';
import { Clock, UtensilsCrossed, Flame, ShoppingBag } from 'lucide-react';

export type ActiveTab = 'estreia' | 'cardapio' | 'lote-vip';

interface BottomNavProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  cartCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectTab,
  cartCount,
}) => {
  return (
    <nav className="fixed bottom-0 inset-x-0 bg-[#141211]/95 backdrop-blur-xl border-t border-white/10 z-40 py-2">
      <div className="w-full max-w-md mx-auto px-6 flex items-center justify-around">
        {/* Tab 1: Estreia */}
        <button
          onClick={() => onSelectTab('estreia')}
          id="nav-estreia"
          className={`flex flex-col items-center gap-1 transition-all relative py-1 px-3 rounded-xl cursor-pointer ${
            activeTab === 'estreia'
              ? 'text-[#ff5400]'
              : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          <Clock className={`w-5 h-5 ${activeTab === 'estreia' ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
          <span className="text-[11px] font-bold tracking-tight">Estreia</span>
          {activeTab === 'estreia' && (
            <span className="w-1 h-1 rounded-full bg-[#ff5400] absolute bottom-0"></span>
          )}
        </button>

        {/* Tab 2: Cardápio */}
        <button
          onClick={() => onSelectTab('cardapio')}
          id="nav-cardapio"
          className={`flex flex-col items-center gap-1 transition-all relative py-1 px-3 rounded-xl cursor-pointer ${
            activeTab === 'cardapio'
              ? 'text-[#ff5400]'
              : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          <UtensilsCrossed className={`w-5 h-5 ${activeTab === 'cardapio' ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
          <span className="text-[11px] font-bold tracking-tight">Cardápio</span>
          {activeTab === 'cardapio' && (
            <span className="w-1 h-1 rounded-full bg-[#ff5400] absolute bottom-0"></span>
          )}
        </button>

        {/* Tab 3: Lote VIP */}
        <button
          onClick={() => onSelectTab('lote-vip')}
          id="nav-lote-vip"
          className={`flex flex-col items-center gap-1 transition-all relative py-1 px-3 rounded-xl cursor-pointer ${
            activeTab === 'lote-vip'
              ? 'text-[#ff5400]'
              : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          <div className="relative">
            <Flame className={`w-5 h-5 ${activeTab === 'lote-vip' ? 'text-[#ff5400] fill-[#ff5400]' : ''}`} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2.5 w-4 h-4 rounded-full bg-[#ff5400] text-white text-[9px] font-extrabold flex items-center justify-center border-2 border-[#141211]">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[11px] font-bold tracking-tight">Lote VIP</span>
          {activeTab === 'lote-vip' && (
            <span className="w-1 h-1 rounded-full bg-[#ff5400] absolute bottom-0"></span>
          )}
        </button>
      </div>
    </nav>
  );
};
