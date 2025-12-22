import { useState, useEffect } from 'react';
import { 
  Check, X, Users, Package, Shield, LayoutDashboard, 
  Search, Bell, LogOut, TrendingUp 
} from 'lucide-react';
import { getPendingProducts, updateProductStatus, getAllUsers, updateUserRole } from '../api/admin';
import { toast } from 'sonner';

interface AdminDashboardProps {
  user: any;
}

export function AdminDashboard({ user }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'approvals' | 'users'>('overview');
  const [pendingProducts, setPendingProducts] = useState<any[]>([]);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const isSuperAdmin = user?.role === 'superadmin';

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    setLoading(true);
    try {
      // 1. Load Pending Products (Everyone sees this)
      if (activeTab === 'approvals' || activeTab === 'overview') {
        const products = await getPendingProducts();
        setPendingProducts(products);
      }
      
      // 2. Load Users (Superadmin Only)
      if (isSuperAdmin && (activeTab === 'users' || activeTab === 'overview')) {
        const users = await getAllUsers();
        setAllUsers(users);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveProduct = async (product: any) => {
    const finalPrice = Math.ceil(product.ask_price * 1.1); // +10% Margin
    try {
      await updateProductStatus(product.id, 'approved', finalPrice);
      toast.success(`${product.name} Approved!`);
      loadData();
    } catch (e) { toast.error("Failed to approve"); }
  };

  const handleRejectProduct = async (id: number) => {
    if(!confirm("Reject this product?")) return;
    try {
      await updateProductStatus(id, 'rejected');
      toast.success("Product Rejected");
      loadData();
    } catch (e) { toast.error("Failed to reject"); }
  };

  const handleChangeRole = async (userId: number, newRole: string) => {
    try {
      await updateUserRole(userId, newRole);
      toast.success("Role updated successfully");
      loadData();
    } catch (e) { toast.error("Failed to update role"); }
  };

  // --- SUB-COMPONENTS ---

  const SidebarItem = ({ id, icon: Icon, label }: any) => (
    <button 
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
        activeTab === id 
        ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' 
        : 'text-gray-500 hover:bg-emerald-50 hover:text-emerald-700'
      }`}
    >
      <Icon className="w-5 h-5" />
      {label}
    </button>
  );

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      
      {/* 1. SIDEBAR */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col fixed h-full z-10">
        <div className="flex items-center gap-2 mb-10 text-emerald-800">
          <Shield className="w-8 h-8" />
          <div>
            <h1 className="font-bold text-lg leading-tight">Blue Bridge</h1>
            <p className="text-xs text-emerald-600 font-medium tracking-wide">ADMIN PORTAL</p>
          </div>
        </div>

        <nav className="space-y-2 flex-1">
          <SidebarItem id="overview" icon={LayoutDashboard} label="Overview" />
          <SidebarItem id="approvals" icon={Package} label="Product Approvals" />
          
          {isSuperAdmin && (
            <>
              <div className="pt-4 pb-2">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider px-4">Super Admin</p>
              </div>
              <SidebarItem id="users" icon={Users} label="User Management" />
            </>
          )}
        </nav>

        <div className="pt-6 border-t border-gray-100">
          <div className="flex items-center gap-3 px-4 py-2">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold">
              {user.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-900 truncate">{user.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user.role}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* 2. MAIN CONTENT */}
      <main className="flex-1 ml-64 p-8">
        
        {/* HEADER */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 capitalize">{activeTab.replace('-', ' ')}</h2>
            <p className="text-gray-500">Welcome back, {user.name}</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-all">
              <Bell className="w-5 h-5" />
            </button>
            <button className="bg-white border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2">
              <Search className="w-4 h-4" /> Search...
            </button>
          </div>
        </header>

        {/* LOADING STATE */}
        {loading && (
          <div className="w-full h-64 flex items-center justify-center text-emerald-600">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-current"></div>
          </div>
        )}

        {/* --- VIEW: OVERVIEW --- */}
        {!loading && activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-yellow-100 text-yellow-700 rounded-lg">
                    <Package className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-green-600 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> Action Needed
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-gray-900">{pendingProducts.length}</h3>
                <p className="text-gray-500">Pending Products</p>
              </div>

              {isSuperAdmin && (
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-blue-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-blue-100 text-blue-700 rounded-lg">
                      <Users className="w-6 h-6" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900">{allUsers.length}</h3>
                  <p className="text-gray-500">Total Users</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* --- VIEW: APPROVALS --- */}
        {!loading && activeTab === 'approvals' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
             {pendingProducts.length === 0 ? (
               <div className="p-12 text-center text-gray-500">No products waiting for approval. Good job!</div>
             ) : (
               <table className="w-full text-left text-sm">
                 <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-bold tracking-wider">
                   <tr>
                     <th className="p-4">Product</th>
                     <th className="p-4">Farmer Info</th>
                     <th className="p-4">Price / Qty</th>
                     <th className="p-4 text-right">Actions</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-100">
                   {pendingProducts.map(p => (
                     <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                       <td className="p-4">
                         <div className="flex items-center gap-3">
                           <div className="w-10 h-10 bg-gray-100 rounded-lg overflow-hidden">
                             <img src={p.image_url || 'https://via.placeholder.com/40'} alt="" className="w-full h-full object-cover"/>
                           </div>
                           <div>
                             <p className="font-bold text-gray-900">{p.name}</p>
                             <p className="text-gray-500 text-xs">{p.category}</p>
                           </div>
                         </div>
                       </td>
                       <td className="p-4 text-gray-600">
                         <p>ID: {p.farmer_id}</p>
                         <p className="text-xs">{p.location || 'Ethiopia'}</p>
                       </td>
                       <td className="p-4">
                         <p className="font-bold text-emerald-700">ETB {p.ask_price}</p>
                         <p className="text-gray-500 text-xs">{p.quantity} {p.unit}</p>
                       </td>
                       <td className="p-4 text-right">
                         <div className="flex items-center justify-end gap-2">
                           <button 
                              onClick={() => handleRejectProduct(p.id)}
                              className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors" title="Reject">
                             <X className="w-5 h-5" />
                           </button>
                           <button 
                              onClick={() => handleApproveProduct(p)}
                              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs transition-colors shadow-md"
                           >
                             Approve
                           </button>
                         </div>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             )}
          </div>
        )}

        {/* --- VIEW: USERS (SUPERADMIN ONLY) --- */}
        {!loading && activeTab === 'users' && isSuperAdmin && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-bold tracking-wider">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4 text-right">Manage Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {allUsers.map(u => (
                  <tr key={u.id} className="hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                          {u.full_name?.charAt(0) || 'U'}
                        </div>
                        <span className="font-medium text-gray-900">{u.full_name}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${
                        u.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                        u.role === 'agent' ? 'bg-blue-100 text-blue-700' :
                        u.role === 'superadmin' ? 'bg-red-100 text-red-700' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="p-4 text-gray-600">{u.phone_number}</td>
                    <td className="p-4 text-right">
                      {u.role !== 'superadmin' && (
                        <select 
                          value={u.role}
                          onChange={(e) => handleChangeRole(u.id, e.target.value)}
                          className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs outline-none focus:border-emerald-500 cursor-pointer"
                        >
                          <option value="buyer">Buyer</option>
                          <option value="agent">Agent</option>
                          <option value="admin">Admin</option>
                        </select>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </main>
    </div>
  );
}