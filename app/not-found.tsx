import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <main className="container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
      <div className="rounded-full bg-orange-100 p-4 mb-4">
        <AlertTriangle className="h-10 w-10 text-orange-500" />
      </div>
      <h2 className="text-3xl font-bold text-gray-900 mb-3">
        Page Not Found
      </h2>
      <p className="text-gray-700 mb-8 max-w-md text-lg">
        Could not find the requested resource.
      </p>
      <Link
        href="/"
        className="rounded-xl bg-blue-600 px-8 py-3 text-base font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
      >
        Return Home
      </Link>
    </main>
  );
}
