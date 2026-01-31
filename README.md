# 💌 Daily Love Notes

A PWA application where users receive daily motivational messages from their friends.

## 🎨 Design Features

- **Minimalist Pink Theme**: Beautiful retro-inspired design with pink color palette
- **8-bit Fonts**: Press Start 2P and VT323 fonts for a nostalgic feel  
- **Typewriter Animation**: Messages appear with a typewriter effect
- **PWA Ready**: Installable on mobile devices with offline support

## 🏗️ Tech Stack

- **Frontend**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Auth**: JWT + bcrypt
- **PWA**: @ducanh2912/next-pwa
- **Animations**: Framer Motion

## 📊 Database Schema

- **User**: The main recipient (your friend)
- **Quote**: Motivational messages (from friends or defaults)
- **DailyQuote**: Daily message history for calendar view

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Database

#### Option A: Local Postgres
```bash
createdb daily_love_notes
```

#### Option B: Vercel Postgres (for production)
```bash
npx create-db
```

### 3. Configure .env
```env
DATABASE_URL="postgresql://..."
JWT_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

### 4. Run Migrations
```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 5. Start Dev Server
```bash
npm run dev
```

## 📱 Pages

- `/` - Landing page ✅
- `/auth/register` - Registration (TODO)
- `/auth/login` - Login (TODO)
- `/dashboard` - Daily message button (TODO)
- `/memories` - Calendar of past messages (TODO)
- `/contribute/[code]` - Friends submit messages (TODO)

## 🎯 User Flow

**Main User (Your Friend):**
1. Register → Get invite link
2. Share with friends
3. Click button daily for message
4. View past messages in calendar

**Friends:**
1. Open invite link
2. Submit motivational message
3. See "Thanks" confirmation

## 🎨 Color Palette

- Primary: `#FF69B4` (Hot Pink)
- Secondary: `#FFB6C1` (Light Pink)
- Accent: `#FF1493` (Deep Pink)
- Background: `#FFF5F7`

## 📝 Progress

### ✅ Completed
- [x] Project setup with Next.js 14
- [x] Tailwind configuration with pink theme
- [x] Prisma schema design
- [x] Landing page with 8-bit design
- [x] PWA configuration
- [x] Auth utilities

### 🚧 Next Steps
- [ ] Authentication pages
- [ ] Dashboard with daily quote
- [ ] Contribute page for friends
- [ ] Calendar/Memory Lane
- [ ] API routes
- [ ] Seed default quotes
- [ ] Deploy to Vercel

## 🛠️ Commands

```bash
npm run dev          # Development server
npm run build        # Build for production
npx prisma studio    # Database GUI
npx prisma generate  # Generate Prisma client
```

---

Made with 💕 for Pau
