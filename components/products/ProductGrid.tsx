"use client";

import { useState, useMemo } from "react";
import { Product, Category } from "@/types";
import { ProductCard } from "./ProductCard";
import { Search, ChevronLeft, ChevronRight, ArrowUpDown } from "lucide-react";
import { useFavorites } from "@/components/providers/FavoritesProvider";

interface ProductGridProps {
  products: Product[];
  categories: Category[];
}

type SortOption = "price-asc" | "price-desc" | "rating" | "default";

export function ProductGrid({ products = [], categories = [] }: ProductGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  
  const { isFavorite } = useFavorites();

  const filteredAndSortedProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      const matchesFavorites = !showFavoritesOnly || isFavorite(product.id);
      
      return matchesSearch && matchesCategory && matchesFavorites;
    });

    // Sorting
    if (sortBy === "price-asc") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result = [...result].sort((a, b) => b.rating.rate - a.rating.rate);
    }

    return result;
  }, [products, searchQuery, selectedCategory, showFavoritesOnly, isFavorite, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);
  const paginatedProducts = filteredAndSortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <header>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl mb-4 transition-colors">
            Product Explorer Dashboard
          </h1>
        </header>

        {/* Controls (Top Right) */}
        <div className="flex flex-col sm:flex-row gap-4 lg:items-center">
          <div className="flex items-center gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
                className="rounded-xl border border-gray-200 bg-white/60 backdrop-blur-sm py-3 pl-3 pr-8 text-sm text-gray-900 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer transition-all min-w-40"
              >
                <option value="all" className="bg-white">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category} className="bg-white">
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>

              <label className="flex items-center gap-2 text-sm text-gray-800 cursor-pointer select-none hover:text-gray-900 transition-colors bg-white/60 backdrop-blur-sm border border-gray-200 rounded-xl px-4 py-3 h-11.5">
                <input
                  type="checkbox"
                  checked={showFavoritesOnly}
                  onChange={(e) => {
                    setShowFavoritesOnly(e.target.checked);
                    setCurrentPage(1);
                  }}
                  className="h-4 w-4 rounded border-gray-300 bg-white text-blue-500 focus:ring-blue-500/20 focus:ring-offset-0"
                />
                <span className="whitespace-nowrap">Favorites</span>
              </label>
          </div>
        </div>
      </div>

      {/* Search and Sort Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
        <div className="relative w-full max-w-2xl">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-600" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm py-4 pl-12 pr-6 text-base text-gray-900 placeholder:text-gray-600 focus:border-blue-500/50 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all shadow-lg hover:shadow-blue-500/5"
          />
        </div>
        
        <div className="relative min-w-45">
           <ArrowUpDown className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-600" />
           <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value as SortOption);
                setCurrentPage(1);
              }}
              className="w-full rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm py-4 pl-10 pr-8 text-base text-gray-900 focus:border-blue-500/50 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all shadow-lg hover:shadow-blue-500/5 cursor-pointer appearance-none"
            >
              <option value="default" className="bg-white">Sort by: Featured</option>
              <option value="price-asc" className="bg-white">Price: Low to High</option>
              <option value="price-desc" className="bg-white">Price: High to Low</option>
              <option value="rating" className="bg-white">Highest Rated</option>
            </select>
        </div>
      </div>

      {/* Product Grid */}
      {paginatedProducts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          {/* Pagination Controls */}
          {totalPages > 1 && (
             <div className="flex justify-center items-center gap-4 mt-12">
               <button
                 onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                 disabled={currentPage === 1}
                 className="p-2 rounded-xl border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
               >
                 <ChevronLeft className="h-5 w-5" />
               </button>
               
               <span className="text-sm font-medium text-gray-700">
                 Page {currentPage} of {totalPages}
               </span>
               
               <button
                 onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                 disabled={currentPage === totalPages}
                 className="p-2 rounded-xl border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
               >
                 <ChevronRight className="h-5 w-5" />
               </button>
             </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-lg font-medium text-gray-900">No products found</p>
          <p className="text-sm text-gray-700 mt-1">
            {showFavoritesOnly 
              ? "You haven't added any favorites yet." 
              : "Try adjusting your search or filter to find what you're looking for."}
          </p>
        </div>
      )}
    </div>
  );
}
