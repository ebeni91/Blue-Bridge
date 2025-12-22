import { useState } from 'react';
import { ProductCard } from './ProductCard';
import { Search, Filter } from 'lucide-react';
import { Product } from '../types';

const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Organic Tomatoes',
    amharicName: 'ቲማቲም',
    category: 'Vegetables',
    price: 45,
    unit: 'kg',
    farmer: 'Green Valley Farm',
    location: 'California',
    rating: 4.8,
    reviews: 124,
    image: 'fresh tomatoes',
    inStock: true,
    description: 'Fresh organic tomatoes grown without pesticides. Perfect for salads, sauces, and cooking. Harvested at peak ripeness for maximum flavor and nutrition.',
  },
  {
    id: 2,
    name: 'Fresh Corn',
    amharicName: 'በቆሎ',
    category: 'Vegetables',
    price: 30,
    unit: 'dozen',
    farmer: 'Sunshine Acres',
    location: 'Iowa',
    rating: 4.9,
    reviews: 89,
    image: 'corn harvest',
    inStock: true,
    description: 'Sweet corn picked fresh from the field. Great for grilling, boiling, or making cornbread. Non-GMO and grown with sustainable farming practices.',
  },
  {
    id: 3,
    name: 'Wheat Seeds Premium',
    amharicName: 'የስንዴ ዘር',
    category: 'Seeds',
    price: 120,
    unit: '10kg bag',
    farmer: 'Heritage Seeds Co.',
    location: 'Kansas',
    rating: 4.7,
    reviews: 56,
    image: 'wheat seeds',
    inStock: true,
    description: 'High-quality wheat seeds with excellent germination rate. Suitable for various soil types and climate conditions. Drought-resistant variety.',
  },
  {
    id: 4,
    name: 'Organic Potatoes',
    amharicName: 'ድንች',
    category: 'Vegetables',
    price: 35,
    unit: 'kg',
    farmer: 'Mountain View Farm',
    location: 'Idaho',
    rating: 4.6,
    reviews: 201,
    image: 'fresh potatoes',
    inStock: true,
    description: 'Premium organic potatoes perfect for baking, frying, or mashing. Rich in vitamins and minerals, grown in nutrient-rich soil.',
  },
  {
    id: 5,
    name: 'Free-Range Eggs',
    amharicName: 'እንቁላል',
    category: 'Poultry',
    price: 85,
    unit: 'tray of 30',
    farmer: 'Happy Hen Ranch',
    location: 'Oregon',
    rating: 5.0,
    reviews: 143,
    image: 'farm fresh eggs',
    inStock: true,
    description: 'Farm-fresh eggs from free-range chickens. Rich in omega-3 and protein. Our hens are fed organic feed and allowed to roam freely.',
  },
  {
    id: 6,
    name: 'Organic Carrots',
    amharicName: 'ካሮት',
    category: 'Vegetables',
    price: 40,
    unit: 'kg',
    farmer: 'Rainbow Gardens',
    location: 'Vermont',
    rating: 4.8,
    reviews: 97,
    image: 'fresh carrots',
    inStock: true,
    description: 'Sweet and crunchy organic carrots loaded with beta-carotene. Great for snacking, juicing, or cooking. Freshly harvested and washed.',
  },
  {
    id: 7,
    name: 'Fertilizer Organic Blend',
    amharicName: 'ፈርቲላይዘር',
    category: 'Equipment',
    price: 250,
    unit: '25kg',
    farmer: 'EcoGrow Supplies',
    location: 'Texas',
    rating: 4.5,
    reviews: 78,
    image: 'organic fertilizer',
    inStock: true,
    description: 'All-natural organic fertilizer blend perfect for vegetables, fruits, and crops. Improves soil health and increases yield naturally.',
  },
  {
    id: 8,
    name: 'Fresh Strawberries',
    amharicName: 'እንጆሪ',
    category: 'Fruits',
    price: 95,
    unit: 'kg',
    farmer: 'Berry Bliss Farm',
    location: 'Florida',
    rating: 4.9,
    reviews: 156,
    image: 'fresh strawberries',
    inStock: true,
    description: 'Juicy and sweet strawberries picked at peak ripeness. Perfect for desserts, smoothies, or eating fresh. Grown without harmful chemicals.',
  },
];

interface ProductGridProps {
  onViewDetails: (product: Product) => void;
  onToggleFavorite: (product: Product) => void;
  onAddToCart?: (product: Product, quantity?: number) => void;
  isFavorite: (productId: number) => boolean;
}

export function ProductGrid({ onViewDetails, onToggleFavorite, onAddToCart, isFavorite }: ProductGridProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Vegetables', 'Fruits', 'Seeds', 'Equipment', 'Poultry'];

  const filteredProducts = MOCK_PRODUCTS.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.amharicName.includes(searchTerm) ||
                         product.farmer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      {/* Search and Filter Bar */}
      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600 w-5 h-5" />
          <input
            type="text"
            placeholder="Search for products, farmers, or locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-emerald-200 rounded-xl focus:outline-none focus:border-emerald-500 bg-white"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="w-5 h-5 text-emerald-700" />
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg transition-all ${
                selectedCategory === category
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-emerald-600">No products found matching your criteria</p>
        </div>
      )}
    </div>
  );
}