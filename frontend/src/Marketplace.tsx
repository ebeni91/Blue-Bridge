
import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ProductGrid } from './components/ProductGrid';
import { SwapInterface } from './components/SwapInterface';
import { AiChatBot } from './components/AiChatBot';
import { ProductDetails } from './components/ProductDetails';
import { Favorites } from './components/Favorites';
import { ShoppingCartView } from './components/ShoppingCartView';
import { Checkout } from './components/Checkout';
import { Profile } from './components/Profile';
import { SplashScreen } from './components/SplashScreen';
import { Footer } from './components/Footer';
import { HelpCenter } from './components/HelpCenter';
import { TermsConditions } from './components/TermsConditions';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { ShippingInfo } from './components/ShippingInfo';
import { ReturnPolicy } from './components/ReturnPolicy';
import { MessageSquare } from 'lucide-react';
import { toast, Toaster } from 'sonner@2.0.3';

type View = 'marketplace' | 'swap' | 'chat' | 'product-details' | 'favorites' | 'cart' | 'checkout' | 'profile' | 'help-center' | 'terms' | 'privacy' | 'shipping' | 'return-policy';

export interface Product {
  id: number;
  name: string;
  amharicName: string;
  category: string;
  price: number;
  unit: string;
  farmer: string;
  location: string;
  rating: number;
  reviews: number;
  image: string;
  inStock: boolean;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export default function App() {
  const [currentView, setCurrentView] = useState<View>('marketplace');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        toast.success(`Added ${quantity} more ${product.name} to cart`);
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      toast.success(`${product.name} added to cart`);
      return [...prev, { ...product, quantity }];
    });
  };

  const updateCartQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const toggleFavorite = (product: Product) => {
    setFavorites(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) {
        return prev.filter(p => p.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const isFavorite = (productId: number) => {
    return favorites.some(p => p.id === productId);
  };

  const viewProductDetails = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product-details');
  };

  const handleLogin = (userData: any) => {
    setUser(userData);
    setIsLoggedIn(true);
    setCurrentView('marketplace');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {showSplash && <SplashScreen />}
      
      <Header 
        currentView={currentView} 
        setCurrentView={setCurrentView}
        cartCount={cartItems.length}
        favoritesCount={favorites.length}
        isLoggedIn={isLoggedIn}
        user={user}
      />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {currentView === 'marketplace' && (
          <div>
            <div className="mb-8">
              <h1 className="text-emerald-900 mb-2">Agricultural Marketplace</h1>
              <p className="text-emerald-700">
                Discover fresh produce, seeds, equipment, and more from local farmers
              </p>
            </div>
            <ProductGrid 
              onViewDetails={viewProductDetails}
              onToggleFavorite={toggleFavorite}
              onAddToCart={addToCart}
              isFavorite={isFavorite}
            />
          </div>
        )}

        {currentView === 'product-details' && selectedProduct && (
          <ProductDetails 
            product={selectedProduct}
            onAddToCart={addToCart}
            onToggleFavorite={toggleFavorite}
            isFavorite={isFavorite(selectedProduct.id)}
            onBack={() => setCurrentView('marketplace')}
          />
        )}

        {currentView === 'favorites' && (
          <Favorites 
            favorites={favorites}
            onViewDetails={viewProductDetails}
            onToggleFavorite={toggleFavorite}
            onAddToCart={addToCart}
          />
        )}

        {currentView === 'cart' && (
          <ShoppingCartView 
            cartItems={cartItems}
            onUpdateQuantity={updateCartQuantity}
            onRemoveItem={removeFromCart}
            onCheckout={() => setCurrentView('checkout')}
            onContinueShopping={() => setCurrentView('marketplace')}
          />
        )}

        {currentView === 'checkout' && (
          <Checkout 
            cartItems={cartItems}
            onBack={() => setCurrentView('cart')}
            onOrderComplete={() => {
              setCartItems([]);
              setCurrentView('marketplace');
            }}
          />
        )}

        {currentView === 'swap' && (
          <div>
            <div className="mb-8">
              <h1 className="text-emerald-900">Product Swap</h1>
              <p className="text-emerald-700">
                Exchange your products with others of equivalent value
              </p>
            </div>
            <SwapInterface />
          </div>
        )}

        {currentView === 'chat' && (
          <div>
            <div className="mb-8">
              <h1 className="text-emerald-900">AI Shopping Assistant</h1>
              <p className="text-emerald-700">
                Get personalized recommendations and find exactly what you need
              </p>
            </div>
            <AiChatBot />
          </div>
        )}

        {currentView === 'profile' && (
          <Profile 
            isLoggedIn={isLoggedIn}
            user={user}
            onLogin={handleLogin}
            onLogout={() => {
              setIsLoggedIn(false);
              setUser(null);
              setCurrentView('marketplace');
            }}
          />
        )}

        {currentView === 'help-center' && (
          <HelpCenter onBack={() => setCurrentView('marketplace')} />
        )}

        {currentView === 'terms' && (
          <TermsConditions onBack={() => setCurrentView('marketplace')} />
        )}

        {currentView === 'privacy' && (
          <PrivacyPolicy onBack={() => setCurrentView('marketplace')} />
        )}

        {currentView === 'shipping' && (
          <ShippingInfo onBack={() => setCurrentView('marketplace')} />
        )}

        {currentView === 'return-policy' && (
          <ReturnPolicy onBack={() => setCurrentView('marketplace')} />
        )}
      </main>

      <Footer onNavigate={(view) => setCurrentView(view as View)} />

      {/* Floating AI Assistant Button */}
      {currentView !== 'chat' && (
        <button
          onClick={() => setCurrentView('chat')}
          className="fixed bottom-6 right-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full p-4 shadow-xl transition-all hover:scale-110 z-50"
          title="AI Assistant"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      )}
      
      <Toaster position="top-center" richColors />
    </div>
  );
}