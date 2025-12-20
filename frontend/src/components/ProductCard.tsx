import { ShoppingCart, Star, MapPin, Heart } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Product } from '../App';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  onToggleFavorite: (product: Product) => void;
  onAddToCart?: (product: Product, quantity?: number) => void;
  isFavorite: boolean;
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

export function ProductCard({ product, onViewDetails, onToggleFavorite, onAddToCart, isFavorite }: ProductCardProps) {
  const handleCardClick = (e: React.MouseEvent) => {
    // Don't trigger if clicking on favorite or add to cart button
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    onViewDetails(product);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-emerald-100 cursor-pointer"
    >
      <div className="relative h-48 overflow-hidden bg-emerald-50">
        <ImageWithFallback
          src={imageMap[product.id]}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3 bg-emerald-600 text-white px-3 py-1 rounded-full text-sm">
          {product.category}
        </div>
        <button
          onClick={() => onToggleFavorite(product)}
          className="absolute top-3 right-3 bg-white/90 hover:bg-white p-2 rounded-full transition-all"
        >
          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-emerald-600'}`} />
        </button>
      </div>

      <div className="p-4">
        <h3 className="text-emerald-900 mb-1">{product.name}</h3>
        <p className="text-emerald-600 text-sm mb-2">{product.amharicName}</p>
        
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          <span className="text-emerald-800">{product.rating}</span>
          <span className="text-emerald-600 text-sm">({product.reviews})</span>
        </div>

        <div className="flex items-center gap-1 text-emerald-700 mb-3">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{product.location}</span>
        </div>

        <p className="text-emerald-600 text-sm mb-3">by {product.farmer}</p>

        <div className="flex items-center justify-between pt-3 border-t border-emerald-100">
          <div>
            <span className="text-emerald-900">${product.price}</span>
            <span className="text-emerald-600 text-sm">/{product.unit}</span>
          </div>
          
          {onAddToCart && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product, 1);
              }}
              className="bg-black hover:bg-gray-900 text-white px-4 py-2 rounded-lg transition-all flex items-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Add to Cart</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}