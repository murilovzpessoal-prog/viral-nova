import { fal } from '@fal-ai/client';

async function run() {
  try {
    const res = await fal.subscribe('fal-ai/idm-vton', {
      input: {
        human_image_url: "https://i.imgur.com/hrGOGFM.jpeg",
        garment_image_url: "https://i.imgur.com/vH9JdD4.jpeg",
        description: "A top",
        category: "upper_body"
      }
    });
    console.log("Fal VTON Success:", res);
  } catch (err) {
    console.error("Fal VTON Error:", err);
  }
}
run();
