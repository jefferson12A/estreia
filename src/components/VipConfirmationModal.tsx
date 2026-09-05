import React from 'react';
import { CheckCircle2, Flame, Calendar, Clock, Share2, X, Sparkles, MapPin } from 'lucide-react';
import { VipReservation } from '../types';

interface VipConfirmationModalProps {
  reservation: VipReservation | null;
  onClose: () => void;
}

export const VipConfirmationModal: React.FC<VipConfirmationModalProps> = ({
  reservation,
  onClose,
}) => {
  if (!reservation) return null;

  const itemsSummary = reservation.items
    .map((i) => `${i.quantity}x ${i.item.name} (${i.customNotes || ''})`)
    .join(', ');

  const whatsappMessage = encodeURIComponent(
    `Olá! Confirmação de PIX do meu agendamento na Escola São Francisco!

📋 *DADOS DO CLIENTE:*
• *Nome:* ${reservation.customerName}
• *Número/WhatsApp:* ${reservation.whatsapp}

🥟 *DETALHES DO PEDIDO:*
• *Itens:* ${itemsSummary}
• *Valor Total:* R$ ${reservation.totalAmount.toFixed(2).replace('.', ',')}
• *Horário Agendado:* ${reservation.timeSlot}
• *Local:* Na Escola São Francisco (22 de Setembro de 2026)
• *Protocolo:* #${reservation.id}`
  );

  const handleOpenWhatsappDirect = () => {
    const directAppUrl = `whatsapp://send?phone=5585992191801&text=${whatsappMessage}`;
    const webFallbackUrl = `https://api.whatsapp.com/send?phone=5585992191801&text=${whatsappMessage}`;

    window.location.href = directAppUrl;

    setTimeout(() => {
      if (document.hasFocus && document.hasFocus()) {
        window.location.href = webFallbackUrl;
      }
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="w-full max-w-sm bg-[#181514] border-2 border-[#ff5400] rounded-3xl shadow-[0_0_50px_rgba(255,84,0,0.3)] overflow-hidden my-auto text-center relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Golden top decorative banner */}
        <div className="bg-gradient-to-r from-[#b91c1c] via-[#ff5400] to-[#fbbf24] p-4 text-white relative">
          <div className="w-12 h-12 rounded-full bg-[#181514] border-2 border-white mx-auto flex items-center justify-center mb-2 shadow-lg">
            <CheckCircle2 className="w-7 h-7 text-[#22c55e]" />
          </div>
          <span className="inline-block px-3 py-0.5 rounded-full bg-black/40 text-[10px] font-black tracking-widest uppercase mb-1">
            COMPROVANTE OFICIAL
          </span>
          <h3 className="text-xl font-black tracking-tight leading-tight">
            AGENDAMENTO CONFIRMADO!
          </h3>
          <p className="text-[11px] text-amber-100 font-medium">
            Protocolo: #{reservation.id} • {reservation.customerName}
          </p>
        </div>

        {/* Ticket Body */}
        <div className="p-5 space-y-4 text-left">
          <div className="bg-[#12100f] border border-white/10 rounded-2xl p-3.5 space-y-2.5">
            <div className="flex items-center gap-2.5 text-xs">
              <Calendar className="w-4 h-4 text-[#ff5400] shrink-0" />
              <div>
                <span className="text-stone-400 block text-[10px]">Data</span>
                <span className="font-extrabold text-white">22 de Setembro de 2026</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-xs">
              <MapPin className="w-4 h-4 text-[#fbbf24] shrink-0" />
              <div>
                <span className="text-stone-400 block text-[10px]">Local</span>
                <span className="font-extrabold text-[#fbbf24]">Na Escola São Francisco</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-xs">
              <Clock className="w-4 h-4 text-[#ff5400] shrink-0" />
              <div>
                <span className="text-stone-400 block text-[10px]">Horário Agendado</span>
                <span className="font-extrabold text-white">{reservation.timeSlot}</span>
              </div>
            </div>
          </div>

          {/* Salgados inclusos */}
          <div>
            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block mb-1.5">
              Itens do Agendamento
            </span>
            <div className="space-y-1 bg-[#12100f] rounded-xl p-3 border border-white/5 text-xs">
              {reservation.items.map((i, idx) => (
                <div key={idx} className="space-y-0.5">
                  <div className="flex justify-between text-white font-bold">
                    <span>{i.quantity}x {i.item.name}</span>
                    <span className="text-[#fbbf24]">R$ {(i.item.price * i.quantity).toFixed(2).replace('.', ',')}</span>
                  </div>
                  {i.customNotes && (
                    <div className="text-[10px] text-stone-400">
                      {i.customNotes}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-2 mt-2 border-t border-white/10 flex justify-between items-center text-xs font-black">
                <span className="text-stone-300">Total Pago via PIX:</span>
                <span className="text-[#ff7834] text-sm">R$ {reservation.totalAmount.toFixed(2).replace('.', ',')}</span>
              </div>
            </div>
          </div>

          {/* Guarantee message */}
          <div className="p-2.5 rounded-xl bg-[#271511] border border-[#ff5400]/30 text-[11px] text-stone-300 flex items-start gap-2">
            <Flame className="w-4 h-4 text-[#ff5400] shrink-0 mt-0.5" />
            <p>
              Avisaremos no seu WhatsApp <strong>({reservation.whatsapp})</strong> assim que o seu salgado sair estalando e sequinho da fritadeira!
            </p>
          </div>

          {/* Action buttons */}
          <div className="space-y-2 pt-1">
            <a
              href={`whatsapp://send?phone=5585992191801&text=${whatsappMessage}`}
              onClick={(e) => {
                handleOpenWhatsappDirect();
              }}
              className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>Enviar Comprovante no WhatsApp (85 99219-1801)</span>
            </a>

            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Concluir & Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
