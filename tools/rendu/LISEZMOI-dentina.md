# Page produit Dentina — banc de rendu

`dentina.html` est la page complète, autonome, avec les polices en local dans `fonts/`.
C'est **la source de vérité du design** : ce qui part sur Shopify doit en être la
transcription exacte en sections Liquid.

## Mesurer

```bash
node tools/rendu/mesure-dentina.js   # 320 / 375 / 414 / 1280 px
node tools/rendu/flottaison.js       # ligne de flottaison sur 3 iPhone
node tools/rendu/crops.js            # captures par section
node tools/rendu/loc.js              # localise tout texte sous 16 px
```

## Dernier relevé — 2026-09-04

| Largeur | Hauteur | Débordement X | Cibles < 44 px | Texte < 16 px hors étiquettes |
|---|---|---|---|---|
| 320 px | 9 606 px | non | aucune | aucun |
| 375 px | 9 256 px | non | aucune | aucun |
| 414 px | 9 083 px | non | aucune | aucun |
| 1280 px | 7 978 px | non | aucune | aucun |

Ligne de flottaison : titre + accroche + **bouton entier** visibles dès 375 × 667
(iPhone SE), le plus petit écran ciblé.

Deux corrections appliquées après la première mesure : `.offre__det` 15 → 16 px
(c'est le texte sur lequel le client décide) et la mention légale du pied 14 → 16 px.

**La règle : après toute retouche du HTML, relancer les quatre scripts.** Ce qui est
livré doit être exactement ce qui a été mesuré.

## Ce qui reste à produire

Toutes les images sont des placeholders marqués `PHOTO À PRODUIRE`, et les mentions
`Preuve à produire` / `À mesurer` / `À confirmer` sont volontaires : elles marquent
l'endroit exact où une donnée manque. **Aucune ne doit être supprimée sans être
remplacée par une donnée réelle.**
