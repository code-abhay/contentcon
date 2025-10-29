# Contentstack Live Sync Guide

Your website is now connected to Contentstack and will automatically sync when you publish changes!

## 🎯 How It Works

1. **Auto-Detection**: The script checks for content updates every 30 seconds
2. **Auto-Refresh**: When content is published in Contentstack, the page automatically refreshes to show new content
3. **Real-Time**: Changes appear within 30 seconds of publishing

## 📝 Setup Complete

✅ Contentstack sync scripts are loaded  
✅ Auto-refresh is enabled  
✅ All content is fetched from Contentstack dynamically

## 🔄 Using the Sync

### Automatic Sync (Already Enabled)
- Just edit and publish content in Contentstack
- The page will automatically refresh within 30 seconds
- No manual action needed!

### Manual Refresh
You can also manually trigger a refresh by opening the browser console and running:
```javascript
window.checkForUpdates();
```

## 📍 Your Contentstack Credentials

- **Stack API Key**: `blt89c08d1b12ee2e55`
- **Delivery Token**: `csc2289f1a773e5c0e89bfe2f1`
- **Environment**: `production`
- **Region**: `us` (North America)

## 🎨 What Gets Synced

All these sections are now dynamic and will update when you publish changes:

1. **Navigation Menu** - From `navigation_menu` content type
2. **Hero Section** - From `hero_section` content type
3. **Feature Cards** - From `feature_card` content type
4. **Blog Posts** - From `blog_post` content type
5. **Company Logos** - From `company_logo` content type
6. **CTA Section** - From `cta_section` content type
7. **Footer** - From `footer_section` content type

## 🛠️ Testing the Sync

1. Open your localhost: `http://localhost:8000`
2. Open Contentstack: https://app.contentstack.com/#/stack/blt89c08d1b12ee2e55
3. Edit any content (e.g., hero section title)
4. Publish the changes
5. Wait up to 30 seconds
6. Your localhost will automatically refresh with the new content!

## ⚙️ Configuration

Edit `contentstack-sync-browser.js` to adjust settings:

```javascript
const AUTO_REFRESH_ENABLED = true;  // Enable/disable auto-refresh
const REFRESH_INTERVAL = 30000;      // Check interval in milliseconds (30 seconds)
```

## 📦 Files Created

- `contentstack-sync-browser.js` - Handles syncing and updates
- `contentstack-render-browser.js` - Renders content into HTML
- `contentstack-config.js` - Configuration (for future use)

## 🔍 Console Messages

Watch the browser console for:
- `🔄 Auto-refresh enabled` - Sync is active
- `🔄 Content updated in Contentstack!` - Changes detected, refreshing
- `✅ Content rendered successfully` - Content loaded

## 🚀 Next Steps

1. **Test the sync**: Make a change in Contentstack and watch it appear!
2. **Customize refresh interval**: Adjust `REFRESH_INTERVAL` if needed
3. **Add more content types**: Update render functions as needed

## 📞 Troubleshooting

**Content not updating?**
- Check browser console for errors
- Verify content is published in Contentstack
- Ensure delivery token has read permissions

**Need faster updates?**
- Reduce `REFRESH_INTERVAL` (minimum: 5 seconds recommended)
- Or use Contentstack webhooks for instant updates (advanced)

---

**Ready to go!** Edit content in Contentstack and watch it sync to your localhost automatically! 🎉

