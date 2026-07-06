import re
import os

files = ['src/BuilderView.tsx', 'src/AmbientesView.tsx', 'src/MovimentosView.tsx', 'src/TrocasView.tsx']

for file in files:
    if os.path.exists(file):
        with open(file, 'r', encoding='utf-8') as f:
            text = f.read()
            
        # We look for the main return wrapper
        # It looks like: className="flex-1 w-full flex flex-col p-6 md:p-8 overflow-y-auto bg-transparent relative"
        # We just want to add pt-16 md:pt-20 to it.
        
        def replacer(match):
            cls = match.group(1)
            # Remove any existing pt-* or mt-* just to be clean if they exist? Nah, just append.
            # But wait, p-6 sets padding for all sides. If we add pt-16, it overrides top padding.
            if 'pt-16' not in cls:
                new_cls = cls + " pt-16 md:pt-20"
                return f'className="{new_cls}"'
            return match.group(0)
            
        # Match the wrapper div which is usually the first after return (
        # We can just match the specific known strings
        text = text.replace('className="flex-1 w-full flex flex-col p-6 md:p-8 overflow-y-auto bg-transparent relative"', 
                            'className="flex-1 w-full flex flex-col p-6 md:p-8 pt-16 md:pt-20 overflow-y-auto bg-transparent relative"')
        
        text = text.replace('className="flex-1 w-full flex flex-col p-6 md:p-8 overflow-y-auto bg-transparent"', 
                            'className="flex-1 w-full flex flex-col p-6 md:p-8 pt-16 md:pt-20 overflow-y-auto bg-transparent"')
                            
        text = text.replace('className="flex-1 w-full flex flex-col p-6 md:p-12 overflow-y-auto bg-transparent"', 
                            'className="flex-1 w-full flex flex-col p-6 md:p-12 pt-16 md:pt-20 overflow-y-auto bg-transparent"')
                            
        with open(file, 'w', encoding='utf-8') as f:
            f.write(text)
            print(f"Updated padding in {file}")

