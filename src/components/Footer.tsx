import { Sprout, Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail, HelpCircle } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-black text-slate-300 mt-16">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-2 rounded-xl">
                <Sprout className="w-6 h-6 text-white" />
              </div>
              <span className="text-white">AgriMarket</span>
            </div>
            <p className="text-slate-400 mb-6 text-sm leading-relaxed">
              Connecting Ethiopian farmers directly with consumers. Supporting local agriculture and ensuring fresh, quality produce for everyone.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="bg-slate-800 hover:bg-emerald-600 p-2 rounded-lg transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-slate-800 hover:bg-emerald-600 p-2 rounded-lg transition-all"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-slate-800 hover:bg-emerald-600 p-2 rounded-lg transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-slate-800 hover:bg-emerald-600 p-2 rounded-lg transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('marketplace')}
                  className="hover:text-emerald-400 transition-colors text-sm"
                >
                  Browse Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('swap')}
                  className="hover:text-emerald-400 transition-colors text-sm"
                >
                  Swap Marketplace
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('chat')}
                  className="hover:text-emerald-400 transition-colors text-sm"
                >
                  AI Voice Assistant
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('profile')}
                  className="hover:text-emerald-400 transition-colors text-sm"
                >
                  My Orders
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('favorites')}
                  className="hover:text-emerald-400 transition-colors text-sm"
                >
                  My Favorites
                </button>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => onNavigate('help-center')}
                  className="hover:text-emerald-400 transition-colors text-sm"
                >
                  Help Center
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('terms')}
                  className="hover:text-emerald-400 transition-colors text-sm"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('privacy')}
                  className="hover:text-emerald-400 transition-colors text-sm"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('shipping')}
                  className="hover:text-emerald-400 transition-colors text-sm"
                >
                  Shipping Information
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('return-policy')}
                  className="hover:text-emerald-400 transition-colors text-sm"
                >
                  Return Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-white mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <MapPin className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p>Bole Road, Addis Ababa</p>
                  <p>Ethiopia</p>
                </div>
              </li>
              <li className="flex gap-3">
                <Phone className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <a href="tel:+251911234567" className="text-sm hover:text-emerald-400 transition-colors">
                  +251 911 234 567
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <a href="mailto:info@agrimarket.et" className="text-sm hover:text-emerald-400 transition-colors">
                  info@agrimarket.et
                </a>
              </li>
            </ul>
            <div className="mt-4 text-xs text-slate-500">
              <p>Open: Mon - Sat</p>
              <p>8:00 AM - 6:00 PM EAT</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            © 2025 Blue Bridge. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:text-emerald-400 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-emerald-400 transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-emerald-400 transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>

      {/* Help Button */}
      <button
        onClick={() => onNavigate('help-center')}
        className="fixed bottom-6 left-6 bg-slate-800 hover:bg-slate-700 text-white p-3 rounded-full shadow-xl transition-all hover:scale-110 z-40"
        title="Help"
      >
        <HelpCircle className="w-5 h-5" />
      </button>
    </footer>
  );
}