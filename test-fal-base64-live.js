import { fal } from '@fal-ai/client';

fal.config({ credentials: process.env.VITE_FAL_API_KEY });

async function run() {
  try {
    const b64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=";
    const res = await fal.subscribe('fal-ai/idm-vton', {
      input: {
        human_image_url: b64,
        garment_image_url: b64,
        category: "upper_body",
        description: "A top"
      }
    });
    console.log("Fal VTON Success:", JSON.stringify(res, null, 2));
  } catch (err) {
    console.error("Fal VTON Error:", err);
  }
}
run();
