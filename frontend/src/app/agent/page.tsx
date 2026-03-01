'use client';

import { Users, Map, Wheat, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function AgentDashboard() {
  // Mock data for recently onboarded farmers
  const recentFarmers = [
    { id: 'F-001', name: 'Abebe Kebede', region: 'East Shewa', product: 'White Teff', date: 'Today, 09:30 AM' },
    { id: 'F-002', name: 'Tadesse Alemu', region: 'West Gojjam', product: 'Mixed Teff', date: 'Today, 08:15 AM' },
    { id: 'F-003', name: 'Chala Gemechu', region: 'Bale', product: 'Wheat', date: 'Yesterday' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Agent Overview</h1>
          <p className="text-gray-500">Track your farmer onboarding and field operations.</p>
        </div>
        <Link 
          href="/agent/register" 
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          + Register New Farmer
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Farmers" value="142" icon={Users} trend="+12 this month" color="text-blue-600" bg="bg-blue-100" />
        <StatCard title="Active Regions" value="4" icon={Map} trend="Oromia, Amhara" color="text-purple-600" bg="bg-purple-100" />
        <StatCard title="Top Commodity" value="White Teff" icon={Wheat} trend="68% of network" color="text-orange-600" bg="bg-orange-100" />
        <StatCard title="Registrations Today" value="2" icon={TrendingUp} trend="On track" color="text-green-600" bg="bg-green-100" />
      </div>

      {/* Action Area: Recent Registrations */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Recently Onboarded Farmers</h2>
          <Link href="/agent/farmers" className="text-sm font-medium text-blue-600 hover:text-blue-800">
            View All Directory
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-200">
                <th className="px-6 py-3 font-medium">ID</th>
                <th className="px-6 py-3 font-medium">Farmer Name</th>
                <th className="px-6 py-3 font-medium">Region</th>
                <th className="px-6 py-3 font-medium">Primary Product</th>
                <th className="px-6 py-3 font-medium">Registration Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentFarmers.map((farmer) => (
                <tr key={farmer.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{farmer.id}</td>
                  <td className="px-6 py-4 text-sm font-medium text-blue-600">{farmer.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{farmer.region}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{farmer.product}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{farmer.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

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