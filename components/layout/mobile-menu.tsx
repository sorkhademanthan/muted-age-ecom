'use client';

import Link from 'next/link';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useUIStore } from '@/lib/store/ui-store';
import { useEffect } from 'react';

export function MobileMenu() {
  const { isMobileMenuOpen, closeMobileMenu } = useUIStore();

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  if (!isMobileMenuOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-black text-white animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <span className="text-sm font-bold uppercase tracking-widest">Menu</span>
        <button onClick={closeMobileMenu} className="p-2">
          <XMarkIcon className="h-8 w-8 text-white" />
        </button>
      </div>

      {/* Links */}
      <div className="flex flex-col items-center justify-center h-[80vh] space-y-8">
        {['Men', 'Women', 'Accessories', 'New Arrivals'].map((item) => (
          <Link
            key={item}
            href={`/collections/${item.toLowerCase().replace(' ', '-')}`}
            onClick={closeMobileMenu}
            className="text-4xl font-bold uppercase tracking-tighter hover:text-neutral-400 transition-colors"
          >
            {item}
          </Link>
        ))}
        
        <div className="w-12 h-[1px] bg-neutral-800 my-8"></div>

        <Link href="/account" onClick={closeMobileMenu} className="text-sm uppercase tracking-widest text-neutral-400">
          Account
        </Link>
        <Link href="/search" onClick={closeMobileMenu} className="text-sm uppercase tracking-widest text-neutral-400">
          Search
        </Link>
      </div>
    </div>
  );
}