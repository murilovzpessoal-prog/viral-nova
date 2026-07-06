import glob
import os

files_to_process = glob.glob('src/*.tsx')

replacements = {
    # Purples and violets to Neon Purple
    'B026FF': '7B00FF',
    'b026ff': '7B00FF',
    '7c3aed': '7B00FF',
    '7C3AED': '7B00FF',
    '6d28d9': '7B00FF',
    '6D28D9': '7B00FF',
    
    # Backgrounds to Glassmorphism
    'bg-[#13141c]': 'bg-white/[0.03] border border-white/10 backdrop-blur-[30px]',
    'bg-[#1a1b26]': 'bg-white/[0.05] border border-white/10 backdrop-blur-[20px]',
    'bg-[#0e0f14]': 'bg-white/[0.02] border border-white/10 backdrop-blur-[30px]',
    'bg-[#0E0E11]': 'bg-white/[0.03] border border-white/10 backdrop-blur-[30px]',
    'bg-[#121216]': 'bg-white/[0.03] border border-white/10 backdrop-blur-[30px]',
    'bg-[#0b0c10]': 'bg-white/[0.02] border border-white/10 backdrop-blur-[40px]',
    'bg-[#09090B]': 'bg-white/[0.03] border border-white/10 backdrop-blur-[40px]',
}

for file in files_to_process:
    if os.path.exists(file):
        with open(file, 'r', encoding='utf-8') as f:
            text = f.read()
            
        original_text = text
        
        for old_val, new_val in replacements.items():
            text = text.replace(old_val, new_val)
            
        if text != original_text:
            with open(file, 'w', encoding='utf-8') as f:
                f.write(text)
            print(f"Updated theme in {file}")

print("Theme update complete.")
