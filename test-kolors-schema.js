async function run() {
  try {
    const res = await fetch('https://fal.run/fal-ai/kling/v1-5/kolors-virtual-try-on/openapi.json', {
      headers: { Authorization: `Key ${process.env.VITE_FAL_API_KEY}` }
    });
    const schema = await res.json();
    console.log(JSON.stringify(schema, null, 2));
  } catch (e) {
    console.error(e.message);
  }
}
run();
