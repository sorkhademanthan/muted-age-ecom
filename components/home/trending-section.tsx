'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ProductCard } from '@/components/product/product-card';
import { Loading } from '@/components/ui/loading';
import type { Product } from '@/lib/shopify/types';

export function TrendingSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/get-products');
        const data = await res.json();
        if (data.success) {
          setProducts(data.products.slice(0, 4));
        }
      } catch (error) {
        console.error('Failed to fetch trending products:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-24 w-full bg-white min-h-[500px] flex items-center justify-center">
        <Loading size="lg" />
      </section>
    );
  }

  return (
    <section className="py-32 w-full bg-white">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        {/* Minimal Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-black pb-6">
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter text-black">
            Trending Now
          </h2>
          <Link 
            href="/collections/all" 
            className="text-xs font-bold uppercase tracking-[0.2em] hover:text-gray-500 transition-colors mt-4 md:mt-0 pb-1"
          >
            View All Products
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="animate-reveal"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Note: Ensure your ProductCard component also uses rounded-none for images to match! */}
              <ProductCard product={product} priority={index < 2} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}