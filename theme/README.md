# Archive du thème

Miroir des fichiers écrits sur le thème Shopify, pour qu'un `git diff` soit possible
entre deux chantiers. **Ce n'est pas la source** : Shopify reste la référence, et
l'éditeur de thème peut réécrire ces fichiers sans prévenir.

Règle : après toute écriture via `themeFilesUpsert`, recopier ici la version exacte
qui a été envoyée. Un miroir désynchronisé est pire que pas de miroir.

## `templates/index.json`

Page d'accueil de **`Estran v10 - ouvre-huitres`** (thème non publié,
`gid://shopify/OnlineStoreTheme/165902418140`), dupliqué depuis `AquaTerra v9 - lagon
& sable` pour hériter de la palette.

Huit sections : hero, bandeau défilant, « pourquoi ça dérape », le produit, le geste
en cinq temps, réassurance, FAQ, contact.

Ce qui a été **supprimé** de la version v9, et pourquoi : guide des tailles (pointures),
détails techniques (mesh, semelle), usages (plage, kayak), tableau comparatif et
chronologie de livraison. Tous décrivaient une chaussure, ou annonçaient des délais et
des spécifications non vérifiés. Ils ne seront réécrits qu'une fois les caractéristiques
réelles du produit connues.

Mesuré au banc avant livraison : `node tools/rendu/mesure-accueil.js <dossier>` —
aucun débordement horizontal, aucun contenu rogné, aucune cible tactile sous 44 px,
aucun texte sous 16 px, à 320 / 375 / 414 / 1280 px.
