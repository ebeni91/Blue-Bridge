import { useState, useEffect } from 'react';
import { Filter } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { Product } from '../types';
import client from '../api/client';

interface ProductGridProps {
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleFavorite: (product: Product) => void;
}

export function ProductGrid({ onProductClick, onAddToCart, onToggleFavorite }: ProductGridProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch real data from the Backend
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const response = await client.get('/marketplace/');
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const categories = ['All', 'Grains', 'Vegetables', 'Fruits', 'Coffee', 'Spices'];

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(p => p.category === selectedCategory);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500">Loading Market Data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
        <div className="bg-white p-2 rounded-lg shadow-sm border border-emerald-100">
          <Filter className="w-5 h-5 text-emerald-600" />
        </div>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
              selectedCategory === category
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
                : 'bg-white text-gray-600 hover:bg-emerald-50 border border-transparent hover:border-emerald-100'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
          <p className="text-gray-500">No products found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onClick={onProductClick}          // Opens Product Details
              onAddToCart={onAddToCart}         // Adds to Cart
              onToggleFavorite={onToggleFavorite} // Toggles Favorite
            />
          ))}
        </div>
      )}
    </div>
  );
}