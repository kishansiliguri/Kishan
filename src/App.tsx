import React from 'react';
import { Navbar } from './components/Navbar';
import { HeroSlider } from './components/HeroSlider';
import { CategoryBar } from './components/CategoryBar';
import { FoodCard } from './components/FoodCard';
import { FOOD_ITEMS } from './constants';
import { motion } from 'motion/react';
import { ArrowRight, Instagram, Twitter, Facebook, Mail } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSlider />

        {/* Categories */}
        <CategoryBar />

        {/* Featured Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-display font-bold text-gray-900">Popular Dishes</h2>
              <p className="text-gray-500 mt-1">Our most loved meals by the community</p>
            </div>
            <button className="flex items-center space-x-2 text-emerald-600 font-bold hover:underline group">
              <span>View All</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {FOOD_ITEMS.map((item) => (
              <FoodCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        {/* Banner Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-emerald-600 rounded-3xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block">
              <img 
                src="https://picsum.photos/seed/food-promo/800/600" 
                alt="Promo" 
                className="w-full h-full object-cover opacity-80"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-transparent" />
            </div>
            
            <div className="p-12 lg:w-1/2 relative z-10">
              <span className="inline-block bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full mb-6 uppercase tracking-wider">
                Limited Time Offer
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
                Get Free Delivery on your first 3 orders!
              </h2>
              <p className="text-emerald-50 text-xl mb-8">
                Use code <span className="font-bold text-white underline">WELCOME50</span> at checkout.
              </p>
              <button className="bg-white text-emerald-600 px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:bg-gray-50 transition-colors">
                Claim Offer
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <span className="text-2xl font-display font-bold text-emerald-600 tracking-tight">FlavorDash</span>
              <p className="mt-4 text-gray-500 leading-relaxed">
                Bringing the best flavors from your favorite local restaurants right to your doorstep. Fast, fresh, and reliable.
              </p>
              <div className="flex space-x-4 mt-6">
                <button className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-emerald-600 hover:text-white transition-all">
                  <Instagram className="h-5 w-5" />
                </button>
                <button className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-emerald-600 hover:text-white transition-all">
                  <Twitter className="h-5 w-5" />
                </button>
                <button className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-emerald-600 hover:text-white transition-all">
                  <Facebook className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-6 uppercase text-sm tracking-widest">Company</h3>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-500 hover:text-emerald-600 transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-500 hover:text-emerald-600 transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-500 hover:text-emerald-600 transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-500 hover:text-emerald-600 transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-6 uppercase text-sm tracking-widest">Support</h3>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-500 hover:text-emerald-600 transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-500 hover:text-emerald-600 transition-colors">Safety Center</a></li>
                <li><a href="#" className="text-gray-500 hover:text-emerald-600 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-gray-500 hover:text-emerald-600 transition-colors">Privacy Policy</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-6 uppercase text-sm tracking-widest">Newsletter</h3>
              <p className="text-gray-500 mb-4">Subscribe to get special offers and news.</p>
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="w-full bg-gray-100 border-none rounded-xl py-3 pl-4 pr-12 focus:ring-2 focus:ring-emerald-500"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-emerald-600 text-white p-1.5 rounded-lg">
                  <Mail className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2024 FlavorDash. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" className="h-4 opacity-30 grayscale" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="h-4 opacity-30 grayscale" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1200px-PayPal.svg.png" alt="Paypal" className="h-4 opacity-30 grayscale" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
