import { useState, useEffect } from 'react';
import { Package, Check, X, AlertCircle } from 'lucide-react';
import { getPendingProducts, updateProductStatus } from '../api/admin';
import { toast } from 'sonner';

export function AdminDashboard({ user }: { user: any }) {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try { setProducts(await getPendingProducts()); } 
    catch (e) { toast.error("Error loading"); } 
    finally { setLoading(false); }
  };

  const handleAction = async (id: number, action: 'approved' | 'rejected', price?: number) => {
    try {
      await updateProductStatus(id, action, price);
      toast.success(`Product ${action}`);
      loadData();
    } catch (e) { toast.error("Action failed"); }
  };

  return (
    <div className="min-h-screen bg-gray-50 -m-8 p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-emerald-900">Admin Console</h1>
          <p className="text-emerald-600">Product Moderation Queue</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
         <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-yellow-500">
            <div className="flex justify-between">
              <div><p className="text-gray-500 font-bold text-sm">Pending Review</p><h3 className="text-3xl font-bold">{products.length}</h3></div>
              <div className="p-3 bg-yellow-50 rounded-xl"><AlertCircle className="text-yellow-600"/></div>
            </div>
         </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-100"><h3 className="font-bold">Pending Products</h3></div>
        {loading ? <div className="p-8">Loading...</div> : products.length === 0 ? <div className="p-8 text-center text-gray-500">All caught up!</div> : (
          <table className="w-full text-left text-sm">
            <thead className="bg-emerald-50 text-emerald-900 uppercase text-xs font-bold">
              <tr><th className="p-4">Product</th><th className="p-4">Farmer</th><th className="p-4">Price</th><th className="p-4 text-right">Decision</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map(p => (
                <tr key={p.id}>
                  <td className="p-4 font-bold">{p.name}</td>
                  <td className="p-4 text-gray-600">ID: {p.farmer_id}</td>
                  <td className="p-4 font-bold text-emerald-700">{p.ask_price} ETB</td>
                  <td className="p-4 text-right flex justify-end gap-2">
                    <button onClick={() => handleAction(p.id, 'rejected')} className="p-2 text-red-600 bg-red-50 rounded hover:bg-red-100"><X className="w-4 h-4"/></button>
                    <button onClick={() => handleAction(p.id, 'approved', Math.ceil(p.ask_price * 1.1))} className="px-3 py-2 bg-emerald-600 text-white rounded font-bold hover:bg-emerald-700">Approve</button>
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