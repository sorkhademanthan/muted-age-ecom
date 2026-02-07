'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ProductGallery } from './product-gallery';
import { VariantSelector } from './variant-selector';
import { AddToCartButton } from './add-to-cart-button';
import { PriceDisplay } from './price-display';
import type { Product, ProductVariant } from '@/lib/shopify/types';

interface ProductDetailClientProps {
  product: Product;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants.edges[0]?.node
  );

  const images = product.images.edges.map((edge) => edge.node);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Product Gallery */}
          <ProductGallery images={images} productTitle={product.title} />

          {/* Right: Product Info */}
          <div className="space-y-8">
            {/* Product Title & Price */}
            <div>
              <h1 className="text-4xl font-bold tracking-tight mb-4">
                {product.title}
              </h1>
              <PriceDisplay
                price={selectedVariant.price}
                compareAtPrice={selectedVariant.compareAtPrice}
                size="lg"
              />
            </div>

            {/* Variant Selector */}
            {product.variants.edges.length > 1 && (
              <VariantSelector
                variants={product.variants.edges.map((e) => e.node)}
                selectedVariant={selectedVariant}
                onVariantChange={setSelectedVariant}
              />
            )}

            {/* Add to Cart */}
            <AddToCartButton
              variant={selectedVariant}
              availableForSale={product.availableForSale && selectedVariant.availableForSale}
            />

            {/* Product Description */}
            {product.description && (
              <div className="border-t pt-8">
                <h2 className="text-lg font-semibold mb-4">Description</h2>
                <div
                  className="prose prose-sm text-gray-600"
                  dangerouslySetInnerHTML={{ __html: product.descriptionHtml || product.description }}
                />
              </div>
            )}

            {/* Product Details */}
            <div className="border-t pt-8">
              <h2 className="text-lg font-semibold mb-4">Details</h2>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>SKU: {selectedVariant.id.split('/').pop()}</li>
                {selectedVariant.availableForSale ? (
                  <li className="text-green-600 font-medium">In Stock</li>
                ) : (
                  <li className="text-red-600 font-medium">Out of Stock</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
