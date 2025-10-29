/**
 * Contentstack Import Script
 * Imports content models and entries to your Contentstack stack
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  stackApiKey: 'blt89c08d1b12ee2e55',
  managementToken: 'cse8685604d444842a58776998',
  region: 'na', // na, eu, azure-na
  baseURL: 'https://api.contentstack.io/v3'
};

// Helper function to make API requests
function makeRequest(options, data = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = '';
      
      res.on('data', (chunk) => {
        body += chunk;
      });
      
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(parsed);
          } else {
            reject({
              statusCode: res.statusCode,
              message: parsed.error_message || parsed.errors || body
            });
          }
        } catch (e) {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(body);
          } else {
            reject({
              statusCode: res.statusCode,
              message: body
            });
          }
        }
      });
    });
    
    req.on('error', reject);
    
    if (data) {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
}

// Create Content Type
async function createContentType(contentTypeData) {
  const options = {
    hostname: 'api.contentstack.io',
    path: `/v3/content_types`,
    method: 'POST',
    headers: {
      'api_key': CONFIG.stackApiKey,
      'authorization': CONFIG.managementToken,
      'Content-Type': 'application/json'
    }
  };
  
  try {
    // Contentstack API requires the payload to be wrapped in 'content_type'
    const payload = { content_type: contentTypeData };
    const response = await makeRequest(options, payload);
    console.log(`✓ Created content type: ${contentTypeData.uid}`);
    return response;
  } catch (error) {
    // Check if content type already exists
    const errorMsg = typeof error.message === 'string' ? error.message : JSON.stringify(error.message);
    if (errorMsg.includes('already exists') || errorMsg.includes('duplicate')) {
      console.log(`⚠ Content type already exists: ${contentTypeData.uid}`);
      return null;
    }
    console.error(`✗ Error creating content type ${contentTypeData.uid}:`, error.message || error);
    
    // Try to get more details
    if (error.message && typeof error.message === 'object') {
      console.error('  Details:', JSON.stringify(error.message, null, 2));
    }
    
    throw error;
  }
}

// Create Entry
async function createEntry(contentTypeUid, entryData) {
  const options = {
    hostname: 'api.contentstack.io',
    path: `/v3/content_types/${contentTypeUid}/entries`,
    method: 'POST',
    headers: {
      'api_key': CONFIG.stackApiKey,
      'authorization': CONFIG.managementToken,
      'Content-Type': 'application/json'
    }
  };
  
  try {
    const response = await makeRequest(options, { entry: entryData });
    console.log(`✓ Created entry: ${entryData.uid || entryData.title || 'unnamed'}`);
    return response;
  } catch (error) {
    if (error.message && error.message.includes('already exists')) {
      console.log(`⚠ Entry already exists: ${entryData.uid || entryData.title || 'unnamed'}`);
      return null;
    }
    console.error(`✗ Error creating entry:`, error.message || error);
    throw error;
  }
}

// Publish Entry
async function publishEntry(contentTypeUid, entryUid) {
  const options = {
    hostname: 'api.contentstack.io',
    path: `/v3/content_types/${contentTypeUid}/entries/${entryUid}/publish`,
    method: 'POST',
    headers: {
      'api_key': CONFIG.stackApiKey,
      'authorization': CONFIG.managementToken,
      'Content-Type': 'application/json'
    }
  };
  
  try {
    const response = await makeRequest(options, {
      entry: {
        environments: ['production'],
        locales: ['en-us']
      }
    });
    console.log(`✓ Published entry: ${entryUid}`);
    return response;
  } catch (error) {
    console.error(`✗ Error publishing entry ${entryUid}:`, error.message || error);
    // Don't throw, just log - entry might already be published
    return null;
  }
}

// Import Content Types
async function importContentTypes() {
  console.log('\n📦 Importing Content Types...\n');
  
  const contentModelsDir = path.join(__dirname, 'content-models');
  const files = fs.readdirSync(contentModelsDir).filter(f => f.endsWith('.json'));
  
  for (const file of files) {
    const filePath = path.join(contentModelsDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const contentType = JSON.parse(fileContent);
    
    // The JSON file now contains the content type directly, not wrapped
    // Ensure required fields exist
    if (!contentType.options) {
      contentType.options = {
        singleton: false,
        publishable: true,
        sub_title: []
      };
    }
    
    if (!contentType.abilities) {
      contentType.abilities = {
        get_one_object: true,
        get_all_objects: true,
        create_object: true,
        update_object: true,
        delete_object: true,
        delete_all_objects: true
      };
    }
    
    if (contentType.maintain_revisions === undefined) {
      contentType.maintain_revisions = true;
    }
    
    try {
      await createContentType(contentType);
      // Wait a bit to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`Failed to import ${file}:`, error.message || error);
      // Continue with next file
    }
  }
  
  console.log('\n✓ Content types import completed!\n');
}

// Import Entries
async function importEntries() {
  console.log('\n📄 Importing Entries...\n');
  
  const entriesDir = path.join(__dirname, 'entries');
  const files = fs.readdirSync(entriesDir).filter(f => f.endsWith('.json'));
  
  for (const file of files) {
    const filePath = path.join(entriesDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContent);
    
    // Handle both single entry and entries array
    let entries = [];
    if (data.entry) {
      entries = [data.entry];
    } else if (data.entries && Array.isArray(data.entries)) {
      entries = data.entries.map(item => item.entry || item);
    }
    
    for (const entryData of entries) {
      const contentTypeUid = entryData.content_type;
      
      if (!contentTypeUid) {
        console.error(`⚠ Skipping entry - missing content_type in ${file}`);
        console.error(`  Entry data:`, JSON.stringify(entryData, null, 2).substring(0, 200));
        continue;
      }
      
      // Build entry object - merge data into root level as Contentstack expects
      const entry = {
        ...entryData.data
      };
      
      // Add UID and title if they exist in entryData
      if (entryData.uid) {
        entry.uid = entryData.uid;
      }
      if (entryData.title) {
        entry.title = entryData.title;
      }
      
      try {
        const result = await createEntry(contentTypeUid, entry);
        
        if (result && entryData.uid) {
          // Try to publish the entry
          await new Promise(resolve => setTimeout(resolve, 500));
          await publishEntry(contentTypeUid, entryData.uid);
        }
        
        // Wait to avoid rate limits
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        console.error(`Failed to import entry from ${file}:`, error.message || error);
      }
    }
  }
  
  console.log('\n✓ Entries import completed!\n');
}

// Main function
async function main() {
  console.log('🚀 Starting Contentstack Import...\n');
  console.log(`Stack API Key: ${CONFIG.stackApiKey}`);
  console.log(`Region: ${CONFIG.region}\n`);
  
  try {
    await importContentTypes();
    console.log('\n⏳ Waiting 2 seconds before importing entries...\n');
    await new Promise(resolve => setTimeout(resolve, 2000));
    await importEntries();
    
    console.log('\n✅ Import completed successfully!\n');
    console.log('You can now view your content in Contentstack:\n');
    console.log(`https://app.contentstack.com/#/stack/${CONFIG.stackApiKey}/content-types\n`);
  } catch (error) {
    console.error('\n❌ Import failed:', error);
    process.exit(1);
  }
}

// Run the import
main();

