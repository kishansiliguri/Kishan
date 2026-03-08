// State Management
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentCategory = null;
let user = null;

// DOM Elements
const foodContainer = document.getElementById('food-container');
const categoryList = document.getElementById('category-list');
const slidesContainer = document.getElementById('slides-container');
const dotsContainer = document.getElementById('dots-container');
const cartCount = document.getElementById('cart-count');
const cartTotalAmount = document.getElementById('cart-total-amount');
const cartItemsContainer = document.getElementById('cart-items');
const navActions = document.getElementById('nav-actions');

// Modals
const authModal = document.getElementById('auth-modal');
const cartModal = document.getElementById('cart-modal');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

// Initialize App
async function init() {
    await checkAuth();
    await loadBanners();
    await loadCategories();
    await loadFoodItems();
    updateCartUI();
}

// Auth Functions
async function checkAuth() {
    const res = await fetch('/api/me');
    const data = await res.json();
    if (data.loggedIn) {
        user = data.user;
        renderNavActions();
    }
}

function renderNavActions() {
    if (user) {
        navActions.innerHTML = `
            <span class="nav-link">Hi, ${user.username}</span>
            ${user.role === 'admin' ? '<button class="nav-link" onclick="window.location.href=\'/admin.html\'">Admin</button>' : ''}
            <button class="nav-link" id="logout-btn">Logout</button>
            <button class="nav-link cart-btn" id="cart-btn-nav">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                <span id="cart-count-nav">${cart.length}</span>
            </button>
        `;
        document.getElementById('logout-btn').onclick = async () => {
            await fetch('/api/logout', { method: 'POST' });
            window.location.reload();
        };
        document.getElementById('cart-btn-nav').onclick = () => cartModal.style.display = 'block';
    }
}

// Data Loading
async function loadBanners() {
    const res = await fetch('/api/banners');
    const banners = await res.json();
    slidesContainer.innerHTML = '';
    dotsContainer.innerHTML = '';
    
    banners.forEach((banner, i) => {
        const slide = document.createElement('div');
        slide.className = `slide ${i === 0 ? 'active' : ''}`;
        slide.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${banner.image}')`;
        slide.innerHTML = `
            <div class="slide-content">
                <h1>${banner.title}</h1>
                <p>${banner.subtitle}</p>
                <button class="btn-primary">Order Now</button>
            </div>
        `;
        slidesContainer.appendChild(slide);

        const dot = document.createElement('div');
        dot.className = `dot ${i === 0 ? 'active' : ''}`;
        dot.onclick = () => goToSlide(i);
        dotsContainer.appendChild(dot);
    });
    initSlider();
}

async function loadCategories() {
    const res = await fetch('/api/categories');
    const categories = await res.json();
    categoryList.innerHTML = `
        <div class="category-item ${!currentCategory ? 'active' : ''}" onclick="filterCategory(null)">
            <div class="category-icon">🏠</div>
            <span>All</span>
        </div>
    `;
    categories.forEach(cat => {
        const item = document.createElement('div');
        item.className = `category-item ${currentCategory === cat.id ? 'active' : ''}`;
        item.onclick = () => filterCategory(cat.id);
        item.innerHTML = `
            <div class="category-icon">${cat.icon}</div>
            <span>${cat.name}</span>
        `;
        categoryList.appendChild(item);
    });
}

async function loadFoodItems() {
    const url = currentCategory ? `/api/items?categoryId=${currentCategory}` : '/api/items';
    const res = await fetch(url);
    const items = await res.json();
    foodContainer.innerHTML = '';
    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'food-card';
        card.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="food-img" loading="lazy">
            <div class="food-info">
                <h3 class="food-name">${item.name}</h3>
                <p class="food-desc">${item.description}</p>
                <div class="food-footer">
                    <span class="food-price">₹${item.price}</span>
                    <button class="add-btn" onclick="addToCart(${item.id}, '${item.name}', ${item.price})">Add +</button>
                </div>
            </div>
        `;
        foodContainer.appendChild(card);
    });
}

// Cart Logic
function addToCart(id, name, price) {
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }
    updateCartUI();
    saveCart();
}

function updateCartUI() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCount) cartCount.innerText = count;
    const navCount = document.getElementById('cart-count-nav');
    if (navCount) navCount.innerText = count;

    cartItemsContainer.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <span>${item.name} x ${item.quantity}</span>
            <span>₹${item.price * item.quantity}</span>
            <button onclick="removeFromCart(${item.id})" style="color:red; border:none; background:none; cursor:pointer;">&times;</button>
        `;
        cartItemsContainer.appendChild(div);
    });
    cartTotalAmount.innerText = total;
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
    saveCart();
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// WhatsApp Integration
document.getElementById('place-order').onclick = () => {
    if (cart.length === 0) return alert('Cart is empty!');
    
    let message = `*New Order from FlavorDash*\n\n`;
    let total = 0;
    cart.forEach(item => {
        message += `• ${item.name} x ${item.quantity} - ₹${item.price * item.quantity}\n`;
        total += item.price * item.quantity;
    });
    message += `\n*Total: ₹${total}*\n\n`;
    message += `Please confirm my order.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/917098894401?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    
    // Clear cart after order
    cart = [];
    saveCart();
    updateCartUI();
    cartModal.style.display = 'none';
};

// UI Helpers
function filterCategory(id) {
    currentCategory = id;
    loadCategories();
    loadFoodItems();
}

// Slider Logic
let currentSlide = 0;
function initSlider() {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;
    setInterval(() => goToSlide(currentSlide + 1), 5000);
}

function goToSlide(n) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    if (slides.length === 0) return;
    
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    currentSlide = (n + slides.length) % slides.length;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

// Modal Handlers
document.getElementById('login-btn').onclick = () => authModal.style.display = 'block';
document.getElementById('cart-btn').onclick = () => cartModal.style.display = 'block';
document.querySelectorAll('.close').forEach(btn => btn.onclick = () => {
    authModal.style.display = 'none';
    cartModal.style.display = 'none';
});

document.getElementById('show-register').onclick = () => {
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
};
document.getElementById('show-login').onclick = () => {
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
};

// Auth Actions
document.getElementById('do-login').onclick = async () => {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (data.success) window.location.reload();
    else alert(data.message);
};

document.getElementById('do-register').onclick = async () => {
    const username = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;
    const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (data.success) {
        alert('Registered! Please login.');
        document.getElementById('show-login').click();
    } else alert(data.message);
};

// Start
init();
