
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('🔧 Setting up Vercel deployment configuration...');

// Create the vercel directory if it doesn't exist
const vercelApiDir = path.join(__dirname, 'vercel', 'api');
if (!fs.existsSync(vercelApiDir)) {
  fs.mkdirSync(vercelApiDir, { recursive: true });
}

// Create a simple API endpoint to test the deployment
const pingEndpoint = `
export const config = {
  runtime: 'edge'
};

export default async function handler(req) {
  return new Response(JSON.stringify({ 
    success: true, 
    message: 'API is working correctly',
    timestamp: new Date().toISOString() 
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
`;

fs.writeFileSync(path.join(vercelApiDir, 'ping.js'), pingEndpoint);
console.log('✅ Created Vercel Edge API endpoint for testing');

// Update package.json build script to properly handle server and client
const packageJsonPath = path.join(__dirname, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

packageJson.scripts.build = 'vite build && esbuild server/index.ts --platform=node --packages=external --bundle --format=cjs --outdir=dist';

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
console.log('✅ Updated build script in package.json');

console.log('🚀 Vercel deployment fixes complete!');
console.log('');
console.log('To deploy to Vercel, run:');
console.log('1. git add .');
console.log('2. git commit -m "Fix Vercel deployment"');
console.log('3. git push');
console.log('');
console.log('After deploying, test the API endpoint with:');
console.log('node check-vercel-endpoint.js /api/ping');
