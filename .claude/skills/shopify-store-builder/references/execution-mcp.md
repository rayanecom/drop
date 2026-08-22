# Exécution via les connecteurs

Ce qui distingue un conseil d'un résultat : appliquer réellement les changements. Quand les connecteurs sont disponibles, les utiliser plutôt que de décrire ce qu'il faudrait faire à la main.

## Connecteur Shopify

Vérifier d'abord quels outils sont chargés (recherche d'outils sur « shopify »), puis se repérer avec `get-shop-info` avant toute modification.

**Ce qui se fait directement** :

| Tâche | Outil |
|---|---|
| Contexte boutique, devise, domaine | `get-shop-info` |
| Créer / modifier un produit, prix, description, images, variantes | `create-product`, `update-product` |
| Lire une fiche existante avant de l'améliorer | `get-product` |
| Créer et publier une collection | `create-collection`, `update-collection`, `add-to-collection` |
| Publier / dépublier en masse | `bulk-update-product-status` |
| Stock | `get-inventory-levels`, `set-inventory` |
| Code promo en pourcentage | `create-discount` |
| Commandes et clients | `list-orders`, `get-order`, `list-customers` |
| Analyse de ventes | `run-analytics-query` |
| Tout le reste (pages, menus, métachamps, thème, SEO) | `graphql_query` / `graphql_mutation` |

**Règles de travail** :

1. **Lire avant d'écrire.** Toujours récupérer l'état actuel (`get-product`, `graphql_query`) avant de modifier — sinon on écrase du contenu que l'utilisateur avait travaillé.
2. **Vérifier le schéma** avec `graphql_schema` et valider avec `validate_graphql_codeblocks` avant d'exécuter une mutation. Les champs de l'API Admin changent d'une version à l'autre ; inventer un champ fait échouer la mutation.
3. **Modification en masse : demander confirmation.** Changer un produit est réversible mentalement ; en changer quarante ne l'est pas. Annoncer la portée exacte avant d'exécuter.
4. **Ne jamais supprimer** un produit, une collection ou une page sans demande explicite. Dépublier plutôt que supprimer.
5. **Confirmer après coup** : ce qui a été modifié, où le voir, et ce qui reste à faire côté thème (ce qui n'est pas modifiable par l'API).
6. **Ne pas toucher au thème sans prévenir.** Recommander une duplication du thème avant toute modification de code, et privilégier les réglages de l'éditeur quand c'est possible.

**Ce que l'API ne fait pas** : la configuration du paiement, les moyens de paiement, l'installation d'applications, les réglages de transporteurs. Pour ceux-là, donner des instructions pas à pas dans l'interface Shopify.

## Connecteur Canva

Pour tout ce qui est visuel de marque, quand il est disponible :

- Bannières de section, visuels de collection, infographies bénéfices, tableaux comparatifs, guides des tailles, visuels de créas publicitaires
- Travailler à partir d'un modèle de marque pour garder la cohérence entre tous les visuels — c'est ce qui fait la différence entre une boutique crédible et une boutique bricolée
- Exporter en PNG ou WebP, puis compresser avant de téléverser sur Shopify

## Connecteur artlist

Pour les images et vidéos génératives quand les visuels fournisseur sont inutilisables : mises en situation, plans d'ambiance, voix off de créa publicitaire.

Deux limites à respecter : ne jamais générer de visuel qui laisse croire à un résultat produit qui n'existe pas (c'est trompeur et ça génère des remboursements), et vérifier que les droits d'usage couvrent la publicité payante.

## Ordre de travail type sur une boutique réelle

1. `get-shop-info` + inventaire des produits et collections existants
2. Audit avec la grille de `audit-conversion.md` → score et priorités
3. Corrections à fort impact d'abord : fiche du produit star, réassurance, pages légales
4. Structure : collections, menu, homepage
5. Visuels manquants (Canva / artlist)
6. Repasser la grille, montrer le score avant/après
7. Une seule prochaine action prioritaire
