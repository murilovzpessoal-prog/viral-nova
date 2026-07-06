import re

new_women = []
names = ["Camila", "Beatriz", "Letícia", "Aline", "Bruna", "Gabriela", "Isabela", "Marina", "Larissa", "Natália", "Amanda", "Caroline", "Patrícia", "Renata", "Silvia", "Tatiana", "Vanessa", "Yasmin", "Sophia", "Olivia"]

for i in range(1, 21):
    idx_str = f"{i:02d}"
    url = f"https://promptsmvz.site/assets/influencer-{idx_str}.jpg"
    # id follows w1-w6, so new ids will be w7 to w26
    new_women.append(f"    {{ id: 'w{6+i}', name: '{names[i-1]}', image: '{url}' }},")

with open('/Users/murilohenriquemoreiravaz/.gemini/antigravity/scratch/viralpulse-att/App.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern: we find the end of influencersWomen array
#     { id: 'w6', name: 'Maria', image: 'https://i.imgur.com/6vg7fRq.jpeg' },
#   ];
pattern = r"    \{ id: 'w6', name: 'Maria', image: 'https://i\.imgur\.com/6vg7fRq\.jpeg' \},\n  \];"
replacement = "    { id: 'w6', name: 'Maria', image: 'https://i.imgur.com/6vg7fRq.jpeg' },\n" + "\n".join(new_women) + "\n  ];"

new_content = re.sub(pattern, replacement, content)

with open('/Users/murilohenriquemoreiravaz/.gemini/antigravity/scratch/viralpulse-att/App.tsx', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Updated App.tsx successfully with 20 new women influencers.")
