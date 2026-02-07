'use client';

import { useEffect, useState } from 'react';
import { useCart } from '@/hooks/use-cart';
import { useUIStore } from '@/lib/store/ui-store';
import { useCartStore } from '@/lib/store/cart-store';
import type { ProductVariant } from '@/lib/shopify/types';

interface RealProduct {
  id: string;
  title: string;
  handle: string;
  price: string;
  variants: ProductVariant[];
}

export default function TestCartPage() {
  const { cart, addToCart, removeFromCart, itemCount, total, isLoading } =
    useCart();
  const { toast } = useUIStore();
  const { clearCart, error } = useCartStore();

  const [products, setProducts] = useState<RealProduct[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  // Fetch real products on mount
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/get-products');
        const data = await res.json();
        if (data.success) {
          setProducts(data.products);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoadingProducts(false);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Cart Store Test</h1>
          <button
            onClick={clearCart}
            className="text-sm text-red-600 hover:text-red-800"
          >
            Clear Cart & Reset
          </button>
        </div>

        {/* Toast Notification */}
        {toast && (
          <div
            className={`p-4 rounded-lg animate-slide-down ${
              toast.type === 'success'
                ? 'bg-green-100 text-green-800'
                : toast.type === 'error'
                ? 'bg-red-100 text-red-800'
                : 'bg-blue-100 text-blue-800'
            }`}
          >
            {toast.message}
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
            <p className="font-semibold">Error:</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Cart Summary */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Cart Summary</h2>
          <div className="space-y-2">
            <p>
              <span className="font-medium">Items:</span> {itemCount}
            </p>
            <p>
              <span className="font-medium">Total:</span> ${total}
            </p>
            <p>
              <span className="font-medium">Status:</span>{' '}
              {isLoading ? (
                <span className="text-blue-600">Loading...</span>
              ) : (
                <span className="text-green-600">Ready</span>
              )}
            </p>
            {cart?.id && (
              <p className="text-xs text-gray-500 mt-2">
                Cart ID: {cart.id.split('/').pop()?.split('?')[0]}
              </p>
            )}
          </div>
        </div>

        {/* Real Products from Store */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">
            Available Products (Real from Shopify)
          </h2>

          {loadingProducts ? (
            <p className="text-gray-500">Loading products...</p>
          ) : products.length === 0 ? (
            <p className="text-gray-500">No products found</p>
          ) : (
            <div className="grid gap-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="border rounded-lg p-4 hover:border-gray-400 transition-colors"
                >
                  <h3 className="font-semibold text-lg">{product.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    ${product.price} USD
                  </p>

                  {/* Variants */}
                  <div className="space-y-2">
                    {product.variants.map((variant) => (
                      <div
                        key={variant.id}
                        className="flex justify-between items-center bg-gray-50 p-2 rounded"
                      >
                        <div className="flex-1">
                          <p className="text-sm font-medium">{variant.title}</p>
                          <p className="text-xs text-gray-600">
                            ${variant.price.amount} {variant.price.currencyCode}
                          </p>
                          <p className="text-xs">
                            {variant.availableForSale ? (
                              <span className="text-green-600">In Stock</span>
                            ) : (
                              <span className="text-red-600">Out of Stock</span>
                            )}
                          </p>
                        </div>
                        <button
                          onClick={() => addToCart(variant, 1)}
                          disabled={isLoading || !variant.availableForSale}
                          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                        >
                          Add to Cart
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart Items */}
        {cart && cart.lines.edges.length > 0 ? (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">
              Cart Items ({cart.lines.edges.length})
            </h2>
            <div className="space-y-4">
              {cart.lines.edges.map(({ node }) => (
                <div
                  key={node.id}
                  className="flex justify-between items-center border-b pb-4 last:border-b-0"
                >
                  <div className="flex-1">
                    <p className="font-medium">
                      {node.merchandise.product?.title || 'Product'}
                    </p>
                    <p className="text-sm text-gray-600">
                      {node.merchandise.title}
                    </p>
                    <p className="text-sm text-gray-600">Qty: {node.quantity}</p>
                    <p className="text-sm font-medium mt-1">
                      ${node.merchandise.price.amount}{' '}
                      {node.merchandise.price.currencyCode}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(node.id)}
                    disabled={isLoading}
                    className="ml-4 text-red-600 hover:text-red-800 disabled:opacity-50 transition-colors px-4 py-2 rounded hover:bg-red-50"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Checkout Button */}
            {cart.checkoutUrl && (
              <a
                href={cart.checkoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 block w-full bg-green-600 text-white text-center py-3 px-4 rounded-lg hover:bg-green-700 transition-colors"
              >
                Proceed to Checkout →
              </a>
            )}
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow text-center text-gray-500">
            <p>Cart is empty</p>
            <p className="text-sm mt-2">Add items to see them here</p>
          </div>
        )}

        {/* Cart JSON */}
        <details className="bg-white p-6 rounded-lg shadow">
          <summary className="cursor-pointer font-semibold hover:text-gray-700">
            View Cart Data (JSON)
          </summary>
          <pre className="mt-4 p-4 bg-gray-100 rounded overflow-auto text-xs max-h-96">
            {JSON.stringify(cart, null, 2)}
          </pre>
        </details>
      </div>
    </div>
  );
}
