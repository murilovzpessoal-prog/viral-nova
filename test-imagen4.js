async function run() {
  const key = process.env.VITE_GEMINI_API_KEY;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${key}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      instances: [{ prompt: "A beautiful sunny day at the beach, 4k photography" }],
      parameters: { sampleCount: 1 }
    })
  });
  
  const text = await res.text();
  console.log("Status:", res.status);
  console.log("Response starts with:", text.substring(0, 100));
}
run();
