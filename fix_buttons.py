import glob

replacements = {
    # Emerald buttons (AmbientesView "Baixar Cenário")
    'from-emerald-500 to-emerald-600': 'from-[#00F0FF]/80 to-[#00F0FF]/80',
    'hover:from-emerald-600 hover:to-emerald-700': 'hover:from-[#00F0FF] hover:to-[#00F0FF]',
    'group-hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]': 'group-hover:shadow-[0_0_20px_rgba(0,240,255,0.4)]',
    
    # Blue buttons (BuilderView "Baixar Imagem")
    'from-blue-500 to-blue-600': 'from-[#00F0FF]/80 to-[#00F0FF]/80',
    'hover:from-blue-600 hover:to-blue-700': 'hover:from-[#00F0FF] hover:to-[#00F0FF]',
    'group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]': 'group-hover:shadow-[0_0_20px_rgba(0,240,255,0.4)]',
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
        print(f"Fixed buttons in {path}")

print("Fixed download buttons.")
