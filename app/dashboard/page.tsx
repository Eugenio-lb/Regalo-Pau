'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface User {
  id: string;
  name: string;
  email: string;
  inviteCode: string;
}

interface Quote {
  id: string;
  text: string;
  authorName: string;
}

type EnvelopeState = 'closed' | 'opening' | 'letter';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [envelopeState, setEnvelopeState] = useState<EnvelopeState>('closed');
  const [fetchingQuote, setFetchingQuote] = useState(false);

  useEffect(() => {
    // Try multiple sources for token (localStorage, sessionStorage, or user data)
    let token = localStorage.getItem('token') || sessionStorage.getItem('token');
    
    // If no token but user data exists, we're still in session
    if (!token) {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        try {
          const user = JSON.parse(savedUser);
          setUser(user);
          setLoading(false);
          return;
        } catch (e) {
          // Invalid JSON, continue to login
        }
      }
    }
    
    if (!token) {
      router.push('/auth/login');
      return;
    }

    fetchUser(token);
    checkTodayQuote(token);
  }, []);

  const fetchUser = async (token: string) => {
    try {
      const res = await fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error('Unauthorized');

      const data = await res.json();
      setUser(data.user);
      setLoading(false);
    } catch (error) {
      localStorage.removeItem('token');
      router.push('/auth/login');
    }
  };

  const checkTodayQuote = async (token: string) => {
    try {
      const res = await fetch('/api/quotes/daily', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const data = await res.json();
        if (data.quote) {
          setQuote(data.quote);
          setEnvelopeState('letter');
        }
      }
    } catch (error) {
      console.error('Error checking today quote:', error);
    }
  };

  const handleOpenEnvelope = async () => {
    if (fetchingQuote || envelopeState !== 'closed') return;

    setFetchingQuote(true);
    setEnvelopeState('opening');
    const token = localStorage.getItem('token');

    try {
      const res = await fetch('/api/quotes/daily', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error('Failed to fetch quote');

      const data = await res.json();
      setQuote(data.quote);
      
      // Wait a bit before showing letter
      setTimeout(() => {
        setEnvelopeState('letter');
      }, 800);
    } catch (error) {
      console.error('Error fetching quote:', error);
      alert('Failed to get quote. Please try again!');
      setEnvelopeState('closed');
    } finally {
      setFetchingQuote(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="text-5xl animate-bounce mb-4">💌</div>
          <p className="font-pixel text-textSecondary">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-start px-4 pt-16 pb-4">
        {/* Title */}
        <h1
          className="text-4xl md:text-4xl font-pixel font-bold text-center text-textPrimary mb-6"
          style={{ paddingTop: '100px' }}
        >
          Open today's<br />envelope
        </h1>

        {/* Envelope/Letter Display */}
        <div className="flex-1 flex items-center justify-center w-full max-w-lg mb-4">
          <AnimatePresence mode="wait">
            {envelopeState === 'closed' && (
              <motion.button
                key="closed"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={handleOpenEnvelope}
                disabled={fetchingQuote}
                className="cursor-pointer hover:scale-105 transition-transform duration-300"
              >
                {/* Closed Envelope - Pixel Art Style */}
                <div className="relative w-64 h-48 md:w-80 md:h-60">
                  <svg viewBox="0 0 200 150" className="w-full h-full">
                    {/* Envelope body */}
                    <rect x="20" y="40" width="160" height="100" fill="#FFB6D9" stroke="black" strokeWidth="4"/>
                    {/* Envelope flap closed */}
                    <path d="M 20 40 L 100 90 L 180 40" fill="#FF85B3" stroke="black" strokeWidth="4"/>
                    <path d="M 20 40 L 100 90 L 180 40 L 180 140 L 20 140 Z" fill="none" stroke="black" strokeWidth="4"/>
                    {/* Heart */}
                    <path d="M 100 70 L 90 60 Q 85 55 90 50 Q 95 45 100 50 Q 105 45 110 50 Q 115 55 110 60 Z" fill="#FF1493"/>
                  </svg>
                </div>
              </motion.button>
            )}

            {envelopeState === 'opening' && (
              <motion.div
                key="opening"
                initial={{ scale: 1 }}
                animate={{ scale: 1.1 }}
                exit={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Open Envelope - Pixel Art Style */}
                <div className="relative w-64 h-48 md:w-80 md:h-60">
                  <svg viewBox="0 0 200 150" className="w-full h-full">
                    {/* Envelope body */}
                    <rect x="20" y="40" width="160" height="100" fill="#FFB6D9" stroke="black" strokeWidth="4"/>
                    {/* Envelope flap open */}
                    <path d="M 20 40 L 100 20 L 180 40" fill="#FF85B3" stroke="black" strokeWidth="4"/>
                    {/* Letter peeking out */}
                    <rect x="40" y="50" width="120" height="80" fill="white" stroke="black" strokeWidth="3"/>
                  </svg>
                </div>
              </motion.div>
            )}

            {envelopeState === 'letter' && quote && (
              <motion.div
                key="letter"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="w-full px-10 md:px-20"
              >
                {/* Letter/Paper - Pixel Art Style */}
                <div className="relative bg-white border-4 border-black p-24 md:p-16 min-h-[420px] md:min-h-[520px] flex flex-col justify-center">
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="mb-8">
                      <p className="font-pixel text-lg md:text-xl text-textPrimary leading-relaxed">
                        {quote.text}
                      </p>
                    </div>
                    <div className="text-right mt-auto">
                      <p className="font-pixel text-base text-textSecondary">
                        - {quote.authorName}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Navigation - Pixel Art Buttons */}
      <div className="flex gap-3 justify-center items-center px-4 py-4">
        <Link
          href="/memories"
          className="px-4 py-2 bg-white text-textPrimary font-pixel text-sm md:text-base border-4 border-black hover:bg-secondary transition-colors flex-shrink-0"
          style={{
            //clipPath: 'polygon(0 0, 8px 0, 8px 3px, 100% 3px, 100% calc(100% - 3px), calc(100% - 8px) calc(100% - 3px), calc(100% - 8px) 100%, 0 100%)'
          }}
        >
          HISTORY
        </Link>
        <Link
          href="/invite"
          className="px-4 py-2 bg-white text-textPrimary font-pixel text-sm md:text-base border-4 border-black hover:bg-secondary transition-colors flex-shrink-0"
          style={{
            //clipPath: 'polygon(0 0, 8px 0, 8px 3px, 100% 3px, 100% calc(100% - 3px), calc(100% - 8px) calc(100% - 3px), calc(100% - 8px) 100%, 0 100%)'
          }}
        >
          INVITE
        </Link>
      </div>
    </main>
  );
}
