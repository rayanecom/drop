# Design et vitesse

## Thème

Un thème gratuit bien configuré convertit mieux qu'un thème payant mal configuré. **Dawn** suffit pour démarrer et il est rapide. Les thèmes payants (Impulse, Prestige, Shrine, Warehouse) apportent des sections toutes faites — utile pour gagner du temps, pas pour gagner en conversion.

Ce qui compte, dans l'ordre : vitesse, hiérarchie visuelle, cohérence. Pas le nombre de sections disponibles.

## Système visuel

**Couleurs** — trois, pas plus :
- Une couleur de marque (identité, header, éléments graphiques)
- Une couleur d'action, réservée **exclusivement** aux CTA. Si le bouton d'achat a la même couleur que le reste du site, il disparaît. Contraste fort avec l'arrière-plan.
- Un neutre pour les textes et fonds (gris très foncé plutôt que noir pur, blanc cassé plutôt que blanc pur — plus doux à l'écran)

**Typographie** — deux polices maximum, ou une seule en deux graisses. Corps de texte à 16 px minimum sur mobile (en dessous, c'est illisible et Google le pénalise). Interligne 1,5. Titres nettement plus gros que le corps : une hiérarchie molle donne une page molle.

**Espacement** — la respiration est ce qui sépare une boutique crédible d'une boutique bricolée. Espacement vertical généreux entre les sections (48 à 80 px sur mobile), marges latérales de 16 à 20 px minimum.

**Images** — toutes au même format et sur le même type de fond. Un mélange de photos fournisseur détourées, de captures compressées et de photos lifestyle en tons différents ruine instantanément la crédibilité. Si les visuels sources sont hétérogènes, uniformiser le fond et la colorimétrie avant de les publier.

**Logo** — simple, lisible en 40 px de haut, format PNG transparent. Un logo compliqué est un logo illisible sur mobile.

## Mobile d'abord

Concevoir et valider à 390 px de large. Le desktop se contrôle après, jamais l'inverse.

Points de contrôle mobile :
- Le prix et le bouton d'achat sont visibles sans scroller sur la fiche produit
- Bouton d'ajout au panier collant dès que le principal quitte l'écran
- Zones tactiles ≥ 44 px
- Pas de texte incrusté dans les images (illisible en petit, et non traduisible)
- Popups : une seule, jamais à l'ouverture immédiate — après 20 secondes ou à l'intention de sortie, avec une croix de fermeture visible. Une popup en pleine face à l'arrivée fait perdre plus de ventes qu'elle n'en capte d'e-mails (et Google pénalise l'interstitiel intrusif)
- Menu burger accessible d'une seule main

## Vitesse

Sur mobile en 4G, chaque seconde de chargement supplémentaire coûte des ventes — et sur trafic payant, ça coûte deux fois : en conversion perdue et en coût par clic augmenté.

Objectifs : **LCP < 2,5 s**, poids de page < 2 Mo, moins de 12 applications installées.

Leviers, du plus rentable au moins rentable :

1. **Images** — la première cause de lenteur. Compresser avant l'upload, largeur maximale 1600 px, format WebP. Chargement différé pour tout ce qui est sous la ligne de flottaison, chargement prioritaire pour l'image du hero.
2. **Applications** — chaque app injecte du script sur toutes les pages, même celles où elle ne sert à rien. Désinstaller (pas juste désactiver : le code reste souvent dans le thème) tout ce qui n'a pas prouvé son utilité en 30 jours.
3. **Polices** — deux au maximum, hébergées par Shopify, avec `font-display: swap`.
4. **Sliders et carrousels animés** dans le hero — lourds, et ils divisent l'attention. Une image fixe convertit mieux.
5. **Vidéos** — jamais en lecture automatique en pleine largeur sur mobile. Utiliser une image d'aperçu cliquable.
6. **Scripts de suivi** — un pixel par plateforme réellement utilisée. Les doublons de pixels faussent aussi les données d'attribution.

Mesurer avec PageSpeed Insights en mode mobile, pas avec le score Shopify (qui est une moyenne peu exploitable). Corriger d'abord ce qui touche le LCP.

## Pile d'applications recommandée (minimale)

| Besoin | Choix | Pourquoi |
|---|---|---|
| Avis | Judge.me ou Loox | Import fournisseur + collecte photo |
| Paliers de quantité / bundles | app de bundle légère | Levier AOV n°1 |
| Upsell post-achat | app d'offre post-achat | Marge additionnelle sans risque |
| E-mail / panier abandonné | Shopify Email ou Klaviyo | Récupération de 5 à 10 % des paniers |
| Suivi de commande | page de suivi de marque | Réduit fortement les tickets support |

Tout le reste attend d'avoir des ventes. Une boutique à 20 applications avant sa première vente est une boutique lente sans données.
