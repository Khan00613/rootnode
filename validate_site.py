import os
import re

html_files = [f for f in os.listdir('.') if f.endswith('.html')]
print(f"Total HTML files detected: {len(html_files)}")

broken_links = []
word_counts = {}

for hf in html_files:
    with open(hf, 'r', encoding='utf-8') as f:
        content = f.read()

    # Clean text to approximate body word count
    clean_text = re.sub(r'<[^>]+>', ' ', content)
    words = len(clean_text.split())
    word_counts[hf] = words

    # Strip <pre> and <code> blocks before checking links
    no_code = re.sub(r'<pre>.*?</pre>', '', content, flags=re.DOTALL)
    no_code = re.sub(r'<code>.*?</code>', '', no_code, flags=re.DOTALL)

    # Find internal href targets in actual anchor and link tags
    hrefs = re.findall(r'<(?:a|link)[^>]+href=["\']([^"\'#?]+)', no_code)
    for target in hrefs:
        if target and not target.startswith('http') and not target.startswith('mailto:') and not target.startswith('data:'):
            if not os.path.exists(target):
                broken_links.append((hf, target))

print("\n--- Word Counts ---")
for f in sorted(word_counts.keys()):
    print(f"{f}: {word_counts[f]} words")

print("\n--- Link Resolution ---")
if broken_links:
    print(f"Found {len(broken_links)} broken links:")
    for src, tgt in broken_links:
        print(f"  In {src} -> {tgt}")
else:
    print("Zero broken internal links found! All targets exist on disk.")
