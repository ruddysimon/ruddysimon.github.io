# GitHub Pages Deployment Guide

## Steps to Deploy Your Portfolio Website

### 1. **Initial Setup** ✅
- Repository renamed to `ruddysimon.github.io` ✅
- Repository set to public ✅

### 2. **Enable GitHub Pages**
1. Go to your repository on GitHub
2. Click on **Settings** (top menu)
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select:
   - **Source**: `GitHub Actions`
5. Save the settings

### 3. **Push Your Code**
```bash
cd /Users/ruddysimonpour/portfolio_website/data-vibe-folio
git add .
git commit -m "Initial commit for GitHub Pages deployment"
git push origin main
```

### 4. **Automatic Deployment**
- The GitHub Actions workflow will automatically:
  - Build your Vite project
  - Deploy it to GitHub Pages
  - Your site will be live at: `https://ruddysimon.github.io`

### 5. **Monitor Deployment**
- Go to the **Actions** tab in your repository
- You'll see the deployment workflow running
- Once it completes (green checkmark), your site is live!

### 6. **Future Updates**
- Just push to the `main` branch
- The workflow will automatically rebuild and redeploy

## Troubleshooting

### If the site doesn't load:
1. Check the **Actions** tab for any errors
2. Wait a few minutes (first deployment can take 5-10 minutes)
3. Clear your browser cache and try again
4. Check that GitHub Pages is enabled in Settings → Pages

### Manual Build (if needed):
```bash
npm run build
# The dist folder contains your built site
```

## Notes
- The site will be available at: `https://ruddysimon.github.io`
- Any push to `main` will trigger a new deployment
- The workflow uses GitHub Actions for automatic deployment

