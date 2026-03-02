'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Leaf, LayoutDashboard, ShoppingBag, Store, Settings, LogOut, Bell, 
  Search, Clock, CheckCircle2, Truck, ChevronRight, Loader2
} from 'lucide-react';

export default function BuyerDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // State to hold the real data from Django!
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<any>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      // 1. Get the JWT token we saved during login
      const token = localStorage.getItem('accessToken');
      
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        // 2. Fetch the data securely from Django
        const response = await fetch('http://localhost:8000/api/core/buyer/dashboard/', {
          headers: {
            'Authorization': `Bearer ${token}`, // Pass the security badge
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        setDashboardData(data); // 3. Save it to the UI state!

      } catch (error) {
        console.error("Dashboard Error:", error);
        // If the token is expired/invalid, force them to log in again
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [router]);

  // Logout Function
  const handleLogout = () => {
    localStorage.clear();
    document.cookie.split(";").forEach((c) => { 
      document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
    });
    router.push('/login');
  };

  // Show a beautiful loading spinner while fetching from Django
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <Loader2 className="h-10 w-10 text-green-600 animate-spin mb-4" />
        <p className="text-gray-500 font-bold">Loading your Command Center...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 flex font-sans">
      
      {/* --- SIDEBAR NAVIGATION --- */}
      <aside className="w-64 bg-white border-r border-gray-100 fixed h-full flex flex-col z-20 hidden md:flex">
        <div className="h-24 flex items-center px-8 border-b border-gray-100">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-8 w-8 bg-green-600 rounded-lg flex items-center justify-center shadow-md transform rotate-3">
              <Leaf className="h-5 w-5 text-white -rotate-3" />
            </div>
            <span className="text-xl font-extrabold text-gray-900 tracking-tight">Blue<span className="text-green-600">Bridge</span></span>
          </Link>
        </div>

        <div className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
          <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Menu</p>
          <button className="w-full flex items-center px-4 py-3 rounded-xl font-bold transition-all bg-green-50 text-green-700">
            <LayoutDashboard className="h-5 w-5 mr-3" /> Dashboard Overview
          </button>
          <button className="w-full flex items-center px-4 py-3 rounded-xl font-bold transition-all text-gray-500 hover:bg-gray-50 hover:text-gray-900">
            <ShoppingBag className="h-5 w-5 mr-3" /> Supply Requests
          </button>
          <Link href="/marketplace" className="w-full flex items-center px-4 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all">
            <Store className="h-5 w-5 mr-3" /> Marketplace
          </Link>
        </div>

        <div className="p-4 border-t border-gray-100">
          <button onClick={handleLogout} className="w-full flex items-center px-4 py-3 text-red-600 font-bold rounded-xl hover:bg-red-50 transition-all">
            <LogOut className="h-5 w-5 mr-3" /> Sign Out
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 md:ml-64 relative">
        <Leaf className="absolute top-20 right-20 w-[600px] h-[600px] text-green-600 opacity-[0.02] transform rotate-12 pointer-events-none z-0" />

        <header className="h-24 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="relative w-96 hidden lg:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input type="text" placeholder="Search requests..." className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all"/>
          </div>

          <div className="flex items-center space-x-6 ml-auto">
            <button className="relative text-gray-400 hover:text-gray-600 transition-colors">
              <Bell className="h-6 w-6" />
            </button>
            <div className="flex items-center pl-6 border-l border-gray-200">
              <div className="text-right mr-3 hidden sm:block">
                {/* DYNAMIC DATA: User's Company Name! */}
                <p className="text-sm font-extrabold text-gray-900">{dashboardData?.company_name}</p>
                <p className="text-xs font-medium text-gray-500">Buyer Account</p>
              </div>
              <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold shadow-sm uppercase">
                {dashboardData?.company_name.substring(0, 2)}
              </div>
            </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto relative z-10">
          <div className="mb-10">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Command Center</h1>
            {/* DYNAMIC DATA: User's Full Name! */}
            <p className="text-gray-500 font-medium">Welcome back, {dashboardData?.full_name}. Manage your supply chain.</p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-10 transform translate-x-2 -translate-y-2 group-hover:scale-110 transition-transform"><Clock className="h-16 w-16 text-amber-600" /></div>
              <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Pending Requests</p>
              <h3 className="text-4xl font-extrabold text-gray-900">{dashboardData?.stats.pending_requests}</h3>
            </div>

            <div className="bg-gradient-to-br from-green-600 to-emerald-800 p-6 rounded-3xl shadow-lg relative overflow-hidden group text-white">
              <div className="absolute top-0 right-0 p-6 opacity-10 transform translate-x-2 -translate-y-2 group-hover:scale-110 transition-transform"><Truck className="h-16 w-16 text-white" /></div>
              <p className="text-sm font-bold text-green-100 uppercase tracking-wider mb-2">Active Deliveries</p>
              <h3 className="text-4xl font-extrabold text-white">{dashboardData?.stats.active_deliveries}</h3>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-10 transform translate-x-2 -translate-y-2 group-hover:scale-110 transition-transform"><CheckCircle2 className="h-16 w-16 text-blue-600" /></div>
              <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Completed Volume</p>
              <h3 className="text-4xl font-extrabold text-gray-900">{dashboardData?.stats.completed_volume}</h3>
            </div>
          </div>

          {/* Empty State for Supply Requests */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden p-12 text-center">
             <div className="h-20 w-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="h-10 w-10 text-gray-400" />
             </div>
             <h3 className="text-xl font-extrabold text-gray-900 mb-2">No Active Requests</h3>
             <p className="text-gray-500 mb-8 max-w-sm mx-auto">You haven't submitted any bulk supply requests yet. Create your first request to start sourcing commodities.</p>
             <button className="px-8 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-colors shadow-lg">
                + Create New Request
             </button>
          </div>

        </div>
      </main>
    </div>
  );
}