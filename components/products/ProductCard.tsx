"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { cn } from "@/lib/utils";
import { useFavorites } from "@/components/providers/FavoritesProvider";
import { Heart } from "lucide-react";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(product.id);

  return (
    <div
      className={cn(
        "group relative flex flex-col rounded-2xl border border-gray-200 bg-white/60 backdrop-blur-sm p-4 shadow-lg transition-all hover:shadow-xl hover:bg-white/80 hover:-translate-y-1",
        className
      )}
    >
      <button
        onClick={(e) => {
          e.preventDefault();
          toggleFavorite(product.id);
        }}
        className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:bg-gray-100 transition-colors focus:outline-none border border-gray-200"
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        <Heart
          className={cn("h-4 w-4 transition-colors", {
              "fill-rose-500 text-rose-500": favorite,
              "text-gray-600": !favorite,
            })}
        />
      </button>
      <Link
        href={`/products/${product.id}`}
        className="flex flex-1 flex-col"
      >
        <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-white p-4">
           {/* Image container kept white for product visibility */}
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="mt-5 flex flex-1 flex-col">
          <p className="text-[11px] font-bold text-blue-600 uppercase tracking-wider mb-2">
            {product.category}
          </p>
          <h3 className="text-base font-semibold text-gray-900 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors" title={product.title}>
            {product.title}
          </h3>
          <div className="mt-auto pt-4 flex items-center justify-between">
            <p className="text-xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </p>
              <div className="flex items-center text-xs font-medium text-gray-700 bg-gray-100 px-2.5 py-1 rounded-full border border-gray-200">
              <span className="text-yellow-500 mr-1.5 text-sm">★</span>
              {product.rating.rate} <span className="ml-1 text-gray-700">({product.rating.count})</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
