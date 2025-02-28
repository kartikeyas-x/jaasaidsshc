
// Import database instance directly instead of a function
import { db } from "../db.js";
import { insertActivitySchema } from "../shared/schema.js";

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      // Parse and validate request body
      const activityData = req.body;
      
      console.log("Attempting to create activity:", JSON.stringify(activityData));
      
      // Insert into database using the imported db instance
      const result = await db.query(`
        INSERT INTO activities (
          name, category, description, activity_type, location_type, 
          min_members, max_members, address_line_1, address_line_2, 
          city, state, zip_code, contact_name, contact_number
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14
        ) RETURNING *
      `, [
        activityData.name,
        activityData.category,
        activityData.description,
        activityData.activity_type,
        activityData.location_type,
        activityData.min_members || 1,
        activityData.max_members || 10,
        activityData.address_line_1,
        activityData.address_line_2,
        activityData.city,
        activityData.state,
        activityData.zip_code,
        activityData.contact_name,
        activityData.contact_number
      ]);
      
      // Return the created activity
      const createdActivity = result.rows[0];
      return res.status(201).json(createdActivity);
    } catch (error) {
      console.error("Error in POST /api/activities:", error);
      
      return res.status(500).json({ 
        error: "Server error while creating activity",
        message: process.env.NODE_ENV === 'production' ? undefined : error.message
      });
    }
  } else if (req.method === 'GET') {
    try {
      // Get all activities
      const result = await db.query('SELECT * FROM activities ORDER BY id DESC');
      return res.json(result.rows);
    } catch (error) {
      console.error("Error in GET /api/activities:", error);
      return res.status(500).json({ error: "Error retrieving activities" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
