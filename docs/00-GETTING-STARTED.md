# 00 - Getting Started

## 📖 Overview

This document ensures you have everything set up correctly before starting development.

## ✅ Prerequisites Checklist

### System Requirements
- [ ] Node.js 18.17 or later installed
- [ ] npm or yarn package manager
- [ ] Git installed
- [ ] Code editor (VS Code recommended)
- [ ] Terminal/Command line access

### Shopify Requirements
- [ ] Active Shopify store (can be development store)
- [ ] Admin access to Shopify store
- [ ] At least 5-10 products added to your store
- [ ] At least 2-3 collections created
- [ ] Product images uploaded

### Knowledge Requirements
- [ ] Basic understanding of React
- [ ] Familiarity with TypeScript
- [ ] Understanding of Next.js concepts
- [ ] Basic GraphQL knowledge (we'll guide you)
- [ ] Tailwind CSS basics

## 🔍 Verify Your Installation

### 1. Check Node.js Version
```bash
node --version
# Should show v18.17 or higher
```

### 2. Check npm Version
```bash
npm --version
# Should show 9.x or higher
```

### 3. Verify Folder Structure
```bash
ls -la
# You should see: app/, components/, lib/, types/, hooks/, public/
```

### 4. Check Installed Dependencies
```bash
npm list --depth=0
# Verify all packages are installed
```

## 📦 What You've Already Completed

- ✅ Created folder structure
- ✅ Installed all dependencies
- ✅ Set up Prettier configuration

## 🎯 What Information You'll Need

Before proceeding, gather this information from your Shopify admin:

### Required from Shopify Admin

1. **Store Domain**
   - Location: Settings → Store details
   - Format: `your-store.myshopify.com`

2. **Storefront API Access Token**
   - Location: Settings → Apps and sales channels → Develop apps
   - You'll create this in the next step

3. **Admin API Access Token** (optional, for advanced features)
   - Same location as above
   - Only needed for server-side operations

### Store Content to Prepare

1. **Products**
   - At least 10 products for testing
   - With variants (size, color, etc.)
   - With multiple images
   - With descriptions and prices

2. **Collections**
   - At least 3 collections
   - Products assigned to collections
   - Collection images (optional)

3. **Store Policies** (optional)
   - Privacy policy
   - Refund policy
   - Terms of service

## 🛠️ Development Tools Setup

### VS Code Extensions (Recommended)
```bash
# Install these extensions:
- ESLint
- Prettier - Code formatter
- Tailwind CSS IntelliSense
- GraphQL: Language Feature Support
- TypeScript Vue Plugin (Volar)
```

### VS Code Settings
Create `.vscode/settings.json`:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "tailwindCSS.experimental.classRegex": [
    ["cn\\(([^)]*)\\)", "(?:'|\"|`)([^\"'`]*)(?:'|\"|`)"]
  ]
}
```

## 📝 Next Steps

Once you've verified everything above, proceed to:
- **[01-SHOPIFY-SETUP.md](./01-SHOPIFY-SETUP.md)** - Configure your Shopify store and get API credentials

## ⚠️ Common Issues

### Issue: Dependencies not installing
**Solution**: 
```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Issue: TypeScript errors
**Solution**: 
```bash
npm run type-check
# Fix any errors shown
```

### Issue: Prettier not formatting
**Solution**: Check that prettier-plugin-tailwindcss is installed and configured

---

**Status**: ✅ Complete this checklist before moving forward
**Estimated Time**: 15-30 minutes
**Next**: [01-SHOPIFY-SETUP.md](./01-SHOPIFY-SETUP.md)
