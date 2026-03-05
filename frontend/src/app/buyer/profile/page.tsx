'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Leaf, User, Building2, MapPin, ExternalLink, LogOut, Loader2, Briefcase } from 'lucide-react';

export default function BuyerProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        // Reusing the dashboard API to grab the user's details
        const response = await fetch('http://localhost:8000/api/core/buyer/dashboard/', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) throw new Error('Failed to fetch data');
        
        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        console.error(error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  const handleLogout = () => {
    localStorage.clear();
    document.cookie.split(";").forEach((c) => { 
      document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
    });
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <Loader2 className="h-10 w-10 text-green-600 animate-spin mb-4" />
        <p className="text-gray-500 font-bold">Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12 font-sans relative">
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 fixed top-0 w-full z-50 h-20 flex items-center px-8 justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="h-10 w-10 bg-green-600 rounded-xl flex items-center justify-center shadow-lg transform rotate-3">
            <Leaf className="h-6 w-6 text-white -rotate-3" />
          </div>
          <span className="text-2xl font-extrabold text-gray-900 tracking-tight">Blue<span className="text-green-600">Bridge</span></span>
        </Link>
        <button onClick={handleLogout} className="text-red-600 font-bold hover:bg-red-50 px-4 py-2 rounded-xl transition-all flex items-center">
          <LogOut className="h-4 w-4 mr-2" /> Sign Out
        </button>
      </nav>

      {/* Profile Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-10">
        <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-gray-100">
          
          {/* Header Banner */}
          <div className="h-40 bg-gradient-to-r from-green-700 to-emerald-900 relative">
             <Leaf className="absolute top-4 right-10 w-32 h-32 text-white opacity-10 transform rotate-12" />
          </div>

          <div className="px-8 pb-10 relative">
            {/* Avatar Profile */}
            <div className="h-28 w-28 bg-white rounded-3xl shadow-xl border-4 border-white flex items-center justify-center -mt-14 mb-6 relative z-10">
              <span className="text-4xl font-extrabold text-green-700 uppercase">
                {profileData?.company_name.substring(0, 2)}
              </span>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10 border-b border-gray-100 pb-8">
              <div>
                <h1 className="text-3xl font-extrabold text-gray-900 mb-1">{profileData?.company_name}</h1>
                <p className="text-gray-500 font-medium flex items-center"><User className="h-4 w-4 mr-1.5" /> {profileData?.full_name}</p>
              </div>
              
              {/* TARGET="_BLANK" OPENS DASHBOARD IN NEW TAB */}
              <Link 
                href="/buyer/dashboard" 
                target="_blank"
                className="px-8 py-4 bg-gray-900 text-white font-extrabold rounded-xl hover:bg-green-600 transition-colors shadow-lg flex items-center group"
              >
                Launch Command Center <ExternalLink className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <h3 className="text-lg font-extrabold text-gray-900 mb-6">Business Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start p-4 bg-gray-50 rounded-2xl">
                <Briefcase className="h-6 w-6 text-green-600 mr-4 mt-1" />
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Business Type</p>
                  <p className="font-bold text-gray-900">{profileData?.business_type}</p>
                </div>
              </div>
              <div className="flex items-start p-4 bg-gray-50 rounded-2xl">
                <Building2 className="h-6 w-6 text-green-600 mr-4 mt-1" />
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Account Role</p>
                  <p className="font-bold text-gray-900">Verified Buyer</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}