# Asset Audit Report - External & Placeholder Assets

## Overview
This document identifies all external assets (Unsplash, Wikipedia, etc.) used in the TrucksOnFlex project and provides recommendations for replacement.

**Last Updated:** November 13, 2025

---

## ✅ Completed Replacements

### 1. **Truck Brand Logos** ✅
**Location:** `src/pages/OurTrucks.tsx` - Brand chips/prefilters

**Before (External):**
- Freightliner: `https://upload.wikimedia.org/wikipedia/commons/9/9c/Freightliner_Trucks_logo.svg`
- Volvo: `https://upload.wikimedia.org/wikipedia/commons/1/1d/Volvo_Iron_Mark.svg`
- Kenworth: `https://upload.wikimedia.org/wikipedia/commons/e/e2/Kenworth_logo.svg`
- Peterbilt: `https://upload.wikimedia.org/wikipedia/commons/4/4b/Peterbilt-logo.svg`
- Mack: `https://upload.wikimedia.org/wikipedia/en/9/9a/Mack_Trucks_logo.svg`

**After (Local):**
- ✅ `/trucks logo/freightliner-trucks.svg`
- ✅ `/trucks logo/volvo-alt-svgrepo-com.svg`
- ✅ `/trucks logo/kenworth-1.svg`
- ✅ `/trucks logo/peterbilt.svg`
- ✅ `/trucks logo/mack-trucks-1.svg`

**Status:** ✅ **REPLACED** - Now using local SVG files from `public/trucks logo/`

---

## 🔴 Assets Requiring Replacement

### 2. **Unsplash Placeholder Images**

#### A. **Background Hero Images**

##### Location: `src\components\FinalCTA.tsx`
```tsx
Line 13: bg-[url('https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=1920&h=1080&fit=crop&crop=center')]
```
**Usage:** Background image for final CTA section  
**Recommendation:** Replace with real truck image from your fleet or professional truck photography  
**Priority:** 🟡 Medium - Used on home page but as decorative background

##### Location: `src\pages\OrderForm.tsx`
```tsx
Line 101: bg-[url('https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=1920&h=1080&fit=crop&crop=center')]
```
**Usage:** Background image for order form hero section  
**Recommendation:** Same truck image as above for consistency  
**Priority:** 🟡 Medium - Less critical as it's behind overlay

**Suggested Action:**
1. Take professional photos of 2-3 of your trucks
2. Save as `public/hero-truck-1.jpg`, `public/hero-truck-2.jpg`
3. Replace Unsplash URLs with `/hero-truck-1.jpg`
4. Or use stock photos from paid services (Shutterstock, Getty Images)

---

#### B. **Truck Card Placeholder Images**

##### Location: `src\components\FeaturedTrucks.tsx`
```tsx
Line 8: const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1515549370929-06c3e45f2618?w=1000&auto=format&fit=crop"

// Placeholder trucks:
Line 23: url: FALLBACK_IMAGE (Volvo VNL)
Line 49: url: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1000&auto=format&fit=crop" (Freightliner)
Line 75: url: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=1000&auto=format&fit=crop" (Kenworth)
```
**Usage:** Placeholder images for featured trucks when database is empty  
**Recommendation:** Replace with real truck photos or licensed stock images  
**Priority:** 🟡 Medium - Only shows when database empty (fallback)

##### Location: `src\pages\OurTrucks.tsx`
```tsx
// Same Unsplash URLs used in placeholder trucks
```
**Usage:** Placeholder trucks on main trucks listing page  
**Recommendation:** Same as FeaturedTrucks - replace with real images  
**Priority:** 🟡 Medium - Only shows when database empty

**Suggested Action:**
1. **Option 1 (Best):** Upload real truck photos to your Supabase storage
   - Create bucket: `truck-images`
   - Upload professional photos of your fleet
   - Update placeholder truck image URLs

2. **Option 2:** Use paid stock photos
   - Purchase truck images from Shutterstock/Getty Images
   - Save to `public/trucks/` folder
   - Update URLs to `/trucks/volvo.jpg`, etc.

3. **Option 3 (Quick):** Keep Unsplash for now
   - Note: Unsplash is free for commercial use
   - Acceptable for MVP/demo
   - Replace before full production launch

---

##### Location: `src\components\TruckDetailModal.tsx`
```tsx
Line 11: const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1515549370929-06c3e45f2618?w=1200&auto=format&fit=crop"
```
**Usage:** Default fallback image in truck detail modal  
**Recommendation:** Replace with generic truck placeholder or your branding  
**Priority:** 🟢 Low - Only shows if truck has no images (rare)

**Suggested Action:**
1. Create a branded placeholder: `public/truck-placeholder.jpg`
2. Include your TrucksOnFlex logo watermark
3. Replace URL with `/truck-placeholder.jpg`

---

## 📊 Asset Summary Table

| Asset Type | Location | External Source | Local Alternative | Priority | Status |
|-----------|----------|----------------|-------------------|----------|---------|
| **Brand Logos** | `OurTrucks.tsx` | Wikipedia | `/trucks logo/*.svg` | 🔴 High | ✅ Done |
| **Hero Background** | `FinalCTA.tsx` | Unsplash | `/hero-truck-1.jpg` | 🟡 Medium | ⏳ Pending |
| **Hero Background** | `OrderForm.tsx` | Unsplash | `/hero-truck-1.jpg` | 🟡 Medium | ⏳ Pending |
| **Placeholder Trucks (3)** | `FeaturedTrucks.tsx` | Unsplash | `/trucks/*.jpg` | 🟡 Medium | ⏳ Pending |
| **Placeholder Trucks (3)** | `OurTrucks.tsx` | Unsplash | `/trucks/*.jpg` | 🟡 Medium | ⏳ Pending |
| **Modal Fallback** | `TruckDetailModal.tsx` | Unsplash | `/truck-placeholder.jpg` | 🟢 Low | ⏳ Pending |

---

## 🎯 Recommendations by Priority

### 🔴 Critical (Complete Before Launch)
1. ✅ **Brand Logos** - DONE! Using local SVGs

### 🟡 Important (Complete Soon)
2. **Hero Background Images** (2 locations)
   - Impact: Visible on home page and order form
   - Timeline: Within 1-2 weeks
   - Action: Take/purchase professional truck photos

3. **Placeholder Truck Images** (6 images total)
   - Impact: Only shows when database empty
   - Timeline: Within 2-4 weeks
   - Action: Use real fleet photos once available

### 🟢 Nice to Have (Can Wait)
4. **Modal Fallback Image**
   - Impact: Rarely seen (only if truck has no images)
   - Timeline: Low priority
   - Action: Create branded placeholder when convenient

---

## ℹ️ Unsplash Licensing Note

**Good News:** All Unsplash images are **free for commercial use** under the Unsplash License:
- ✅ Free to use for commercial and non-commercial purposes
- ✅ No permission needed
- ✅ No attribution required (but appreciated)
- ❌ Cannot sell unmodified copies
- ❌ Cannot create competing service

**What This Means:**
- You CAN use these images in production
- You CAN make money from your site with these images
- You DON'T need to pay or credit anyone
- But SHOULD replace with your own images for branding

**Reference:** https://unsplash.com/license

---

## 🚀 Suggested Replacement Strategy

### Phase 1: Immediate (Done)
- ✅ Replace brand logos with local SVGs

### Phase 2: Short-term (1-2 weeks)
1. Take professional photos of 3-5 of your best trucks
2. Create hero background images
3. Upload to `public/` folder or Supabase storage
4. Update component URLs

### Phase 3: Medium-term (2-4 weeks)
1. Build complete truck image library
2. Replace all placeholder Unsplash images
3. Create branded placeholder image with logo

### Phase 4: Long-term (Ongoing)
1. Continuously update with new truck photos
2. Maintain image library in Supabase
3. Ensure all trucks have professional photos

---

## 📸 Image Requirements

### Hero Backgrounds
- **Size:** 1920x1080px (minimum)
- **Format:** JPG (compressed) or WebP
- **Subject:** Wide-angle truck shot, preferably on highway or professional lot
- **Quality:** High-resolution, professional lighting
- **File size:** < 500KB (compressed)

### Truck Cards
- **Size:** 1200x800px (3:2 aspect ratio)
- **Format:** JPG or WebP
- **Subject:** Side/3-quarter view of truck, clean background
- **Quality:** Sharp, well-lit, neutral background
- **File size:** < 300KB per image

### Placeholder/Fallback
- **Size:** 800x600px
- **Format:** PNG or JPG
- **Subject:** Generic truck silhouette or TrucksOnFlex logo
- **Quality:** Clean, professional
- **File size:** < 100KB

---

## 🔧 Code Changes Needed

### To Replace Hero Backgrounds:

**File:** `src/components/FinalCTA.tsx` & `src/pages/OrderForm.tsx`

**Current:**
```tsx
bg-[url('https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=1920&h=1080&fit=crop&crop=center')]
```

**Replace with:**
```tsx
bg-[url('/hero-truck-1.jpg')]
```

### To Replace Placeholder Trucks:

**File:** `src/components/FeaturedTrucks.tsx`

**Current:**
```tsx
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1515549370929-06c3e45f2618?w=1000&auto=format&fit=crop";
```

**Replace with:**
```tsx
const FALLBACK_IMAGE = "/trucks/generic-truck.jpg";
```

Then update placeholder truck image URLs:
```tsx
images: [{ id: "img-1", url: "/trucks/volvo-vnl.jpg", alt: "Volvo VNL Truck", isPrimary: true, sortOrder: 0 }]
```

---

## ✅ Checklist

- [x] Identify all external assets
- [x] Replace brand logos with local SVGs
- [ ] Take/acquire hero background images
- [ ] Take/acquire truck card images
- [ ] Create branded placeholder image
- [ ] Update all component URLs
- [ ] Test all images load correctly
- [ ] Optimize images for web (compression)
- [ ] Update this document when complete

---

## 📝 Notes

1. **No "Lovable.dev" or "GPTEngineer" assets found** ✅
   - Project is clean of AI platform branding
   - No placeholder text or dummy content from AI tools

2. **Wikipedia logos replaced** ✅
   - All brand logos now using local files
   - No external CDN dependencies for logos

3. **Unsplash is acceptable for MVP** ✅
   - Free for commercial use
   - No legal issues
   - Should still replace for branding

4. **All external assets documented** ✅
   - Total: 8 Unsplash image URLs
   - Clear replacement strategy provided
   - Prioritized by importance

---

## 🎓 Best Practices Going Forward

1. **Always use local assets** when possible
2. **Store images in Supabase Storage** for database-driven trucks
3. **Use placeholder.svg** (already in `public/`) for temporary placeholders
4. **Optimize images** before uploading (use TinyPNG, Squoosh, etc.)
5. **Use WebP format** for better compression and quality
6. **Lazy load images** below the fold (already implemented in components)
7. **Add alt text** to all images for accessibility
8. **Use CDN** (Cloudflare, Vercel) for production image serving

---

**Report Generated:** November 13, 2025  
**Next Review:** After Phase 2 completion (2 weeks)
