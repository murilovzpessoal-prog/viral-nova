import fs from 'fs';
const env = fs.readFileSync('.env', 'utf8');
const key = env.split('\n').find(l => l.startsWith('VITE_GEMINI_API_KEY=')).split('=')[1];

async function run() {
  const b64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=";
  const maskB64 = b64;
  
  const url = `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${key}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      instances: [{ 
        prompt: "A blue circle",
        image: { bytesBase64Encoded: b64 }
      }],
      parameters: { 
        sampleCount: 1,
        editConfig: {
          editMode: "INPAINT_INSERTION",
          mask: { image: { bytesBase64Encoded: maskB64 } }
        }
      }
    })
  });
  
  const data = await res.json();
  console.log("Status:", res.status);
  console.log("Response:", JSON.stringify(data).substring(0, 300));
}
run();
