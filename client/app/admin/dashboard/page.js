import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-black">Admin Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <Link href="/admin/products" className="rounded border border-white/10 bg-zinc-900 p-6">Manage Products</Link>
        <Link href="/admin/add-product" className="rounded border border-white/10 bg-zinc-900 p-6">Add Product</Link>
        <Link href="/admin/orders" className="rounded border border-white/10 bg-zinc-900 p-6">View Orders</Link>
      </div>
    </div>
  );
}
