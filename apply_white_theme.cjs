const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'App.tsx');
let content = fs.readFileSync(filePath, 'utf-8');

const replacements = [
  // Text colors
  { from: /text-white/g, to: 'text-slate-900' },
  { from: /text-\[\#e1e1e6\]/g, to: 'text-slate-800' },
  { from: /text-\[\#8d8d99\]/g, to: 'text-slate-600' },
  { from: /text-\[\#a1a1aa\]/g, to: 'text-slate-500' },
  { from: /text-gray-400/g, to: 'text-slate-500' },
  
  // Backgrounds & Glassmorphism
  { from: /bg-\[\#14151a\]/g, to: 'bg-white/60 backdrop-blur-xl border border-white/50 shadow-lg shadow-black/5' },
  { from: /bg-\[\#0b0c10\]/g, to: 'bg-transparent' },
  { from: /bg-\[\#0B0B0E\]\/80/g, to: 'bg-white/40 backdrop-blur-2xl' },
  { from: /bg-\[\#0B0B0E\]\/90/g, to: 'bg-white/60 backdrop-blur-2xl' },
  { from: /bg-\[\#0B0B0E\]/g, to: 'bg-transparent' },
  { from: /bg-\[\#1e1f26\]/g, to: 'bg-white/50 backdrop-blur-md' },
  
  // Borders
  { from: /border-white\/5/g, to: 'border-white/60' },
  { from: /border-white\/10/g, to: 'border-white/60' },
  { from: /border-white\/20/g, to: 'border-white/70' },
  { from: /border-\[\#1e1f26\]/g, to: 'border-white/60' },
  { from: /border-\[\#2a2a2a\]/g, to: 'border-white/60' },
  
  // GlobalBackground Component specific tweaks
  { from: /bg-\[\#0b0b0e\]/g, to: 'bg-white/30' },
  { from: /rgba\(255,255,255,0.015\)/g, to: 'rgba(0,0,0,0.03)' }, // digital grid lines
  { from: /shadow-\[0_0_8px_white\]/g, to: 'shadow-[0_0_8px_black]' },
  
  // Specific fix for transparent main wrappers that were changed previously
  { from: /bg-transparent text-slate-800/g, to: 'bg-transparent text-slate-900' }
];

replacements.forEach(({ from, to }) => {
  content = content.replace(from, to);
});

fs.writeFileSync(filePath, content, 'utf-8');
console.log('App.tsx updated with White Glass theme!');
