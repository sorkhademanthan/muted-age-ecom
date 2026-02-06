# 05 - GraphQL Queries & Mutations

## 📖 Overview

Create all GraphQL queries and mutations needed to interact with Shopify's Storefront API. This includes fetching products, managing carts, and handling checkouts.

## 🎯 What You'll Accomplish

- Write product queries
- Create collection queries
- Build cart mutations
- Set up checkout operations
- Implement customer queries
- Add search functionality
- Optimize query performance

## 📋 Prerequisites

- Completed [04-TYPES-AND-INTERFACES.md](./04-TYPES-AND-INTERFACES.md)
- Types defined
- GraphQL client set up
- Understanding of GraphQL syntax

## 🧠 GraphQL Fundamentals

### Query Structure
```graphql
query QueryName($variable: Type!) {
  object(input: $variable) {
    field1
    field2
    nestedObject {
      field3
    }
  }
}
```

### Mutation Structure
```graphql
mutation MutationName($input: InputType!) {
  mutationName(input: $input) {
    object {
      id
      field
    }
    userErrors {
      field
      message
    }
  }
}
```

### Fragments (Reusable Selections)
```graphql
fragment ProductFields on Product {
  id
  title
  handle
}
```

## 🚀 Step-by-Step Implementation

### Step 1: Product Queries

**File**: `lib/shopify/queries/product.ts`

Create queries for:
1. Get all products (with pagination)
2. Get product by handle
3. Get product by ID
4. Get product recommendations
5. Search products

#### Query Considerations:
- Include variants with prices
- Fetch images optimized for web
- Get SEO metadata
- Include availability status
- Fetch metafields if needed

#### Performance Tips:
- Limit fields to what's needed
- Use pagination (first: 20)
- Implement cursor-based pagination
- Request specific image sizes

### Step 2: Collection Queries

**File**: `lib/shopify/queries/collection.ts`

Create queries for:
1. Get all collections
2. Get collection by handle
3. Get collection with products
4. Get collection with filters

#### Include:
- Collection metadata
- Product count
- Featured products
- Image assets
- SEO information

### Step 3: Cart Queries & Mutations

**File**: `lib/shopify/queries/cart.ts`
**File**: `lib/shopify/mutations/cart.ts`

#### Queries:
- Get cart by ID
- Get cart line items

#### Mutations:
1. `cartCreate` - Create new cart
2. `cartLinesAdd` - Add items to cart
3. `cartLinesUpdate` - Update quantities
4. `cartLinesRemove` - Remove items
5. `cartDiscountCodesUpdate` - Apply discount
6. `cartBuyerIdentityUpdate` - Set customer info

#### Cart Data to Fetch:
```graphql
{
  id
  checkoutUrl
  totalQuantity
  estimatedCost {
    totalAmount
    subtotalAmount
    totalTaxAmount
  }
  lines(first: 100) {
    edges {
      node {
        id
        quantity
        merchandise {
          ... on ProductVariant {
            id
            title
            price
            product {
              title
              handle
            }
          }
        }
      }
    }
  }
}
```

### Step 4: Checkout Operations

**File**: `lib/shopify/mutations/checkout.ts`

While cart handles most operations, you might need:
- Customer association
- Shipping address
- Payment methods (if custom checkout)

**Note**: Shopify manages checkout, so you'll mainly redirect to `checkoutUrl`

### Step 5: Customer Queries

**File**: `lib/shopify/queries/customer.ts`

If using Customer Account API:
1. Get customer profile
2. Get customer orders
3. Get customer addresses
4. Get customer metafields

**Security**: These require customer access tokens

### Step 6: Search & Filter

**File**: `lib/shopify/queries/search.ts`

Implement:
1. Product search by keyword
2. Filter by price range
3. Filter by availability
4. Filter by product type
5. Filter by vendor
6. Sort options

#### Search Query Structure:
```graphql
query SearchProducts($query: String!, $sortKey: ProductSortKeys) {
  products(first: 20, query: $query, sortKey: $sortKey) {
    edges {
      node {
        # product fields
      }
    }
  }
}
```

### Step 7: Create Fragments

**File**: `lib/shopify/fragments.ts`

Reusable field selections:
- `MoneyFragment` - Currency fields
- `ImageFragment` - Image fields
- `ProductCardFragment` - Product listing
- `ProductDetailFragment` - Full product
- `VariantFragment` - Variant fields
- `CartLineFragment` - Cart item fields

## 📝 Files to Create

