'use client';

import { ClipboardCheck, PackageSearch, TrendingUp, AlertCircle } from 'lucide-react';

export default function AgentDashboard() {
  // Mock data to preview the UI before we wire up the backend APIs
  const pendingInspections = [
    { id: 'INS-092', farmer: 'Abebe Kebede', crop: 'White Teff', volume: '500kg', status: 'Awaiting Grading' },
    { id: 'INS-093', farmer: 'Tadesse Alemu', crop: 'Mixed Teff', volume: '1200kg', status: 'In Progress' },
    { id: 'INS-094', farmer: 'Chala Gemechu', crop: 'Red Teff', volume: '300kg', status: 'Awaiting Grading' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Warehouse Operations</h1>
        <p className="text-gray-500">Manage incoming deliveries and quality grading.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Pending Grading" value="12" icon={ClipboardCheck} trend="Action Required" color="text-orange-600" bg="bg-orange-100" />
        <StatCard title="Total Stored (Kg)" value="45,200" icon={PackageSearch} trend="85% Capacity" color="text-blue-600" bg="bg-blue-100" />
        <StatCard title="Processed Today" value="3,400 kg" icon={TrendingUp} trend="+12% from yesterday" color="text-green-600" bg="bg-green-100" />
        <StatCard title="Flagged Issues" value="2" icon={AlertCircle} trend="Review required" color="text-red-600" bg="bg-red-100" />
      </div>

      {/* Action Area: Pending Inspections */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Queue: Quality Inspections</h2>
          <button className="text-sm font-medium text-blue-600 hover:text-blue-800">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-200">
                <th className="px-6 py-3 font-medium">ID</th>
                <th className="px-6 py-3 font-medium">Farmer</th>
                <th className="px-6 py-3 font-medium">Commodity</th>
                <th className="px-6 py-3 font-medium">Volume</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {pendingInspections.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{job.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{job.farmer}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{job.crop}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{job.volume}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${job.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'}`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                      Grade Product
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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