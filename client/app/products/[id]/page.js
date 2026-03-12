'use client';
import { useEffect, useState } from 'react';
import API from '../../../lib/api';
import { getCart, saveCart } from '../../../lib/cart';

export default function ProductDetails({ params }) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    API.get(`/products/${params.id}`).then((res) => setProduct(res.data));
  }, [params.id]);

  if (!product) return <p>Loading...</p>;

  const addToCart = () => {
    const cart = getCart();
    const existing = cart.find((item) => item._id === product._id);
    saveCart(existing ? cart.map((i) => (i._id === product._id ? { ...i, quantity: i.quantity + 1 } : i)) : [...cart, { ...product, quantity: 1 }]);
  };

  const whatsappText = encodeURIComponent(`Salut F-SHOP! Je veux commander: ${product.name} - ${product.price} FCFA`);

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <img src={product.images?.[0]} alt={product.name} className="h-[520px] w-full rounded-2xl object-cover" />
      <div className="space-y-4">
        <h1 className="text-4xl font-black">{product.name}</h1>
        <p className="text-2xl font-bold text-electric">{product.price.toLocaleString()} FCFA</p>
        <p className="text-white/80">{product.description}</p>
        <button onClick={addToCart} className="rounded bg-electric px-6 py-3">Add to cart</button>
        <a href={`https://wa.me/22370000000?text=${whatsappText}`} target="_blank" className="ml-3 rounded bg-green-600 px-6 py-3">Order on WhatsApp</a>
      </div>
    </div>
  );
}
