import { ArrowLeft, Truck, MapPin, Clock, Package, DollarSign } from 'lucide-react';

interface ShippingInfoProps {
  onBack: () => void;
}

export function ShippingInfo({ onBack }: ShippingInfoProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        Back
      </button>

      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-emerald-900 mb-4">Shipping Information</h1>
        <p className="text-emerald-700 mb-8">
          Everything you need to know about shipping and delivery
        </p>

        <div className="space-y-6">
          <section className="border-b border-gray-200 pb-6">
            <div className="flex gap-4 mb-4">
              <div className="bg-emerald-100 p-3 rounded-lg h-fit">
                <Truck className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-emerald-900 mb-2">Delivery Options</h3>
                <div className="space-y-3 text-gray-700">
                  <div>
                    <p className="font-medium">Standard Delivery (2-5 business days)</p>
                    <p>Available nationwide. Perfect for most orders.</p>
                    <p className="text-emerald-600">Free for orders over 500 ETB</p>
                  </div>
                  <div>
                    <p className="font-medium">Express Delivery (1-2 business days)</p>
                    <p>Available in Addis Ababa and major cities.</p>
                    <p className="text-emerald-600">Additional 50 ETB</p>
                  </div>
                  <div>
                    <p className="font-medium">Same-Day Delivery</p>
                    <p>Available in Addis Ababa for orders placed before 2 PM.</p>
                    <p className="text-emerald-600">Additional 100 ETB</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="border-b border-gray-200 pb-6">
            <div className="flex gap-4 mb-4">
              <div className="bg-emerald-100 p-3 rounded-lg h-fit">
                <MapPin className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-emerald-900 mb-2">Delivery Coverage</h3>
                <p className="text-gray-700 mb-3">
                  We deliver to all regions of Ethiopia:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li><strong>Addis Ababa:</strong> All sub-cities and surrounding areas</li>
                  <li><strong>Major Cities:</strong> Dire Dawa, Bahir Dar, Hawassa, Mekelle, Gondar, Adama</li>
                  <li><strong>Regional Areas:</strong> All regions with extended delivery times</li>
                  <li><strong>Rural Areas:</strong> Special arrangements available</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="border-b border-gray-200 pb-6">
            <div className="flex gap-4 mb-4">
              <div className="bg-emerald-100 p-3 rounded-lg h-fit">
                <DollarSign className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-emerald-900 mb-2">Shipping Costs</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-gray-700 mt-3">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left">Location</th>
                        <th className="px-4 py-2 text-left">Standard</th>
                        <th className="px-4 py-2 text-left">Express</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t">
                        <td className="px-4 py-2">Addis Ababa</td>
                        <td className="px-4 py-2">30 ETB</td>
                        <td className="px-4 py-2">50 ETB</td>
                      </tr>
                      <tr className="border-t">
                        <td className="px-4 py-2">Major Cities</td>
                        <td className="px-4 py-2">50 ETB</td>
                        <td className="px-4 py-2">100 ETB</td>
                      </tr>
                      <tr className="border-t">
                        <td className="px-4 py-2">Regional Areas</td>
                        <td className="px-4 py-2">75 ETB</td>
                        <td className="px-4 py-2">Not Available</td>
                      </tr>
                      <tr className="border-t">
                        <td className="px-4 py-2">Rural Areas</td>
                        <td className="px-4 py-2">100 ETB</td>
                        <td className="px-4 py-2">Not Available</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-emerald-600 mt-3">
                  *Free shipping on all orders over 500 ETB within Addis Ababa
                </p>
              </div>
            </div>
          </section>

          <section className="border-b border-gray-200 pb-6">
            <div className="flex gap-4 mb-4">
              <div className="bg-emerald-100 p-3 rounded-lg h-fit">
                <Clock className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-emerald-900 mb-2">Processing and Delivery Times</h3>
                <p className="text-gray-700 mb-3">
                  <strong>Order Processing:</strong> Most orders are processed within 24 hours on business days.
                </p>
                <p className="text-gray-700 mb-3">
                  <strong>Fresh Produce:</strong> Orders for fresh vegetables, fruits, and perishables are prioritized and typically ship the same day if ordered before 2 PM.
                </p>
                <p className="text-gray-700">
                  <strong>Business Days:</strong> Monday through Saturday, excluding public holidays.
                </p>
              </div>
            </div>
          </section>

          <section className="border-b border-gray-200 pb-6">
            <div className="flex gap-4 mb-4">
              <div className="bg-emerald-100 p-3 rounded-lg h-fit">
                <Package className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-emerald-900 mb-2">Packaging and Handling</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>All products are carefully packaged to ensure freshness and prevent damage</li>
                  <li>Fresh produce is packed with cooling materials when necessary</li>
                  <li>Fragile items receive extra protective packaging</li>
                  <li>We use eco-friendly packaging materials whenever possible</li>
                  <li>All packages are sealed and labeled with care instructions</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <div className="flex gap-4 mb-4">
              <div className="bg-emerald-100 p-3 rounded-lg h-fit">
                <Truck className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-emerald-900 mb-2">Order Tracking</h3>
                <p className="text-gray-700 mb-3">
                  Track your order every step of the way:
                </p>
                <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                  <li>Receive order confirmation email immediately after purchase</li>
                  <li>Get shipping notification with tracking number when order ships</li>
                  <li>Track your package in real-time through your account</li>
                  <li>Receive delivery confirmation when your order arrives</li>
                </ol>
              </div>
            </div>
          </section>

          <div className="mt-8 bg-emerald-50 p-6 rounded-xl">
            <h3 className="text-emerald-900 mb-2">Need Help with Shipping?</h3>
            <p className="text-emerald-700 mb-4">
              Contact our customer service team for any shipping-related questions
            </p>
            <div className="flex gap-4">
              <a
                href="tel:+251911234567"
                className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Call Us
              </a>
              <a
                href="mailto:shipping@bluebridge.et"
                className="bg-white text-emerald-600 px-6 py-2 rounded-lg border-2 border-emerald-600 hover:bg-emerald-50 transition-colors"
              >
                Email Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
