const fs = require('fs');

const filesToFix = [
  '/Users/murilohenriquemoreiravaz/Downloads/viralpulse-main/App.tsx',
  '/Users/murilohenriquemoreiravaz/Downloads/viralpulse-main/index.html'
];

filesToFix.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');

    const replacements = [
      { regex: /bg-\[\#e91e63\]/gi, replacement: 'bg-[#3B82F6]' },
      { regex: /text-\[\#e91e63\]/gi, replacement: 'text-[#3B82F6]' },
      { regex: /border-\[\#e91e63\]/gi, replacement: 'border-[#3B82F6]' },
      { regex: /from-\[\#e91e63\]/gi, replacement: 'from-[#3B82F6]' },
      { regex: /to-\[\#e91e63\]/gi, replacement: 'to-[#3B82F6]' },
      { regex: /via-\[\#e91e63\]/gi, replacement: 'via-[#3B82F6]' },
      { regex: /shadow-\[\#e91e63\]/gi, replacement: 'shadow-[#3B82F6]' },
      { regex: /fill-\[\#e91e63\]/gi, replacement: 'fill-[#3B82F6]' },
      { regex: /focus:border-\[\#e91e63\]/gi, replacement: 'focus:border-[#3B82F6]' },
      { regex: /border-\[\#e91e63\]\/(\d+)/gi, replacement: 'border-[#3B82F6]/$1' },
      { regex: /bg-\[\#e91e63\]\/(\d+)/gi, replacement: 'bg-[#3B82F6]/$1' },
      { regex: /text-\[\#e91e63\]\/(\d+)/gi, replacement: 'text-[#3B82F6]/$1' },
      { regex: /from-\[\#e91e63\]\/(\d+)/gi, replacement: 'from-[#3B82F6]/$1' },
      { regex: /to-\[\#e91e63\]\/(\d+)/gi, replacement: 'to-[#3B82F6]/$1' },
      { regex: /via-\[\#e91e63\]\/(\d+)/gi, replacement: 'via-[#3B82F6]/$1' },
      { regex: /shadow-\[\#e91e63\]\/(\d+)/gi, replacement: 'shadow-[#3B82F6]/$1' },

      { regex: /bg-\[\#ec4899\]/gi, replacement: 'bg-[#8B5CF6]' },
      { regex: /text-\[\#ec4899\]/gi, replacement: 'text-[#8B5CF6]' },
      { regex: /border-\[\#ec4899\]/gi, replacement: 'border-[#8B5CF6]' },
      { regex: /from-\[\#ec4899\]/gi, replacement: 'from-[#8B5CF6]' },
      { regex: /to-\[\#ec4899\]/gi, replacement: 'to-[#8B5CF6]' },
      { regex: /via-\[\#ec4899\]/gi, replacement: 'via-[#8B5CF6]' },
      { regex: /shadow-\[\#ec4899\]/gi, replacement: 'shadow-[#8B5CF6]' },
      { regex: /fill-\[\#ec4899\]/gi, replacement: 'fill-[#8B5CF6]' },
      { regex: /focus:border-\[\#ec4899\]/gi, replacement: 'focus:border-[#8B5CF6]' },
      { regex: /border-\[\#ec4899\]\/(\d+)/gi, replacement: 'border-[#8B5CF6]/$1' },
      { regex: /bg-\[\#ec4899\]\/(\d+)/gi, replacement: 'bg-[#8B5CF6]/$1' },
      { regex: /text-\[\#ec4899\]\/(\d+)/gi, replacement: 'text-[#8B5CF6]/$1' },
      { regex: /from-\[\#ec4899\]\/(\d+)/gi, replacement: 'from-[#8B5CF6]/$1' },
      { regex: /to-\[\#ec4899\]\/(\d+)/gi, replacement: 'to-[#8B5CF6]/$1' },
      { regex: /via-\[\#ec4899\]\/(\d+)/gi, replacement: 'via-[#8B5CF6]/$1' },
      { regex: /shadow-\[\#ec4899\]\/(\d+)/gi, replacement: 'shadow-[#8B5CF6]/$1' },

      { regex: /#e91e63/gi, replacement: '#3B82F6' },
      { regex: /#ec4899/gi, replacement: '#8B5CF6' },
      { regex: /pink-(500|600)/gi, replacement: 'blue-$1' },
      { regex: /pink-400/gi, replacement: 'purple-400' }
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
