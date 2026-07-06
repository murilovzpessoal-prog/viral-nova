import glob

replacements = {
    # Text Gradients
    'from-purple-400 to-[#7B00FF]': 'from-[#00F0FF] to-[#FF007F]',
    'from-emerald-400 to-[#00F0FF]': 'from-[#00F0FF] to-[#FF007F]',
    
    # "Inspire-se" Button in BuilderView which uses #7B00FF
    'from-[#7B00FF] to-[#7B00FF]': 'from-[#FF007F] to-[#FF007F]',
    'hover:from-[#7B00FF] hover:to-[#7B00FF]': 'hover:from-[#FF007F] hover:to-[#FF007F]',
    'shadow-[0_0_20px_rgba(123,0,255,0.3)]': 'shadow-[0_0_20px_rgba(255,0,127,0.3)]',
}

for path in glob.glob('src/*.tsx'):
    with open(path, 'r', encoding='utf-8') as f:
        text = f.read()

    original = text
    
    for old, new in replacements.items():
        text = text.replace(old, new)
        
    if text != original:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(text)
        print(f"Fixed purple in {path}")

print("Fixed purples.")
