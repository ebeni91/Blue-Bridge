import { useState } from 'react';
import { User, LogOut, Phone, Lock, UserPlus, MapPin, Hash, LayoutDashboard, ShieldCheck } from 'lucide-react';
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
  
  // Signup extra fields
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
        phone: phone
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

  // --- VIEW 1: LOGGED IN PROFILE ---
  if (isLoggedIn && user) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-emerald-100">
          <div className="bg-emerald-600 h-32 relative">
            <div className="absolute -bottom-12 left-8">
              <div className="bg-white p-2 rounded-full shadow-lg">
                <div className="bg-emerald-100 p-4 rounded-full">
                  <User className="w-12 h-12 text-emerald-600" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-16 pb-8 px-8">
            <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 
                user.role === 'agent' ? 'bg-blue-100 text-blue-700' : 
                'bg-emerald-100 text-emerald-700'
              }`}>
                {user.role}
              </span>
            </div>
            
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3 text-gray-600 bg-gray-50 p-4 rounded-xl">
                <Phone className="w-5 h-5 text-gray-400" />
                <span>{user.phone || "No phone number"}</span>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              {/* ADMIN BUTTON */}
              {(user.role === 'admin' || user.role === 'superadmin') && (
                <button
                  onClick={() => onNavigate('admin-dashboard')}
                  className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white py-4 rounded-xl font-bold hover:bg-purple-700 transition-all shadow-lg shadow-purple-200 hover:-translate-y-0.5"
                >
                  <ShieldCheck className="w-5 h-5" />
                  Open Admin Dashboard
                </button>
              )}

              {/* AGENT BUTTON */}
              {user.role === 'agent' && (
                <button
                  onClick={() => onNavigate('agent-dashboard')}
                  className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white py-4 rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 hover:-translate-y-0.5"
                >
                  <LayoutDashboard className="w-5 h-5" />
                  Open Agent Dashboard
                </button>
              )}

              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 py-4 rounded-xl font-semibold hover:bg-red-100 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- VIEW 2: LOGIN / SIGNUP FORMS ---
  return (
    <div className="max-w-md mx-auto py-12 px-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 border border-emerald-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-emerald-900">
            {isLoginView ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-gray-500 mt-2">
            {isLoginView ? 'Enter your credentials to access your account' : 'Join Blue Bridge today'}
          </p>
        </div>

        <form onSubmit={isLoginView ? handleLogin : handleSignup} className="space-y-4">
          
          {/* Signup Extra Fields */}
          {!isLoginView && (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                    placeholder="Kebede Balcha"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 ml-1">National ID</label>
                <div className="relative">
                  <Hash className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                    placeholder="ID Number"
                    value={nationalId}
                    onChange={(e) => setNationalId(e.target.value)}
                  />
                </div>
              </div>
            </>
          )}

          {/* Common Fields */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 ml-1">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                required
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                placeholder="0911..."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          {!isLoginView && (
             <div className="space-y-2">
             <label className="text-sm font-medium text-gray-700 ml-1">Location</label>
             <div className="relative">
               <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
               <input
                 type="text"
                 className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                 placeholder="City, Region"
                 value={location}
                 onChange={(e) => setLocation(e.target.value)}
               />
             </div>
           </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="password"
                required
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-emerald-200 transition-all active:scale-[0.98] mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : (isLoginView ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button
            onClick={() => setIsLoginView(!isLoginView)}
            className="text-emerald-600 font-medium hover:text-emerald-700 transition-colors flex items-center justify-center gap-2 mx-auto"
          >
            {isLoginView ? (
              <>
                <UserPlus className="w-4 h-4" />
                Don't have an account? Sign Up
              </>
            ) : (
              <>
                <User className="w-4 h-4" />
                Already have an account? Sign In
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}