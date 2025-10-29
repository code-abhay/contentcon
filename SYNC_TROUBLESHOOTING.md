# Contentstack Sync Troubleshooting

## ✅ Sync is Now Fixed!

The sync has been improved with:
- ✅ Faster refresh interval (10 seconds instead of 30)
- ✅ Better update detection using `_version` field
- ✅ Improved caching logic
- ✅ More detailed console logging
- ✅ Manual refresh function

## 🔍 How to Verify It's Working

1. **Open Browser Console** (F12 or Cmd+Option+I)
2. Look for these messages:
   - `🔄 Auto-refresh enabled. Checking for changes every 10 seconds`
   - `📡 Fetching hero_section from Contentstack...`
   - `✅ Successfully fetched hero_section: 1 entry/entries`
   - `🔍 Checking for content updates...`

## 🧪 Test the Sync

1. **Open localhost**: http://localhost:8000
2. **Open Console**: Press F12
3. **Make a change in Contentstack**:
   - Go to: https://app.contentstack.com/#/stack/blt89c08d1b12ee2e55/entries/hero_section
   - Edit the hero section title
   - Click "Publish"
4. **Wait 10 seconds** - The page should automatically refresh
5. **Check console** - You should see:
   - `🔄 ✅ Content updated in Contentstack! Changes detected!`
   - `🔄 Clearing cache and refreshing page...`

## 🛠️ Manual Commands

If auto-refresh isn't working, try these in the browser console:

```javascript
// Check for updates manually
window.checkForUpdates();

// Force refresh all content
window.forceRefresh();

// Check what's cached
console.log(window.contentCache);

// See current hero data
window.getHeroSection(true).then(hero => console.log(hero));
```

## 📊 What Gets Checked

The sync checks the hero section's `_version` field every 10 seconds. When this changes (after you publish), the page auto-refreshes.

## ⚠️ Common Issues

**Issue: Changes not appearing**
- Solution: Check browser console for errors
- Solution: Run `window.forceRefresh()` manually
- Solution: Make sure content is **published** in Contentstack (not just saved)

**Issue: Console shows errors**
- Check if delivery token is correct
- Verify content is published in "production" environment
- Check network tab for API errors

**Issue: Cache not clearing**
- Run `window.contentCache.clear()` in console
- Or run `window.forceRefresh()`

## 🎯 Current Configuration

- **Refresh Interval**: 10 seconds
- **Cache Duration**: 5 seconds
- **Update Detection**: Uses `_version` field from Contentstack

## 💡 Pro Tips

1. Keep the browser console open to see sync activity
2. Changes must be **published** (not just saved) in Contentstack
3. The first check happens 2 seconds after page load
4. Each check fetches fresh data (bypasses cache)

---

**If issues persist**, check the browser console for specific error messages and share them for further debugging.

