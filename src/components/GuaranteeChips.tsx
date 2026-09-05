import React from 'react';
import { CheckCircle2, Flame } from 'lucide-react';

export const GuaranteeChips: React.FC = () => {
  return (
    <div className="w-full max-w-md mx-auto px-4 mb-6 flex items-center justify-center gap-2 flex-wrap">
      <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1c1917] border border-white/10 text-stone-200 text-xs font-semibold shadow-sm">
        <CheckCircle2 className="w-3.5 h-3.5 text-[#fbbf24]" />
        <span>100% Artesanal</span>
      </div>

      <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1c1917] border border-white/10 text-stone-200 text-xs font-semibold shadow-sm">
        <Flame className="w-3.5 h-3.5 text-[#ff5400]" />
        <span>Óleo Novo Sempre</span>
      </div>
    </div>
  );
};
