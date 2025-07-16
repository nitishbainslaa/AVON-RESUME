'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [form, setForm] = useState({ username: '', password: '' });
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('admin-token');
    if (token === 'avon@admin') router.push('/admin');
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, password } = form;
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('admin-token', 'avon@admin');
      router.push('/admin');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <main className="p-10 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
          className="border p-2"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="border p-2"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Login
        </button>
      </form>
    </main>
  );
}
