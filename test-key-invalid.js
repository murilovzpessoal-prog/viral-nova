async function run() {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=invalidkey`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents: [{ parts: [{ text: "Hello" }] }] })
  });
  const data = await res.json();
  console.log("Invalid Key Status:", res.status);
  console.log("Invalid Key Data:", JSON.stringify(data));
}
run();
