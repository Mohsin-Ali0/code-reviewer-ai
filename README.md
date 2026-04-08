# 🚀 CodeReview AI - Intelligent Code Analysis Platform

AI-powered code reviewer built with **Next.js**, **NestJS**, and **Google Gemini API**. Analyzes code for security vulnerabilities, performance issues, maintainability problems, and provides actionable improvements with professional UI.

---

## 🌟 Features

✅ **Security Analysis** - Detects vulnerabilities and security concerns  
✅ **Performance Review** - Identifies optimization opportunities  
✅ **Maintainability Score** - Cognitive complexity analysis  
✅ **Code Improvements** - Side-by-side before/after suggestions  
✅ **Praise & Feedback** - Positive observations on good practices  
✅ **Dark Mode** - Light/dark theme toggle with system preference  
✅ **Export Options** - Download reviews as JSON  
✅ **Rate Limiting** - 60 requests/hour per IP  
✅ **Type-Safe** - Full TypeScript across stack  
✅ **Responsive** - Mobile-first design  

---

## 🏗️ Architecture

### Monorepo Structure
```
code-reviewer-ai/
├── apps/
│   ├── backend/          # NestJS API
│   └── frontend/         # Next.js App Router UI
├── packages/
│   └── types/           # Shared TypeScript types
├── package.json         # Root workspace
└── pnpm-workspace.yaml  # PNPM monorepo config
```

### Tech Stack

**Backend:**
- NestJS 11 - Modular Node.js framework
- @google/generative-ai - Gemini API integration
- @nestjs/throttler - Rate limiting
- class-validator - DTO validation
- TypeScript 5

**Frontend:**
- Next.js 16 - React with App Router
- Material-UI (MUI) 9 - Professional components
- Framer Motion - Smooth animations
- Monaco Editor - Advanced code editor
- TypeScript 5
- Tailwind CSS - Utility styling

**Shared:**
- TypeScript types
- Shared domain interfaces

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js 18+ 
- pnpm 8+ (or npm/yarn)
- Google Gemini API key [Get free here](https://makersuite.google.com/app/apikey)

### 1. Install Dependencies

```bash
# Install pnpm if not already installed
npm install -g pnpm

# Install all workspace dependencies
pnpm install
```

### 2. Configure Environment Variables

**Backend** - Create `apps/backend/.env`:
```env
# Get from https://makersuite.google.com/app/apikey
GEMINI_API_KEY=your_api_key_here

PORT=3001
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

**Frontend** - Create `apps/frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 3. Run Locally

```bash
# Terminal 1: Start backend (runs on http://localhost:3001)
cd apps/backend
pnpm run dev

# Terminal 2: Start frontend (runs on http://localhost:3000)
cd apps/frontend
pnpm run dev
```

Visit: **http://localhost:3000**

---

## 🧪 API Reference

### POST `/api/reviews`

Analyzes code and returns structured review.

**Request:**
```json
{
  "code": "function add(a, b) { return a + b; }",
  "language": "javascript",
  "context": "Optional context about the code"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "timestamp": "2026-04-07T10:30:00Z",
    "code": { "language": "javascript", "lines": 1 },
    "security": {
      "level": "LOW",
      "findings": []
    },
    "performance": {
      "suggestions": []
    },
    "maintainability": {
      "cognitiveComplexity": 5,
      "issues": []
    },
    "improvements": [],
    "praiseNotes": [
      "Simple and readable code",
      "Good function naming"
    ]
  }
}
```

**Rate Limit:** 60 requests/hour  
**Timeout:** 45 seconds

---

## 🎨 UI Components

- **Header** - Branding, dark mode toggle, GitHub link
- **CodeEditor** - Monaco editor with language selector, file upload
- **ReviewResults** - 5 tabbed interface (Security, Performance, Maintainability, Improvements, Praise)
- **LoadingState** - Animated spinner with progress message
- **EmptyState** - Guided onboarding
- **ErrorState** - Error messages with recovery hints

---

## 🚀 Deployment

### Frontend → Vercel

```bash
# Vercel auto-deploys from Git
# 1. Push to GitHub
# 2. Connect repo on vercel.com
# 3. Set environment variable:
#    NEXT_PUBLIC_API_URL=https://your-backend.com

vercel deploy
```

### Backend → Railway or Render

**Railway:**
```bash
# 1. Connect GitHub repo on railway.app
# 2. Set build command: pnpm build
# 3. Set start command: node dist/main.js
# 4. Add environment variable: GEMINI_API_KEY
# 5. Railway generates public URL
```

**Render:**
```bash
# 1. Create new Web Service
# 2. Connect GitHub
# 3. Build command: pnpm install && pnpm run build
# 4. Start command: node dist/main.js (in /apps/backend)
# 5. Set environment: GEMINI_API_KEY, PORT=3001
```

---

## 📊 Supported Languages

TypeScript, JavaScript, Python, Java, C++, Go, Rust, PHP, SQL, HTML, CSS, JSON, and more via Monaco Editor.

---

## 🔒 Security Features

- **Input Validation** - All inputs validated with class-validator
- **Rate Limiting** - @nestjs/throttler (60 req/hour)
- **CORS** - Configured for frontend domain only
- **Input Truncation** - Large code files truncated to save tokens
- **Timeout Protection** - 45-second API timeout with graceful degradation

---

## 📈 Performance

- **Frontend:**
  - Lighthouse: 90+ Performance, 95+ Accessibility
  - Code splitting & lazy loading
  - Image optimization

- **Backend:**
  - Stateless design for horizontal scaling
  - Token optimization (truncate code to 8000 lines max)
  - Caching via HTTP headers
  - Rate limiting per IP

---

## 🧑‍💻 Development

### Backend Development

```bash
cd apps/backend

# Run in watch mode
pnpm run dev

# Build
pnpm run build

# Run tests
pnpm run test

# Run E2E tests
pnpm run test:e2e

# Lint
pnpm run lint
```

### Frontend Development

```bash
cd apps/frontend

# Run in watch mode
pnpm run dev

# Build
pnpm run build

# Start production build
pnpm run start

# Lint
pnpm run lint
```

### TypeScript Validation

```bash
cd apps/backend
pnpm exec tsc --noEmit

cd apps/frontend
pnpm exec tsc --noEmit
```

---

## 📦 Monorepo Commands

```bash
# From root directory

# Install all dependencies
pnpm install

# Run dev in all apps (parallel)
pnpm dev

# Build all apps
pnpm build

# Lint all apps
pnpm lint

# Format all files
pnpm format
```

---

## 🐛 Troubleshooting

**Problem:** `GEMINI_API_KEY not found`
- **Solution:** Add API key to `apps/backend/.env`

**Problem:** CORS error on frontend
- **Solution:** Ensure `FRONTEND_URL` in backend .env matches frontend domain

**Problem:** Monaco Editor not loading
- **Solution:** Check if `@monaco-editor/react` is installed: `pnpm ls @monaco-editor/react`

**Problem:** Rate limit hit (429)
- **Solution:** Wait 1 hour or deploy multiple backend instances with load balancer

---

## 📝 Environment Variables

### Backend (`apps/backend/.env`)
```env
GEMINI_API_KEY=your_gemini_api_key
PORT=3001
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

### Frontend (`apps/frontend/.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

---

## 🎓 Learning Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [Next.js Documentation](https://nextjs.org/docs)
- [Material-UI Documentation](https://mui.com/material-ui/getting-started/)
- [Google Generative AI](https://ai.google.dev/docs)
- [Framer Motion](https://www.framer.com/motion/)

---

## 📄 License

MIT - Feel free to use for personal or commercial projects

---

## 🤝 Contributing

Contributions welcome! Please follow:
1. Fork repository
2. Create feature branch (`git checkout -b feat/amazing-feature`)
3. Commit changes (`git commit -m 'feat: add amazing feature'`)
4. Push to branch (`git push origin feat/amazing-feature`)
5. Open Pull Request

---

## ✨ Next Steps / TODO

- [ ] Add database (PostgreSQL + Prisma) for review history
- [ ] GitHub OAuth login
- [ ] PDF export with styling
- [ ] Real-time WebSocket results streaming
- [ ] Batch file analysis
- [ ] Advanced codebase context via Git parsing
- [ ] Custom rule configuration
- [ ] Team/organization support
- [ ] Analytics dashboard

---

## 📧 Support

For issues, questions, or suggestions:
- GitHub Issues: [Create issue]
- Email: s.mohsinali.se@gmail.com

---

**Happy coding! 🚀**
