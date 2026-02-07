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
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${product.handle}`}>
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
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

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-2">
            {!product.availableForSale && (
              <Badge variant="error">Sold Out</Badge>
            )}
            {hasDiscount && <Badge variant="success">Sale</Badge>}
          </div>

          {/* Quick Add Button */}
          <div
            className={cn(
              'absolute bottom-0 left-0 right-0 p-4 transition-all duration-300',
              isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
            )}
          >
            <Button
              onClick={handleQuickAdd}
              disabled={!product.availableForSale || isLoading}
              fullWidth
              size="sm"
            >
              Quick Add
            </Button>
          </div>
        </div>

        {/* Product Info */}
        <div className="mt-4 space-y-2">
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
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
    </div>
  );
}
