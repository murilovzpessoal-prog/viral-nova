const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: process.env.VITE_GEMINI_API_KEY });

async function run() {
  try {
    const response = await ai.models.generateImages({
        model: 'imagen-3.0-generate-001',
        prompt: 'a photo of a cat',
        number_of_images: 1,
        output_mime_type: 'image/jpeg',
    });
    console.log("Success! Image generated.");
  } catch (e) {
    console.error("Error:", e);
  }
}

run();
