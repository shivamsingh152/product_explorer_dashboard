import { getProducts, getCategories } from "@/lib/api";
import { ProductGrid } from "@/components/products/ProductGrid";

export const revalidate = 3600;

export default async function Home() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  console.log(`Fetched ${products.length} products and ${categories.length} categories`);

  return (
    <main className="container mx-auto px-4 py-8">
      <ProductGrid products={products} categories={categories} />
    </main>
  );
}
