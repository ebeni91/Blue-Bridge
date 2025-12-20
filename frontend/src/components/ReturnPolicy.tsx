import { ArrowLeft, RefreshCw, CheckCircle, XCircle, Clock } from 'lucide-react';

interface ReturnPolicyProps {
  onBack: () => void;
}

export function ReturnPolicy({ onBack }: ReturnPolicyProps) {
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
        <h1 className="text-emerald-900 mb-4">Return & Refund Policy</h1>
        <p className="text-emerald-700 mb-8">
          Your satisfaction is our priority. Learn about our return and refund process.
        </p>

        <div className="space-y-6">
          <section className="border-b border-gray-200 pb-6">
            <div className="flex gap-4 mb-4">
              <div className="bg-emerald-100 p-3 rounded-lg h-fit">
                <Clock className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-emerald-900 mb-2">Return Window</h3>
                <p className="text-gray-700 mb-3">
                  You have <strong>7 days</strong> from the date of delivery to initiate a return for eligible products. Returns must be requested within this timeframe to qualify for a refund or exchange.
                </p>
              </div>
            </div>
          </section>

          <section className="border-b border-gray-200 pb-6">
            <div className="flex gap-4 mb-4">
              <div className="bg-emerald-100 p-3 rounded-lg h-fit">
                <CheckCircle className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-emerald-900 mb-2">Eligible for Return</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Products received damaged or defective</li>
                  <li>Wrong items delivered (different from what you ordered)</li>
                  <li>Seeds and equipment in original, unopened packaging</li>
                  <li>Non-perishable items in resalable condition</li>
                  <li>Items with manufacturing defects</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="border-b border-gray-200 pb-6">
            <div className="flex gap-4 mb-4">
              <div className="bg-emerald-100 p-3 rounded-lg h-fit">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-emerald-900 mb-2">Non-Returnable Items</h3>
                <p className="text-gray-700 mb-3">
                  The following items cannot be returned for health, safety, and quality reasons:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Fresh produce (vegetables, fruits)</li>
                  <li>Perishable items (eggs, dairy, meat)</li>
                  <li>Opened seed packages</li>
                  <li>Custom or personalized orders</li>
                  <li>Items marked as "Final Sale"</li>
                  <li>Products without original packaging or tags</li>
                </ul>
                <p className="text-emerald-600 mt-3">
                  *Exception: Fresh produce and perishables can be returned only if received damaged or spoiled upon delivery
                </p>
              </div>
            </div>
          </section>

          <section className="border-b border-gray-200 pb-6">
            <div className="flex gap-4 mb-4">
              <div className="bg-emerald-100 p-3 rounded-lg h-fit">
                <RefreshCw className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-emerald-900 mb-2">How to Return an Item</h3>
                <ol className="list-decimal pl-6 space-y-3 text-gray-700">
                  <li>
                    <strong>Contact Us:</strong> Reach out to our customer service within 7 days of delivery
                    <p className="text-sm mt-1">Email: returns@bluebridge.et or Call: +251 911 234 567</p>
                  </li>
                  <li>
                    <strong>Provide Details:</strong> Share your order number, reason for return, and photos if applicable
                  </li>
                  <li>
                    <strong>Receive Authorization:</strong> Our team will review and provide a Return Authorization Number (RAN)
                  </li>
                  <li>
                    <strong>Pack the Item:</strong> Securely pack the item in its original packaging with all tags and accessories
                  </li>
                  <li>
                    <strong>Ship or Schedule Pickup:</strong> Either ship the item back or we'll arrange pickup (based on the situation)
                  </li>
                  <li>
                    <strong>Refund Processing:</strong> Once we receive and inspect the return, we'll process your refund
                  </li>
                </ol>
              </div>
            </div>
          </section>

          <section className="border-b border-gray-200 pb-6">
            <h3 className="text-emerald-900 mb-4">Refund Methods & Timeline</h3>
            
            <div className="space-y-4 text-gray-700">
              <div>
                <p className="font-medium mb-2">Refund Methods:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>Cash on Delivery:</strong> Bank transfer to your account</li>
                  <li><strong>Telebirr:</strong> Refund to your Telebirr account</li>
                  <li><strong>Bank Transfer:</strong> Refund to the original account</li>
                </ul>
              </div>

              <div>
                <p className="font-medium mb-2">Processing Timeline:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Inspection: 1-2 business days after receiving the returned item</li>
                  <li>Refund Approval: Within 24 hours of inspection</li>
                  <li>Refund Credit: 3-7 business days depending on payment method</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="border-b border-gray-200 pb-6">
            <h3 className="text-emerald-900 mb-4">Exchanges</h3>
            <p className="text-gray-700 mb-3">
              We offer exchanges for defective or damaged items only. If you need a different size, quantity, or product, please:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-gray-700">
              <li>Return the original item following our return process</li>
              <li>Place a new order for the desired item</li>
            </ol>
            <p className="text-gray-700 mt-3">
              This ensures the fastest delivery of your replacement item.
            </p>
          </section>

          <section className="border-b border-gray-200 pb-6">
            <h3 className="text-emerald-900 mb-4">Damaged or Defective Items</h3>
            <p className="text-gray-700 mb-3">
              If you receive a damaged or defective item:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Contact us immediately (within 24 hours of delivery)</li>
              <li>Provide photos of the damage or defect</li>
              <li>Keep all packaging materials</li>
              <li>We'll arrange for pickup at no cost to you</li>
              <li>Priority processing for refund or replacement</li>
            </ul>
          </section>

          <section>
            <h3 className="text-emerald-900 mb-4">Cancellations</h3>
            <p className="text-gray-700 mb-3">
              <strong>Before Shipping:</strong> Orders can be cancelled free of charge before they ship. Contact us immediately if you need to cancel.
            </p>
            <p className="text-gray-700">
              <strong>After Shipping:</strong> Once an order has shipped, you'll need to follow our return process to receive a refund.
            </p>
          </section>

          <div className="mt-8 bg-emerald-50 p-6 rounded-xl">
            <h3 className="text-emerald-900 mb-2">Questions About Returns?</h3>
            <p className="text-emerald-700 mb-4">
              Our customer service team is here to help with any return or refund inquiries
            </p>
            <div className="flex gap-4">
              <a
                href="tel:+251911234567"
                className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Call Us
              </a>
              <a
                href="mailto:returns@bluebridge.et"
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
