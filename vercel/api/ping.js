
export const config = {
  runtime: 'edge'
};

export default async function handler(request) {
  return new Response(
    JSON.stringify({
      message: "pong",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      deployment: 'vercel',
      version: '1.0.1'
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
