/**
 * TypeScript types for Shopify Storefront API
 */

// GraphQL response wrapper
export interface ShopifyResponse<T> {
  data: T;
  errors?: ShopifyError[];
}

// Error format from Shopify
export interface ShopifyError {
  message: string;
  locations?: { line: number; column: number }[];
  path?: string[];
  extensions?: {
    code?: string;
    [key: string]: any;
  };
}

// Money type (price, cost, etc.)
export interface Money {
  amount: string;
  currencyCode: string;
}

// Image type
export interface Image {
  id?: string;
  url: string;
  altText?: string;
  width?: number;
  height?: number;
}

// Product variant option
export interface SelectedOption {
  name: string;
  value: string;
}

// Basic product type (we'll expand this later)
export interface Product {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml?: string;
  availableForSale: boolean;
  priceRange: {
    minVariantPrice: Money;
    maxVariantPrice: Money;
  };
  images: {
    edges: Array<{
      node: Image;
    }>;
  };
  variants: {
    edges: Array<{
      node: ProductVariant;
    }>;
  };
}

// Product variant
export interface ProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: Money;
  compareAtPrice?: Money;
  selectedOptions: SelectedOption[];
  image?: Image;
}

// Collection type
export interface Collection {
  id: string;
  title: string;
  handle: string;
  description: string;
  image?: Image;
}

// Cart line item
export interface CartLine {
  id: string;
  quantity: number;
  merchandise: ProductVariant;
}

// Cart type
export interface Cart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  estimatedCost: {
    totalAmount: Money;
    subtotalAmount: Money;
    totalTaxAmount?: Money;
  };
  lines: {
    edges: Array<{
      node: CartLine;
    }>;
  };
}

// Pagination info
export interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor?: string;
  endCursor?: string;
}

// Connection type (for paginated lists)
export interface Connection<T> {
  edges: Array<{
    node: T;
    cursor: string;
  }>;
  pageInfo: PageInfo;
}
