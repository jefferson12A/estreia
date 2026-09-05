import React, { useState } from 'react';
import { Sparkles, Star, Plus, Minus, Check, ArrowRight, ShieldAlert } from 'lucide-react';
import { MenuItem, CartItem } from '../types';

interface MenuScreenProps {
  items: MenuItem[];
  cart: CartItem[];
  onUpdateCart: (item: MenuItem, delta: number) => void;
  onSelectItem: (item: MenuItem) => void;
  onProceedToBooking: () => void;
}

export const MenuScreen: React.FC<MenuScreenProps> = ({
  items,
  cart,
  onUpdateCart,
  onSelectItem,
  onProceedToBooking,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');

  const categories = [
    { id: 'todos', label: 'Todos os Sabores' },
    { id: 'classicos', label: 'Clássicos Fritos' },
    { id: 'combos', label: 'Combos Especiais' },
    { id: 'doces', label: 'Sobremesas' },
  ];

  const filteredItems = selectedCategory === 'todos'
    ? items
    : items.filter((i) => i.category === selectedCategory);

  const getItemQuantity = (id: string) => {
    const found = cart.find((c) => c.item.id === id);
    return found ? found.quantity : 0;
  };

  const totalCartCount = cart.reduce((sum, c) => sum + c.quantity, 0);
  const totalCartAmount = cart.reduce((sum, c) => sum + (c.item.price * c.quantity), 0);

  return (
    <div className="w-full max-w-md mx-auto px-4 pt-4 pb-28">
      {/* Screen Title */}
      <div className="mb-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#271511] border border-[#ff5400]/30 text-[#ff7834] text-[10px] font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3 h-3 text-[#ff7834]" />
          <span>Cardápio Oficial de Lançamento</span>
        </div>
        <h2 className="text-2xl font-black text-white tracking-tight">
          Salgados Fritos na Hora
        </h2>
        <p className="text-xs text-stone-300 mt-1">
          Receitas artesanais exclusivas com massa leve e recheio ultra cremoso.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-gradient-to-r from-[#ff5400] to-[#ea580c] text-white shadow-sm shadow-[#ff5400]/40'
                : 'bg-[#1c1917] text-stone-400 border border-white/10 hover:text-white hover:border-white/20'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Items List */}
      <div className="flex flex-col gap-4">
        {filteredItems.map((item) => {
          const qty = getItemQuantity(item.id);
          return (
            <div
              key={item.id}
              className="bg-[#181514] border border-white/10 rounded-2xl overflow-hidden hover:border-[#ff5400]/40 transition-all p-3 flex flex-col gap-3 shadow-md"
            >
              <div className="flex gap-3.5">
                {/* Product Photo */}
                <div
                  className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-[#121212] shrink-0 cursor-pointer"
                  onClick={() => onSelectItem(item)}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  {item.badge && (
                    <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/80 backdrop-blur-sm text-[9px] font-bold text-[#fbbf24] border border-white/10">
                      {item.badge}
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3
                      onClick={() => onSelectItem(item)}
                      className="text-sm sm:text-base font-extrabold text-white leading-tight cursor-pointer hover:text-[#ff7834] transition-colors"
                    >
                      {item.name}
                    </h3>
                    <span className="text-[11px] font-semibold text-[#fbbf24] block mb-1">
                      {item.subtitle}
                    </span>
                    <p className="text-[11px] text-stone-300 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="text-[10px] text-stone-400 font-medium pt-1">
                    {item.portionSize}
                  </div>
                </div>
              </div>

              {/* Footer row: price + quantity stepper */}
              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <div>
                  <span className="text-[9px] text-stone-400 block uppercase font-bold">Valor</span>
                  <span className="text-base font-black text-white">
                    R$ {item.price.toFixed(2).replace('.', ',')}
                  </span>
                </div>

                {qty === 0 ? (
                  <button
                    onClick={() => onUpdateCart(item, 1)}
                    className="px-4 py-2 rounded-xl bg-[#271511] border border-[#ff5400]/40 text-[#ff7834] hover:bg-[#ff5400] hover:text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Adicionar</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-2 bg-[#271511] border border-[#ff5400]/50 rounded-xl p-1">
                    <button
                      onClick={() => onUpdateCart(item, -1)}
                      className="w-7 h-7 rounded-lg bg-[#181514] text-white hover:bg-[#ff5400] flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-5 text-center text-xs font-black text-white tabular-nums">
                      {qty}
                    </span>
                    <button
                      onClick={() => onUpdateCart(item, 1)}
                      className="w-7 h-7 rounded-lg bg-[#ff5400] text-white flex items-center justify-center hover:bg-[#ff661a] transition-colors cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Cart Checkout Bar when items added */}
      {totalCartCount > 0 && (
        <div className="fixed bottom-16 inset-x-0 p-4 z-30 pointer-events-none">
          <div className="w-full max-w-md mx-auto pointer-events-auto bg-gradient-to-r from-[#2a130f] via-[#211816] to-[#2a130f] border border-[#ff5400]/60 rounded-2xl p-3.5 shadow-2xl flex items-center justify-between backdrop-blur-xl">
            <div>
              <span className="text-[10px] text-[#fbbf24] font-bold block uppercase tracking-wider">
                {totalCartCount} {totalCartCount === 1 ? 'item selecionado' : 'itens selecionados'}
              </span>
              <span className="text-base font-black text-white">
                Total: R$ {totalCartAmount.toFixed(2).replace('.', ',')}
              </span>
            </div>

            <button
              onClick={onProceedToBooking}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#ff5400] to-[#ea580c] hover:from-[#ff661a] hover:to-[#f97316] text-white font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-[#ff5400]/30 transition-all cursor-pointer"
            >
              <span>Garantir Vaga</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
