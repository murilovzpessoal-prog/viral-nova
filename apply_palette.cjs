const fs = require('fs');
const path = require('path');

const filesToFix = [
  path.join(__dirname, 'App.tsx'),
  path.join(__dirname, 'index.html')
];

filesToFix.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');

    // New colors based on images
    const TEAL = '#2DD4BF';
    const MAGENTA = '#D946EF';

    const replacements = [
      // Replace Blue (#3B82F6) with Teal
      { regex: /bg-\[\#3B82F6\]/gi, replacement: `bg-[${TEAL}]` },
      { regex: /text-\[\#3B82F6\]/gi, replacement: `text-[${TEAL}]` },
      { regex: /border-\[\#3B82F6\]/gi, replacement: `border-[${TEAL}]` },
      { regex: /from-\[\#3B82F6\]/gi, replacement: `from-[${TEAL}]` },
      { regex: /to-\[\#3B82F6\]/gi, replacement: `to-[${TEAL}]` },
      { regex: /via-\[\#3B82F6\]/gi, replacement: `via-[${TEAL}]` },
      { regex: /shadow-\[\#3B82F6\]/gi, replacement: `shadow-[${TEAL}]` },
      { regex: /fill-\[\#3B82F6\]/gi, replacement: `fill-[${TEAL}]` },
      { regex: /focus:border-\[\#3B82F6\]/gi, replacement: `focus:border-[${TEAL}]` },
      { regex: /border-\[\#3B82F6\]\/(\d+)/gi, replacement: `border-[${TEAL}]/$1` },
      { regex: /bg-\[\#3B82F6\]\/(\d+)/gi, replacement: `bg-[${TEAL}]/$1` },
      { regex: /text-\[\#3B82F6\]\/(\d+)/gi, replacement: `text-[${TEAL}]/$1` },
      { regex: /from-\[\#3B82F6\]\/(\d+)/gi, replacement: `from-[${TEAL}]/$1` },
      { regex: /to-\[\#3B82F6\]\/(\d+)/gi, replacement: `to-[${TEAL}]/$1` },
      { regex: /via-\[\#3B82F6\]\/(\d+)/gi, replacement: `via-[${TEAL}]/$1` },
      { regex: /shadow-\[\#3B82F6\]\/(\d+)/gi, replacement: `shadow-[${TEAL}]/$1` },

      // Replace Purple (#8B5CF6) with Magenta
      { regex: /bg-\[\#8B5CF6\]/gi, replacement: `bg-[${MAGENTA}]` },
      { regex: /text-\[\#8B5CF6\]/gi, replacement: `text-[${MAGENTA}]` },
      { regex: /border-\[\#8B5CF6\]/gi, replacement: `border-[${MAGENTA}]` },
      { regex: /from-\[\#8B5CF6\]/gi, replacement: `from-[${MAGENTA}]` },
      { regex: /to-\[\#8B5CF6\]/gi, replacement: `to-[${MAGENTA}]` },
      { regex: /via-\[\#8B5CF6\]/gi, replacement: `via-[${MAGENTA}]` },
      { regex: /shadow-\[\#8B5CF6\]/gi, replacement: `shadow-[${MAGENTA}]` },
      { regex: /fill-\[\#8B5CF6\]/gi, replacement: `fill-[${MAGENTA}]` },
      { regex: /focus:border-\[\#8B5CF6\]/gi, replacement: `focus:border-[${MAGENTA}]` },
      { regex: /border-\[\#8B5CF6\]\/(\d+)/gi, replacement: `border-[${MAGENTA}]/$1` },
      { regex: /bg-\[\#8B5CF6\]\/(\d+)/gi, replacement: `bg-[${MAGENTA}]/$1` },
      { regex: /text-\[\#8B5CF6\]\/(\d+)/gi, replacement: `text-[${MAGENTA}]/$1` },
      { regex: /from-\[\#8B5CF6\]\/(\d+)/gi, replacement: `from-[${MAGENTA}]/$1` },
      { regex: /to-\[\#8B5CF6\]\/(\d+)/gi, replacement: `to-[${MAGENTA}]/$1` },
      { regex: /via-\[\#8B5CF6\]\/(\d+)/gi, replacement: `via-[${MAGENTA}]/$1` },
      { regex: /shadow-\[\#8B5CF6\]\/(\d+)/gi, replacement: `shadow-[${MAGENTA}]/$1` },
      
      // Standard tailwind class replacements
      { regex: /blue-(400|500|600)/gi, replacement: 'teal-400' },
      { regex: /purple-(400|500|600)/gi, replacement: 'fuchsia-500' }
    ];

    let newContent = content;
    replacements.forEach(t => {
      newContent = newContent.replace(t.regex, t.replacement);
    });

    if (newContent !== content) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log('Fixed colors in ' + filePath);
    } else {
      console.log('No colors needed fixing in ' + filePath);
    }
  } else {
    console.log('File not found: ' + filePath);
  }
});
