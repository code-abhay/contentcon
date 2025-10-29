# Git Push Instructions

## Quick Start - Push to GitHub

Run these commands in your project directory:

```bash
# Navigate to project
cd /Users/abhay.kumar/Desktop/project

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: ContentCon Blog with Contentstack integration and live sync"

# Add remote (replace with your actual repo URL if different)
git remote add origin https://github.com/code-abhay/contentcon.git

# Push to main branch
git branch -M main
git push -u origin main
```

## If Repository Already Exists

If you've already initialized the repo:

```bash
# Check remote
git remote -v

# If remote is wrong, update it:
git remote set-url origin https://github.com/code-abhay/contentcon.git

# Pull any existing changes
git pull origin main --allow-unrelated-histories

# Add, commit, and push
git add .
git commit -m "Add ContentCon Blog with Contentstack sync"
git push origin main
```

## Files Being Pushed

The following files will be included:

✅ **Essential Files:**
- `index.html` - Main page
- `styles.css` - All CSS
- `script.js` - UI scripts
- `contentstack-sync-browser.js` - Content sync
- `contentstack-render-browser.js` - Content rendering

✅ **Documentation:**
- `README.md`
- `LAUNCH_SETUP.md`
- `SYNC_TROUBLESHOOTING.md`
- `CONTENTSTACK_SYNC_GUIDE.md`

✅ **Config:**
- `package.json`
- `.gitignore`
- `.nvmrc`

⚠️ **Excluded (via .gitignore):**
- `node_modules/` (if any)
- `.env` files
- Test files

## After Pushing

1. Go to Contentstack Launch
2. Connect your GitHub repo
3. Deploy!

See `LAUNCH_SETUP.md` for detailed Launch configuration.

