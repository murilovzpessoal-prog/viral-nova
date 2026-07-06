async function run() {
  const key = process.env.VITE_GEMINI_API_KEY;
  const influencerBase64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII="; 
  
  const finalPrompt = "A highly realistic professional photo of a Brazilian woman with curly dark hair, wearing a white halter top with a plunging neckline and a silver ring in the middle. She is in a bright room. The woman's face and identity must perfectly match the first reference image. The clothing must perfectly match the second reference image.";
  
  const url = `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${key}`;
  
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      instances: [{ prompt: finalPrompt }],
      parameters: { 
        sampleCount: 1,
        referenceImages: [
          { bytesBase64Encoded: influencerBase64 },
          { bytesBase64Encoded: influencerBase64 }
        ]
      }
    })
  });
  
  console.log("Status:", res.status);
  const data = await res.json();
  if (data.predictions) console.log("Success! Image returned.");
  else console.log(data);
}
run();
