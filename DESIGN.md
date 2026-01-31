# 🎨 Design Document - Daily Love Notes

## Overview
PWA para que tu amiga reciba mensajes motivadores diarios de sus amigos mientras viaja.

## User Personas

### 1. Pau (Usuario Principal)
- **Objetivo**: Recibir mensajes motivadores de sus amigos cuando viaja
- **Necesidades**: 
  - Ver un mensaje nuevo cada día
  - Revisar mensajes pasados en formato calendario
  - Compartir link fácilmente con amigos

### 2. Amigos
- **Objetivo**: Enviar mensajes de ánimo a Pau
- **Necesidades**:
  - Proceso simple sin registro
  - Escribir mensajes personalizados
  - Confirmación de envío

## Design System

### Colors (Rosa Minimalista)
```
Primary:    #FF69B4 - Hot Pink (botones principales, accents)
Secondary:  #FFB6C1 - Light Pink (backgrounds secundarios)
Accent:     #FF1493 - Deep Pink (hover states, highlights)
Background: #FFF5F7 - Very Light Pink (fondo principal)
Card BG:    #FFFFFF - White (cards, modals)
Text:       #2D2D2D - Dark Gray (texto principal)
Text 2:     #8B8B8B - Medium Gray (texto secundario)
Success:    #98D8C8 - Mint (confirmaciones)
```

### Typography
- **Display**: "Press Start 2P" (títulos, botones)
- **Body**: "VT323" (párrafos, texto largo)
- Estilo: Retro 8-bit / Animal Crossing

### Animations
1. **Typewriter Effect**: Para mostrar las frases
2. **Bounce**: Botón principal de "Get Message"
3. **Pulse**: Días con mensajes en calendario
4. **Fade In**: Transiciones suaves
5. **Scale on Hover**: Botones interactivos

## Page Designs

### 1. Landing Page (`/`)
```
┌─────────────────────────────────────┐
│                                     │
│            💌 (animated)            │
│       Daily Love Notes              │
│   Daily inspiration from friends    │
│                                     │
│    [Login]    [Sign Up]             │
│                                     │
│  ┌─────┐  ┌─────┐  ┌─────┐        │
│  │ ✨  │  │ 💕  │  │ 📅  │        │
│  │Daily│  │From │  │Memo │        │
│  └─────┘  └─────┘  └─────┘        │
│                                     │
└─────────────────────────────────────┘
```

### 2. Dashboard (`/dashboard`)
```
┌─────────────────────────────────────┐
│  Daily Love Notes         [Logout]  │
│                                     │
│  Hi, Pau! 💕                       │
│                                     │
│         ┌────────────┐             │
│         │            │             │
│         │    💌     │   ← Bounce  │
│         │            │     anim    │
│         │ Get Today's│             │
│         │  Message   │             │
│         │            │             │
│         └────────────┘             │
│                                     │
│  [View Memories]  [Share Link]     │
│                                     │
└─────────────────────────────────────┘
```

**Cuando presiona el botón:**
```
┌─────────────────────────────────────┐
│                                     │
│    ┌──────────────────────────┐   │
│    │                          │   │
│    │  "You are amazing! Keep  │   │
│    │   going, we believe in   │   │
│    │   you! 💪✨"            │   │
│    │                          │   │
│    │  From: Maria             │   │
│    │                          │   │
│    └──────────────────────────┘   │
│                                     │
│           [View Memories]           │
│                                     │
└─────────────────────────────────────┘
```
*Texto aparece con efecto typewriter*

### 3. Memories/Calendar (`/memories`)
```
┌─────────────────────────────────────┐
│  📅 Memory Lane                     │
│                                     │
│         January 2026                │
│  S   M   T   W   T   F   S         │
│               1   2   3   4         │
│  5   6   💕  8   9  10  11        │
│ 12  13  14  💕 16  17  18         │
│                                     │
│  💕 = Has message (pulse anim)     │
│                                     │
│  ┌──────────────────────────────┐  │
│  │ January 15, 2026             │  │
│  │                              │  │
│  │ "Distance means so little..." │  │
│  │                              │  │
│  │ From: Carlos                 │  │
│  └──────────────────────────────┘  │
│                                     │
│  [← Back to Dashboard]              │
└─────────────────────────────────────┘
```

### 4. Contribute Page (`/contribute/[inviteCode]`)
```
┌─────────────────────────────────────┐
│     💌 Send Love to Pau             │
│                                     │
│  Your Name:                         │
│  ┌───────────────────────────────┐ │
│  │ Maria                         │ │
│  └───────────────────────────────┘ │
│                                     │
│  Your Message:                      │
│  ┌───────────────────────────────┐ │
│  │                               │ │
│  │ Write your motivational       │ │
│  │ message here...               │ │
│  │                               │ │
│  │ (max ~500 characters)         │ │
│  │                               │ │
│  └───────────────────────────────┘ │
│                                     │
│      [Send Message 💕]             │
│                                     │
└─────────────────────────────────────┘
```

**Después de enviar:**
```
┌─────────────────────────────────────┐
│                                     │
│            ✨ Thank You! ✨        │
│                                     │
│  Your message has been sent to Pau! │
│  She'll see it as a daily surprise  │
│            💕                       │
│                                     │
│  Want to send another message?      │
│  [Send Another One]                 │
│                                     │
└─────────────────────────────────────┘
```

### 5. Auth Pages (`/auth/register`, `/auth/login`)

**Register:**
```
┌─────────────────────────────────────┐
│         💌 Join Daily Love Notes    │
│                                     │
│  Name:                              │
│  ┌───────────────────────────────┐ │
│  │                               │ │
│  └───────────────────────────────┘ │
│                                     │
│  Email:                             │
│  ┌───────────────────────────────┐ │
│  │                               │ │
│  └───────────────────────────────┘ │
│                                     │
│  Password:                          │
│  ┌───────────────────────────────┐ │
│  │                               │ │
│  └───────────────────────────────┘ │
│                                     │
│      [Sign Up]                      │
│                                     │
│  Already have an account? [Login]   │
│                                     │
└─────────────────────────────────────┘
```

## Interactions & Micro-animations

1. **Button Hover**: Scale + color change
2. **Card Hover**: Lift shadow
3. **Message Appear**: Typewriter effect
4. **Calendar Days**: Pulse on days with messages
5. **Success Messages**: Fade in with icon
6. **Loading States**: Cute spinner with heart

## Mobile Responsive

### Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Mobile Considerations
- Larger touch targets (min 44x44px)
- Bottom navigation for easy thumb reach
- Simplified calendar view (week by week)
- Full-screen message display

## PWA Features

### Install Prompt
- Show custom install prompt after 2-3 visits
- "Install Daily Love Notes for quick access! 💕"

### Offline Support
- Cache viewed messages
- Show "You're offline" message
- Queue new messages for when online

### Home Screen Icon
- 192x192 and 512x512 PNG icons
- Pink heart icon with white background
- Splash screen with logo

## Accessibility

- ✅ Semantic HTML
- ✅ ARIA labels for icons
- ✅ Keyboard navigation
- ✅ Focus states visible
- ✅ Color contrast (AA minimum)
- ✅ Screen reader friendly

## Future Enhancements (v2)

- 🔔 Push notifications for new messages
- 🎨 Custom themes
- 📸 Photo messages support
- 🎵 Audio messages
- 🌍 Multiple languages
- 📊 Stats (messages received, top contributors)
- ⭐ Favorite messages
- 🏆 Achievements for friends

## Technical Notes

### Performance
- Image optimization
- Lazy loading
- Code splitting by route
- CSS purging (Tailwind)

### Security
- JWT tokens (30 days)
- Password hashing (bcrypt, 10 rounds)
- Rate limiting on API
- HTTPS only (Vercel)

### Database Indexing
- User email (unique)
- User inviteCode (unique)
- Quote userId
- DailyQuote (userId + date) - unique

## Launch Checklist

- [ ] Test all user flows
- [ ] Mobile responsive on iOS/Android
- [ ] PWA installable
- [ ] Seed 20+ default quotes
- [ ] Setup Vercel Postgres
- [ ] Environment variables configured
- [ ] Error boundaries
- [ ] 404/500 pages
- [ ] Analytics (optional)
- [ ] Domain/subdomain
- [ ] Share with Pau! 🎁

---

This design prioritizes simplicity, emotion, and delightful interactions to make Pau feel loved and connected to her friends no matter where she travels. 💕
