'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ProductCard } from '@/components/product/product-card';
import { ProductGridSkeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
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

  return (
    <section className="py-20 lg:py-32 px-4 bg-white">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              Trending Now
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              Discover our most popular pieces loved by fashion enthusiasts worldwide
            </p>
          </div>
          <Link href="/collections/all-products">
            <Button 
              variant="outline" 
              className="border-2 border-black hover:bg-black hover:text-white px-6 py-3 rounded-full font-semibold transition-all"
            >
              View All Products →
            </Button>
          </Link>
        </div>

        {/* Product Grid with Loading State */}
        {loading ? (
          <ProductGridSkeleton count={4} />
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No trending products available</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="animate-reveal"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <ProductCard product={product} priority={index < 2} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}