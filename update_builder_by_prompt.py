import re

with open('src/BuilderView.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

def replacer(match):
    full_str = match.group(0)
    prompt_match = re.search(r'promptText:\s*`([^`]+)`', full_str)
    prompt = prompt_match.group(1).upper() if prompt_match else ""
    
    cat = "Lifestyle"
    if "SELFIE" in prompt:
        cat = "Selfies"
    elif "CLOSE-UP" in prompt or "CLOSEUP" in prompt:
        cat = "Close-up"
        
    # Replace ONLY the category line, not everything
    return re.sub(r'category:\s*"[^"]+"', f'category: "{cat}"', full_str)

start_idx = text.find('const templates = [')
end_idx = text.find('];', start_idx)

templates_str = text[start_idx:end_idx]
blocks = re.split(r'(?=\{\n\s+id:)', templates_str)

new_blocks = []
for block in blocks:
    if 'category: "Lifestyle"' in block or 'category: "Selfies"' in block or 'category: "Close-up"' in block or 'category: "Builder"' in block:
        # Avoid changing Influenciadoras, Ambientes, Trocas
        if 'category: "Influenciadoras"' not in block and 'category: "Ambientes"' not in block and 'category: "Trocas"' not in block:
            new_blocks.append(replacer(re.match(r'.*', block, re.DOTALL)))
        else:
            new_blocks.append(block)
    else:
        new_blocks.append(block)

text = text[:start_idx] + "".join(new_blocks) + text[end_idx:]

with open('src/BuilderView.tsx', 'w', encoding='utf-8') as f:
    f.write(text)

print("Re-categorized based on prompt text successfully.")
