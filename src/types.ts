export interface MenuItem {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  category: 'classicos' | 'especiais' | 'combos' | 'doces' | 'molhos';
  price: number; // Price in BRL
  portionSize: string;
  image: string;
  badge?: string;
  isFavorite?: boolean;
  ingredients: string[];
  crunchRating: number; // 1-5
  heatRating?: number;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  customNotes?: string;
}

export interface VipReservation {
  id: string;
  customerName: string;
  whatsapp: string;
  deliveryType?: 'retirada' | 'entrega';
  address?: string;
  timeSlot: string;
  items: CartItem[];
  totalAmount: number;
  pixKey: string;
  pixCode: string;
  status: 'pendente_pix' | 'confirmado';
  createdAt: string;
  reservationNumber: number;
}
