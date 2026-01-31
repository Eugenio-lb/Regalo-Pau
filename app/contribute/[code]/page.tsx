'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function ContributePage() {
  const params = useParams();
  const router = useRouter();
  const inviteCode = params.code as string;

  const [recipientName, setRecipientName] = useState('');
  const [formData, setFormData] = useState({
    authorName: '',
    text: '',
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchRecipient();
  }, []);

  const fetchRecipient = async () => {
    try {
      const res = await fetch(`/api/users/${inviteCode}`);
      
      if (!res.ok) {
        throw new Error('Invalid invite link');
      }

      const data = await res.json();
      setRecipientName(data.user.name);
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.text.trim()) {
      setError('Please write a message');
      return;
    }

    if (!formData.authorName.trim()) {
      setError('Please write your name');
      return;
    }

    setError('');
    setSubmitting(true);

    try {
      const res = await fetch('/api/quotes/contribute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inviteCode,
          text: formData.text.trim(),
          authorName: formData.authorName.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      // Success! Clear the text field and show success message
      setSuccess(true);
      setFormData({ ...formData, text: '' }); // Clear only the message, keep the name
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
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

  if (error && !recipientName) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="text-center">
          <div className="text-5xl mb-6">❌</div>
          <p className="font-pixel text-xl text-textPrimary mb-4">{error}</p>
          <button
            onClick={() => router.push('/')}
            className="px-8 py-3 bg-white text-textPrimary font-pixel text-lg border-4 border-black hover:bg-secondary transition-colors"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background flex flex-col px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-pixel font-bold text-textPrimary mb-4">
          Write a message for {recipientName}
        </h1>
        <p className="font-pixel text-textSecondary">
          Your message will appear as a surprise note! ✨
        </p>
      </div>

      {/* Success Message */}
      {success && (
        <div className="mb-6 p-4 bg-green-100 border-4 border-green-500 text-center">
          <p className="font-pixel text-green-800 text-lg">
            ✅ Se envió con éxito!
          </p>
          <p className="font-pixel text-green-600 text-sm mt-2">
            You can send more messages 💌
          </p>
        </div>
      )}

      {/* Error Message */}
      {error && recipientName && (
        <div className="mb-6 p-4 bg-red-100 border-4 border-red-500 text-center">
          <p className="font-pixel text-red-800">{error}</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col max-w-2xl mx-auto w-full">
        <div className="space-y-6 flex-1">
          {/* Author Name */}
          <div>
            <label className="block font-pixel text-textPrimary mb-3 text-lg">
              Your name:
            </label>
            <input
              type="text"
              value={formData.authorName}
              onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
              className="w-full px-4 py-3 font-pixel text-lg border-4 border-black bg-white focus:outline-none focus:bg-secondary"
              placeholder="Who is this from?"
              disabled={submitting}
            />
          </div>

          {/* Message */}
          <div className="flex-1">
            <label className="block font-pixel text-textPrimary mb-3 text-lg">
              Your message:
            </label>
            <textarea
              value={formData.text}
              onChange={(e) => setFormData({ ...formData, text: e.target.value })}
              className="w-full px-4 py-3 font-pixel text-lg border-4 border-black bg-white focus:outline-none focus:bg-secondary resize-none min-h-[200px]"
              placeholder="Write something beautiful..."
              disabled={submitting}
              maxLength={500}
            />
            <p className="text-sm font-pixel text-textSecondary mt-2">
              {formData.text.length}/500 characters
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8 text-center px-4">
          <button
            type="submit"
            disabled={submitting || !formData.text.trim() || !formData.authorName.trim()}
            className={`px-6 py-3 font-pixel text-base border-4 border-black transition-colors ${
              submitting || !formData.text.trim() || !formData.authorName.trim()
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-white text-textPrimary hover:bg-secondary'
            }`}
            style={{
              clipPath: 'polygon(0 0, 8px 0, 8px 3px, 100% 3px, 100% calc(100% - 3px), calc(100% - 8px) calc(100% - 3px), calc(100% - 8px) 100%, 0 100%)'
            }}
          >
            {submitting ? 'Sending...' : 'Send message 💌'}
          </button>
        </div>
      </form>
    </main>
  );
}
