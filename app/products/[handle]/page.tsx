import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { shopifyFetch } from '@/lib/shopify/client';
import { GET_PRODUCT_BY_HANDLE } from '@/lib/shopify/queries/product';
import { ProductDetailClient } from '@/components/product/product-detail-client';
import type { Product } from '@/lib/shopify/types';

interface ProductPageProps {
  params: Promise<{
    handle: string;
  }>;
}

async function getProduct(handle: string): Promise<Product | null> {
  try {
    const data = await shopifyFetch<{ product: Product }>({
      query: GET_PRODUCT_BY_HANDLE,
      variables: { handle },
      cache: 'force-cache',
      tags: [`product-${handle}`],
    });

    return data.product;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProduct(handle);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: `${product.title} | Muted Age`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: product.images.edges[0]?.node.url ? [product.images.edges[0].node.url] : [],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params;
  const product = await getProduct(handle);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
