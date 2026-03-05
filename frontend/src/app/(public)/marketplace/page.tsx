'use client';
import { useEffect } from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { 
  Leaf, 
  Search, 
  MapPin, 
  Star, 
  ShoppingCart, 
  Sun, 
  Wheat, 
  X, 
  ArrowRight,
  ShieldCheck,
  Plus,
  User,
  LogOut,
  LayoutDashboard
} from 'lucide-react';

// Define our types
type Product = {
  id: string;
  name: string;
  type: string;
  region: string;
  season: string;
  pricePerKg: number;
  minOrderKg: number;
  rating: number;
  availableTonnage: string;
};

type CartItem = {
  product: Product;
  quantityKg: number;
};

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  // NEW STATE: Check if logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [profileData, setProfileData] = useState<any>(null);
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const role = localStorage.getItem('userRole');
    
    // Only recognize the session for checkout if they are a BUYER
    if (token && role === 'BUYER') {
      setIsLoggedIn(true);
      // FETCH PROFILE DATA FOR THE DROPDOWN
      fetch('http://localhost:8000/api/core/buyer/dashboard/', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(data => setProfileData(data))
      .catch(err => console.error("Failed to load profile for navbar", err));
    }
  }, []);

  // NEW LOGOUT FUNCTION
  const handleLogout = () => {
    localStorage.clear();
    document.cookie.split(";").forEach((c) => { 
      document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
    });
    setIsLoggedIn(false);
    setIsProfileOpen(false);
  };

  // Mock Data: Platform-listed commodities
  const products: Product[] = [
    { id: 'PRD-001', name: 'Premium White Teff (Magna)', type: 'Teff', region: 'East Shewa, Oromia', season: 'Meher (Main Harvest)', pricePerKg: 120, minOrderKg: 500, rating: 4.9, availableTonnage: '45 Tons' },
    { id: 'PRD-002', name: 'Mixed Teff (Sergegna)', type: 'Teff', region: 'West Gojjam, Amhara', season: 'Meher (Main Harvest)', pricePerKg: 105, minOrderKg: 1000, rating: 4.8, availableTonnage: '120 Tons' },
    { id: 'PRD-003', name: 'High-Yield Wheat', type: 'Wheat', region: 'Bale, Oromia', season: 'Belg (Short Harvest)', pricePerKg: 65, minOrderKg: 2000, rating: 4.7, availableTonnage: '300 Tons' },
    { id: 'PRD-004', name: 'Organic Red Teff', type: 'Teff', region: 'North Shewa, Oromia', season: 'Meher (Main Harvest)', pricePerKg: 95, minOrderKg: 200, rating: 4.9, availableTonnage: '15 Tons' },
    { id: 'PRD-005', name: 'White Maize', type: 'Maize', region: 'Jimma, Oromia', season: 'Meher (Main Harvest)', pricePerKg: 45, minOrderKg: 5000, rating: 4.6, availableTonnage: '500 Tons' },
    { id: 'PRD-006', name: 'Export-Grade Sesame', type: 'Oilseed', region: 'Humera, Tigray', season: 'Meher (Main Harvest)', pricePerKg: 250, minOrderKg: 1000, rating: 4.9, availableTonnage: '80 Tons' },
  ];

  const handleAddToCart = (product: Product) => {
    // Check if already in cart
    if (cart.find(item => item.product.id === product.id)) {
      setIsCartOpen(true);
      return;
    }
    setCart([...cart, { product, quantityKg: product.minOrderKg }]);
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, newQty: number) => {
    setCart(cart.map(item => item.product.id === id ? { ...item, quantityKg: newQty } : item));
  };

  const removeCartItem = (id: string) => {
    setCart(cart.filter(item => item.product.id !== id));
  };

 const handleCheckout = () => {
    setIsCartOpen(false);
    if (isLoggedIn) {
      // If they are logged in, route them straight to the dashboard to complete the order!
      window.location.href = '/buyer/dashboard'; 
    } else {
      // If not logged in, show the Auth Gate popup
      setIsAuthModalOpen(true); 
    }
  };

  const cartTotal = cart.reduce((total, item) => total + (item.product.pricePerKg * item.quantityKg), 0);

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-24 relative">
      
      {/* --- MARKETPLACE NAVBAR --- */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <Link href="/" className="flex items-center gap-3">
              <div className="h-10 w-10 bg-green-600 rounded-xl flex items-center justify-center shadow-lg transform rotate-3">
                <Leaf className="h-6 w-6 text-white -rotate-3" />
              </div>
              <span className="text-2xl font-extrabold text-gray-900 tracking-tight">
                Blue<span className="text-green-600">Bridge</span>
              </span>
            </Link>

            {/* Cart Button
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-3 bg-gray-50 rounded-full hover:bg-green-50 transition-colors text-gray-700 hover:text-green-700 border border-gray-200 hover:border-green-200"
            >
              <ShoppingCart className="h-6 w-6" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs font-bold h-5 w-5 flex items-center justify-center rounded-full shadow-sm">
                  {cart.length}
                </span>
              )}
            </button> */}


{/* Profile & Cart Buttons */}
            <div className="flex items-center space-x-3">
              {isLoggedIn ? (
                <div className="relative">
                  <button 
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="h-11 w-11 bg-green-50 border border-green-200 rounded-full flex items-center justify-center text-green-700 hover:bg-green-600 hover:text-white hover:border-green-600 transition-all shadow-sm group"
                  >
                    <User className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  </button>

                  {/* --- POP-UP PROFILE MENU --- */}
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                      <div className="p-4 border-b border-gray-50 bg-gray-50/50">
                        {/* DYNAMIC NAMES ADDED HERE */}
                        <p className="text-sm font-bold text-gray-900 truncate">
                          {profileData ? profileData.company_name : 'Verified Buyer'}
                        </p>
                        <p className="text-xs font-medium text-gray-500 truncate">
                          {profileData ? profileData.full_name : 'Manage your supply chain'}
                        </p>
                      </div>
                      <div className="p-2">
                        <Link 
                          href="/buyer/dashboard" 
                          target="_blank"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center px-4 py-3 text-sm font-bold text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-xl transition-colors"
                        >
                          <LayoutDashboard className="h-4 w-4 mr-3" />
                          Command Center
                        </Link>
                        <button 
                          onClick={handleLogout}
                          className="w-full flex items-center px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                        >
                          <LogOut className="h-4 w-4 mr-3" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link href="/login" className="hidden sm:flex px-4 py-2 text-sm font-bold text-gray-600 hover:text-green-600 transition-colors">
                  Sign In
                </Link>
              )}

              {/* Existing Cart Button */}
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative h-11 w-11 flex items-center justify-center bg-gray-50 rounded-full hover:bg-green-50 transition-colors text-gray-700 hover:text-green-700 border border-gray-200 hover:border-green-200"
              >
                <ShoppingCart className="h-5 w-5" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs font-bold h-5 w-5 flex items-center justify-center rounded-full shadow-sm">
                    {cart.length}
                  </span>
                )}
              </button>
            </div>






            
          </div>
        </div>
      </nav>

      {/* --- HEADER & FILTERS --- */}
      <div className="bg-white border-b border-gray-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Commodity Exchange</h1>
          <p className="text-gray-500 mb-8">Browse verified agricultural products and submit bulk supply requests.</p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all sm:text-sm font-medium"
                placeholder="Search commodities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Category Pills */}
            <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
              {['All', 'Teff', 'Wheat', 'Maize', 'Oilseeds'].map(cat => (
                <button key={cat} className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${cat === 'All' ? 'bg-green-600 text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-200 hover:border-green-600 hover:text-green-600'}`}>
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- PRODUCT GRID --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group overflow-hidden flex flex-col">
              
              {/* Image Header with Leaf Watermark */}
              <div className="h-56 bg-gradient-to-br from-green-50 to-emerald-100 relative p-5 flex flex-col justify-between overflow-hidden">
                <div className="flex justify-between items-start relative z-10">
                  <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-green-800 text-xs font-bold rounded-lg shadow-sm flex items-center">
                    <ShieldCheck className="h-3 w-3 mr-1" /> Verified Supply
                  </span>
                  <div className="flex items-center bg-white/90 backdrop-blur-sm px-2 py-1.5 rounded-lg shadow-sm">
                    <Star className="h-3 w-3 text-yellow-500 fill-current mr-1" />
                    <span className="text-xs font-bold text-gray-700">{product.rating}</span>
                  </div>
                </div>
                
                {/* The Signature Watermark */}
                <Leaf className="h-32 w-32 text-green-600 opacity-[0.08] absolute -bottom-8 -right-8 transform -rotate-12 group-hover:scale-125 transition-transform duration-700" />
                
                {/* Product Type Tag */}
                <div className="relative z-10">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-green-800/10 text-green-800 border border-green-800/20">
                    <Wheat className="h-3 w-3 mr-1" /> {product.type}
                  </span>
                </div>
              </div>

              {/* Product Details */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900 leading-tight pr-4">{product.name}</h3>
                </div>
                
                <div className="space-y-2 mt-2 mb-6">
                  <div className="flex items-center text-gray-500 text-sm font-medium">
                    <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                    {product.region}
                  </div>
                  <div className="flex items-center text-gray-500 text-sm font-medium">
                    <Sun className="h-4 w-4 mr-2 text-yellow-500" />
                    {product.season}
                  </div>
                </div>
                
                {/* Price & Action Footer */}
                <div className="mt-auto pt-4 border-t border-gray-100">
                  <div className="flex justify-between items-end mb-4">
                    <div>
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Price per Kg</p>
                      <p className="text-2xl font-extrabold text-green-700">{product.pricePerKg} <span className="text-sm text-gray-500 font-medium">ETB</span></p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Min Order</p>
                      <p className="text-sm font-bold text-gray-900">{product.minOrderKg} kg</p>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className="w-full py-3.5 bg-gray-900 text-white font-bold rounded-xl hover:bg-green-600 transition-colors flex items-center justify-center shadow-sm"
                  >
                    <Plus className="h-5 w-5 mr-2" /> Add to Request
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- CART DRAWER OVERLAY --- */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
          
          {/* Drawer */}
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="px-6 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-xl font-extrabold text-gray-900 flex items-center">
                <ShoppingCart className="h-5 w-5 mr-2 text-green-600" />
                Supply Request List
              </h2>
              <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-200 rounded-full text-gray-500 transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="text-center text-gray-500 mt-20">
                  <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p className="font-medium">Your request list is empty.</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.product.id} className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm relative">
                    <button onClick={() => removeCartItem(item.product.id)} className="absolute top-3 right-3 text-gray-400 hover:text-red-500">
                      <X className="h-4 w-4" />
                    </button>
                    <h4 className="font-bold text-gray-900 pr-6">{item.product.name}</h4>
                    <p className="text-xs font-medium text-gray-500 mb-3">{item.product.pricePerKg} ETB / kg</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Quantity (Kg)</label>
                        <input 
                          type="number" 
                          min={item.product.minOrderKg}
                          step={100}
                          className="w-24 px-2 py-1.5 border border-gray-300 rounded-lg text-sm font-bold focus:ring-green-500 focus:border-green-500"
                          value={item.quantityKg}
                          onChange={(e) => updateQuantity(item.product.id, parseInt(e.target.value) || item.product.minOrderKg)}
                        />
                      </div>
                      <p className="font-extrabold text-green-700">
                        {(item.product.pricePerKg * item.quantityKg).toLocaleString()} ETB
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Cart Footer */}
            {cart.length > 0 && (
              <div className="p-6 bg-gray-50 border-t border-gray-200">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-600 font-bold">Estimated Total</span>
                  <span className="text-2xl font-extrabold text-gray-900">{cartTotal.toLocaleString()} ETB</span>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="w-full py-4 bg-green-600 text-white font-extrabold rounded-xl hover:bg-green-700 transition-all shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center"
                >
                  Submit Order Request <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- AUTH GATE POPUP (MODAL) --- */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-md" onClick={() => setIsAuthModalOpen(false)}></div>
          
          <div className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className="bg-gradient-to-br from-green-700 to-emerald-900 p-8 text-center relative">
              <button onClick={() => setIsAuthModalOpen(false)} className="absolute top-4 right-4 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 p-2 rounded-full transition-colors">
                <X className="h-4 w-4" />
              </button>
              <div className="h-16 w-16 bg-white rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg transform rotate-3">
                <Leaf className="h-8 w-8 text-green-600 -rotate-3" />
              </div>
              <h2 className="text-2xl font-extrabold text-white">Secure Your Order</h2>
              <p className="text-green-100 mt-2 text-sm font-medium">Please sign in or create a buyer account to finalize your bulk supply request.</p>
            </div>

            {/* Modal Body */}
            <div className="p-8 space-y-4">
              <Link href="/login" className="w-full flex items-center justify-center py-4 bg-green-600 text-white font-extrabold rounded-xl hover:bg-green-700 transition-colors shadow-sm">
                Log In to Existing Account
              </Link>
              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink-0 mx-4 text-gray-400 text-sm font-bold uppercase">Or</span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>
              <Link href="/register" className="w-full flex items-center justify-center py-4 bg-white border-2 border-gray-200 text-gray-800 font-extrabold rounded-xl hover:border-green-600 hover:text-green-700 transition-colors shadow-sm">
                Create Buyer Account
              </Link>
              
              <p className="text-center text-xs font-medium text-gray-500 mt-6 px-4">
                By creating an account, you agree to our <span className="text-green-600 cursor-pointer">Terms of Service</span> and <span className="text-green-600 cursor-pointer">Escrow Policies</span>.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}