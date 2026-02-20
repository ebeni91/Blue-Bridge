import { useState, useEffect } from 'react';
import { Users, Shield, TrendingUp, Search, Bell } from 'lucide-react';
import { getAllUsers, updateUserRole } from '../api/admin';
import { toast } from 'sonner';

export function SuperAdminDashboard({ user }: { user: any }) {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (e) { toast.error("Failed to load users"); } 
    finally { setLoading(false); }
  };

  const handleChangeRole = async (userId: number, newRole: string) => {
    try {
      await updateUserRole(userId, newRole);
      toast.success("Role updated");
      loadUsers();
    } catch (e) { toast.error("Update failed"); }
  };

  return (
    <div className="min-h-screen bg-gray-50 -m-8 p-8"> {/* Negative margin to break container constraints if needed */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-purple-900">Super Admin Portal</h1>
          <p className="text-purple-600">System Overview & User Control</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-purple-100 flex items-center gap-2">
          <Shield className="w-5 h-5 text-purple-600" />
          <span className="font-bold text-gray-700">{user.name}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-purple-500">
          <div className="flex justify-between">
             <div>
                <p className="text-gray-500 text-sm font-bold uppercase">Total Users</p>
                <h3 className="text-3xl font-bold text-gray-900">{users.length}</h3>
             </div>
             <div className="p-3 bg-purple-50 rounded-xl"><Users className="w-6 h-6 text-purple-600"/></div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-indigo-500">
           <div className="flex justify-between">
             <div>
                <p className="text-gray-500 text-sm font-bold uppercase">System Status</p>
                <h3 className="text-3xl font-bold text-green-600">Healthy</h3>
             </div>
             <div className="p-3 bg-indigo-50 rounded-xl"><TrendingUp className="w-6 h-6 text-indigo-600"/></div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-bold text-lg text-gray-800">User Management Database</h3>
          <span className="bg-purple-100 text-purple-800 text-xs font-bold px-3 py-1 rounded-full">{users.length} Accounts</span>
        </div>
        
        {loading ? <div className="p-8 text-center text-gray-500">Loading Users...</div> : (
          <table className="w-full text-left text-sm">
            <thead className="bg-purple-50 text-purple-900 uppercase text-xs font-bold">
              <tr>
                <th className="p-4">User</th>
                <th className="p-4">Role</th>
                <th className="p-4">Contact</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map(u => (
                <tr key={u.id} className="hover:bg-gray-50">
                  <td className="p-4 font-medium">{u.full_name}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                      u.role === 'superadmin' ? 'bg-purple-100 text-purple-700' :
                      u.role === 'admin' ? 'bg-emerald-100 text-emerald-700' :
                      u.role === 'agent' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>{u.role}</span>
                  </td>
                  <td className="p-4 text-gray-500">{u.phone_number}</td>
                  <td className="p-4 text-right">
                    {u.role !== 'superadmin' && (
                      <select 
                        value={u.role} 
                        onChange={(e) => handleChangeRole(u.id, e.target.value)}
                        className="bg-white border border-gray-300 rounded px-2 py-1 text-xs"
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
        )}
      </div>
    </div>
  );
}