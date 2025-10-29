# Contentstack Launch Setup Guide

## 🚀 Deploying to Contentstack Launch

### Step 1: Push to GitHub

1. Initialize git repository (if not already done):
```bash
cd /path/to/project
git init
git add .
git commit -m "Initial commit - ContentCon Blog"
git branch -M main
git remote add origin https://github.com/code-abhay/contentcon.git
git push -u origin main
```

### Step 2: Connect to Contentstack Launch

1. Log in to [Contentstack](https://app.contentstack.com/)
2. Navigate to **Launch** (in the top menu)
3. Click **"Create New Site"** or **"Add Site"**
4. Choose **"Connect GitHub Repository"**
5. Authorize Contentstack to access your GitHub
6. Select repository: `code-abhay/contentcon`

### Step 3: Configure Build Settings

In Contentstack Launch, configure:

**Build Settings:**
- **Branch**: `main` (or your default branch)
- **Framework**: `Static Site` or `Other`
- **Build Command**: (Leave empty - we have static files)
- **Output Directory**: `/` (root directory)
- **Base Directory**: (Leave empty)
- **Node Version**: (Optional, but can use `18.x` or `20.x`)

**Environment Variables** (Optional but recommended):
- `CONTENTSTACK_API_KEY`: Your stack API key
- `CONTENTSTACK_DELIVERY_TOKEN`: Your delivery token  
- `CONTENTSTACK_ENVIRONMENT`: `production`
- `CONTENTSTACK_REGION`: `us`

**Note**: Currently credentials are hardcoded in `contentstack-sync-browser.js`. For production, you can:
1. Use Launch environment variables
2. Or keep them as-is (they're public anyway for browser-side JavaScript)

### Step 4: Deploy

1. Click **"Deploy"** or **"Save & Deploy"**
2. Launch will build and deploy your site
3. You'll get a URL like: `https://your-site.launch.contentstack.com`

### Step 5: Custom Domain (Optional)

1. In Launch, go to **Settings** → **Domains**
2. Add your custom domain
3. Follow DNS configuration instructions

## 🔄 How Live Sync Works

Once deployed:

1. **Edit content** in Contentstack CMS
2. **Publish** the changes
3. Wait ~10 seconds
4. The live website **automatically refreshes** with new content!

The sync checks for updates every 10 seconds using the `_version` field from Contentstack entries.

## 📋 Files Included

All necessary files are in the repository:

- ✅ `index.html` - Main page
- ✅ `styles.css` - All styling
- ✅ `script.js` - UI interactions
- ✅ `contentstack-sync-browser.js` - Content sync logic
- ✅ `contentstack-render-browser.js` - Content rendering
- ✅ All static assets

## 🔍 Testing After Deployment

1. **Check Console**: Open browser dev tools on deployed site
2. **Look for**: 
   - `🔄 Auto-refresh enabled`
   - `📡 Fetching [content_type] from Contentstack...`
   - `✅ Successfully fetched`

3. **Make a change** in Contentstack
4. **Publish**
5. **Watch console** - Should see update detection within 10 seconds
6. **Page refreshes** automatically!

## 🛠️ Troubleshooting

**Site not deploying?**
- Check build logs in Launch dashboard
- Ensure all files are committed to GitHub
- Verify build settings are correct

**Sync not working?**
- Check browser console for errors
- Verify delivery token has read permissions
- Ensure content is published (not just saved)
- Check CORS if seeing API errors

**Changes not appearing?**
- Wait up to 10 seconds after publishing
- Clear browser cache
- Check console for sync messages
- Run `window.checkForUpdates()` in console

## 📞 Support

- Contentstack Launch Docs: https://www.contentstack.com/docs/developers/contentstack-launch/
- Contentstack Support: support@contentstack.com

---

**You're all set!** 🎉 Your site will now automatically sync content from Contentstack!

