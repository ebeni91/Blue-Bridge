'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Leaf, 
  LayoutDashboard, 
  ShoppingBag, 
  Store, 
  Settings, 
  LogOut, 
  Bell, 
  Search,
  Clock,
  CheckCircle2,
  Truck,
  FileText,
  ChevronRight,
  User
} from 'lucide-react';

export default function BuyerDashboard() {
  // Mock Data for the UI
  const [activeTab, setActiveTab] = useState('dashboard');

  const recentRequests = [
    { id: 'REQ-8892', commodity: 'Premium White Teff', quantity: '50 Tons', total: '6,000,000 ETB', status: 'In Transit', date: 'Oct 24, 2026' },
    { id: 'REQ-8891', commodity: 'Export-Grade Sesame', quantity: '20 Tons', total: '5,000,000 ETB', status: 'Pending Escrow', date: 'Oct 22, 2026' },
    { id: 'REQ-8885', commodity: 'White Maize', quantity: '100 Tons', total: '4,500,000 ETB', status: 'Delivered', date: 'Oct 15, 2026' },
    { id: 'REQ-8882', commodity: 'High-Yield Wheat', quantity: '200 Tons', total: '13,000,000 ETB', status: 'Delivered', date: 'Sep 30, 2026' },
  ];

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'In Transit': return <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg flex items-center w-fit"><Truck className="h-3 w-3 mr-1" /> {status}</span>;
      case 'Pending Escrow': return <span className="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-bold rounded-lg flex items-center w-fit"><Clock className="h-3 w-3 mr-1" /> {status}</span>;
      case 'Delivered': return <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-lg flex items-center w-fit"><CheckCircle2 className="h-3 w-3 mr-1" /> {status}</span>;
      default: return <span className="px-3 py-1 bg-gray-50 text-gray-700 text-xs font-bold rounded-lg">{status}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 flex font-sans">
      
      {/* --- SIDEBAR NAVIGATION --- */}
      <aside className="w-64 bg-white border-r border-gray-100 fixed h-full flex flex-col z-20 hidden md:flex">
        {/* Logo Area */}
        <div className="h-24 flex items-center px-8 border-b border-gray-100">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-8 w-8 bg-green-600 rounded-lg flex items-center justify-center shadow-md transform rotate-3">
              <Leaf className="h-5 w-5 text-white -rotate-3" />
            </div>
            <span className="text-xl font-extrabold text-gray-900 tracking-tight">Blue<span className="text-green-600">Bridge</span></span>
          </Link>
        </div>

        {/* Nav Links */}
        <div className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
          <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Menu</p>
          
          <button className={`w-full flex items-center px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'dashboard' ? 'bg-green-50 text-green-700' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}>
            <LayoutDashboard className="h-5 w-5 mr-3" /> Dashboard Overview
          </button>
          <button className={`w-full flex items-center px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'requests' ? 'bg-green-50 text-green-700' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}>
            <ShoppingBag className="h-5 w-5 mr-3" /> Supply Requests
          </button>
          <Link href="/marketplace" className="w-full flex items-center px-4 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all">
            <Store className="h-5 w-5 mr-3" /> Marketplace
          </Link>
          <button className={`w-full flex items-center px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'settings' ? 'bg-green-50 text-green-700' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}>
            <Settings className="h-5 w-5 mr-3" /> Account Settings
          </button>
        </div>

        {/* Bottom Profile / Logout */}
        <div className="p-4 border-t border-gray-100">
          <Link href="/login" className="w-full flex items-center px-4 py-3 text-red-600 font-bold rounded-xl hover:bg-red-50 transition-all">
            <LogOut className="h-5 w-5 mr-3" /> Sign Out
          </Link>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 md:ml-64 relative">
        
        {/* Background Watermark */}
        <Leaf className="absolute top-20 right-20 w-[600px] h-[600px] text-green-600 opacity-[0.02] transform rotate-12 pointer-events-none z-0" />

        {/* Top Header */}
        <header className="h-24 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="relative w-96 hidden lg:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search requests, invoices..." 
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all"
            />
          </div>

          <div className="flex items-center space-x-6 ml-auto">
            <button className="relative text-gray-400 hover:text-gray-600 transition-colors">
              <Bell className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 border-2 border-white rounded-full"></span>
            </button>
            <div className="flex items-center pl-6 border-l border-gray-200">
              <div className="text-right mr-3 hidden sm:block">
                <p className="text-sm font-extrabold text-gray-900">Blue Nile Tech</p>
                <p className="text-xs font-medium text-gray-500">Buyer Account</p>
              </div>
              <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold shadow-sm">
                BN
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8 max-w-7xl mx-auto relative z-10">
          
          <div className="mb-10">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Command Center</h1>
            <p className="text-gray-500 font-medium">Manage your multi-ton agricultural supply chain.</p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-10 transform translate-x-2 -translate-y-2 group-hover:scale-110 transition-transform"><Clock className="h-16 w-16 text-amber-600" /></div>
              <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Pending Requests</p>
              <h3 className="text-4xl font-extrabold text-gray-900">2</h3>
              <p className="text-sm text-amber-600 font-bold mt-2 flex items-center">Awaiting Escrow Funding</p>
            </div>

            <div className="bg-gradient-to-br from-green-600 to-emerald-800 p-6 rounded-3xl shadow-lg relative overflow-hidden group text-white">
              <div className="absolute top-0 right-0 p-6 opacity-10 transform translate-x-2 -translate-y-2 group-hover:scale-110 transition-transform"><Truck className="h-16 w-16 text-white" /></div>
              <p className="text-sm font-bold text-green-100 uppercase tracking-wider mb-2">Active Deliveries</p>
              <h3 className="text-4xl font-extrabold text-white">1</h3>
              <p className="text-sm text-green-200 font-bold mt-2 flex items-center">50 Tons currently in transit</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-10 transform translate-x-2 -translate-y-2 group-hover:scale-110 transition-transform"><CheckCircle2 className="h-16 w-16 text-blue-600" /></div>
              <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Completed Volume</p>
              <h3 className="text-4xl font-extrabold text-gray-900">300<span className="text-2xl text-gray-400">T</span></h3>
              <p className="text-sm text-gray-500 font-bold mt-2 flex items-center">All-time delivered</p>
            </div>
          </div>

          {/* Recent Requests Table Area */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-xl font-extrabold text-gray-900">Recent Supply Requests</h2>
              <button className="text-sm font-bold text-green-600 hover:text-green-800 transition-colors">View All</button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white border-b border-gray-100">
                    <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Request ID</th>
                    <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Commodity</th>
                    <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Volume</th>
                    <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Date</th>
                    <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {recentRequests.map((req, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="py-4 px-6 font-bold text-gray-900">{req.id}</td>
                      <td className="py-4 px-6">
                        <div className="font-bold text-gray-800">{req.commodity}</div>
                        <div className="text-xs text-gray-500 font-medium">{req.total}</div>
                      </td>
                      <td className="py-4 px-6 font-extrabold text-gray-700">{req.quantity}</td>
                      <td className="py-4 px-6">{getStatusBadge(req.status)}</td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-500">{req.date}</td>
                      <td className="py-4 px-6 text-right">
                        <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Quick Action Footer */}
            <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-center">
              <Link href="/marketplace" className="inline-flex items-center px-6 py-3 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:border-green-600 hover:text-green-700 transition-all shadow-sm">
                <Store className="h-5 w-5 mr-2 text-green-600" />
                Browse Marketplace for New Supplies
              </Link>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}