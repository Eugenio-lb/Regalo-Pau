'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { setAuthCookie } from '@/lib/cookie-auth';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      // Save to cookies (works in iOS PWA)
      setAuthCookie(data.token, data.user);
      
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-background">
      <div className="w-full max-w-sm">
        {/* Title */}
        <h1 className="text-4xl font-pixel font-bold text-center text-textPrimary mb-16">
          Welcome Pau :)
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Name Input */}
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="name"
            className="w-full px-6 py-4 border-4 border-black rounded-full focus:outline-none font-pixel text-xl text-center placeholder-textSecondary bg-white"
          />

          {/* Email Input */}
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="email"
            className="w-full px-6 py-4 border-4 border-black rounded-full focus:outline-none font-pixel text-xl text-center placeholder-textSecondary bg-white"
          />

          {/* Password Input */}
          <input
            type="password"
            required
            minLength={6}
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="password"
            className="w-full px-6 py-4 border-4 border-black rounded-full focus:outline-none font-pixel text-xl text-center placeholder-textSecondary bg-white"
          />

          {/* Error Message */}
          {error && (
            <p className="text-red-600 font-pixel text-sm text-center">{error}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 font-pixel text-lg text-textPrimary bg-primary border-4 border-black rounded-full hover:bg-accent transition-colors disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Sign Up'}
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-8 text-center">
          <Link href="/auth/login" className="text-textSecondary font-pixel text-sm hover:text-textPrimary">
            Already have an account? Login
          </Link>
        </div>
      </div>
    </main>
  );
}
