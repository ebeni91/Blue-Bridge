import { useState } from 'react';
import { ProductCard } from './ProductCard';
import { Product } from '../Marketplace';

const products: Product[] = [
  {
    id: '1',
    name: 'Organic Tomatoes',
    price: 45,
    category: 'Vegetables',
    image: 'https://images.unsplash.com/photo-1748342319942-223b99937d4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBtYXJrZXR8ZW58MXx8fHwxNzY1MTcwNzE5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    unit: 'per kg',
    description: 'Fresh organic tomatoes from local farms',
    inStock: true
  },
  {
    id: '2',
    name: 'Farm Fresh Eggs',
    price: 120,
    category: 'Dairy & Eggs',
    image: 'https://images.unsplash.com/photo-1760562232288-ce6ee2400a0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwZmFybSUyMHByb2R1Y3RzfGVufDF8fHx8MTc2NTE2Mzk0Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    unit: 'per dozen',
    description: 'Free-range organic eggs',
    inStock: true
  },
  {
    id: '3',
    name: 'Premium Rice Seeds',
    price: 350,
    category: 'Seeds',
    image: 'https://images.unsplash.com/photo-1613758235306-69cc0a3f614d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZ3JpY3VsdHVyZSUyMGdyYWlucyUyMHNlZWRzfGVufDF8fHx8MTc2NTE3MzU4M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    unit: 'per kg',
    description: 'High-yield hybrid rice seeds',
    inStock: true
  },
  {
    id: '4',
    name: 'Farming Tools Set',
    price: 2500,
    category: 'Equipment',
    image: 'https://images.unsplash.com/photo-1655980235599-8e3d642e4993?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtaW5nJTIwZXF1aXBtZW50JTIwdG9vbHN8ZW58MXx8fHwxNzY1MTczNTIyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    unit: 'per set',
    description: 'Complete set of essential farming tools',
    inStock: true
  },
  {
    id: '5',
    name: 'Fresh Fruit Mix',
    price: 180,
    category: 'Fruits',
    image: 'https://images.unsplash.com/photo-1603403887668-a23fbcd4d8be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGZydWl0cyUyMGJhc2tldHxlbnwxfHx8fDE3NjUxMjIzMzZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    unit: 'per basket',
    description: 'Seasonal fresh fruits basket',
    inStock: true
  },
  {
    id: '6',
    name: 'Organic Fertilizer',
    price: 450,
    category: 'Fertilizers',
    image: 'https://images.unsplash.com/photo-1590154743804-cf7c51dcbfd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwZmVydGlsaXplciUyMHNvaWx8ZW58MXx8fHwxNzY1MTczNTg0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    unit: 'per 10kg bag',
    description: '100% organic soil fertilizer',
    inStock: true
  },
];

const categories = ['All', 'Vegetables', 'Fruits', 'Seeds', 'Equipment', 'Fertilizers', 'Dairy & Eggs'];

export function ProductList() {
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
      {/* Filters */}
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
          
          <div className="flex items-center space-x-2">
            <span className="text-gray-600">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="name">Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No products found in this category.</p>
        </div>
      )}
    </div>
  );
}
