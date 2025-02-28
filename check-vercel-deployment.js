
import axios from 'axios';

// Get site from command-line args or use the default
const VERCEL_SITE = process.argv[2] || 'https://jaasaidsshc-git-master-kartikeyas-xs-projects.vercel.app';

const endpoints = [
  '/api/ping',
  '/api/healthcheck',
  '/api/debug-db'
];

async function checkEndpoint(endpoint) {
  console.log(`\n🔍 Testing: ${VERCEL_SITE}${endpoint}`);
  try {
    const start = Date.now();
    console.log(`Checking: ${VERCEL_SITE}${endpoint}`);
    const response = await axios.get(`${VERCEL_SITE}${endpoint}`, {
      timeout: 15000,
      headers: {
        'Accept': 'application/json',
        'Cache-Control': 'no-cache',
        'User-Agent': 'VercelDeploymentChecker/1.0'
      }
    });
    const duration = Date.now() - start;
    
    console.log(`✅ Status: ${response.status} ${response.statusText} (${duration}ms)`);
    console.log(`Content-Type: ${response.headers['content-type']}`);
    console.log(`📋 Response: ${JSON.stringify(response.data, null, 2)}`);
    return true;
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    
    if (error.response) {
      console.log(`Status: ${error.response.status} ${error.response.statusText}`);
      console.log(`Response: ${JSON.stringify(error.response.data, null, 2)}`);
    } else if (error.request) {
      console.log('No response received');
    }
    return false;
  }
}

async function main() {
  console.log(`🚀 Verifying Vercel deployment at: ${VERCEL_SITE}`);
  
  let allSuccess = true;
  for (const endpoint of endpoints) {
    const success = await checkEndpoint(endpoint);
    allSuccess = allSuccess && success;
    
    // Add a delay between requests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  if (allSuccess) {
    console.log('\n✅ All endpoints tested successfully!');
  } else {
    console.log('\n❌ Some endpoints failed. Please check the errors above.');
    console.log('\nPossible solutions:');
    console.log('1. Check if you need to add environment variables in Vercel dashboard');
    console.log('2. Wait a few minutes for deployment to fully propagate');
    console.log('3. Try redeploying the project');
  }
}

main().catch(error => {
  console.error('Fatal error:', error.message);
  process.exit(1);
});
