'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getCart, saveCart } from '../../lib/cart';

export default function CartPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => setCart(getCart()), []);
  const update = (next) => {
    setCart(next);
    saveCart(next);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Your Cart</h1>
      <div className="space-y-3">
        {cart.map((item) => (
          <div key={item._id} className="flex items-center justify-between rounded border border-white/10 p-4">
            <div>
              <h3>{item.name}</h3>
              <p className="text-sm text-white/60">{item.price} FCFA</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => update(cart.map((i) => i._id === item._id ? { ...i, quantity: Math.max(1, i.quantity - 1) } : i))}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => update(cart.map((i) => i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i))}>+</button>
              <button onClick={() => update(cart.filter((i) => i._id !== item._id))} className="text-red-400">Remove</button>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-6 text-xl">Total: <strong>{total.toLocaleString()} FCFA</strong></p>
      <Link href="/checkout" className="mt-4 inline-block rounded bg-neon px-6 py-3">Checkout</Link>
    </div>
  );
}
