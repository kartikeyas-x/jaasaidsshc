// Using Node.js runtime instead of Edge Runtime
export default function handler(req, res) {
  res.status(200).json({
    message: "Database configuration debug info",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    database: {
      status: "checking configuration",
      has_connection_string: process.env.DATABASE_URL ? true : false,
      connection_string_length: process.env.DATABASE_URL ? process.env.DATABASE_URL.length : 0
    }
  });
}