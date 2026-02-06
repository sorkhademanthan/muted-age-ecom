# 01 - Shopify Setup & API Configuration

## 📖 Overview

In this step, you'll configure your Shopify store to work with the Storefront API and Customer Account API. You'll obtain the necessary API credentials.

## 🎯 What You'll Accomplish

- Create a custom app in Shopify
- Get Storefront API access token
- Configure API scopes and permissions
- Set up Customer Account API (optional)
- Understand rate limits and best practices

## 📋 Prerequisites

- Access to Shopify Admin
- Store owner or staff account with app development permissions
- Products and collections set up in your store

## 🚀 Step-by-Step Instructions

### Step 1: Access Shopify Admin

1. Log in to your Shopify admin panel
2. Navigate to: **Settings** → **Apps and sales channels**

### Step 2: Enable Custom App Development

1. Click on **"Develop apps"** button
2. If you see a warning, click **"Allow custom app development"**
3. Review and accept the terms

### Step 3: Create a New App

1. Click **"Create an app"** button
2. Enter app details:
   - **App name**: `Muted Age Headless` (or your preferred name)
   - **App developer**: Your email or name
3. Click **"Create app"**

### Step 4: Configure Storefront API Scopes

1. Click on **"Configuration"** tab
2. Under **"Storefront API"** section, click **"Configure"**
3. Select the following scopes:

   **Required Scopes** (Check these):
   ```
   ✅ unauthenticated_read_product_listings
   ✅ unauthenticated_read_product_inventory
   ✅ unauthenticated_read_product_tags
   ✅ unauthenticated_read_product_pickup_locations
   ✅ unauthenticated_read_collection_listings
   ✅ unauthenticated_write_checkouts
   ✅ unauthenticated_read_checkouts
   ✅ unauthenticated_write_customers
   ✅ unauthenticated_read_customers
   ✅ unauthenticated_read_customer_tags
   ```

   **Optional Scopes** (For advanced features):
   ```
   ✅ unauthenticated_read_selling_plans
   ✅ unauthenticated_read_metaobjects
   ✅ unauthenticated_read_content
   ```

4. Click **"Save"**

### Step 5: Get Storefront API Access Token

1. Go to **"API credentials"** tab
2. Under **"Storefront API access token"** section
3. Click **"Install app"** if prompted
4. **COPY AND SAVE** the Storefront API access token
   - Format: `shpat_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
   - ⚠️ **IMPORTANT**: Save this immediately - you won't see it again!

### Step 6: Configure Customer Account API (Optional)

For customer login and order history:

1. In the same app, under **"Customer Account API"** section
2. Click **"Configure"**
3. Select scopes:
   ```
   ✅ read_customers
   ✅ write_customers
   ✅ read_orders
   ✅ read_own_subscription_contracts
   ```
4. Set **Redirect URLs** (for authentication):
   ```
   http://localhost:3000/account/callback
   https://yourdomain.com/account/callback
   ```
5. Save and copy the **Client ID**

### Step 7: Configure Admin API (Optional)

Only if you need server-side operations like webhooks:

1. Under **"Admin API"** section, click **"Configure"**
2. Select minimal required scopes:
   ```
   ✅ read_products
   ✅ read_orders
   ✅ read_inventory
   ```
3. Click **"Install app"**
4. Copy the **Admin API access token**

## 📝 Information to Save

Create a secure note with these credentials:

