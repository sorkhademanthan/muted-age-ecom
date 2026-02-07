import type { Money } from '@/lib/shopify/types';
import { Badge } from '@/components/ui/badge';

interface PriceDisplayProps {
  price: Money;
  compareAtPrice?: Money;
  size?: 'sm' | 'md' | 'lg';
}

export function PriceDisplay({ price, compareAtPrice, size = 'md' }: PriceDisplayProps) {
  const hasDiscount =
    compareAtPrice && parseFloat(compareAtPrice.amount) > parseFloat(price.amount);

  const discount = hasDiscount
    ? Math.round(
        ((parseFloat(compareAtPrice.amount) - parseFloat(price.amount)) /
          parseFloat(compareAtPrice.amount)) *
          100
      )
    : 0;

  const sizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-3xl',
  };

  return (
    <div className="flex items-center gap-3">
      <span className={`${sizes[size]} font-bold text-gray-900`}>
        ${parseFloat(price.amount).toFixed(2)} {price.currencyCode}
      </span>

      {hasDiscount && (
        <>
          <span className="text-base text-gray-500 line-through">
            ${parseFloat(compareAtPrice.amount).toFixed(2)}
          </span>
          <Badge variant="success">Save {discount}%</Badge>
        </>
      )}
    </div>
  );
}
