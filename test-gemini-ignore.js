async function run() {
  const key = process.env.VITE_GEMINI_API_KEY;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${key}`;
  
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      instances: [{ prompt: "A dog" }],
      parameters: { 
        sampleCount: 1,
        referenceImages: [{ bytesBase64Encoded: "INVALID_BASE64_STRING_THAT_SHOULD_CRASH" }]
      }
    })
  });
  
  console.log("Status:", res.status);
  const data = await res.json();
  console.log("Response:", JSON.stringify(data).substring(0, 100));
}
run();
