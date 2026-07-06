import glob, re

for path in glob.glob('src/*.tsx'):
    with open(path, 'r', encoding='utf-8') as f:
        text = f.read()

    original = text
    
    # Remove duplicate borders
    text = text.replace('border border-white/10 backdrop-blur-[30px] border border-white/10', 'border border-white/10 backdrop-blur-[30px]')
    text = text.replace('border border-white/10 backdrop-blur-[20px] border border-white/10', 'border border-white/10 backdrop-blur-[20px]')
    
    # Add neon glows on hover for cards
    # Pattern: group hover:scale-105 or similar for cards
    # We can just look for standard card classes and add hover:shadow-[0_0_30px_rgba(0,240,255,0.15)] hover:border-[#00F0FF]/30 transition-all duration-300
    text = re.sub(r'(className="[^"]*rounded-\[24px\][^"]*bg-white/\[0\.02\] border border-white/10 backdrop-blur-\[30px\])([^"]*)(")',
                  r'\1\2 hover:border-[#00F0FF]/40 hover:shadow-[0_0_30px_rgba(0,240,255,0.2)] transition-all duration-300\3', text)

    # Let's also do it for the purple hover glow for some buttons
    text = text.replace('hover:bg-[#FF007F]/80', 'hover:bg-[#FF007F] hover:shadow-[0_0_20px_rgba(255,0,127,0.5)]')
    text = text.replace('hover:bg-[#00F0FF]/80', 'hover:bg-[#00F0FF] hover:shadow-[0_0_20px_rgba(0,240,255,0.5)]')

    if text != original:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(text)
        print(f"Enhanced {path}")

print("Enhancements complete.")
