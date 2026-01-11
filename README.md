# Product Explorer Dashboard

A modern, responsive product dashboard built with Next.js 16, TypeScript, and Tailwind CSS.

## Features

- **Product Listing**: Browse a curated list of products fetched from FakeStoreAPI.
- **Search & Filter**: Real-time search by name, filter by category, and view favorites.
- **Sorting**: Sort products by price (low/high) or rating.
- **Pagination**: Navigate through products with client-side pagination.
- **Product Details**: Detailed view with product description, rating, and add-to-cart action.
- **Favorites**: persistent favorites list using localStorage.
- **Responsive Design**: Optimized for mobile, tablet, and desktop.
- **Glassmorphism UI**: Modern UI with translucent backgrounds and blur effects.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: React Context (Favorites) + Local State

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Project Structure

- `app/`: Next.js App Router pages and layouts.
- `components/`: Reusable UI components (ProductCard, etc.).
- `lib/`: Utility functions and API clients.
- `types/`: TypeScript interfaces.

## License

MIT
