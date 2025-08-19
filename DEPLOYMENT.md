# PowerOfAI4SmallBiz - Deployment Guide

## Automatic Deployment Setup

This repository is configured for automatic deployment from GitHub to Netlify.

### Files Overview

- `netlify.toml` - Netlify configuration file
- `deploy.sh` - Manual deployment script
- `index.html` - Main website
- `admin/` - Admin dashboard
- `resources/` - Lead magnets and resources

### Deployment Methods

#### Method 1: Automatic (Recommended)
When you push to the `main` branch, Netlify automatically deploys your site.

```bash
git add .
git commit -m "Your commit message"
git push origin main
```

#### Method 2: Manual Script
Use the deployment script for manual deployments:

```bash
chmod +x deploy.sh
./deploy.sh
```

#### Method 3: Netlify CLI
Direct deployment using Netlify CLI:

```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir=.
```

### Site URLs

- **Live Site**: https://powerofai4smallbiz.netlify.app
- **Admin Dashboard**: https://powerofai4smallbiz.netlify.app/admin
- **GitHub Repository**: https://github.com/Mprindle10/powerofaismallbiz

### Configuration Details

#### Netlify Settings
- **Build Command**: None (static site)
- **Publish Directory**: `.` (root)
- **Branch**: `main`

#### Environment Variables
None required for this static site.

### Troubleshooting

#### Common Issues

1. **404 Error**
   - Check that `index.html` is in the root directory
   - Verify publish directory is set to `.` or `/`

2. **Admin Panel Not Working**
   - Ensure `admin/index.html` exists
   - Check redirect rules in `netlify.toml`

3. **Styles Not Loading**
   - Verify all CSS files are committed to git
   - Check file paths are relative

#### Quick Fixes

```bash
# Reset and redeploy
git add .
git commit -m "Fix deployment issues"
git push origin main

# Manual deployment
./deploy.sh
```

### Development Workflow

1. **Local Development**
   ```bash
   python3 -m http.server 8000
   # Visit http://localhost:8000
   ```

2. **Make Changes**
   - Edit HTML, CSS, JS files
   - Test locally

3. **Deploy**
   ```bash
   git add .
   git commit -m "Description of changes"
   git push origin main
   ```

4. **Verify**
   - Check https://powerofai4smallbiz.netlify.app
   - Test email form functionality
   - Verify admin dashboard

### Performance Optimization

- Static assets are cached for 1 year
- HTML files are cached for 1 hour
- Gzip compression enabled
- Security headers configured

### Security Features

- XSS Protection enabled
- Content type sniffing disabled
- Frame options set to DENY
- Strict referrer policy

---

**Need Help?**
- Netlify Documentation: https://docs.netlify.com
- GitHub Issues: Create an issue in this repository
- Contact: powerofai4smallbiz@gmail.com
