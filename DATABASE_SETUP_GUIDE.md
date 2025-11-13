# Database Setup Guide - DriveOn Rentals

## Overview
This document identifies all database resources required for the application to function and provides setup instructions.

## Error Analysis
The red banner error "We couldn't load right now. Try again later" appears when database queries fail due to missing tables or data.

---

## Required Database Tables (Schema: `driveon`)

### 1. **trucks** (Critical - Used on multiple pages)
**Used by:**
- Home page (`/`) - FeaturedTrucks component
- Trucks page (`/trucks`) - Main truck listing
- Truck Checkout page (`/trucks/:slug/checkout`)
- Dashboard (`/dashboard`) - Order truck references
- My Trucks (`/my-trucks`) - Order truck details

**Columns Required:**
```sql
CREATE TABLE driveon.trucks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  make TEXT NOT NULL,
  model TEXT NOT NULL,
  model_year INTEGER,
  mileage INTEGER,
  engine TEXT,
  transmission TEXT,
  vin TEXT,
  exterior_color TEXT,
  interior_color TEXT,
  suspension TEXT,
  axles TEXT,
  condition TEXT,
  warranty TEXT,
  weekly_rate NUMERIC,
  monthly_rate NUMERIC,
  status TEXT DEFAULT 'available',
  short_description TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for filtering available trucks
CREATE INDEX idx_trucks_status ON driveon.trucks(status);
```

**Empty State Behavior:**
- ✅ Home page - Shows placeholder message
- ✅ Trucks page - Shows placeholder trucks (hardcoded fallback)
- ❌ Checkout page - Shows error banner if truck not found

---

### 2. **truck_images** (Critical - Required for truck display)
**Used by:** All pages displaying trucks

**Columns Required:**
```sql
CREATE TABLE driveon.truck_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  truck_id UUID REFERENCES driveon.trucks(id) ON DELETE CASCADE,
  storage_path TEXT NOT NULL,
  alt_text TEXT,
  sort_order INTEGER DEFAULT 0,
  is_primary BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_truck_images_truck_id ON driveon.truck_images(truck_id);
CREATE INDEX idx_truck_images_primary ON driveon.truck_images(is_primary);
```

**Storage Buckets Required:**
- `user-uploads` (default)
- `strickk proof uploads` (for payment proofs)

**Empty State Behavior:**
- ✅ Falls back to Unsplash placeholder images

---

### 3. **orders** (Critical - User dashboard functionality)
**Used by:**
- Dashboard (`/dashboard`)
- My Trucks (`/my-trucks`)

**Columns Required:**
```sql
CREATE TABLE driveon.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  truck_id UUID REFERENCES driveon.trucks(id),
  order_type TEXT CHECK (order_type IN ('purchase', 'rental')),
  status TEXT DEFAULT 'pending_approval',
  total_amount NUMERIC NOT NULL,
  currency TEXT DEFAULT 'USD',
  rental_term TEXT,
  payment_due_at TIMESTAMPTZ,
  placed_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_orders_user_id ON driveon.orders(user_id);
CREATE INDEX idx_orders_status ON driveon.orders(status);
```

**Empty State Behavior:**
- ✅ Dashboard - Shows "No orders yet" message
- ✅ My Trucks - Shows empty state with CTA

---

### 4. **order_payments** (Important - Payment tracking)
**Used by:**
- Dashboard (`/dashboard`)
- My Trucks (`/my-trucks`)
- Checkout page (`/trucks/:slug/checkout`)

**Columns Required:**
```sql
CREATE TABLE driveon.order_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES driveon.orders(id) ON DELETE CASCADE,
  amount NUMERIC NOT NULL,
  currency TEXT DEFAULT 'USD',
  provider TEXT NOT NULL,
  status TEXT CHECK (status IN ('submitted', 'under_review', 'verified', 'rejected')),
  proof_url TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_order_payments_order_id ON driveon.order_payments(order_id);
```

---

### 5. **order_events** (Important - Order status tracking)
**Used by:**
- Dashboard (`/dashboard`)
- My Trucks (`/my-trucks`)

**Columns Required:**
```sql
CREATE TABLE driveon.order_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES driveon.orders(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_order_events_order_id ON driveon.order_events(order_id);
```

---

### 6. **services** (Optional - Home page only)
**Used by:** Home page (`/`) - Services component

**Note:** This component does not currently use the database. It uses hardcoded data. If you want to manage services from the database:

```sql
CREATE TABLE driveon.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  icon TEXT,
  image_url TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

### 7. **payment_options** (Optional - Home page only)
**Used by:** 
- Home page (`/`) - PaymentOptions component
- Checkout page (`/trucks/:slug/checkout`)

**Note:** Similar to services, this component may use hardcoded data or can be database-driven:

```sql
CREATE TABLE driveon.payment_options (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

### 8. **testimonials** (Optional - Home page only)
**Used by:** Home page (`/`) - Testimonials component

**Note:** This component does not currently use the database. It uses hardcoded data.

```sql
CREATE TABLE driveon.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_name TEXT NOT NULL,
  author_role TEXT,
  location TEXT,
  quote TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  avatar_url TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

### 9. **faqs** (Used on Trucks page)
**Used by:** Trucks page (`/trucks`)

```sql
CREATE TABLE driveon.faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Empty State Behavior:**
- ✅ Trucks page - Hides FAQ section when logged in
- ⚠️ May throw error if not logged in and no FAQs exist

---

### 10. **financing_applications** (Financing form)
**Used by:** Financing Application page (`/financing/apply`)

```sql
CREATE TABLE driveon.financing_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  truck_id UUID REFERENCES driveon.trucks(id),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  street_address TEXT,
  city TEXT,
  state_province TEXT,
  postal_code TEXT,
  country TEXT,
  annual_income NUMERIC,
  employment_status TEXT,
  payment_plan TEXT,
  credit_score TEXT,
  notes TEXT,
  status TEXT DEFAULT 'submitted',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_financing_applications_user_id ON driveon.financing_applications(user_id);
```

---

### 11. **user_truck_activity** (Optional - Dashboard activity feed)
**Used by:** Dashboard (`/dashboard`)

```sql
CREATE TABLE driveon.user_truck_activity (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  truck_id UUID REFERENCES driveon.trucks(id),
  activity_type TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_user_truck_activity_user_id ON driveon.user_truck_activity(user_id);
```

---

## Pages Affected by Missing Data

### Critical Issues (Red Error Banners):

1. **Home Page (`/`)** - `FeaturedTrucks` component
   - **Query:** `driveon.trucks` + `driveon.truck_images`
   - **Error:** "We couldn't load featured trucks right now"
   - **Workaround:** Component shows empty state placeholder
   - **Priority:** Medium (home page should load even without trucks)

2. **Trucks Page (`/trucks`)**
   - **Query:** `driveon.trucks` + `driveon.truck_images` + `driveon.faqs`
   - **Error:** May show error for trucks or FAQs
   - **Workaround:** Uses placeholder trucks when logged in
   - **Priority:** High (main browsing page)

3. **Truck Checkout (`/trucks/:slug/checkout`)**
   - **Query:** `driveon.trucks` + `driveon.truck_images` + `driveon.payment_options`
   - **Error:** "Could not load truck details"
   - **Workaround:** None - blocks checkout
   - **Priority:** Critical (prevents orders)

4. **My Trucks (`/my-trucks`)**
   - **Query:** `driveon.orders` + `driveon.order_payments` + `driveon.trucks`
   - **Error:** "We couldn't load your orders right now"
   - **Workaround:** Shows empty state if no orders
   - **Priority:** High (dashboard functionality)

5. **Dashboard (`/dashboard`)**
   - **Query:** `driveon.orders` + `driveon.user_truck_activity`
   - **Error:** May fail silently or show empty states
   - **Workaround:** Shows empty states
   - **Priority:** High (main user hub)

---

## Quick Fix Priority

### Immediate (Prevents app from working):
1. ✅ Create `driveon.trucks` table
2. ✅ Create `driveon.truck_images` table
3. ✅ Create storage buckets (`user-uploads`, `strickk proof uploads`)
4. ✅ Create `driveon.orders` table
5. ✅ Create `driveon.order_payments` table
6. ✅ Create `driveon.order_events` table

### Important (Improves UX):
7. ⚠️ Create `driveon.faqs` table
8. ⚠️ Create `driveon.payment_options` table
9. ⚠️ Create `driveon.financing_applications` table

### Optional (Can use hardcoded data):
10. ℹ️ Create `driveon.services` table
11. ℹ️ Create `driveon.testimonials` table
12. ℹ️ Create `driveon.user_truck_activity` table

---

## Hosting Requirements

### Frontend Hosting
Your React/Vite frontend can be hosted on:
- ✅ **Vercel** (Recommended - zero config)
- ✅ **Netlify** (Easy deployment)
- ✅ **Cloudflare Pages**
- ✅ **GitHub Pages** (requires build setup)

### Backend/Database Hosting
Your backend is **Supabase**, which provides:
- ✅ PostgreSQL database
- ✅ Authentication
- ✅ Storage buckets
- ✅ Realtime subscriptions
- ✅ Edge functions (if needed)

**You DO NOT need separate hosting for the backend.** Supabase is your complete backend solution.

### What You Need:
1. **Frontend hosting** (Vercel/Netlify) - for the React app
2. **Supabase project** (already configured via .env.local) - for database, auth, storage

### Environment Variables for Production:
```bash
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## Next Steps

1. **Run the SQL scripts above** in your Supabase SQL editor to create all tables
2. **Create storage buckets** in Supabase Storage:
   - `user-uploads` (public)
   - `strickk proof uploads` (public or authenticated)
3. **Add sample truck data** to test the application
4. **Deploy frontend** to Vercel/Netlify with environment variables
5. **No additional backend hosting needed** - Supabase handles everything

---

## Sample Truck Data (For Testing)

```sql
-- Insert sample truck
INSERT INTO driveon.trucks (slug, title, make, model, model_year, mileage, status, weekly_rate, monthly_rate, condition)
VALUES 
  ('2020-volvo-vnl-860', '2020 Volvo VNL 860', 'Volvo', 'VNL 860', 2020, 45000, 'available', 1200, 4500, 'excellent'),
  ('2019-freightliner-cascadia', '2019 Freightliner Cascadia', 'Freightliner', 'Cascadia', 2019, 67000, 'available', 1100, 4200, 'good'),
  ('2021-kenworth-t680', '2021 Kenworth T680', 'Kenworth', 'T680', 2021, 32000, 'available', 1300, 4800, 'excellent');
```

