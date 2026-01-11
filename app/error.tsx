"use client";

import { useEffect } from "react";
import { AlertCircle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
      <div className="rounded-full bg-red-100 p-4 mb-4">
        <AlertCircle className="h-10 w-10 text-red-500" />
      </div>
      <h2 className="text-3xl font-bold text-gray-900 mb-3">
        Something went wrong!
      </h2>
      <p className="text-gray-700 mb-8 max-w-md text-lg">
        We encountered an error while loading the products. Please try again later.
      </p>
      <button
        onClick={reset}
        className="rounded-xl bg-blue-600 px-8 py-3 text-base font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
      >
        Try again
      </button>
    </main>
  );
}
