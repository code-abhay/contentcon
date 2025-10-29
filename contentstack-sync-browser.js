/**
 * Contentstack Live Sync - Browser Version
 * Automatically syncs content from Contentstack to your localhost
 * No npm installation required - uses Contentstack REST API
 */

// Configuration - These will be used by Contentstack Launch
// Contentstack Launch automatically injects these at build time if using environment variables
const CONTENTSTACK_CONFIG = {
  api_key: 'blt89c08d1b12ee2e55',
  delivery_token: 'csc2289f1a773e5c0e89bfe2f1',
  environment: 'production',
  region: 'us'
};

// For Contentstack Launch, these can also be set via environment variables:
// api_key: process.env.CONTENTSTACK_API_KEY || 'blt89c08d1b12ee2e55',
// delivery_token: process.env.CONTENTSTACK_DELIVERY_TOKEN || 'csc2289f1a773e5c0e89bfe2f1',
// environment: process.env.CONTENTSTACK_ENVIRONMENT || 'production',

const API_BASE = 'https://cdn.contentstack.io/v3';

// Cache for storing content (expose to window for debugging)
window.contentCache = new Map();
let contentCache = window.contentCache;
let lastUpdateTimes = new Map();

// Auto-refresh settings
const AUTO_REFRESH_ENABLED = true;
const REFRESH_INTERVAL = 5000; // 5 seconds (faster sync for better responsiveness)

/**
 * Make API request to Contentstack
 */
async function fetchFromContentstack(contentType, query = {}, skipCache = false) {
  const cacheKey = `${contentType}_${JSON.stringify(query)}`;
  const cached = contentCache.get(cacheKey);
  const now = Date.now();
  
  // Skip cache if explicitly requested or for update checks
  if (!skipCache && cached && (now - cached.timestamp) < 5000) {
    return cached.data;
  }
  
  try {
    // Contentstack Delivery API format
    // Format: /v3/content_types/{content_type_uid}/entries?access_token={token}&environment={env}
    let url = `${API_BASE}/content_types/${contentType}/entries?access_token=${CONTENTSTACK_CONFIG.delivery_token}&environment=${CONTENTSTACK_CONFIG.environment}`;
    
    // Add query parameters
    if (query.limit) url += `&limit=${query.limit}`;
    if (query.skip) url += `&skip=${query.skip}`;
    
    // Handle ordering properly (Contentstack uses specific query format)
    if (query.orderBy && query.sort) {
      url += `&${query.orderBy}[${query.sort}]`;
    }
    
    console.log(`📡 Fetching ${contentType} from Contentstack...`);
    
    // Make request (Contentstack API key and token are in URL)
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error Response:`, errorText);
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const result = await response.json();
    
    if (result && result.entries) {
      const data = result.entries;
      // Update cache only if not skipping
      if (!skipCache) {
        contentCache.set(cacheKey, { data, timestamp: now });
      }
      console.log(`✅ Successfully fetched ${contentType}:`, data.length || 1, 'entry/entries');
      return data;
    }
    
    console.warn(`⚠️ No entries found for ${contentType}`);
    return null;
  } catch (error) {
    console.error(`❌ Error fetching ${contentType}:`, error);
    // Return cached data as fallback
    return cached ? cached.data : null;
  }
}

/**
 * Fetch Navigation Menu
 */
window.getNavigationMenu = async function(skipCache = false) {
  return await fetchFromContentstack('navigation_menu', { orderBy: 'order', sort: 'asc' }, skipCache);
};

/**
 * Fetch Hero Section
 */
window.getHeroSection = async function(skipCache = false) {
  const result = await fetchFromContentstack('hero_section', { limit: 1 }, skipCache);
  return result && result[0] ? result[0] : null;
};

/**
 * Fetch Feature Cards
 */
window.getFeatureCards = async function(skipCache = false) {
  return await fetchFromContentstack('feature_card', { orderBy: 'order', sort: 'asc' }, skipCache);
};

/**
 * Fetch Blog Posts
 */
window.getBlogPosts = async function(limit = 3, skipCache = false) {
  return await fetchFromContentstack('blog_post', { limit, orderBy: 'publish_date', sort: 'desc' }, skipCache);
};

/**
 * Fetch Company Logos
 */
window.getCompanyLogos = async function(skipCache = false) {
  return await fetchFromContentstack('company_logo', { orderBy: 'order', sort: 'asc' }, skipCache);
};

/**
 * Fetch CTA Section
 */
window.getCTASection = async function(skipCache = false) {
  const result = await fetchFromContentstack('cta_section', { limit: 1 }, skipCache);
  return result && result[0] ? result[0] : null;
};

/**
 * Fetch Footer Sections
 */
window.getFooterSections = async function(skipCache = false) {
  return await fetchFromContentstack('footer_section', { orderBy: 'order', sort: 'asc' }, skipCache);
};

/**
 * Check for content updates
 */
window.checkForUpdates = async function() {
  try {
    console.log('🔍 Checking for content updates...');
    
    // Fetch fresh data without cache
    const hero = await window.getHeroSection(true);
    
    if (!hero) {
      console.warn('⚠️ Could not fetch hero section for update check');
      return false;
    }
    
    // Use publish_details.time as most reliable indicator of published changes
    // Also check _version and updated_at as fallbacks
    const publishTime = hero.publish_details?.time || hero.updated_at || hero._version;
    const contentHash = JSON.stringify({
      title: hero.title,
      subtitle: hero.subtitle,
      gradient_title: hero.gradient_title,
      time: publishTime
    });
    
    const lastHash = lastUpdateTimes.get('hero_section');
    
    console.log('📊 Hero update check:', { 
      title: hero.title,
      publishTime: publishTime,
      currentHash: contentHash.substring(0, 50) + '...'
    });
    
    if (lastHash && lastHash !== contentHash) {
      console.log('🔄 ✅ Content updated in Contentstack! Changes detected!');
      console.log('🔄 Previous:', lastHash.substring(0, 50) + '...');
      console.log('🔄 Current:', contentHash.substring(0, 50) + '...');
      console.log('🔄 Clearing cache and refreshing page...');
      
      // Clear all cache
      contentCache.clear();
      lastUpdateTimes.clear();
      
      // Update hash
      lastUpdateTimes.set('hero_section', contentHash);
      
      // Small delay then reload to show new content
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      
      return true;
    } else if (!lastHash) {
      // First time - store current hash
      lastUpdateTimes.set('hero_section', contentHash);
      console.log('💾 Stored initial content hash');
    } else {
      console.log('✅ No changes detected - content is up to date');
    }
  } catch (error) {
    console.error('❌ Error checking for updates:', error);
    console.error('Stack trace:', error.stack);
  }
  
  return false;
};

/**
 * Start auto-refresh
 */
window.startAutoRefresh = function() {
  if (!AUTO_REFRESH_ENABLED) return;
  
  console.log('🔄 Auto-refresh enabled. Checking for changes every', REFRESH_INTERVAL / 1000, 'seconds');
  console.log('📝 Make changes in Contentstack and publish - they will appear automatically!');
  console.log('💡 To manually check for updates, run: window.checkForUpdates()');
  
  // Initial check after a short delay
  setTimeout(() => {
    window.checkForUpdates();
  }, 2000);
  
  // Set up polling
  setInterval(() => {
    window.checkForUpdates();
  }, REFRESH_INTERVAL);
};

/**
 * Force refresh all content (bypass cache)
 */
window.forceRefresh = async function() {
  console.log('🔄 Force refreshing all content from Contentstack...');
  contentCache.clear();
  lastUpdateTimes.clear();
  if (window.renderAllContent) {
    await window.renderAllContent(true);
  } else {
    window.location.reload();
  }
  console.log('✅ Content refreshed!');
};

// Start auto-refresh when script loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.startAutoRefresh();
  });
} else {
  window.startAutoRefresh();
}

