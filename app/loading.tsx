import { ProductCardSkeleton } from "@/components/products/ProductCardSkeleton";

export default function Loading() {
  return (
    <main className="container mx-auto px-4 py-8">
      <header className="mb-12">
        <div className="h-10 w-64 bg-gray-200 rounded-xl animate-pulse mb-4" />
        <div className="h-6 w-96 bg-gray-200 rounded-xl animate-pulse" />
      </header>
      
      <div className="space-y-6">
        {/* Search and Filters Skeleton */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="h-12 w-full max-w-md bg-gray-200 rounded-xl animate-pulse" />
          <div className="h-12 w-48 bg-gray-200 rounded-xl animate-pulse" />
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </main>
  );
}
