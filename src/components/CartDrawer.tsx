import React, { useState } from 'react';
import { CartItem, Screen } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onNavigate: (screen: Screen) => void;
  appliedPromo: string | null;
  onApplyPromo: (code: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onNavigate,
  appliedPromo,
  onApplyPromo,
  onCheckout,
}) => {
  const [promoInput, setPromoInput] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = appliedPromo === 'NEIGHBOR3' ? 0 : subtotal > 499 ? 0 : 49;
  const discount = appliedPromo === 'NEIGHBOR3' ? 49 : 0;
  const total = Math.max(0, subtotal + deliveryFee - discount);

  const handleApplyPromoCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    onApplyPromo(promoInput.trim().toUpperCase());
    setPromoInput('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#131b2e]/60 backdrop-blur-xs flex justify-end">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between border-l border-[#eaedff] animate-slide-left">
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#eaedff] flex items-center justify-between bg-[#faf8ff]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#f2f3ff] text-[#f97316]">
              <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-base text-[#131b2e] font-extrabold">Your Gourmet Cart</h3>
              <span className="font-body-sm text-xs text-[#584237]">
                {items.length} unique {items.length === 1 ? 'item' : 'items'}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#eaedff] text-[#584237] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Cart Item Stream */}
        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center my-auto text-center gap-3 py-12">
              <span className="material-symbols-outlined text-4xl text-[#8c7164]">remove_shopping_cart</span>
              <p className="font-headline-sm text-base text-[#131b2e] font-bold">Your cart is empty</p>
              <p className="font-body-sm text-xs text-[#584237] max-w-xs">
                Explore handcrafted menus from neighborhood kitchens and add mouthwatering dishes.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onNavigate('explore-and-nearby');
                }}
                className="mt-2 px-5 py-2 rounded-full bg-[#f97316] text-white text-xs font-bold shadow cursor-pointer"
              >
                Browse Restaurants
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl bg-[#f2f3ff] border border-[#eaedff] flex flex-col gap-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-title-md text-xs sm:text-sm font-bold text-[#131b2e]">
                      {item.name}
                    </h4>
                    <span className="font-body-sm text-[11px] text-[#584237] line-clamp-1">
                      {item.description}
                    </span>
                  </div>
                  <span className="font-label-md text-xs font-bold text-[#131b2e] shrink-0">
                    ₹{item.price * item.quantity}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-[#8c7164] font-medium">₹{item.price} each</span>
                  <div className="flex items-center gap-2 bg-white rounded-full p-1 border border-[#eaedff] shadow-2xs">
                    <button
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="w-6 h-6 rounded-full hover:bg-[#eaedff] flex items-center justify-center text-xs font-bold text-[#131b2e]"
                    >
                      -
                    </button>
                    <span className="font-label-md text-xs font-bold px-1">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="w-6 h-6 rounded-full hover:bg-[#eaedff] flex items-center justify-center text-xs font-bold text-[#131b2e]"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Promo code form */}
          {items.length > 0 && (
            <div className="pt-2">
              <form onSubmit={handleApplyPromoCode} className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Promo Code (e.g. NEIGHBOR3)"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-[#f2f3ff] border border-[#eaedff] focus:outline-none focus:border-[#f97316] uppercase"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#131b2e] text-white text-xs font-bold hover:bg-[#283044] transition-colors"
                >
                  Apply
                </button>
              </form>
              {appliedPromo && (
                <div className="mt-2 flex items-center justify-between px-3 py-1.5 rounded-lg bg-[#6ffbbe]/25 text-[#002113] text-xs font-bold">
                  <span>Code {appliedPromo} applied!</span>
                  <span className="text-[#006c49]">Free Delivery Active</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Drawer Footer & Checkout */}
        {items.length > 0 && (
          <div className="p-5 border-t border-[#eaedff] bg-white flex flex-col gap-3">
            <div className="flex flex-col gap-1.5 text-xs text-[#584237]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#131b2e]">₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span className="font-semibold text-[#006c49]">
                  {deliveryFee === 0 ? 'Free' : `₹${deliveryFee}`}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-[#006c49]">
                  <span>Promo Discount</span>
                  <span>-₹{discount}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-extrabold text-[#131b2e] pt-2 border-t border-[#eaedff]">
                <span>Total Amount</span>
                <span className="text-[#f97316]">₹{total}</span>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onCheckout();
                onNavigate('live-tracking');
              }}
              className="w-full py-3.5 px-6 rounded-full bg-[#f97316] hover:bg-[#9d4300] text-white font-headline-sm text-sm font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
            >
              <span>Place Order • ₹{total}</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
