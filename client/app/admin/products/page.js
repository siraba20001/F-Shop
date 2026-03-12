'use client';
import { useEffect, useState } from 'react';
import API, { setToken } from '../../../lib/api';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);

  const load = () => API.get('/products').then((res) => setProducts(res.data));
  useEffect(() => {
    setToken(localStorage.getItem('fshop-token'));
    load();
  }, []);

  const remove = async (id) => {
    await API.delete(`/products/${id}`);
    load();
  };

  return (
    <div>
      <h1 className="mb-4 text-3xl font-bold">Products</h1>
      <div className="overflow-x-auto rounded border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-900"><tr><th className="p-3">Name</th><th>Category</th><th>Price</th><th>Actions</th></tr></thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="border-t border-white/10">
                <td className="p-3">{p.name}</td><td>{p.category}</td><td>{p.price} FCFA</td>
                <td><button className="text-red-400" onClick={() => remove(p._id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
