
import { insertActivitySchema } from "../shared/schema";
import { storage } from "../server/storage";

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle OPTIONS request (preflight)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      const activity = insertActivitySchema.parse(req.body);
      
      console.log("Attempting to create activity:", JSON.stringify(activity));
      
      const created = await storage.createActivity(activity);
      return res.status(201).json(created);
    } catch (error) {
      console.error("Error in POST /api/activities:", error);
      
      if (error.name === "ZodError") {
        return res.status(400).json({ error: "Invalid activity data", details: error.errors });
      }
      
      return res.status(500).json({ 
        error: "Server error while creating activity",
        message: process.env.NODE_ENV === 'production' ? undefined : error.message,
        stack: process.env.NODE_ENV === 'production' ? undefined : error.stack
      });
    }
  } else if (req.method === 'GET') {
    try {
      const activities = await storage.getAllActivities();
      return res.json(activities);
    } catch (error) {
      console.error("Error in GET /api/activities:", error);
      return res.status(500).json({ error: "Error retrieving activities" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
