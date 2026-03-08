'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Leaf, LayoutDashboard, ShoppingBag, Store, Settings, LogOut, Bell, 
  Search, Clock, CheckCircle2, Truck, ChevronRight, Loader2,
  User, Building2, MapPin, Phone, Mail, ShieldCheck, Briefcase, Lock
} from 'lucide-react';

export default function BuyerDashboard() {
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // NEW STATE: Controls which tab is currently visible
  const [activeTab, setActiveTab] = useState<'overview' | 'account' | 'settings'>('overview');

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const role = localStorage.getItem('userRole');

    if (!token || role !== 'BUYER') {
      router.push('/login');
      return;
    }

    fetch('http://localhost:8000/api/core/buyer/dashboard/', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(data => {
      setDashboardData(data);
      setLoading(false);
    })
    .catch(err => {
      console.error("Dashboard error:", err);
      setLoading(false);
    });
  }, [router]);

  const handleLogout = () => {
    localStorage.clear();
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 text-green-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      
      {/* --- SIDEBAR NAVIGATION --- */}
      <aside className="w-72 bg-white border-r border-gray-100 flex flex-col hidden md:flex fixed h-screen z-20">
        <div className="h-24 flex items-center px-8 border-b border-gray-100">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="h-10 w-10 bg-green-600 rounded-xl flex items-center justify-center shadow-lg transform rotate-3 group-hover:rotate-6 transition-transform">
              <Leaf className="h-6 w-6 text-white -rotate-3 group-hover:-rotate-6 transition-transform" />
            </div>
            <span className="text-2xl font-extrabold text-gray-900 tracking-tight">
              Blue<span className="text-green-600">Bridge</span>
            </span>
          </Link>
        </div>

        <div className="flex-1 py-8 px-4 flex flex-col gap-2 overflow-y-auto">
          <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Command Center</p>
          
          <button 
            onClick={() => setActiveTab('overview')}
            className={`flex items-center px-4 py-3.5 rounded-2xl font-bold transition-all ${activeTab === 'overview' ? 'bg-green-600 text-white shadow-lg shadow-green-600/20' : 'text-gray-500 hover:bg-green-50 hover:text-green-700'}`}
          >
            <LayoutDashboard className="h-5 w-5 mr-3" /> Dashboard Overview
          </button>
          
          <button 
            onClick={() => setActiveTab('account')}
            className={`flex items-center px-4 py-3.5 rounded-2xl font-bold transition-all ${activeTab === 'account' ? 'bg-green-600 text-white shadow-lg shadow-green-600/20' : 'text-gray-500 hover:bg-green-50 hover:text-green-700'}`}
          >
            <User className="h-5 w-5 mr-3" /> Account Information
          </button>
          
          <button 
            onClick={() => setActiveTab('settings')}
            className={`flex items-center px-4 py-3.5 rounded-2xl font-bold transition-all ${activeTab === 'settings' ? 'bg-green-600 text-white shadow-lg shadow-green-600/20' : 'text-gray-500 hover:bg-green-50 hover:text-green-700'}`}
          >
            <Settings className="h-5 w-5 mr-3" /> Account Settings
          </button>

          <div className="my-4 border-t border-gray-100"></div>
          
          <Link href="/marketplace" className="flex items-center px-4 py-3.5 text-gray-500 hover:bg-green-50 hover:text-green-700 rounded-2xl font-bold transition-all">
            <Store className="h-5 w-5 mr-3" /> Browse Marketplace
          </Link>
        </div>

        <div className="p-4 border-t border-gray-100">
          <button onClick={handleLogout} className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-2xl font-bold transition-colors">
            <LogOut className="h-5 w-5 mr-3" /> Sign Out
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 ml-0 md:ml-72 flex flex-col min-h-screen">
        
        {/* Top Header */}
        <header className="h-24 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex-1 flex items-center">
            <div className="relative w-96 hidden lg:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search orders, invoices, products..." 
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-green-500 font-medium text-sm"
              />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button className="relative p-2 text-gray-400 hover:text-green-600 transition-colors">
              <Bell className="h-6 w-6" />
              <span className="absolute top-1 right-1 h-2.5 w-2.5 bg-red-500 border-2 border-white rounded-full"></span>
            </button>
            <div className="flex items-center pl-6 border-l border-gray-200">
              <div className="text-right mr-4 hidden sm:block">
                <p className="text-sm font-extrabold text-gray-900">{dashboardData?.company_name}</p>
                <p className="text-xs font-medium text-green-600">Verified Buyer</p>
              </div>
              <div className="h-11 w-11 bg-green-100 border-2 border-white shadow-sm rounded-full flex items-center justify-center text-green-700 font-extrabold text-lg">
                {dashboardData?.company_name?.charAt(0) || 'B'}
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Tab Rendering */}
        <div className="flex-1 p-8">
          
          {/* ========================================= */}
          {/* TAB 1: DASHBOARD OVERVIEW                 */}
          {/* ========================================= */}
          {activeTab === 'overview' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-gray-900">Dashboard Overview</h1>
                <p className="text-gray-500 mt-1 font-medium">Welcome back! Here is a summary of your supply chain operations.</p>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                  <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
                    <Clock className="w-16 h-16 text-amber-500" />
                  </div>
                  <p className="text-sm font-bold text-gray-500 mb-2 relative z-10">Pending Approvals</p>
                  <h3 className="text-4xl font-extrabold text-gray-900 mb-4 relative z-10">{dashboardData?.stats?.pending_requests}</h3>
                  <div className="flex items-center text-sm font-bold text-amber-600 bg-amber-50 w-max px-3 py-1 rounded-full relative z-10">
                    Awaiting Farmer Match
                  </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                  <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
                    <Truck className="w-16 h-16 text-blue-500" />
                  </div>
                  <p className="text-sm font-bold text-gray-500 mb-2 relative z-10">Active Deliveries</p>
                  <h3 className="text-4xl font-extrabold text-gray-900 mb-4 relative z-10">{dashboardData?.stats?.active_deliveries}</h3>
                  <div className="flex items-center text-sm font-bold text-blue-600 bg-blue-50 w-max px-3 py-1 rounded-full relative z-10">
                    In Escrow & Transit
                  </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                  <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
                    <CheckCircle2 className="w-16 h-16 text-green-500" />
                  </div>
                  <p className="text-sm font-bold text-gray-500 mb-2 relative z-10">Completed Volume</p>
                  <h3 className="text-4xl font-extrabold text-gray-900 mb-4 relative z-10">{dashboardData?.stats?.completed_volume}</h3>
                  <div className="flex items-center text-sm font-bold text-green-600 bg-green-50 w-max px-3 py-1 rounded-full relative z-10">
                    Successfully Delivered
                  </div>
                </div>
              </div>

              {/* Active Supply Requests Tracker */}
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mb-8">
                <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                  <h2 className="text-xl font-extrabold text-gray-900 flex items-center">
                    <ShoppingBag className="h-6 w-6 mr-3 text-green-600" />
                    Recent Supply Requests
                  </h2>
                  <button className="text-sm font-bold text-green-600 hover:text-green-700">View All</button>
                </div>

                <div className="p-0">
                  {dashboardData?.recent_requests && dashboardData.recent_requests.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-white border-b border-gray-100">
                            <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Order ID</th>
                            <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Commodity</th>
                            <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Volume</th>
                            <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Date</th>
                            <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                            <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                          {dashboardData.recent_requests.map((req: any, index: number) => (
                            <tr key={index} className="hover:bg-gray-50/50 transition-colors group">
                              <td className="px-8 py-5">
                                <span className="font-mono text-sm font-bold text-gray-900">REQ-{req.id}</span>
                              </td>
                              <td className="px-8 py-5">
                                <p className="font-bold text-gray-900">{req.product_name}</p>
                              </td>
                              <td className="px-8 py-5">
                                <p className="text-sm font-bold text-gray-700">{req.quantity} {req.unit}</p>
                              </td>
                              <td className="px-8 py-5 text-sm text-gray-500 font-medium">
                                {req.date}
                              </td>
                              <td className="px-8 py-5">
                                {/* Dynamic Badges based on status */}
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold
                                  ${req.raw_status === 'PENDING_ADMIN' ? 'bg-amber-100 text-amber-800' : ''}
                                  ${req.raw_status === 'SOURCING' ? 'bg-blue-100 text-blue-800' : ''}
                                  ${req.raw_status === 'ACCEPTED' ? 'bg-green-100 text-green-800 border border-green-200' : ''}
                                  ${req.raw_status === 'PAYMENT_COMPLETE' ? 'bg-indigo-100 text-indigo-800' : ''}
                                  ${req.raw_status === 'IN_TRANSIT' ? 'bg-purple-100 text-purple-800' : ''}
                                  ${req.raw_status === 'DELIVERED' ? 'bg-gray-100 text-gray-800' : ''}
                                `}>
                                  {req.status_display}
                                </span>
                              </td>
                              <td className="px-8 py-5 text-right">
                                <button className="text-gray-400 hover:text-green-600 transition-colors">
                                  <ChevronRight className="h-5 w-5 ml-auto" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="p-12 text-center">
                      <div className="h-16 w-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ShoppingBag className="h-8 w-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-extrabold text-gray-900 mb-1">No Active Requests</h3>
                      <p className="text-gray-500 mb-6 max-w-sm mx-auto text-sm">You haven't submitted any bulk supply requests yet. Head to the marketplace to start sourcing.</p>
                      <Link href="/marketplace" className="inline-flex px-6 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-colors shadow-sm">
                        Browse Marketplace
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ========================================= */}
          {/* TAB 2: ACCOUNT INFORMATION                */}
          {/* ========================================= */}
          {activeTab === 'account' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl">
              <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-gray-900">Account Information</h1>
                <p className="text-gray-500 mt-1 font-medium">Manage your verified Blue Bridge business profile.</p>
              </div>

              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                  <Building2 className="w-48 h-48" />
                </div>
                
                <div className="flex items-center justify-between mb-8 relative z-10 border-b border-gray-100 pb-6">
                  <h2 className="text-xl font-extrabold text-gray-900 flex items-center">
                    <User className="h-6 w-6 mr-3 text-green-600" />
                    Business Profile
                  </h2>
                  {dashboardData?.is_verified ? (
                    <span className="px-4 py-2 bg-green-50 text-green-700 text-xs font-bold rounded-xl flex items-center border border-green-100 shadow-sm">
                      <ShieldCheck className="h-4 w-4 mr-2" /> Verified Buyer
                    </span>
                  ) : (
                    <span className="px-4 py-2 bg-amber-50 text-amber-700 text-xs font-bold rounded-xl flex items-center border border-amber-100 shadow-sm">
                      Pending Verification
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 relative z-10">
                  <div className="flex items-start">
                    <div className="h-12 w-12 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center mr-4 shrink-0">
                      <Building2 className="h-5 w-5 text-gray-500" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Company Name</p>
                      <p className="text-lg font-bold text-gray-900">{dashboardData?.company_name}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="h-12 w-12 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center mr-4 shrink-0">
                      <Briefcase className="h-5 w-5 text-gray-500" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Business Size/Type</p>
                      <p className="text-lg font-bold text-gray-900">{dashboardData?.business_type}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="h-12 w-12 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center mr-4 shrink-0">
                      <Mail className="h-5 w-5 text-gray-500" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Email Address</p>
                      <p className="text-lg font-bold text-gray-900">{dashboardData?.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="h-12 w-12 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center mr-4 shrink-0">
                      <Phone className="h-5 w-5 text-gray-500" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Phone Number</p>
                      <p className="text-lg font-bold text-gray-900">{dashboardData?.phone_number || 'Not provided'}</p>
                    </div>
                  </div>

                  <div className="flex items-start md:col-span-2">
                    <div className="h-12 w-12 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center mr-4 shrink-0">
                      <MapPin className="h-5 w-5 text-gray-500" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Registered Delivery Address</p>
                      <p className="text-lg font-bold text-gray-900 leading-relaxed max-w-xl">{dashboardData?.delivery_address}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================= */}
          {/* TAB 3: ACCOUNT SETTINGS                   */}
          {/* ========================================= */}
          {activeTab === 'settings' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl">
              <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-gray-900">Account Settings</h1>
                <p className="text-gray-500 mt-1 font-medium">Update your platform preferences and security settings.</p>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
                  <h3 className="text-lg font-extrabold text-gray-900 mb-6 flex items-center">
                    <Lock className="h-5 w-5 mr-3 text-green-600" /> Password & Security
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Current Password</label>
                      <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">New Password</label>
                        <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Confirm New Password</label>
                        <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none" />
                      </div>
                    </div>
                    <button className="mt-4 px-6 py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-green-600 transition-colors shadow-sm">
                      Update Password
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
                  <h3 className="text-lg font-extrabold text-gray-900 mb-6 flex items-center">
                    <Bell className="h-5 w-5 mr-3 text-green-600" /> Notifications
                  </h3>
                  <div className="space-y-4">
                    <label className="flex items-center p-4 bg-gray-50 rounded-2xl cursor-pointer hover:bg-green-50 transition-colors border border-transparent hover:border-green-100">
                      <input type="checkbox" className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500" defaultChecked />
                      <div className="ml-4">
                        <p className="font-bold text-gray-900">Order Status Updates</p>
                        <p className="text-sm text-gray-500 font-medium">Get notified when a farmer accepts your request.</p>
                      </div>
                    </label>
                    <label className="flex items-center p-4 bg-gray-50 rounded-2xl cursor-pointer hover:bg-green-50 transition-colors border border-transparent hover:border-green-100">
                      <input type="checkbox" className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500" defaultChecked />
                      <div className="ml-4">
                        <p className="font-bold text-gray-900">Logistics Alerts</p>
                        <p className="text-sm text-gray-500 font-medium">Receive tracking updates when your product is in transit.</p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}