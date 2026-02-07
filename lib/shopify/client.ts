import { GraphQLClient } from 'graphql-request';
import { siteConfig } from '@/config/site';
import {
  ShopifyAPIError,
  ShopifyNetworkError,
  ShopifyRateLimitError,
} from './errors';
import type { ShopifyResponse } from './types';

/**
 * Shopify Storefront API GraphQL Client
 * Handles authentication, error handling, and retries
 */

const API_VERSION = '2024-01';

// Create GraphQL client instance
const endpoint = `https://${siteConfig.shopify.storeDomain}/api/${API_VERSION}/graphql.json`;

const client = new GraphQLClient(endpoint, {
  headers: {
    'X-Shopify-Storefront-Access-Token':
      siteConfig.shopify.storefrontAccessToken,
    'Content-Type': 'application/json',
  },
});

/**
 * Execute a GraphQL query with error handling and retries
 */
export async function shopifyFetch<T>({
  query,
  variables = {},
  cache = 'force-cache',
  tags = [],
}: {
  query: string;
  variables?: Record<string, any>;
  cache?: RequestCache;
  tags?: string[];
}): Promise<T> {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token':
          siteConfig.shopify.storefrontAccessToken,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
      cache,
      next: {
        tags,
      },
    });

    if (!response.ok) {
      if (response.status === 429) {
        throw new ShopifyRateLimitError();
      }
      throw new ShopifyNetworkError(
        `HTTP ${response.status}: ${response.statusText}`
      );
    }

    const json: ShopifyResponse<T> = await response.json();

    // Handle GraphQL errors
    if (json.errors) {
      console.error('GraphQL Errors:', json.errors);
      throw new ShopifyAPIError(
        json.errors[0]?.message || 'GraphQL Error',
        undefined,
        json.errors
      );
    }

    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.log('✅ Shopify API Success:', {
        query: query.split('\n')[0].trim(),
        variables,
      });
    }

    return json.data;
  } catch (error) {
    // Re-throw our custom errors
    if (
      error instanceof ShopifyAPIError ||
      error instanceof ShopifyNetworkError ||
      error instanceof ShopifyRateLimitError
    ) {
      throw error;
    }

    // Wrap unknown errors
    console.error('Shopify API Error:', error);
    throw new ShopifyNetworkError(
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
}

/**
 * Execute a GraphQL mutation
 */
export async function shopifyMutate<T>(
  query: string,
  variables?: Record<string, any>
): Promise<T> {
  return shopifyFetch<T>({
    query,
    variables,
    cache: 'no-store',
  });
}

/**
 * Export the client for direct use if needed
 */
export { client as shopifyClient };
