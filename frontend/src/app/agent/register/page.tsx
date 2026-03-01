'use client';

import { useState } from 'react';
import { User, Phone, MapPin, Wheat, Sun, Save, Loader2 } from 'lucide-react';

export default function RegisterFarmerPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    location: '',
    productType: 'White Teff',
    season: 'Meher (Main Season)'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call to Django backend
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      // Reset form after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
      setFormData({ fullName: '', phoneNumber: '', location: '', productType: 'White Teff', season: 'Meher (Main Season)' });
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Register New Farmer</h1>
        <p className="text-gray-500">Onboard a new farmer into the Blue Bridge ecosystem.</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          
          {/* Section 1: Personal Details */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    required
                    className="pl-10 w-full rounded-lg border border-gray-300 py-2.5 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    placeholder="e.g. Abebe Kebede"
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    required
                    className="pl-10 w-full rounded-lg border border-gray-300 py-2.5 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    placeholder="09..."
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Agricultural Details */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">Farm & Crop Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Location (Region / Zone)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    required
                    className="pl-10 w-full rounded-lg border border-gray-300 py-2.5 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    placeholder="e.g. Oromia, East Shewa"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Primary Product</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Wheat className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    className="pl-10 w-full rounded-lg border border-gray-300 py-2.5 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-white appearance-none"
                    value={formData.productType}
                    onChange={(e) => setFormData({...formData, productType: e.target.value})}
                  >
                    <option>White Teff</option>
                    <option>Mixed Teff</option>
                    <option>Red Teff</option>
                    <option>Wheat</option>
                    <option>Maize</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Harvest Season</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Sun className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    className="pl-10 w-full rounded-lg border border-gray-300 py-2.5 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-white appearance-none"
                    value={formData.season}
                    onChange={(e) => setFormData({...formData, season: e.target.value})}
                  >
                    <option>Meher (Main Season)</option>
                    <option>Belg (Short Season)</option>
                    <option>Irrigation / Off-season</option>
                  </select>
                </div>
              </div>

            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-4 flex items-center justify-between border-t border-gray-100">
            {success ? (
              <p className="text-green-600 font-medium flex items-center">
                <span className="h-2 w-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                Farmer Registered Successfully!
              </p>
            ) : <p></p>}
            
            <button
              type="submit"
              disabled={loading}
              className="flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all active:scale-95 disabled:opacity-70"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <Save className="h-5 w-5 mr-2" />}
              {loading ? 'Saving...' : 'Complete Registration'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}