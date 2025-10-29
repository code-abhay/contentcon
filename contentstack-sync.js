/**
 * Contentstack Live Sync
 * Automatically syncs content from Contentstack to your localhost
 * Updates the page when content is published in Contentstack
 */

import Contentstack from 'contentstack';
import { CONTENTSTACK_CONFIG, AUTO_REFRESH } from './contentstack-config.js';

// Initialize Contentstack Stack
const Stack = Contentstack.Stack({
  api_key: CONTENTSTACK_CONFIG.api_key,
  delivery_token: CONTENTSTACK_CONFIG.delivery_token,
  environment: CONTENTSTACK_CONFIG.environment,
  region: CONTENTSTACK_CONFIG.region || 'us'
});

// Store last sync time
let lastSyncTime = Date.now();
let cache = new Map();

/**
 * Fetch and cache content with timestamp
 */
async function fetchContentWithCache(contentType, queryBuilder, cacheKey) {
  const cacheEntry = cache.get(cacheKey);
  const now = Date.now();
  
  // Return cached content if less than 5 seconds old
  if (cacheEntry && (now - cacheEntry.timestamp) < 5000) {
    return cacheEntry.data;
  }
  
  try {
    const result = await queryBuilder.toJSON().find();
    const data = result && result[0] && result[0][0] ? result[0][0] : null;
    
    // Cache the result
    cache.set(cacheKey, { data, timestamp: now });
    
    return data;
  } catch (error) {
    console.error(`Error fetching ${contentType}:`, error);
    return null;
  }
}

/**
 * Check if content has changed
 */
async function checkForChanges() {
  try {
    // Get current timestamp from stack
    const Query = Stack.ContentType('hero_section').Query();
    const result = await Query.toJSON().find();
    
    if (result && result[0] && result[0][0]) {
      const currentUpdate = result[0][0].updated_at;
      
      if (currentUpdate && currentUpdate !== lastSyncTime) {
        console.log('🔄 Content changes detected! Refreshing page...');
        lastSyncTime = currentUpdate;
        
        // Clear cache
        cache.clear();
        
        // Trigger page refresh
        window.location.reload();
        return true;
      }
    }
  } catch (error) {
    console.error('Error checking for changes:', error);
  }
  
  return false;
}

/**
 * Fetch Navigation Menu
 */
export async function getNavigationMenu() {
  const cacheKey = 'navigation_menu';
  const Query = Stack.ContentType('navigation_menu').Query();
  return await fetchContentWithCache('navigation_menu', Query.where('order', 'asc'), cacheKey);
}

/**
 * Fetch Hero Section
 */
export async function getHeroSection() {
  const cacheKey = 'hero_section';
  const Query = Stack.ContentType('hero_section').Query();
  return await fetchContentWithCache('hero_section', Query, cacheKey);
}

/**
 * Fetch Feature Cards
 */
export async function getFeatureCards() {
  const cacheKey = 'feature_cards';
  const Query = Stack.ContentType('feature_card').Query();
  return await fetchContentWithCache('feature_card', Query.where('order', 'asc'), cacheKey);
}

/**
 * Fetch Blog Posts
 */
export async function getBlogPosts(limit = 3) {
  const cacheKey = `blog_posts_${limit}`;
  const Query = Stack.ContentType('blog_post').Query();
  return await fetchContentWithCache('blog_post', Query.limit(limit), cacheKey);
}

/**
 * Fetch Company Logos
 */
export async function getCompanyLogos() {
  const cacheKey = 'company_logos';
  const Query = Stack.ContentType('company_logo').Query();
  return await fetchContentWithCache('company_logo', Query.where('order', 'asc'), cacheKey);
}

/**
 * Fetch CTA Section
 */
export async function getCTASection() {
  const cacheKey = 'cta_section';
  const Query = Stack.ContentType('cta_section').Query();
  return await fetchContentWithCache('cta_section', Query, cacheKey);
}

/**
 * Fetch Footer Sections
 */
export async function getFooterSections() {
  const cacheKey = 'footer_sections';
  const Query = Stack.ContentType('footer_section').Query();
  return await fetchContentWithCache('footer_section', Query.where('order', 'asc'), cacheKey);
}

/**
 * Start auto-refresh polling
 */
export function startAutoRefresh() {
  if (!AUTO_REFRESH.enabled) return;
  
  console.log('🔄 Auto-refresh enabled. Checking for changes every', AUTO_REFRESH.interval / 1000, 'seconds');
  
  // Initial check
  checkForChanges();
  
  // Set up polling interval
  setInterval(async () => {
    await checkForChanges();
  }, AUTO_REFRESH.interval);
}

/**
 * Manual refresh function
 */
export async function manualRefresh() {
  console.log('🔄 Manual refresh triggered...');
  cache.clear();
  await checkForChanges();
}

// Auto-start if enabled
if (AUTO_REFRESH.enabled && typeof window !== 'undefined') {
  // Start auto-refresh when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startAutoRefresh);
  } else {
    startAutoRefresh();
  }
}

// Export all functions for use
export default {
  getNavigationMenu,
  getHeroSection,
  getFeatureCards,
  getBlogPosts,
  getCompanyLogos,
  getCTASection,
  getFooterSections,
  startAutoRefresh,
  manualRefresh,
  checkForChanges
};

