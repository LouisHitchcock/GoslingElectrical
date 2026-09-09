import json
import os

# Rebuilds images.json from the contents of the gallery folder.
#
# Captions are the valuable part of this file, so this script merges rather than
# overwrites: files already listed keep their caption, newly added files are
# appended with an empty one, and entries whose image has been deleted are
# dropped. It is safe to run as many times as you like.

image_folder = 'grid-gallery-images'
json_file = 'images.json'
extensions = ('.jpg', '.jpeg', '.png', '.gif', '.webp')

# Images currently on disk (top level only, so the uncompressed originals are ignored)
on_disk = [
    f for f in os.listdir(image_folder)
    if os.path.isfile(os.path.join(image_folder, f))
    and f.lower().endswith(extensions)
]

# Captions from the existing file. Older versions of this script wrote a plain
# list of filenames, so both shapes are accepted.
captions = {}
if os.path.exists(json_file):
    with open(json_file, encoding='utf-8') as f:
        try:
            existing = json.load(f)
        except json.JSONDecodeError:
            existing = []
    for item in existing:
        if isinstance(item, str):
            captions[item] = ''
        else:
            captions[item['file']] = item.get('caption', '')

# Keep the existing order, then append anything new alphabetically
ordered = [f for f in captions if f in on_disk]
ordered += sorted(f for f in on_disk if f not in captions)

entries = [{'file': f, 'caption': captions.get(f, '')} for f in ordered]

# Written by hand rather than json.dump to keep one image per line
lines = ['[']
for i, entry in enumerate(entries):
    comma = ',' if i < len(entries) - 1 else ''
    lines.append('    {"file": %s, "caption": %s}%s' % (
        json.dumps(entry['file'], ensure_ascii=False),
        json.dumps(entry['caption'], ensure_ascii=False),
        comma,
    ))
lines.append(']')

with open(json_file, 'w', encoding='utf-8', newline='\n') as f:
    f.write('\n'.join(lines) + '\n')

added = len([f for f in on_disk if f not in captions])
removed = len([f for f in captions if f not in on_disk])
kept = len([e for e in entries if e['caption']])
print('Updated %s with %d images (%d new, %d removed, %d captions preserved).'
      % (json_file, len(entries), added, removed, kept))
