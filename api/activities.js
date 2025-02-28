
// Import database instance and activities schema
import { db } from "../db.js";
import { activities } from "../shared/schema.js";
import { eq } from "drizzle-orm";

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
      
      // Insert into database using Drizzle ORM methods
      const result = await db.insert(activities).values({
        name: activityData.name,
        category: activityData.category,
        description: activityData.description,
        activity_type: activityData.activity_type,
        location_type: activityData.location_type,
        min_members: activityData.min_members || 1,
        max_members: activityData.max_members || 10,
        address_line_1: activityData.address_line_1,
        address_line_2: activityData.address_line_2,
        city: activityData.city,
        state: activityData.state,
        zip_code: activityData.zip_code,
        contact_name: activityData.contact_name,
        contact_number: activityData.contact_number
      }).returning();
      
      // Return the created activity
      const createdActivity = result[0];
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
      // Get all activities using Drizzle ORM methods
      const result = await db.select().from(activities).orderBy(activities.id);
      return res.json(result);
    } catch (error) {
      console.error("Error in GET /api/activities:", error);
      return res.status(500).json({ error: "Error retrieving activities" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
