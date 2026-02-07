import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { shopifyFetch } from '@/lib/shopify/client';
import { GET_COLLECTION_BY_HANDLE } from '@/lib/shopify/queries/collection';
import { CollectionClient } from '@/components/collection/collection-client';
import type { Collection } from '@/lib/shopify/types';

interface CollectionPageProps {
  params: Promise<{
    handle: string;
  }>;
  searchParams: Promise<{
    sort?: string;
  }>;
}

async function getCollection(handle: string, sortKey?: string): Promise<Collection | null> {
  try {
    const data = await shopifyFetch<{ collection: Collection }>({
      query: GET_COLLECTION_BY_HANDLE,
      variables: { 
        handle,
        first: 24,
        sortKey: sortKey || 'BEST_SELLING'
      },
      cache: 'force-cache',
      tags: [`collection-${handle}`],
    });

    return data.collection;
  } catch (error) {
    console.error('Error fetching collection:', error);
    return null;
  }
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { handle } = await params;
  const collection = await getCollection(handle);

  if (!collection) {
    return {
      title: 'Collection Not Found',
    };
  }

  return {
    title: `${collection.title} | Muted Age`,
    description: collection.description,
    openGraph: {
      title: collection.title,
      description: collection.description,
      images: collection.image?.url ? [collection.image.url] : [],
    },
  };
}

export default async function CollectionPage({ params, searchParams }: CollectionPageProps) {
  const { handle } = await params;
  const { sort } = await searchParams;
  const collection = await getCollection(handle, sort);

  if (!collection) {
    notFound();
  }

  return <CollectionClient collection={collection} />;
}
