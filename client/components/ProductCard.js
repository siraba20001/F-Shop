'use client';
import Link from 'next/link';

export default function ProductCard({ product, onAdd }) {
  return (
    <div className="card-hover overflow-hidden rounded-2xl border border-white/10 bg-zinc-900">
      <img src={product.images?.[0] || 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800'} alt={product.name} className="h-56 w-full object-cover" />
      <div className="space-y-2 p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">{product.name}</h3>
          {product.badge && <span className="rounded bg-neon px-2 py-1 text-xs">{product.badge}</span>}
        </div>
        <p className="text-electric font-bold">{product.price.toLocaleString()} FCFA</p>
        <div className="flex gap-2">
          <Link href={`/products/${product._id}`} className="rounded bg-white/10 px-3 py-2 text-sm">View</Link>
          <button onClick={() => onAdd(product)} className="rounded bg-electric px-3 py-2 text-sm">Add to cart</button>
        </div>
      </div>
    </div>
  );
}
