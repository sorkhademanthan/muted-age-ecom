# 03 - Shopify GraphQL Client Setup

## 📖 Overview

Create a robust GraphQL client to communicate with Shopify's Storefront API. This is the foundation for all data fetching in your application.

## 🎯 What You'll Accomplish

- Set up GraphQL client with error handling
- Configure API versioning
- Implement request/response interceptors
- Add caching strategy
- Create type-safe API wrapper
- Set up error logging

## 📋 Prerequisites

- Completed [02-CONFIGURATION.md](./02-CONFIGURATION.md)
- Environment variables configured
- Understanding of GraphQL basics

## 🧠 Understanding Shopify Storefront API

### API Structure
- **Endpoint**: `https://your-store.myshopify.com/api/2024-01/graphql.json`
- **Method**: POST
- **Content-Type**: application/json
- **Authentication**: X-Shopify-Storefront-Access-Token header

### API Versioning
Shopify uses quarterly versioning:
- Format: `YYYY-MM` (e.g., `2024-01`, `2024-04`)
- Stable versions supported for minimum 12 months
- Recommended: Use latest stable version

### Rate Limiting
- Cost-based throttling
- 1000 points per second
- Each query costs 1-1000 points based on complexity

## 🚀 Step-by-Step Implementation

### Step 1: GraphQL Client Foundation

We'll create a GraphQL client that:
- Handles authentication automatically
- Manages rate limiting
- Provides error handling
- Supports request retries
- Logs requests (in development)

**File**: `lib/shopify/client.ts`

#### Key Features to Implement:
1. Auto-inject access token
2. Handle network errors
3. Parse GraphQL errors
4. Retry failed requests (up to 3 times)
5. Log requests in development mode

### Step 2: Error Handling

Create custom error classes:
- `ShopifyAPIError` - General API errors
- `ShopifyRateLimitError` - Rate limit exceeded
- `ShopifyNetworkError` - Network issues
- `ShopifyValidationError` - Invalid input

**File**: `lib/shopify/errors.ts`

### Step 3: Type Definitions

Define TypeScript types for:
- API responses
- Error formats
- Query variables
- Common interfaces

**File**: `lib/shopify/types.ts`

#### Required Type Definitions:
```typescript
// API Response wrapper
type ShopifyResponse<T>
// Error response
type ShopifyError
// Query options
type QueryOptions
// Mutation options
type MutationOptions
```

### Step 4: API Wrapper Functions

Create wrapper functions for common operations:
- `query<T>(query: string, variables?: object): Promise<T>`
- `mutate<T>(mutation: string, variables?: object): Promise<T>`

These will handle:
- Request formatting
- Error parsing
- Response validation
- Type safety

### Step 5: Request Caching Strategy

Implement caching for:
- Product data (cache for 5 minutes)
- Collection data (cache for 10 minutes)
- Cart data (no cache)
- Customer data (cache for 1 minute)

Using Next.js built-in caching:
- `fetch` with `next: { revalidate: 300 }`
- React Cache for deduplication

### Step 6: Development Tools

Add development utilities:
- Request/Response logging
- Query cost tracking
- Performance monitoring
- GraphQL query formatting

## 📝 Files to Create
- `lib/shopify/client.ts`
- `lib/shopify/errors.ts`
- `lib/shopify/types.ts`
- `lib/shopify/api.ts`
- `lib/shopify/hooks.ts`
- `lib/shopify/utils.ts`

