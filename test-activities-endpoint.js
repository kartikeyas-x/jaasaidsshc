
const fetch = require('node-fetch');

async function testActivitiesEndpoint() {
  const API_BASE_URL = process.env.VERCEL_URL || 'https://jaasaidsshc-git-master-kartikeyas-xs-projects.vercel.app';
  console.log(`🔍 Testing API at ${API_BASE_URL}`);

  // Test data
  const testActivity = {
    name: "Test Activity",
    category: "Test Category",
    description: "This is a test activity created by the API test script",
    activity_type: "Indoor",
    location_type: "Physical",
    min_members: 1,
    max_members: 10,
    address_line_1: "123 Test St",
    city: "Test City",
    state: "Test State",
    zip_code: "12345",
    contact_name: "Test Contact",
    contact_number: "123-456-7890"
  };

  // Test creating an activity
  console.log(`\n🔍 Testing POST ${API_BASE_URL}/api/activities`);
  try {
    const createResponse = await fetch(`${API_BASE_URL}/api/activities`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testActivity)
    });
    
    console.log(`📊 Status: ${createResponse.status} ${createResponse.statusText}`);
    try {
      const createData = await createResponse.json();
      console.log(`📄 Response:`, JSON.stringify(createData, null, 2));
    } catch (parseError) {
      const text = await createResponse.text();
      console.log(`📄 Response (Text):`, text);
    }
  } catch (createError) {
    console.error(`❌ Create activity request failed:`, createError.message);
  }
}

testActivitiesEndpoint().catch(console.error);
