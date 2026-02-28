import { apiClient } from '@/lib/api-client';
import Link from 'next/link';

// Fetch data on the server side
async function getProducts() {
  try {
    const res = await fetch('http://backend:8000/api/marketplace/categories/', {
      next: { revalidate: 3600 }
    });
    if (!res.ok) throw new Error('Failed to fetch data');
    return res.json();
  } catch (error) {
    // Silently return empty array during Docker build if backend is unreachable
    console.log("Skipping initial fetch during build phase.");
    return [];
  }
}
export default async function MarketplacePage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-green-800">Cluster Demand Platform</h1>
        <p className="text-gray-600 mt-2">Request bulk agricultural products directly from verified farmers.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {products.map((product: any) => (
          <div key={product.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <h2 className="text-2xl font-semibold text-gray-800">{product.name}</h2>
            <p className="text-gray-500 mt-1">Base Price: {product.base_price_per_kg} Birr / kg</p>
            
            {/* The moment they click this, Next.js will route them to checkout. 
                If they aren't logged in, the system will prompt the OTP pop-up. */}
            <Link 
              href={`/checkout?product=${product.id}`}
              className="mt-4 block text-center w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition"
            >
              Request Order
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}