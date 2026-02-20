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

// --- ROLE-SPECIFIC DASHBOARDS ---
// Ensure these files exist in these folders
import { AgentDashboard } from './components/AgentDashboard';
import { AdminDashboard } from './admin/AdminDashboard'; 
import { SuperAdminDashboard } from './admin/SuperAdminDashboard'; 

import { MessageSquare } from 'lucide-react';
import { toast, Toaster } from 'sonner';
import { View, Product, CartItem } from './types';

export function Marketplace() {
  const [currentView, setCurrentView] = useState<View>('marketplace');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [showSplash, setShowSplash] = useState(true);

  // Splash Screen Timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  // --- SECURITY & ACCESS CONTROL ---
  // This effect watches the currentView and User Role to prevent unauthorized access
  useEffect(() => {
    const role = user?.role;

    // 1. Superadmin Dashboard Security
    if (currentView === 'superadmin-dashboard') {
      if (!isLoggedIn || role !== 'superadmin') {
        toast.error("Access Denied: Superadmins Only");
        setCurrentView('marketplace');
      }
    }
    
    // 2. Admin Dashboard Security
    if (currentView === 'admin-dashboard') {
      if (!isLoggedIn || role !== 'admin') {
        toast.error("Access Denied: Admins Only");
        setCurrentView('marketplace');
      }
    }

    // 3. Agent Dashboard Security
    if (currentView === 'agent-dashboard') {
      if (!isLoggedIn || role !== 'agent') {
        toast.error("Access Denied: Agents Only");
        setCurrentView('marketplace');
      }
    }
  }, [currentView, isLoggedIn, user]);

  // --- CART FUNCTIONS ---
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

  // --- FAVORITE FUNCTION ---
  const toggleFavorite = (product: Product) => {
    setFavorites(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) {
        return prev.filter(p => p.id !== product.id);
      }
      return [...prev, product];
    });
  };

  // --- NAVIGATION HELPERS ---
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
        
        {/* 1. MARKETPLACE GRID (Default View) */}
        {currentView === 'marketplace' && (
          <div>
            <div className="mb-8">
              <h1 className="text-emerald-900 mb-2">Agricultural Marketplace</h1>
              <p className="text-emerald-700">
                Discover fresh produce, seeds, equipment, and more from local farmers
              </p>
            </div>
            <ProductGrid 
               onProductClick={viewProductDetails} 
               onAddToCart={(product) => addToCart(product, 1)}
               onToggleFavorite={toggleFavorite} 
            />
          </div>
        )}

        {/* 2. PRODUCT DETAILS */}
        {currentView === 'product-details' && selectedProduct && (
          <ProductDetails 
            product={selectedProduct}
            onAddToCart={addToCart}
            onToggleFavorite={toggleFavorite}
            onBack={() => setCurrentView('marketplace')}
          />
        )}

        {/* --- DYNAMIC DASHBOARDS --- */}
        
        {/* 3. SUPER ADMIN DASHBOARD */}
        {currentView === 'superadmin-dashboard' && (
          <SuperAdminDashboard user={user} />
        )}

        {/* 4. ADMIN DASHBOARD */}
        {currentView === 'admin-dashboard' && (
          <AdminDashboard user={user} />
        )}

        {/* 5. AGENT DASHBOARD */}
        {currentView === 'agent-dashboard' && (
          <AgentDashboard />
        )}

        {/* 6. PROFILE (Handles Dashboard Navigation) */}
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
            onNavigate={setCurrentView}
          />
        )}

        {/* 7. SHOPPING CART */}
        {currentView === 'cart' && (
          <ShoppingCartView 
            cartItems={cartItems}
            onUpdateQuantity={updateCartQuantity}
            onRemoveItem={removeFromCart}
            onCheckout={() => setCurrentView('checkout')}
            onContinueShopping={() => setCurrentView('marketplace')}
          />
        )}

        {/* 8. CHECKOUT */}
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

        {/* 9. FAVORITES */}
        {currentView === 'favorites' && (
          <Favorites 
            favorites={favorites}
            onViewDetails={viewProductDetails}
            onToggleFavorite={toggleFavorite}
            onAddToCart={(product) => addToCart(product, 1)}
          />
        )}

        {/* 10. UTILITY VIEWS */}
        {currentView === 'swap' && <SwapInterface />}
        {currentView === 'chat' && <AiChatBot />}
        {currentView === 'help-center' && <HelpCenter onBack={() => setCurrentView('marketplace')} />}
        {currentView === 'terms' && <TermsConditions onBack={() => setCurrentView('marketplace')} />}
        {currentView === 'privacy' && <PrivacyPolicy onBack={() => setCurrentView('marketplace')} />}
        {currentView === 'shipping' && <ShippingInfo onBack={() => setCurrentView('marketplace')} />}
        {currentView === 'return-policy' && <ReturnPolicy onBack={() => setCurrentView('marketplace')} />}

      </main>

      <Footer onNavigate={(view) => setCurrentView(view as View)} />

      {/* Floating Chat Button */}
      {currentView !== 'chat' && (
        <button
          onClick={() => setCurrentView('chat')}
          className="fixed bottom-6 right-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full p-4 shadow-xl transition-all hover:scale-110 z-50"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      )}
      
      <Toaster position="top-center" richColors />
    </div>
  );
}