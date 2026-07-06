import re

categories_str = 'const categories = ["Todos", "Sala", "Banheiro", "Cozinha"];'

new_templates = []
for i in range(1, 21):
    idx_str = f"{i:02d}"
    url = f"https://promptsmvz.site/assets/ambiente-{idx_str}.jpg"
    
    if i <= 7:
        cat = "Sala"
    elif i <= 14:
        cat = "Banheiro"
    else:
        cat = "Cozinha"
        
    new_templates.append(f"""  {{
    id: {i},
    category: "{cat}",
    title: "AMBIENTE - {cat.upper()}",
    desc: "Cenário ultra-realista de {cat.lower()} para utilizar nos seus vídeos.",
    likes: {100 + i},
    image: "{url}",
    promptText: "Cenário de {cat.lower()} realista."
  }}""")

templates_str = "const templates = [\n" + ",\n".join(new_templates) + "\n];"

with open('/Users/murilohenriquemoreiravaz/.gemini/antigravity/scratch/viralpulse-att/src/AmbientesView.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace categories
# it's currently defined as `const categories = [\n  "Builder", ...\n];`
cat_pattern = r'const categories = \[[^\]]*\];'
content = re.sub(cat_pattern, categories_str, content, count=1)

# Replace templates
# it's currently defined as `const templates = [\n ... \n];` but it's huge, so let's match until `export const AmbientesView = () => {`
temp_pattern = r'const templates = \[[^\]]*\];(?=\n\nexport const AmbientesView)'
# Wait, the templates array has nested brackets, so regex might struggle.
# Better to use string manipulation:
# Find `const templates = [` and find the first `export const AmbientesView` and replace everything between.

start_idx = content.find("const templates = [")
end_idx = content.find("export const AmbientesView = () => {")

if start_idx != -1 and end_idx != -1:
    content = content[:start_idx] + templates_str + "\n\n" + content[end_idx:]

# Also, in the component, make sure we use title and desc if it exists.
# We already did something similar before, but just to be sure we'll update the rendering.
render_pattern = r'<h3 className="text-white font-black text-sm uppercase tracking-wide shadow-sm">.*?</h3>'
# Wait, let's not touch the render logic unless it's broken. I will just check what's there first.

with open('/Users/murilohenriquemoreiravaz/.gemini/antigravity/scratch/viralpulse-att/src/AmbientesView.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated AmbientesView.tsx successfully.")
