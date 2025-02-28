import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./shared/schema";
import dotenv from "dotenv";

// Ensure environment variables are loaded
dotenv.config();

// Create a database connection function
const createDBConnection = () => {
  // Try to get from environment, otherwise use hardcoded fallback.  Added error handling.
  let connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.warn("DATABASE_URL environment variable not set. Using fallback connection string.");
    connectionString = "postgresql://neondb_owner:npg_iswFG0ZaHIY5@ep-broad-mouse-a8asxfw4-pooler.eastus2.azure.neon.tech/neondb?sslmode=require";
  }

  console.log("Using database connection:", connectionString.substring(0, 30) + "...");

  // Configure Neon database with proper pooling for serverless.  Improved error handling and clarity.
  const sql = neon(connectionString, {
    pooling: {
      enabled: true,
      max: 5,            // Maximum 5 connections
      min: 1,            // Minimum 1 connection to avoid initial connection delays
      idleTimeoutMillis: 30000  // Close idle connections after 30 seconds
    }
  });

  try {
    return drizzle(sql, { schema });
  } catch (error) {
    console.error("Error creating Drizzle ORM connection:", error);
    throw error; // Re-throw to halt application startup
  }
};

// Export the database instance
export const db = createDBConnection();