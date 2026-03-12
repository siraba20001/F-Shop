const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
  const { search = '', category } = req.query;
  const query = {
    name: { $regex: search, $options: 'i' }
  };
  if (category && category !== 'All') query.category = category;

  const products = await Product.find(query).sort({ createdAt: -1 });
  res.json(products);
};

exports.getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
};

exports.createProduct = async (req, res) => {
  const images = req.files?.map((f) => `/uploads/${f.filename}`) || req.body.images || [];
  const product = await Product.create({ ...req.body, images });
  res.status(201).json(product);
};

exports.updateProduct = async (req, res) => {
  const payload = { ...req.body };
  if (req.files?.length) payload.images = req.files.map((f) => `/uploads/${f.filename}`);
  const product = await Product.findByIdAndUpdate(req.params.id, payload, { new: true });
  res.json(product);
};

exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Product deleted' });
};
