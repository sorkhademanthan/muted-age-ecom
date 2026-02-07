import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { shopifyMutate } from '@/lib/shopify/client';
import {
  CREATE_CART,
  ADD_TO_CART,
  UPDATE_CART_LINES,
  REMOVE_FROM_CART,
} from '@/lib/shopify/mutations/cart';
import type { Cart, CartLine, ProductVariant } from '@/lib/shopify/types';

interface CartState {
  // State
  cart: Cart | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  createCart: () => Promise<void>;
  addItem: (variant: ProductVariant, quantity: number) => Promise<void>;
  updateItem: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  clearCart: () => void;

  // Helpers
  getItemCount: () => number;
  getTotal: () => string;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      // Initial state
      cart: null,
      isLoading: false,
      error: null,

      // Create a new cart
      createCart: async () => {
        // Don't create if cart already exists
        if (get().cart?.id) {
          console.log('Cart already exists, skipping creation');
          return;
        }

        set({ isLoading: true, error: null });
        try {
          const data = await shopifyMutate<{ cartCreate: { cart: Cart; userErrors: any[] } }>(
            CREATE_CART,
            {
              input: {
                lines: [],
              },
            }
          );

          if (data.cartCreate.userErrors?.length > 0) {
            throw new Error(data.cartCreate.userErrors[0].message);
          }

          set({ cart: data.cartCreate.cart, isLoading: false });

          if (process.env.NODE_ENV === 'development') {
            console.log('✅ Cart created:', data.cartCreate.cart.id);
          }
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Failed to create cart';
          set({ error: errorMessage, isLoading: false });
          console.error('Cart creation error:', error);
        }
      },

      // Add item to cart
      addItem: async (variant: ProductVariant, quantity: number = 1) => {
        set({ isLoading: true, error: null });

        try {
          let cartId = get().cart?.id;

          // Create cart if it doesn't exist
          if (!cartId) {
            await get().createCart();
            cartId = get().cart?.id;
          }

          if (!cartId) {
            throw new Error('Failed to get cart ID');
          }

          const data = await shopifyMutate<{
            cartLinesAdd: { cart: Cart; userErrors: any[] };
          }>(ADD_TO_CART, {
            cartId,
            lines: [
              {
                merchandiseId: variant.id,
                quantity,
              },
            ],
          });

          if (data.cartLinesAdd.userErrors?.length > 0) {
            throw new Error(data.cartLinesAdd.userErrors[0].message);
          }

          set({ cart: data.cartLinesAdd.cart, isLoading: false });

          if (process.env.NODE_ENV === 'development') {
            console.log('✅ Item added to cart:', variant.title);
          }
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Failed to add item';
          set({ error: errorMessage, isLoading: false });
          console.error('Add to cart error:', error);
          throw error; // Re-throw to handle in UI
        }
      },

      // Update item quantity
      updateItem: async (lineId: string, quantity: number) => {
        const cartId = get().cart?.id;
        if (!cartId) {
          console.error('No cart ID found');
          return;
        }

        set({ isLoading: true, error: null });

        try {
          const data = await shopifyMutate<{
            cartLinesUpdate: { cart: Cart; userErrors: any[] };
          }>(UPDATE_CART_LINES, {
            cartId,
            lines: [
              {
                id: lineId,
                quantity,
              },
            ],
          });

          if (data.cartLinesUpdate.userErrors?.length > 0) {
            throw new Error(data.cartLinesUpdate.userErrors[0].message);
          }

          set({ cart: data.cartLinesUpdate.cart, isLoading: false });

          if (process.env.NODE_ENV === 'development') {
            console.log('✅ Cart updated');
          }
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Failed to update item';
          set({ error: errorMessage, isLoading: false });
          console.error('Update cart error:', error);
          throw error;
        }
      },

      // Remove item from cart
      removeItem: async (lineId: string) => {
        const currentCart = get().cart;
        if (!currentCart?.id) {
          console.error('No cart found');
          return;
        }

        set({ isLoading: true, error: null });

        try {
          console.log('Removing line:', lineId, 'from cart:', currentCart.id);

          const data = await shopifyMutate<{
            cartLinesRemove: { cart: Cart; userErrors: any[] };
          }>(REMOVE_FROM_CART, {
            cartId: currentCart.id,
            lineIds: [lineId],
          });

          if (data.cartLinesRemove.userErrors?.length > 0) {
            throw new Error(data.cartLinesRemove.userErrors[0].message);
          }

          set({ cart: data.cartLinesRemove.cart, isLoading: false });

          if (process.env.NODE_ENV === 'development') {
            console.log('✅ Item removed from cart');
          }
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Failed to remove item';
          set({ error: errorMessage, isLoading: false });
          console.error('Remove from cart error:', error);
          throw error;
        }
      },

      // Clear cart
      clearCart: () => {
        set({ cart: null, error: null });
        if (process.env.NODE_ENV === 'development') {
          console.log('Cart cleared');
        }
      },

      // Get total item count
      getItemCount: () => {
        const cart = get().cart;
        return cart?.totalQuantity || 0;
      },

      // Get cart total
      getTotal: () => {
        const cart = get().cart;
        return cart?.estimatedCost?.totalAmount?.amount || '0.00';
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ cart: state.cart }), // Only persist cart data
    }
  )
);
