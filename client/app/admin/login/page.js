'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import API, { setToken } from '../../../lib/api';

export default function AdminLogin() {
  const [email, setEmail] = useState('admin@fshop.ml');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const router = useRouter();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/auth/login', { email, password });
      localStorage.setItem('fshop-token', data.token);
      setToken(data.token);
      router.push('/admin/dashboard');
    } catch {
      setError('Login failed');
    }
  };

  return (
    <form onSubmit={submit} className="mx-auto mt-16 max-w-md space-y-4 rounded-2xl border border-white/10 bg-zinc-900 p-6">
      <h1 className="text-2xl font-bold">Admin Login</h1>
      <input className="w-full rounded bg-black p-3" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className="w-full rounded bg-black p-3" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className="w-full rounded bg-neon py-3 font-semibold">Login</button>
      {error && <p className="text-red-400">{error}</p>}
    </form>
  );
}
