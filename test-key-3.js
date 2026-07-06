async function run() {
  const key = 'AQ.Ab8RN6JXTxAkdn926Z5nVJRsQovoRKO2FQ76Nayl8wP8x-D-3g';
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log("Status:", res.status);
  console.log("Data:", JSON.stringify(data));
}
run();
