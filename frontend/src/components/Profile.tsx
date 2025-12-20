import { useState } from 'react';
import { ArrowLeft, User as UserIcon, Mail, Lock, Calendar, Users, CreditCard, LogOut } from 'lucide-react';

interface ProfileProps {
  isLoggedIn: boolean;
  user: any;
  onLogin: (userData: any) => void;
  onLogout: () => void;
}

export function Profile({ isLoggedIn, user, onLogin, onLogout }: ProfileProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [signupData, setSignupData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    sex: '',
    nationalId: '',
  });

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - in real app, validate credentials
    onLogin({
      fullName: 'John Doe',
      email: loginData.email,
    });
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (signupData.password !== signupData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (signupData.nationalId.length !== 12) {
      alert('National ID must be 12 digits');
      return;
    }
    // Mock signup - in real app, create account
    onLogin({
      fullName: signupData.fullName,
      email: signupData.email,
    });
  };

  if (isLoggedIn && user) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl p-8 border-2 border-emerald-100">
          <div className="text-center mb-8">
            <div className="bg-gradient-to-br from-emerald-600 to-teal-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserIcon className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-emerald-900 mb-2">{user.fullName}</h1>
            <p className="text-emerald-600">{user.email}</p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="bg-emerald-50 rounded-xl p-4">
              <h3 className="text-emerald-900 mb-4">Account Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-emerald-700">
                  <Mail className="w-5 h-5" />
                  <span>{user.email}</span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl border-2 border-emerald-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 text-center border-b-2 border-emerald-100">
          <div className="bg-gradient-to-br from-emerald-600 to-teal-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <UserIcon className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-green-700 mb-2">Blue Bridge</h1>
          <p className="text-green-500">Login to access your profile</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b-2 border-emerald-100 bg-gray-50">
          <button
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-4 transition-all ${
              activeTab === 'login'
                ? 'bg-white text-emerald-700 border-b-2 border-emerald-600'
                : 'text-emerald-600 hover:bg-emerald-50'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab('signup')}
            className={`flex-1 py-4 transition-all ${
              activeTab === 'signup'
                ? 'bg-white text-emerald-700 border-b-2 border-emerald-600'
                : 'text-emerald-600 hover:bg-emerald-50'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Login Form */}
        {activeTab === 'login' && (
          <form onSubmit={handleLoginSubmit} className="p-8">
            <div className="space-y-4">
              <div>
                <label className="block text-emerald-700 mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600 w-5 h-5" />
                  <input
                    type="email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    required
                    className="w-full pl-12 pr-4 py-3 border-2 border-emerald-200 rounded-xl focus:outline-none focus:border-emerald-500"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-emerald-700 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600 w-5 h-5" />
                  <input
                    type="password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    required
                    className="w-full pl-12 pr-4 py-3 border-2 border-emerald-200 rounded-xl focus:outline-none focus:border-emerald-500"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl transition-all mt-6"
              >
                Login
              </button>
            </div>
          </form>
        )}

        {/* Signup Form */}
        {activeTab === 'signup' && (
          <form onSubmit={handleSignupSubmit} className="p-8">
            <div className="space-y-4">
              <div>
                <label className="block text-emerald-700 mb-2">Full Name *</label>
                <div className="relative">
                  <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600 w-5 h-5" />
                  <input
                    type="text"
                    value={signupData.fullName}
                    onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                    required
                    className="w-full pl-12 pr-4 py-3 border-2 border-emerald-200 rounded-xl focus:outline-none focus:border-emerald-500"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-emerald-700 mb-2">Email *</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600 w-5 h-5" />
                  <input
                    type="email"
                    value={signupData.email}
                    onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                    required
                    className="w-full pl-12 pr-4 py-3 border-2 border-emerald-200 rounded-xl focus:outline-none focus:border-emerald-500"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-emerald-700 mb-2">Password *</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600 w-5 h-5" />
                    <input
                      type="password"
                      value={signupData.password}
                      onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                      required
                      className="w-full pl-12 pr-4 py-3 border-2 border-emerald-200 rounded-xl focus:outline-none focus:border-emerald-500"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-emerald-700 mb-2">Confirm Password *</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600 w-5 h-5" />
                    <input
                      type="password"
                      value={signupData.confirmPassword}
                      onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                      required
                      className="w-full pl-12 pr-4 py-3 border-2 border-emerald-200 rounded-xl focus:outline-none focus:border-emerald-500"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-emerald-700 mb-2">Date of Birth *</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600 w-5 h-5" />
                  <input
                    type="date"
                    value={signupData.dateOfBirth}
                    onChange={(e) => setSignupData({ ...signupData, dateOfBirth: e.target.value })}
                    required
                    className="w-full pl-12 pr-4 py-3 border-2 border-emerald-200 rounded-xl focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-emerald-700 mb-2">Sex *</label>
                <div className="relative">
                  <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600 w-5 h-5" />
                  <select
                    value={signupData.sex}
                    onChange={(e) => setSignupData({ ...signupData, sex: e.target.value })}
                    required
                    className="w-full pl-12 pr-4 py-3 border-2 border-emerald-200 rounded-xl focus:outline-none focus:border-emerald-500 appearance-none"
                  >
                    <option value="">Select sex</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-emerald-700 mb-2">National ID Number (12 digits) *</label>
                <div className="relative">
                  <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600 w-5 h-5" />
                  <input
                    type="text"
                    value={signupData.nationalId}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 12);
                      setSignupData({ ...signupData, nationalId: value });
                    }}
                    required
                    pattern="[0-9]{12}"
                    maxLength={12}
                    className="w-full pl-12 pr-4 py-3 border-2 border-emerald-200 rounded-xl focus:outline-none focus:border-emerald-500"
                    placeholder="123456789012"
                  />
                </div>
                <p className="text-emerald-600 text-sm mt-1">
                  {signupData.nationalId.length}/12 digits
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl transition-all mt-6"
              >
                Create Account
              </button>
            </div>
          </form>
        )}

        <div className="px-8 pb-8 text-center">
          <p className="text-emerald-600 text-sm">
            Continue browsing as guest
          </p>
        </div>
      </div>
    </div>
  );
}