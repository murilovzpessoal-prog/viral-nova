import re

new_avatars = []
names = ["Camila", "Beatriz", "Letícia", "Aline", "Bruna", "Gabriela", "Isabela", "Marina", "Larissa", "Natália", "Amanda", "Caroline", "Patrícia", "Renata", "Silvia", "Tatiana", "Vanessa", "Yasmin", "Sophia", "Olivia"]
roles = ["Fashion Creator", "Lifestyle Blogger", "Travel Enthusiast", "Fitness Model", "Beauty Guru", "Tech Reviewer", "Daily Vlogger", "Home Decorator", "Food Critic", "Wellness Coach", "Makeup Artist", "Business Consultant", "Entrepreneur", "Content Strategist", "Photographer", "Art Director", "Style Icon", "Yoga Instructor", "Gaming Streamer", "DIY Expert"]

for i in range(1, 21):
    idx_str = f"{i:02d}"
    url = f"https://promptsmvz.site/assets/influencer-{idx_str}.jpg"
    new_avatars.append(f"    {{ id: 'av{12+i}', name: '{names[i-1]}', role: '{roles[i-1]}', image: '{url}', hoverImage: '', description: 'Avatar gerado para o nicho de {roles[i-1].lower()}, ideal para conteúdos virais e autênticos.' }},")

with open('/Users/murilohenriquemoreiravaz/.gemini/antigravity/scratch/viralpulse-att/App.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

pattern = r"    \{ id: 'av12', name: 'Pedro', role: 'Lifestyle & Travel', image: 'https://i\.imgur\.com/Bziwg0O\.png', hoverImage: 'https://www\.trendlyai\.space/avatars/pedro\.gif', description: 'Pedro foca em lifestyle e viagens, ideal para produtos de uso externo e aventura\.' \},\n  \];"
replacement = "    { id: 'av12', name: 'Pedro', role: 'Lifestyle & Travel', image: 'https://i.imgur.com/Bziwg0O.png', hoverImage: 'https://www.trendlyai.space/avatars/pedro.gif', description: 'Pedro foca em lifestyle e viagens, ideal para produtos de uso externo e aventura.' },\n" + "\n".join(new_avatars) + "\n  ];"

new_content = re.sub(pattern, replacement, content)

with open('/Users/murilohenriquemoreiravaz/.gemini/antigravity/scratch/viralpulse-att/App.tsx', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Updated App.tsx successfully with 20 new avatars.")
