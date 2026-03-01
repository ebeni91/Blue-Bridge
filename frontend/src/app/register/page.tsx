'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Leaf, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Building2, 
  Briefcase, 
  Lock, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Loader2
} from 'lucide-react';

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    businessType: 'Small Enterprise',
    address: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Clear any previous errors

    // 1. Frontend Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match. Please try again.');
      setLoading(false);
      return;
    }

    try {
      // 2. Format the payload to match Django's BuyerRegistrationSerializer
      const payload = {
        email: formData.email,
        phone_number: formData.phone, // Maps to Django's field name
        password: formData.password,
        fullName: formData.fullName,
        companyName: formData.companyName,
        businessType: formData.businessType,
        address: formData.address,
      };

      // 3. Make the actual API request
      // NEW CODE
      const response = await fetch('http://localhost:8000/api/core/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      // 4. Catch Backend Errors (e.g., email already exists)
      if (!response.ok) {
        // Look for specific field errors from Django (like duplicate phone or email)
        let errorMessage = 'Registration failed. Please check your details.';
        
        if (data.phone_number) errorMessage = `Phone Number: ${data.phone_number[0]}`;
        else if (data.email) errorMessage = `Email: ${data.email[0]}`;
        else if (data.username) errorMessage = `Username: ${data.username[0]}`;
        else if (data.detail) errorMessage = data.detail;
        // If it's a complex object, stringify it so we can read it
        else if (typeof data === 'object') errorMessage = Object.values(data).join(' | ');

        throw new Error(errorMessage);
      }

      // 5. Trigger the Success UI!
      setSuccess(true);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-10 rounded-3xl shadow-xl max-w-md w-full text-center border border-gray-100">
          <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Account Created!</h2>
          <p className="text-gray-500 mb-8">Your buyer account is ready. You can now submit bulk supply requests to the Blue Bridge network.</p>
          <Link href="/login" className="w-full py-4 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-colors flex items-center justify-center">
            Continue to Login <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex">
      
      {/* --- LEFT SIDE: Brand & Trust Signals (Hidden on mobile) --- */}
      <div className="hidden lg:flex lg:w-5/12 bg-gradient-to-br from-green-700 via-green-600 to-emerald-900 relative overflow-hidden flex-col justify-between p-12">
        {/* Abstract Watermarks */}
        <Leaf className="absolute -bottom-24 -left-24 w-[500px] h-[500px] text-white opacity-[0.05] transform rotate-12 pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-[0.05] pointer-events-none"></div>

        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-3 mb-16 inline-flex">
            <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center shadow-lg transform rotate-3">
              <Leaf className="h-6 w-6 text-green-600 -rotate-3" />
            </div>
            <span className="text-2xl font-extrabold text-white tracking-tight">
              BlueBridge
            </span>
          </Link>

          <h1 className="text-4xl font-extrabold text-white leading-tight mb-6">
            Secure your <br />
            <span className="text-green-200">agricultural supply chain.</span>
          </h1>
          <p className="text-green-100 text-lg max-w-md">
            Join hundreds of Ethiopian businesses sourcing verified, high-quality commodities directly from farmers.
          </p>
        </div>

        <div className="relative z-10 space-y-6">
          <div className="flex items-center text-green-50 bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
            <ShieldCheck className="h-8 w-8 text-green-300 mr-4 shrink-0" />
            <div>
              <h4 className="font-bold text-white">Verified Farmers</h4>
              <p className="text-sm text-green-200 mt-1">Every producer is vetted by our agents.</p>
            </div>
          </div>
          <div className="flex items-center text-green-50 bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
            <Briefcase className="h-8 w-8 text-green-300 mr-4 shrink-0" />
            <div>
              <h4 className="font-bold text-white">Escrow Protection</h4>
              <p className="text-sm text-green-200 mt-1">Your funds are safe until delivery.</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- RIGHT SIDE: Registration Form --- */}
      <div className="w-full lg:w-7/12 flex items-center justify-center p-8 sm:p-12 lg:p-16 overflow-y-auto">
        <div className="max-w-xl w-full">
          
          {/* Mobile Logo (Only shows on small screens) */}
          <Link href="/" className="flex lg:hidden items-center gap-3 mb-8">
            <div className="h-10 w-10 bg-green-600 rounded-xl flex items-center justify-center shadow-lg transform rotate-3">
              <Leaf className="h-6 w-6 text-white -rotate-3" />
            </div>
            <span className="text-2xl font-extrabold text-gray-900 tracking-tight">BlueBridge</span>
          </Link>

          <div className="mb-10">
            <h2 className="text-3xl font-extrabold text-gray-900">Create Buyer Account</h2>
            <p className="text-gray-500 mt-2">Already have an account? <Link href="/login" className="text-green-600 font-bold hover:underline">Log in here</Link></p>
          
          {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center text-red-700 text-sm font-bold">
                <span className="h-2 w-2 bg-red-500 rounded-full mr-3"></span>
                {error}
              </div>
            )}

          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* 1. Personal Information */}
            <div className="space-y-5">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-2">1. Personal Contact</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input required type="text" placeholder="e.g. Abebe Kebede" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-green-500 outline-none transition-all" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input required type="tel" placeholder="09..." className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-green-500 outline-none transition-all" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input required type="email" placeholder="abebe@company.com" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-green-500 outline-none transition-all" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                </div>
              </div>
            </div>

            {/* 2. Business Information */}
            <div className="space-y-5 pt-2">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-2">2. Business Profile</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Company / Business Name</label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input required type="text" placeholder="e.g. Blue Nile Mills" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-green-500 outline-none transition-all" value={formData.companyName} onChange={(e) => setFormData({...formData, companyName: e.target.value})} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Business Size</label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <select className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-green-500 outline-none transition-all appearance-none font-medium text-gray-700" value={formData.businessType} onChange={(e) => setFormData({...formData, businessType: e.target.value})}>
                      <option>Small Enterprise</option>
                      <option>Medium Enterprise</option>
                      <option>Large Corporation</option>
                      <option>Cooperative / Union</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Delivery Region / Address</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input required type="text" placeholder="e.g. Addis Ababa, Akaki Kality" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-green-500 outline-none transition-all" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
                </div>
              </div>
            </div>

            {/* 3. Security */}
            <div className="space-y-5 pt-2">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-2">3. Security</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input required type="password" placeholder="••••••••" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-green-500 outline-none transition-all" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input required type="password" placeholder="••••••••" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-green-500 outline-none transition-all" value={formData.confirmPassword} onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-4 bg-gray-900 text-white font-extrabold rounded-xl hover:bg-green-600 transition-colors shadow-lg flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : 'Create Buyer Account'}
              </button>
              <p className="text-center text-xs text-gray-500 mt-4 font-medium">
                By clicking "Create Buyer Account", you agree to the Blue Bridge <span className="text-green-600 cursor-pointer">Terms of Service</span> and <span className="text-green-600 cursor-pointer">Privacy Policy</span>.
              </p>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}