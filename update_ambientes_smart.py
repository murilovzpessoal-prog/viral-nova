import re

categories_str = 'const categories = ["Todos", "Sala", "Quarto", "Corredor", "Varanda", "Banheiro"];'

images_meta = {
    1: "Quarto",
    2: "Corredor",
    3: "Banheiro",
    4: "Corredor",
    5: "Varanda",
    6: "Sala",
    7: "Quarto",
    8: "Varanda",
    9: "Sala",
    10: "Sala",
    11: "Quarto",
    12: "Sala",
    13: "Sala",
    14: "Sala",
    15: "Sala",
    16: "Sala",
    17: "Corredor",
    18: "Corredor",
    19: "Corredor",
    20: "Sala"
}

new_templates = []
for i in range(1, 21):
    idx_str = f"{i:02d}"
    url = f"https://promptsmvz.site/assets/ambiente-{idx_str}.jpg"
    cat = images_meta[i]
        
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
cat_pattern = r'const categories = \[[^\]]*\];'
content = re.sub(cat_pattern, categories_str, content, count=1)

# Replace templates
start_idx = content.find("const templates = [")
end_idx = content.find("export const AmbientesView = () => {")

if start_idx != -1 and end_idx != -1:
    content = content[:start_idx] + templates_str + "\n\n" + content[end_idx:]

with open('/Users/murilohenriquemoreiravaz/.gemini/antigravity/scratch/viralpulse-att/src/AmbientesView.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated AmbientesView.tsx successfully with specific categories.")
