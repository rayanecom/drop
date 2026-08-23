# -*- coding: utf-8 -*-
"""Estran - source unique de la geometrie du lettrage.
Grotesque condensee monolineaire tracee a la main.
Hauteur de capitale 100, fut 18, terminaisons coupees d'equerre.
E T R A N : polygones pleins (pieds plats garantis sur la ligne de base).
S         : bande tracee (stroke 18) - ses terminaux tombent d'equerre car
            les tangentes aux extremites sont verticales.
Tous les SVG derivent d'ici : aucune divergence possible entre versions."""
import os
OUT = "/home/user/drop/marque"
ENCRE, MER, IVOIRE = "#0B2A31", "#0C4A56", "#FCFAF7"

# --- Lettres pleines ---------------------------------------------------------
# Detail signature du E : bras 52 / 44 / 58. Ils s'allongent vers le bas,
# comme la greve qui s'elargit quand la mer se retire.
FILL = {
 "E": (58, "M0,0 H52 V18 H18 V41 H44 V59 H18 V82 H58 V100 H0 Z"),
 "T": (54, "M0,0 H54 V18 H36 V100 H18 V18 H0 Z"),
 "N": (60, "M0,0 H18 L42,57 V0 H60 V100 H42 L18,43 V100 H0 Z"),
 "R": (57, "M0,0 H33 C45,0 53,9 53,26 C53,43 45,52 33,52 L57,100 H38 L18,54 V100 H0 Z"
            "M18,18 H28 C33,18 35,21 35,26 C35,31 33,34 28,34 H18 Z"),
 "A": (66, "M0,100 L31,0 H35 L66,100 H51 L44,78 H22 L15,100 Z"
            "M33,42 L39,62 H27 Z"),
}
# --- S : bande tracee --------------------------------------------------------
S_LARGEUR = 58
S_PATH = ("M49,26 C49,15 40,9 29,9 C18,9 9,15 9,27 C9,38 17,43 29,46 "
          "C41,49 49,55 49,66 C49,79 40,91 29,91 C18,91 9,85 9,74")

# Approches optiques. Resserrees apres T (vide sous la barre) et autour du A
# et du N, dont les diagonales ouvrent deja l'espace en haut.
APPROCHES = {"ES":16, "ST":16, "TR":14, "RA":12, "AN":12}

def lettrage(couleur):
    mot, x, out = "ESTRAN", 0.0, []
    for i, ch in enumerate(mot):
        if ch == "S":
            w = S_LARGEUR
            out.append(f'<path d="{S_PATH}" transform="translate({x:g},0)" fill="none" '
                       f'stroke="{couleur}" stroke-width="18" stroke-linecap="butt"/>')
        else:
            w, d = FILL[ch]
            out.append(f'<path d="{d}" transform="translate({x:g},0)" fill="{couleur}" '
                       f'fill-rule="evenodd"/>')
        x += w + (APPROCHES[mot[i]+mot[i+1]] if i < len(mot)-1 else 0)
    return x, "\n    ".join(out)

LARGEUR, _ = lettrage(ENCRE)

# --- Symbole : le E pousse sur l'axe de largeur, 100x100, fut 22 -------------
# Meme detail signature, amplifie : bras 86 / 64 / 100.
def symbole(fut=22):
    """Le E pousse sur l'axe de largeur : 100x100. Bras 86 / 64 / 100.
    fut = epaisseur du trait ; le bras median reste centre sur la hauteur."""
    h = fut / 2
    return (f"M0,0 H86 V{fut} H{fut} V{50-h:g} H64 V{50+h:g} H{fut} "
            f"V{100-fut} H100 V100 H0 Z")

def ecrire(nom, contenu):
    p = os.path.join(OUT, nom)
    open(p, "w", encoding="utf-8").write(contenu)
    print(f"{nom:38} {os.path.getsize(p):5} o")

def svg_lettrage(couleur, note):
    _, corps = lettrage(couleur)
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {LARGEUR:g} 100" '
            f'width="{LARGEUR:g}" height="100" role="img" aria-label="Estran">\n'
            f'  <title>Estran</title>\n  <!-- {note} -->\n    {corps}\n</svg>\n')

ecrire("estran-logo-horizontal.svg",
       svg_lettrage(ENCRE, "Lettrage original trace a la main. Cap 100, fut 18. Encre #0B2A31 sur fond clair."))
ecrire("estran-logo-horizontal-inverse.svg",
       svg_lettrage(IVOIRE, "Version inverse : ivoire #FCFAF7 sur mer profonde #0C4A56 (pied de page)."))
ecrire("estran-logo-mono.svg",
       svg_lettrage("currentColor",
       "Monochrome 1 couleur : herite de currentColor. Aucun fond, aucun degrade.\n"
       "       Facture, bon de livraison, colis, tampon, etiquette thermique."))

def svg_symbole(nom, taille, marge, fut, fond, trait, note):
    ech = (taille - 2*marge) / 100
    fond_rect = f'<rect width="{taille}" height="{taille}" fill="{fond}"/>\n  ' if fond else ''
    sym = symbole(fut)
    ecrire(nom,
f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {taille} {taille}" width="{taille}" height="{taille}" role="img" aria-label="Estran">
  <title>Estran</title>
  <!-- {note} -->
  {fond_rect}<g transform="translate({marge},{marge}) scale({ech:g})"><path d="{sym}" fill="{trait}"/></g>
</svg>
''')

# Avatar : les reseaux rognent en cercle. Cercle inscrit r=128 -> carre sur
# inscrit de 181 (37,5..218,5). Le symbole tient dans 58..198 : sauf en rond.
svg_symbole("estran-logo-compact.svg", 256, 58, 22, MER, IVOIRE,
            "Avatar Meta / TikTok. Symbole loge dans le carre inscrit au cercle de rognage :\n       rien n'est coupe, ni en carre ni en rond.")
svg_symbole("estran-logo-compact-mono.svg", 256, 58, 22, None, "currentColor",
            "Symbole monochrome, sans fond : tampon, colis, marquage.")
svg_symbole("estran-favicon.svg", 32, 3, 24, MER, IVOIRE,
            "Favicon. Marge reduite a 3/32 et fut porte a 24 : a 16 px les trois barres\n       doivent rester separees, un fut de 22 les refermerait.")

print(f"\nLettrage : {LARGEUR:g} x 100  (ratio {LARGEUR/100:.2f}:1)")
