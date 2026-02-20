import { useState } from 'react';
import { 
  User, LogOut, Phone, Lock, UserPlus, MapPin, Hash, 
  LayoutDashboard, ShieldCheck, Mail, Edit2, Shield
} from 'lucide-react';
import { login, signup, logout } from '../api/auth';
import { toast } from 'sonner';
import { View } from '../types';

interface ProfileProps {
  isLoggedIn: boolean;
  user: any;
  onLogin: (user: any) => void;
  onLogout: () => void;
  onNavigate: (view: View) => void;
}

export function Profile({ isLoggedIn, user, onLogin, onLogout, onNavigate }: ProfileProps) {
  const [isLoginView, setIsLoginView] = useState(true);
  const [loading, setLoading] = useState(false);

  // Form States
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [nationalId, setNationalId] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await login(phone, password);
      const userData = {
        name: data.user_name || fullName,
        role: data.role,
        phone: phone,
        location: data.location,
        email: data.email,
        national_id: data.national_id,
      };
      onLogin(userData);
      toast.success("Welcome back!");
    } catch (error) {
      console.error(error);
      toast.error("Invalid Phone Number or Password");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signup({
        full_name: fullName,
        phone_number: phone,
        password: password,
        email: email || null,
        location: location,
        national_id: nationalId,
        role: "buyer"
      });
      toast.success("Account created! Please log in.");
      setIsLoginView(true);
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.detail || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    onLogout();
    toast.info("Logged out successfully");
  };

  const handleDashboardRedirect = () => {
    if (user.role === 'superadmin') {
      onNavigate('superadmin-dashboard');
    } else if (user.role === 'admin') {
      onNavigate('admin-dashboard');
    } else if (user.role === 'agent') {
      onNavigate('agent-dashboard');
    }
  };

  // --- VIEW 1: FULL PROFILE ---
  if (isLoggedIn && user) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        {/* Cover Image */}
        <div className={`h-48 rounded-t-3xl relative overflow-hidden bg-gradient-to-r ${
           user.role === 'superadmin' ? 'from-purple-800 to-indigo-900' :
           user.role === 'admin' ? 'from-emerald-600 to-teal-500' :
           user.role === 'agent' ? 'from-blue-600 to-cyan-500' :
           'from-gray-600 to-gray-500'
        }`}>
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        </div>

        {/* Profile Content Wrapper */}
        <div className="bg-white rounded-b-3xl shadow-xl border-x border-b border-gray-100 px-8 pb-8 -mt-20 relative">
          
          <div className="flex flex-col md:flex-row items-end md:items-center justify-between gap-6 mb-8">
            <div className="flex items-end gap-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-4 border-white bg-white shadow-md overflow-hidden flex items-center justify-center">
                  <div className={`w-full h-full flex items-center justify-center ${
                     user.role === 'superadmin' ? 'bg-purple-100 text-purple-600' :
                     user.role === 'admin' ? 'bg-emerald-100 text-emerald-600' :
                     user.role === 'agent' ? 'bg-blue-100 text-blue-600' :
                     'bg-gray-100 text-gray-600'
                  }`}>
                    <User className="w-16 h-16" />
                  </div>
                </div>
              </div>
              <div className="pb-2">
                <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide border ${
                    user.role === 'superadmin' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                    user.role === 'admin' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                    user.role === 'agent' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                    'bg-gray-50 text-gray-700 border-gray-200'
                  }`}>
                    {user.role}
                  </span>
                </div>
              </div>
            </div>
            
            {/* SINGLE SMART DASHBOARD BUTTON */}
            {['superadmin', 'admin', 'agent'].includes(user.role) && (
              <button 
                onClick={handleDashboardRedirect} 
                className={`flex items-center gap-2 px-6 py-3 text-white rounded-xl font-bold shadow-lg transition-all transform hover:-translate-y-1 ${
                  user.role === 'superadmin' ? 'bg-purple-600 hover:bg-purple-700 shadow-purple-200' :
                  user.role === 'admin' ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200' :
                  'bg-blue-600 hover:bg-blue-700 shadow-blue-200'
                }`}
              >
                {user.role === 'superadmin' ? <Shield className="w-5 h-5" /> : 
                 user.role === 'admin' ? <ShieldCheck className="w-5 h-5" /> : 
                 <LayoutDashboard className="w-5 h-5" />}
                Access {user.role === 'superadmin' ? 'Super Admin' : user.role === 'admin' ? 'Admin' : 'Agent'} Panel
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-gray-400" /> Personal Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs text-gray-500 uppercase font-semibold">Phone Number</label>
                    <p className="font-medium text-gray-900 flex items-center gap-2">
                      <Phone className="w-3 h-3 text-gray-400" /> {user.phone}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 uppercase font-semibold">Location</label>
                    <p className="font-medium text-gray-900 flex items-center gap-2">
                      <MapPin className="w-3 h-3 text-gray-400" /> {user.location || "Ethiopia"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
               <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 py-3 rounded-xl font-bold hover:bg-red-100 transition-colors"
               >
                <LogOut className="w-4 h-4" /> Sign Out
               </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- VIEW 2: LOGIN FORM (Standard) ---
  return (
    <div className="max-w-md mx-auto py-12 px-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 border border-emerald-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-emerald-900">
            {isLoginView ? 'Welcome Back' : 'Create Account'}
          </h2>
        </div>
        <form onSubmit={isLoginView ? handleLogin : handleSignup} className="space-y-4">
          {!isLoginView && (
            <div className="space-y-2">
                <input type="text" required placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border rounded-xl" />
                <input type="text" placeholder="National ID" value={nationalId} onChange={(e) => setNationalId(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border rounded-xl" />
            </div>
          )}
          <input type="tel" required placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border rounded-xl" />
          {!isLoginView && <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border rounded-xl" />}
          <input type="password" required placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border rounded-xl" />
          
          <button type="submit" disabled={loading} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl shadow-lg mt-4">
            {loading ? 'Processing...' : (isLoginView ? 'Sign In' : 'Create Account')}
          </button>
        </form>
        <div className="mt-8 text-center">
          <button onClick={() => setIsLoginView(!isLoginView)} className="text-emerald-600 font-medium">
            {isLoginView ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
}