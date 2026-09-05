import { MenuItem } from '../types';

import logoImg from '../assets/images/jellive_logo_1788568697683.jpg';
import coxinhaImg from '../assets/images/coxinha_cremosa_1788568711186.jpg';
import bolinhaImg from '../assets/images/bolinha_queijo_1788568723754.jpg';
import comboImg from '../assets/images/combo_estreia_1788568736598.jpg';
import kibeImg from '../assets/images/kibe_artesanal_1788568765544.jpg';
import churrosImg from '../assets/images/churros_artesanal_1788568777048.jpg';

export const ASSETS = {
  logo: logoImg,
  coxinha: coxinhaImg,
  bolinha: bolinhaImg,
  combo: comboImg,
  kibe: kibeImg,
  churros: churrosImg,
};

export const SALGADO_FLAVORS = [
  'Misto',
  'Mistão',
  'Carne',
  'Frango',
] as const;

export type SalgadoFlavor = typeof SALGADO_FLAVORS[number];

export const DRINK_OPTIONS = [
  'Refrigerante',
  'Vitamina',
] as const;

export type DrinkOption = typeof DRINK_OPTIONS[number];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'salgado-refri-vitamina',
    name: 'Salgado + Refri ou Vitamina',
    subtitle: 'Misto, Mistão, Carne ou Frango',
    description: 'Salgado artesanal frito na hora crocante nos sabores Misto, Mistão, Carne ou Frango, acompanhado de Refrigerante gelado ou Vitamina cremosa.',
    category: 'classicos',
    price: 5.00,
    portionSize: '1 Salgado (Misto, Mistão, Carne ou Frango) + 1 Refrigerante ou Vitamina',
    image: coxinhaImg,
    badge: 'R$ 5,00 Cada',
    isFavorite: true,
    ingredients: ['Misto', 'Mistão', 'Carne', 'Frango', 'Refrigerante', 'Vitamina'],
    crunchRating: 5,
  },
];

export const TIME_SLOTS = [
  { id: 'slot-18', label: '18:00 às 19:00', fornada: 'Fornada das 18h - Abertura' },
  { id: 'slot-19', label: '19:00 às 20:00', fornada: 'Fornada das 19h - Horário Nobre' },
  { id: 'slot-20', label: '20:00 às 21:00', fornada: 'Fornada das 20h até as 21:00' },
];

export const PIX_DATA = {
  key: 'bb0bdfa7-b5c2-4a57-a4c0-96d8016c2bd3',
  name: 'jefferson lima',
  city: 'SAO PAULO',
  code: '00020101021126580014BR.GOV.BCB.PIX0136bb0bdfa7-b5c2-4a57-a4c0-96d8016c2bd35204000053039865802BR5914jefferson lima6009SAO PAULO62080504daqr6304EFD6',
};
