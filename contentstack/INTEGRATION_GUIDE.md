# Contentstack Integration Guide

## Step-by-Step Integration Instructions

### Prerequisites
- Contentstack account
- API Key and Delivery Token
- Node.js (for npm installation)

### Step 1: Install Contentstack SDK

```bash
npm install contentstack
```

### Step 2: Create Configuration File

Create `config.js`:

```javascript
export const contentstackConfig = {
  api_key: 'YOUR_API_KEY',
  delivery_token: 'YOUR_DELIVERY_TOKEN',
  environment: 'production'
};
```

### Step 3: Import Content Models

#### Using Contentstack CLI (Recommended)

1. Install CLI globally:
```bash
npm install -g @contentstack/cli
```

2. Login to your account:
```bash
csdx auth:login
```

3. Import all content types:
```bash
csdx cm:import -a <your-api-key> -d ./content-models
```

4. Import all entries:
```bash
csdx cm:entries:import -a <your-api-key> -d ./entries
```

#### Manual Import via UI

1. Log into Contentstack
2. Navigate to Stack Settings → Content Types
3. Click "Add Content Type"
4. Copy JSON from each model file
5. Create entries manually through Content Manager

### Step 4: Update Your HTML

Include the integration script:

```html
<script type="module" src="integration-example.js"></script>
```

Or inline:

```html
<script type="module">
  import { initContentstack } from './contentstack/integration-example.js';
  initContentstack();
</script>
```

### Step 5: Replace Static Content

Update `index.html` to use dynamic containers:

**Before:**
```html
<h1>The world's best digital<br>
  <span class="gradient-text">experiences start here</span>
</h1>
```

**After:**
```html
<div class="hero-content container" id="hero-content">
  <!-- Content will be populated by Contentstack -->
</div>
```

### Step 6: Handle Images

Contentstack file fields return URLs. Update image rendering:

```javascript
// Featured image example
const imageURL = entry.featured_image ? entry.featured_image.url : null;
```

### Step 7: Environment Setup

For production, use environment variables:

```bash
# .env file
CONTENTSTACK_API_KEY=your_api_key
CONTENTSTACK_DELIVERY_TOKEN=your_delivery_token
CONTENTSTACK_ENVIRONMENT=production
```

## Content Model Relationships

### Singleton Content Types
- `hero_section`: Only one entry
- `cta_section`: Only one entry

### Multi-entry Content Types
- `navigation_menu`: Multiple menu items
- `feature_card`: Multiple features
- `blog_post`: Multiple blog posts
- `company_logo`: Multiple company logos
- `footer_section`: Multiple footer sections
- `section_header`: One per section type

## Query Examples

### Filter by Date
```javascript
const Query = Stack.ContentType('blog_post').Query();
const recentPosts = await Query
  .where('publish_date', 'desc')
  .limit(5)
  .toJSON()
  .find();
```

### Search
```javascript
const Query = Stack.ContentType('blog_post').Query();
const results = await Query
  .search('headless CMS')
  .toJSON()
  .find();
```

### Include Related Content
```javascript
const Query = Stack.ContentType('blog_post').Query();
const post = await Query
  .includeReference(['author', 'category'])
  .toJSON()
  .find();
```

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure your delivery token allows your domain
   - Check Contentstack settings

2. **Missing Content**
   - Verify content is published
   - Check environment matches your query
   - Verify content type UIDs match

3. **Image URLs**
   - Images need to be uploaded to Contentstack
   - Use `.url` property to get image URL

### Debug Mode

Enable debug logging:

```javascript
Stack.setHost('cdn.contentstack.io');
Stack.debug = true;
```

## Best Practices

1. **Caching**: Cache API responses for better performance
2. **Error Handling**: Always wrap API calls in try-catch
3. **Loading States**: Show loading indicators while fetching
4. **Fallbacks**: Provide default content if API fails
5. **SEO**: Pre-render content or use SSG/SSR

## Next Steps

1. Customize content models for your needs
2. Add more content types as needed
3. Set up webhooks for content updates
4. Implement search functionality
5. Add localization support

