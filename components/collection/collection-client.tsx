'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ProductGrid } from '@/components/product/product-grid';
import type { Collection } from '@/lib/shopify/types';

interface CollectionClientProps {
  collection: Collection;
}

const sortOptions = [
  { label: 'Best Selling', value: 'BEST_SELLING' },
  { label: 'Newest', value: 'CREATED' },
  { label: 'Price: Low to High', value: 'PRICE' },
  { label: 'Price: High to Low', value: 'PRICE_REVERSE' },
  { label: 'A-Z', value: 'TITLE' },
];

export function CollectionClient({ collection }: CollectionClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedSort, setSelectedSort] = useState(
    searchParams.get('sort') || 'BEST_SELLING'
  );

  const products = collection.products.edges.map((edge) => edge.node);

  const handleSortChange = (value: string) => {
    setSelectedSort(value);
    router.push(`/collections/${collection.handle}?sort=${value}`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Collection Header */}
      <div className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 uppercase tracking-tight">
            {collection.title}
          </h1>
          {collection.description && (
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              {collection.description}
            </p>
          )}
        </div>
      </div>

      {/* Filters & Sort */}
      <div className="border-b bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              {products.length} {products.length === 1 ? 'product' : 'products'}
            </p>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-sm font-medium text-gray-700">
                Sort by:
              </label>
              <select
                id="sort"
                value={selectedSort}
                onChange={(e) => handleSortChange(e.target.value)}
                className="text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found in this collection.</p>
          </div>
        ) : (
          <ProductGrid products={products} columns={4} />
        )}
      </div>
    </div>
  );
}
