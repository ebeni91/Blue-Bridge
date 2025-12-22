import { useState } from 'react';
import { ArrowLeft, Heart, ShoppingCart, Star, MapPin, Minus, Plus } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Product } from '../types';

interface ProductDetailsProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
  onToggleFavorite: (product: Product) => void;
  isFavorite: boolean;
  onBack: () => void;
}

const imageMap: Record<number, string> = {
  1: 'https://images.unsplash.com/photo-1700064165267-8fa68ef07167?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHRvbWF0b2VzfGVufDF8fHx8MTc2NTE0NjM0M3ww&ixlib=rb-4.1.0&q=80&w=1080',
  2: 'https://images.unsplash.com/photo-1700241739138-4ec27c548035?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3JuJTIwaGFydmVzdHxlbnwxfHx8fDE3NjUxMTcwMjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
  3: 'https://images.unsplash.com/photo-1663025293688-322e16b6cb66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGVhdCUyMHNlZWRzfGVufDF8fHx8MTc2NTE3Mzc0M3ww&ixlib=rb-4.1.0&q=80&w=1080',
  4: 'https://images.unsplash.com/photo-1747503331142-27f458a1498c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBvdGF0b2VzfGVufDF8fHx8MTc2NTE3Mzc0M3ww&ixlib=rb-4.1.0&q=80&w=1080',
  5: 'https://images.unsplash.com/photo-1585355611468-3c418173f128?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtJTIwZnJlc2glMjBlZ2dzfGVufDF8fHx8MTc2NTExMzM5NHww&ixlib=rb-4.1.0&q=80&w=1080',
  6: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGNhcnJvdHN8ZW58MXx8fHwxNzY1MTA2NjI5fDA&ixlib=rb-4.1.0&q=80&w=1080',
  7: 'https://images.unsplash.com/photo-1648127025799-270266974328?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwZmVydGlsaXplcnxlbnwxfHx8fDE3NjUxNzM3NDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
  8: 'https://images.unsplash.com/photo-1710528184650-fc75ae862c13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHN0cmF3YmVycmllc3xlbnwxfHx8fDE3NjUxMzk0MjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
};

export function ProductDetails({ product, onAddToCart, onToggleFavorite, isFavorite, onBack }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);
  const [showAddedMessage, setShowAddedMessage] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    setShowAddedMessage(true);
    setTimeout(() => setShowAddedMessage(false), 2000);
  };

  return (
    <div>
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-emerald-700 hover:text-emerald-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to products</span>
      </button>

      <div className="bg-white rounded-2xl shadow-lg border-2 border-emerald-100 overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 p-8">
          {/* Product Image */}
          <div className="relative">
            <ImageWithFallback
              src={imageMap[product.id]}
              alt={product.name}
              className="w-full h-96 object-cover rounded-xl"
            />
            <button
              onClick={() => onToggleFavorite(product)}
              className="absolute top-4 right-4 bg-white/90 hover:bg-white p-3 rounded-full transition-all shadow-lg"
            >
              <Heart className={`w-6 h-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-emerald-600'}`} />
            </button>
            <div className="absolute top-4 left-4 bg-emerald-600 text-white px-4 py-2 rounded-full">
              {product.category}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <h1 className="text-emerald-900 mb-2">{product.name}</h1>
            <h2 className="text-emerald-700 mb-4">{product.amharicName}</h2>

            {/* Rating */}
           // Find this block in ProductDetails.tsx and update:
<div className="flex items-center gap-1">
  {[...Array(5)].map((_, i) => (
    <Star
      key={i}
      className={`w-5 h-5 ${
        // FIX: Add "|| 0" to handle undefined rating
        i < Math.floor(product.rating || 0) 
          ? 'text-yellow-500 fill-yellow-500'
          : 'text-gray-300'
      }`}
    />
  ))}
</div>
<span className="text-emerald-800">{product.rating || 0}</span>
<span className="text-emerald-600">({product.reviews || 0} reviews)</span>

            {/* Seller Info */}
            <div className="bg-emerald-50 rounded-xl p-4 mb-6">
              <p className="text-emerald-600 text-sm mb-1">Sold by</p>
              <p className="text-emerald-900">{product.farmer}</p>
              <div className="flex items-center gap-1 text-emerald-700 mt-1">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{product.location}</span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-emerald-900 mb-2">Description</h3>
              <p className="text-emerald-700">{product.description}</p>
            </div>

            {/* Stock Status */}
            {product.inStock ? (
              <div className="text-emerald-600 mb-6 flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                <span>In Stock</span>
              </div>
            ) : (
              <div className="text-red-600 mb-6 flex items-center gap-2">
                <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                <span>Out of Stock</span>
              </div>
            )}

            {/* Price */}
            <div className="mb-6">
              <span className="text-emerald-900">${product.price}</span>
              <span className="text-emerald-600"> per {product.unit}</span>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="text-emerald-900 mb-2 block">Quantity</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="bg-emerald-100 hover:bg-emerald-200 text-emerald-700 p-2 rounded-lg transition-all"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-20 text-center border-2 border-emerald-200 rounded-lg py-2 focus:outline-none focus:border-emerald-500"
                  min="1"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="bg-emerald-100 hover:bg-emerald-200 text-emerald-700 p-2 rounded-lg transition-all"
                >
                  <Plus className="w-5 h-5" />
                </button>
                <span className="text-emerald-700">{product.unit}</span>
              </div>
            </div>

            {/* Total */}
            <div className="mb-6 p-4 bg-emerald-50 rounded-xl">
              <div className="flex justify-between items-center">
                <span className="text-emerald-700">Total:</span>
                <span className="text-emerald-900">${(product.price * quantity).toFixed(2)}</span>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white py-4 rounded-xl transition-all flex items-center justify-center gap-3"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Add to Cart</span>
            </button>

            {showAddedMessage && (
              <div className="mt-4 bg-emerald-100 text-emerald-800 p-3 rounded-lg text-center">
                Added to cart successfully!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
