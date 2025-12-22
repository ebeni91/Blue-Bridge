import { useState } from 'react';
import { ArrowLeft, Star, ShoppingCart, Heart, MapPin, Share2, Truck, ShieldCheck, Leaf } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailsProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onToggleFavorite: (product: Product) => void;
}

// Fallback images map (Same as Card)
const imageMap: Record<number, string> = {
  1: 'https://images.unsplash.com/photo-1700064165267-8fa68ef07167?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHRvbWF0b2VzfGVufDF8fHx8MTc2NTE0NjM0M3ww&ixlib=rb-4.1.0&q=80&w=1080',
  2: 'https://images.unsplash.com/photo-1700241739138-4ec27c548035?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3JuJTIwaGFydmVzdHxlbnwxfHx8fDE3NjUxMTcwMjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
  3: 'https://images.unsplash.com/photo-1663025293688-322e16b6cb66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGVhdCUyMHNlZWRzfGVufDF8fHx8MTc2NTE3Mzc0M3ww&ixlib=rb-4.1.0&q=80&w=1080',
};

export function ProductDetails({ product, onBack, onAddToCart, onToggleFavorite }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'details' | 'reviews'>('description');
  const [selectedImage, setSelectedImage] = useState(0);

  // --- 1. HANDLE BACKEND DATA VS PLACEHOLDERS ---
  const displayImage = product.image_url || imageMap[product.id] || imageMap[1];
  const price = product.listing_price || product.ask_price;
  const rating = 4.8; // Placeholder until backend has ratings
  const reviewCount = 124; // Placeholder
  const location = "Debre Birhan, Ethiopia"; // Placeholder

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= product.quantity) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Navigation Bar */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center justify-between">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors flex items-center gap-2 text-gray-700"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back</span>
        </button>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => onToggleFavorite(product)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-emerald-600"
          >
            <Heart className="w-6 h-6" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600">
            <Share2 className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Left Column: Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 relative">
               <img 
                src={displayImage} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-emerald-600 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
                {product.category}
              </div>
            </div>
          </div>

          {/* Right Column: Product Info */}
          <div>
            <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100">
              <div className="mb-6">
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
                {product.amharic_name && (
                  <p className="text-xl text-emerald-600 font-medium mb-3">{product.amharic_name}</p>
                )}
                
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full border border-yellow-100">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-bold text-gray-900">{rating}</span>
                    <span className="text-gray-500 text-sm">({reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{location}</span>
                  </div>
                  <div className="px-3 py-1 bg-emerald-50 text-emerald-700 text-sm font-bold rounded-full border border-emerald-100">
                    {product.quality} Quality
                  </div>
                </div>
              </div>

              <div className="flex items-end gap-2 mb-8 pb-8 border-b border-gray-100">
                <span className="text-4xl font-bold text-emerald-800">ETB {price.toLocaleString()}</span>
                <span className="text-gray-500 font-medium mb-1.5">/ {product.unit}</span>
                <span className="ml-auto text-sm text-green-600 font-medium bg-green-50 px-3 py-1 rounded-full">
                  {product.quantity} {product.unit} Available
                </span>
              </div>

              {/* Description & Details Tabs */}
              <div className="mb-8">
                <div className="flex gap-6 border-b border-gray-100 mb-4">
                  {['description', 'details'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab as any)}
                      className={`pb-3 font-medium text-sm transition-all relative ${
                        activeTab === tab 
                          ? 'text-emerald-600' 
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      {activeTab === tab && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 rounded-full" />
                      )}
                    </button>
                  ))}
                </div>

                <div className="text-gray-600 leading-relaxed min-h-[100px]">
                  {activeTab === 'description' ? (
                    <p>{product.description}</p>
                  ) : (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-3 rounded-xl">
                        <span className="text-xs text-gray-500 block">Category</span>
                        <span className="font-medium text-gray-900">{product.category}</span>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-xl">
                        <span className="text-xs text-gray-500 block">Unit Type</span>
                        <span className="font-medium text-gray-900">{product.unit}</span>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-xl">
                        <span className="text-xs text-gray-500 block">Grade</span>
                        <span className="font-medium text-gray-900">{product.quality}</span>
                      </div>
                       <div className="bg-gray-50 p-3 rounded-xl">
                        <span className="text-xs text-gray-500 block">Farmer ID</span>
                        <span className="font-medium text-gray-900">FRM-{product.farmer_id}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Add to Cart Section */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-200 sm:w-auto w-full">
                  <button 
                    onClick={() => handleQuantityChange(-1)}
                    className="w-12 h-12 flex items-center justify-center text-gray-600 hover:bg-white hover:shadow-sm rounded-lg transition-all font-bold text-lg disabled:opacity-50"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-bold text-lg text-gray-900">{quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange(1)}
                    className="w-12 h-12 flex items-center justify-center text-gray-600 hover:bg-white hover:shadow-sm rounded-lg transition-all font-bold text-lg disabled:opacity-50"
                    disabled={quantity >= product.quantity}
                  >
                    +
                  </button>
                </div>
                
                <button 
                  onClick={() => onAddToCart(product, quantity)}
                  className="flex-1 bg-black hover:bg-gray-900 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart - ETB {(price * quantity).toLocaleString()}
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-100">
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="p-3 bg-emerald-50 text-emerald-600 rounded-full">
                    <Leaf className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-medium text-gray-600">Organic</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
                    <Truck className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-medium text-gray-600">Fast Delivery</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="p-3 bg-purple-50 text-purple-600 rounded-full">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-medium text-gray-600">Quality Check</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}