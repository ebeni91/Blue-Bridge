import { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Package, ShoppingBag, Settings, LogOut, 
  Search, Bell, Menu, TrendingUp, DollarSign, Activity, ChevronRight
} from 'lucide-react';

export function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    // FORCE text-gray-900 to override global white text
    <div className="flex h-screen bg-gray-50 font-sans text-gray-900">
      {/* 1. Sidebar Navigation */}
      <Sidebar isOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      {/* 2. Main Content Wrapper */}
      <div className="flex-1 flex flex-col overflow-hidden transition-all duration-300">
        {/* Top Header */}
        <AdminHeader toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        {/* Dashboard Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <Routes>
              <Route path="/" element={<Overview />} />
              <Route path="/users" element={<PlaceholderPage title="User Management" />} />
              <Route path="/products" element={<PlaceholderPage title="Product Management" />} />
              <Route path="/orders" element={<PlaceholderPage title="Order Management" />} />
              <Route path="/settings" element={<PlaceholderPage title="System Settings" />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}

// --- Sub-Components ---

function Sidebar({ isOpen, setIsSidebarOpen }: any) {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Overview', path: '/admin' },
    { icon: Users, label: 'Farmers & Users', path: '/admin/users' },
    { icon: Package, label: 'Products', path: '/admin/products' },
    { icon: ShoppingBag, label: 'Orders', path: '/admin/orders' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ];

  if (!isOpen) return null;

  return (
    // CHANGED: bg-white (Light Sidebar) so we can use Black Text
    <aside className="w-64 bg-white border-r border-gray-200 shadow-xl flex flex-col z-50">
      <div className="h-16 flex items-center px-6 border-b border-gray-100 bg-white">
        <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center mr-3 shadow-md">
          <span className="text-white font-bold text-lg">B</span>
        </div>
        <span className="text-xl font-extrabold tracking-tight text-emerald-950">BLUE BRIDGE</span>
      </div>

      <div className="flex-1 py-6 px-3 space-y-2">
        <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Menu</p>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path === '/admin' && location.pathname === '/admin/');
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? 'bg-emerald-50 text-emerald-700 shadow-sm translate-x-1' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon size={20} className={isActive ? 'text-emerald-600' : 'text-gray-400 group-hover:text-gray-600'} />
                <span className="font-semibold">{item.label}</span>
              </div>
              {isActive && <ChevronRight size={16} className="text-emerald-600" />}
            </button>
          );
        })}
      </div>

      <div className="p-4 border-t border-gray-100 bg-gray-50">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-3 w-full px-4 py-3 text-red-600 bg-white hover:bg-red-50 hover:text-red-700 rounded-xl transition-colors border border-gray-200 shadow-sm"
        >
          <LogOut size={20} />
          <span className="font-bold">Exit to Market</span>
        </button>
      </div>
    </aside>
  );
}

function AdminHeader({ toggleSidebar }: any) {
  return (
    <header className="h-16 bg-white border-b border-gray-200 shadow-sm flex items-center justify-between px-6 z-40">
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors">
          <Menu size={24} />
        </button>
        <h2 className="text-lg font-bold text-gray-800 hidden md:block">Admin Portal</h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search data..." 
            className="pl-10 pr-4 py-2 bg-gray-100 border-none text-gray-900 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white w-64 transition-all placeholder-gray-500"
          />
        </div>
        <div className="h-8 w-px bg-gray-200 mx-2"></div>
        <button className="relative p-2 text-gray-500 hover:text-emerald-600 transition-colors bg-gray-50 rounded-full hover:bg-emerald-50">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
        </button>
        <div className="flex items-center gap-3 pl-2">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-gray-900">Administrator</p>
            <p className="text-xs text-gray-500 font-medium">Super User</p>
          </div>
          <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold border-2 border-emerald-200 shadow-sm">
            A
          </div>
        </div>
      </div>
    </header>
  );
}

function Overview() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          {/* Explicit text-gray-900 ensures visibility */}
          <h1 className="text-3xl font-extrabold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-500 mt-2 font-medium">Real-time agricultural market insights.</p>
        </div>
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full border border-emerald-200">
            System Healthy
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Revenue" 
          value="ETB 45,200" 
          trend="+12.5%" 
          icon={DollarSign} 
          color="emerald" 
        />
        <StatCard 
          title="Active Farmers" 
          value="124" 
          trend="+4 new" 
          icon={Users} 
          color="blue" 
        />
        <StatCard 
          title="Pending Orders" 
          value="18" 
          trend="-2.4%" 
          icon={ShoppingBag} 
          color="amber" 
        />
        <StatCard 
          title="Growth Rate" 
          value="24.8%" 
          trend="+2.1%" 
          icon={TrendingUp} 
          color="purple" 
        />
      </div>

      {/* Main Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h3 className="font-bold text-lg text-gray-900">Recent Orders</h3>
            <button className="text-sm text-emerald-600 hover:text-emerald-700 font-bold hover:underline">
              View All Orders
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-500 font-semibold uppercase text-xs tracking-wider">
                <tr>
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <OrderItem id="#ORD-001" user="Abebe B." status="Completed" amount="450 ETB" statusColor="text-emerald-700 bg-emerald-100 border border-emerald-200" />
                <OrderItem id="#ORD-002" user="Sara M." status="Pending" amount="1,200 ETB" statusColor="text-amber-700 bg-amber-100 border border-amber-200" />
                <OrderItem id="#ORD-003" user="Kebede T." status="Processing" amount="890 ETB" statusColor="text-blue-700 bg-blue-100 border border-blue-200" />
                <OrderItem id="#ORD-004" user="Dawit H." status="Cancelled" amount="120 ETB" statusColor="text-red-700 bg-red-100 border border-red-200" />
                <OrderItem id="#ORD-005" user="Lula G." status="Completed" amount="3,400 ETB" statusColor="text-emerald-700 bg-emerald-100 border border-emerald-200" />
              </tbody>
            </table>
          </div>
        </div>

        {/* System Activity */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col h-full">
          <h3 className="font-bold text-lg text-gray-900 mb-6 flex items-center gap-2">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <Activity className="w-5 h-5 text-emerald-600" />
            </div>
            Live Activity
          </h3>
          <div className="space-y-8 relative">
            <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-gray-100"></div>
            
            <ActivityItem title="New User Registered" time="2 mins ago" desc="Farmer 'Green Valley' joined." color="bg-blue-500" />
            <ActivityItem title="High Value Order" time="15 mins ago" desc="Order #ORD-009 > 5,000 ETB." color="bg-emerald-500" />
            <ActivityItem title="Stock Alert" time="1 hour ago" desc="Tomatoes running low." color="bg-amber-500" />
            <ActivityItem title="System Backup" time="3 hours ago" desc="Backup successful." color="bg-purple-500" />
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Helper Components ---

function StatCard({ title, value, trend, icon: Icon, color }: any) {
  const colors: any = {
    emerald: { border: 'border-t-emerald-500', bg: 'bg-emerald-50', text: 'text-emerald-600' },
    blue: { border: 'border-t-blue-500', bg: 'bg-blue-50', text: 'text-blue-600' },
    amber: { border: 'border-t-amber-500', bg: 'bg-amber-50', text: 'text-amber-600' },
    purple: { border: 'border-t-purple-500', bg: 'bg-purple-50', text: 'text-purple-600' },
  };

  const theme = colors[color];

  return (
    <div className={`bg-white p-6 rounded-xl shadow-sm border border-gray-200 border-t-4 ${theme.border} hover:shadow-md transition-shadow duration-300`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">{title}</p>
          <h3 className="text-2xl font-black text-gray-900 mt-2">{value}</h3>
        </div>
        <div className={`p-3 rounded-xl ${theme.bg} ${theme.text}`}>
          <Icon size={22} />
        </div>
      </div>
      <div className="mt-4 flex items-center">
        <TrendingUp className="w-4 h-4 text-emerald-500 mr-1" />
        <span className="text-sm font-bold text-emerald-600">{trend}</span>
        <span className="text-xs text-gray-400 ml-2 font-medium">vs last month</span>
      </div>
    </div>
  );
}

function OrderItem({ id, user, status, amount, statusColor }: any) {
  return (
    <tr className="hover:bg-gray-50 transition-colors group cursor-pointer">
      <td className="px-6 py-4 font-bold text-gray-700 group-hover:text-emerald-700">{id}</td>
      <td className="px-6 py-4 font-medium text-gray-900">{user}</td>
      <td className="px-6 py-4">
        <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${statusColor}`}>
          {status}
        </span>
      </td>
      <td className="px-6 py-4 text-right font-bold text-gray-900">{amount}</td>
    </tr>
  );
}

function ActivityItem({ title, time, desc, color }: any) {
  return (
    <div className="relative pl-8">
      <div className={`absolute left-0 top-1.5 w-4 h-4 rounded-full border-2 border-white shadow-sm ${color} z-10`}></div>
      <h4 className="text-sm font-bold text-gray-900">{title}</h4>
      <span className="text-xs text-gray-400 font-medium block mb-1">{time}</span>
      <p className="text-sm text-gray-600">{desc}</p>
    </div>
  );
}

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
      <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 border border-gray-100">
        <Settings size={40} className="text-gray-300" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      <p className="text-gray-500 mt-2 max-w-md mx-auto">
        This module is currently under active development. Check back soon for updates to the {title} interface.
      </p>
      <button className="mt-6 px-6 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200">
        Refresh Status
      </button>
    </div>
  );
}