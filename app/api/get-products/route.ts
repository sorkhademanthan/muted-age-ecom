import { NextResponse } from 'next/server';
import { shopifyFetch } from '@/lib/shopify/client';
import { GET_PRODUCTS } from '@/lib/shopify/queries/product';

export async function GET() {
  try {
    const data = await shopifyFetch<any>({
      query: GET_PRODUCTS,
      variables: { first: 5 },
      cache: 'no-store',
    });

    // Return the full product structure
    const products = data.products.edges.map((edge: any) => edge.node);

    return NextResponse.json({
      success: true,
      products,
    });
  } catch (error) {
    console.error('Get products error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
   