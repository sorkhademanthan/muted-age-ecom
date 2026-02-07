import { useCartStore } from '@/lib/store/cart-store';
import { useUIStore } from '@/lib/store/ui-store';
import type { ProductVariant } from '@/lib/shopify/types';

/**
 * Custom hook for cart operations with UI feedback
 */
export function useCart() {
  const {
    cart,
    isLoading,
    error,
    addItem,
    updateItem,
    removeItem,
    clearCart,
    getItemCount,
    getTotal,
  } = useCartStore();

  const { showToast, setCartOpen } = useUIStore();

  // Add to cart with toast notification
  const addToCart = async (variant: ProductVariant, quantity: number = 1) => {
    try {
      await addItem(variant, quantity);
      showToast(`Added ${variant.title} to cart`, 'success');
      setCartOpen(true); // Open cart drawer
    } catch (error) {
      showToast('Failed to add item to cart', 'error');
    }
  };

  // Update quantity with toast
  const updateQuantity = async (lineId: string, quantity: number) => {
    try {
      await updateItem(lineId, quantity);
      showToast('Cart updated', 'success');
    } catch (error) {
      showToast('Failed to update cart', 'error');
    }
  };

  // Remove item with toast
  const removeFromCart = async (lineId: string) => {
    try {
      await removeItem(lineId);
      showToast('Item removed from cart', 'success');
    } catch (error) {
      showToast('Failed to remove item', 'error');
    }
  };

  return {
    cart,
    isLoading,
    error,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    itemCount: getItemCount(),
    total: getTotal(),
  };
}
