/**
 * Contentstack Configuration
 * Replace these with your actual credentials
 */

export const CONTENTSTACK_CONFIG = {
  api_key: 'blt89c08d1b12ee2e55',
  delivery_token: 'csc2289f1a773e5c0e89bfe2f1',
  environment: 'production',
  region: 'us' // 'us' for NA region
};

// Enable auto-refresh on content changes
export const AUTO_REFRESH = {
  enabled: true,
  interval: 30000, // Check for changes every 30 seconds
  useWebhooks: false // Set to true if you configure webhooks
};

