'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Loading } from '@/components/ui/loading';
import { MinusIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const { cart, removeFromCart, isLoading, total, itemCount } = useCart();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Loading />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading size="lg" />
      </div>
    );
  }

  if (!cart || cart.lines.edges.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <h1 className="text-4xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-8">Add some products to get started</p>
        <Link href="/products">
          <Button size="lg">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart ({itemCount} items)</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.lines.edges.map(({ node }) => (
              <div
                key={node.id}
                className="bg-white p-6 rounded-lg shadow-sm flex gap-6"
              >
                {/* Product Image */}
                <div className="relative w-32 h-32 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                  {node.merchandise.image && (
                    <Image
                      src={node.merchandise.image.url}
                      alt={node.merchandise.title}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>

                {/* Product Info */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <Link
                      href={`/products/${node.merchandise.product.handle}`}
                      className="text-lg font-semibold hover:text-gray-600"
                    >
                      {node.merchandise.product.title}
                    </Link>
                    <p className="text-sm text-gray-600 mt-1">
                      {node.merchandise.title}
                    </p>
                    <p className="text-lg font-bold mt-2">
                      ${node.merchandise.price.amount} {node.merchandise.price.currencyCode}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    {/* Quantity */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Qty:</span>
                      <span className="font-medium">{node.quantity}</span>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(node.id)}
                      disabled={isLoading}
                      className="text-red-600 hover:text-red-800 text-sm font-medium flex items-center gap-1"
                    >
                      <XMarkIcon className="h-4 w-4" />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal ({itemCount} items)</span>
                  <span className="font-medium">${total}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">Calculated at checkout</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Taxes</span>
                  <span className="font-medium">Calculated at checkout</span>
                </div>
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${total}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <a
                href={cart.checkoutUrl}
                className="block w-full bg-black text-white text-center py-4 rounded-lg hover:bg-gray-800 transition-colors font-semibold mb-4"
              >
                Proceed to Checkout
              </a>

              <Link href="/products">
                <Button variant="outline" fullWidth>
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
