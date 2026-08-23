---
name: shopify-store-builder
description: Construire, auditer et optimiser des boutiques Shopify orientées conversion (dropshipping, e-commerce de niche, mono-produit ou marque). Utilise ce skill dès que l'utilisateur parle de Shopify, boutique en ligne, dropshipping, fiche produit, page produit, tunnel de vente, taux de conversion, AOV, upsell, thème, collections, SEO e-commerce, recherche de produit gagnant, fournisseur/AliExpress, ou publicités Meta/TikTok pour une boutique — même s'il ne demande pas explicitement "optimise ma boutique". Déclenche-le aussi quand il fournit une URL de boutique, un nom de niche, un produit à vendre, ou demande de créer/modifier des pages, du contenu ou des visuels pour un site marchand.
---

# Shopify Store Builder

Objectif : transformer une idée de niche ou une boutique existante en un site qui **vend**, pas en un site qui fait joli.

Tout ce qui suit part d'un principe : une boutique dropshipping ne se juge pas au design, elle se juge à trois chiffres — **taux de conversion**, **panier moyen (AOV)**, **coût d'acquisition (CPA)**. Chaque décision de structure, de copy ou de visuel doit se justifier par au moins l'un des trois. Si une section ne sert aucun des trois, elle dégage.

## Comment travailler

### 1. Cadrer avant de produire

Ne jamais commencer à écrire des pages sans ces informations. Si elles manquent, les demander en une seule fois (pas au compte-gouttes) :

- **Produit / niche** et prix de vente cible
- **Coût produit rendu** (produit + livraison fournisseur) → pour vérifier les marges
- **Cible** : qui achète, quel problème, quel déclencheur d'achat
- **Marché** : France, Europe, autre — ça change le légal, la devise, les délais
- **Canal d'acquisition** : Meta, TikTok, SEO, organique
- **État actuel** : boutique vierge, boutique existante (URL), ou refonte

Pour un projet complet, envoyer la trame `assets/brief-boutique.md` à remplir plutôt que de poser vingt questions. Si l'utilisateur ne sait pas, proposer des hypothèses chiffrées et avancer — l'attente tue plus de projets que l'imprécision.

**Vérification économique obligatoire, avant tout le reste** : prix de vente ≥ 3× le coût produit rendu. En dessous, aucune optimisation de site ne sauvera le projet, parce que le budget pub mangera la marge. Le dire franchement plutôt que de construire un site condamné.

### 2. Choisir le bon référentiel

Selon la demande, lire **le ou les fichiers concernés** dans `references/` — pas tous, seulement ce qui sert :

| Demande de l'utilisateur | Fichier à lire |
|---|---|
| Structure du site, arborescence, homepage, collections, menu | `references/structure-boutique.md` |
| Fiche produit, copywriting, offre, objections, preuves | `references/page-produit.md` |
| Design, thème, typo, couleurs, mobile, vitesse | `references/design-et-vitesse.md` |
| Audit / "ma boutique ne convertit pas" / QA avant lancement | `references/audit-conversion.md` |
| Publicités Meta/TikTok, créas, angles, budget, KPI | `references/acquisition-et-ads.md` |
| Recherche de produit, fournisseur, marges, délais | `references/produit-et-fournisseur.md` |
| SEO, blog, fiches indexables, structure d'URL | `references/seo-ecommerce.md` |
| Obligations légales FR/UE, pages obligatoires, litiges | `references/legal-france.md` |
| Modifier concrètement la boutique via les connecteurs | `references/execution-mcp.md` |

### 3. Produire

Toujours livrer du **prêt à coller**, jamais des conseils en l'air. Concrètement :

- Une page = un livrable complet (titres, textes, ordre des sections, alt d'images, CTA exacts).
- Chaque bloc de copy est accompagné d'une ligne « pourquoi ce bloc est là » — c'est ce qui permet à l'utilisateur d'itérer seul plus tard.
- Les prix, délais, garanties : jamais inventés. Utiliser ceux fournis, ou marquer `[À CONFIRMER]`.
- Quand un connecteur est disponible (Shopify, Canva, artlist), l'utiliser pour appliquer réellement les changements plutôt que de décrire ce qu'il faudrait faire. Voir `references/execution-mcp.md`.

### 4. Auto-tester avant de livrer

C'est l'étape que tout le monde saute et c'est celle qui fait la différence. Avant de rendre quoi que ce soit, passer le livrable dans la grille de `references/audit-conversion.md` et afficher le score au format :

```
Score conversion : XX/100
Points forts : ...
Corrections appliquées avant livraison : ...
Risques restants : ...
```

Si le score est inférieur à 80, corriger et repasser la grille. Ne livrer qu'au-dessus de 80. Un score annoncé sans corrections concrètes ne vaut rien — montrer ce qui a été changé.

### 5. Proposer la suite

Terminer par **une seule** prochaine action prioritaire, la plus rentable. Pas une liste de dix. Le débutant qui reçoit dix tâches n'en fait aucune.

## Règles non négociables

Ces règles existent parce que les enfreindre coûte de l'argent réel — comptes publicitaires bloqués, paiements gelés, litiges clients.

1. **Délais de livraison affichés honnêtement.** Si le fournisseur livre en 8-15 jours, écrire 8-15 jours. Mentir génère des litiges PayPal/Stripe, et une réserve sur les paiements tue la trésorerie plus vite que n'importe quel mauvais taux de conversion.
2. **Aucune allégation santé, médicale ou de perte de poids** non prouvée. C'est le premier motif de bannissement Meta et c'est illégal en France.
3. **Pas de fausses preuves** : pas de faux compteurs de stock qui se réinitialisent, pas de faux avis inventés de toutes pièces, pas de faux "12 personnes regardent ce produit". Les mécaniques d'urgence doivent être vraies (vraie promo datée, vrai stock). L'urgence fabriquée se repère et détruit la confiance.
4. **Pages légales complètes avant le premier euro de pub** (voir `references/legal-france.md`). Sans elles : pas de Stripe pérenne, pas de conformité, et un taux de conversion plombé.
5. **Prix barrés réels.** Un prix barré doit correspondre à un prix réellement pratiqué avant — sinon c'est une pratique commerciale trompeuse au sens du Code de la consommation.
6. **Jamais de marque, logo ou visuel copié** d'un concurrent ou d'un titulaire de droits. Les visuels viennent du fournisseur (avec accord), d'une banque d'images, ou sont générés/produits.

## Format de livraison par défaut

Sauf demande contraire :

- **Page ou copy** → fichier markdown dans `/mnt/user-data/outputs/`, section par section, prêt à coller dans Shopify.
- **Structure de boutique complète** → un fichier par page + un fichier `plan-boutique.md` récapitulatif.
- **Audit** → rapport scoré, classé par impact décroissant (impact × facilité), avec la correction exacte à appliquer pour chaque point.
- **Modification réelle** → passer par le connecteur Shopify, puis confirmer ce qui a été changé et donner le lien.

Rester en français, tutoiement, direct. L'utilisateur est un opérateur, pas un lecteur de blog : il veut des décisions et des livrables, pas des « il est important de ».
