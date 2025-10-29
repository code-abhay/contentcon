# 🚀 Deployment Checklist - Contentstack Launch

## ✅ Pre-Deployment Checklist

### Files Ready
- ✅ `index.html` - Main page
- ✅ `styles.css` - All styles
- ✅ `script.js` - UI interactions  
- ✅ `contentstack-sync-browser.js` - Live sync (10s interval)
- ✅ `contentstack-render-browser.js` - Content rendering
- ✅ `package.json` - Project metadata
- ✅ `.gitignore` - Git configuration
- ✅ `README.md` - Documentation

### Sync Configuration
- ✅ Sync interval: 10 seconds
- ✅ Update detection: Uses `_version` field
- ✅ Auto-refresh: Enabled
- ✅ Manual refresh: `window.forceRefresh()` available

### Contentstack Credentials
- ✅ API Key: `blt89c08d1b12ee2e55`
- ✅ Delivery Token: `csc2289f1a773e5c0e89bfe2f1`
- ✅ Environment: `production`
- ✅ Region: `us`

## 📤 Step 1: Push to GitHub

```bash
cd /Users/abhay.kumar/Desktop/project

# Initialize git (if needed)
git init

# Add all files
git add .

# Commit
git commit -m "ContentCon Blog - Ready for Contentstack Launch deployment"

# Add remote
git remote add origin https://github.com/code-abhay/contentcon.git

# Push to main
git branch -M main
git push -u origin main
```

## 🎯 Step 2: Connect to Contentstack Launch

1. **Login** to [Contentstack](https://app.contentstack.com/)
2. Navigate to **Launch** section
3. Click **"Create New Site"** or **"Add Site"**
4. Select **"Connect GitHub Repository"**
5. Authorize Contentstack → GitHub access
6. Choose repository: `code-abhay/contentcon`

## ⚙️ Step 3: Configure Build Settings

**In Contentstack Launch:**

### Build Configuration
- **Branch**: `main`
- **Framework**: `Static Site` or `Other`
- **Build Command**: *(Leave empty)*
- **Output Directory**: `/` (root)
- **Base Directory**: *(Leave empty)*
- **Node Version**: `18.x` (optional)

### Environment Variables (Optional)
You can set these, but they're also hardcoded in the sync file:
- `CONTENTSTACK_API_KEY`: `blt89c08d1b12ee2e55`
- `CONTENTSTACK_DELIVERY_TOKEN`: `csc2289f1a773e5c0e89bfe2f1`
- `CONTENTSTACK_ENVIRONMENT`: `production`

### Preview Settings
- Enable preview environments if needed
- Set up custom domains (optional)

## 🚀 Step 4: Deploy

1. Click **"Deploy"** or **"Save & Deploy"**
2. Wait for build to complete
3. Get your deployment URL (e.g., `https://your-site.launch.contentstack.com`)

## ✅ Step 5: Verify Live Sync

1. **Open deployed site** in browser
2. **Open Console** (F12)
3. **Look for**:
   ```
   🔄 Auto-refresh enabled. Checking for changes every 10 seconds
   📡 Fetching hero_section from Contentstack...
   ✅ Successfully fetched hero_section: 1 entry/entries
   ```

4. **Test sync**:
   - Go to Contentstack CMS
   - Edit hero section (or any content)
   - **Publish** changes
   - Wait ~10 seconds
   - Live site should auto-refresh!

## 🔍 Troubleshooting

### Build Fails
- Check build logs in Launch dashboard
- Verify all files are in GitHub
- Ensure `index.html` is in root directory

### Sync Not Working
- Open browser console on live site
- Check for API errors
- Verify delivery token permissions
- Run `window.checkForUpdates()` manually

### Changes Not Appearing
- Ensure content is **published** (not just saved)
- Wait up to 10 seconds after publish
- Clear browser cache
- Check console for sync logs

## 📝 Post-Deployment

### Test All Features
- [ ] Navigation menu loads from Contentstack
- [ ] Hero section renders correctly
- [ ] Feature cards display
- [ ] Blog posts show
- [ ] Footer sections appear
- [ ] Auto-sync works (edit + publish → appears in 10s)

### Monitor
- Check Launch dashboard for build status
- Monitor browser console on live site
- Test content updates regularly

## 🎉 You're Done!

Your site is now:
- ✅ Deployed on Contentstack Launch
- ✅ Connected to Contentstack CMS
- ✅ Auto-syncing content every 10 seconds
- ✅ Ready for content management!

**Remember**: Always **publish** changes in Contentstack (not just save) for them to appear on the live site!

