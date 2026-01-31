import Link from 'next/link';

export default function ThanksPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary/20 p-6">
      <div className="max-w-lg w-full text-center">
        {/* Success Icon */}
        <div className="mb-8 animate-bounce">
          <span className="text-7xl">✨</span>
        </div>

        {/* Message */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h1 className="text-3xl font-retro text-primary mb-4">
            Thank You! 💕
          </h1>
          <p className="font-pixel text-lg text-textPrimary mb-4">
            Your message has been sent successfully!
          </p>
          <p className="font-pixel text-textSecondary">
            It will brighten their day as a special surprise. You're awesome! 🌟
          </p>
        </div>

        {/* Additional Message */}
        <div className="bg-success/20 rounded-lg p-6 mb-8">
          <p className="font-pixel text-sm text-textPrimary">
            Want to send another message? Feel free to send as many as you'd like!
          </p>
        </div>

        {/* Back Button */}
        <Link
          href="/"
          className="inline-block px-8 py-4 bg-primary text-white font-retro text-sm rounded-lg hover:bg-accent transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Go to Homepage
        </Link>
      </div>
    </main>
  );
}
