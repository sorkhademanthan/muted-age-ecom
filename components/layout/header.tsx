'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { MagnifyingGlassIcon, Bars3Icon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { useCartStore } from '@/lib/store/cart-store';
import { useUIStore } from '@/lib/store/ui-store';
import { siteConfig } from '@/config/site';

export function Header() {
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const { getItemCount } = useCartStore();
  const { toggleCart, toggleMobileMenu, setSearchOpen } = useUIStore();
  
  const itemCount = mounted ? getItemCount() : 0;

  // Handle scroll effect
  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80" role="banner">
      <nav className="mx-auto max-w-7xl px-6 lg:px-8" role="navigation" aria-label="Main navigation">
        <div className="flex h-20 items-center justify-between">
          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden -ml-2 p-2 text-gray-700 hover:text-black transition-colors"
            aria-label="Open navigation menu"
            aria-expanded={false}
            type="button"
          >
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>

          {/* Logo */}
          <Link 
            href="/" 
            className="absolute left-1/2 -translate-x-1/2 lg:relative lg:left-auto lg:translate-x-0"
            aria-label={`${siteConfig.name} - Home`}
          >
            <span className="text-2xl font-bold tracking-tighter">
              {siteConfig.name.toUpperCase()}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:gap-10 lg:absolute lg:left-1/2 lg:-translate-x-1/2">
            <Link
              href="/collections/all-products"
              className="text-sm font-medium text-gray-700 hover:text-black transition-colors relative group"
              aria-label="All Products"
            >
              Shop All
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all group-hover:w-full" />
            </Link>
            <Link
              href="/collections/mens"
              className="text-sm font-medium text-gray-700 hover:text-black transition-colors relative group"
              aria-label="Men's Collection"
            >
              Men
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all group-hover:w-full" />
            </Link>
            <Link
              href="/collections/womens"
              className="text-sm font-medium text-gray-700 hover:text-black transition-colors relative group"
              aria-label="Women's Collection"
            >
              Women
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all group-hover:w-full" />
            </Link>
            <Link
              href="/collections/accessories"
              className="text-sm font-medium text-gray-700 hover:text-black transition-colors relative group"
              aria-label="Accessories Collection"
            >
              Accessories
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all group-hover:w-full" />
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-gray-700 hover:text-black transition-colors"
              aria-label="Search products"
              type="button"
            >
              <MagnifyingGlassIcon className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
            </button>

            {/* Cart with Better Badge */}
            <Link 
              href="/cart"
              className="relative p-2 text-gray-700 hover:text-black transition-colors group flex items-center justify-center"
              aria-label={`Shopping cart with ${itemCount} items`}
            >
              <ShoppingBagIcon className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
              {mounted && itemCount > 0 && (
                <span 
                  className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] font-medium text-white animate-fade-in"
                  aria-label={`${itemCount} items in cart`}
                >
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}