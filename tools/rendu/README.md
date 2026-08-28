# Banc de rendu

Le storefront est injoignable depuis cet environnement : impossible de vérifier
un rendu en chargeant la page. Ce banc contourne le problème — il rend le
**bloc seul** dans le Chromium local, le mesure et le photographie.

Ça ne remplace pas un œil sur le vrai site, mais ça attrape la classe de bugs
qui a coûté le plus cher ici : contenu rogné, débordement horizontal, bloc
trois fois trop haut sur mobile.

## Utilisation

```bash
npm install playwright        # une fois
node tools/rendu/mesure.js
```

Chromium est préinstallé dans `/opt/pw-browsers` et sa version ne correspond
pas à celle que le paquet npm attend : `mesure.js` passe donc un
`executablePath` explicite. Ne pas lancer `npx playwright install`.

## Ce que ça sort

Pour 320, 375, 414 et 1280 px de large :

- largeur × hauteur réelles du bloc
- `clipped` — vrai si `scrollHeight` dépasse la hauteur rendue, c'est-à-dire si
  du contenu est coupé
- `overflowX` — vrai si la page déborde latéralement
- une capture PNG par largeur

## Adapter à un autre bloc

Coller le markup et le `<style>` du snippet dans le `<template>` de `banc.html`,
avec des prix en dur. `.col` simule la colonne produit : pleine largeur sur
téléphone, 620 px au maximum sur ordinateur.

**La règle** : ce qui est livré doit être exactement ce qui a été mesuré. Après
toute retouche dans le snippet, resynchroniser le banc et remesurer.

## Banc « galerie fiche produit » — `banc-galerie.html`

Deuxième banc, dédié à la colonne média de la fiche produit (thème Verline v3).
Il reproduit le DOM exact rendu par `product-media-gallery.liquid` +
`product-thumbnail.liquid`, charge le **vrai `base.css` du thème**, et compare
l'état en ligne (`avant`) au bloc `VERLINE-V3-COMPACT-PRODUCT` livré (`après`).

`base.css` n'est pas versionné — il pèse 364 Ko et appartient au thème. Le
récupérer avant de lancer le banc : l'API Admin renvoie les gros fichiers sous
forme d'URL signée (`OnlineStoreThemeFileBodyUrl`), servie depuis
`shopify-shop-assets.storage.googleapis.com`, que le proxy sortant laisse passer.

```graphql
query($id: ID!) {
  theme(id: $id) {
    files(first: 1, filenames: ["assets/base.css"]) {
      nodes { body { ... on OnlineStoreThemeFileBodyUrl { url } } }
    }
  }
}
```

Puis `curl -o tools/rendu/base.css "<url>"` (l'URL expire en 5 minutes).

```bash
npm install playwright
node tools/rendu/mesure-galerie.js
```

### Ce que ça mesure

- `logo_image` — blanc entre le bas de l'en-tête et le haut de l'image
- `image_texte` — blanc entre le bas de l'image et le premier texte
- `slide1` / `colonne` / `debord_droite` — largeur de la vue : détecte le
  « liseré » de la vue suivante qui dépasse à droite
- `hauteurs_min_max` — hauteur de chaque vue. **Deux valeurs différentes = piège** :
  le `<ul>` de la galerie est un flex, il prend la hauteur de la plus grande
  image et laisse du vide sous les plus petites.
- `overflowX`

### Le piège attrapé ici

Les 6 visuels du gel Verline ne sont pas au même format : 4 en 1254 × 1254,
2 en 1125 × 1398. La piste faisait donc 431 px de haut pour une image de 347 px
— 84 px de vide sous la première vue, avant même la rangée de puces. Aucun
réglage de thème ne corrige ça : il faut imposer un ratio unique en CSS.
