import { useState } from 'react';
import { ArrowLeft, Check, CreditCard, Banknote, Smartphone } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutProps {
  cartItems: CartItem[];
  onBack: () => void;
  onOrderComplete: () => void;
}

type PaymentMethod = 'cod' | 'telebirr' | 'bank';

export function Checkout({ cartItems, onBack, onOrderComplete }: CheckoutProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    region: '',
    postalCode: '',
  });
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = 15;
  const total = subtotal + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderPlaced(true);
    setTimeout(() => {
      onOrderComplete();
    }, 3000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (orderPlaced) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <div className="bg-white rounded-2xl p-12 border-2 border-emerald-200">
          <div className="bg-emerald-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-emerald-600" />
          </div>
          <h1 className="text-emerald-900 mb-4">Order Placed Successfully!</h1>
          <p className="text-emerald-700 mb-2">
            Thank you for your order. We've received your order and will process it shortly.
          </p>
          <p className="text-emerald-600 mb-6">
            You will receive a confirmation email at {formData.email}
          </p>
          <div className="bg-emerald-50 rounded-xl p-6 mb-6">
            <p className="text-emerald-700 mb-2">Order Total</p>
            <p className="text-emerald-900">${total.toFixed(2)}</p>
            <p className="text-emerald-600 text-sm mt-2">
              Payment Method: {
                paymentMethod === 'cod' ? 'Cash on Delivery' :
                paymentMethod === 'telebirr' ? 'Telebirr' : 'Bank Transfer'
              }
            </p>
          </div>
          <p className="text-emerald-600 text-sm">Redirecting to homepage...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-emerald-700 hover:text-emerald-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to cart</span>
      </button>

      <div className="mb-8">
        <h1 className="text-emerald-900 mb-2">Checkout</h1>
        <p className="text-emerald-700">Complete your order</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Delivery Information */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-6 border-2 border-emerald-100">
              <h2 className="text-emerald-900 mb-6">Delivery Information</h2>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-emerald-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:outline-none focus:border-emerald-500"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-emerald-700 mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:outline-none focus:border-emerald-500"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-emerald-700 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:outline-none focus:border-emerald-500"
                    placeholder="+251 9XX XXX XXX"
                  />
                </div>

                <div>
                  <label className="block text-emerald-700 mb-2">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:outline-none focus:border-emerald-500"
                    placeholder="City"
                  />
                </div>

                <div>
                  <label className="block text-emerald-700 mb-2">Region/State *</label>
                  <input
                    type="text"
                    name="region"
                    value={formData.region}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:outline-none focus:border-emerald-500"
                    placeholder="Region"
                  />
                </div>

                <div>
                  <label className="block text-emerald-700 mb-2">Postal Code</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:outline-none focus:border-emerald-500"
                    placeholder="Postal Code"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-emerald-700 mb-2">Delivery Address *</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:outline-none focus:border-emerald-500"
                  placeholder="Street address, building, floor, etc."
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl p-6 border-2 border-emerald-100">
              <h2 className="text-emerald-900 mb-6">Payment Method</h2>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${
                    paymentMethod === 'cod'
                      ? 'border-emerald-600 bg-emerald-50'
                      : 'border-emerald-200 hover:border-emerald-300'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    paymentMethod === 'cod' ? 'border-emerald-600' : 'border-emerald-300'
                  }`}>
                    {paymentMethod === 'cod' && (
                      <div className="w-3 h-3 rounded-full bg-emerald-600"></div>
                    )}
                  </div>
                  <Banknote className="w-6 h-6 text-emerald-600" />
                  <div className="text-left flex-1">
                    <p className="text-emerald-900">Cash on Delivery</p>
                    <p className="text-emerald-600 text-sm">Pay when you receive your order</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('telebirr')}
                  className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${
                    paymentMethod === 'telebirr'
                      ? 'border-emerald-600 bg-emerald-50'
                      : 'border-emerald-200 hover:border-emerald-300'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    paymentMethod === 'telebirr' ? 'border-emerald-600' : 'border-emerald-300'
                  }`}>
                    {paymentMethod === 'telebirr' && (
                      <div className="w-3 h-3 rounded-full bg-emerald-600"></div>
                    )}
                  </div>
                  <Smartphone className="w-6 h-6 text-emerald-600" />
                  <div className="text-left flex-1">
                    <p className="text-emerald-900">Telebirr</p>
                    <p className="text-emerald-600 text-sm">Pay with Telebirr mobile wallet</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('bank')}
                  className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${
                    paymentMethod === 'bank'
                      ? 'border-emerald-600 bg-emerald-50'
                      : 'border-emerald-200 hover:border-emerald-300'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    paymentMethod === 'bank' ? 'border-emerald-600' : 'border-emerald-300'
                  }`}>
                    {paymentMethod === 'bank' && (
                      <div className="w-3 h-3 rounded-full bg-emerald-600"></div>
                    )}
                  </div>
                  <CreditCard className="w-6 h-6 text-emerald-600" />
                  <div className="text-left flex-1">
                    <p className="text-emerald-900">Bank Transfer</p>
                    <p className="text-emerald-600 text-sm">Direct bank transfer</p>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 border-2 border-emerald-200 sticky top-24">
              <h3 className="text-emerald-900 mb-4">Order Summary</h3>

              <div className="space-y-3 mb-4 pb-4 border-b border-emerald-100">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-emerald-700">
                      {item.name} x {item.quantity}
                    </span>
                    <span className="text-emerald-700">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-4 pb-4 border-b border-emerald-100">
                <div className="flex justify-between text-emerald-700">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-emerald-700">
                  <span>Delivery Fee</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between mb-6">
                <span className="text-emerald-900">Total</span>
                <span className="text-emerald-900">${total.toFixed(2)}</span>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl transition-all"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
