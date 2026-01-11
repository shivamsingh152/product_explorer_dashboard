import { Product, Category } from "@/types";

const BASE_URL = "https://fakestoreapi.com";

async function fetchWithRetry(url: string, retries = 5, delay = 1000): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, {
        cache: 'no-store',
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
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
      // Exponential backoff: 1s, 2s, 3s, 4s...
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
      return [];
    }
    return data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return []; // Return empty array to prevent build failure
  }
}

export async function getProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetchWithRetry(`${BASE_URL}/products/${id}`);
    return res.json();
  } catch (error) {
    console.error(`Failed to fetch product ${id}:`, error);
    return null;
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetchWithRetry(`${BASE_URL}/products/categories`);
    const data = await res.json();
    if (!Array.isArray(data)) {
      console.error("API response for categories is not an array:", data);
      return [];
    }
    return data;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return []; // Return empty array to prevent build failure
  }
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  try {
    const res = await fetchWithRetry(`${BASE_URL}/products/category/${category}`);
    const data = await res.json();
    if (!Array.isArray(data)) {
      console.error(`API response for category ${category} is not an array:`, data);
      return [];
    }
    return data;
  } catch (error) {
    console.error(`Failed to fetch products in category ${category}:`, error);
    return []; // Return empty array to prevent build failure
  }
}
