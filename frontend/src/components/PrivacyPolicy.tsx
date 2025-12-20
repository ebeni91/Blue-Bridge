import { ArrowLeft } from 'lucide-react';

interface PrivacyPolicyProps {
  onBack: () => void;
}

export function PrivacyPolicy({ onBack }: PrivacyPolicyProps) {
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
        <h1 className="text-emerald-900 mb-4">Privacy Policy</h1>
        <p className="text-gray-500 mb-8">Last updated: December 8, 2025</p>

        <div className="space-y-6 text-gray-700">
          <section>
            <h3 className="text-emerald-900 mb-3">1. Introduction</h3>
            <p>
              Blue Bridge ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our agricultural e-commerce platform.
            </p>
          </section>

          <section>
            <h3 className="text-emerald-900 mb-3">2. Information We Collect</h3>
            
            <h4 className="text-emerald-800 mb-2 mt-4">Personal Information</h4>
            <p>When you register for an account, we collect:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Full name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Date of birth</li>
              <li>Sex</li>
              <li>National ID number</li>
              <li>Delivery address</li>
            </ul>

            <h4 className="text-emerald-800 mb-2 mt-4">Transaction Information</h4>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Purchase history</li>
              <li>Payment method details (securely encrypted)</li>
              <li>Shipping and delivery information</li>
              <li>Swap exchange details</li>
            </ul>

            <h4 className="text-emerald-800 mb-2 mt-4">Usage Information</h4>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Browsing activity on our platform</li>
              <li>Search queries</li>
              <li>Products viewed and favorited</li>
              <li>AI assistant interactions</li>
              <li>Device information and IP address</li>
            </ul>
          </section>

          <section>
            <h3 className="text-emerald-900 mb-3">3. How We Use Your Information</h3>
            <p>We use collected information to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Process and fulfill your orders</li>
              <li>Facilitate swap exchanges between users</li>
              <li>Provide customer support and respond to inquiries</li>
              <li>Send order confirmations and shipping updates</li>
              <li>Improve our platform and user experience</li>
              <li>Personalize product recommendations</li>
              <li>Detect and prevent fraud</li>
              <li>Comply with legal obligations</li>
              <li>Send promotional offers (with your consent)</li>
            </ul>
          </section>

          <section>
            <h3 className="text-emerald-900 mb-3">4. Information Sharing and Disclosure</h3>
            <p>We may share your information with:</p>
            
            <h4 className="text-emerald-800 mb-2 mt-4">Sellers and Farmers</h4>
            <p>We share necessary delivery information with sellers to fulfill your orders.</p>

            <h4 className="text-emerald-800 mb-2 mt-4">Delivery Partners</h4>
            <p>We share delivery addresses and contact information with our shipping partners.</p>

            <h4 className="text-emerald-800 mb-2 mt-4">Payment Processors</h4>
            <p>We work with secure payment processors (Telebirr, banks) to process transactions.</p>

            <h4 className="text-emerald-800 mb-2 mt-4">Legal Requirements</h4>
            <p>We may disclose information if required by law or to protect our rights and safety.</p>

            <p className="mt-4">
              <strong>We do not sell your personal information to third parties.</strong>
            </p>
          </section>

          <section>
            <h3 className="text-emerald-900 mb-3">5. Data Security</h3>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Encryption of sensitive data</li>
              <li>Secure server infrastructure</li>
              <li>Regular security audits</li>
              <li>Access controls and authentication</li>
              <li>Employee confidentiality agreements</li>
            </ul>
          </section>

          <section>
            <h3 className="text-emerald-900 mb-3">6. Your Rights and Choices</h3>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong>Access:</strong> Request a copy of your personal information</li>
              <li><strong>Correction:</strong> Update or correct your information</li>
              <li><strong>Deletion:</strong> Request deletion of your account and data</li>
              <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
              <li><strong>Data Portability:</strong> Receive your data in a structured format</li>
            </ul>
            <p className="mt-4">
              To exercise these rights, contact us at privacy@bluebridge.et
            </p>
          </section>

          <section>
            <h3 className="text-emerald-900 mb-3">7. Cookies and Tracking</h3>
            <p>
              We use cookies and similar tracking technologies to enhance your experience, analyze usage patterns, and personalize content. You can control cookies through your browser settings.
            </p>
          </section>

          <section>
            <h3 className="text-emerald-900 mb-3">8. Children's Privacy</h3>
            <p>
              Our platform is not intended for users under 18 years of age. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
            </p>
          </section>

          <section>
            <h3 className="text-emerald-900 mb-3">9. International Data Transfers</h3>
            <p>
              Your information may be transferred to and processed in countries other than Ethiopia. We ensure appropriate safeguards are in place to protect your data during such transfers.
            </p>
          </section>

          <section>
            <h3 className="text-emerald-900 mb-3">10. Changes to This Privacy Policy</h3>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on our platform and updating the "Last updated" date.
            </p>
          </section>

          <section>
            <h3 className="text-emerald-900 mb-3">11. Contact Us</h3>
            <p>
              If you have questions or concerns about this Privacy Policy or our data practices, please contact us:
            </p>
            <p className="mt-2">
              Email: privacy@bluebridge.et<br />
              Phone: +251 911 234 567<br />
              Address: Bole Road, Addis Ababa, Ethiopia
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
