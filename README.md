# TrucksOnFlex 🚛

**Flexible Truck Rentals & Financing**

A modern, full-stack web application for commercial truck rentals and financing. Built with React, TypeScript, and Supabase.

---

## 🌐 Live Site

**Production:** [https://trucksonflex.com](https://trucksonflex.com)

---

## 🚀 Features

### For Customers:
- Browse available trucks with detailed specifications
- Filter by make, model, and year
- Flexible payment plans (weekly, monthly, rent-to-own)
- Online order and financing applications
- Real-time order tracking and status updates
- User dashboard with order history
- Secure authentication with Supabase

### For Admins:
- Manage truck inventory
- Process orders and payments
- Real-time order notifications
- Payment proof verification

### Technical Features:
- Responsive mobile-first design
- Code splitting and lazy loading
- Optimized bundle with manual chunking
- React Query for data caching
- Error boundaries for stability
- PWA-ready with web manifest
- Social media optimization (Open Graph, Twitter Cards)

---

## 🛠️ Tech Stack

### Frontend:
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Component library
- **Radix UI** - Accessible primitives
- **Lucide React** - Icon library

### Backend:
- **Supabase** - Backend as a Service
  - PostgreSQL database
  - Authentication
  - Real-time subscriptions
  - Row Level Security (RLS)

### State Management:
- **TanStack React Query** - Server state management
- **React Hook Form** - Form state and validation
- **Zod** - Schema validation

### Development:
- **ESLint** - Code linting
- **TypeScript ESLint** - TypeScript linting
- **Vite SWC** - Fast refresh and bundling

---

## 📦 Installation

### Prerequisites:
- Node.js 18+ and npm
- Supabase account (free tier available)

### Steps:

1. **Clone the repository:**
```bash
git clone https://github.com/Unendingmould/driveon-rentals.git
cd driveon-rentals
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**

Create a `.env.local` file in the root directory:
```bash
cp .env.example .env.local
```

Add your Supabase credentials:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

Get these from your Supabase project: **Settings → API**

4. **Set up the database:**

Run the SQL schema from `supabase/schema.sql` in your Supabase SQL Editor.

5. **Start development server:**
```bash
npm run dev
```

Visit `http://localhost:8080`

---

## 🏗️ Build

### Development build:
```bash
npm run build:dev
```

### Production build:
```bash
npm run build
```

### Preview production build:
```bash
npm run preview
```

---

## 📁 Project Structure

```
driveon-rentals/
├── public/              # Static assets
│   ├── favicon logo sizes/  # Favicon variants
│   ├── trucks logo/         # Truck brand logos
│   └── *.png, *.svg        # Images
├── src/
│   ├── assets/          # Local images
│   ├── components/      # React components
│   │   ├── ui/         # shadcn/ui components
│   │   └── *.tsx       # Feature components
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions
│   ├── pages/          # Route pages
│   ├── providers/      # Context providers
│   ├── services/       # API services
│   ├── types/          # TypeScript types
│   ├── App.tsx         # Root component
│   ├── main.tsx        # Entry point
│   └── index.css       # Global styles
├── supabase/           # Supabase configuration
│   └── schema.sql      # Database schema
├── .env.example        # Environment template
├── vite.config.ts      # Vite configuration
├── tailwind.config.ts  # Tailwind configuration
└── package.json        # Dependencies
```

---

## 🔑 Environment Variables

### Required:
```env
VITE_SUPABASE_URL=          # Your Supabase project URL
VITE_SUPABASE_ANON_KEY=     # Your Supabase anonymous key
```

### Optional:
```env
# Add any third-party API keys here
```

See `.env.example` for full documentation.

---

## 🚢 Deployment

### Recommended: Netlify

1. **Push to GitHub:**
```bash
git push origin main
```

2. **Connect to Netlify:**
   - Go to [Netlify](https://app.netlify.com/)
   - Import your GitHub repository
   - Configure build settings:
     - **Build command:** `npm run build`
     - **Publish directory:** `dist`

3. **Add environment variables:**
   - In Netlify: Site Settings → Environment Variables
   - Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

4. **Deploy!**
   - Netlify auto-deploys on every push to main

### Custom Domain:
1. In Netlify: Domain Settings → Add custom domain
2. Update DNS at your registrar
3. Wait for DNS propagation (1-24 hours)

See `DEPLOYMENT_GUIDE.md` for detailed instructions.

---

## 🧪 Testing

### Run linter:
```bash
npm run lint
```

### Type checking:
TypeScript checks run automatically during build.

---

## 📊 Performance

### Bundle Optimization:
- Code splitting for authenticated routes
- Lazy loading with React.lazy()
- Manual chunks for vendor code
- Tree shaking enabled
- Minification in production

### Current Bundle Size:
- Main bundle: ~2.4 MB (gzipped)
- Vendor chunks: ~250 KB (gzipped)
- Lazy routes: ~10-15 KB each

---

## 🔒 Security

- Environment variables for sensitive data
- Supabase Row Level Security (RLS)
- No API keys in client code
- HTTPS enforced in production
- Input validation with Zod
- XSS protection with React

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📝 License

This project is private and proprietary.

---

## 👥 Team

**TrucksOnFlex** - Flexible truck rentals and financing solutions

---

## 📞 Support

For questions or support:
- **Website:** [trucksonflex.com](https://trucksonflex.com)
- **Email:** Contact via website
- **Issues:** Use GitHub Issues for bug reports

---

## 🗺️ Roadmap

- ✅ Core truck rental features
- ✅ User authentication
- ✅ Payment tracking
- ✅ Admin dashboard
- ✅ Mobile optimization
- ⏳ Real-time notifications
- ⏳ Payment gateway integration
- ⏳ Advanced search filters
- ⏳ Truck comparison feature

---

**Built with ❤️ for the trucking industry**
