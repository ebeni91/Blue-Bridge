'use client';

import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client';
import { TrendingUp, Users, ShoppingBag, AlertCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for the chart to look premium immediately
const chartData = [
  { name: 'Mon', orders: 4 },
  { name: 'Tue', orders: 7 },
  { name: 'Wed', orders: 5 },
  { name: 'Thu', orders: 12 },
  { name: 'Fri', orders: 8 },
  { name: 'Sat', orders: 15 },
  { name: 'Sun', orders: 20 },
];

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch live orders from the Django backend
    const fetchOrders = async () => {
      try {
        const res = await apiClient.get('/marketplace/orders/');
        setOrders(res.data);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Platform Overview</h1>
        <p className="text-gray-500">Welcome back. Here is what is happening on Blue Bridge today.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Volume (Kg)" value="12,450" icon={TrendingUp} trend="+14%" color="text-green-600" bg="bg-green-100" />
        <StatCard title="Active Orders" value={orders.length.toString()} icon={ShoppingBag} trend="Live" color="text-blue-600" bg="bg-blue-100" />
        <StatCard title="Verified Farmers" value="84" icon={Users} trend="+3 this week" color="text-purple-600" bg="bg-purple-100" />
        <StatCard title="Pending Escrow" value="ETB 450K" icon={AlertCircle} trend="Requires Action" color="text-orange-600" bg="bg-orange-100" />
      </div>

      {/* Chart & Recent Orders Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Trend Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Volume (7 Days)</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Line type="monotone" dataKey="orders" stroke="#16a34a" strokeWidth={3} dot={{r: 4, fill: '#16a34a', strokeWidth: 2, stroke: '#fff'}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Live Orders Feed */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex flex-col">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Order Requests</h2>
          <div className="flex-1 overflow-y-auto pr-2">
            {loading ? (
              <p className="text-gray-500 text-sm">Loading orders...</p>
            ) : orders.length === 0 ? (
              <p className="text-gray-500 text-sm">No active orders right now.</p>
            ) : (
              <div className="space-y-4">
                {orders.slice(0, 5).map((order: any) => (
                  <div key={order.id} className="p-3 bg-gray-50 rounded-lg border border-gray-100 flex justify-between items-center">
                    <div>
                      <p className="font-medium text-sm text-gray-900">{order.requested_weight_kg}kg to {order.target_region}</p>
                      <p className="text-xs text-gray-500 mt-1">{new Date(order.created_at).toLocaleDateString()}</p>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                      {order.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <button className="mt-4 w-full py-2 text-sm text-green-700 font-medium hover:bg-green-50 rounded-lg transition-colors">
            View All Orders
          </button>
        </div>
      </div>
    </div>
  );
}

// Reusable micro-component for the top cards
function StatCard({ title, value, icon: Icon, trend, color, bg }: any) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
        <p className="text-xs font-medium text-gray-500 mt-2">{trend}</p>
      </div>
      <div className={`p-3 rounded-lg ${bg}`}>
        <Icon className={`h-6 w-6 ${color}`} />
      </div>
    </div>
  );
}