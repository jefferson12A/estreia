import React, { useState } from 'react';
import { X, Star, Flame, Sparkles, Check, Plus, Minus } from 'lucide-react';
import { MenuItem } from '../types';

interface ItemDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (item: MenuItem, qty: number) => void;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({
  item,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState<number>(1);

  if (!item) return null;

  const handleAdd = () => {
    onAddToCart(item, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="w-full max-w-sm bg-[#181514] border border-[#ff5400]/40 rounded-3xl overflow-hidden shadow-2xl my-auto text-left relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/70 hover:bg-black/90 text-white flex items-center justify-center transition-colors z-20 cursor-pointer border border-white/10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Big Food Image */}
        <div className="relative w-full h-52 bg-[#121212]">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#181514] via-transparent to-black/30"></div>

          {item.badge && (
            <div className="absolute bottom-3 left-4 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-sm border border-white/10 text-xs font-bold text-[#fbbf24] flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-[#fbbf24] fill-[#fbbf24]" />
              <span>{item.badge}</span>
            </div>
          )}
        </div>

        {/* Body Content */}
        <div className="p-5 space-y-4">
          <div>
            <h3 className="text-xl font-black text-white leading-tight">
              {item.name}
            </h3>
            <span className="text-xs font-bold text-[#ff7834] block mt-0.5">
              {item.subtitle}
            </span>
          </div>

          <p className="text-xs text-stone-300 leading-relaxed">
            {item.description}
          </p>

          {/* Portion specification */}
          <div className="bg-[#12100f] border border-white/10 rounded-xl p-2.5 flex items-center justify-between">
            <span className="text-[11px] text-stone-400">Tamanho da porção</span>
            <span className="text-xs font-bold text-white">{item.portionSize}</span>
          </div>

          {/* Ingredients list */}
          {item.ingredients && item.ingredients.length > 0 && (
            <div>
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-1.5">
                Ingredientes Selecionados
              </span>
              <div className="flex flex-wrap gap-1.5">
                {item.ingredients.map((ing, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-[#221c19] text-stone-300 text-[11px] font-medium border border-white/5"
                  >
                    <Check className="w-3 h-3 text-[#ff5400]" />
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Quantity and Add CTA */}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-3">
            {/* Quantity Stepper */}
            <div className="flex items-center gap-2 bg-[#271511] border border-[#ff5400]/40 rounded-xl p-1 shrink-0">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-8 h-8 rounded-lg bg-[#181514] text-white hover:bg-[#ff5400] flex items-center justify-center transition-colors cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-6 text-center text-xs font-black text-white tabular-nums">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="w-8 h-8 rounded-lg bg-[#ff5400] text-white flex items-center justify-center hover:bg-[#ff661a] transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Add Button */}
            <button
              type="button"
              onClick={handleAdd}
              className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#ff5400] to-[#ea580c] hover:from-[#ff661a] hover:to-[#f97316] text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 glow-btn cursor-pointer transition-all"
            >
              <span>Adicionar</span>
              <span className="font-black text-white/90">
                • R$ {(item.price * quantity).toFixed(2).replace('.', ',')}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
