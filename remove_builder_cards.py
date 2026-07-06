import re

with open('/Users/murilohenriquemoreiravaz/.gemini/antigravity/scratch/viralpulse-att/src/BuilderView.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# We need to find the array and remove objects with id: 56, 57, 58, 59.
# The objects are structured as:
#   {
#     id: 56,
#     category: "Builder",
#     likes: ...
#     image: ...
#     promptText: ...
#   },
# (And the last one doesn't have a trailing comma, just } followed by ]; )

# A regex to match an object starting with `{` and ending with `},` or `}` right before `];`
# Because `promptText` can contain newlines and brackets, it's safer to just truncate the array after card 55's promptText.

# Let's find card 55's end.
# We can search for `id: 55,` then find the next `}` followed by `,` or `]` at the same indentation level.
match = re.search(r'id:\s*55,.*?(?=\n\s*\},\n\s*\{\s*id:\s*56,)', content, re.DOTALL)
if match:
    # Card 55 is found. We can truncate everything after card 55's closing bracket until the `];` that closes the array.
    # Pattern: `(id: 55,.*?)\},\s*\{\s*id: 56,.*?\];` -> `\1}\n];`
    
    # Let's do it explicitly:
    pattern = r'(id:\s*55,[\s\S]*?)\n\s*\},\s*\{\s*id:\s*56,[\s\S]*?\];'
    
    new_content = re.sub(pattern, r'\1\n  }\n];', content)
    
    with open('/Users/murilohenriquemoreiravaz/.gemini/antigravity/scratch/viralpulse-att/src/BuilderView.tsx', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Removed cards 56, 57, 58, 59.")
else:
    print("Could not find the pattern to remove cards 56-59.")

