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
    <header 
      className={`
        fixed top-0 z-50 w-full transition-all duration-500 ease-in-out
        ${isScrolled 
          ? 'bg-white/90 backdrop-blur-md border-b border-neutral-100 py-4' 
          : 'bg-transparent py-6'}
      `}
    >
      <nav className="mx-auto max-w-[1800px] px-6 md:px-12">
        <div className="flex items-center justify-between">
          
          {/* LEFT: Mobile Menu & Search */}
          <div className="flex items-center gap-6 flex-1">
            {/* Mobile Menu Trigger */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden -ml-2 p-2 text-black hover:opacity-60 transition-opacity"
              aria-label="Toggle menu"
            >
              <Bars3Icon className="h-6 w-6" strokeWidth={1} />
            </button>

            {/* Desktop Search Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden lg:flex items-center gap-2 group"
              aria-label="Search"
            >
              <MagnifyingGlassIcon className="h-5 w-5 group-hover:opacity-50 transition-opacity" strokeWidth={1.5} />
              <span className="text-[10px] uppercase tracking-widest font-bold group-hover:opacity-50 transition-opacity">
                Search
              </span>
            </button>
            
            {/* Desktop Left Nav (Hidden on Mobile) */}
            <div className="hidden lg:flex gap-8 ml-8">
              {['Men', 'Women', 'Accessories'].map((item) => (
                <Link
                  key={item}
                  href={`/collections/${item.toLowerCase()}`}
                  className="text-[10px] uppercase tracking-[0.2em] font-bold hover:text-neutral-500 transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* CENTER: Logo */}
          <div className="flex-0 text-center">
            <Link href="/" className="block">
              <span className={`
                font-bold tracking-tighter uppercase transition-all duration-500
                ${isScrolled ? 'text-2xl' : 'text-3xl md:text-4xl'}
              `}>
                {siteConfig.name}
              </span>
            </Link>
          </div>

          {/* RIGHT: Cart & Actions */}
          <div className="flex items-center justify-end gap-6 flex-1">
            {/* Login (Optional - can add later) */}
            <Link 
              href="/account" 
              className="hidden lg:block text-[10px] uppercase tracking-widest font-bold hover:text-neutral-500 transition-colors"
            >
              Account
            </Link>

            {/* Cart - Now links to /cart page */}
            <Link 
              href="/cart"
              className="relative p-2 text-gray-700 hover:text-black transition-colors group flex items-center justify-center"
              aria-label="Shopping cart"
            >
              <ShoppingBagIcon className="h-6 w-6" strokeWidth={1.5} />
              {mounted && itemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] font-medium text-white">
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:gap-10 lg:absolute lg:left-1/2 lg:-translate-x-1/2">
            <Link
              href="/collections/all-products"
              className="text-sm font-medium text-gray-700 hover:text-black transition-colors relative group"
            >
              Shop All
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all group-hover:w-full" />
            </Link>
            <Link
              href="/collections/mens"
              className="text-sm font-medium text-gray-700 hover:text-black transition-colors relative group"
            >
              Men
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all group-hover:w-full" />
            </Link>
            <Link
              href="/collections/womens"
              className="text-sm font-medium text-gray-700 hover:text-black transition-colors relative group"
            >
              Women
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all group-hover:w-full" />
            </Link>
            <Link
              href="/collections/accessories"
              className="text-sm font-medium text-gray-700 hover:text-black transition-colors relative group"
            >
              Accessories
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all group-hover:w-full" />
            </Link>
          </div>

        </div>
      </nav>
    </header>
  );
}