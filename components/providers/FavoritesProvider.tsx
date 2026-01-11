"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface FavoritesContextType {
  favorites: number[];
  toggleFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Use setTimeout to avoid synchronous state update warning and hydration mismatch
    setTimeout(() => {
      const saved = localStorage.getItem("favorites");
      if (saved) {
        try {
          setFavorites(JSON.parse(saved));
        } catch (e) {
          console.error("Failed to parse favorites", e);
        }
      }
      setIsInitialized(true);
    }, 0);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites, isInitialized]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => {
      if (prev.includes(id)) {
        return prev.filter((favId) => favId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const isFavorite = (id: number) => favorites.includes(id);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
