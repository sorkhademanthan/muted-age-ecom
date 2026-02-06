export const SHOPIFY_GRAPHQL_API_ENDPOINT = `/api/${process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION || '2024-01'}/graphql.json`;

export const TAGS = {
  collections: 'collections',
  products: 'products',
  cart: 'cart',
} as const;

export const HIDDEN_PRODUCT_TAG = 'nextjs-frontend-hidden';
export const DEFAULT_OPTION = 'Default Title';
export const SHOPIFY_GRAPHQL_API_VERSION = '2024-01';

// Cart cookie name
export const CART_COOKIE_NAME = 'shopify-cart';

// Revalidation times (in seconds)
export const REVALIDATE_TIME = {
  products: 300, // 5 minutes
  collections: 600, // 10 minutes
  pages: 3600, // 1 hour
} as const;

// Pagination
export const PRODUCTS_PER_PAGE = 20;
export const COLLECTIONS_PER_PAGE = 12;

// Image sizes
export const IMAGE_SIZES = {
  thumbnail: 150,
  small: 400,
  medium: 800,
  large: 1200,
  hero: 1920,
} as const;

// Product sort options
export const PRODUCT_SORT_OPTIONS = {
  TITLE: 'TITLE',
  PRICE_ASC: 'PRICE',
  PRICE_DESC: 'PRICE',
  CREATED_AT: 'CREATED_AT',
  BEST_SELLING: 'BEST_SELLING',
} as const;

export type ProductSortKey = keyof typeof PRODUCT_SORT_OPTIONS;
