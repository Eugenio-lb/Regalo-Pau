import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-background to-secondary/20">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Logo/Title */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-retro text-primary animate-pulse-slow">
            💌
          </h1>
          <h2 className="text-3xl md:text-4xl font-retro text-textPrimary">
            Daily Love Notes
          </h2>
          <p className="text-xl md:text-2xl text-textSecondary font-pixel">
            Daily inspiration from your loved ones
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
          <Link
            href="/auth/login"
            className="w-full sm:w-auto px-8 py-4 bg-primary text-white font-retro text-sm rounded-lg hover:bg-accent transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Login
          </Link>
          <Link
            href="/auth/register"
            className="w-full sm:w-auto px-8 py-4 bg-white text-primary font-retro text-sm rounded-lg border-2 border-primary hover:bg-primary hover:text-white transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Sign Up
          </Link>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-3">✨</div>
            <h3 className="font-retro text-sm text-textPrimary mb-2">Daily Inspiration</h3>
            <p className="text-textSecondary font-pixel text-sm">
              Get a new message every day
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-3">💕</div>
            <h3 className="font-retro text-sm text-textPrimary mb-2">From Friends</h3>
            <p className="text-textSecondary font-pixel text-sm">
              Messages from people who care
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-3">📅</div>
            <h3 className="font-retro text-sm text-textPrimary mb-2">Memory Lane</h3>
            <p className="text-textSecondary font-pixel text-sm">
              Revisit past messages anytime
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
