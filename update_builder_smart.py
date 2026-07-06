import re

with open('src/BuilderView.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Replace the categories array
categories_str = 'const categories = ["Todos", "Selfies", "Lifestyle", "Close-up"];'
cat_pattern = r'const categories = \[[^\]]*\];'
content = re.sub(cat_pattern, categories_str, content, count=1)

# 2. Re-categorize all templates based on their title or current category
def replacer(match):
    full_match = match.group(0)
    
    # Extract title to decide category
    title_match = re.search(r'title:\s*"([^"]+)"', full_match)
    title = title_match.group(1).upper() if title_match else ""
    
    cat = "Lifestyle" # default
    if "SELFIE" in title:
        cat = "Selfies"
    elif "CLOSE-UP" in title or "CLOSEUP" in title:
        cat = "Close-up"
        
    return re.sub(r'category:\s*"[^"]+"', f'category: "{cat}"', full_match)

# Find each template block and replace its category
# We match everything inside { ... } assuming it's a template item
# We can just match `category: "..."` and check the surrounding title, 
# but it's safer to split by `{` and `}`. Actually a regex on the whole template block:
content = re.sub(r'\{\s*id:\s*\d+,\s*category:\s*"[^"]+",[^}]+title:\s*"[^"]+"[^}]+\}', replacer, content)

with open('src/BuilderView.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated BuilderView.tsx successfully.")
