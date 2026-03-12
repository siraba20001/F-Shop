'use client';
import { useEffect, useState } from 'react';
import API from '../lib/api';
import ProductCard from '../components/ProductCard';
import { getCart, saveCart } from '../lib/cart';
import Link from 'next/link';

export default function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get('/products').then((res) => setProducts(res.data)).catch(() => setProducts([]));
  }, []);

  const addToCart = (product) => {
    const cart = getCart();
    const existing = cart.find((item) => item._id === product._id);
    const updated = existing
      ? cart.map((item) => (item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item))
      : [...cart, { ...product, quantity: 1 }];
    saveCart(updated);
  };

  return (
    <div className="space-y-12">
      <section className="rounded-3xl bg-gradient-to-r from-black via-neon/30 to-electric/40 p-10">
        <h1 className="text-5xl font-black">F-SHOP STREETWEAR MALI</h1>
        <p className="mt-4 max-w-2xl text-white/80">Premium teen vibes: sneakers, hoodies, caps & accessories inspired by Nike, Shein and StockX.</p>
        <Link href="/products" className="mt-6 inline-block rounded bg-white px-6 py-3 font-semibold text-black">Shop now</Link>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold">Trending Products</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, 4).map((product) => <ProductCard key={product._id} product={product} onAdd={addToCart} />)}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold">New Arrivals</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {products.filter((p) => p.badge === 'New').slice(0, 4).map((product) => <ProductCard key={product._id} product={product} onAdd={addToCart} />)}
        </div>
      </section>
    </div>
  );
}
