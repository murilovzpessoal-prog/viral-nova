import { fal } from '@fal-ai/client';

async function testFashn() {
  try {
    fal.config({ credentials: process.env.VITE_FAL_API_KEY });
    console.log("Testing FASHN API...");
    // Use some generic public image URLs
    const result = await fal.subscribe('fal-ai/fashn/tryon/v1.6', {
      input: {
        model_image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
        garment_image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
        category: "tops"
      }
    });
    console.log("SUCCESS:", JSON.stringify(result.data, null, 2));
  } catch (error) {
    console.error("ERROR:");
    console.error(error);
    if (error.body) console.error("Body:", error.body);
  }
}

testFashn();
