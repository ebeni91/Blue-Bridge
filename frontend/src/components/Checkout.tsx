import { useState } from 'react';
import { ArrowLeft, CreditCard, Truck, CheckCircle } from 'lucide-react';
import { CartItem } from '../types';
import { placeOrder } from '../api/orders';
import { toast } from 'sonner';

interface CheckoutProps {
  cartItems: CartItem[];
  onBack: () => void;
  onOrderComplete: () => void;
}

export function Checkout({ cartItems, onBack, onOrderComplete }: CheckoutProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: ''
  });

  const total = cartItems.reduce((sum, item) => 
    sum + ((item.listing_price || item.ask_price) * item.quantity), 0
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Prepare Data for Backend
      const orderPayload = {
        items: cartItems.map(item => ({
          product_id: item.id,
          quantity: item.quantity
        })),
        shipping_name: formData.name,
        shipping_phone: formData.phone,
        shipping_address: formData.address,
        shipping_city: formData.city
      };

      // 2. Send to Backend
      await placeOrder(orderPayload);
      
      // 3. Success
      toast.success("Order placed successfully!");
      onOrderComplete();
      
    } catch (error) {
      console.error(error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      {/* Header */}
      <button onClick={onBack} className="flex items-center gap-2 text-gray-600 mb-6 hover:text-emerald-600 transition-colors">
        <ArrowLeft className="w-5 h-5" />
        Back to Cart
      </button>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Form Section */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-emerald-100 p-2 rounded-lg">
                <Truck className="w-5 h-5 text-emerald-600" />
              </div>
              <h2 className="font-bold text-lg">Shipping Details</h2>
            </div>
            
            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input 
                  required
                  type="text" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input 
                  required
                  type="tel" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input 
                  required
                  type="text" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  value={formData.address}
                  onChange={e => setFormData({...formData, address: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input 
                  required
                  type="text" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  value={formData.city}
                  onChange={e => setFormData({...formData, city: e.target.value})}
                />
              </div>
            </form>
          </div>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
            <h2 className="font-bold text-lg mb-4">Order Summary</h2>
            <div className="space-y-3 mb-6">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">{item.name} x {item.quantity}</span>
                  <span className="font-medium">ETB {((item.listing_price || item.ask_price) * item.quantity).toLocaleString()}</span>
                </div>
              ))}
              <div className="border-t border-gray-200 pt-3 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>ETB {total.toLocaleString()}</span>
              </div>
            </div>
            
            <button 
              form="checkout-form"
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? 'Processing...' : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Confirm Order
                </>
              )}
            </button>
            <p className="text-xs text-center text-gray-500 mt-4">
              Payment is Cash on Delivery (COD) for now.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}