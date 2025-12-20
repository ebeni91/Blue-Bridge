import { ArrowLeft } from 'lucide-react';

interface TermsConditionsProps {
  onBack: () => void;
}

export function TermsConditions({ onBack }: TermsConditionsProps) {
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
        <h1 className="text-emerald-900 mb-4">Terms & Conditions</h1>
        <p className="text-gray-500 mb-8">Last updated: December 8, 2025</p>

        <div className="space-y-6 text-gray-700">
          <section>
            <h3 className="text-emerald-900 mb-3">1. Acceptance of Terms</h3>
            <p>
              By accessing and using Blue Bridge, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our platform.
            </p>
          </section>

          <section>
            <h3 className="text-emerald-900 mb-3">2. User Accounts</h3>
            <p>
              To use certain features of our platform, you must register for an account. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate, current, and complete.
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>You are responsible for safeguarding your account password</li>
              <li>You must be at least 18 years old to create an account</li>
              <li>One person or entity may not maintain more than one account</li>
              <li>You are responsible for all activities that occur under your account</li>
            </ul>
          </section>

          <section>
            <h3 className="text-emerald-900 mb-3">3. Product Listings and Transactions</h3>
            <p>
              Blue Bridge connects farmers and agricultural product sellers with buyers. We strive to ensure accuracy in product listings, but we do not guarantee the accuracy, completeness, or reliability of any product descriptions.
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>All prices are listed in Ethiopian Birr (ETB)</li>
              <li>Product availability is subject to change</li>
              <li>Sellers are responsible for accurate product descriptions</li>
              <li>Transactions are binding once confirmed</li>
            </ul>
          </section>

          <section>
            <h3 className="text-emerald-900 mb-3">4. Swap Marketplace</h3>
            <p>
              The swap feature allows users to exchange products of equivalent value. Users are responsible for:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Accurately representing their products and their value</li>
              <li>Meeting all agreed-upon exchange terms</li>
              <li>Ensuring products are in the condition described</li>
              <li>Coordinating exchange logistics with the other party</li>
            </ul>
          </section>

          <section>
            <h3 className="text-emerald-900 mb-3">5. Payment Terms</h3>
            <p>
              We offer multiple payment methods including Cash on Delivery, Telebirr, and Bank Transfer. All payment processing is handled securely. Buyers agree to pay the full amount for products ordered.
            </p>
          </section>

          <section>
            <h3 className="text-emerald-900 mb-3">6. Delivery and Shipping</h3>
            <p>
              Delivery times and shipping costs vary based on location and product type. We work with reliable delivery partners to ensure timely delivery. Risk of loss and title for products pass to you upon delivery to the carrier.
            </p>
          </section>

          <section>
            <h3 className="text-emerald-900 mb-3">7. Prohibited Activities</h3>
            <p>You may not use our platform to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Sell illegal, counterfeit, or stolen products</li>
              <li>Engage in fraudulent activities</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Violate any laws or regulations</li>
              <li>Interfere with the proper functioning of the platform</li>
            </ul>
          </section>

          <section>
            <h3 className="text-emerald-900 mb-3">8. Intellectual Property</h3>
            <p>
              All content on Blue Bridge, including text, graphics, logos, and software, is the property of Blue Bridge or its content suppliers and is protected by Ethiopian and international copyright laws.
            </p>
          </section>

          <section>
            <h3 className="text-emerald-900 mb-3">9. Limitation of Liability</h3>
            <p>
              Blue Bridge acts as a platform connecting buyers and sellers. We are not liable for the quality, safety, or legality of products listed, the truth or accuracy of listings, or the ability of sellers to complete transactions.
            </p>
          </section>

          <section>
            <h3 className="text-emerald-900 mb-3">10. Modifications to Terms</h3>
            <p>
              We reserve the right to modify these terms at any time. We will notify users of any material changes. Your continued use of the platform after such modifications constitutes acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h3 className="text-emerald-900 mb-3">11. Contact Information</h3>
            <p>
              For questions about these Terms & Conditions, please contact us at:
            </p>
            <p className="mt-2">
              Email: legal@bluebridge.et<br />
              Phone: +251 911 234 567<br />
              Address: Bole Road, Addis Ababa, Ethiopia
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
