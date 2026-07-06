with open('App.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

# Update the first logo
text = text.replace(
    'className="w-8 h-8 object-contain"',
    'className="w-8 h-8 object-contain mix-blend-screen"'
)

# Update the second logo
text = text.replace(
    'className="w-10 h-10 object-contain group-hover:scale-110 transition-transform"',
    'className="w-10 h-10 object-contain mix-blend-screen group-hover:scale-110 transition-transform"'
)

with open('App.tsx', 'w', encoding='utf-8') as f:
    f.write(text)

print("Updated logo blend mode")
