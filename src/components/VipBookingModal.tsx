import React, { useState, useEffect } from 'react';
import { 
  X, 
  Clock, 
  Check, 
  Copy, 
  Phone, 
  User, 
  ArrowRight,
  Flame,
  CheckCircle2,
  Plus,
  Minus,
  MapPin,
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { CartItem, MenuItem, VipReservation } from '../types';
import { TIME_SLOTS, MENU_ITEMS, PIX_DATA, SALGADO_FLAVORS, DRINK_OPTIONS } from '../data/menuData';

interface VipBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateCart: (item: MenuItem, delta: number) => void;
  onReservationComplete: (reservation: VipReservation) => void;
}

export const VipBookingModal: React.FC<VipBookingModalProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateCart,
  onReservationComplete,
}) => {
  const [selectedSlot, setSelectedSlot] = useState<string>(TIME_SLOTS[0]?.id || 'slot-18');
  const [name, setName] = useState<string>('');
  const [whatsapp, setWhatsapp] = useState<string>('');
  const [salgadoFlavor, setSalgadoFlavor] = useState<string>('Misto');
  const [drinkChoice, setDrinkChoice] = useState<string>('Refrigerante');
  const [step, setStep] = useState<'form' | 'pix'>('form');
  const [copiedPix, setCopiedPix] = useState<boolean>(false);
  const [pixTimerSeconds, setPixTimerSeconds] = useState<number>(900); // 15 mins

  // Current item and quantity
  const primaryItem = MENU_ITEMS[0];
  const currentCartQuantity = cart.reduce((sum, c) => sum + c.quantity, 0) || 1;
  const [quantity, setQuantity] = useState<number>(currentCartQuantity);

  // Sync quantity when modal opens
  useEffect(() => {
    if (isOpen) {
      const q = cart.reduce((sum, c) => sum + c.quantity, 0) || 1;
      setQuantity(q);
      setStep('form');
    }
  }, [isOpen, cart]);

  // PIX countdown timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === 'pix' && pixTimerSeconds > 0) {
      interval = setInterval(() => {
        setPixTimerSeconds((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, pixTimerSeconds]);

  if (!isOpen) return null;

  // Price calculation: starts at R$ 5,00 each
  const unitPrice = 5.00;
  const totalAmount = quantity * unitPrice;
  const selectedSlotData = TIME_SLOTS.find((s) => s.id === selectedSlot) || TIME_SLOTS[0];

  const handleCopyPix = () => {
    navigator.clipboard.writeText(PIX_DATA.code);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 3000);
  };

  const handleProceedToPix = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !whatsapp.trim()) {
      alert('Por favor, informe seu nome e WhatsApp para identificação do agendamento.');
      return;
    }
    setStep('pix');
  };

  const reservationId = `VIP-${Date.now().toString().slice(-6)}`;
  
  const getWhatsappMessage = () => {
    return `Olá! Já realizei o PIX do meu agendamento na Escola São Francisco!

📋 *DADOS DO CLIENTE:*
• *Nome:* ${name}
• *Número/WhatsApp:* ${whatsapp}

🥟 *DETALHES DO PEDIDO:*
• *Quantidade:* ${quantity} unidade(s)
• *Sabor do Salgado:* ${salgadoFlavor}
• *Bebida:* ${drinkChoice}
• *Valor Total Pago:* R$ ${totalAmount.toFixed(2).replace('.', ',')}
• *Horário Agendado:* ${selectedSlotData.label}
• *Local:* Na Escola São Francisco (22 de Setembro de 2026)
• *Protocolo:* #${reservationId}

Estou enviando o comprovante do PIX!`;
  };

  const getDirectWhatsappUrl = () => {
    const text = getWhatsappMessage();
    // whatsapp:// protocol directly opens WhatsApp app on mobile without showing any web page
    return `whatsapp://send?phone=5585992191801&text=${encodeURIComponent(text)}`;
  };

  const handleConfirmReservation = () => {
    const newReservation: VipReservation = {
      id: reservationId,
      customerName: name,
      whatsapp,
      timeSlot: selectedSlotData.label,
      items: [
        {
          item: primaryItem,
          quantity: quantity,
          customNotes: `Sabor: ${salgadoFlavor} | Bebida: ${drinkChoice}`,
        },
      ],
      totalAmount,
      pixKey: PIX_DATA.key,
      pixCode: PIX_DATA.code,
      status: 'confirmado',
      createdAt: new Date().toISOString(),
      reservationNumber: Math.floor(1000 + Math.random() * 9000),
    };

    onReservationComplete(newReservation);
  };

  const handleOpenWhatsappDirect = (e?: React.MouseEvent) => {
    // Confirm reservation in app state
    handleConfirmReservation();

    const text = getWhatsappMessage();
    const encoded = encodeURIComponent(text);
    const directAppUrl = `whatsapp://send?phone=5585992191801&text=${encoded}`;
    const webFallbackUrl = `https://api.whatsapp.com/send?phone=5585992191801&text=${encoded}`;

    // Direct redirection to the WhatsApp native app
    window.location.href = directAppUrl;

    // Fallback after 1.5s only if WhatsApp native protocol was not caught (e.g. desktop browsers without app)
    setTimeout(() => {
      if (document.hasFocus && document.hasFocus()) {
        window.location.href = webFallbackUrl;
      }
    }, 1500);
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="w-full max-w-md bg-[#181514] border border-[#ff5400]/40 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-[#1f1a17] shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-[#2b160f] border border-[#ff5400]/40 text-[#ff7834]">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-white">
                {step === 'form' ? 'Agendamento Salgado + Refri' : 'Pagamento via PIX'}
              </h3>
              <p className="text-[10px] text-stone-400 flex items-center gap-1">
                <span>Na Escola São Francisco</span>
                <span>•</span>
                <span>18:00 às 21:00</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/15 text-stone-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content Scrollable */}
        <div className="p-4 overflow-y-auto flex-1 text-left space-y-4">
          {step === 'form' ? (
            <form onSubmit={handleProceedToPix} className="space-y-4">
              
              {/* Local Notification */}
              <div className="bg-[#241310] border border-[#ff5400]/30 rounded-xl p-2.5 flex items-center gap-2 text-xs text-[#fbbf24]">
                <MapPin className="w-4 h-4 text-[#ff5400] shrink-0" />
                <span className="font-bold">Local: Na Escola São Francisco</span>
              </div>

              {/* 1. Quantidade de Itens (Salgado + Refri ou Vitamina por R$ 5 cada) */}
              <div className="bg-[#1e1917] border border-[#ff5400]/30 rounded-xl p-3.5">
                <div className="flex items-center justify-between mb-2.5">
                  <div>
                    <span className="text-xs font-black text-white block">
                      Salgado + Refri ou Vitamina
                    </span>
                    <span className="text-[11px] text-[#fbbf24] font-bold">
                      R$ 5,00 por unidade
                    </span>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-2 bg-[#12100f] border border-white/15 rounded-xl p-1">
                    <button
                      type="button"
                      onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                      className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/15 text-white flex items-center justify-center transition-colors cursor-pointer disabled:opacity-30"
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-7 text-center text-sm font-black text-white tabular-nums">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((prev) => prev + 1)}
                      className="w-7 h-7 rounded-lg bg-[#ff5400] hover:bg-[#ff661a] text-white flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Quick Quantity Shortcuts */}
                <div className="flex items-center gap-1.5 flex-wrap pt-1 border-t border-white/5">
                  <span className="text-[10px] text-stone-400 mr-1">Rápido:</span>
                  {[1, 2, 3, 4, 5, 10].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setQuantity(num)}
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-colors cursor-pointer ${
                        quantity === num
                          ? 'bg-[#ff5400] text-white'
                          : 'bg-white/5 text-stone-300 hover:bg-white/10'
                      }`}
                    >
                      {num} un (R$ {num * 5})
                    </button>
                  ))}
                </div>

                {/* 2. Seleção de Sabores: Misto, Mistão, Carne, Frango */}
                <div className="mt-3.5 pt-3 border-t border-white/10">
                  <label className="block text-xs font-bold text-white mb-1.5">
                    Escolha o Sabor do Salgado:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {SALGADO_FLAVORS.map((flavor) => {
                      const isSelected = salgadoFlavor === flavor;
                      return (
                        <button
                          key={flavor}
                          type="button"
                          onClick={() => setSalgadoFlavor(flavor)}
                          className={`py-2 px-3 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                            isSelected
                              ? 'bg-[#271511] border-[#ff5400] text-[#ff7834] shadow-sm'
                              : 'bg-[#12100f] border-white/15 text-stone-300 hover:border-white/30'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 text-[#ff5400]" />}
                          <span>{flavor}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Seleção de Bebida: Refrigerante ou Vitamina */}
                <div className="mt-3 pt-3 border-t border-white/10">
                  <label className="block text-xs font-bold text-white mb-1.5">
                    Escolha a Bebida Acompanhante:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {DRINK_OPTIONS.map((drink) => {
                      const isSelected = drinkChoice === drink;
                      return (
                        <button
                          key={drink}
                          type="button"
                          onClick={() => setDrinkChoice(drink)}
                          className={`py-2 px-3 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                            isSelected
                              ? 'bg-[#271511] border-[#ff5400] text-[#ff7834] shadow-sm'
                              : 'bg-[#12100f] border-white/15 text-stone-300 hover:border-white/30'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 text-[#ff5400]" />}
                          <span>{drink}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* 4. Seleção de Horário: 18:00 até as 21:00 */}
              <div>
                <label className="block text-xs font-bold text-white mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#fbbf24]" />
                    <span>Horários Disponíveis (18:00 até as 21:00)</span>
                  </span>
                  <span className="text-[10px] text-stone-400">Escolha o seu horário</span>
                </label>

                <div className="grid grid-cols-1 gap-2">
                  {TIME_SLOTS.map((slot) => {
                    const isSelected = selectedSlot === slot.id;
                    return (
                      <button
                        key={slot.id}
                        type="button"
                        onClick={() => setSelectedSlot(slot.id)}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#271511] border-[#ff5400] text-white shadow-sm'
                            : 'bg-[#141211] border-white/10 text-stone-400 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            isSelected ? 'border-[#ff5400] bg-[#ff5400]' : 'border-stone-500'
                          }`}>
                            {isSelected && <Check className="w-2.5 h-2.5 text-white" />}
                          </div>
                          <div>
                            <span className="text-xs font-extrabold block text-white">
                              {slot.label}
                            </span>
                            <span className="text-[10px] text-stone-400">
                              {slot.fornada}
                            </span>
                          </div>
                        </div>

                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-black/40 text-[#ff7834] border border-[#ff5400]/30">
                          Disponível
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 5. Dados para Contato */}
              <div className="space-y-2.5">
                <div>
                  <label className="block text-[11px] font-bold text-stone-300 mb-1">
                    Seu Nome *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-stone-500 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      placeholder="Ex: Jefferson Lima"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-[#12100f] border border-white/15 rounded-xl text-xs text-white focus:border-[#ff5400] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-300 mb-1">
                    WhatsApp para aviso quando estiver pronto *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-stone-500 absolute left-3 top-2.5" />
                    <input
                      type="tel"
                      required
                      placeholder="(11) 99999-9999"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-[#12100f] border border-white/15 rounded-xl text-xs text-white focus:border-[#ff5400] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Total Summary */}
              <div className="bg-[#141211] border border-white/10 rounded-xl p-3 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-stone-400 block">
                    Total ({quantity}x {salgadoFlavor} + {drinkChoice}):
                  </span>
                  <span className="text-[10px] text-stone-500">
                    Horário: {selectedSlotData.label} • Na Escola São Francisco
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xl font-black text-[#ff7834] tabular-nums">
                    R$ {totalAmount.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>

              {/* Botão Prosseguir para PIX */}
              <button
                type="submit"
                id="btn-avancar-pix"
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#ff5400] via-[#ea580c] to-[#d97706] hover:from-[#ff661a] hover:to-[#e88410] text-white font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 glow-btn cursor-pointer transition-all shadow-lg"
              >
                <span>Avançar para Pagamento PIX</span>
                <span className="bg-black/30 px-2 py-0.5 rounded text-xs">
                  R$ {totalAmount.toFixed(2).replace('.', ',')}
                </span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </form>
          ) : (
            /* STEP 2: PIX PAYMENT (QR CODE + COPIA E COLA OFICIAL) */
            <div className="space-y-4">
              {/* Top Banner: Valor Total */}
              <div className="bg-[#241310] border border-[#ff5400]/40 rounded-xl p-3 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-stone-400 block uppercase tracking-wider">
                    Valor Total a Pagar
                  </span>
                  <span className="text-2xl font-black text-[#fbbf24] tabular-nums">
                    R$ {totalAmount.toFixed(2).replace('.', ',')}
                  </span>
                  <span className="text-[10px] text-stone-300 block">
                    {quantity}x Salgado ({salgadoFlavor}) + {drinkChoice}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-xs font-extrabold text-white block">
                    Jefferson Lima
                  </span>
                  <span className="text-[10px] text-stone-400">
                    {formatTimer(pixTimerSeconds)} restantes
                  </span>
                </div>
              </div>

              {/* Official QR Code Box */}
              <div className="flex flex-col items-center bg-white p-4 rounded-2xl shadow-xl max-w-[240px] mx-auto border-4 border-[#ff5400]">
                <QRCodeSVG
                  value={PIX_DATA.code}
                  size={190}
                  level="M"
                  includeMargin={false}
                />
                <div className="mt-2 text-center">
                  <span className="text-[10px] font-black text-black tracking-widest block uppercase">
                    PIX JEFFERSON LIMA
                  </span>
                  <span className="text-xs font-black text-[#b91c1c]">
                    R$ {totalAmount.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>

              {/* Copia e Cola Code */}
              <div>
                <label className="block text-[11px] font-bold text-stone-300 mb-1 flex items-center justify-between">
                  <span>Código PIX Copia e Cola</span>
                  <span className="text-[10px] text-stone-400">Toque para copiar</span>
                </label>
                <div className="flex items-center gap-2 bg-[#12100f] border border-white/15 rounded-xl p-2">
                  <input
                    type="text"
                    readOnly
                    value={PIX_DATA.code}
                    className="w-full bg-transparent text-[11px] text-stone-300 truncate focus:outline-none select-all"
                  />
                  <button
                    type="button"
                    onClick={handleCopyPix}
                    id="btn-copiar-pix"
                    className="px-3.5 py-1.5 rounded-lg bg-[#ff5400] hover:bg-[#ff661a] text-white font-bold text-xs shrink-0 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copiedPix ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-white" />
                        <span>Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-white" />
                        <span>Copiar Código</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* PIX Key and Beneficiary Info */}
              <div className="bg-[#1e1917] border border-white/10 rounded-xl p-3 text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-stone-400">Beneficiário:</span>
                  <span className="text-white font-bold">jefferson lima</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Chave PIX:</span>
                  <span className="text-stone-200 font-mono text-[11px] truncate max-w-[200px]">
                    {PIX_DATA.key}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Horário Agendado:</span>
                  <span className="text-[#fbbf24] font-bold">{selectedSlotData.label}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Local:</span>
                  <span className="text-white font-bold">Na Escola São Francisco</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Cliente:</span>
                  <span className="text-white font-bold">{name} ({whatsapp})</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <a
                  href={getDirectWhatsappUrl()}
                  onClick={(e) => {
                    // Let default anchor or direct handler invoke native app
                    handleOpenWhatsappDirect(e);
                  }}
                  id="btn-confirmar-pix"
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#16a34a] to-[#15803d] hover:from-[#22c55e] hover:to-[#16a34a] text-white font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-green-900/40 cursor-pointer transition-all"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Já fiz o PIX • Abrir WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={() => setStep('form')}
                  className="w-full py-2 text-stone-400 hover:text-white text-xs font-semibold text-center cursor-pointer transition-colors"
                >
                  Voltar e alterar opções
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
