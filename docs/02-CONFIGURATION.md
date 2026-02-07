# 02 - Configuration & Environment Setup

## 📖 Overview

Configure your Next.js application with environment variables, TypeScript, Tailwind CSS, and Next.js settings for optimal Shopify integration.

## 🎯 What You'll Accomplish

- Set up environment variables
- Configure Next.js for Shopify
- Configure TypeScript
- Set up Tailwind CSS properly
- Create utility functions for configuration

## 📋 Prerequisites

- Completed [01-SHOPIFY-SETUP.md](./01-SHOPIFY-SETUP.md)
- Shopify API credentials ready
- Store domain noted

## 🚀 Step-by-Step Instructions

### Step 1: Create Environment Files

You'll create two files:
1. `.env.local` - Your actual credentials (never commit!)
2. `.env.example` - Template for other developers

#### Required Information From You:
- Shopify store domain (e.g., `your-store.myshopify.com`)
- Storefront API access token
- Customer Account API Client ID (if using)
- Your production domain (when ready)

### Step 2: Configure Next.js

#### What You Need to Provide:
- Your Shopify store domain
- Any custom domains you'll use for images
- Preferred image sizes for optimization

The configuration will handle:
- Image optimization from Shopify CDN
- Proper headers for API requests
- Build optimization
- Development settings

### Step 3: Update TypeScript Configuration

We'll configure TypeScript for:
- Strict type checking
- Path aliases for cleaner imports
- Proper module resolution

### Step 4: Configure Tailwind CSS

Customize Tailwind for your brand:
- Custom colors (provide your brand colors)
- Custom fonts (if any)
- Extend default theme
- Add custom animations

#### Information Needed:
- Primary brand color (hex code)
- Secondary brand color (hex code)
- Accent color (hex code)
- Font preferences (if custom)

### Step 5: Create Configuration Utilities

We'll create helper files for:
- Site metadata (provide site name, description)
- API configuration
- Constants and enums

#### Information to Provide:
- Site name: "Muted Age" (or your preference)
- Site description: Your store description
- Default currency: USD (or your preference)
- Default language: EN (or your preference)
- Social media links (optional)
- Contact information (optional)

## 📝 Information Collection Form

Before we start coding, please provide:

### Store Information
```
Store Name: _______________
Store Domain: _______________.myshopify.com
Store Description: _______________
Default Currency: _______________
Default Language: _______________
```

### API Credentials
```
Storefront API Token: shpat________________
Customer Account Client ID: shp________________
Admin API Token (optional): shpat________________
```

### Brand Colors (Hex Codes)
```
Primary Color: #_______________
Secondary Color: #_______________
Accent Color: #_______________
Background Color: #_______________
Text Color: #_______________
```

### Site URLs
```
Development URL: http://localhost:3000
Staging URL (optional): _______________
Production URL: _______________
```

### Features to Enable
```
[ ] Customer Accounts
[ ] Subscriptions
[ ] Multi-currency
[ ] Multi-language
[ ] Product reviews
[ ] Wishlist
[ ] Search functionality
```

## 🎨 Tailwind Theme Customization

### Font Selection
Choose your fonts:
- **Heading Font**: (e.g., "Inter", "Montserrat", "Playfair Display")
- **Body Font**: (e.g., "Inter", "Open Sans", "Roboto")

### Spacing & Layout
- Max container width: (e.g., 1280px, 1440px, 1920px)
- Grid columns: (default: 12)

## 🔒 Security Checklist

Before proceeding:
- [ ] `.env.local` added to `.gitignore`
- [ ] No API tokens in code
- [ ] All sensitive data in environment variables
- [ ] `.env.example` created with placeholders

## 📊 File Structure After This Step

```
sample-ecom-mutedage/
├── .env.local (your secrets - DO NOT COMMIT)
├── .env.example (template)
├── next.config.js (updated)
├── tsconfig.json (updated)
├── tailwind.config.ts (customized)
├── config/
│   ├── site.ts (site metadata)
│   └── constants.ts (app constants)
└── lib/
    └── utils/
        ├── cn.ts (className utility)
        └── constants.ts (shared constants)
```

## ✅ Verification Steps

After configuration:
1. Check environment variables load: `npm run dev`
2. Verify TypeScript: `npm run type-check`
3. Test Tailwind: Check if custom colors work
4. Validate Next.js config: Build should succeed

## ⚠️ Common Issues

### Issue: Environment variables not loading
**Solution**: 
- Restart dev server after creating `.env.local`
- Check variable names start with `NEXT_PUBLIC_` for client-side
- No spaces around `=` in `.env.local`

### Issue: TypeScript path aliases not working
**Solution**: Restart VS Code or TypeScript server

### Issue: Tailwind custom colors not applying
**Solution**: Check `tailwind.config.ts` syntax, restart dev server

## 🎓 Best Practices

1. **Environment Variables**
   - Use `NEXT_PUBLIC_` prefix for client-side variables
   - Never commit `.env.local`
   - Document all variables in `.env.example`

2. **TypeScript**
   - Enable strict mode
   - Use path aliases for cleaner imports
   - Define types before using

3. **Tailwind**
   - Use design tokens (colors, spacing)
   - Avoid arbitrary values when possible
   - Use semantic naming for custom classes

## 📝 Next Steps

Once you've gathered all the information above, we'll:
1. Create the environment files
2. Configure Next.js
3. Set up TypeScript
4. Customize Tailwind
5. Create configuration utilities

Proceed to:
- **[03-SHOPIFY-CLIENT.md](./03-SHOPIFY-CLIENT.md)** - Set up the Shopify GraphQL client

---

**Status**: ✅ COMPLETED
**Estimated Time**: 30 minutes
**Previous**: [01-SHOPIFY-SETUP.md](./01-SHOPIFY-SETUP.md)
**Next**: [03-SHOPIFY-CLIENT.md](./03-SHOPIFY-CLIENT.md)
