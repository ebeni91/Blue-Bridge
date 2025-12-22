import { ShoppingCart, Star, MapPin, Heart } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;          // Mapped to onViewDetails
  onToggleFavorite: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  isFavorite?: boolean; // Optional for now
}

// Fallback images if the product doesn't have one
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

export function ProductCard({ product, onClick, onToggleFavorite, onAddToCart, isFavorite = false }: ProductCardProps) {
  const handleCardClick = (e: React.MouseEvent) => {
    // Don't trigger if clicking on favorite or add to cart button
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    onClick(product);
  };

  // Backend doesn't have rating/location yet, so we use placeholders to match the design
  const displayRating = 4.8; 
  const displayReviews = 124;
  const displayLocation = "Debre Birhan, ET"; 
  const displayFarmer = "Blue Bridge Farm";
  const displayImage = product.image_url || imageMap[product.id] || imageMap[1];

  return (
    <div 
      onClick={handleCardClick}
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-emerald-100 cursor-pointer flex flex-col h-full"
    >
      <div className="relative h-48 overflow-hidden bg-emerald-50">
        <img
          src={displayImage}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
          {product.category}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(product);
          }}
          className="absolute top-3 right-3 bg-white/90 hover:bg-white p-2 rounded-full transition-all shadow-sm hover:shadow-md"
        >
          <Heart className={`w-5 h-5 transition-colors ${isFavorite ? 'fill-red-500 text-red-500' : 'text-emerald-600'}`} />
        </button>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-emerald-900 font-bold text-lg mb-0.5 line-clamp-1">{product.name}</h3>
        {product.amharic_name && (
            <p className="text-emerald-600 text-xs font-medium mb-2">{product.amharic_name}</p>
        )}
        
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          <span className="text-emerald-800 font-semibold text-sm">{displayRating}</span>
          <span className="text-emerald-600 text-xs">({displayReviews})</span>
        </div>

        <div className="flex items-center gap-1 text-emerald-700 mb-3">
          <MapPin className="w-3.5 h-3.5" />
          <span className="text-xs">{displayLocation}</span>
        </div>

        <p className="text-emerald-600 text-xs mb-4">by <span className="font-semibold">{displayFarmer}</span></p>

        <div className="flex items-center justify-between pt-3 border-t border-emerald-100 mt-auto">
          <div className="flex flex-col">
            <span className="text-emerald-900 font-bold text-lg">ETB {product.listing_price?.toLocaleString() || product.ask_price.toLocaleString()}</span>
            <span className="text-emerald-600 text-xs">/{product.unit}</span>
          </div>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="bg-black hover:bg-gray-900 text-white px-4 py-2.5 rounded-lg transition-all flex items-center gap-2 shadow-lg hover:shadow-xl active:scale-95"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="text-sm font-medium">Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}