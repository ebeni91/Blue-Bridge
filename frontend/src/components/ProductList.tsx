import { useState } from 'react';
import { ProductCard } from './ProductCard';
import { Product } from '../types';

// FIXED: IDs are now numbers
const products: Product[] = [
  {
    id: 1,
    name: 'Organic Tomatoes',
    price: 45,
    category: 'Vegetables',
    image: 'https://images.unsplash.com/photo-1748342319942-223b99937d4e',
    unit: 'per kg',
    description: 'Fresh organic tomatoes',
    inStock: true,
    amharicName: 'ቲማቲም',
    rating: 4.5,
    reviews: 12
  },
  {
    id: 2,
    name: 'Farm Fresh Eggs',
    price: 120,
    category: 'Dairy & Eggs',
    image: 'https://images.unsplash.com/photo-1760562232288-ce6ee2400a0c',
    unit: 'per dozen',
    description: 'Free-range organic eggs',
    inStock: true,
    amharicName: 'እንቁላል',
    rating: 4.8,
    reviews: 34
  },
  // Add other products here following the same pattern (id: 3, id: 4, etc.)
];

const categories = ['All', 'Vegetables', 'Fruits', 'Seeds', 'Equipment', 'Fertilizers', 'Dairy & Eggs'];

// FIXED: Interface for Props
interface ProductListProps {
  onViewDetails: (product: Product) => void;
  onToggleFavorite: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  isFavorite: (productId: number) => boolean;
}

// FIXED: Component now accepts props
export function ProductList({ onViewDetails, onToggleFavorite, onAddToCart, isFavorite }: ProductListProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'price-low' | 'price-high' | 'name'>('name');

  const filteredProducts = products
    .filter(product => selectedCategory === 'All' || product.category === selectedCategory)
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return a.name.localeCompare(b.name);
    });

  return (
    <div>
      {/* Filters UI */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedCategory === category
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="name">Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <ProductCard 
            key={product.id} 
            product={product}
            onViewDetails={onViewDetails}
            onToggleFavorite={onToggleFavorite}
            onAddToCart={onAddToCart}
            isFavorite={isFavorite(product.id)}
          />
        ))}
      </div>
    </div>
  );
}