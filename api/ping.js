
export default function handler(req, res) {
  res.status(200).json({
    message: "pong",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    deployment: 'vercel',
    version: '1.0.2'
  });
}
