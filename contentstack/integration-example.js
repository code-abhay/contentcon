/**
 * Contentstack Integration Example
 * 
 * This file demonstrates how to integrate Contentstack with the ContentCon Blog website.
 * Replace the placeholder values with your actual Contentstack credentials.
 */

import Contentstack from 'contentstack';

// Initialize Contentstack Stack
const Stack = Contentstack.Stack({
  api_key: process.env.CONTENTSTACK_API_KEY || 'YOUR_API_KEY',
  delivery_token: process.env.CONTENTSTACK_DELIVERY_TOKEN || 'YOUR_DELIVERY_TOKEN',
  environment: process.env.CONTENTSTACK_ENVIRONMENT || 'production'
});

// ============================================
// FETCH FUNCTIONS
// ============================================

/**
 * Fetch Navigation Menu Items
 */
async function getNavigationMenu() {
  try {
    const Query = Stack.ContentType('navigation_menu').Query();
    const result = await Query.where('order', 'asc').toJSON().find();
    
    if (result && result[0] && result[0][0]) {
      return result[0][0];
    }
    return [];
  } catch (error) {
    console.error('Error fetching navigation menu:', error);
    return [];
  }
}

/**
 * Fetch Hero Section
 */
async function getHeroSection() {
  try {
    const Query = Stack.ContentType('hero_section').Query();
    const result = await Query.toJSON().find();
    
    if (result && result[0] && result[0][0]) {
      return result[0][0];
    }
    return null;
  } catch (error) {
    console.error('Error fetching hero section:', error);
    return null;
  }
}

/**
 * Fetch Feature Cards
 */
async function getFeatureCards() {
  try {
    const Query = Stack.ContentType('feature_card').Query();
    const result = await Query.where('order', 'asc').toJSON().find();
    
    if (result && result[0] && result[0][0]) {
      return result[0][0];
    }
    return [];
  } catch (error) {
    console.error('Error fetching feature cards:', error);
    return [];
  }
}

/**
 * Fetch Blog Posts
 */
async function getBlogPosts(limit = 10) {
  try {
    const Query = Stack.ContentType('blog_post').Query();
    const result = await Query
      .where('publish_date', 'desc')
      .limit(limit)
      .toJSON()
      .find();
    
    if (result && result[0] && result[0][0]) {
      return result[0][0];
    }
    return [];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

/**
 * Fetch Single Blog Post by Slug
 */
async function getBlogPostBySlug(slug) {
  try {
    const Query = Stack.ContentType('blog_post').Query();
    const result = await Query.where('slug', slug).toJSON().find();
    
    if (result && result[0] && result[0][0]) {
      return result[0][0];
    }
    return null;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

/**
 * Fetch Company Logos
 */
async function getCompanyLogos() {
  try {
    const Query = Stack.ContentType('company_logo').Query();
    const result = await Query.where('order', 'asc').toJSON().find();
    
    if (result && result[0] && result[0][0]) {
      return result[0][0];
    }
    return [];
  } catch (error) {
    console.error('Error fetching company logos:', error);
    return [];
  }
}

/**
 * Fetch CTA Section
 */
async function getCTASection() {
  try {
    const Query = Stack.ContentType('cta_section').Query();
    const result = await Query.toJSON().find();
    
    if (result && result[0] && result[0][0]) {
      return result[0][0];
    }
    return null;
  } catch (error) {
    console.error('Error fetching CTA section:', error);
    return null;
  }
}

/**
 * Fetch Section Header by Type
 */
async function getSectionHeader(sectionType) {
  try {
    const Query = Stack.ContentType('section_header').Query();
    const result = await Query.where('section_type', sectionType).toJSON().find();
    
    if (result && result[0] && result[0][0]) {
      return result[0][0];
    }
    return null;
  } catch (error) {
    console.error('Error fetching section header:', error);
    return null;
  }
}

/**
 * Fetch Footer Sections
 */
async function getFooterSections() {
  try {
    const Query = Stack.ContentType('footer_section').Query();
    const result = await Query.where('order', 'asc').toJSON().find();
    
    if (result && result[0] && result[0][0]) {
      return result[0][0];
    }
    return [];
  } catch (error) {
    console.error('Error fetching footer sections:', error);
    return [];
  }
}

// ============================================
// RENDER FUNCTIONS
// ============================================

/**
 * Render Navigation Menu
 */
async function renderNavigationMenu() {
  const navItems = await getNavigationMenu();
  const navMenu = document.querySelector('.nav-menu');
  
  if (navMenu && navItems.length > 0) {
    const navHTML = navItems.map(item => `
      <li><a href="${item.link_url}">${item.menu_label}</a></li>
    `).join('');
    navMenu.innerHTML = navHTML;
  }
}

/**
 * Render Hero Section
 */
async function renderHeroSection() {
  const hero = await getHeroSection();
  const heroContent = document.querySelector('.hero-content');
  
  if (heroContent && hero) {
    const heroHTML = `
      <h1 class="hero-title fade-in-up">
        ${hero.title}<br>
        ${hero.gradient_title ? `<span class="gradient-text">${hero.gradient_title}</span>` : ''}
      </h1>
      <p class="hero-subtitle fade-in-up delay-1">${hero.subtitle}</p>
      <div class="hero-actions fade-in-up delay-2">
        ${hero.primary_cta ? `
          <button class="btn-primary btn-large" onclick="location.href='${hero.primary_cta.button_link}'">
            ${hero.primary_cta.button_text}
          </button>
        ` : ''}
        ${hero.secondary_cta ? `
          <button class="btn-secondary btn-large" onclick="location.href='${hero.secondary_cta.button_link}'">
            ${hero.secondary_cta.button_text}
          </button>
        ` : ''}
      </div>
      ${hero.badge_label ? `
        <div class="trusted-badge fade-in-up delay-3">
          <span class="badge-label">${hero.badge_label}</span>
          <div class="company-logos" id="company-logos"></div>
        </div>
      ` : ''}
    `;
    heroContent.innerHTML = heroHTML;
    
    // Render company logos if badge exists
    if (hero.badge_label) {
      await renderCompanyLogos();
    }
  }
}

/**
 * Render Company Logos
 */
async function renderCompanyLogos() {
  const companies = await getCompanyLogos();
  const logosContainer = document.getElementById('company-logos');
  
  if (logosContainer && companies.length > 0) {
    const logosHTML = companies.map(company => `
      <span class="company-name">
        ${company.logo ? `<img src="${company.logo.url}" alt="${company.company_name}" />` : company.company_name}
      </span>
    `).join('');
    logosContainer.innerHTML = logosHTML;
  }
}

/**
 * Render Feature Cards
 */
async function renderFeatureCards() {
  const features = await getFeatureCards();
  const featuresGrid = document.querySelector('.features-grid');
  
  if (featuresGrid && features.length > 0) {
    const featuresHTML = features.map((feature, index) => `
      <div class="feature-card fade-in-up ${index > 0 ? `delay-${index}` : ''}">
        <div class="feature-icon">
          <!-- Icon rendering based on icon_name -->
        </div>
        <h3>${feature.title}</h3>
        <p>${feature.description}</p>
        ${feature.link_url ? `
          <a href="${feature.link_url}" class="feature-link">
            ${feature.link_text || 'Learn more'} →
          </a>
        ` : ''}
      </div>
    `).join('');
    featuresGrid.innerHTML = featuresHTML;
  }
}

/**
 * Render Blog Posts
 */
async function renderBlogPosts() {
  const posts = await getBlogPosts(3);
  const blogGrid = document.querySelector('.blog-grid');
  
  if (blogGrid && posts.length > 0) {
    const postsHTML = posts.map((post, index) => `
      <article class="blog-card fade-in-up ${index > 0 ? `delay-${index}` : ''}">
        <div class="blog-image">
          ${post.featured_image && post.featured_image.url ? `
            <img src="${post.featured_image.url}" alt="${post.title}" />
          ` : `
            <div class="image-placeholder"></div>
          `}
          ${post.category ? `
            <span class="blog-category">${post.category}</span>
          ` : ''}
        </div>
        <div class="blog-content">
          <h3>${post.title}</h3>
          <p>${post.description}</p>
          <a href="/blog/${post.slug}" class="blog-link">Read more →</a>
        </div>
      </article>
    `).join('');
    blogGrid.innerHTML = postsHTML;
  }
}

/**
 * Render CTA Section
 */
async function renderCTASection() {
  const cta = await getCTASection();
  const ctaContent = document.querySelector('.cta-content');
  
  if (ctaContent && cta) {
    const ctaHTML = `
      <h2>${cta.title}</h2>
      <p>${cta.description}</p>
      <button class="btn-primary btn-large" onclick="location.href='${cta.button_link}'">
        ${cta.button_text}
      </button>
    `;
    ctaContent.innerHTML = ctaHTML;
  }
}

/**
 * Render Footer Sections
 */
async function renderFooter() {
  const footerSections = await getFooterSections();
  const footerContent = document.querySelector('.footer-content');
  
  if (footerContent && footerSections.length > 0) {
    const footerHTML = footerSections.map(section => `
      <div class="footer-section">
        <h4>${section.section_title}</h4>
        <ul>
          ${section.links && section.links.length > 0 ? section.links.map(link => `
            <li><a href="${link.link_url}">${link.link_text}</a></li>
          `).join('') : ''}
        </ul>
      </div>
    `).join('');
    footerContent.innerHTML = footerHTML;
  }
}

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initialize and render all content
 */
async function initContentstack() {
  try {
    // Render all sections
    await renderNavigationMenu();
    await renderHeroSection();
    await renderFeatureCards();
    await renderBlogPosts();
    await renderCTASection();
    await renderFooter();
    
    console.log('Contentstack content loaded successfully!');
  } catch (error) {
    console.error('Error initializing Contentstack:', error);
  }
}

// Initialize when DOM is ready
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContentstack);
  } else {
    initContentstack();
  }
}

// Export functions for use in other modules
export {
  getNavigationMenu,
  getHeroSection,
  getFeatureCards,
  getBlogPosts,
  getBlogPostBySlug,
  getCompanyLogos,
  getCTASection,
  getSectionHeader,
  getFooterSections,
  renderNavigationMenu,
  renderHeroSection,
  renderFeatureCards,
  renderBlogPosts,
  renderCTASection,
  renderFooter,
  initContentstack
};

