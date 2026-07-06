import { fal } from '@fal-ai/client';
fal.config({ credentials: process.env.VITE_FAL_API_KEY });
async function run() {
  try {
    const res = await fal.subscribe('fal-ai/flux/dev/image-to-image', {
      input: {
        image_url: "https://v3b.fal.media/files/b/0aa0daf0/FvUdhyFBWEhOzu46Q9hGz.png", // Example Kolors output
        prompt: "Ultra realistic photograph, high fashion, detailed skin pores, realistic fabric texture, 8k, DSLR",
        strength: 0.2
      }
    });
    console.log("Success FLUX I2I");
  } catch(e) {
    console.log("FLUX I2I err:", e.message);
  }
}
run();
