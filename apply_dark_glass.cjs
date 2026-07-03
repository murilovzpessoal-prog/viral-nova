const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'App.tsx');
let content = fs.readFileSync(filePath, 'utf-8');

const replacements = [
  // Make all solid product cards Dark Glass
  { from: /bg-\[\#14151a\]/g, to: 'bg-white/5 backdrop-blur-2xl border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]' },
  
  // Make borders look like glossy glass reflections
  { from: /border-\[\#1e1f26\]/g, to: 'border-white/10' },
  { from: /border-white\/5/g, to: 'border-white/20' },

  // Increase the brightness of the GlobalBackground mesh glows so they shine heavily through the dark glass
  { from: /bg-\[\#2DD4BF\]\/10/g, to: 'bg-[#2DD4BF]/20' },
  { from: /bg-\[\#D946EF\]\/10/g, to: 'bg-[#D946EF]/20' }
];

replacements.forEach(({ from, to }) => {
  content = content.replace(from, to);
});

fs.writeFileSync(filePath, content, 'utf-8');
console.log('App.tsx updated with Dark Glass theme!');
