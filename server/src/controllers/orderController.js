const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
  const order = await Order.create(req.body);
  res.status(201).json(order);
};

exports.getOrders = async (_, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
};
