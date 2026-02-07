/**
 * Application-wide constants
 */

// Currency and formatting
export const CURRENCY = {
  code: 'USD',
  symbol: '$',
  locale: 'en-US',
} as const;

// Product constants
export const PRODUCT = {
  DEFAULT_IMAGE: '/images/product-placeholder.png',
  MAX_IMAGES: 10,
  MAX_VARIANTS: 100,
} as const;

// Cart constants
export const CART = {
  MAX_QUANTITY: 99,
  COOKIE_NAME: 'shopify_cart_id',
  COOKIE_EXPIRES: 30, // days
} as const;

// Pagination
export const PAGINATION = {
  PRODUCTS_PER_PAGE: 12,
  COLLECTIONS_PER_PAGE: 8,
  SEARCH_RESULTS_PER_PAGE: 20,
} as const;

// API Configuration
export const API = {
  TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
} as const;

// Routes
export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  COLLECTIONS: '/collections',
  CART: '/cart',
  CHECKOUT: '/checkout',
  ACCOUNT: '/account',
  SEARCH: '/search',
} as const;

// Image sizes for optimization
export const IMAGE_SIZES = {
  THUMBNAIL: 100,
  SMALL: 300,
  MEDIUM: 600,
  LARGE: 1200,
  XLARGE: 2000,
} as const;

// Breakpoints (must match Tailwind config)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;
