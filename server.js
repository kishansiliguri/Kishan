const express = require('express');
const path = require('path');
const session = require('express-session');
const multer = require('multer');
const bcrypt = require('bcryptjs');
const Database = require('better-sqlite3');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Database Setup
const db = new Database('flavordash.db');

// Create Tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    role TEXT DEFAULT 'customer'
  );

  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE,
    icon TEXT
  );

  CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    description TEXT,
    price REAL,
    category_id INTEGER,
    image TEXT,
    FOREIGN KEY (category_id) REFERENCES categories(id)
  );

  CREATE TABLE IF NOT EXISTS banners (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    subtitle TEXT,
    image TEXT,
    active INTEGER DEFAULT 1
  );
`);

// Seed Admin User
const adminExists = db.prepare('SELECT * FROM users WHERE role = ?').get('admin');
if (!adminExists) {
  const hashedPassword = bcrypt.hashSync('admin123', 10);
  db.prepare('INSERT INTO users (username, password, role) VALUES (?, ?, ?)').run('admin', hashedPassword, 'admin');
}

// Seed Initial Categories if empty
const catCount = db.prepare('SELECT COUNT(*) as count FROM categories').get().count;
if (catCount === 0) {
  const insertCat = db.prepare('INSERT INTO categories (name, icon) VALUES (?, ?)');
  const cats = [
    ['Pizza', '🍕'],
    ['Burgers', '🍔'],
    ['Sushi', '🍣'],
    ['Noodles', '🍜'],
    ['Salads', '🥗'],
    ['Desserts', '🍰']
  ];
  cats.forEach(cat => insertCat.run(cat[0], cat[1]));
}

// Seed Initial Items if empty
const itemCount = db.prepare('SELECT COUNT(*) as count FROM items').get().count;
if (itemCount === 0) {
  const pizzaCat = db.prepare('SELECT id FROM categories WHERE name = ?').get('Pizza').id;
  const burgerCat = db.prepare('SELECT id FROM categories WHERE name = ?').get('Burgers').id;
  
  const insertItem = db.prepare('INSERT INTO items (name, description, price, category_id, image) VALUES (?, ?, ?, ?, ?)');
  insertItem.run('Classic Margherita', 'Fresh mozzarella, tomato sauce, and basil.', 299, pizzaCat, 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=600&q=80');
  insertItem.run('Double Cheese Burger', 'Two juicy patties with extra cheddar.', 199, burgerCat, 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80');
}

// Seed Initial Banners if empty
const bannerCount = db.prepare('SELECT COUNT(*) as count FROM banners').get().count;
if (bannerCount === 0) {
  const insertBanner = db.prepare('INSERT INTO banners (title, subtitle, image) VALUES (?, ?, ?)');
  insertBanner.run('Delicious Meals Delivered', 'Get 50% off on your first order', 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=60');
  insertBanner.run('Fresh Ingredients Only', 'From farm to your table in 30 minutes', 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1600&q=60');
}

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'flavordash-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

// Multer for Image Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = './public/uploads';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('Only JPEG/JPG/PNG images are allowed'), false);
    }
  }
});

// Auth Routes
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
  if (user && bcrypt.compareSync(password, user.password)) {
    req.session.userId = user.id;
    req.session.role = user.role;
    res.json({ success: true, role: user.role, username: user.username });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    db.prepare('INSERT INTO users (username, password) VALUES (?, ?)').run(username, hashedPassword);
    res.json({ success: true });
  } catch (e) {
    res.status(400).json({ success: false, message: 'Username already exists' });
  }
});

app.get('/api/me', (req, res) => {
  if (req.session.userId) {
    const user = db.prepare('SELECT username, role FROM users WHERE id = ?').get(req.session.userId);
    res.json({ loggedIn: true, user });
  } else {
    res.json({ loggedIn: false });
  }
});

app.post('/api/logout', (req, res) => {
  req.session.destroy();
  res.json({ success: true });
});

// Public Data Routes
app.get('/api/categories', (req, res) => {
  const categories = db.prepare('SELECT * FROM categories').all();
  res.json(categories);
});

app.get('/api/items', (req, res) => {
  const { categoryId } = req.query;
  let items;
  if (categoryId) {
    items = db.prepare('SELECT * FROM items WHERE category_id = ?').all(categoryId);
  } else {
    items = db.prepare('SELECT * FROM items').all();
  }
  res.json(items);
});

app.get('/api/banners', (req, res) => {
  const banners = db.prepare('SELECT * FROM banners WHERE active = 1').all();
  res.json(banners);
});

// Admin Middleware
const isAdmin = (req, res, next) => {
  if (req.session.role === 'admin') next();
  else res.status(403).json({ success: false, message: 'Unauthorized' });
};

// Admin Routes
app.post('/api/admin/categories', isAdmin, (req, res) => {
  const { name, icon } = req.body;
  db.prepare('INSERT INTO categories (name, icon) VALUES (?, ?)').run(name, icon);
  res.json({ success: true });
});

app.post('/api/admin/items', isAdmin, upload.single('image'), (req, res) => {
  const { name, description, price, category_id } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : req.body.image_url;
  db.prepare('INSERT INTO items (name, description, price, category_id, image) VALUES (?, ?, ?, ?, ?)').run(name, description, price, category_id, image);
  res.json({ success: true });
});

app.post('/api/admin/banners', isAdmin, upload.single('image'), (req, res) => {
  const { title, subtitle } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : req.body.image_url;
  db.prepare('INSERT INTO banners (title, subtitle, image) VALUES (?, ?, ?)').run(title, subtitle, image);
  res.json({ success: true });
});

app.delete('/api/admin/items/:id', isAdmin, (req, res) => {
  db.prepare('DELETE FROM items WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Fallback to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
