import { ShoppingCart, Heart, User, Repeat2, Home, Sprout } from 'lucide-react';
import { View } from '../types'; // <--- IMPORT SHARED TYPE

interface HeaderProps {
  currentView: View;
  setCurrentView: (view: View) => void;
  cartCount: number;
  favoritesCount: number;
  isLoggedIn: boolean;
  user: any;
}

export function Header({ currentView, setCurrentView, cartCount, favoritesCount }: HeaderProps) {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-emerald-100 sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-emerald-600 to-teal-600 p-2 rounded-xl shadow-lg">
              <Sprout className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-green-700">Blue Bridge</h2>
              <p className="text-sm text-green-500">Farm to Table Direct</p>
            </div>
          </div>

          <nav className="flex items-center gap-2">
            {/* The error was here because 'marketplace' was missing from the Type */}
            {currentView !== 'marketplace' && (
              <button
                onClick={() => setCurrentView('marketplace')}
                className="p-3 rounded-lg transition-all text-emerald-600 hover:bg-emerald-50"
                title="Home"
              >
                <Home className="w-5 h-5" />
              </button>
            )}

            <button
              onClick={() => setCurrentView('swap')}
              className={`p-3 rounded-lg transition-all ${
                currentView === 'swap'
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'text-emerald-600 hover:bg-emerald-50'
              }`}
              title="Swap Products"
            >
              <Repeat2 className="w-5 h-5" />
            </button>

            <button
              onClick={() => setCurrentView('favorites')}
              className={`relative p-3 rounded-lg transition-all ${
                currentView === 'favorites'
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'text-emerald-600 hover:bg-emerald-50'
              }`}
              title="Favorites"
            >
              <Heart className={`w-5 h-5 ${favoritesCount > 0 ? 'fill-red-500 text-red-500' : ''}`} />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setCurrentView('cart')}
              className={`relative p-3 rounded-lg transition-all ${
                currentView === 'cart'
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'text-emerald-600 hover:bg-emerald-50'
              }`}
              title="Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setCurrentView('profile')}
              className={`p-3 rounded-lg transition-all ${
                currentView === 'profile'
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'text-emerald-600 hover:bg-emerald-50'
              }`}
              title="Profile"
            >
              <User className="w-5 h-5" />
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}