'use client';
import { useState } from 'react';
import API, { setToken } from '../../../lib/api';

export default function AddProduct() {
  const [form, setForm] = useState({ name: '', price: '', category: 'T-Shirts', description: '', stock: 0, badge: 'New', image: '' });
  const [msg, setMsg] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setToken(localStorage.getItem('fshop-token'));
    await API.post('/products', { ...form, images: [form.image] });
    setMsg('Product created');
  };

  return (
    <form onSubmit={submit} className="mx-auto max-w-2xl space-y-3">
      <h1 className="text-3xl font-bold">Add Product</h1>
      {['name', 'price', 'description', 'image', 'stock'].map((field) => (
        <input key={field} required className="w-full rounded bg-zinc-900 p-3" placeholder={field} onChange={(e) => setForm({ ...form, [field]: e.target.value })} />
      ))}
      <select className="w-full rounded bg-zinc-900 p-3" onChange={(e) => setForm({ ...form, category: e.target.value })}>
        <option>T-Shirts</option><option>Sneakers</option><option>Caps</option><option>Hoodies</option><option>Accessories</option>
      </select>
      <select className="w-full rounded bg-zinc-900 p-3" onChange={(e) => setForm({ ...form, badge: e.target.value })}>
        <option>New</option><option>Promo</option><option value="">None</option>
      </select>
      <button className="rounded bg-electric px-6 py-3">Save Product</button>
      {msg && <p className="text-green-400">{msg}</p>}
    </form>
  );
}
