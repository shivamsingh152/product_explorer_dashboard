import { Product, Category } from "@/types";
import fallbackProducts from "./products-data.json";
import fallbackCategories from "./categories-data.json";

const BASE_URL = "https://fakestoreapi.com";

async function fetchWithRetry(url: string, retries = 3, delay = 1000): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, {
        next: { revalidate: 3600 },
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          "Accept": "application/json",
        },
      });
      if (res.ok) {
        return res;
      }
      console.warn(`Request to ${url} failed with status ${res.status}. Retrying (${i + 1}/${retries})...`);
    } catch (error) {
      console.warn(`Request to ${url} failed with error ${error}. Retrying (${i + 1}/${retries})...`);
    }
    if (i < retries - 1) {
      // Exponential backoff: 1s, 2s, 3s...
      await new Promise((resolve) => setTimeout(resolve, delay * (i + 1)));
    }
  }
  throw new Error(`Failed to fetch ${url} after ${retries} retries`);
}

export async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetchWithRetry(`${BASE_URL}/products`);
    const data = await res.json();
    if (!Array.isArray(data)) {
      console.error("API response for products is not an array:", data);
      return fallbackProducts as Product[];
    }
    return data;
  } catch (error) {
    console.error("Failed to fetch products, using fallback:", error);
    return fallbackProducts as Product[];
  }
}

export async function getProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetchWithRetry(`${BASE_URL}/products/${id}`);
    return res.json();
  } catch (error) {
    console.error(`Failed to fetch product ${id}, using fallback:`, error);
    const product = fallbackProducts.find((p) => p.id.toString() === id);
    return (product as Product) || null;
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetchWithRetry(`${BASE_URL}/products/categories`);
    const data = await res.json();
    if (!Array.isArray(data)) {
      console.error("API response for categories is not an array:", data);
      return fallbackCategories as Category[];
    }
    return data;
  } catch (error) {
    console.error("Failed to fetch categories, using fallback:", error);
    return fallbackCategories as Category[];
  }
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  try {
    const res = await fetchWithRetry(`${BASE_URL}/products/category/${category}`);
    const data = await res.json();
    if (!Array.isArray(data)) {
      console.error(`API response for category ${category} is not an array:`, data);
      return (fallbackProducts as Product[]).filter((p) => p.category === category);
    }
    return data;
  } catch (error) {
    console.error(`Failed to fetch products in category ${category}, using fallback:`, error);
    return (fallbackProducts as Product[]).filter((p) => p.category === category);
  }
}
