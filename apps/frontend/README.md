# Code Reviewer AI - Frontend

A professional, modern frontend for AI-powered code analysis built with **Next.js 16**, **Material-UI v9**, and **Framer Motion**. Features advanced animations, glassmorphic design, dark mode support, and real-time code review using Google Gemini API.

## 🎨 Features

- **Professional UI Design**: Glassmorphic cards with backdrop blur effects
- **Advanced Animations**: Smooth transitions, hover effects, and interactive elements using Framer Motion
- **Dark/Light Mode**: Full theme support with instant switching
- **Animated Background**: 
  - Pulsating grid with integrated waterfall effect
  - Floating gradient orbs with smooth motion
  - Mouse-reactive glow that follows your cursor
  - Custom animated cursor (dark/light mode variants)
- **Monaco Editor Integration**: Full-featured code editor with 16px font and language detection
- **Real-Time Code Analysis**: Integrates with Google Gemini API for intelligent code reviews
- **Responsive Design**: Mobile-first CSS Grid layout (2-column desktop, 1-column mobile)
- **Tab Interface**: Organized review results in 5 tabs:
  - 🔒 Security Issues
  - ⚡ Performance Optimization
  - 📋 Maintainability
  - 💡 Improvements
  - ⭐ Praise & Strengths
- **Loading States**: Smooth animations for loading, empty, and error states

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (or npm/yarn)
- Backend running on `http://localhost:3001`

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI Library**: Material-UI v9
- **Animations**: Framer Motion v12
- **Code Editor**: Monaco Editor
- **Styling**: CSS-in-JS + CSS Grid
- **Language**: TypeScript
- **State Management**: React Hooks
- **API**: REST (connects to NestJS backend)

## 📁 Project Structure

```
src/
├── components/
│   ├── AnimatedBackground.tsx      # Animated grid + orbs + cursor effects
│   ├── Header.tsx                  # Navigation & theme toggle
│   ├── CodeEditor.tsx              # Monaco editor with controls
│   ├── ReviewResults.tsx           # Results display with tabs
│   └── StateComponents.tsx         # Loading, empty, error states
├── hooks/
│   └── useTheme.ts                 # Dark/light mode management
├── lib/
│   ├── api.ts                      # Backend API client
│   └── theme.ts                    # Material-UI theme config
└── types/
    └── (type definitions)

app/
├── layout.tsx                      # Root layout
├── client-layout.tsx               # Client-side wrapper
├── page.tsx                        # Main page
└── globals.css                     # Global styles
```

## 🎮 Usage

### Analyze Code
1. Paste or upload code into the editor
2. Select programming language (auto-detected)
3. Click "Analyze Code" button
4. View results across organized tabs

### Toggle Dark Mode
- Click the theme toggle button in the header
- All animations adapt instantly to your selection

### Interactive Features
- **Hover Effects**: Cards and buttons have smooth scale animations
- **Mouse Tracking**: Glow effect follows your cursor
- **Keyboard Shortcuts**: Editor supports standard code editor shortcuts

## 🎨 Animation Details

### Grid Animation
- **Pulsation**: Opacity cycles 4 seconds (0.35 → 0.65)
- **Waterfall Effect**: Grid lines shift downward 50px every 3 seconds
- **Grid Size**: 50x50px

### Mouse Effects
- **Primary Glow**: 500px radius, pulses 3 seconds
- **Secondary Glow**: 700px radius, staggered by 0.2s
- **Custom Cursor**: Glowing dot matching theme colors

### Component Animations
- **Entrance**: 0.5s fade-in from offset position
- **Hover**: Scale 1.05 with smooth transition
- **Tap**: Scale 0.95 for tactile feedback
- **Loading**: Rotating spinner with bouncing dots

## 🌓 Theme Colors

**Dark Mode:**
- Background: `#0a0e27`
- Grid: `rgba(100, 200, 255, 0.15)`
- Glow: `rgba(0, 188, 212, 0.35)`

**Light Mode:**
- Background: `#f8fafb`
- Grid: `rgba(25, 118, 210, 0.1)`
- Glow: `rgba(25, 118, 210, 0.25)`

## 🔗 Backend Integration

The frontend communicates with a NestJS backend running on `http://localhost:3001` for:
- Code analysis via Google Gemini API
- Rate limiting (60 requests/hour)
- Response parsing and formatting

## 📦 Build & Deployment

### Development
```bash
pnpm dev
```

### Production Build
```bash
pnpm build
pnpm start
```

### Vercel Deployment
Push to GitHub and connect your repository to Vercel for one-click deployment.

## 🎯 Performance Optimizations

- `willChange` CSS for GPU acceleration on animations
- Fixed positioning for mouse glow effects
- CSS variables for real-time performance
- Optimized background animations with `repeat: Infinity`
- Lazy loading of components

## 📝 License

Part of the Code Reviewer AI project.
