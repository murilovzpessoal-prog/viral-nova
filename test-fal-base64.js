import { fal } from '@fal-ai/client';

fal.config({ credentials: process.env.VITE_FAL_API_KEY });

async function run() {
  try {
    const b64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=";
    const url = await fal.storage.upload(b64);
    console.log("Storage Success:", url);
  } catch (err) {
    console.error("Storage Error:", err);
  }
}
run();
