# 🚀 Quick Push & Deploy Steps

**Date:** November 13, 2025

---

## ⚡ Quick Command Reference

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Test Build Locally
```bash
npm run build
npm run preview
```
Open http://localhost:4173 to test

### Step 3: Push to GitHub
```bash
git add .
git commit -m "feat: Week 2/3 optimizations - code splitting, bundle optimization, favicon fixes"
git push origin main
```

### Step 4: Deploy to Netlify
1. Go to https://app.netlify.com/
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub repo
4. Configure:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
6. Click "Deploy site"

### Step 5: Connect Domain
1. In Netlify → Domain settings
2. Add custom domain: `trucksonflex.com`
3. Update DNS at your registrar with Netlify nameservers
4. Wait for DNS propagation (1-24 hours)

---

## 📋 Pre-Push Checklist

- [x] Week 2/3 implementations done
- [x] Favicon fixed
- [x] Dropdown colors verified
- [x] Code splitting implemented
- [x] Bundle optimization added
- [x] DevTools configured
- [x] Error boundary added
- [x] .env.example created
- [ ] npm install successful
- [ ] npm run build successful
- [ ] Local preview tested
- [ ] Ready to push!

---

## 🔑 Environment Variables Needed

Add these in Netlify before deploying:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

Get these from: https://app.supabase.com/project/_/settings/api

---

## 🌐 After Deploy - Domain Setup

### Option A: Netlify DNS (Recommended)
1. Netlify will provide 4 nameservers
2. Go to your domain registrar (GoDaddy, Namecheap, etc.)
3. Find "Nameservers" or "DNS Management"
4. Replace with Netlify's nameservers
5. Save and wait 24-48 hours

### Option B: External DNS
Add these records at your registrar:

**A Record:**
```
Type: A
Name: @
Value: 75.2.60.5
TTL: 3600
```

**CNAME Record:**
```
Type: CNAME
Name: www
Value: your-site.netlify.app
TTL: 3600
```

---

## ✅ Success Indicators

After deploy, check:
- [ ] Site loads at Netlify URL
- [ ] All pages work
- [ ] Authentication works
- [ ] Trucks data loads
- [ ] Forms submit
- [ ] Images display
- [ ] Favicon shows correctly
- [ ] HTTPS enabled
- [ ] Custom domain works (after DNS)

---

## 🐛 Quick Troubleshooting

**Build fails?**
```bash
npm install
npm run build
# Check error messages
```

**Site loads but blank?**
- Check environment variables in Netlify
- Check browser console for errors

**Domain not working?**
- Check DNS propagation: https://dnschecker.org/
- Wait 24-48 hours
- Try incognito mode

---

**Ready to deploy!** 🎉
