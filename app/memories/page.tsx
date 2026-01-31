'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface DailyQuote {
  id: string;
  date: string;
  quote: {
    text: string;
    authorName: string;
  };
}

export default function MemoriesPage() {
  const router = useRouter();
  const [memories, setMemories] = useState<DailyQuote[]>([]);
  const [selectedMemory, setSelectedMemory] = useState<DailyQuote | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
      return;
    }

    fetchMemories(token);
  }, []);

  const fetchMemories = async (token: string) => {
    try {
      const res = await fetch('/api/quotes/history', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error('Failed to fetch memories');

      const data = await res.json();
      setMemories(data.memories);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching memories:', error);
      setLoading(false);
    }
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const hasMemory = (day: number) => {
    const dateStr = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    ).toISOString().split('T')[0];
    
    return memories.find(m => m.date.split('T')[0] === dateStr);
  };

  const handleDayClick = (day: number) => {
    const memory = hasMemory(day);
    if (memory) {
      setSelectedMemory(memory);
    }
  };

  const changeMonth = (offset: number) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + offset, 1));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary/20">
        <div className="text-center">
          <div className="text-5xl animate-bounce mb-4">💌</div>
          <p className="font-pixel text-textSecondary">Loading memories...</p>
        </div>
      </div>
    );
  }

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);
  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Link href="/dashboard" className="flex items-center gap-2 w-fit">
            <span className="text-2xl">💌</span>
            <span className="font-retro text-sm text-primary">Daily Love Notes</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-retro text-textPrimary mb-2">
            📅 Memory Lane
          </h1>
          <p className="font-pixel text-lg text-textSecondary">
            Revisit your past messages
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          {/* Month Navigation */}
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => changeMonth(-1)}
              className="px-4 py-2 bg-secondary text-white font-retro text-xs rounded-lg hover:bg-primary transition-colors"
            >
              ←
            </button>
            <h2 className="font-retro text-sm text-textPrimary">{monthName}</h2>
            <button
              onClick={() => changeMonth(1)}
              disabled={currentMonth.getMonth() === new Date().getMonth() && currentMonth.getFullYear() === new Date().getFullYear()}
              className="px-4 py-2 bg-secondary text-white font-retro text-xs rounded-lg hover:bg-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              →
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {/* Day Headers */}
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
              <div key={i} className="text-center font-retro text-xs text-textSecondary py-2">
                {day}
              </div>
            ))}

            {/* Empty cells for days before month starts */}
            {Array.from({ length: startingDayOfWeek }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}

            {/* Days of the month */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const memory = hasMemory(day);
              const isToday = 
                day === new Date().getDate() && 
                currentMonth.getMonth() === new Date().getMonth() &&
                currentMonth.getFullYear() === new Date().getFullYear();

              return (
                <button
                  key={day}
                  onClick={() => handleDayClick(day)}
                  disabled={!memory}
                  className={`
                    aspect-square rounded-lg font-pixel text-sm flex items-center justify-center
                    transition-all duration-200
                    ${memory 
                      ? 'bg-primary text-white hover:bg-accent cursor-pointer animate-pulse-slow' 
                      : 'bg-gray-100 text-textSecondary cursor-default'
                    }
                    ${isToday ? 'ring-2 ring-accent' : ''}
                  `}
                >
                  <span className="relative">
                    {day}
                    {memory && <span className="absolute -top-1 -right-2 text-xs">💕</span>}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-6 flex justify-center gap-4 text-xs font-pixel text-textSecondary">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-primary"></div>
              <span>Has message</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gray-100"></div>
              <span>No message</span>
            </div>
          </div>
        </div>

        {/* Selected Memory Display */}
        {selectedMemory && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 animate-fadeIn">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-retro text-sm text-primary">
                {new Date(selectedMemory.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </h3>
              <button
                onClick={() => setSelectedMemory(null)}
                className="text-textSecondary hover:text-primary font-pixel text-sm"
              >
                ✕
              </button>
            </div>
            <p className="font-pixel text-xl text-textPrimary leading-relaxed mb-4">
              "{selectedMemory.quote.text}"
            </p>
            <p className="font-retro text-xs text-primary text-right">
              From: {selectedMemory.quote.authorName} 💕
            </p>
          </div>
        )}

        {/* Stats */}
        <div className="bg-secondary/30 rounded-lg p-6 text-center mb-8">
          <p className="font-pixel text-textPrimary">
            You've received <span className="font-retro text-primary">{memories.length}</span> love {memories.length === 1 ? 'note' : 'notes'} so far! 💕
          </p>
        </div>

        {/* Back Button */}
        <div className="text-center">
          <Link
            href="/dashboard"
            className="inline-block px-6 py-3 bg-white text-primary font-retro text-xs rounded-lg border-2 border-primary hover:bg-primary hover:text-white transition-colors duration-300"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
