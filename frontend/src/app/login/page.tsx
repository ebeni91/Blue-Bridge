'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User, ArrowRight, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 1. Authenticate with the Django backend
      const res = await fetch('http://localhost:8000/api/auth/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Invalid username or password');
      
      const data = await res.json();
      
      // 2. Decode the JWT payload to extract the injected 'role'
      const payloadBase64 = data.access.split('.')[1];
      const payload = JSON.parse(atob(payloadBase64));
      const userRole = payload.role;

      // 3. Save tokens to localStorage for client-side API calls
      localStorage.setItem('access', data.access);
      localStorage.setItem('refresh', data.refresh);

      // 4. Set cookies for middleware-based subdomain protection
      document.cookie = `accessToken=${data.access}; path=/; max-age=86400; SameSite=Lax`;
      document.cookie = `userRole=${userRole}; path=/; max-age=86400; SameSite=Lax`;

      // 5. HYBRID ROUTING LOGIC: Detect host and redirect
     if (typeof window !== 'undefined') {
        const host = window.location.host;

        if (host.startsWith('admin.')) {
          router.push('/admin');
        } else if (host.startsWith('driver.')) {
          router.push('/driver');
        } else if (host.startsWith('agent.')) {
          router.push('/agent');
        } else {
          // Universal fallback
          if (userRole === 'ADMIN' || userRole === 'SUPER_ADMIN') router.push('/admin');
          else if (userRole === 'DRIVER') router.push('/driver');
          else router.push('/');
        }
      }

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="h-16 w-16 bg-green-600 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3">
            <span className="text-3xl font-bold text-white -rotate-3">BB</span>
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Blue Bridge Platform
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Dedicated login for {typeof window !== 'undefined' ? window.location.host.split('.')[0] : 'Blue Bridge'} portal
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-xl sm:px-10 border border-gray-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md animate-pulse">
                <p className="text-sm text-red-700 font-medium">{error}</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  required
                  className="pl-10 block w-full sm:text-sm border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 py-3 bg-gray-50 text-black border outline-none"
                  placeholder="Enter username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  required
                  className="pl-10 block w-full sm:text-sm border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 py-3 bg-gray-50 text-black border outline-none"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all active:scale-95 disabled:opacity-70"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  Enter Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}