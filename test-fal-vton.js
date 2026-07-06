import { fal } from '@fal-ai/client';

async function run() {
  try {
    const res = await fal.subscribe('fal-ai/fashn-vton', {
      input: {
        model_image: "https://i.imgur.com/hrGOGFM.jpeg",
        garment_image: "https://i.imgur.com/vH9JdD4.jpeg",
        category: "tops"
      }
    });
    console.log("Fal VTON Success:", res);
  } catch (err) {
    console.error("Fal VTON Error:", err);
  }
}
run();
