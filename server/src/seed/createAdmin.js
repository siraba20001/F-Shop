require('dotenv').config();
const bcrypt = require('bcryptjs');
const connectDB = require('../config/db');
const Admin = require('../models/Admin');

(async () => {
  await connectDB();
  const hash = await bcrypt.hash(process.argv[3] || 'admin123', 10);
  await Admin.findOneAndUpdate(
    { email: process.argv[2] || 'admin@fshop.ml' },
    { email: process.argv[2] || 'admin@fshop.ml', password: hash },
    { upsert: true, new: true }
  );
  console.log('Admin ready');
  process.exit(0);
})();
