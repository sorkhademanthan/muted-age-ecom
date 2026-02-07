'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import type { Product } from '@/lib/shopify/types';
import { cn } from '@/lib/utils/cn';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart, isLoading } = useCart();

  const firstImage = product.images.edges[0]?.node;
  const secondImage = product.images.edges[1]?.node;
  const firstVariant = product.variants.edges[0]?.node;

  const price = product.priceRange.minVariantPrice.amount;
  const compareAtPrice = firstVariant?.compareAtPrice?.amount;
  const hasDiscount = compareAtPrice && parseFloat(compareAtPrice) > parseFloat(price);

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (firstVariant) {
      await addToCart(firstVariant, 1);
    }
  };

  return (
    <div
      className="group relative transform transition-all duration-300 hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${product.handle}`}>
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-gray-100 mb-4 shadow-sm group-hover:shadow-xl transition-shadow duration-300">
          {/* Primary Image */}
          {firstImage && (
            <Image
              src={firstImage.url}
              alt={firstImage.altText || product.title}
              fill
              className={cn(
                'object-cover transition-opacity duration-300',
                isHovered && secondImage ? 'opacity-0' : 'opacity-100'
              )}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={priority}
            />
          )}

          {/* Secondary Image (on hover) */}
          {secondImage && (
            <Image
              src={secondImage.url}
              alt={secondImage.altText || product.title}
              fill
              className={cn(
                'object-cover transition-opacity duration-300',
                isHovered ? 'opacity-100' : 'opacity-0'
              )}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}

          {/* Badges with animation */}
          <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
            {!product.availableForSale && (
              <Badge variant="error" className="text-xs animate-fade-in">
                Sold Out
              </Badge>
            )}
            {hasDiscount && (
              <Badge variant="success" className="text-xs animate-fade-in">
                Sale
              </Badge>
            )}
          </div>

          {/* Quick View on Hover - Premium Touch */}
          <div className={cn(
            'absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 pointer-events-none'
          )} />
        </div>

        {/* Product Info with Stagger Animation */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-gray-600 transition-colors duration-200">
            {product.title}
          </h3>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-base font-semibold text-gray-900">
              ${price}
            </span>
            {hasDiscount && (
              <span className="text-sm text-gray-500 line-through">
                ${compareAtPrice}
              </span>
            )}
          </div>

          {/* Variant Count */}
          {product.variants.edges.length > 1 && (
            <p className="text-xs text-gray-500">
              {product.variants.edges.length} variants available
            </p>
          )}
        </div>
      </Link>

      {/* Add to Cart Button with Better States */}
      <div className="mt-4">
        <Button
          onClick={handleQuickAdd}
          disabled={!product.availableForSale || isLoading}
          fullWidth
          size="md"
          className={cn(
            "bg-black text-white hover:bg-gray-800 transition-all duration-200",
            "transform active:scale-95",
            isLoading && "cursor-wait opacity-75"
          )}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Adding...
            </span>
          ) : !product.availableForSale ? (
            'Sold Out'
          ) : (
            'Add to Cart'
          )}
        </Button>
      </div>
    </div>
  );
}
