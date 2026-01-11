import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct } from "@/lib/api";
import { ArrowLeft } from "lucide-react";
import { AddToFavoritesButton } from "@/components/products/AddToFavoritesButton";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <main className="container relative mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
        <Link
          href="/"
          className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
        {/* Product Image */}
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-xl">
           {/* Image container kept white for product visibility */}
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            {product.category}
          </span>
          <h1 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl leading-tight">
            {product.title}
          </h1>
          
          <div className="mt-6 flex items-center gap-6">
            <p className="text-3xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </p>
            <div className="flex items-center text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1.5 rounded-full border border-gray-200">
              <span className="mr-1.5 text-yellow-500 text-base">★</span>
              {product.rating.rate} <span className="ml-1.5 text-gray-700">({product.rating.count} reviews)</span>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-8">
            <h3 className="text-sm font-semibold text-gray-900">Description</h3>
            <p className="mt-4 text-base text-gray-700 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="mt-10 flex gap-4">
            <button className="flex-1 rounded-xl bg-blue-600 px-8 py-4 text-base font-bold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:ring-offset-2 transition-all shadow-lg hover:shadow-xl">
              Add to Cart
            </button>
            <AddToFavoritesButton 
              productId={product.id} 
              className="rounded-xl border border-gray-200 bg-white/60 backdrop-blur-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all" 
            />
          </div>
        </div>
      </div>
    </main>
  );
}
