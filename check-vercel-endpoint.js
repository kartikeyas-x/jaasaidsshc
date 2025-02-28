
import axios from 'axios';

const BASE_URL = process.env.VERCEL_URL 
  ? `https://${process.env.VERCEL_URL}` 
  : 'https://mammothzy-git-main-kartikeyas-xs-projects.vercel.app';

const endpoints = [
  '/api/ping',
  '/api/healthcheck'
];

async function checkEndpoints() {
  console.log(`🔍 Testing Vercel API endpoints at ${BASE_URL}`);
  
  for (const endpoint of endpoints) {
    console.log(`\nChecking: ${endpoint}`);
    try {
      const response = await axios.get(`${BASE_URL}${endpoint}`, {
        timeout: 5000,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      console.log(`✅ Status: ${response.status} ${response.statusText}`);
      console.log(`🔍 Response:`, response.data);
    } catch (error) {
      console.error(`❌ Error: ${error.message}`);
      
      if (error.response) {
        console.log(`Status: ${error.response.status}`);
        console.log(`Response:`, error.response.data);
      }
    }
  }
}

checkEndpoints().catch(error => {
  console.error('Fatal error:', error.message);
});
