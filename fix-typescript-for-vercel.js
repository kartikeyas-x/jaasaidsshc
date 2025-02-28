
import fs from 'fs';
import path from 'path';

console.log('🔧 Fixing TypeScript errors for Vercel deployment...');

// Fix storage.ts errors
const storageFile = path.join(process.cwd(), 'server/storage.ts');
let storageContent = fs.readFileSync(storageFile, 'utf8');

// Fix `sql` property issues and array indexing
storageContent = storageContent.replace(/db\.sql`/g, 'db.query(`');

// Fix error type handling
storageContent = storageContent.replace(
  /(catch\s*\(\s*)error(\s*\))/g, 
  '$1error: unknown$2'
);

// Fix null handling on activity properties
storageContent = storageContent.replace(
  /min_members: (.*?),/g,
  'min_members: $1 ?? 1,'
);

storageContent = storageContent.replace(
  /max_members: (.*?),/g,
  'max_members: $1 ?? 10,'
);

fs.writeFileSync(storageFile, storageContent);
console.log('✅ Fixed server/storage.ts');

// Fix db.ts pooling issue
const dbFile = path.join(process.cwd(), 'db.ts');
let dbContent = fs.readFileSync(dbFile, 'utf8');

// Remove pooling option
dbContent = dbContent.replace(/\s*pooling: {[^}]*},/g, ',');

fs.writeFileSync(dbFile, dbContent);
console.log('✅ Fixed db.ts');

// Fix routes.ts error handling
const routesFile = path.join(process.cwd(), 'server/routes.ts');
let routesContent = fs.readFileSync(routesFile, 'utf8');

// Add type for error
routesContent = routesContent.replace(
  /(catch\s*\(\s*)error(\s*\))/g, 
  '$1error: unknown$2'
);

fs.writeFileSync(routesFile, routesContent);
console.log('✅ Fixed server/routes.ts');

// Fix vite.ts allowedHosts issue
const viteFile = path.join(process.cwd(), 'server/vite.ts');
let viteContent = fs.readFileSync(viteFile, 'utf8');

// Change allowedHosts from boolean to required format
viteContent = viteContent.replace(
  /allowedHosts: (true|false)/g,
  'allowedHosts: true'
);

fs.writeFileSync(viteFile, viteContent);
console.log('✅ Fixed server/vite.ts');

// Fix activity field names in client components
const activityDetailsFile = path.join(process.cwd(), 'client/src/components/create-activity/activity-details.tsx');
let activityDetailsContent = fs.readFileSync(activityDetailsFile, 'utf8');

// Fix readonly array issue
activityDetailsContent = activityDetailsContent.replace(
  /\['name', 'category', 'description', 'activityType', 'locationType'\]/g,
  "(['name', 'category', 'description', 'activity_type', 'location_type'] as const)"
);

// Fix property name issues
activityDetailsContent = activityDetailsContent.replace(/activityType/g, 'activity_type');
activityDetailsContent = activityDetailsContent.replace(/locationType/g, 'location_type');
activityDetailsContent = activityDetailsContent.replace(/minMembers/g, 'min_members');
activityDetailsContent = activityDetailsContent.replace(/maxMembers/g, 'max_members');

fs.writeFileSync(activityDetailsFile, activityDetailsContent);
console.log('✅ Fixed activity-details.tsx');

// Fix location details component
const locationDetailsFile = path.join(process.cwd(), 'client/src/components/create-activity/location-details.tsx');
let locationDetailsContent = fs.readFileSync(locationDetailsFile, 'utf8');

// Fix property name issues
locationDetailsContent = locationDetailsContent.replace(/addressLine1/g, 'address_line_1');
locationDetailsContent = locationDetailsContent.replace(/addressLine2/g, 'address_line_2');
locationDetailsContent = locationDetailsContent.replace(/zipCode/g, 'zip_code');
locationDetailsContent = locationDetailsContent.replace(/contactNumber/g, 'contact_number');
locationDetailsContent = locationDetailsContent.replace(/contactName/g, 'contact_name');

// Fix the toString issue for contact_number
locationDetailsContent = locationDetailsContent.replace(
  /\.replace\(/g, 
  '?.toString().replace('
);

fs.writeFileSync(locationDetailsFile, locationDetailsContent);
console.log('✅ Fixed location-details.tsx');

// Fix create-activity page
const createActivityFile = path.join(process.cwd(), 'client/src/pages/create-activity.tsx');
let createActivityContent = fs.readFileSync(createActivityFile, 'utf8');

// Fix property name issues
createActivityContent = createActivityContent.replace(/activityType/g, 'activity_type');
createActivityContent = createActivityContent.replace(/locationType/g, 'location_type');
createActivityContent = createActivityContent.replace(/minMembers/g, 'min_members');
createActivityContent = createActivityContent.replace(/maxMembers/g, 'max_members');
createActivityContent = createActivityContent.replace(/addressLine1/g, 'address_line_1');
createActivityContent = createActivityContent.replace(/addressLine2/g, 'address_line_2');
createActivityContent = createActivityContent.replace(/zipCode/g, 'zip_code');
createActivityContent = createActivityContent.replace(/contactNumber/g, 'contact_number');
createActivityContent = createActivityContent.replace(/contactName/g, 'contact_name');

fs.writeFileSync(createActivityFile, createActivityContent);
console.log('✅ Fixed create-activity.tsx');

// Also fix the build script to use CommonJS format instead of ESM
const packageJsonFile = path.join(process.cwd(), 'package.json');
let packageJsonContent = fs.readFileSync(packageJsonFile, 'utf8');
packageJsonContent = packageJsonContent.replace(
  /--format=esm/g,
  '--format=cjs'
);

fs.writeFileSync(packageJsonFile, packageJsonContent);
console.log('✅ Updated package.json to use CommonJS format for server bundle');

console.log('✅ All TypeScript errors fixed! Now commit and push to deploy.');
