export default async function handler(req, res) {
  const falKey = process.env.FAL_API_KEY || process.env.VITE_FAL_API_KEY;
  if (!falKey) {
    return res.status(500).json({ error: "FAL_API_KEY missing on server" });
  }

  const targetUrl = req.headers['x-fal-target-url'];
  if (!targetUrl) {
    return res.status(400).json({ error: "Missing x-fal-target-url header" });
  }

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        'Authorization': `Key ${falKey}`,
        'Content-Type': req.headers['content-type'] || 'application/json'
      },
      body: req.method === 'POST' ? JSON.stringify(req.body) : undefined
    });
    
    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).send(text);
    }
    
    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error) {
    console.error("FAL Proxy Error:", error);
    return res.status(500).json({ error: error.message });
  }
}
