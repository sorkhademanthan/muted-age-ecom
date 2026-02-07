import { cn } from '@/lib/utils/cn';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-gray-200',
        className
      )}
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="space-y-4">
      {/* Image skeleton */}
      <Skeleton className="aspect-[3/4] w-full rounded-xl" />
      
      {/* Title skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      
      {/* Price skeleton */}
      <Skeleton className="h-6 w-1/4" />
      
      {/* Button skeleton */}
      <Skeleton className="h-11 w-full rounded-lg" />
    </div>
  );
}

export function ProductGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
