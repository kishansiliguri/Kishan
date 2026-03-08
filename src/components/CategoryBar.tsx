import React from 'react';
import { CATEGORIES } from '@/src/constants';
import { motion } from 'motion/react';

export const CategoryBar = () => {
  return (
    <div className="bg-white border-b border-gray-100 py-6 overflow-x-auto hide-scrollbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8 md:justify-between min-w-max md:min-w-0">
          {CATEGORIES.map((category, index) => (
            <motion.button
              key={category.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex flex-col items-center space-y-2 group"
            >
              <div className="h-16 w-16 rounded-2xl bg-gray-50 flex items-center justify-center text-3xl group-hover:bg-emerald-50 group-hover:scale-110 transition-all shadow-sm group-hover:shadow-md">
                {category.icon}
              </div>
              <span className="text-sm font-semibold text-gray-600 group-hover:text-emerald-600 transition-colors">
                {category.name}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};
