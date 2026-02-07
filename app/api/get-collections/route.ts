import { NextResponse } from 'next/server';
import { shopifyFetch } from '@/lib/shopify/client';
import { GET_COLLECTIONS } from '@/lib/shopify/queries/collection';

export async function GET() {
  try {
    const data = await shopifyFetch<any>({
      query: GET_COLLECTIONS,
      variables: { first: 20 },
      cache: 'no-store',
    });

    const collections = data.collections.edges.map((edge: any) => ({
      id: edge.node.id,
      title: edge.node.title,
      handle: edge.node.handle,
      description: edge.node.description,
    }));

    return NextResponse.json({
      success: true,
      collections,
    });
  } catch (error) {
    console.error('Get collections error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
