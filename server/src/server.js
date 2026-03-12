require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const Product = require('./models/Product');

const app = express();

const seedProducts = async () => {
  const count = await Product.countDocuments();
  if (count) return;
  await Product.insertMany([
    { name: 'Neon Drift Tee', price: 12000, category: 'T-Shirts', description: 'Oversized street tee for Bamako nights.', images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900'], stock: 40, badge: 'New' },
    { name: 'Skyline Runner', price: 45000, category: 'Sneakers', description: 'Electric blue performance sneakers.', images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900'], stock: 20, badge: 'Promo' },
    { name: 'Bamako Snapback', price: 9000, category: 'Caps', description: 'Classic cap with urban embroidery.', images: ['https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=900'], stock: 55, badge: 'New' },
    { name: 'Night Pulse Hoodie', price: 28000, category: 'Hoodies', description: 'Heavy hoodie for bold street style.', images: ['https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=900'], stock: 30, badge: '' }
  ]);
};

connectDB();
seedProducts();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('src/uploads'));

app.get('/api/health', (_, res) => res.json({ ok: true }));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API running on ${PORT}`));
