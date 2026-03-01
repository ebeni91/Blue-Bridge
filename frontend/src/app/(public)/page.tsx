'use client';

import Link from 'next/link';
import { 
  Leaf, 
  ShieldCheck, 
  Truck, 
  ArrowRight, 
  ShoppingBag,
  TrendingUp,
  MapPin,
  Award
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      
      {/* --- PREMIUM PUBLIC NAVBAR --- */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-green-600 rounded-xl flex items-center justify-center shadow-lg transform rotate-3">
                <Leaf className="h-6 w-6 text-white -rotate-3" />
              </div>
              <span className="text-2xl font-extrabold text-gray-900 tracking-tight">
                Blue<span className="text-green-600">Bridge</span>
              </span>
            </div>
            
            {/* Desktop Navigation (Now with a faded green background) */}
            <div className="hidden md:flex items-center p-1 bg-green-50/70 border border-green-100/50 rounded-full shadow-inner">
              <Link href="/marketplace" className="text-sm font-bold text-green-800 hover:text-green-900 hover:bg-white hover:shadow-sm px-6 py-2.5 rounded-full transition-all duration-300">
                Marketplace
              </Link>
              <Link href="/farmers" className="text-sm font-bold text-green-800 hover:text-green-900 hover:bg-white hover:shadow-sm px-6 py-2.5 rounded-full transition-all duration-300">
                Farmers Network
              </Link>
              <Link href="/how-it-works" className="text-sm font-bold text-green-800 hover:text-green-900 hover:bg-white hover:shadow-sm px-6 py-2.5 rounded-full transition-all duration-300">
                How it Works
              </Link>
            </div>

            {/* Login & Sign Up Area */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link 
                href="/login" 
                className="hidden sm:block px-4 py-2.5 text-green-800 font-bold hover:text-green-600 transition-colors"
              >
                Log In
              </Link>
              <Link 
                href="/login" 
                className="px-6 py-2.5 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-all shadow-sm hover:shadow active:scale-95"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* --- EXPANDED PREMIUM HERO SECTION --- */}
      {/* Reduced top padding (pt-4 lg:pt-8) to pull the card higher up the page */}
      <div className="relative bg-white overflow-hidden font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12 lg:pt-8 lg:pb-24">
          
          {/* Increased internal padding (py-16 lg:py-24) to expand the card's height */}
          <div className="relative rounded-[3rem] bg-gradient-to-br from-green-700 via-green-600 to-emerald-900 px-8 py-16 sm:px-12 sm:py-20 lg:px-16 lg:py-28 shadow-2xl overflow-hidden">
            
            {/* Giant Background Watermarks */}
            <Leaf className="absolute -bottom-24 -right-24 w-[600px] h-[600px] text-white opacity-[0.07] transform -rotate-12 pointer-events-none" />
            <Leaf className="absolute top-0 left-0 w-[400px] h-[400px] text-emerald-950 opacity-[0.15] transform rotate-45 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('/grid.svg')] opacity-[0.05] pointer-events-none"></div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-10">
              
              {/* LEFT SIDE */}
              <div className="max-w-2xl">
                <span className="inline-block py-1.5 px-4 rounded-full bg-green-800/50 text-green-100 text-sm font-bold mb-6 border border-green-700/50 shadow-sm backdrop-blur-sm">
                  Ethiopia's Premier Agricultural Network
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6 leading-[1.1]">
                  Direct from the farm. <br />
                  <span className="text-green-200">
                    Guaranteed by trust.
                  </span>
                </h1>
                <p className="mt-4 text-lg text-green-100 mb-8 leading-relaxed max-w-lg">
                  Source high-quality Teff, Wheat, and Maize directly from verified Ethiopian farmers. Secure escrow payments and seamless logistics, all in one platform.
                </p>
              </div>

              {/* RIGHT SIDE */}
              <div className="flex flex-col items-start space-y-8 lg:pl-12">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                    Ready to trade?
                  </h2>
                  <p className="text-green-100 text-lg max-w-md">
                    Join thousands of buyers and farmers securing their supply chains through Blue Bridge.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  <Link 
                    href="/login" 
                    className="px-8 py-4 bg-white text-green-800 font-extrabold rounded-xl hover:bg-gray-50 transition-all shadow-xl hover:shadow-2xl active:scale-95 flex items-center justify-center"
                  >
                    Post an Order
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                  <Link 
                    href="/marketplace" 
                    className="px-8 py-4 bg-transparent border-2 border-green-200 text-white font-bold rounded-xl hover:bg-white/10 transition-all active:scale-95 flex items-center justify-center"
                  >
                    View Marketplace
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* --- UPGRADED VALUE PROPOSITION (TRUST SIGNALS) --- */}
      <div className="bg-white py-24 sm:py-32 relative overflow-hidden flex-grow border-t border-gray-100">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-green-50 blur-3xl opacity-70 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 rounded-full bg-emerald-50 blur-3xl opacity-70 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-green-600 font-extrabold tracking-widest uppercase text-sm mb-4">The Blue Bridge Standard</h2>
            <h3 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
              Uncompromising quality at every single step.
            </h3>
            <p className="text-xl text-gray-500 leading-relaxed">
              We've engineered a transparent, secure, and highly efficient agricultural pipeline straight from the soil to your facility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <PremiumFeatureCard 
              icon={ShieldCheck} 
              title="Verified Field Quality" 
              desc="Every batch is meticulously inspected, graded, and certified by our on-the-ground agents before it ever reaches the warehouse."
            />
            <PremiumFeatureCard 
              icon={ShoppingBag} 
              title="Secure Escrow Finance" 
              desc="Trade with zero anxiety. Your funds are held securely in escrow until delivery is confirmed and the product matches the promised grade."
            />
            <PremiumFeatureCard 
              icon={Truck} 
              title="Automated Logistics" 
              desc="No more calling dispatchers. We automatically assign vetted, reliable drivers to transport your bulk order directly to your door."
            />
          </div>
        </div>
      </div>

      {/* --- MEGA FOOTER --- */}
      <footer className="bg-[#0A1A10] text-white pt-24 pb-12 min-h-[70vh] flex flex-col justify-between relative overflow-hidden">
        
        <Leaf className="absolute -bottom-48 -left-24 w-[600px] h-[600px] text-green-950 opacity-40 transform -rotate-12 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          
          <div className="border-b border-gray-800 pb-16 mb-16 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
            <div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
                Transform your <span className="text-green-500">supply chain.</span>
              </h2>
              <p className="text-gray-400 text-xl max-w-xl">
                Join the network of modern buyers and farmers building the future of Ethiopian agriculture.
              </p>
            </div>
            <Link 
              href="/login" 
              className="px-10 py-5 bg-green-600 text-white font-extrabold text-lg rounded-2xl hover:bg-green-500 transition-all shadow-lg hover:shadow-green-900/50 shrink-0"
            >
              Join Blue Bridge Today
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
            <div>
              <h4 className="text-white font-bold text-lg mb-6">Platform</h4>
              <ul className="space-y-4 text-gray-400 font-medium">
                <li><Link href="/marketplace" className="hover:text-green-400 transition-colors">Marketplace</Link></li>
                <li><Link href="/farmers" className="hover:text-green-400 transition-colors">Farmer Directory</Link></li>
                <li><Link href="/pricing" className="hover:text-green-400 transition-colors">Pricing & Fees</Link></li>
                <li><Link href="/logistics" className="hover:text-green-400 transition-colors">Logistics Partners</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-lg mb-6">Resources</h4>
              <ul className="space-y-4 text-gray-400 font-medium">
                <li><Link href="#" className="hover:text-green-400 transition-colors">Commodity Prices</Link></li>
                <li><Link href="#" className="hover:text-green-400 transition-colors">Harvest Seasons Guide</Link></li>
                <li><Link href="#" className="hover:text-green-400 transition-colors">Quality Grading Standards</Link></li>
                <li><Link href="#" className="hover:text-green-400 transition-colors">Help Center</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-lg mb-6">Company</h4>
              <ul className="space-y-4 text-gray-400 font-medium">
                <li><Link href="#" className="hover:text-green-400 transition-colors">About Us</Link></li>
                <li><Link href="#" className="hover:text-green-400 transition-colors">Careers</Link></li>
                <li><Link href="#" className="hover:text-green-400 transition-colors">Press</Link></li>
                <li><Link href="#" className="hover:text-green-400 transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-lg mb-6">Legal</h4>
              <ul className="space-y-4 text-gray-400 font-medium">
                <li><Link href="#" className="hover:text-green-400 transition-colors">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-green-400 transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-green-400 transition-colors">Escrow Agreement</Link></li>
                <li><Link href="#" className="hover:text-green-400 transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800 text-sm text-gray-500 font-medium">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Leaf className="h-6 w-6 text-green-500" />
              <span className="text-xl font-bold tracking-tight text-white">BlueBridge</span>
            </div>
            <p>© 2026 Blue Bridge Agricultural Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}

function PremiumFeatureCard({ icon: Icon, title, desc }: any) {
  return (
    <div className="group bg-white p-10 rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl hover:border-green-100 transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
      <div className="absolute top-10 left-10 w-24 h-24 bg-green-100 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      
      <div className="relative z-10">
        <div className="h-16 w-16 bg-green-50 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-green-600 transition-all duration-300">
          <Icon className="h-8 w-8 text-green-600 group-hover:text-white transition-colors duration-300" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
        <p className="text-gray-500 leading-relaxed text-lg">{desc}</p>
      </div>
    </div>
  );
}