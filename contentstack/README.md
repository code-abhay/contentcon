# Contentstack Integration for ContentCon Blog

This directory contains Contentstack content models and sample entries for integrating with the ContentCon Blog website.

## 📁 Directory Structure

```
contentstack/
├── content-models/          # Content type definitions
│   ├── navigation-menu.json
│   ├── hero-section.json
│   ├── feature-card.json
│   ├── blog-post.json
│   ├── company-logo.json
│   ├── cta-section.json
│   ├── footer-section.json
│   └── section-header.json
├── entries/                 # Sample content entries
│   ├── navigation-menu-entries.json
│   ├── hero-section-entry.json
│   ├── feature-card-entries.json
│   ├── blog-post-entries.json
│   ├── company-logo-entries.json
│   ├── cta-section-entry.json
│   ├── section-header-entries.json
│   └── footer-section-entries.json
└── README.md
```

## 🚀 Quick Start

### Step 1: Install Contentstack SDK

```bash
npm install contentstack
```

Or via CDN:
```html
<script src="https://cdn.jsdelivr.net/npm/contentstack@latest/dist/web/contentstack.min.js"></script>
```

### Step 2: Initialize Contentstack

```javascript
import Contentstack from 'contentstack';

const Stack = Contentstack.Stack({
  api_key: 'YOUR_API_KEY',
  delivery_token: 'YOUR_DELIVERY_TOKEN',
  environment: 'production'
});
```

### Step 3: Fetch Content

See `integration-example.js` for complete examples.

## 📋 Content Types Overview

### 1. Navigation Menu (`navigation_menu`)
- **Purpose**: Main navigation items
- **Fields**:
  - `menu_label` (text): Display text
  - `link_url` (text): Navigation URL
  - `order` (number): Display order

### 2. Hero Section (`hero_section`)
- **Purpose**: Main hero/banner section
- **Fields**:
  - `title` (text): Main title
  - `gradient_title` (text): Gradient styled text
  - `subtitle` (text): Description
  - `primary_cta` (group): Primary button
  - `secondary_cta` (group): Secondary button
  - `badge_label` (text): Label above logos

### 3. Feature Card (`feature_card`)
- **Purpose**: Feature/service cards
- **Fields**:
  - `title` (text): Feature name
  - `description` (text): Feature description
  - `icon_name` (text): Icon identifier
  - `link_text` (text): CTA text
  - `link_url` (text): CTA URL
  - `order` (number): Display order

### 4. Blog Post (`blog_post`)
- **Purpose**: Blog articles
- **Fields**:
  - `title` (text): Post title
  - `description` (text): Excerpt
  - `featured_image` (file): Hero image
  - `category` (text): Category badge
  - `content` (richtext): Full content
  - `slug` (text): URL slug (unique)
  - `publish_date` (date): Publication date
  - `author` (text): Author name

### 5. Company Logo (`company_logo`)
- **Purpose**: Partner/trusted company logos
- **Fields**:
  - `company_name` (text): Company name
  - `logo` (file): Logo image
  - `website_url` (link): Company website
  - `order` (number): Display order

### 6. CTA Section (`cta_section`)
- **Purpose**: Call-to-action sections
- **Fields**:
  - `title` (text): CTA title
  - `description` (text): CTA description
  - `button_text` (text): Button label
  - `button_link` (text): Button URL

### 7. Footer Section (`footer_section`)
- **Purpose**: Footer navigation sections
- **Fields**:
  - `section_title` (text): Section heading
  - `links` (group, multiple): Array of links
  - `order` (number): Display order

### 8. Section Header (`section_header`)
- **Purpose**: Section titles and subtitles
- **Fields**:
  - `section_type` (select): Section identifier
  - `title` (text): Section title
  - `subtitle` (text): Section description

## 🔧 Importing Content Models

### Option 1: Using Contentstack CLI

1. Install Contentstack CLI:
```bash
npm install -g @contentstack/cli
```

2. Login:
```bash
csdx auth:login
```

3. Import content types:
```bash
csdx cm:import -a <api-key> -d content-models/
```

4. Import entries:
```bash
csdx cm:entries:import -a <api-key> -d entries/
```

### Option 2: Using Contentstack Management API

Use the Management API to programmatically create content types and entries. See Contentstack documentation for API endpoints.

### Option 3: Manual Import via UI

1. Log into your Contentstack account
2. Go to Stack Settings → Content Types
3. Create each content type manually using the JSON schemas
4. Add entries through the Content Manager

## 💻 Integration Examples

### Fetch Navigation Menu

```javascript
const Query = Stack.ContentType('navigation_menu').Query();
const navItems = await Query.where('order', 'asc').toJSON().find();
```

### Fetch Hero Section

```javascript
const Query = Stack.ContentType('hero_section').Query();
const hero = await Query.toJSON().find();
```

### Fetch Feature Cards

```javascript
const Query = Stack.ContentType('feature_card').Query();
const features = await Query.where('order', 'asc').toJSON().find();
```

### Fetch Blog Posts

```javascript
const Query = Stack.ContentType('blog_post').Query();
const blogPosts = await Query.where('order', 'desc').limit(10).toJSON().find();
```

### Fetch Company Logos

```javascript
const Query = Stack.ContentType('company_logo').Query();
const companies = await Query.where('order', 'asc').toJSON().find();
```

## 🎨 Rendering Content

### Dynamic HTML Generation Example

```javascript
// Hero Section
async function renderHero() {
  const hero = await getHeroSection();
  const heroHTML = `
    <h1>${hero.title}<br>
      <span class="gradient-text">${hero.gradient_title}</span>
    </h1>
    <p>${hero.subtitle}</p>
    <button onclick="location.href='${hero.primary_cta.button_link}'">
      ${hero.primary_cta.button_text}
    </button>
  `;
  document.getElementById('hero').innerHTML = heroHTML;
}

// Blog Posts
async function renderBlogPosts() {
  const posts = await getBlogPosts();
  const postsHTML = posts.map(post => `
    <article class="blog-card">
      <h3>${post.title}</h3>
      <p>${post.description}</p>
      <span class="blog-category">${post.category}</span>
      <a href="/blog/${post.slug}">Read more →</a>
    </article>
  `).join('');
  document.getElementById('blog-grid').innerHTML = postsHTML;
}
```

## 🔐 Environment Variables

Create a `.env` file:

```
CONTENTSTACK_API_KEY=your_api_key
CONTENTSTACK_DELIVERY_TOKEN=your_delivery_token
CONTENTSTACK_ENVIRONMENT=production
```

## 📝 Notes

- All content types use `en-us` as the default locale
- Singleton content types (hero_section, cta_section) should have only one entry
- Use `order` field to sort multi-entry content types
- Image fields will return URLs when fetched via Content Delivery API
- Dates are stored in ISO 8601 format

## 🔗 Resources

- [Contentstack Documentation](https://www.contentstack.com/docs)
- [Contentstack JavaScript SDK](https://github.com/contentstack/contentstack-javascript)
- [Contentstack CLI](https://www.contentstack.com/docs/developers/cli)
- [Contentstack Management API](https://www.contentstack.com/docs/apis/content-management-api/)

## 📞 Support

For issues or questions:
1. Check Contentstack documentation
2. Review the integration examples
3. Contact Contentstack support

