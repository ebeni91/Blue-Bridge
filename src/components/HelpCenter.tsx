import { ArrowLeft, Search, ShoppingCart, Package, CreditCard, Repeat2, MessageSquare, User } from 'lucide-react';

interface HelpCenterProps {
  onBack: () => void;
}

export function HelpCenter({ onBack }: HelpCenterProps) {
  const faqs = [
    {
      icon: ShoppingCart,
      question: 'How do I place an order?',
      answer: 'Browse our marketplace, click on a product, select quantity, and add to cart. Proceed to checkout, fill in delivery details, and choose your payment method.'
    },
    {
      icon: Package,
      question: 'What are the delivery times?',
      answer: 'Standard delivery takes 2-5 business days depending on your location. Express delivery (1-2 days) is available in major cities for an additional fee.'
    },
    {
      icon: CreditCard,
      question: 'What payment methods do you accept?',
      answer: 'We accept Cash on Delivery (COD), Telebirr, and Bank Transfer. All payment methods are secure and verified.'
    },
    {
      icon: Repeat2,
      question: 'How does the swap feature work?',
      answer: 'Create a swap offer by uploading your product, setting a value, and selecting a category. Browse other swap offers and propose exchanges with equivalent value products.'
    },
    {
      icon: MessageSquare,
      question: 'How do I use the AI Assistant?',
      answer: 'Click the chat icon to talk to our AI assistant. Ask questions about products, get recommendations, or find specific items. The AI can help you navigate the platform.'
    },
    {
      icon: User,
      question: 'How do I create an account?',
      answer: 'Click the user icon in the navigation bar, select "Register", and fill in your details including full name, email, password, date of birth, sex, and National ID number.'
    }
  ];

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
        <h1 className="text-emerald-900 mb-4">Help Center</h1>
        <p className="text-emerald-700 mb-8">
          Find answers to frequently asked questions and get help with using Blue Bridge
        </p>

        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for help..."
              className="w-full pl-12 pr-4 py-3 border-2 border-emerald-200 rounded-xl focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => {
            const Icon = faq.icon;
            return (
              <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
                <div className="flex gap-4">
                  <div className="bg-emerald-100 p-3 rounded-lg h-fit">
                    <Icon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-emerald-900 mb-2">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 bg-emerald-50 p-6 rounded-xl">
          <h3 className="text-emerald-900 mb-2">Still need help?</h3>
          <p className="text-emerald-700 mb-4">
            Contact our support team and we'll get back to you within 24 hours
          </p>
          <div className="flex gap-4">
            <a
              href="tel:+251911234567"
              className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Call Us
            </a>
            <a
              href="mailto:support@bluebridge.et"
              className="bg-white text-emerald-600 px-6 py-2 rounded-lg border-2 border-emerald-600 hover:bg-emerald-50 transition-colors"
            >
              Email Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
