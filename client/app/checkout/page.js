'use client';
import { useState } from 'react';
import API from '../../lib/api';
import { getCart, saveCart } from '../../lib/cart';

export default function CheckoutPage() {
  const [form, setForm] = useState({ customerName: '', phone: '', address: '', paymentMethod: 'Cash on delivery' });
  const [message, setMessage] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    const products = getCart();
    const totalPrice = products.reduce((sum, p) => sum + p.price * p.quantity, 0);
    await API.post('/orders', { ...form, products: products.map((p) => ({ product: p._id, name: p.name, price: p.price, quantity: p.quantity })), totalPrice });
    saveCart([]);
    setMessage('Order placed successfully!');
  };

  return (
    <form onSubmit={submit} className="mx-auto max-w-xl space-y-4">
      <h1 className="text-3xl font-bold">Checkout</h1>
      <input required className="w-full rounded bg-zinc-900 p-3" placeholder="Customer name" onChange={(e) => setForm({ ...form, customerName: e.target.value })} />
      <input required className="w-full rounded bg-zinc-900 p-3" placeholder="Phone number" onChange={(e) => setForm({ ...form, phone: e.target.value })} />
      <input required className="w-full rounded bg-zinc-900 p-3" placeholder="Delivery address" onChange={(e) => setForm({ ...form, address: e.target.value })} />
      <select className="w-full rounded bg-zinc-900 p-3" onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}>
        <option>Cash on delivery</option><option>Orange Money</option><option>Moov Money</option>
      </select>
      <button className="rounded bg-electric px-6 py-3">Confirm order</button>
      {message && <p className="text-green-400">{message}</p>}
    </form>
  );
}
