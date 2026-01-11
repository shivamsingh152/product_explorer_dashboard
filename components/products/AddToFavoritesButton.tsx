"use client";

import { useFavorites } from "@/components/providers/FavoritesProvider";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";

interface AddToFavoritesButtonProps {
  productId: number;
  className?: string;
}

export function AddToFavoritesButton({ productId, className }: AddToFavoritesButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(productId);

  return (
    <button
      onClick={() => toggleFavorite(productId)}
      className={cn(
        "flex-1 rounded-xl border border-gray-200 px-8 py-3 text-base font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center gap-2",
        {
          "border-rose-500/50 bg-rose-500/10 text-rose-500 hover:bg-rose-500/20": favorite,
          "border-gray-200 bg-white text-gray-700 hover:bg-gray-50": !favorite && !className, // Only apply light defaults if no className provided
        },
        className
      )}
    >
      <Heart
        className={cn("h-5 w-5 transition-colors", {
          "fill-current": favorite,
        })}
      />
      {favorite ? "Remove from Favorites" : "Add to Favorites"}
    </button>
  );
}
