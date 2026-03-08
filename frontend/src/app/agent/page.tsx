'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, Users, UserPlus, LogOut, Bell, Leaf,
  MapPin, Phone, Wheat, Award
} from 'lucide-react';

export default function AgentDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'overview' | 'my-farmers' | 'register'>('overview');
  
  const [farmers, setFarmers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [agentName, setAgentName] = useState('Agent');
  
  const [formData, setFormData] = useState({
    input_full_name: '', phone_number: '', region: '', primary_product: '', additional_products: ''
  });

  const fetchFarmers = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) return;
    try {
      const res = await fetch('http://localhost:8000/api/core/agent/farmers/', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setFarmers(await res.json());
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    if (role !== 'AGENT') {
      router.push('/login');
      return;
    }
    setAgentName(localStorage.getItem('userName') || 'Field Agent');
    fetchFarmers();
  }, [router]);

  const handleLogout = () => {
    localStorage.clear();
    router.push('/login');
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('accessToken');
    try {
      const res = await fetch('http://localhost:8000/api/core/agent/farmers/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        alert("Farmer successfully registered!");
        setFormData({ input_full_name: '', phone_number: '', region: '', primary_product: '', additional_products: '' });
        fetchFarmers();
        setActiveTab('my-farmers'); 
      } else {
        const error = await res.json();
        alert("Registration failed: " + JSON.stringify(error));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      
      {/* BRANDED SIDEBAR */}
      <aside className="w-72 bg-white border-r border-gray-100 flex flex-col hidden md:flex fixed h-screen z-20">
        <div className="h-24 flex items-center px-8 border-b border-gray-100">
          <div className="flex items-center gap-3 group">
            <div className="h-10 w-10 bg-green-600 rounded-xl flex items-center justify-center shadow-lg transform rotate-3 transition-transform">
              <Leaf className="h-6 w-6 text-white -rotate-3 transition-transform" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold text-gray-900 tracking-tight leading-tight">
                Blue<span className="text-green-600">Bridge</span>
              </span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Field Agent</span>
            </div>
          </div>
        </div>

        <div className="flex-1 py-8 px-4 flex flex-col gap-2">
          <button onClick={() => setActiveTab('overview')} className={`flex items-center px-4 py-3.5 rounded-2xl font-bold transition-all ${activeTab === 'overview' ? 'bg-green-600 text-white shadow-lg shadow-green-600/20' : 'text-gray-500 hover:bg-green-50 hover:text-green-700'}`}>
            <LayoutDashboard className="h-5 w-5 mr-3" /> Dashboard Overview
          </button>
          <button onClick={() => setActiveTab('my-farmers')} className={`flex items-center px-4 py-3.5 rounded-2xl font-bold transition-all ${activeTab === 'my-farmers' ? 'bg-green-600 text-white shadow-lg shadow-green-600/20' : 'text-gray-500 hover:bg-green-50 hover:text-green-700'}`}>
            <Users className="h-5 w-5 mr-3" /> My Farmers
          </button>
          <button onClick={() => setActiveTab('register')} className={`flex items-center px-4 py-3.5 rounded-2xl font-bold transition-all ${activeTab === 'register' ? 'bg-green-600 text-white shadow-lg shadow-green-600/20' : 'text-gray-500 hover:bg-green-50 hover:text-green-700'}`}>
            <UserPlus className="h-5 w-5 mr-3" /> Register Farmer
          </button>
        </div>
        <div className="p-4 border-t border-gray-100">
          <button onClick={handleLogout} className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-2xl font-bold transition-colors">
            <LogOut className="h-5 w-5 mr-3" /> Sign Out
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 ml-0 md:ml-72 flex flex-col min-h-screen">
        <header className="h-24 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-10">
          <h1 className="text-xl font-extrabold text-gray-900 capitalize">{activeTab.replace('-', ' ')}</h1>
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-green-600 transition-colors"><Bell className="h-6 w-6" /></button>
            <div className="h-10 w-10 bg-green-100 border-2 border-white shadow-sm rounded-full flex items-center justify-center text-green-700 font-extrabold">
              {agentName.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        <div className="flex-1 p-8">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl">
              <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-gray-900">Welcome, {agentName}</h1>
                <p className="text-gray-500 mt-1 font-medium">Here is your field operations summary.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard title="Farmers Onboarded" value={farmers.length.toString()} icon={Users} color="text-green-600" bg="bg-green-100" />
                <StatCard title="Regions Covered" value={new Set(farmers.map(f => f.region)).size.toString()} icon={MapPin} color="text-purple-600" bg="bg-purple-100" />
                <StatCard title="Total Trust Score" value="N/A" icon={Award} color="text-amber-600" bg="bg-amber-100" />
              </div>

              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 flex flex-col items-center justify-center text-center py-16">
                 <div className="h-20 w-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                   <UserPlus className="h-10 w-10 text-green-600" />
                 </div>
                 <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Expand Your Network</h2>
                 <p className="text-gray-500 max-w-md mb-8">Register verified farmers in your territory to connect them directly to bulk buyers on Blue Bridge.</p>
                 <button onClick={() => setActiveTab('register')} className="px-8 py-4 bg-green-600 text-white font-extrabold rounded-xl hover:bg-green-700 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                   Start Registration
                 </button>
              </div>
            </div>
          )}

          {/* TAB 2: MY FARMERS */}
          {activeTab === 'my-farmers' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-extrabold text-gray-900">My Registered Farmers</h2>
                <span className="px-4 py-2 bg-gray-100 text-gray-700 font-bold rounded-xl">{farmers.length} Total</span>
              </div>

              {loading ? (
                <p className="text-gray-500 font-bold">Loading your network...</p>
              ) : farmers.length === 0 ? (
                <div className="bg-white p-12 rounded-3xl border border-gray-100 text-center shadow-sm">
                  <p className="text-gray-500 mb-4 font-medium">You haven't registered any farmers yet.</p>
                  <button onClick={() => setActiveTab('register')} className="px-6 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700">Go to Registration</button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {farmers.map(farmer => (
                    <div key={farmer.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className="h-14 w-14 bg-green-50 rounded-full flex items-center justify-center text-green-700 font-extrabold text-2xl mb-4">
                        {farmer.full_name.charAt(0).toUpperCase()}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{farmer.full_name}</h3>
                      <div className="space-y-2 mb-6">
                        <p className="text-sm font-medium text-gray-500 flex items-center"><Phone className="h-4 w-4 mr-2 text-gray-400"/> {farmer.phone_number}</p>
                        <p className="text-sm font-medium text-gray-500 flex items-center"><MapPin className="h-4 w-4 mr-2 text-gray-400"/> {farmer.region}</p>
                      </div>
                      <div className="pt-4 border-t border-gray-50 flex gap-2">
                        <span className="px-3 py-1.5 bg-green-50 text-green-700 text-xs font-bold rounded-lg flex items-center"><Wheat className="h-3 w-3 mr-1"/>{farmer.primary_product}</span>
                        {farmer.additional_products && (
                          <span className="px-3 py-1.5 bg-gray-50 text-gray-600 text-xs font-bold rounded-lg">{farmer.additional_products}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: REGISTER NEW FARMER */}
          {activeTab === 'register' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl">
              <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-green-600 to-green-800 p-8 text-white">
                  <h2 className="text-2xl font-extrabold mb-2">Farmer Onboarding</h2>
                  <p className="text-green-100 font-medium">Verify and register a new farmer into the Blue Bridge network.</p>
                </div>
                
                <form onSubmit={handleRegister} className="p-8 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Full Name</label>
                      <input type="text" required placeholder="e.g. Abebe Kebede" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:bg-white transition-all font-medium" value={formData.input_full_name} onChange={(e) => setFormData({...formData, input_full_name: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Phone Number</label>
                      <input type="text" required placeholder="+251..." className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:bg-white transition-all font-medium" value={formData.phone_number} onChange={(e) => setFormData({...formData, phone_number: e.target.value})} />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Address / Region</label>
                      <input type="text" required placeholder="e.g. East Shewa, Oromia" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:bg-white transition-all font-medium" value={formData.region} onChange={(e) => setFormData({...formData, region: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Primary Crop</label>
                      <input type="text" required placeholder="e.g. Teff" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:bg-white transition-all font-medium" value={formData.primary_product} onChange={(e) => setFormData({...formData, primary_product: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Additional Crops</label>
                      <input type="text" placeholder="e.g. Wheat, Maize (Optional)" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:bg-white transition-all font-medium" value={formData.additional_products} onChange={(e) => setFormData({...formData, additional_products: e.target.value})} />
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-gray-100">
                    <button type="submit" className="w-full py-4 bg-green-600 text-white font-extrabold text-lg rounded-xl hover:bg-green-700 shadow-md hover:shadow-lg transition-all active:scale-95 flex justify-center items-center">
                      <UserPlus className="h-5 w-5 mr-2" /> Register & Activate Farmer
                    </button>
                    <p className="text-center text-xs text-gray-400 font-bold mt-4 uppercase tracking-wider">
                      Farmer will receive an SMS confirmation instantly.
                    </p>
                  </div>
                </form>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color, bg }: any) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-start justify-between group hover:shadow-md transition-shadow">
      <div><p className="text-sm font-bold text-gray-400 mb-2">{title}</p><p className={`text-4xl font-extrabold ${color}`}>{value}</p></div>
      <div className={`p-4 rounded-2xl ${bg}`}><Icon className={`h-6 w-6 ${color}`} /></div>
    </div>
  );
}