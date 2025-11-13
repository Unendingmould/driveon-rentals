# 🚀 Deployment Guide - TrucksOnFlex to Netlify

**Last Updated:** November 13, 2025

---

## 📋 Prerequisites

Before deploying, ensure you have:
- ✅ GitHub account
- ✅ Netlify account (free tier is fine)
- ✅ Your custom domain ready
- ✅ Supabase project URL and API keys
- ✅ Git installed on your computer

---

## 🔧 Step 1: Prepare for Deployment

### 1.1 Create `.env` File

Copy `.env.example` to `.env` and add your actual Supabase credentials:

```bash
# In your project root
cp .env.example .env
```

**Edit `.env` with your values:**
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

⚠️ **IMPORTANT:** Never commit `.env` to GitHub! It's already in `.gitignore`.

---

## 📤 Step 2: Push to GitHub

### 2.1 Initialize Git (if not already done)

```bash
cd c:\Users\Ifeanyi\Documents\GitHub\driveon-rentals

# Check if git is initialized
git status

# If not initialized:
git init
git add .
git commit -m "Initial commit: TrucksOnFlex v1.0"
```

### 2.2 Create GitHub Repository

1. Go to https://github.com/new
2. **Repository name:** `trucksonflex` or `driveon-rentals`
3. **Visibility:** Private (recommended) or Public
4. **DO NOT** initialize with README (we have one)
5. Click **"Create repository"**

### 2.3 Push to GitHub

```bash
# Add GitHub remote (replace with YOUR repo URL)
git remote add origin https://github.com/YOUR_USERNAME/trucksonflex.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Verify:** Go to your GitHub repo - you should see all your files!

---

## 🌐 Step 3: Deploy to Netlify

### Method 1: Deploy via Netlify Dashboard (Easiest)

#### 3.1 Sign Up / Log In to Netlify
1. Go to https://www.netlify.com/
2. Click **"Sign up"** or **"Log in"**
3. Choose **"Sign up with GitHub"** (easiest)

#### 3.2 Import Your Project
1. Click **"Add new site"** → **"Import an existing project"**
2. Choose **"Deploy with GitHub"**
3. Authorize Netlify to access your GitHub repos
4. Select your repository: `trucksonflex` or `driveon-rentals`

#### 3.3 Configure Build Settings
Netlify will auto-detect Vite settings. Confirm:

```
Build command: npm run build
Publish directory: dist
```

#### 3.4 Add Environment Variables
**CRITICAL:** Before deploying, add your env vars!

1. Click **"Add environment variables"**
2. Add each variable:

| Key | Value |
|-----|-------|
| `VITE_SUPABASE_URL` | `https://your-project.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | `your_anon_key_here` |

3. Click **"Deploy site"**

#### 3.5 Wait for Deploy
- First deploy takes 2-5 minutes
- Watch the deploy logs
- ✅ Success: You'll see "Site is live" with a URL like `https://random-name-123.netlify.app`

---

### Method 2: Deploy via Netlify CLI (Advanced)

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize Netlify in your project
netlify init

# Follow prompts:
# - Create & configure a new site
# - Choose your team
# - Site name: trucksonflex
# - Build command: npm run build
# - Publish directory: dist

# Deploy
netlify deploy --prod
```

---

## 🌍 Step 4: Connect Your Custom Domain

### 4.1 Access Domain Settings
1. In Netlify, go to your site dashboard
2. Click **"Domain settings"**
3. Click **"Add custom domain"**

### 4.2 Add Your Domain
1. Enter your domain: `trucksonflex.com`
2. Click **"Verify"**
3. Netlify will check if you own it

### 4.3 Update DNS Records

You have **2 options**:

#### Option A: Use Netlify DNS (Recommended - Easiest)
1. Netlify will offer to handle DNS
2. Click **"Use Netlify DNS"**
3. You'll get 4 nameservers like:
   ```
   dns1.p01.nsone.net
   dns2.p01.nsone.net
   dns3.p01.nsone.net
   dns4.p01.nsone.net
   ```
4. **Go to your domain registrar** (GoDaddy, Namecheap, etc.)
5. Find **"Nameservers"** or **"DNS Settings"**
6. Replace existing nameservers with Netlify's 4 nameservers
7. Save changes
8. **Wait 24-48 hours** for DNS propagation

#### Option B: Use External DNS (Your Current Registrar)
1. Keep your current DNS provider
2. In Netlify, note the IP address shown
3. Go to your domain registrar's DNS settings
4. Add these records:

**For root domain (trucksonflex.com):**
```
Type: A
Name: @
Value: 75.2.60.5 (Netlify's load balancer)
TTL: 3600
```

**For www subdomain:**
```
Type: CNAME
Name: www
Value: random-name-123.netlify.app (your Netlify URL)
TTL: 3600
```

**Important:** Remove any existing A or CNAME records for `@` and `www`

5. Save changes
6. **Wait 1-24 hours** for DNS propagation

---

### 4.4 Enable HTTPS (Automatic)
1. Once DNS is configured, go back to Netlify
2. Under **"Domain settings"** → **"HTTPS"**
3. Netlify automatically provisions SSL certificate
4. Wait 5-10 minutes
5. ✅ Your site will be available at `https://trucksonflex.com`

---

## 🔄 Step 5: Set Up Continuous Deployment

**Already done!** 🎉

With Netlify + GitHub:
- Every `git push` to `main` branch triggers auto-deploy
- Netlify builds and deploys automatically
- Takes ~2-3 minutes per deploy

### To Deploy Updates:
```bash
# Make your changes
git add .
git commit -m "Update: description of changes"
git push origin main

# Netlify deploys automatically!
```

---

## 🧪 Step 6: Test Your Deployment

### 6.1 Basic Tests
1. ✅ Visit `https://trucksonflex.com` (or your domain)
2. ✅ Check homepage loads
3. ✅ Test navigation links
4. ✅ Try sign up / sign in
5. ✅ Browse trucks page
6. ✅ Test forms

### 6.2 Check Environment Variables
If site loads but features don't work:
1. Go to Netlify dashboard
2. **Site settings** → **Environment variables**
3. Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set
4. If missing/wrong, add/fix them
5. Go to **Deploys** → **Trigger deploy** → **Clear cache and deploy**

### 6.3 Check Browser Console
1. Press `F12` to open DevTools
2. Check **Console** tab for errors
3. Common issues:
   - ❌ "Failed to fetch" → Check Supabase URL
   - ❌ "CORS error" → Check Supabase CORS settings
   - ❌ "Invalid API key" → Check anon key

---

## 🔧 Netlify Configuration File (Optional but Recommended)

Create `netlify.toml` in project root for better control:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

**Then push to GitHub:**
```bash
git add netlify.toml
git commit -m "Add Netlify configuration"
git push origin main
```

---

## 🎯 Post-Deployment Checklist

### Immediately After Deploy:
- [ ] Site loads at custom domain
- [ ] HTTPS is enabled (🔒 in address bar)
- [ ] All pages accessible
- [ ] Forms work
- [ ] Authentication works
- [ ] Trucks data loads
- [ ] Images load correctly
- [ ] Favicon shows correctly

### Within 24 Hours:
- [ ] DNS fully propagated (check https://dnschecker.org/)
- [ ] Set up monitoring (Sentry, LogRocket)
- [ ] Configure analytics (Google Analytics, Plausible)
- [ ] Test on mobile devices
- [ ] Share with team/testers

### Within Week 1:
- [ ] Monitor error rates in Netlify
- [ ] Check site performance (PageSpeed Insights)
- [ ] Gather user feedback
- [ ] Fix any reported issues
- [ ] Set up automated backups

---

## 🐛 Common Issues & Solutions

### Issue 1: "Site not found" after deploy
**Solution:** Wait 5-10 minutes. First deploy takes time.

### Issue 2: 404 on page refresh
**Solution:** Add `netlify.toml` with redirects (see above)

### Issue 3: Environment variables not working
**Solution:**
1. Check they're prefixed with `VITE_`
2. Rebuild: Deploys → Trigger deploy → Clear cache

### Issue 4: DNS not propagating
**Solution:**
1. Use https://dnschecker.org/ to check status
2. Wait 24-48 hours
3. Clear browser cache
4. Try incognito mode

### Issue 5: Mixed content warnings (HTTP/HTTPS)
**Solution:** 
1. Check all API calls use HTTPS
2. Update Supabase URL to HTTPS
3. Check image URLs use HTTPS

### Issue 6: Build fails on Netlify
**Solution:**
1. Check deploy logs in Netlify
2. Common fix: Update `package.json` engine:
```json
"engines": {
  "node": ">=18.0.0",
  "npm": ">=9.0.0"
}
```

---

## 📊 Monitoring & Analytics (Recommended)

### Add Google Analytics (Optional)
1. Get GA tracking ID from https://analytics.google.com/
2. Add to Netlify env vars:
   ```
   VITE_GA_TRACKING_ID=G-XXXXXXXXXX
   ```
3. Implement in your app

### Add Sentry for Error Tracking (Recommended)
1. Sign up at https://sentry.io/
2. Create new project
3. Get DSN key
4. Add to env vars:
   ```
   VITE_SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
   ```

---

## 💰 Pricing (as of Nov 2025)

### Netlify:
- **Free Tier:** 100GB bandwidth, 300 build minutes/month
- **Pro:** $19/month - 1TB bandwidth, unlimited builds
- **Recommendation:** Start with Free, upgrade if needed

### Your Costs:
- Domain: ~$12-15/year (GoDaddy, Namecheap)
- Supabase: Free tier (upgrade as you scale)
- Netlify: Free tier (sufficient for MVP)

**Total:** ~$12-15/year minimum 🎉

---

## 🎓 Learning Resources

### Netlify Docs:
- https://docs.netlify.com/
- https://docs.netlify.com/domains-https/custom-domains/

### DNS Guides:
- https://www.netlify.com/blog/2017/05/25/understand-dns-in-just-10-minutes/

### Troubleshooting:
- https://answers.netlify.com/

---

## ✅ Quick Command Reference

```bash
# Development
npm run dev                    # Start dev server

# Build
npm run build                  # Production build
npm run preview                # Preview production build

# Git
git add .                      # Stage changes
git commit -m "message"        # Commit
git push origin main           # Push to GitHub (triggers deploy)

# Netlify CLI
netlify login                  # Login
netlify deploy --prod          # Deploy to production
netlify open                   # Open dashboard
netlify env:list               # List env vars
```

---

## 🎉 Success!

Once deployed, your site will be live at:
- **Primary:** `https://trucksonflex.com`
- **Netlify:** `https://trucksonflex.netlify.app`

Both URLs will work. The Netlify URL is useful for:
- Testing before pointing your domain
- Sharing with team
- Creating preview deployments

---

## 📞 Need Help?

1. **Netlify Support:** https://www.netlify.com/support/
2. **Supabase Discord:** https://discord.supabase.com/
3. **Project Issues:** Create issue on your GitHub repo

---

**Deployed by:** Cascade AI  
**Project:** TrucksOnFlex  
**Version:** 1.0  
**Date:** November 13, 2025
