// Food Data
const foodItems = [
    {
        id: 1,
        name: 'Classic Margherita Pizza',
        description: 'Fresh mozzarella, tomato sauce, and basil.',
        price: 12.99,
        image: 'https://picsum.photos/seed/pizza1/600/400'
    },
    {
        id: 2,
        name: 'Double Cheeseburger',
        description: 'Two beef patties with cheddar and lettuce.',
        price: 9.50,
        image: 'https://picsum.photos/seed/burger1/600/400'
    },
    {
        id: 3,
        name: 'Salmon Avocado Sushi',
        description: 'Fresh salmon and creamy avocado roll.',
        price: 15.00,
        image: 'https://picsum.photos/seed/sushi1/600/400'
    },
    {
        id: 4,
        name: 'Spicy Chicken Ramen',
        description: 'Rich miso broth with spicy chicken.',
        price: 13.50,
        image: 'https://picsum.photos/seed/ramen1/600/400'
    },
    {
        id: 5,
        name: 'Garden Fresh Salad',
        description: 'Mixed greens with balsamic vinaigrette.',
        price: 8.99,
        image: 'https://picsum.photos/seed/salad1/600/400'
    },
    {
        id: 6,
        name: 'Chocolate Lava Cake',
        description: 'Warm cake with a molten center.',
        price: 6.99,
        image: 'https://picsum.photos/seed/dessert1/600/400'
    }
];

// Load Food Items
function loadFoodItems() {
    const container = document.getElementById('food-container');
    if (!container) return;

    foodItems.forEach(item => {
        const card = document.createElement('div');
        card.className = 'food-card';
        card.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="food-img" loading="lazy">
            <div class="food-info">
                <h3 class="food-name">${item.name}</h3>
                <p class="food-desc">${item.description}</p>
                <div class="food-footer">
                    <span class="food-price">$${item.price.toFixed(2)}</span>
                    <button class="add-btn">+</button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Slider Logic
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.querySelector('.slider-dots');

function initSlider() {
    if (slides.length === 0) return;

    // Create dots
    slides.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = `dot ${i === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    });

    // Auto slide
    setInterval(nextSlide, 5000);
}

function goToSlide(n) {
    slides[currentSlide].classList.remove('active');
    document.querySelectorAll('.dot')[currentSlide].classList.remove('active');
    
    currentSlide = (n + slides.length) % slides.length;
    
    slides[currentSlide].classList.add('active');
    document.querySelectorAll('.dot')[currentSlide].classList.add('active');
}

function nextSlide() {
    goToSlide(currentSlide + 1);
}

function prevSlide() {
    goToSlide(currentSlide - 1);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    loadFoodItems();
    initSlider();

    const nextBtn = document.querySelector('.next');
    const prevBtn = document.querySelector('.prev');

    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
});
