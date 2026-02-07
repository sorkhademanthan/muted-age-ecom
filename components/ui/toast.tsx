'use client';

import { useEffect } from 'react';
import { useUIStore } from '@/lib/store/ui-store';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils/cn';

export function ToastContainer() {
  const { toast, hideToast } = useUIStore();

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        hideToast();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast, hideToast]);

  if (!toast) return null;

  const variants = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  };

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-down">
      <div
        className={cn(
          'flex items-center gap-3 rounded-lg border p-4 shadow-lg min-w-[300px]',
          variants[toast.type]
        )}
      >
        <p className="flex-1 text-sm font-medium">{toast.message}</p>
        <button
          onClick={hideToast}
          className="text-current hover:opacity-70 transition-opacity"
          aria-label="Close notification"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
