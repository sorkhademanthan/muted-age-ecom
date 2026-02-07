'use client';

import { useEffect, useState } from 'react';
import { ProductGrid } from '@/components/product/product-grid';
import { ProductCard } from '@/components/product/product-card';
import { VariantSelector } from '@/components/product/variant-selector';
import { PriceDisplay } from '@/components/product/price-display';
import { AddToCartButton } from '@/components/product/add-to-cart-button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Loading } from '@/components/ui/loading';
import type { Product, ProductVariant } from '@/lib/shopify/types';

export default function TestProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/get-products');
        const data = await res.json();
        if (data.success && data.products.length > 0) {
          setProducts(data.products);
          // Set first variant from first product
          const firstProduct = data.products[0];
          if (firstProduct.variants?.edges?.[0]) {
            setSelectedVariant(firstProduct.variants.edges[0].node);
          }
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loading size="lg" />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">No products available</p>
      </div>
    );
  }

  const firstProduct = products[0];

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold">Product Components Test</h1>

        {/* Product Grid */}
        <Card>
          <CardHeader>
            <CardTitle>Product Grid</CardTitle>
          </CardHeader>
          <CardContent>
            <ProductGrid products={products} columns={3} />
          </CardContent>
        </Card>

        {/* Price Display */}
        {firstProduct?.priceRange?.minVariantPrice && (
          <Card>
            <CardHeader>
              <CardTitle>Price Display</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <PriceDisplay
                price={firstProduct.priceRange.minVariantPrice}
                compareAtPrice={firstProduct.variants.edges[0]?.node.compareAtPrice}
                size="lg"
              />
            </CardContent>
          </Card>
        )}

        {/* Variant Selector */}
        {firstProduct?.variants?.edges && (
          <Card>
            <CardHeader>
              <CardTitle>Variant Selector</CardTitle>
            </CardHeader>
            <CardContent>
              <VariantSelector
                variants={firstProduct.variants.edges.map((e) => e.node)}
                selectedVariant={selectedVariant}
                onVariantChange={setSelectedVariant}
              />
            </CardContent>
          </Card>
        )}

        {/* Add to Cart */}
        {selectedVariant && (
          <Card>
            <CardHeader>
              <CardTitle>Add to Cart Button</CardTitle>
            </CardHeader>
            <CardContent>
              <AddToCartButton
                variant={selectedVariant}
                availableForSale={selectedVariant.availableForSale}
              />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
