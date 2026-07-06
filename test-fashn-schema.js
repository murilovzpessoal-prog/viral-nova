import { fal } from '@fal-ai/client';

async function run() {
  try {
    const res = await fetch('https://fal.run/fal-ai/fashn/tryon/v1.6/openapi.json', {
      headers: { Authorization: `Key ${process.env.VITE_FAL_API_KEY}` }
    });
    const schema = await res.json();
    console.log(JSON.stringify(schema, null, 2));
  } catch (e) {
    console.error(e.message);
  }
}
run();
