
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Mapping of property names to fix
const propertyMap = {
  'activityType': 'activity_type',
  'locationType': 'location_type',
  'minMembers': 'min_members',
  'maxMembers': 'max_members',
  'contactName': 'contact_name',
  'contactNumber': 'contact_number',
  'zipCode': 'zip_code',
  'addressLine1': 'address_line_1',
  'addressLine2': 'address_line_2',
};

// Regular expressions to match property names in different contexts
const patterns = [
  // Match form field names (e.g., name="activityType")
  { regex: /name="(activityType|locationType|minMembers|maxMembers|contactName|contactNumber|zipCode|addressLine1|addressLine2)"/g, replace: (match, p1) => `name="${propertyMap[p1]}"` },
  
  // Match object property access (e.g., formData.activityType)
  { regex: /(\.|^|\s)(activityType|locationType|minMembers|maxMembers|contactName|contactNumber|zipCode|addressLine1|addressLine2)(\s|[,;:]|$)/g, replace: (match, prefix, p1, suffix) => `${prefix}${propertyMap[p1]}${suffix}` },
  
  // Match JSON keys (e.g., "activityType": value)
  { regex: /"(activityType|locationType|minMembers|maxMembers|contactName|contactNumber|zipCode|addressLine1|addressLine2)":/g, replace: (match, p1) => `"${propertyMap[p1]}":` },
];

// Directory to search for files
const clientDir = path.join(__dirname, 'client', 'src');

// Function to process a file
function processFile(filePath) {
  // Skip node_modules
  if (filePath.includes('node_modules')) return;
  
  const stats = fs.statSync(filePath);
  
  if (stats.isDirectory()) {
    // Process each file in the directory
    const files = fs.readdirSync(filePath);
    files.forEach(file => {
      processFile(path.join(filePath, file));
    });
  } else if (stats.isFile() && /\.(jsx?|tsx?)$/.test(filePath)) {
    // Only process JS/TS/JSX/TSX files
    console.log(`Processing: ${filePath}`);
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    
    // Apply each pattern to the file content
    patterns.forEach(pattern => {
      const newContent = content.replace(pattern.regex, pattern.replace);
      if (newContent !== content) {
        content = newContent;
        changed = true;
      }
    });
    
    if (changed) {
      console.log(`✅ Updated: ${filePath}`);
      fs.writeFileSync(filePath, content, 'utf8');
    }
  }
}

console.log('🔍 Starting to fix property name mismatches...');

// Process files in client/src directory
processFile(clientDir);

console.log('✨ Done fixing property name mismatches!');
