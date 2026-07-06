import os
import glob
import re

files_to_process = glob.glob('src/*.tsx') + ['App.tsx']

replacements = {
    # Teal/Emerald to Neon Cyan
    '2dd4bf': '00F0FF',
    '2DD4BF': '00F0FF',
    '00b37e': '00F0FF',
    '00B37E': '00F0FF',
    '10b981': '00F0FF',
    '10B981': '00F0FF',
    
    # Fuchsia to Neon Magenta
    'd946ef': 'FF007F',
    'D946EF': 'FF007F',
    
    # Purple/Indigo to Deep Neon Purple
    '8b5cf6': '7B00FF',
    '8B5CF6': '7B00FF',
    '4f46e5': '7B00FF',
    '4F46E5': '7B00FF',
    
    # Card Backgrounds -> Glassmorphism
    'bg-[#14151a] border border-[#1e1f26]': 'bg-white/[0.03] border border-white/10 backdrop-blur-[30px] shadow-2xl shadow-black/50',
    'bg-[#18181b] border border-[#27272a]': 'bg-white/[0.03] border border-white/10 backdrop-blur-[30px] shadow-2xl shadow-black/50',
    'bg-[#1e1f26]': 'bg-white/[0.05] border border-white/10 backdrop-blur-[20px]',
    'bg-[#14151a]': 'bg-white/[0.03] border border-white/10 backdrop-blur-[30px]',
    
    # RGB values for shadows and glows
    '217,70,239': '255,0,127',
    '139,92,246': '123,0,255',
    '45,212,191': '0,240,255',
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
