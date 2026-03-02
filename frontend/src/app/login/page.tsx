'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Leaf, Mail, Lock, Loader2, ArrowRight, ShieldCheck, Briefcase } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 1. MAKE API CALL TO DJANGO
      const response = await fetch('http://localhost:8000/api/auth/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          username: formData.email, 
          password: formData.password 
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Invalid credentials. Please try again.');
      }

      // 2. SAVE TOKENS
      localStorage.setItem('accessToken', data.access);
      if (data.refresh) localStorage.setItem('refreshToken', data.refresh);

      // 3. EXTRACT ROLE DIRECTLY FROM YOUR CUSTOM JWT TOKEN!
      // This decodes the middle part of the JWT where you injected the role
      const tokenPayload = JSON.parse(atob(data.access.split('.')[1]));
      const userRole = tokenPayload.role; 

      // Save role for client-side checks and Next.js Middleware
      localStorage.setItem('userRole', userRole);
      document.cookie = `userRole=${userRole}; path=/`; 
      document.cookie = `token=${data.access}; path=/`;

      // 4. UNIFIED ROLE-BASED ROUTING
      if (userRole === 'SUPER_ADMIN' || userRole === 'ADMIN') {
        router.push('/admin');
      } else if (userRole === 'AGENT') {
        router.push('/agent');
      } else if (userRole === 'DRIVER') {
        router.push('/driver');
      } else if (userRole === 'BUYER') {
        router.push('/buyer/dashboard');
      } else {
        router.push('/'); 
      }

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* --- LEFT SIDE: BRANDING (Matches Registration) --- */}
      <div className="hidden lg:flex lg:w-5/12 bg-gradient-to-br from-green-700 via-green-600 to-emerald-900 relative overflow-hidden flex-col justify-between p-12">
        <Leaf className="absolute -bottom-24 -left-24 w-[500px] h-[500px] text-white opacity-[0.05] transform rotate-12 pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-[0.05] pointer-events-none"></div>

        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-3 mb-16 inline-flex">
            <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center shadow-lg transform rotate-3">
              <Leaf className="h-6 w-6 text-green-600 -rotate-3" />
            </div>
            <span className="text-2xl font-extrabold text-white tracking-tight">BlueBridge</span>
          </Link>

          <h1 className="text-4xl font-extrabold text-white leading-tight mb-6">
            Welcome back to <br />
            <span className="text-green-200">your network.</span>
          </h1>
          <p className="text-green-100 text-lg max-w-md">
            Sign in to manage your supply chain, oversee escrows, or track agricultural deliveries across Ethiopia.
          </p>
        </div>

        <div className="relative z-10 space-y-6">
          <div className="flex items-center text-green-50 bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
            <ShieldCheck className="h-8 w-8 text-green-300 mr-4 shrink-0" />
            <div>
              <h4 className="font-bold text-white">Enterprise Security</h4>
              <p className="text-sm text-green-200 mt-1">Your data and transactions are fully encrypted.</p>
            </div>
          </div>
          <div className="flex items-center text-green-50 bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
            <Briefcase className="h-8 w-8 text-green-300 mr-4 shrink-0" />
            <div>
              <h4 className="font-bold text-white">Unified Access</h4>
              <p className="text-sm text-green-200 mt-1">One login portal for Admins, Agents, and Buyers.</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- RIGHT SIDE: LOGIN FORM --- */}
      <div className="w-full lg:w-7/12 flex items-center justify-center p-8 sm:p-12 lg:p-16">
        <div className="max-w-md w-full">
          <div className="mb-10">
            <h2 className="text-3xl font-extrabold text-gray-900">Sign In</h2>
            <p className="text-gray-500 mt-2">
              New to Blue Bridge? <Link href="/register" className="text-green-600 font-bold hover:underline">Create a buyer account</Link>
            </p>
            
            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center text-red-700 text-sm font-bold">
                <span className="h-2 w-2 bg-red-500 rounded-full mr-3"></span>
                {error}
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input 
                  required 
                  type="email" 
                  placeholder="name@company.com" 
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-green-500 outline-none transition-all" 
                  value={formData.email} 
                  onChange={(e) => setFormData({...formData, email: e.target.value})} 
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-bold text-gray-700">Password</label>
                <Link href="/forgot-password" className="text-sm font-bold text-green-600 hover:underline">Forgot password?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input 
                  required 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-green-500 outline-none transition-all" 
                  value={formData.password} 
                  onChange={(e) => setFormData({...formData, password: e.target.value})} 
                />
              </div>
            </div>

            <div className="pt-4">
              <button 
                type="submit" 
                disabled={loading} 
                className="w-full py-4 bg-gray-900 text-white font-extrabold rounded-xl hover:bg-green-600 transition-colors shadow-lg flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed group"
              >
                {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : (
                  <>
                    Secure Login <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}