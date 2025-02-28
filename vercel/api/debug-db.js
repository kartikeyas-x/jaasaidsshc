
export const config = {
  runtime: 'edge'
};

export default async function handler(request) {
  return new Response(
    JSON.stringify({
      message: "Database configuration debug info",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      database: {
        status: "checking configuration",
        has_connection_string: process.env.DATABASE_URL ? true : false,
        connection_string_length: process.env.DATABASE_URL ? process.env.DATABASE_URL.length : 0
      }
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, max-age=0'
      }
    }
  );
}
