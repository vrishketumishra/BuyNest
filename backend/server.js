import express from 'express';
import cors from 'cors';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Load products from JSON file
const productsData = JSON.parse(
  readFileSync(join(__dirname, 'products.json'), 'utf-8')
);

// In-memory orders storage
let orders = [];

// Routes

// Get all products
app.get('/api/products', (req, res) => {
  res.json(productsData);
  console.log('Products sent to client');
});

// Get single product by ID
app.get('/api/products/:id', (req, res) => {
  const product = productsData.find(p => p.id === req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

// Create order
app.post('/api/orders', (req, res) => {
  const { cartItems, totalCents, deliveryOptionId } = req.body;
  
  const order = {
    id: Date.now().toString(),
    cartItems,
    totalCents,
    deliveryOptionId,
    orderTime: new Date().toISOString(),
    status: 'confirmed'
  };
  
  orders.push(order);
  console.log('Order created:', order.id);
  res.status(201).json(order);
});

// Get all orders
app.get('/api/orders', (req, res) => {
  res.json(orders);
});

// Get single order
app.get('/api/orders/:id', (req, res) => {
  const order = orders.find(o => o.id === req.params.id);
  if (order) {
    res.json(order);
  } else {
    res.status(404).json({ error: 'Order not found' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    productsCount: productsData.length,
    ordersCount: orders.length
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ BuyNest Backend running on http://localhost:${PORT}`);
  console.log(`📦 ${productsData.length} products loaded`);
  console.log(`🛒 API Endpoints:`);
  console.log(`   GET    /api/products`);
  console.log(`   GET    /api/products/:id`);
  console.log(`   POST   /api/orders`);
  console.log(`   GET    /api/orders`);
  console.log(`   GET    /api/orders/:id`);
  console.log(`   GET    /api/health`);
});
