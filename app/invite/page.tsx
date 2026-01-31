'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function InvitePage() {
  const router = useRouter();
  const [inviteCode, setInviteCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
      return;
    }

    fetchInviteCode(token);
  }, []);

  const fetchInviteCode = async (token: string) => {
    try {
      const res = await fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error('Unauthorized');

      const data = await res.json();
      setInviteCode(data.user.inviteCode);
      setLoading(false);
    } catch (error) {
      localStorage.removeItem('token');
      router.push('/auth/login');
    }
  };

  const inviteLink = typeof window !== 'undefined' 
    ? `${window.location.origin}/contribute/${inviteCode}`
    : '';

  const copyToClipboard = async () => {
    try {
      if (!inviteLink) {
        console.error('Invite link not ready');
        return;
      }

      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(inviteLink);
      } else {
        // Fallback for older browsers or non-HTTPS
        const textArea = document.createElement('textarea');
        textArea.value = inviteLink;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }
      
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (error) {
      console.error('Failed to copy:', error);
      // Show a simple fallback message instead of breaking the UI
      alert('Could not copy automatically. Please copy manually:\n\n' + inviteLink);
    }
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
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-8">
      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-pixel font-bold text-center text-textPrimary mb-16">
        Invite someone
      </h1>

      {/* Copy Link Button */}
      <button
        onClick={copyToClipboard}
        className={`px-8 py-3 font-pixel text-lg border-4 border-black transition-colors ${
          copied 
            ? 'bg-green-200 text-green-800' 
            : 'bg-white text-textPrimary hover:bg-secondary'
        }`}
        style={{
          clipPath: 'polygon(0 0, 8px 0, 8px 3px, 100% 3px, 100% calc(100% - 3px), calc(100% - 8px) calc(100% - 3px), calc(100% - 8px) 100%, 0 100%)'
        }}
      >
        {copied ? '✅ Copied!' : 'Copy link'}
      </button>

      {copied && (
        <p className="font-pixel text-green-600 text-sm mt-4 text-center">
          Now you can share it! 💌
        </p>
      )}

      {/* Back Link */}
      <Link 
        href="/dashboard"
        className="mt-12 text-textSecondary font-pixel text-sm hover:text-textPrimary"
      >
        ← Back
      </Link>
    </main>
  );
}
