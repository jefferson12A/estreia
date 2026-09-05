import React, { useState, useEffect } from 'react';
import { Clock, Flame, MapPin } from 'lucide-react';
import { ASSETS } from '../data/menuData';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const HeroSection: React.FC = () => {
  // Target: De hoje até o dia 22 às 18:00:00 no Horário de Canindé - Ceará (UTC-3 / America/Fortaleza)
  const getTargetDate = (): Date => {
    const now = new Date();
    // Extrai data e hora atual no fuso horário oficial de Canindé - Ceará (America/Fortaleza)
    const ceFormatter = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'America/Fortaleza',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });

    const parts = ceFormatter.formatToParts(now);
    const getPart = (type: string) => parts.find((p) => p.type === type)?.value || '0';
    const year = parseInt(getPart('year'), 10);
    const month = parseInt(getPart('month'), 10);
    const day = parseInt(getPart('day'), 10);
    const hour = parseInt(getPart('hour'), 10);

    let targetMonth = month;
    let targetYear = year;

    // Se no Ceará já passou das 18:00 do dia 22, aponta para o próximo dia 22
    if (day > 22 || (day === 22 && hour >= 18)) {
      targetMonth += 1;
      if (targetMonth > 12) {
        targetMonth = 1;
        targetYear += 1;
      }
    }

    // Fuso de Canindé, Ceará é UTC-3 sem horário de verão (-03:00)
    const targetIso = `${targetYear}-${String(targetMonth).padStart(2, '0')}-22T18:00:00-03:00`;
    return new Date(targetIso);
  };

  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date();
    const targetDate = getTargetDate();
    const difference = targetDate.getTime() - now.getTime();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return { days, hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="w-full flex flex-col items-center text-center px-4 pt-4 pb-2">
      {/* Red Pill: GRANDE INAUGURAÇÃO */}
      <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-gradient-to-r from-[#991b1b] to-[#b91c1c] text-white text-[11px] font-bold tracking-wider uppercase mb-5 shadow-sm shadow-[#b91c1c]/40">
        <Flame className="w-3.5 h-3.5 text-[#fbbf24] animate-pulse" />
        <span>GRANDE INAUGURAÇÃO</span>
      </div>

      {/* Glowing Round Logo with VIP Badge */}
      <div className="relative mb-5">
        <div className="relative w-32 h-32 rounded-full p-1.5 bg-gradient-to-tr from-[#ff5400] via-[#fbbf24] to-[#ff5400] shadow-[0_0_35px_rgba(255,84,0,0.5)]">
          <div className="w-full h-full rounded-full bg-[#121212] p-1 overflow-hidden flex items-center justify-center">
            <img
              src={ASSETS.logo}
              alt="Jellive Salgados - Marca Oficial"
              className="w-full h-full object-cover rounded-full transform hover:scale-105 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* VIP Pill Badge at bottom right of logo */}
        <div className="absolute -bottom-1 -right-1 px-3 py-0.5 rounded-full bg-[#1c1917] border border-[#fbbf24]/50 text-[#fbbf24] text-[10px] font-black uppercase tracking-widest shadow-md">
          VIP
        </div>
      </div>

      {/* Main Announcement Heading */}
      <h1 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] via-[#fff7ed] to-[#f97316] uppercase tracking-tight max-w-xs leading-tight mb-2">
        ESTREIA DIA 22 DE SETEMBRO DE 2026
      </h1>

      {/* Local abaixo de setembro de 2026: na escola são francisco */}
      <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#271511] border border-[#ff5400]/50 text-[#fbbf24] text-xs sm:text-sm font-extrabold uppercase tracking-wide mb-3 shadow-[0_0_20px_rgba(255,84,0,0.25)]">
        <MapPin className="w-4 h-4 text-[#ff5400] shrink-0" />
        <span>Na Escola São Francisco</span>
      </div>

      {/* Subtitle */}
      <p className="text-stone-300 text-xs sm:text-sm font-normal max-w-xs leading-relaxed mb-6">
        Os salgados mais crocantes, quentinhos e recheados estão chegando na sua região!
      </p>

      {/* Abertura Oficial das Fritadeiras & Countdown Header */}
      <div className="flex flex-col items-center justify-center gap-1 mb-3">
        <div className="flex items-center justify-center gap-2 text-[#fbbf24] text-xs font-black uppercase tracking-wider">
          <Clock className="w-4 h-4 text-[#fbbf24] animate-pulse" />
          <span>DE HOJE ATÉ O DIA 22 ÀS 18:00</span>
        </div>
        <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wide">
          Abertura das Fritadeiras • 18:00 às 21:00
        </span>
      </div>

      {/* 4 Countdown Blocks */}
      <div className="grid grid-cols-4 gap-2 w-full max-w-xs mb-6">
        {/* Days */}
        <div className="flex flex-col items-center bg-[#1c1917] border border-white/10 rounded-xl p-2.5 shadow-inner">
          <span className="text-2xl sm:text-3xl font-black text-white tabular-nums tracking-tight">
            {formatNumber(timeLeft.days)}
          </span>
          <span className="text-[9px] font-bold text-stone-400 tracking-wider uppercase mt-0.5">
            DIAS
          </span>
        </div>

        {/* Hours */}
        <div className="flex flex-col items-center bg-[#1c1917] border border-white/10 rounded-xl p-2.5 shadow-inner">
          <span className="text-2xl sm:text-3xl font-black text-white tabular-nums tracking-tight">
            {formatNumber(timeLeft.hours)}
          </span>
          <span className="text-[9px] font-bold text-stone-400 tracking-wider uppercase mt-0.5">
            HORAS
          </span>
        </div>

        {/* Minutes */}
        <div className="flex flex-col items-center bg-[#1c1917] border border-white/10 rounded-xl p-2.5 shadow-inner">
          <span className="text-2xl sm:text-3xl font-black text-white tabular-nums tracking-tight">
            {formatNumber(timeLeft.minutes)}
          </span>
          <span className="text-[9px] font-bold text-stone-400 tracking-wider uppercase mt-0.5">
            MINUTOS
          </span>
        </div>

        {/* Seconds */}
        <div className="flex flex-col items-center bg-[#1c1917] border border-[#ff5400]/40 rounded-xl p-2.5 shadow-inner relative overflow-hidden">
          <span className="text-2xl sm:text-3xl font-black text-[#ff7834] tabular-nums tracking-tight animate-pulse">
            {formatNumber(timeLeft.seconds)}
          </span>
          <span className="text-[9px] font-bold text-[#ff8f55] tracking-wider uppercase mt-0.5">
            SEGUNDOS
          </span>
          <div className="absolute bottom-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#ff5400] to-transparent"></div>
        </div>
      </div>

      {/* Indicador de Fuso Horário de Canindé - Ceará */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1c1917]/90 border border-[#ff5400]/30 text-stone-300 text-[10px] font-semibold mb-2">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>Horário Oficial de Canindé - CE (UTC-3)</span>
      </div>
    </div>
  );
};
