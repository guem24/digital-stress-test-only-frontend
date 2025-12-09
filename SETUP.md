# Setup Guide

Complete setup instructions for the Digital Stress Test application.

## Table of Contents

- [Quick Start (Demo Mode)](#quick-start-demo-mode)
- [Full Setup (With Database)](#full-setup-with-database)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

---

## Quick Start (Demo Mode)

Deploy without data collection - perfect for testing or demonstrations.

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Configure Environment

Create `.env.production`:

```bash
PUBLIC_URL=/
REACT_APP_MOBILE_ONLY='true'
REACT_APP_VIDEO_RECORDING='false'
REACT_APP_LOGGING='false'

# Dummy values (not used when logging is false)
REACT_APP_SUPABASE_URL=https://dummy.supabase.co
REACT_APP_SUPABASE_ANON_KEY=dummy-key
```

### Step 3: Build

```bash
npm run build
```

### Step 4: Deploy

**Netlify (Easiest):**
1. Visit [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the `build` folder
3. Done! You'll get a URL like `https://your-app.netlify.app`

**Result:** Users can complete the full study but no data is saved.

---

## Full Setup (With Database)

Complete setup for research studies with data collection.

### Prerequisites

- Node.js 14+ installed
- Supabase account (free tier available)
- Text editor

### Step 1: Database Setup

#### 1.1 Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Note your:
   - Project URL: `https://xxxxx.supabase.co`
   - Anon/Public Key: `eyJhbGc...`

#### 1.2 Create Database Tables

In Supabase SQL Editor, run `supabase-schema.sql`:

```sql
-- Creates tables:
-- - participants
-- - vas_scores
-- - panas_scores
-- - math_task_performance
-- - speech_task_feedback
-- - speech_task_analysis
```

#### 1.3 Enable Row Level Security

Run `enable-rls-final.sql` to secure your data:

```sql
-- Enables RLS policies
-- Allows anonymous inserts
-- Prevents unauthorized access
```

### Step 2: Application Configuration

#### 2.1 Create `.env.production`

```bash
# Production Configuration
PUBLIC_URL=/

# Mobile-only mode
REACT_APP_MOBILE_ONLY='true'

# Video recording (optional)
REACT_APP_VIDEO_RECORDING='false'

# Enable data logging
REACT_APP_LOGGING='true'

# Supabase credentials
REACT_APP_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
REACT_APP_SUPABASE_ANON_KEY=YOUR-ANON-KEY
```

**Important:** Never commit `.env.production` to Git!

#### 2.2 Verify `.gitignore`

Ensure these are in `.gitignore`:

```
.env
.env.local
.env.production
.env.development
```

### Step 3: Local Testing

```bash
# Install dependencies
npm install

# Test with development environment
npm start

# Test production build locally
npm run build
npx serve -s build
```

Visit `http://localhost:3000` and complete a test run.

### Step 4: Verify Database

Check Supabase dashboard:
1. Go to Table Editor
2. Check `participants` table
3. Verify your test data appears

---

## Deployment

### Option 1: Netlify (Recommended)

**Method A: Drag & Drop**

1. Build your app:
   ```bash
   npm run build
   ```

2. Deploy:
   - Go to [netlify.com](https://netlify.com)
   - Drag `build` folder to dashboard
   - Done!

3. Add environment variables:
   - Site Settings → Environment Variables
   - Add all `REACT_APP_*` variables
   - Trigger redeploy

**Method B: Git Integration (Auto-deploy)**

1. Push to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR-REPO-URL
   git push -u origin main
   ```

2. Connect to Netlify:
   - New site from Git
   - Select your repository
   - Build command: `npm run build`
   - Publish directory: `build`

3. Add environment variables in Netlify dashboard

4. Deploy - automatic on every push!

**Configure CORS in Supabase:**
- Settings → API → CORS Allowed Origins
- Add: `https://your-app.netlify.app`

### Option 2: Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod

# Add environment variables
vercel env add REACT_APP_SUPABASE_URL
vercel env add REACT_APP_SUPABASE_ANON_KEY
# ... add all variables

# Redeploy
vercel --prod
```

### Option 3: GitHub Pages

1. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Update `package.json`:
   ```json
   {
     "homepage": "https://yourusername.github.io/repository-name",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
   }
   ```

3. Deploy:
   ```bash
   npm run deploy
   ```

4. Enable GitHub Pages:
   - Repository Settings → Pages
   - Source: `gh-pages` branch

**Note:** GitHub Pages doesn't support environment variables. You'll need to build with variables set:

```bash
REACT_APP_LOGGING='true' REACT_APP_SUPABASE_URL='your-url' npm run build
npm run deploy
```

---

## Environment Variables Reference

| Variable | Values | Description |
|----------|--------|-------------|
| `REACT_APP_LOGGING` | 'true'/'false' | Enable/disable data collection |
| `REACT_APP_MOBILE_ONLY` | 'true'/'false' | Restrict to mobile devices |
| `REACT_APP_VIDEO_RECORDING` | 'true'/'false' | Enable video recording |
| `REACT_APP_SUPABASE_URL` | URL | Your Supabase project URL |
| `REACT_APP_SUPABASE_ANON_KEY` | Key | Your Supabase anonymous key |
| `PUBLIC_URL` | Path | Base URL path (default: /) |

---

## Post-Deployment Checklist

After deployment, verify:

- [ ] App loads on mobile device
- [ ] HTTPS is enabled (automatic on Netlify/Vercel)
- [ ] Camera/microphone permissions work
- [ ] Complete a full test run
- [ ] Data appears in Supabase dashboard
- [ ] Completion message displays correctly
- [ ] No console errors (F12)

---

## Troubleshooting

### Issue: App won't start locally

**Solution:**
```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install

# If on older Node, use legacy OpenSSL
export NODE_OPTIONS=--openssl-legacy-provider
npm start
```

### Issue: Camera/Microphone not working

**Causes:**
- Not using HTTPS (required for media access)
- Browser permissions denied

**Solution:**
- Deploy to Netlify/Vercel (automatic HTTPS)
- Check browser permissions (click lock icon in address bar)
- Test in different browser

### Issue: Data not saving to database

**Check:**
1. `REACT_APP_LOGGING='true'` in environment
2. Supabase credentials correct
3. RLS policies enabled
4. CORS configured in Supabase
5. Network tab in browser (F12) for API errors

**Debug:**
```javascript
// Check in browser console
console.log(process.env.REACT_APP_SUPABASE_URL);
console.log(process.env.REACT_APP_LOGGING);
```

### Issue: Build fails

**Common causes:**
- Missing environment variables
- Outdated Node version
- Syntax errors in code

**Solution:**
```bash
# Check Node version (should be 14+)
node --version

# Clean build
rm -rf build
npm run build
```

### Issue: Blank page after deployment

**Check:**
1. `PUBLIC_URL` in `.env.production` is correct
2. Build folder uploaded completely
3. Browser console for errors (F12)

**Solution for GitHub Pages:**
```json
// package.json
"homepage": "https://username.github.io/repo-name"
```

---

## Security Best Practices

### For Production Deployments

1. **Never commit credentials:**
   - Use environment variables
   - Verify `.gitignore` includes `.env*`

2. **Enable Supabase RLS:**
   - Run `enable-rls-final.sql`
   - Test with different user scenarios

3. **Configure CORS:**
   - Only allow your deployment domain
   - No wildcards in production

4. **Monitor usage:**
   - Check Supabase dashboard regularly
   - Set up usage alerts

5. **Backup data:**
   - Export data regularly during studies
   - Keep backups in secure location

### For Research Ethics

- Obtain informed consent
- Implement data anonymization
- Follow institutional IRB guidelines
- Provide data deletion capability
- Document data retention policies

---

## Data Management

### Exporting Data

**From Supabase:**
1. Go to Table Editor
2. Select table
3. Click "Export" → CSV/JSON

**Automated Export (Optional):**
```javascript
// Use Supabase JavaScript client
const { data, error } = await supabase
  .from('participants')
  .select('*')
  .csv();
```

### Data Backup Schedule

**Recommended:**
- Daily during active data collection
- Weekly otherwise
- Before any database schema changes

---

## Support & Resources

- **Supabase Docs:** [supabase.com/docs](https://supabase.com/docs)
- **Netlify Docs:** [docs.netlify.com](https://docs.netlify.com)
- **React Docs:** [react.dev](https://react.dev)
- **Material-UI:** [mui.com](https://mui.com)

---

## Maintenance

### Regular Updates

```bash
# Check for outdated packages
npm outdated

# Update dependencies (carefully)
npm update

# Test thoroughly after updates
npm test
npm run build
```

### Monitoring Production

**What to monitor:**
- Error rates (use Sentry or similar)
- Completion rates
- Performance (Lighthouse scores)
- Database size
- Uptime

---

**Ready to deploy? Follow the checklist above and you'll be live in minutes!**
