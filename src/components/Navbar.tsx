import React, { useState } from 'react';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-display font-bold text-emerald-600 tracking-tight">FlavorDash</span>
          </div>

          {/* Flipkart-like Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl relative">
            <div className="w-full relative">
              <input
                type="text"
                placeholder="Search for food, restaurants or cuisines"
                className="w-full bg-gray-100 border-none rounded-md py-2 pl-4 pr-10 focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all text-sm h-10 search-shadow"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-6">
            <button className="flex items-center space-x-1 text-gray-700 hover:text-emerald-600 font-medium transition-colors">
              <User className="h-5 w-5" />
              <span>Login</span>
            </button>
            <button className="flex items-center space-x-1 text-gray-700 hover:text-emerald-600 font-medium transition-colors relative">
              <ShoppingCart className="h-5 w-5" />
              <span>Cart</span>
              <span className="absolute -top-2 -right-2 bg-emerald-600 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">0</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500 hover:text-emerald-600 p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar (Visible only on mobile) */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for food..."
            className="w-full bg-gray-100 border-none rounded-md py-2 pl-4 pr-10 focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all text-sm h-10"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-2">
          <div className="px-4 space-y-1">
            <button className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md">Login</button>
            <button className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md">Cart</button>
            <button className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md">Orders</button>
          </div>
        </div>
      )}
    </nav>
  );
};
