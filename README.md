# ContentCon Blog

Modern, responsive blog website with Contentstack CMS integration and live content sync.

## 🚀 Features

- ✅ Full Contentstack CMS integration
- ✅ Live content sync (updates appear automatically when published)
- ✅ Modern, responsive design
- ✅ Smooth animations and transitions
- ✅ Dynamic content rendering
- ✅ Auto-refresh on content updates

## 📁 Project Structure

```
.
├── index.html                 # Main HTML file
├── styles.css                 # All CSS styles and animations
├── script.js                  # Interactive JavaScript
├── contentstack-sync-browser.js    # Contentstack sync & API integration
├── contentstack-render-browser.js  # Content rendering functions
├── README.md                  # This file
└── contentstack/              # Content models and entries (for reference)
```

## 🔧 Contentstack Integration

### Content Types

The website uses the following Contentstack content types:

- `navigation_menu` - Navigation menu items
- `hero_section` - Hero/banner section
- `feature_card` - Feature cards
- `blog_post` - Blog articles
- `company_logo` - Partner company logos
- `cta_section` - Call-to-action sections
- `footer_section` - Footer navigation sections

### Live Sync

The website automatically checks for content updates every 10 seconds. When you publish changes in Contentstack, they appear on the live site automatically.

## 🌐 Deployment

### Contentstack Launch

This project is ready for deployment on Contentstack Launch:

1. Connect your GitHub repository to Contentstack Launch
2. Point Launch to this repository: `https://github.com/code-abhay/contentcon`
3. Set build settings:
   - **Build Command**: (Leave empty - static files)
   - **Output Directory**: `/` (root)
   - **Node Version**: (Not required, but can use latest LTS)
4. Deploy!

### Manual Setup

```bash
# Clone the repository
git clone https://github.com/code-abhay/contentcon.git

# Navigate to project
cd contentcon

# Serve locally (Python)
python3 -m http.server 8000

# Or use any static file server
```

## ⚙️ Configuration

Contentstack credentials are configured in `contentstack-sync-browser.js`:

```javascript
const CONTENTSTACK_CONFIG = {
  api_key: 'blt89c08d1b12ee2e55',
  delivery_token: 'csc2289f1a773e5c0e89bfe2f1',
  environment: 'production',
  region: 'us'
};
```

**Note**: For production, consider using environment variables in Contentstack Launch.

## 🎨 Customization

- Edit `styles.css` for design changes
- Modify `contentstack-render-browser.js` to change how content is rendered
- Update `contentstack-sync-browser.js` to adjust sync interval (default: 10 seconds)

## 📝 Content Management

1. Log in to [Contentstack](https://app.contentstack.com/)
2. Navigate to your stack
3. Edit content in any content type
4. **Publish** the changes
5. Changes appear on the live site within 10 seconds!

## 🔍 Debugging

Open browser console (F12) to see:
- Sync status messages
- API fetch logs
- Update detection logs

Manual commands in console:
```javascript
// Check for updates
window.checkForUpdates();

// Force refresh content
window.forceRefresh();
```

## 📄 License

MIT License

## 🙏 Credits

Built with Contentstack CMS

