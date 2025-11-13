-- DriveOn Rentals Database Schema
-- Run this in your Supabase SQL Editor to create all required tables

-- Create the driveon schema if it doesn't exist
CREATE SCHEMA IF NOT EXISTS driveon;

-- ============================================================================
-- CRITICAL TABLES (Required for core functionality)
-- ============================================================================

-- 1. Trucks Table
CREATE TABLE IF NOT EXISTS driveon.trucks (
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

CREATE INDEX IF NOT EXISTS idx_trucks_status ON driveon.trucks(status);
CREATE INDEX IF NOT EXISTS idx_trucks_slug ON driveon.trucks(slug);

-- 2. Truck Images Table
CREATE TABLE IF NOT EXISTS driveon.truck_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  truck_id UUID REFERENCES driveon.trucks(id) ON DELETE CASCADE,
  storage_path TEXT NOT NULL,
  alt_text TEXT,
  sort_order INTEGER DEFAULT 0,
  is_primary BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_truck_images_truck_id ON driveon.truck_images(truck_id);
CREATE INDEX IF NOT EXISTS idx_truck_images_primary ON driveon.truck_images(is_primary);

-- 3. Orders Table
CREATE TABLE IF NOT EXISTS driveon.orders (
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

CREATE INDEX IF NOT EXISTS idx_orders_user_id ON driveon.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_truck_id ON driveon.orders(truck_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON driveon.orders(status);

-- 4. Order Payments Table
CREATE TABLE IF NOT EXISTS driveon.order_payments (
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

CREATE INDEX IF NOT EXISTS idx_order_payments_order_id ON driveon.order_payments(order_id);
CREATE INDEX IF NOT EXISTS idx_order_payments_status ON driveon.order_payments(status);

-- 5. Order Events Table
CREATE TABLE IF NOT EXISTS driveon.order_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES driveon.orders(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_order_events_order_id ON driveon.order_events(order_id);

-- ============================================================================
-- IMPORTANT TABLES (Improves UX)
-- ============================================================================

-- 6. FAQs Table
CREATE TABLE IF NOT EXISTS driveon.faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_faqs_active ON driveon.faqs(is_active);

-- 7. Payment Options Table
CREATE TABLE IF NOT EXISTS driveon.payment_options (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_payment_options_active ON driveon.payment_options(is_active);

-- 8. Financing Applications Table
CREATE TABLE IF NOT EXISTS driveon.financing_applications (
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

CREATE INDEX IF NOT EXISTS idx_financing_applications_user_id ON driveon.financing_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_financing_applications_status ON driveon.financing_applications(status);

-- ============================================================================
-- OPTIONAL TABLES (Can use hardcoded data instead)
-- ============================================================================

-- 9. Services Table
CREATE TABLE IF NOT EXISTS driveon.services (
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

CREATE INDEX IF NOT EXISTS idx_services_active ON driveon.services(is_active);

-- 10. Testimonials Table
CREATE TABLE IF NOT EXISTS driveon.testimonials (
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

CREATE INDEX IF NOT EXISTS idx_testimonials_featured ON driveon.testimonials(is_featured);

-- 11. User Truck Activity Table
CREATE TABLE IF NOT EXISTS driveon.user_truck_activity (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  truck_id UUID REFERENCES driveon.trucks(id),
  activity_type TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_user_truck_activity_user_id ON driveon.user_truck_activity(user_id);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE driveon.trucks ENABLE ROW LEVEL SECURITY;
ALTER TABLE driveon.truck_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE driveon.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE driveon.order_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE driveon.order_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE driveon.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE driveon.payment_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE driveon.financing_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE driveon.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE driveon.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE driveon.user_truck_activity ENABLE ROW LEVEL SECURITY;

-- Public read access for trucks and images
CREATE POLICY "Trucks are viewable by everyone" ON driveon.trucks
  FOR SELECT USING (true);

CREATE POLICY "Truck images are viewable by everyone" ON driveon.truck_images
  FOR SELECT USING (true);

-- Public read access for FAQs, payment options, services, testimonials
CREATE POLICY "FAQs are viewable by everyone" ON driveon.faqs
  FOR SELECT USING (is_active = true);

CREATE POLICY "Payment options are viewable by everyone" ON driveon.payment_options
  FOR SELECT USING (is_active = true);

CREATE POLICY "Services are viewable by everyone" ON driveon.services
  FOR SELECT USING (is_active = true);

CREATE POLICY "Testimonials are viewable by everyone" ON driveon.testimonials
  FOR SELECT USING (true);

-- Users can view their own orders
CREATE POLICY "Users can view their own orders" ON driveon.orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own orders" ON driveon.orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can view their order payments
CREATE POLICY "Users can view their order payments" ON driveon.order_payments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM driveon.orders
      WHERE orders.id = order_payments.order_id
      AND orders.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create their own payments" ON driveon.order_payments
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM driveon.orders
      WHERE orders.id = order_payments.order_id
      AND orders.user_id = auth.uid()
    )
  );

-- Users can view their order events
CREATE POLICY "Users can view their order events" ON driveon.order_events
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM driveon.orders
      WHERE orders.id = order_events.order_id
      AND orders.user_id = auth.uid()
    )
  );

-- Users can view their own financing applications
CREATE POLICY "Users can view their own financing applications" ON driveon.financing_applications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create financing applications" ON driveon.financing_applications
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can view their own activity
CREATE POLICY "Users can view their own activity" ON driveon.user_truck_activity
  FOR SELECT USING (auth.uid() = user_id);

-- ============================================================================
-- SAMPLE DATA (For Testing)
-- ============================================================================

-- Insert sample trucks
INSERT INTO driveon.trucks (slug, title, make, model, model_year, mileage, status, weekly_rate, monthly_rate, condition, description)
VALUES 
  ('2020-volvo-vnl-860', '2020 Volvo VNL 860', 'Volvo', 'VNL 860', 2020, 45000, 'available', 1200, 4500, 'excellent', 'Premium long-haul truck with sleeper cab. Fully serviced and road-ready.'),
  ('2019-freightliner-cascadia', '2019 Freightliner Cascadia', 'Freightliner', 'Cascadia', 2019, 67000, 'available', 1100, 4200, 'good', 'Reliable workhorse with excellent fuel economy. Perfect for regional hauling.'),
  ('2021-kenworth-t680', '2021 Kenworth T680', 'Kenworth', 'T680', 2021, 32000, 'available', 1300, 4800, 'excellent', 'Low-mileage premium truck with advanced safety features and comfortable interior.')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample FAQs
INSERT INTO driveon.faqs (question, answer, sort_order, is_active)
VALUES
  ('What are your rental terms?', 'We offer flexible rental terms starting from weekly rentals up to long-term monthly agreements. All rentals include basic maintenance coverage.', 1, true),
  ('Do you offer purchase financing?', 'Yes! We partner with multiple lenders to offer competitive financing options for truck purchases. Apply through our financing page.', 2, true),
  ('What is included in the rental?', 'Our rentals include the truck, basic insurance coverage, and routine maintenance. Fuel and additional insurance are the responsibility of the renter.', 3, true),
  ('How do I qualify for a rental?', 'You need a valid CDL, clean driving record, and proof of insurance. We also require a security deposit equal to one week''s rent.', 4, true)
ON CONFLICT DO NOTHING;

-- Insert sample payment options
INSERT INTO driveon.payment_options (name, description, sort_order, is_active)
VALUES
  ('Bank Transfer', 'Direct bank transfer for secure transactions', 1, true),
  ('Credit/Debit Card', 'Pay with major credit and debit cards', 2, true),
  ('Cryptocurrency', 'Accept Bitcoin and other cryptocurrencies', 3, true),
  ('Financing', 'Flexible payment plans available', 4, true)
ON CONFLICT DO NOTHING;

-- ============================================================================
-- FUNCTIONS AND TRIGGERS
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION driveon.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at columns
DROP TRIGGER IF EXISTS update_trucks_updated_at ON driveon.trucks;
CREATE TRIGGER update_trucks_updated_at
  BEFORE UPDATE ON driveon.trucks
  FOR EACH ROW EXECUTE FUNCTION driveon.update_updated_at_column();

DROP TRIGGER IF EXISTS update_orders_updated_at ON driveon.orders;
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON driveon.orders
  FOR EACH ROW EXECUTE FUNCTION driveon.update_updated_at_column();

-- ============================================================================
-- STORAGE BUCKETS (Run in Supabase Storage Dashboard or via SQL)
-- ============================================================================

-- Note: You need to create these buckets in the Supabase Storage dashboard:
-- 1. "user-uploads" (public access)
-- 2. "strickk proof uploads" (authenticated access)

-- ============================================================================
-- COMPLETION MESSAGE
-- ============================================================================

DO $$
BEGIN
  RAISE NOTICE '✅ Database schema created successfully!';
  RAISE NOTICE '📋 Next steps:';
  RAISE NOTICE '   1. Create storage buckets: "user-uploads" and "strickk proof uploads"';
  RAISE NOTICE '   2. Upload truck images to storage buckets';
  RAISE NOTICE '   3. Add image records to driveon.truck_images table';
  RAISE NOTICE '   4. Test the application';
END $$;
