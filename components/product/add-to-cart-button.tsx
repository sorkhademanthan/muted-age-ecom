'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import type { ProductVariant } from '@/lib/shopify/types';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';

interface AddToCartButtonProps {
  variant: ProductVariant;
  availableForSale?: boolean;
}

export function AddToCartButton({ variant, availableForSale = true }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart, isLoading } = useCart();

  const handleAddToCart = async () => {
    await addToCart(variant, quantity);
  };

  const incrementQuantity = () => setQuantity((q) => Math.min(q + 1, 99));
  const decrementQuantity = () => setQuantity((q) => Math.max(q - 1, 1));

  return (
    <div className="space-y-4">
      {/* Quantity Selector */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-900">Quantity</label>
        <div className="flex items-center border border-gray-300 rounded-lg">
          <button
            onClick={decrementQuantity}
            disabled={quantity <= 1}
            className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Decrease quantity"
          >
            <MinusIcon className="h-4 w-4" />
          </button>
          <span className="px-4 py-2 text-sm font-medium min-w-[3rem] text-center">
            {quantity}
          </span>
          <button
            onClick={incrementQuantity}
            disabled={quantity >= 99}
            className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Increase quantity"
          >
            <PlusIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <Button
        onClick={handleAddToCart}
        disabled={!availableForSale || isLoading}
        fullWidth
        size="lg"
        isLoading={isLoading}
      >
        {!availableForSale ? 'Out of Stock' : 'Add to Cart'}
      </Button>

      {/* Stock Status */}
      {availableForSale && (
        <p className="text-sm text-green-600">✓ In Stock</p>
      )}
    </div>
  );
}
