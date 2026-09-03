#!/usr/bin/env python3
"""
Assemble une page complete a partir du custom_liquid reel des sections du theme,
avec le Liquid neutralise, pour la rendre dans le Chromium local.

Ce n'est pas le storefront : les sections qui ne sont pas du custom_liquid
(le bloc d'achat natif du theme) ne sont pas rendues. Mais tout ce qui a ete
ecrit a la main pour Verline l'est, et c'est la que vivent les bugs.
"""
import json, re, sys, base64

PLACEHOLDER = ("data:image/svg+xml;base64," + base64.b64encode(
    b'<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600">'
    b'<rect width="600" height="600" fill="#EFEAE1"/>'
    b'<text x="300" y="300" font-family="sans-serif" font-size="26" fill="#1F3D2B"'
    b' text-anchor="middle">visuel produit</text></svg>').decode())

def neutraliser(t):
    t = re.sub(r'\{%-?\s*(comment|schema)\s*-?%\}.*?\{%-?\s*end\1\s*-?%\}', '', t, flags=re.S)
    # Resoudre les {% assign x = 'v' %} litteraux AVANT de tout effacer : sans ca
    # le banc perd des valeurs qui sont bien rendues sur le site (largeur d'une
    # barre, note affichee), et il ment sur ce qui est livre.
    for nom, val in re.findall(r"\{%-?\s*assign\s+(\w+)\s*=\s*'([^']*)'\s*-?%\}", t):
        t = re.sub(r'\{\{\s*' + nom + r'\s*\}\}', val, t)
    for nom, val in re.findall(r'\{%-?\s*assign\s+(\w+)\s*=\s*(\d+)\s*-?%\}', t):
        t = re.sub(r'\{\{\s*' + nom + r'\s*\}\}', val, t)
    t = re.sub(r'\{%-?\s*(assign|liquid|render|include|form|endform|paginate|endpaginate)[^%]*?-?%\}', '', t, flags=re.S)
    # une seule iteration de boucle
    t = re.sub(r'\{%-?\s*for\s[^%]*?-?%\}', '', t)
    t = re.sub(r'\{%-?\s*endfor\s*-?%\}', '', t)
    # conditions : on garde la branche vraie
    t = re.sub(r'\{%-?\s*(else|elsif[^%]*)\s*-?%\}.*?(?=\{%-?\s*endif)', '', t, flags=re.S)
    t = re.sub(r'\{%-?\s*(if|unless|case|when)[^%]*?-?%\}', '', t)
    t = re.sub(r'\{%-?\s*end(if|unless|case)\s*-?%\}', '', t)
    # sorties
    t = re.sub(r'\{\{[^}]*image_url[^}]*\}\}', PLACEHOLDER, t)
    t = re.sub(r'\{\{[^}]*payment_type_svg_tag[^}]*\}\}',
               '<svg width="38" height="24" viewBox="0 0 38 24"><rect width="38" height="24" rx="3" fill="#EFEAE1" stroke="#1F3D2B" stroke-opacity=".2"/></svg>', t)
    t = re.sub(r'\{\{\s*(?:product\.price|p\.price)[^}]*money[^}]*\}\}', '29,90&nbsp;€', t)
    t = re.sub(r'\{\{\s*5290[^}]*\}\}', '52,90&nbsp;€', t)
    t = re.sub(r'\{\{\s*6990[^}]*\}\}', '69,90&nbsp;€', t)
    t = re.sub(r'\{\{\s*2645[^}]*\}\}', '26,45&nbsp;€', t)
    t = re.sub(r'\{\{\s*2330[^}]*\}\}', '23,30&nbsp;€', t)
    t = re.sub(r'\{\{\s*690[^}]*\}\}',  '6,90&nbsp;€', t)
    t = re.sub(r'\{\{\s*1980[^}]*\}\}', '19,80&nbsp;€', t)
    t = re.sub(r'\{\{[^}]*times:\s*2[^}]*\}\}', '59,80&nbsp;€', t)
    t = re.sub(r'\{\{[^}]*times:\s*3[^}]*\}\}', '89,70&nbsp;€', t)
    t = re.sub(r'\{\{[^}]*\}\}', '', t)
    t = re.sub(r'\{%[^%]*%\}', '', t)
    return t

def sections_de(fichier, cles=None, blocs=False):
    raw = open(fichier, encoding='utf-8').read()
    d = json.loads(raw[raw.index('{', raw.index('*/')):])
    out = []
    for k in d['order']:
        s = d['sections'][k]
        if s.get('disabled'): continue
        if cles and k not in cles: continue
        if blocs:
            for b in s.get('block_order', []):
                v = s['blocks'][b].get('settings', {}).get('custom_liquid')
                if not isinstance(v, str) or not v.strip(): continue
                m = re.search(r"render\s+'([a-z-]+)'", v)
                if m:  # un bloc qui delegue a un snippet : on charge le snippet reel
                    try: v = open(f'verline/apres/snippets-{m.group(1)}.liquid', encoding='utf-8').read()
                    except FileNotFoundError: continue
                out.append((k+'.'+b, v))
        else:
            v = s.get('settings', {}).get('custom_liquid')
            if isinstance(v, str) and v.strip(): out.append((k, v))
            elif s['type'] == 'verline-press-marquee':
                p = open('verline/apres/sections-verline-press-marquee.liquid', encoding='utf-8').read()
                out.append((k, p))
    return out

GLOBAUX = ''.join(
    neutraliser(open(f, encoding='utf-8').read())
    for f in ['verline/apres/snippets-verline-lisibilite.liquid',
              'verline/apres/snippets-verline-visuels.liquid'])

GABARIT = """<!doctype html><html lang=fr><head><meta charset=utf-8>
<meta name=viewport content="width=device-width,initial-scale=1">
<link rel=stylesheet href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&family=DM+Sans:wght@400;500;700;800&display=swap">
<style>
 *{box-sizing:border-box}
 body{margin:0;background:#FBF9F5;color:#1A1A18;font-family:"DM Sans",system-ui,sans-serif}
 .page-width{width:min(1200px,100%);margin-inline:auto}
 %COL%
 .rp-tag{font-size:10px!important;position:sticky;top:0;z-index:99;background:#1F3D2B;color:#FBF9F5;font:700 10px/1 "DM Sans",sans-serif;
         letter-spacing:.14em;text-transform:uppercase;padding:6px 10px}
</style>%GLOBAUX%</head><body>%CORPS%</body></html>"""

def ecrire(nom, blocs, colonne=False):
    corps = []
    for cle, src in blocs:
        corps.append(f'<div class="rp-tag">{cle}</div>')
        corps.append(('<div class="col">' if colonne else '') + neutraliser(src) + ('</div>' if colonne else ''))
    col = ('.col{width:min(620px,100%);margin-inline:auto;padding:0 16px}'
           if colonne else '')
    html = GABARIT.replace('%COL%', col).replace('%GLOBAUX%', GLOBAUX).replace('%CORPS%', '\n'.join(corps))
    p = f'tools/rendu/pages/{nom}.html'
    open(p, 'w', encoding='utf-8').write(html)
    print(f"  {p}  ({len(html)//1024} Ko, {len(blocs)} bloc(s))")

ecrire('produit-blocs-achat', sections_de('verline/apres/templates-product.json', blocs=True), colonne=True)
ecrire('produit-sections',    sections_de('verline/apres/templates-product.json'))
ecrire('accueil',             sections_de('verline/apres/templates-index.json'))
