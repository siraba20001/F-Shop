'use client';
import { useEffect, useState } from 'react';
import API, { setToken } from '../../../lib/api';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setToken(localStorage.getItem('fshop-token'));
    API.get('/orders').then((res) => setOrders(res.data));
  }, []);

  return (
    <div>
      <h1 className="mb-4 text-3xl font-bold">Customer Orders</h1>
      <div className="space-y-3">
        {orders.map((o) => (
          <div key={o._id} className="rounded border border-white/10 bg-zinc-900 p-4">
            <p className="font-semibold">{o.customerName} — {o.phone}</p>
            <p>{o.address}</p>
            <p className="text-electric">{o.totalPrice} FCFA • {o.paymentMethod} • {o.orderStatus}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
