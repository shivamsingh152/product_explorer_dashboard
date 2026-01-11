import { cn } from "@/lib/utils";

export function ProductCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col rounded-2xl border border-gray-200 bg-white/60 backdrop-blur-sm p-4 shadow-sm", className)}>
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-200 animate-pulse" />
      <div className="mt-5 flex flex-1 flex-col space-y-3">
        <div className="h-3 w-1/3 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
        <div className="mt-auto pt-4 flex items-center justify-between">
          <div className="h-6 w-16 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-12 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}
