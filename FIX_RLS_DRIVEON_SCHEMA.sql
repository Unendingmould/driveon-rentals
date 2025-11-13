-- ============================================================================
-- FIX SUPABASE 406 ERRORS - RLS POLICIES FOR DRIVEON SCHEMA
-- ============================================================================
-- Run this in Supabase SQL Editor to fix all 406 errors
-- Tables are in 'driveon' schema, not 'public' schema
-- ============================================================================

-- Enable RLS on all tables in driveon schema
ALTER TABLE driveon.trucks ENABLE ROW LEVEL SECURITY;
ALTER TABLE driveon.truck_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE driveon.payment_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE driveon.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE driveon.order_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE driveon.user_activity ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- PUBLIC ACCESS POLICIES (No login needed)
-- ============================================================================

-- Allow anyone to view trucks
CREATE POLICY "Public read access to trucks"
ON driveon.trucks FOR SELECT
USING (true);

-- Allow anyone to view truck images
CREATE POLICY "Public read access to truck assets"
ON driveon.truck_assets FOR SELECT
USING (true);

-- Allow anyone to view payment options
CREATE POLICY "Public read access to payment options"
ON driveon.payment_options FOR SELECT
USING (true);

-- ============================================================================
-- USER-SPECIFIC POLICIES (Login required)
-- ============================================================================

-- Users can view their own orders
CREATE POLICY "Users can view their own orders"
ON driveon.orders FOR SELECT
USING (auth.uid() = user_id);

-- Users can create their own orders
CREATE POLICY "Users can create their own orders"
ON driveon.orders FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can update their own orders
CREATE POLICY "Users can update their own orders"
ON driveon.orders FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Users can view payments for their orders
CREATE POLICY "Users can view their order payments"
ON driveon.order_payments FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM driveon.orders
    WHERE driveon.orders.id = driveon.order_payments.order_id
    AND driveon.orders.user_id = auth.uid()
  )
);

-- Users can create payments for their orders
CREATE POLICY "Users can create payments for their orders"
ON driveon.order_payments FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM driveon.orders
    WHERE driveon.orders.id = driveon.order_payments.order_id
    AND driveon.orders.user_id = auth.uid()
  )
);

-- Users can update payments for their orders
CREATE POLICY "Users can update their order payments"
ON driveon.order_payments FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM driveon.orders
    WHERE driveon.orders.id = driveon.order_payments.order_id
    AND driveon.orders.user_id = auth.uid()
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM driveon.orders
    WHERE driveon.orders.id = driveon.order_payments.order_id
    AND driveon.orders.user_id = auth.uid()
  )
);

-- Users can view their own activity
CREATE POLICY "Users can view their own activity"
ON driveon.user_activity FOR SELECT
USING (auth.uid() = user_id);

-- Users can insert their own activity
CREATE POLICY "Users can insert their own activity"
ON driveon.user_activity FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- ============================================================================
-- DONE! Refresh your browser and all 406 errors should be gone!
-- ============================================================================
