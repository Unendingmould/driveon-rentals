# 🔧 Supabase 406 Error Fix Guide

**Date:** November 13, 2025  
**Error:** HTTP 406 (Not Acceptable) on all Supabase queries

---

## 🔴 The Problem

All Supabase API calls are returning **406 (Not Acceptable)** errors:

```
Failed to load trucks - 406
Failed to load orders - 406
Failed to load user activity - 406
Failed to load payment options - 406
Failed to load truck by slug - 406
```

---

## 🔍 Root Cause

**HTTP 406 means:** The server cannot produce a response matching the accept headers sent by the client.

**For Supabase, this typically means:**

1. **Row Level Security (RLS) policies are too restrictive**
   - Tables have RLS enabled but no policies allow reads
   - Policies require authentication but user is not authenticated
   - Policies have incorrect conditions

2. **API Configuration Issue**
   - Wrong API URL or key
   - CORS headers mismatch
   - PostgREST version incompatibility

3. **Schema Mismatch**
   - Requesting columns that don't exist
   - Wrong table names
   - Foreign key issues

---

## ✅ Quick Fix: Disable RLS Temporarily (Testing Only)

**⚠️ WARNING: Only for local testing! Never in production!**

If you need to test if RLS is the issue, temporarily disable it:

```sql
-- In Supabase SQL Editor
ALTER TABLE trucks DISABLE ROW LEVEL SECURITY;
ALTER TABLE orders DISABLE ROW LEVEL SECURITY;
ALTER TABLE order_payments DISABLE ROW LEVEL SECURITY;
ALTER TABLE user_activity DISABLE ROW LEVEL SECURITY;
ALTER TABLE payment_options DISABLE ROW LEVEL SECURITY;
ALTER TABLE truck_assets DISABLE ROW LEVEL SECURITY;
```

**Then refresh your app and see if data loads.**

---

## 🛡️ Proper Fix: Configure RLS Policies

### **Step 1: Enable RLS on All Tables**

```sql
-- Enable RLS (should already be enabled)
ALTER TABLE trucks ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE truck_assets ENABLE ROW LEVEL SECURITY;
```

---

### **Step 2: Create Public Read Policies**

**For Trucks (Public Inventory):**
```sql
-- Allow anyone to view available trucks
CREATE POLICY "Anyone can view available trucks"
ON trucks
FOR SELECT
USING (status = 'available');

-- Or allow all reads (if you want to show sold trucks too)
CREATE POLICY "Public read access to trucks"
ON trucks
FOR SELECT
USING (true);
```

**For Truck Assets (Images):**
```sql
-- Allow anyone to view truck images
CREATE POLICY "Public read access to truck assets"
ON truck_assets
FOR SELECT
USING (true);
```

**For Payment Options:**
```sql
-- Allow anyone to view payment options
CREATE POLICY "Public read access to payment options"
ON payment_options
FOR SELECT
USING (true);
```

---

### **Step 3: Create User-Specific Policies**

**For Orders (User-Owned):**
```sql
-- Users can only see their own orders
CREATE POLICY "Users can view their own orders"
ON orders
FOR SELECT
USING (auth.uid() = user_id);

-- Users can create their own orders
CREATE POLICY "Users can create their own orders"
ON orders
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can update their own orders
CREATE POLICY "Users can update their own orders"
ON orders
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
```

**For Order Payments:**
```sql
-- Users can view payments for their orders
CREATE POLICY "Users can view their order payments"
ON order_payments
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM orders
    WHERE orders.id = order_payments.order_id
    AND orders.user_id = auth.uid()
  )
);

-- Users can create payments for their orders
CREATE POLICY "Users can create payments for their orders"
ON order_payments
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM orders
    WHERE orders.id = order_payments.order_id
    AND orders.user_id = auth.uid()
  )
);
```

**For User Activity:**
```sql
-- Users can only see their own activity
CREATE POLICY "Users can view their own activity"
ON user_activity
FOR SELECT
USING (auth.uid() = user_id);

-- System can insert user activity
CREATE POLICY "System can insert user activity"
ON user_activity
FOR INSERT
WITH CHECK (auth.uid() = user_id);
```

---

### **Step 4: Create Admin Policies**

**For Admin Access:**
```sql
-- Check if admin role is set in user metadata
CREATE POLICY "Admins can view all orders"
ON orders
FOR SELECT
USING (
  (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
);

CREATE POLICY "Admins can update all orders"
ON orders
FOR UPDATE
USING (
  (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
);

-- Repeat for other tables as needed
```

---

## 🧪 Test Your Policies

### **1. Test Public Access (Not Logged In)**

```javascript
// In browser console (not logged in)
const { data, error } = await supabase
  .from('trucks')
  .select('*')
  .eq('status', 'available');

console.log({ data, error });
// Should return truck data
```

### **2. Test User Access (Logged In)**

```javascript
// After logging in
const { data: { user } } = await supabase.auth.getUser();
console.log('User ID:', user?.id);

const { data, error } = await supabase
  .from('orders')
  .select('*');

console.log({ data, error });
// Should return only user's orders
```

---

## 🔧 Alternative: Use Service Role Key (Backend Only)

**⚠️ NEVER expose service role key in frontend!**

For backend operations (like admin dashboard), use service role:

```typescript
// backend/admin-routes.ts
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Bypasses RLS
);

// Can now query any data
const { data } = await supabaseAdmin
  .from('orders')
  .select('*'); // Returns all orders, regardless of RLS
```

---

## 📊 Check Current Policies

**In Supabase Dashboard:**
1. Go to **Authentication** → **Policies**
2. Select each table
3. View existing policies
4. Check if policies exist and are correct

**Or via SQL:**
```sql
-- List all policies
SELECT
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;
```

---

## 🎯 Recommended Policy Setup

### **Public Tables (No Auth Required):**
- ✅ `trucks` - Allow public read for available trucks
- ✅ `truck_assets` - Allow public read for images
- ✅ `payment_options` - Allow public read

### **User Tables (Auth Required):**
- 🔒 `orders` - User can CRUD their own
- 🔒 `order_payments` - User can view/create for their orders
- 🔒 `user_activity` - User can view their own

### **Admin Tables:**
- 👤 All tables - Admin role can view/edit all

---

## 🚀 Quick Copy-Paste Policy Script

**Run this in Supabase SQL Editor:**

```sql
-- Drop existing policies (if any)
DROP POLICY IF EXISTS "Public read access to trucks" ON trucks;
DROP POLICY IF EXISTS "Public read access to truck assets" ON truck_assets;
DROP POLICY IF EXISTS "Public read access to payment options" ON payment_options;
DROP POLICY IF EXISTS "Users can view their own orders" ON orders;
DROP POLICY IF EXISTS "Users can create their own orders" ON orders;
DROP POLICY IF EXISTS "Users can view their order payments" ON order_payments;
DROP POLICY IF EXISTS "Users can create payments for their orders" ON order_payments;

-- Public access policies
CREATE POLICY "Public read access to trucks"
ON trucks FOR SELECT
USING (true);

CREATE POLICY "Public read access to truck assets"
ON truck_assets FOR SELECT
USING (true);

CREATE POLICY "Public read access to payment options"
ON payment_options FOR SELECT
USING (true);

-- User-specific policies
CREATE POLICY "Users can view their own orders"
ON orders FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own orders"
ON orders FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their order payments"
ON order_payments FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM orders
    WHERE orders.id = order_payments.order_id
    AND orders.user_id = auth.uid()
  )
);

CREATE POLICY "Users can create payments for their orders"
ON order_payments FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM orders
    WHERE orders.id = order_payments.order_id
    AND orders.user_id = auth.uid()
  )
);

-- Done!
```

---

## ✅ Expected Result

After applying policies:

- ✅ Trucks page loads and shows available trucks
- ✅ Truck detail pages work
- ✅ Guest users can browse inventory
- ✅ Logged-in users can view their orders
- ✅ Logged-in users can create new orders
- ✅ No more 406 errors!

---

## 📝 Debugging Tips

### **1. Check Browser Console**
```javascript
// Test Supabase connection
const { data, error } = await supabase.from('trucks').select('count');
console.log({ data, error });
```

### **2. Check Network Tab**
- Open DevTools → Network
- Filter by "supabase.co"
- Click failed request
- Check **Response** tab for error details

### **3. Check Supabase Logs**
- Go to Supabase Dashboard
- **Logs** → **API**
- Filter by 406 status
- See which policies are blocking

---

## 🔐 Security Best Practices

1. **Always enable RLS** on production tables
2. **Never disable RLS** in production
3. **Never expose service role key** in frontend
4. **Use JWT claims** for role-based access
5. **Test policies** with different user roles
6. **Audit policies** regularly

---

## 📞 Still Getting 406?

If you still see 406 errors after applying policies:

1. **Clear browser cache** (Ctrl+Shift+Del)
2. **Hard refresh** (Ctrl+Shift+R)
3. **Check Supabase dashboard** for policy errors
4. **Verify .env.local** has correct credentials
5. **Check network tab** for actual error message
6. **Contact me** with specific error details

---

**The 406 errors should be resolved after applying proper RLS policies! 🎉**
