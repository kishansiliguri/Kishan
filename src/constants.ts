export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  prepTime: string;
}

export const FOOD_ITEMS: FoodItem[] = [
  {
    id: '1',
    name: 'Classic Margherita Pizza',
    description: 'Fresh mozzarella, tomato sauce, and basil on a thin crust.',
    price: 12.99,
    rating: 4.8,
    reviews: 124,
    image: 'https://picsum.photos/seed/pizza1/600/400',
    category: 'Pizza',
    prepTime: '20-25 min'
  },
  {
    id: '2',
    name: 'Double Cheeseburger',
    description: 'Two juicy beef patties with cheddar, lettuce, and special sauce.',
    price: 9.50,
    rating: 4.6,
    reviews: 89,
    image: 'https://picsum.photos/seed/burger1/600/400',
    category: 'Burgers',
    prepTime: '15-20 min'
  },
  {
    id: '3',
    name: 'Salmon Avocado Sushi',
    description: 'Fresh Atlantic salmon and creamy avocado rolled with vinegared rice.',
    price: 15.00,
    rating: 4.9,
    reviews: 56,
    image: 'https://picsum.photos/seed/sushi1/600/400',
    category: 'Sushi',
    prepTime: '25-30 min'
  },
  {
    id: '4',
    name: 'Spicy Chicken Ramen',
    description: 'Rich miso broth with spicy chicken, soft-boiled egg, and scallions.',
    price: 13.50,
    rating: 4.7,
    reviews: 210,
    image: 'https://picsum.photos/seed/ramen1/600/400',
    category: 'Noodles',
    prepTime: '15-20 min'
  },
  {
    id: '5',
    name: 'Garden Fresh Salad',
    description: 'Mixed greens, cherry tomatoes, cucumbers, and balsamic vinaigrette.',
    price: 8.99,
    rating: 4.5,
    reviews: 45,
    image: 'https://picsum.photos/seed/salad1/600/400',
    category: 'Salads',
    prepTime: '10-15 min'
  },
  {
    id: '6',
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with a gooey molten center.',
    price: 6.99,
    rating: 4.9,
    reviews: 156,
    image: 'https://picsum.photos/seed/dessert1/600/400',
    category: 'Desserts',
    prepTime: '10 min'
  },
  {
    id: '7',
    name: 'Truffle Mushroom Pasta',
    description: 'Creamy fettuccine with sautéed mushrooms and truffle oil.',
    price: 16.50,
    rating: 4.8,
    reviews: 78,
    image: 'https://picsum.photos/seed/pasta1/600/400',
    category: 'Pasta',
    prepTime: '20-25 min'
  },
  {
    id: '8',
    name: 'BBQ Chicken Wings',
    description: 'Crispy wings tossed in smoky barbecue sauce.',
    price: 11.99,
    rating: 4.7,
    reviews: 112,
    image: 'https://picsum.photos/seed/wings1/600/400',
    category: 'Appetizers',
    prepTime: '15-20 min'
  }
];

export const CATEGORIES = [
  { name: 'Pizza', icon: '🍕' },
  { name: 'Burgers', icon: '🍔' },
  { name: 'Sushi', icon: '🍣' },
  { name: 'Noodles', icon: '🍜' },
  { name: 'Salads', icon: '🥗' },
  { name: 'Desserts', icon: '🍰' },
  { name: 'Pasta', icon: '🍝' },
  { name: 'Appetizers', icon: '🍗' },
  { name: 'Drinks', icon: '🥤' },
];

export const SLIDER_IMAGES = [
  {
    url: 'https://picsum.photos/seed/food-banner1/1600/600',
    title: 'Delicious Meals Delivered',
    subtitle: 'Get 50% off on your first order'
  },
  {
    url: 'https://picsum.photos/seed/food-banner2/1600/600',
    title: 'Fresh Ingredients Only',
    subtitle: 'From farm to your table in 30 minutes'
  },
  {
    url: 'https://picsum.photos/seed/food-banner3/1600/600',
    title: 'Taste the Difference',
    subtitle: 'Explore our premium selection of cuisines'
  }
];
