'use client';

import Image from 'next/image';
import { XMarkIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/outline';
import { useCartStore } from '@/lib/store/cart-store';
import { useUIStore } from '@/lib/store/ui-store';

export function CartDrawer() {
  const { cart, removeItem, updateQuantity, getCartTotal } = useCartStore();
  const { isCartOpen, closeCart } = useUIStore();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
        onClick={closeCart}
      />
      
      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 z-[70] w-full max-w-md bg-white shadow-2xl flex flex-col animate-slide-left">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-100">
          <h2 className="text-sm font-bold uppercase tracking-widest">Shopping Bag</h2>
          <button onClick={closeCart}>
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <p className="text-neutral-500">Your bag is empty.</p>
              <button onClick={closeCart} className="text-xs font-bold uppercase underline">
                Continue Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="relative w-24 h-32 bg-neutral-100">
                  {item.image && (
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                  )}
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wide">{item.title}</h3>
                    <p className="text-xs text-neutral-500 mt-1">{item.variant.title}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-neutral-200">
                      <button 
                        onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                        className="p-1 hover:bg-neutral-100"
                      >
                        <MinusIcon className="h-3 w-3" />
                      </button>
                      <span className="text-xs font-medium px-2">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-neutral-100"
                      >
                        <PlusIcon className="h-3 w-3" />
                      </button>
                    </div>
                    <p className="text-sm font-medium">
                      {(Number(item.variant.price.amount) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-neutral-100 bg-neutral-50">
            <div className="flex justify-between mb-4">
              <span className="text-sm font-bold uppercase">Subtotal</span>
              <span className="text-sm font-bold">{getCartTotal().toFixed(2)}</span>
            </div>
            <p className="text-[10px] text-neutral-500 mb-6 text-center">
              Shipping & taxes calculated at checkout.
            </p>
            <button className="w-full bg-black text-white py-4 text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors">
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}