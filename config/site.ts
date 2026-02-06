export const siteConfig = {
  name: 'Muted Age',
  description:
    'Premium fashion and lifestyle brand offering curated collections of minimalist designs and exceptional quality.',
  url:
    process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mutedage.com',
  ogImage: 'https://www.mutedage.com/og-image.jpg',
  links: {
    instagram: 'https://instagram.com/mutedage',
    twitter: 'https://twitter.com/mutedage',
  },
  keywords: [
    'premium fashion',
    'lifestyle brand',
    'minimalist design',
    'curated collections',
    'sustainable fashion',
  ],
  creator: 'Muted Age',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mutedage.com'
  ),
} as const;

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
