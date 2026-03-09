'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Leaf, Mail, Phone, Lock, ArrowRight, Loader2, ShieldCheck, TrendingUp } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const [identifier, setIdentifier] = useState(''); // Holds either email or phone
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:8000/api/auth/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: identifier, password }) 
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('accessToken', data.access);
        localStorage.setItem('refreshToken', data.refresh);
        localStorage.setItem('userRole', data.role);
        
        // Exact routing based on the role we just fixed in the backend!
        if (data.role === 'BUYER') router.push('/buyer/dashboard');
        else if (data.role === 'ADMIN' || data.role === 'SUPER_ADMIN') router.push('/admin');
        else if (data.role === 'AGENT') router.push('/agent');
        else router.push('/');
      } else {
        setError('Invalid credentials. Please check your details and try again.');
      }
    } catch (err) {
      setError('Connection error. Please ensure the backend server is running.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex font-sans bg-white">
      
      {/* ========================================= */}
      {/* LEFT SIDE: PREMIUM BRANDING (SPLIT THEME) */}
      {/* ========================================= */}
      <div className="hidden lg:flex w-1/2 bg-gray-900 relative overflow-hidden flex-col justify-between p-12">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-green-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-3 group inline-flex">
            <div className="h-12 w-12 bg-green-600 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 transition-transform">
              <Leaf className="h-7 w-7 text-white -rotate-3 transition-transform" />
            </div>
            <span className="text-3xl font-extrabold text-white tracking-tight">
              Blue<span className="text-green-500">Bridge</span>
            </span>
          </Link>
        </div>

        <div className="relative z-10 max-w-lg">
          <h1 className="text-5xl font-extrabold text-white leading-tight mb-6">
            The Digital Heart of <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
              African Agriculture.
            </span>
          </h1>
          <p className="text-gray-400 text-lg font-medium mb-12 leading-relaxed">
            Connect directly with verified farmers, streamline your supply chain, and manage secure escrow payments all from one powerful command center.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-center text-gray-300 font-medium">
              <div className="h-10 w-10 bg-gray-800 rounded-full flex items-center justify-center mr-4">
                <ShieldCheck className="h-5 w-5 text-green-400" />
              </div>
              Bank-grade Escrow Security
            </div>
            <div className="flex items-center text-gray-300 font-medium">
              <div className="h-10 w-10 bg-gray-800 rounded-full flex items-center justify-center mr-4">
                <TrendingUp className="h-5 w-5 text-blue-400" />
              </div>
              Real-time Supply Chain Tracking
            </div>
          </div>
        </div>

        <div className="relative z-10 text-sm font-bold text-gray-500">
          © {new Date().getFullYear()} Blue Bridge Technologies
        </div>
      </div>

      {/* ========================================= */}
      {/* RIGHT SIDE: INTERACTIVE LOGIN FORM        */}
      {/* ========================================= */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 bg-gray-50 lg:bg-white relative">
        <div className="max-w-md w-full">
          
          {/* Mobile Logo (Only visible on small screens) */}
          <div className="flex lg:hidden justify-center mb-8">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-green-600 rounded-xl flex items-center justify-center shadow-lg transform rotate-3">
                <Leaf className="h-6 w-6 text-white -rotate-3" />
              </div>
              <span className="text-2xl font-extrabold text-gray-900 tracking-tight">
                Blue<span className="text-green-600">Bridge</span>
              </span>
            </div>
          </div>

          <div className="mb-8 text-center lg:text-left">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-500 font-medium">Access your secure dashboard.</p>
          </div>

          {/* Interactive Login Method Toggle */}
          <div className="flex p-1.5 bg-gray-100 rounded-xl mb-8">
            <button 
              onClick={() => { setLoginMethod('email'); setIdentifier(''); setError(''); }}
              className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all duration-200 flex justify-center items-center gap-2 ${loginMethod === 'email' ? 'bg-white text-gray-900 shadow-sm border border-gray-200' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'}`}
            >
              <Mail className="h-4 w-4" /> Email Login
            </button>
            <button 
              onClick={() => { setLoginMethod('phone'); setIdentifier(''); setError(''); }}
              className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all duration-200 flex justify-center items-center gap-2 ${loginMethod === 'phone' ? 'bg-white text-gray-900 shadow-sm border border-gray-200' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'}`}
            >
              <Phone className="h-4 w-4" /> Phone Login
            </button>
          </div>

          {error && (
            <div className="p-4 bg-red-50 text-red-600 border border-red-100 text-sm font-bold rounded-xl mb-6 text-center animate-in fade-in zoom-in duration-300">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">
                {loginMethod === 'email' ? 'Email Address' : 'Phone Number'}
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-green-600">
                  {loginMethod === 'email' ? <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-green-500 transition-colors" /> : <Phone className="h-5 w-5 text-gray-400 group-focus-within:text-green-500 transition-colors" />}
                </div>
                <input 
                  type={loginMethod === 'email' ? 'email' : 'text'}
                  placeholder={loginMethod === 'email' ? 'you@company.com' : '+251 9...'}
                  className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:bg-white transition-all font-medium text-gray-900 outline-none"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">Password</label>
                <a href="#" className="text-xs font-bold text-green-600 hover:text-green-700 transition-colors">Forgot Password?</a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-green-500 transition-colors" />
                </div>
                <input 
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:bg-white transition-all font-medium text-gray-900 outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-4 mt-6 bg-gray-900 text-white font-extrabold rounded-xl hover:bg-green-600 shadow-md transition-all active:scale-95 flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed group"
            >
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <>Access Dashboard <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" /></>}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-100 text-center">
            <p className="text-gray-500 font-medium text-sm">
              New to Blue Bridge? <Link href="/register" className="text-gray-900 font-bold hover:text-green-600 transition-colors">Apply as a Buyer</Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}