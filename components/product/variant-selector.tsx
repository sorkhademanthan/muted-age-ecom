'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils/cn';
import type { ProductVariant, SelectedOption } from '@/lib/shopify/types';

interface VariantSelectorProps {
  variants: ProductVariant[];
  selectedVariant: ProductVariant | null;
  onVariantChange: (variant: ProductVariant) => void;
}

export function VariantSelector({
  variants,
  selectedVariant,
  onVariantChange,
}: VariantSelectorProps) {
  // Group options by name (e.g., Size, Color)
  const options = variants.reduce((acc, variant) => {
    variant.selectedOptions.forEach((option) => {
      if (!acc[option.name]) {
        acc[option.name] = new Set();
      }
      acc[option.name].add(option.value);
    });
    return acc;
  }, {} as Record<string, Set<string>>);

  const [selections, setSelections] = useState<Record<string, string>>(
    selectedVariant?.selectedOptions.reduce((acc, opt) => {
      acc[opt.name] = opt.value;
      return acc;
    }, {} as Record<string, string>) || {}
  );

  const handleOptionSelect = (optionName: string, value: string) => {
    const newSelections = { ...selections, [optionName]: value };
    setSelections(newSelections);

    // Find matching variant
    const matchingVariant = variants.find((variant) =>
      variant.selectedOptions.every(
        (opt) => newSelections[opt.name] === opt.value
      )
    );

    if (matchingVariant) {
      onVariantChange(matchingVariant);
    }
  };

  return (
    <div className="space-y-6">
      {Object.entries(options).map(([optionName, values]) => (
        <div key={optionName}>
          <label className="block text-sm font-medium text-gray-900 mb-3">
            {optionName}
          </label>
          <div className="flex flex-wrap gap-2">
            {Array.from(values).map((value) => {
              const isSelected = selections[optionName] === value;
              
              // Check if this option is available
              const isAvailable = variants.some(
                (variant) =>
                  variant.availableForSale &&
                  variant.selectedOptions.some(
                    (opt) => opt.name === optionName && opt.value === value
                  )
              );

              return (
                <button
                  key={value}
                  onClick={() => handleOptionSelect(optionName, value)}
                  disabled={!isAvailable}
                  className={cn(
                    'px-4 py-2 text-sm font-medium rounded-lg border-2 transition-colors',
                    isSelected
                      ? 'border-brand-primary bg-brand-primary text-white'
                      : 'border-gray-300 bg-white text-gray-900 hover:border-gray-400',
                    !isAvailable && 'opacity-50 cursor-not-allowed line-through'
                  )}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
