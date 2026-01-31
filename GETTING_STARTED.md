# 🚀 Getting Started with Daily Love Notes

## Prerequisites

- Node.js 18+ installed
- PostgreSQL installed (or use Vercel Postgres)
- A code editor (VS Code recommended)

## Step-by-Step Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Database

#### Option A: Local PostgreSQL (Development)

```bash
# Install PostgreSQL (macOS)
brew install postgresql@14
brew services start postgresql@14

# Create database
createdb daily_love_notes
```

#### Option B: Vercel Postgres (Production-ready)

```bash
# Run this command and follow the prompts
npx create-db

# Copy the DATABASE_URL it provides
```

### 3. Configure Environment Variables

Edit the `.env` file in the root directory:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/daily_love_notes"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production-12345"
NEXTAUTH_URL="http://localhost:3000"
```

**Important**: Change the `JWT_SECRET` to a random secure string!

### 4. Run Database Migrations

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations to create tables
npx prisma migrate dev --name init
```

### 5. Seed Default Quotes (Recommended)

```bash
# First, register a user through the app
npm run dev
# Go to http://localhost:3000 and create an account

# Then run the seed
npm run seed
```

### 6. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser!

## 📱 How to Use

### For the Main User (Your Friend):

1. **Register**: Go to `/auth/register` and create an account
2. **Login**: Use your credentials
3. **Get Invite Link**: Click "Share Invite Link" on the dashboard
4. **Share**: Send the link to friends via WhatsApp, email, etc.
5. **Daily Message**: Click the big button on the dashboard each day
6. **View Memories**: Check past messages in the calendar view

### For Friends (Contributors):

1. **Open Link**: Click the invite link shared by your friend
2. **Write Message**: Enter your name and a motivational message
3. **Submit**: Your message is saved and will appear as a surprise!
4. **Send More**: You can send as many messages as you want!

## 🛠️ Useful Commands

```bash
# Development
npm run dev              # Start dev server (localhost:3000)

# Database
npx prisma studio        # Open database GUI
npx prisma generate      # Regenerate Prisma Client
npx prisma migrate dev   # Create new migration
npx prisma db push       # Push schema without migration

# Seed
npm run seed             # Add default quotes

# Production
npm run build            # Build for production
npm start                # Start production server
```

## 🎨 Testing the App

### Test Flow:

1. **Register** as the main user
2. **Run seed** to add default quotes
3. **Copy invite link** from `/invite`
4. **Open invite link** in incognito/private window
5. **Submit a test message** as a friend
6. **Back to dashboard**, click the button to get today's message
7. **Check memories** to see the calendar

## 📦 Project Structure

```
regalo-pau/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── layout.tsx                  # Root layout
│   ├── globals.css                 # Global styles
│   ├── auth/
│   │   ├── login/page.tsx         # Login page
│   │   └── register/page.tsx      # Register page
│   ├── dashboard/page.tsx          # Main dashboard
│   ├── memories/page.tsx           # Calendar view
│   ├── invite/page.tsx             # Invite link page
│   ├── contribute/[code]/page.tsx  # Friend contribution
│   ├── thanks/page.tsx             # Thank you page
│   └── api/
│       ├── auth/
│       │   ├── register/route.ts
│       │   ├── login/route.ts
│       │   └── me/route.ts
│       ├── quotes/
│       │   ├── daily/route.ts
│       │   ├── contribute/route.ts
│       │   └── history/route.ts
│       └── users/[code]/route.ts
├── lib/
│   ├── prisma.ts                   # Prisma client
│   └── auth.ts                     # Auth utilities
├── prisma/
│   ├── schema.prisma               # Database schema
│   └── seed.ts                     # Seed script
├── public/
│   └── manifest.json               # PWA manifest
└── tailwind.config.ts              # Tailwind config
```

## 🐛 Troubleshooting

### "Module '@prisma/client' not found"
```bash
npx prisma generate
```

### "Database connection error"
- Check your DATABASE_URL in `.env`
- Make sure PostgreSQL is running
- Verify database exists: `psql -l`

### "No quotes available"
- Register a user first
- Run `npm run seed`
- Or have friends submit messages via invite link

### Port 3000 already in use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
npm run dev -- -p 3001
```

## 🚢 Deploying to Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### 2. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Select your GitHub repository
4. Add environment variables:
   - `DATABASE_URL` (from Vercel Postgres)
   - `JWT_SECRET`
   - `NEXTAUTH_URL` (your vercel domain)
5. Deploy!

### 3. Setup Vercel Postgres

1. In Vercel project, go to "Storage"
2. Create new Postgres database
3. Copy DATABASE_URL to environment variables
4. Redeploy

### 4. Run Migrations on Production

```bash
# In Vercel project settings, add build command:
npx prisma migrate deploy && npx prisma generate && next build
```

## 🎁 Final Steps Before Gifting

- [ ] Test all user flows
- [ ] Add at least 20 default quotes via seed
- [ ] Test PWA installation on mobile
- [ ] Customize default quotes for your friend
- [ ] Test invite link on different devices
- [ ] Deploy to production
- [ ] Get a nice domain name (optional)
- [ ] Share with your friend! 🎉

## 💡 Tips

- The app shows one message per day (resets at midnight)
- Friends can send unlimited messages
- Messages are shown randomly
- Calendar only shows days with messages
- Default quotes ensure there's always content

---

Enjoy building this special gift! 💕
