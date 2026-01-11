#!/usr/bin/env python3
"""
Simple funnel generator: reads `scripts/funnels.json` and renders `templates/funnel-template.html`
to output folders listed in the JSON. Lightweight - no dependencies.
Usage: python scripts/generate_funnels.py
"""
import json
import os
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TEMPLATE = ROOT / 'templates' / 'funnel-template.html'
CONFIG = ROOT / 'scripts' / 'funnels.json'

def render(template_text, context):
    out = template_text
    for k,v in context.items():
        out = out.replace('{{'+k+'}}', v)
    # inject patterns as a JS array
    patterns = context.get('PATTERNS_JS', '[]')
    out = out.replace('window.__F_PATTERNS = []', f'window.__F_PATTERNS = {patterns}')
    return out

def main():
    t = TEMPLATE.read_text(encoding='utf-8')
    cfg = json.loads(CONFIG.read_text(encoding='utf-8'))
    for f in cfg['funnels']:
        out_dir = ROOT / f['slug']
        out_dir.mkdir(parents=True, exist_ok=True)
        header_links = '\n'.join([f'<a href="{link[1]}">{link[0]}</a>' for link in f.get('header_links',[])])
        patterns_js = json.dumps(f.get('patterns', []))
        context = {
            'TITLE': f['title'],
            'DESCRIPTION': f.get('description',''),
            'HEADER_LINKS': header_links,
            'PATTERNS_JS': patterns_js
        }
        rendered = render(t, context)
        # ensure the placeholder JS exists to be replaced
        rendered = rendered.replace('window.__F_PATTERNS = []', f'window.__F_PATTERNS = {patterns_js}')
        out_file = out_dir / 'index.html'
        out_file.write_text(rendered, encoding='utf-8')
        print('Wrote', out_file)

if __name__ == '__main__':
    main()
