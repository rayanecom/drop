# Verline — sauvegarde et restauration

## Ce qui est sauvegardé

`verline/avant/` contient l'état **exact** de chaque fichier de thème avant
modification, tel que lu par l'API Admin le 2 septembre 2026.

| Fichier de sauvegarde | Fichier de thème |
|---|---|
| `avant/templates-product.json` | `templates/product.json` |
| `avant/templates-index.json` | `templates/index.json` |
| `avant/layout-theme.liquid` | `layout/theme.liquid` |

`verline/apres/` contient la version modifiée effectivement écrite.

## Thème concerné

`✅ VERLINE V5 — LE BON — PUBLIER CELUI-CI`
`gid://shopify/OnlineStoreTheme/166029000924` — non publié.

## Pourquoi il n'y a pas de thème dupliqué

La boutique est à **20 thèmes sur 20**, la limite Shopify. `themeDuplicate`
renvoie `newTheme: null` sans erreur : la duplication échoue silencieusement.
La suppression de thème est bloquée côté API, et supprimer un thème est
irréversible — je ne le fais pas sans instruction explicite.

Pour obtenir un vrai thème de secours, supprime un thème obsolète depuis
l'admin Shopify (Boutique en ligne → Thèmes). Candidats sans risque :
les trois `dreamecomacademy-shrine` en double, `AquaTerra - à publier`,
`AquaTerra - avec produits`, ou les `AquaTerra v3` à `v9` qui appartiennent
à l'ancienne boutique de chaussures.

## Restaurer un fichier

Écrire le contenu de `avant/<fichier>` dans le thème via
`themeFilesUpsert`, ou le coller dans l'éditeur de code Shopify
(Boutique en ligne → Thèmes → … → Modifier le code).
