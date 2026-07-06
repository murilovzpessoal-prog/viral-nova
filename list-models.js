import fs from 'fs';
const env = fs.readFileSync('.env', 'utf8');
const key = env.split('\n').find(l => l.startsWith('VITE_GEMINI_API_KEY=')).split('=')[1];

async function run() {
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;
  const res = await fetch(url);
  const data = await res.json();
  const models = data.models.map(m => m.name);
  console.log("Models:", models.filter(m => m.includes('imagen') || m.includes('gemini-1.5')));
}
run();
