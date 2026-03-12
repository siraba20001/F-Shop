'use client';
import { useEffect, useMemo, useState } from 'react';
import API from '../../lib/api';
import ProductCard from '../../components/ProductCard';
import { getCart, saveCart } from '../../lib/cart';

const categories = ['All', 'T-Shirts', 'Sneakers', 'Caps', 'Hoodies', 'Accessories'];

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  useEffect(() => {
    API.get('/products').then((res) => setProducts(res.data));
  }, []);

  const filtered = useMemo(
    () => products.filter((p) => (category === 'All' || p.category === category) && p.name.toLowerCase().includes(search.toLowerCase())),
    [products, search, category]
  );

  const addToCart = (product) => {
    const cart = getCart();
    const existing = cart.find((item) => item._id === product._id);
    saveCart(existing ? cart.map((i) => (i._id === product._id ? { ...i, quantity: i.quantity + 1 } : i)) : [...cart, { ...product, quantity: 1 }]);
  };

  return (
    <div>
      <h1 className="mb-4 text-3xl font-bold">All Products</h1>
      <div className="mb-6 flex flex-col gap-3 md:flex-row">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search streetwear..." className="w-full rounded border border-white/20 bg-zinc-900 p-3" />
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded border border-white/20 bg-zinc-900 p-3">
          {categories.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {filtered.map((product) => <ProductCard key={product._id} product={product} onAdd={addToCart} />)}
      </div>
    </div>
  );
}
