import React from 'react';
import { Utensils, Star, ArrowRight, MapPin } from 'lucide-react';
import { MenuItem } from '../types';

interface MenuSliderProps {
  items: MenuItem[];
  onSelectItem: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
}

export const MenuSlider: React.FC<MenuSliderProps> = ({
  items,
  onSelectItem,
  onQuickAdd,
}) => {
  const item = items[0];
  if (!item) return null;

  return (
    <div className="w-full max-w-md mx-auto px-4 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Utensils className="w-4 h-4 text-[#ff5400]" />
          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
            Cardápio Especial
          </h3>
        </div>
        <span className="text-xs font-black text-[#fbbf24] tracking-wider uppercase">
          Apenas R$ 5,00
        </span>
      </div>

      {/* Featured Item Card */}
      <div 
        id="card-salgado-refri"
        onClick={() => onSelectItem(item)}
        className="w-full bg-[#181514] border border-[#ff5400]/40 rounded-2xl overflow-hidden shadow-xl group hover:border-[#ff5400] transition-all cursor-pointer text-left"
      >
        {/* Image Banner */}
        <div className="relative w-full h-44 bg-[#121212] overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#181514] via-transparent to-black/40"></div>

          {/* Top badges */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            <span className="px-2.5 py-1 rounded-full bg-[#ff5400] text-white text-[11px] font-black uppercase tracking-wider flex items-center gap-1 shadow-md">
              <Star className="w-3 h-3 fill-white" />
              <span>Destaque</span>
            </span>
          </div>

          <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-[#fbbf24] text-xs font-black">
            R$ 5,00 un
          </div>

          <div className="absolute bottom-2 left-3 right-3 flex items-end justify-between">
            <span className="text-[11px] text-[#fbbf24] font-bold drop-shadow">
              Sabores: Misto • Mistão • Carne • Frango
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h4 className="text-base sm:text-lg font-black text-white leading-tight">
              {item.name}
            </h4>
            <span className="text-lg font-black text-[#fbbf24] shrink-0">
              R$ 5,00
            </span>
          </div>

          <p className="text-xs text-stone-300 leading-relaxed mb-3">
            Salgado artesanal frito na hora crocante (Misto, Mistão, Carne ou Frango) acompanhado de Refrigerante geladinho ou Vitamina cremosa.
          </p>

          <div className="flex items-center gap-1 text-[11px] text-[#fbbf24] font-bold mb-3">
            <MapPin className="w-3.5 h-3.5 text-[#ff5400] shrink-0" />
            <span>Na Escola São Francisco • 18:00 às 21:00</span>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-white/10">
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-stone-400">
                A partir de <strong className="text-white">R$ 5,00</strong>
              </span>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onQuickAdd(item);
              }}
              id="btn-pedir-salgado-refri"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#ff5400] to-[#ea580c] hover:from-[#ff661a] hover:to-[#f97316] text-white font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-orange-950/40 cursor-pointer transition-all"
            >
              <span>Agendar Agora</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
