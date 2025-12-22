import { Heart, ShoppingCart, Eye } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Product } from '../types';

interface FavoritesProps {
  favorites: Product[];
  onViewDetails: (product: Product) => void;
  onToggleFavorite: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number) => void;
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

export function Favorites({ favorites, onViewDetails, onToggleFavorite, onAddToCart }: FavoritesProps) {
  if (favorites.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="bg-white rounded-2xl p-12 max-w-md mx-auto border-2 border-emerald-100">
          <Heart className="w-16 h-16 text-emerald-300 mx-auto mb-4" />
          <h2 className="text-emerald-900 mb-2">No favorites yet</h2>
          <p className="text-emerald-600">
            Start adding products to your wishlist by clicking the heart icon on any product
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-emerald-900 mb-2">My Favorites</h1>
        <p className="text-emerald-700">
          {favorites.length} {favorites.length === 1 ? 'item' : 'items'} saved for later
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {favorites.map(product => (
          <div
            key={product.id}
            className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-emerald-100"
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
                <Heart className="w-5 h-5 fill-red-500 text-red-500" />
              </button>
            </div>

            <div className="p-4">
              <h3 className="text-emerald-900 mb-1">{product.name}</h3>
              <p className="text-emerald-600 text-sm mb-3">{product.amharicName}</p>

              <div className="mb-3">
                <span className="text-emerald-900">${product.price}</span>
                <span className="text-emerald-600 text-sm">/{product.unit}</span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => onViewDetails(product)}
                  className="flex-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 px-3 py-2 rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>View</span>
                </button>
                <button
                  onClick={() => onAddToCart(product, 1)}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
