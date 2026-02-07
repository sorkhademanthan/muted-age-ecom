/**
 * Site-wide configuration and metadata
 * Used for SEO, social sharing, and general site information
 */

export const siteConfig = {
  name: 'Muted Age',
  description: 'Premium fashion and lifestyle brand offering curated collections',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  ogImage: '/og-image.jpg',

  links: {
    instagram: 'https://instagram.com/mutedage',
    facebook: 'https://facebook.com/mutedage',
    twitter: 'https://twitter.com/mutedage',
  },

  creator: {
    name: 'Muted Age',
    url: 'https://mutedage.com',
  },

  // Shopify configuration
  shopify: {
    storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || '',
    storefrontAccessToken:
      process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '',
    apiVersion: '2024-01',
  },

  // Contact information
  contact: {
    email: 'support@mutedage.com',
    phone: '+1 (555) 123-4567',
  },

  // Default SEO metadata
  defaultSEO: {
    title: 'Muted Age - Premium Fashion & Lifestyle',
    description:
      'Discover curated collections of premium fashion and lifestyle products at Muted Age. Minimalist designs, exceptional quality.',
    keywords: [
      'premium fashion',
      'lifestyle brand',
      'minimalist design',
      'curated collections',
    ],
  },
};

export type SiteConfig = typeof siteConfig;

/**
 * Shop configuration
 * Used for managing shop settings, currency, locale, etc.
 */

export const shopConfig = {
  currency: 'USD',
  locale: 'en-US',
  currencySymbol: '$',
  storeName: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || '',
  maxCartItems: 50,
  enableWishlist: true,
  enableSearch: true,
  enableReviews: false,
  enableSubscriptions: false,
} as const;

/**
 * Navigation configuration
 * Used for managing navigation menus in the header and footer
 */

export const navConfig = {
  mainNav: [
    {
      title: 'Shop',
      href: '/products',
    },
    {
      title: 'Collections',
      href: '/collections',
    },
    {
      title: 'About',
      href: '/about',
    },
    {
      title: 'Contact',
      href: '/contact',
    },
  ],
  footerNav: {
    shop: [
      { title: 'All Products', href: '/products' },
      { title: 'Collections', href: '/collections' },
      { title: 'New Arrivals', href: '/collections/new-arrivals' },
      { title: 'Sale', href: '/collections/sale' },
    ],
    help: [
      { title: 'Shipping & Returns', href: '/pages/shipping' },
      { title: 'FAQ', href: '/pages/faq' },
      { title: 'Size Guide', href: '/pages/size-guide' },
      { title: 'Contact Us', href: '/contact' },
    ],
    company: [
      { title: 'About Us', href: '/about' },
      { title: 'Sustainability', href: '/pages/sustainability' },
      { title: 'Careers', href: '/pages/careers' },
    ],
    legal: [
      { title: 'Privacy Policy', href: '/pages/privacy-policy' },
      { title: 'Terms of Service', href: '/pages/terms-of-service' },
      { title: 'Refund Policy', href: '/pages/refund-policy' },
    ],
  },
} as const;
