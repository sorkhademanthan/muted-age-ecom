import { NextResponse } from 'next/server';
import { shopifyFetch } from '@/lib/shopify/client';
import { GET_PRODUCTS } from '@/lib/shopify/queries/product';

export async function GET() {
  try {
    // Test fetching products
    const data = await shopifyFetch<any>({
      query: GET_PRODUCTS,
      variables: { first: 3 },
      cache: 'no-store',
    });

    return NextResponse.json({
      success: true,
      productCount: data.products.edges.length,
      products: data.products.edges.map((edge: any) => ({
        title: edge.node.title,
        handle: edge.node.handle,
        price: edge.node.priceRange.minVariantPrice.amount,
      })),
    });
  } catch (error) {
    console.error('Test API Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
   