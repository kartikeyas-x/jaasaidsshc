
export default function handler(req, res) {
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    vercel: true,
    region: process.env.VERCEL_REGION || "unknown",
    nodeVersion: process.version
  });
}
