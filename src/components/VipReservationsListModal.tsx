import React from 'react';
import { X, Flame, Clock, CheckCircle2, Ticket, Calendar, Phone } from 'lucide-react';
import { VipReservation } from '../types';

interface VipReservationsListModalProps {
  isOpen: boolean;
  onClose: () => void;
  reservations: VipReservation[];
  onOpenBooking: () => void;
}

export const VipReservationsListModal: React.FC<VipReservationsListModalProps> = ({
  isOpen,
  onClose,
  reservations,
  onOpenBooking,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="w-full max-w-sm bg-[#181514] border border-[#ff5400]/40 rounded-3xl overflow-hidden shadow-2xl my-auto text-left relative max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-[#1e1917] shrink-0">
          <div className="flex items-center gap-2">
            <Ticket className="w-4 h-4 text-[#ff5400]" />
            <h3 className="text-sm font-extrabold text-white">
              Meus Agendamentos VIP
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto flex-1 space-y-3">
          {reservations.length === 0 ? (
            <div className="text-center py-8 px-4 space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#271511] border border-[#ff5400]/30 mx-auto flex items-center justify-center text-[#ff7834]">
                <Flame className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-white">Nenhuma vaga reservada ainda</h4>
              <p className="text-xs text-stone-400">
                Garanta seu agendamento no lote exclusivo de estreia com apenas 40 vagas para 22 de Setembro!
              </p>
              <button
                onClick={() => {
                  onClose();
                  onOpenBooking();
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#ff5400] to-[#ea580c] text-white text-xs font-bold uppercase tracking-wider glow-btn cursor-pointer"
              >
                Garantir Agendamento VIP
              </button>
            </div>
          ) : (
            reservations.map((res) => (
              <div
                key={res.id}
                className="bg-[#12100f] border border-[#ff5400]/40 rounded-2xl p-3.5 space-y-2.5"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-bold text-[#fbbf24] block uppercase">
                      Protocolo #{res.id}
                    </span>
                    <span className="text-xs font-extrabold text-white">
                      {res.customerName}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Confirmado
                  </span>
                </div>

                <div className="text-[11px] space-y-1 text-stone-300 pt-1 border-t border-white/5">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#ff5400]" />
                    <span>22 de Setembro de 2026</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#fbbf24]" />
                    <span>{res.timeSlot}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#ff7834]" />
                    <span>WhatsApp: {res.whatsapp}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/5 flex justify-between items-center text-xs">
                  <span className="text-stone-400 font-medium">
                    {res.items.reduce((s, i) => s + i.quantity, 0)} itens
                  </span>
                  <span className="text-[#fbbf24] font-black">
                    Total: R$ {res.totalAmount.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
