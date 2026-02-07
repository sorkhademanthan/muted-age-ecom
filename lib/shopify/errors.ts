/**
 * Custom error classes for Shopify API interactions
 */

export class ShopifyAPIError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public errors?: any[]
  ) {
    super(message);
    this.name = 'ShopifyAPIError';
  }
}

export class ShopifyNetworkError extends ShopifyAPIError {
  constructor(message: string = 'Network error occurred') {
    super(message);
    this.name = 'ShopifyNetworkError';
  }
}

export class ShopifyRateLimitError extends ShopifyAPIError {
  constructor(message: string = 'Rate limit exceeded') {
    super(message, 429);
    this.name = 'ShopifyRateLimitError';
  }
}

export class ShopifyValidationError extends ShopifyAPIError {
  constructor(message: string, errors?: any[]) {
    super(message, 400, errors);
    this.name = 'ShopifyValidationError';
  }
}
