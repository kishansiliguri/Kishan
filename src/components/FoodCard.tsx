import React from 'react';
import { Star, Clock, Plus } from 'lucide-react';
import { motion } from 'motion/react';
import { FoodItem } from '@/src/constants';

interface FoodCardProps {
  item: FoodItem;
}

export const FoodCard = ({ item }: FoodCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group transition-all hover:shadow-xl"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center space-x-1 shadow-sm">
          <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
          <span className="text-xs font-bold text-gray-800">{item.rating}</span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-display font-bold text-lg text-gray-900 leading-tight group-hover:text-emerald-600 transition-colors">
            {item.name}
          </h3>
          <span className="font-bold text-emerald-600 text-lg">${item.price.toFixed(2)}</span>
        </div>
        
        <p className="text-gray-500 text-sm line-clamp-2 mb-4 h-10">
          {item.description}
        </p>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
          <div className="flex items-center text-gray-400 space-x-1">
            <Clock className="h-4 w-4" />
            <span className="text-xs font-medium">{item.prepTime}</span>
          </div>
          
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white p-2 rounded-xl transition-all"
          >
            <Plus className="h-5 w-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
