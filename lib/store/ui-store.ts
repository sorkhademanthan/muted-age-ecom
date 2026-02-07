import { create } from 'zustand';

interface UIState {
  // Mobile menu
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (isOpen: boolean) => void;
  toggleMobileMenu: () => void;

  // Cart drawer
  isCartOpen: boolean;
  setCartOpen: (isOpen: boolean) => void;
  toggleCart: () => void;

  // Search modal
  isSearchOpen: boolean;
  setSearchOpen: (isOpen: boolean) => void;
  toggleSearch: () => void;

  // Toast notifications
  toast: {
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
  } | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
  hideToast: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  // Mobile menu state
  isMobileMenuOpen: false,
  setMobileMenuOpen: (isOpen) => set({ isMobileMenuOpen: isOpen }),
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),

  // Cart drawer state
  isCartOpen: false,
  setCartOpen: (isOpen) => set({ isCartOpen: isOpen }),
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

  // Search modal state
  isSearchOpen: false,
  setSearchOpen: (isOpen) => set({ isSearchOpen: isOpen }),
  toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen })),

  // Toast notifications
  toast: null,
  showToast: (message, type = 'info') => {
    set({ toast: { message, type } });
    // Auto-hide after 3 seconds
    setTimeout(() => set({ toast: null }), 3000);
  },
  hideToast: () => set({ toast: null }),
}));
