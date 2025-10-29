/**
 * Contentstack Render Functions
 * Renders Contentstack content into the HTML page
 */

import {
  getNavigationMenu,
  getHeroSection,
  getFeatureCards,
  getBlogPosts,
  getCompanyLogos,
  getCTASection,
  getFooterSections
} from './contentstack-sync.js';

/**
 * Render Navigation Menu
 */
export async function renderNavigationMenu() {
  try {
    const navItems = await getNavigationMenu();
    const navMenu = document.querySelector('.nav-menu');
    
    if (navMenu && navItems && navItems.length > 0) {
      const navHTML = navItems.map(item => `
        <li><a href="${item.link_url || '#'}">${item.menu_label || ''}</a></li>
      `).join('');
      navMenu.innerHTML = navHTML;
    }
  } catch (error) {
    console.error('Error rendering navigation menu:', error);
  }
}

/**
 * Render Hero Section
 */
export async function renderHeroSection() {
  try {
    const hero = await getHeroSection();
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent && hero) {
      const heroHTML = `
        <h1 class="hero-title fade-in-up">
          ${hero.title || ''}<br>
          ${hero.gradient_title ? `<span class="gradient-text">${hero.gradient_title}</span>` : ''}
        </h1>
        <p class="hero-subtitle fade-in-up delay-1">${hero.subtitle || ''}</p>
        <div class="hero-actions fade-in-up delay-2">
          ${hero.primary_cta && hero.primary_cta.button_text ? `
            <button class="btn-primary btn-large" onclick="location.href='${hero.primary_cta.button_link || '#'}'">
              ${hero.primary_cta.button_text}
            </button>
          ` : ''}
          ${hero.secondary_cta && hero.secondary_cta.button_text ? `
            <button class="btn-secondary btn-large" onclick="location.href='${hero.secondary_cta.button_link || '#'}'">
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
  } catch (error) {
    console.error('Error rendering hero section:', error);
  }
}

/**
 * Render Company Logos
 */
export async function renderCompanyLogos() {
  try {
    const companies = await getCompanyLogos();
    const logosContainer = document.getElementById('company-logos');
    
    if (logosContainer && companies && companies.length > 0) {
      const logosHTML = companies.map(company => {
        if (company.logo && company.logo.url) {
          return `<img src="${company.logo.url}" alt="${company.company_name || ''}" class="company-logo" />`;
        } else {
          return `<span class="company-name">${company.company_name || ''}</span>`;
        }
      }).join('');
      logosContainer.innerHTML = logosHTML;
    }
  } catch (error) {
    console.error('Error rendering company logos:', error);
  }
}

/**
 * Render Feature Cards
 */
export async function renderFeatureCards() {
  try {
    const features = await getFeatureCards();
    const featuresGrid = document.querySelector('.features-grid');
    
    if (featuresGrid && features && features.length > 0) {
      const iconMap = {
        'cms': '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>',
        'personalization': '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>',
        'analytics': '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="12" x2="2" y2="12"></line><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path></svg>',
        'hosting': '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>'
      };
      
      const featuresHTML = features.map((feature, index) => {
        const iconHTML = iconMap[feature.icon_name] || iconMap['cms'];
        return `
          <div class="feature-card fade-in-up ${index > 0 ? `delay-${index}` : ''}">
            <div class="feature-icon">
              ${iconHTML}
            </div>
            <h3>${feature.title || ''}</h3>
            <p>${feature.description || ''}</p>
            ${feature.link_url ? `
              <a href="${feature.link_url}" class="feature-link">
                ${feature.link_text || 'Learn more'} →
              </a>
            ` : ''}
          </div>
        `;
      }).join('');
      featuresGrid.innerHTML = featuresHTML;
    }
  } catch (error) {
    console.error('Error rendering feature cards:', error);
  }
}

/**
 * Render Blog Posts
 */
export async function renderBlogPosts() {
  try {
    const posts = await getBlogPosts(3);
    const blogGrid = document.querySelector('.blog-grid');
    
    if (blogGrid && posts && posts.length > 0) {
      const postsHTML = posts.map((post, index) => {
        const imageHTML = post.featured_image && post.featured_image.url 
          ? `<img src="${post.featured_image.url}" alt="${post.title || ''}" />`
          : `<div class="image-placeholder"></div>`;
        
        return `
          <article class="blog-card fade-in-up ${index > 0 ? `delay-${index}` : ''}">
            <div class="blog-image">
              ${imageHTML}
              ${post.category ? `<span class="blog-category">${post.category}</span>` : ''}
            </div>
            <div class="blog-content">
              <h3>${post.title || ''}</h3>
              <p>${post.description || ''}</p>
              <a href="/blog/${post.slug || '#'}" class="blog-link">Read more →</a>
            </div>
          </article>
        `;
      }).join('');
      blogGrid.innerHTML = postsHTML;
    }
  } catch (error) {
    console.error('Error rendering blog posts:', error);
  }
}

/**
 * Render CTA Section
 */
export async function renderCTASection() {
  try {
    const cta = await getCTASection();
    const ctaContent = document.querySelector('.cta-content');
    
    if (ctaContent && cta) {
      const ctaHTML = `
        <h2>${cta.title || ''}</h2>
        <p>${cta.description || ''}</p>
        <button class="btn-primary btn-large" onclick="location.href='${cta.button_link || '#'}'">
          ${cta.button_text || ''}
        </button>
      `;
      ctaContent.innerHTML = ctaHTML;
    }
  } catch (error) {
    console.error('Error rendering CTA section:', error);
  }
}

/**
 * Render Footer Sections
 */
export async function renderFooter() {
  try {
    const footerSections = await getFooterSections();
    const footerContent = document.querySelector('.footer-content');
    
    if (footerContent && footerSections && footerSections.length > 0) {
      const footerHTML = footerSections.map(section => {
        const linksHTML = section.links && section.links.length > 0
          ? section.links.map(link => `
              <li><a href="${link.link_url || '#'}">${link.link_text || ''}</a></li>
            `).join('')
          : '';
        
        return `
          <div class="footer-section">
            <h4>${section.section_title || ''}</h4>
            <ul>${linksHTML}</ul>
          </div>
        `;
      }).join('');
      footerContent.innerHTML = footerHTML;
    }
  } catch (error) {
    console.error('Error rendering footer:', error);
  }
}

/**
 * Render all content
 */
export async function renderAllContent() {
  console.log('🔄 Rendering content from Contentstack...');
  
  try {
    await Promise.all([
      renderNavigationMenu(),
      renderHeroSection(),
      renderFeatureCards(),
      renderBlogPosts(),
      renderCTASection(),
      renderFooter()
    ]);
    
    console.log('✅ Content rendered successfully!');
  } catch (error) {
    console.error('❌ Error rendering content:', error);
  }
}

// Auto-render when DOM is ready
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderAllContent);
  } else {
    renderAllContent();
  }
}

export default {
  renderNavigationMenu,
  renderHeroSection,
  renderCompanyLogos,
  renderFeatureCards,
  renderBlogPosts,
  renderCTASection,
  renderFooter,
  renderAllContent
};

