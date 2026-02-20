import { useState, useEffect } from 'react';
import { Users, Package, Plus, Upload } from 'lucide-react';
import { registerFarmer, getMyFarmers, addProduct, getMyListings } from '../api/agent';
import { toast } from 'sonner';

export function AgentDashboard() {
  const [activeTab, setActiveTab] = useState<'farmers' | 'products'>('farmers');
  const [farmers, setFarmers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [showFarmerForm, setShowFarmerForm] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);
  
  const [newFarmer, setNewFarmer] = useState({ full_name: '', phone_number: '', gender: 'Male', national_id: '', location: '' });
  const [newProduct, setNewProduct] = useState({ 
    name: '', amharic_name: '', category: 'Grains', quantity: 0, unit: 'kg', quality: 'Grade A', 
    ask_price: 0, description: '', farmer_unique_id: '', image_url: '' 
  });

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      setFarmers(await getMyFarmers());
      setProducts(await getMyListings());
    } catch (e) { console.error(e); }
  };

  const handleRegisterFarmer = async (e: React.FormEvent) => {
    e.preventDefault();
    try { await registerFarmer(newFarmer); toast.success("Farmer Registered"); setShowFarmerForm(false); loadData(); } 
    catch (e) { toast.error("Registration failed"); }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try { await addProduct(newProduct); toast.success("Product Listed"); setShowProductForm(false); loadData(); } 
    catch (e) { toast.error("Failed to list product"); }
  };

  return (
    <div className="min-h-screen bg-gray-50 -m-8 p-8">
      <h1 className="text-3xl font-bold text-blue-900 mb-8">Agent Workspace</h1>
      
      <div className="flex gap-4 mb-8">
        <button onClick={() => setActiveTab('farmers')} className={`px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'farmers' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-gray-600'}`}>
           <div className="flex items-center gap-2"><Users className="w-5 h-5"/> My Farmers ({farmers.length})</div>
        </button>
        <button onClick={() => setActiveTab('products')} className={`px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'products' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-gray-600'}`}>
           <div className="flex items-center gap-2"><Package className="w-5 h-5"/> My Listings ({products.length})</div>
        </button>
      </div>

      {activeTab === 'farmers' ? (
        <div>
          <button onClick={() => setShowFarmerForm(!showFarmerForm)} className="mb-6 flex gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-bold"><Plus className="w-5 h-5"/> Register Farmer</button>
          {showFarmerForm && (
            <div className="bg-white p-6 rounded-2xl mb-8 shadow-sm">
              <form onSubmit={handleRegisterFarmer} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input placeholder="Name" required className="p-3 border rounded" value={newFarmer.full_name} onChange={e => setNewFarmer({...newFarmer, full_name: e.target.value})} />
                <input placeholder="Phone" required className="p-3 border rounded" value={newFarmer.phone_number} onChange={e => setNewFarmer({...newFarmer, phone_number: e.target.value})} />
                <input placeholder="National ID" required className="p-3 border rounded" value={newFarmer.national_id} onChange={e => setNewFarmer({...newFarmer, national_id: e.target.value})} />
                <input placeholder="Location" required className="p-3 border rounded" value={newFarmer.location} onChange={e => setNewFarmer({...newFarmer, location: e.target.value})} />
                <button type="submit" className="col-span-2 bg-blue-600 text-white py-2 rounded font-bold">Submit</button>
              </form>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {farmers.map((f: any) => (
              <div key={f.id} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                <h3 className="font-bold">{f.full_name}</h3>
                <p className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded inline-block mt-1">{f.farmer_unique_id}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
           <button onClick={() => setShowProductForm(!showProductForm)} className="mb-6 flex gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-bold"><Upload className="w-5 h-5"/> List Product</button>
           {showProductForm && (
            <div className="bg-white p-6 rounded-2xl mb-8 shadow-sm">
               <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <select className="col-span-2 p-3 border rounded" value={newProduct.farmer_unique_id} onChange={e => setNewProduct({...newProduct, farmer_unique_id: e.target.value})}>
                   <option value="">Select Farmer</option>
                   {farmers.map((f: any) => <option key={f.id} value={f.farmer_unique_id}>{f.full_name}</option>)}
                 </select>
                 <input placeholder="Product Name" required className="p-3 border rounded" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} />
                 <input placeholder="Price" type="number" required className="p-3 border rounded" value={newProduct.ask_price} onChange={e => setNewProduct({...newProduct, ask_price: parseFloat(e.target.value)})} />
                 <input placeholder="Qty" type="number" required className="p-3 border rounded" value={newProduct.quantity} onChange={e => setNewProduct({...newProduct, quantity: parseFloat(e.target.value)})} />
                 <textarea placeholder="Description" className="col-span-2 p-3 border rounded" value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} />
                 <button type="submit" className="col-span-2 bg-blue-600 text-white py-2 rounded font-bold">List Product</button>
               </form>
            </div>
           )}
           <div className="space-y-4">
             {products.map((p: any) => (
               <div key={p.id} className="bg-white p-4 rounded-xl border border-gray-100 flex justify-between items-center">
                 <div><h4 className="font-bold">{p.name}</h4><p className="text-sm text-gray-500">{p.quantity} {p.unit}</p></div>
                 <span className={`text-xs px-2 py-1 rounded-full uppercase font-bold ${p.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{p.status}</span>
               </div>
             ))}
           </div>
        </div>
      )}
    </div>
  );
}