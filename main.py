#!/usr/bin/env python3
import sys
from pathlib import Path

root = Path(sys.argv[1]) if len(sys.argv) > 1 else Path('.')
old = "https://unblockedgames6767.vercel.app/proxy.js"
new = "https://scripts.simpleanalyticscdn.com/latest.js"

for p in root.rglob("*"):
    if p.is_file() and p.suffix.lower() in (".html", ".htm"):
        text = p.read_text(encoding="utf-8", errors="ignore")
        if old in text:
            new_text = text.replace(old, new)
            # create backup
            backup = p.with_suffix(p.suffix + ".bak")
            backup.write_text(text, encoding="utf-8")
            p.write_text(new_text, encoding="utf-8")
            print(f"Updated: {p} (backup: {backup.name})")
print("Done.")