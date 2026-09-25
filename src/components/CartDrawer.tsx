import { useEffect } from 'react';
import type { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  cart: CartItem[];
  subtotal: number;
  onClose: () => void;
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, qty: number) => void;
  onCheckout: () => void;
}

export function CartDrawer({
  isOpen,
  cart,
  subtotal,
  onClose,
  onRemoveItem,
  onUpdateQuantity,
  onCheckout,
}: CartDrawerProps) {
  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Bolso de compras"
    >
      <div
        className="absolute top-0 right-0 w-full max-w-md h-full bg-[#0E0E0E] flex flex-col justify-between p-6 shadow-2xl border-l border-[#353534]/60 animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-[#353534]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#FF5722]">
                shopping_bag
              </span>
              <h3 className="font-headline text-2xl uppercase text-[#E5E2E1]">
                BOLSO DE COMPRAS
              </h3>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center text-[#C7C6C6] hover:text-[#E5E2E1] transition-colors"
              aria-label="Cerrar bolso de compras"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* Cart Item List */}
          <div className="mt-6 space-y-3.5 max-h-[58vh] overflow-y-auto pr-1">
            {cart.length === 0 ? (
              <div className="text-center py-16 text-[#C7C6C6] font-mono text-xs uppercase">
                <span className="material-symbols-outlined text-4xl block mb-2 text-[#353534]">
                  shopping_cart
                </span>
                Tu bolso de compras está vacío.
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#1C1B1B] p-3 flex items-center justify-between border border-white/5 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-12 h-12 object-cover bg-[#201F1F] flex-shrink-0"
                      loading="lazy"
                    />
                    <div>
                      <h4 className="font-headline text-lg uppercase text-[#E5E2E1] leading-tight line-clamp-1">
                        {item.name}
                      </h4>
                      <div className="flex items-center gap-2 font-mono text-xs text-[#C7C6C6]">
                        <span>TALLE: {item.size}</span>
                        <span>·</span>
                        <span className="text-[#FF5722] font-bold">
                          ${item.priceUsd} USD
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="w-5 h-5 bg-[#2A2A2A] text-[#E5E2E1] flex items-center justify-center font-mono text-xs hover:bg-[#353534]"
                          aria-label="Disminuir cantidad"
                        >
                          -
                        </button>
                        <span className="font-mono text-xs px-1 text-[#E5E2E1]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-5 h-5 bg-[#2A2A2A] text-[#E5E2E1] flex items-center justify-center font-mono text-xs hover:bg-[#353534]"
                          aria-label="Aumentar cantidad"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onRemoveItem(item.id)}
                    className="text-[#C7C6C6] hover:text-[#E53935] transition-colors p-1"
                    title="Eliminar producto"
                    aria-label={`Eliminar ${item.name} del carrito`}
                  >
                    <span className="material-symbols-outlined text-[19px]">
                      delete
                    </span>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer & Checkout */}
        <div className="pt-4 border-t border-[#353534]">
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-xs uppercase text-[#C7C6C6]">
              SUBTOTAL ESTIMADO
            </span>
            <span className="font-headline text-3xl text-[#FF5722]">
              ${subtotal} USD
            </span>
          </div>

          <button
            type="button"
            onClick={onCheckout}
            disabled={cart.length === 0}
            className="w-full py-4 bg-[#FF5722] text-[#0A0A0A] font-badge text-xl tracking-widest uppercase hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 font-bold shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>FINALIZAR COMPRA</span>
            <span className="material-symbols-outlined text-[19px]">lock</span>
          </button>

          <span className="font-mono text-[10px] text-[#C7C6C6]/60 text-center block mt-2.5 uppercase">
            ENVÍOS GLOBALES DESDE BUENOS AIRES Y BERLÍN
          </span>
        </div>
      </div>
    </div>
  );
}
