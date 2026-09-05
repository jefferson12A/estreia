import React from 'react';
import { Zap, ShieldCheck, Lock, ArrowRight } from 'lucide-react';

interface VipCardSectionProps {
  onOpenBooking: () => void;
}

export const VipCardSection: React.FC<VipCardSectionProps> = ({
  onOpenBooking,
}) => {
  return (
    <div className="w-full max-w-md mx-auto px-4 mb-6">
      {/* Container Card with Ember Border */}
      <div className="w-full bg-[#181514] border border-[#ff5400]/40 rounded-2xl p-4 sm:p-5 relative shadow-[0_10px_30px_rgba(0,0,0,0.7)]">
        {/* Glow accent */}
        <div className="absolute -top-px left-10 right-10 h-0.5 bg-gradient-to-r from-transparent via-[#ff5400] to-transparent"></div>

        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3f1010]/80 border border-[#b91c1c]/60 text-[#fca5a5] text-[10px] sm:text-[11px] font-bold tracking-wide uppercase">
            <Zap className="w-3 h-3 text-[#f87171] fill-[#f87171]" />
            <span>LOTE EXCLUSIVO DE ESTREIA</span>
          </div>

          <div className="px-2.5 py-1 rounded-full bg-[#271511] border border-[#ff5400]/30 text-[#f97316] text-[10px] font-bold">
            Alta Demanda
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-1.5 text-left">
          Apenas 40 agendamentos!
        </h2>

        {/* Subtitle */}
        <p className="text-xs sm:text-[13px] text-stone-300 font-normal leading-relaxed text-left mb-4">
          Produção artesanal limitada para garantir crocância máxima e fritura imediata.
        </p>

        {/* Inner Card: PIX Confirmation Warning */}
        <div className="w-full bg-[#1e1a17] border border-[#5c4037]/60 rounded-xl p-3.5 sm:p-4 text-left mb-4">
          <div className="flex items-start gap-3 mb-2">
            {/* PIX square badge */}
            <div className="px-2 py-1 rounded bg-[#2b1810] border border-[#ff5400]/40 text-[#ff7834] font-black text-[11px] tracking-wider shrink-0 mt-0.5">
              PIX
            </div>
            <div>
              <span className="block text-xs font-bold text-[#fbbf24] tracking-wide uppercase">
                CONFIRMAÇÃO OBRIGATÓRIA
              </span>
              <span className="block text-[11px] font-bold text-stone-200">
                Pagamento exclusivo via PIX
              </span>
            </div>
          </div>

          <p className="text-[11px] text-stone-300 leading-relaxed mb-2.5">
            O agendamento do seu salgado só é <strong className="text-white font-semibold">confirmado mediante a realização do pagamento via PIX</strong>. As vagas não confirmadas são liberadas automaticamente para a lista de espera.
          </p>

          <div className="flex items-center gap-1.5 text-[10px] text-[#fbbf24]/90 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-[#fbbf24] shrink-0" />
            <span>Chave PIX e dados de envio fornecidos após clicar em Garantir Agendamento</span>
          </div>
        </div>

        {/* Primary CTA Button */}
        <button
          onClick={onOpenBooking}
          id="btn-garantir-agendamento-vip"
          className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-[#ff5400] via-[#ea580c] to-[#d97706] hover:from-[#ff661a] hover:to-[#e88410] text-white font-black text-sm sm:text-base uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all transform active:scale-[0.99] glow-btn cursor-pointer"
        >
          <span>GARANTIR AGENDAMENTO VIP</span>
          <ArrowRight className="w-5 h-5 text-white stroke-[2.5]" />
        </button>

        {/* Subtext under button */}
        <div className="flex items-center justify-center gap-1.5 text-[10px] sm:text-[11px] text-stone-400 font-medium mt-3 text-center">
          <Lock className="w-3 h-3 text-[#ff7834] shrink-0" />
          <span>Agendamento via PIX • Na Escola São Francisco (18:00 às 21:00)</span>
        </div>
      </div>
    </div>
  );
};
