import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { VipCardSection } from './components/VipCardSection';
import { MenuSlider } from './components/MenuSlider';
import { GuaranteeChips } from './components/GuaranteeChips';
import { VipBookingModal } from './components/VipBookingModal';
import { ItemDetailModal } from './components/ItemDetailModal';
import { VipConfirmationModal } from './components/VipConfirmationModal';
import { VipReservationsListModal } from './components/VipReservationsListModal';
import { MENU_ITEMS } from './data/menuData';
import { CartItem, MenuItem, VipReservation } from './types';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('jellive_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [reservations, setReservations] = useState<VipReservation[]>(() => {
    try {
      const saved = localStorage.getItem('jellive_reservations');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modal states
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [lastConfirmedReservation, setLastConfirmedReservation] = useState<VipReservation | null>(null);
  const [isVipListOpen, setIsVipListOpen] = useState<boolean>(false);

  // Save cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem('jellive_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Save reservations to local storage
  useEffect(() => {
    try {
      localStorage.setItem('jellive_reservations', JSON.stringify(reservations));
    } catch (e) {
      console.error(e);
    }
  }, [reservations]);

  const handleUpdateCart = (item: MenuItem, delta: number) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.item.id === item.id);
      if (!existing) {
        if (delta > 0) {
          return [...prev, { item, quantity: delta }];
        }
        return prev;
      }

      const newQty = existing.quantity + delta;
      if (newQty <= 0) {
        return prev.filter((c) => c.item.id !== item.id);
      }

      return prev.map((c) => (c.item.id === item.id ? { ...c, quantity: newQty } : c));
    });
  };

  const handleQuickAdd = (item: MenuItem) => {
    handleUpdateCart(item, 1);
  };

  const handleReservationComplete = (newRes: VipReservation) => {
    setReservations((prev) => [newRes, ...prev]);
    setCart([]);
    setIsBookingOpen(false);
    setLastConfirmedReservation(newRes);
  };

  return (
    <div className="min-h-screen bg-[#121212] text-[#e5e2e1] font-['Plus_Jakarta_Sans',sans-serif] flex flex-col items-center selection:bg-[#ff5400] selection:text-white">
      {/* Background ambient ember lights */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[400px] h-[350px] bg-[#ff5400]/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[350px] h-[250px] bg-[#b91c1c]/10 blur-[100px] rounded-full pointer-events-none -z-10"></div>

      {/* Main Mobile App Frame Wrapper */}
      <div className="w-full max-w-md min-h-screen flex flex-col bg-[#121212] relative pb-8">
        {/* Sticky App Header */}
        <Header
          onOpenVipStatus={() => setIsVipListOpen(true)}
          activeReservationCount={reservations.length}
        />

        {/* Main Content (Single focused launch screen) */}
        <main className="flex-1 flex flex-col animate-in fade-in duration-300">
          {/* Hero Section with Glowing Logo & Live Countdown */}
          <HeroSection />

          {/* VIP Batch Card with PIX Requirement & Primary CTA */}
          <VipCardSection
            onOpenBooking={() => setIsBookingOpen(true)}
          />

          {/* Launch Menu Carousel with R$ 5 Salgado+Bebida and Combos from R$ 8 to R$ 14 */}
          <MenuSlider
            items={MENU_ITEMS}
            onSelectItem={(item) => setSelectedItem(item)}
            onQuickAdd={handleQuickAdd}
          />

          {/* Guarantee and Quality Assurances (100% Artesanal & Óleo Novo Sempre) */}
          <GuaranteeChips />
        </main>
      </div>

      {/* Modals */}
      <VipBookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        cart={cart}
        onUpdateCart={handleUpdateCart}
        onReservationComplete={handleReservationComplete}
      />

      <ItemDetailModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onAddToCart={(item, qty) => handleUpdateCart(item, qty)}
      />

      <VipConfirmationModal
        reservation={lastConfirmedReservation}
        onClose={() => setLastConfirmedReservation(null)}
      />

      <VipReservationsListModal
        isOpen={isVipListOpen}
        onClose={() => setIsVipListOpen(false)}
        reservations={reservations}
        onOpenBooking={() => setIsBookingOpen(true)}
      />
    </div>
  );
}
