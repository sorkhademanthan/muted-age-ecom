import { shopifyFetch } from '@/lib/shopify/client';
import { GET_PRODUCTS } from '@/lib/shopify/queries/product';
import { ProductGrid } from '@/components/product/product-grid';
import type { Product } from '@/lib/shopify/types';

async function getProducts() {
  try {
    const data = await shopifyFetch<{ products: { edges: Array<{ node: Product }> } }>({
      query: GET_PRODUCTS,
      variables: { first: 24 },
      cache: 'force-cache',
    });

    return data.products.edges.map((edge) => edge.node);
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tight">
            All Products
          </h1>
          <p className="text-lg text-gray-300 mt-4">
            Discover our complete collection
          </p>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-sm text-gray-600 mb-8">
          {products.length} {products.length === 1 ? 'product' : 'products'}
        </p>
        <ProductGrid products={products} columns={4} />
      </div>
    </div>
  );
}
