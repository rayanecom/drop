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
