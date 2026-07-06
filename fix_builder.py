import re

with open('src/BuilderView.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Update categories array
categories_str = 'const categories = [\n  "Todos", "Selfies", "Lifestyle", "Close-up"\n];'
text = re.sub(r'const categories = \[[^\]]+\];', categories_str, text, count=1)

# 2. Update default filter state
text = text.replace('useState("Builder")', 'useState("Todos")')

# 3. Update the UI button logic to include new categories
text = text.replace("['Builder', 'Trocas'].includes(template.category)", 
                    "['Builder', 'Trocas', 'Selfies', 'Lifestyle', 'Close-up'].includes(template.category)")

# 4. Re-categorize ONLY the items that are currently "Builder"
def replacer(match):
    full_str = match.group(0)
    title_match = re.search(r'title:\s*"([^"]+)"', full_str)
    title = title_match.group(1).upper() if title_match else ""
    
    cat = "Lifestyle"
    if "SELFIE" in title:
        cat = "Selfies"
    elif "CLOSE-UP" in title or "CLOSEUP" in title:
        cat = "Close-up"
        
    return full_str.replace('category: "Builder"', f'category: "{cat}"')

# Only apply to templates inside the templates array
start_idx = text.find('const templates = [')
end_idx = text.find('];', start_idx)

templates_str = text[start_idx:end_idx]

# Match block `{ id: ..., category: "Builder", ... }`
# Since we just want to replace category: "Builder" and we have the titles, we can just split by blocks.
blocks = re.split(r'(?=\{\n\s+id:)', templates_str)
new_blocks = []
for block in blocks:
    if 'category: "Builder"' in block:
        new_blocks.append(replacer(re.match(r'.*', block, re.DOTALL)))
    else:
        new_blocks.append(block)

text = text[:start_idx] + "".join(new_blocks) + text[end_idx:]

with open('src/BuilderView.tsx', 'w', encoding='utf-8') as f:
    f.write(text)

print("Updated BuilderView correctly.")
