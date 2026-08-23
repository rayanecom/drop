---
name: design-remarquable
description: Exécuter une page pour qu'elle produise un effet immédiat — hiérarchie, rythme d'espacement, échelle typographique, traitement des images, profondeur, mouvement, finitions. Utilise ce skill quand l'utilisateur veut un site « magnifique », « époustouflant », « waouh », « haut de gamme », « premium », dit que sa page « fait cheap », « fait amateur », « manque de quelque chose », ou quand une direction artistique est choisie et qu'il faut maintenant la rendre. C'est l'aval de `direction-artistique` : celui-ci choisit le parti pris, celui-là le fait exister à l'écran.
---

Tu exécutes. La direction artistique a déjà été choisie — si ce n'est pas le cas, charge
`direction-artistique` d'abord, sinon tu vas décorer.

## Le fait qui doit corriger l'intuition

Deux résultats de recherche, à connaître avant de dessiner quoi que ce soit :

- **Le jugement esthétique se forme en 50 millisecondes** et reste stable ensuite
  (Lindgaard et coll., 2006).
- Dans cette fenêtre, deux facteurs décident : la **complexité visuelle** et la
  **prototypicalité** — à quel point la page ressemble à ce qu'on attend de sa catégorie.
  Les pages jugées les plus belles sont celles à **faible complexité** et **forte
  prototypicalité** (étude Google / Université de Bâle, 2012).

Conséquence, et c'est le cœur du métier : **une mise en page inhabituelle ne produit pas
l'effet waouh, elle produit de la friction.** Le visiteur qui ne reconnaît pas où il est
en un dixième de seconde ne trouve pas ça audacieux, il trouve ça pénible.

Donc la règle : **structure familière, exécution singulière.**

| Ce qui doit rester conventionnel | Ce qui doit être singulier |
|---|---|
| Emplacement du logo, de la navigation, du panier | La typographie et son échelle |
| Ordre des sections d'une fiche produit | La palette et son usage |
| Position du prix et du bouton d'achat | Le traitement des images |
| Comportement au défilement | Le rythme des espacements |
| Codes du panier et du paiement | Les détails de finition |

Un site remarquable n'est pas un site qu'on ne comprend pas. C'est un site qu'on comprend
instantanément et qui, dans ce même instant, ne ressemble à aucun autre.

## Les cinq leviers qui font la différence

Lis `references/execution.md` pour le détail chiffré. En résumé :

### 1. L'échelle typographique — le levier le plus rentable

Le générique vient presque toujours d'un manque de **contraste de taille**. Un titre à
24 px au-dessus d'un texte à 16 px ne hiérarchise rien. Il faut un rapport franc :
titre principal 2,5 à 3,5 fois le corps de texte.

Une seule famille suffit si elle a un axe de largeur ou une vraie amplitude de graisse.
Deux familles au maximum. Trois, c'est du bruit.

### 2. Le rythme d'espacement — ce qui sépare le cher du bon marché

Le marqueur numéro un du site amateur est l'espacement **uniforme** : tout à 20 px.
L'espace doit être proportionnel à la séparation sémantique.

Une échelle géométrique, pas arbitraire : `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128`.
Et l'espace **entre** deux blocs doit toujours dépasser nettement l'espace **dans** un bloc,
sinon l'œil ne sait pas ce qui va avec quoi.

Les respirations généreuses en haut et en bas de section sont ce qui lit comme « premium ».
C'est aussi la modification la moins coûteuse à faire.

### 3. Le traitement des images

Une galerie dont les images n'ont ni le même cadrage, ni la même lumière, ni le même fond
détruit toute impression de marque, quelle que soit la qualité du code. Un ratio unique,
une lumière constante, un fond constant.

### 4. La profondeur — et pourquoi les ombres échouent

L'ombre portée grise sous une carte blanche est le cliché par excellence. La profondeur se
construit mieux par **la valeur** : superposer des fonds légèrement différents de la même
famille chromatique, séparés par un filet de 1 px à faible opacité. C'est ce qui donne l'air
imprimé plutôt que l'air « thème gratuit ».

### 5. Le mouvement — deux gestes, pas dix

Une animation ne doit jamais annoncer qu'elle est là. Durées de 120 à 200 ms,
`ease-out` pour tout ce qui entre. Deux gestes suffisent sur une page entière : l'état
pressé du bouton, et l'ouverture d'un contenu.

**`prefers-reduced-motion` est obligatoire**, pas optionnel.

## Ce qui coûte l'effet waouh, immédiatement

Un seul de ces éléments suffit à faire basculer une page dans le générique :

- dégradé violet-bleu, ou tout dégradé sur du texte ;
- ombres portées grises multiples ;
- arrondis de 12 px partout, y compris là où ça n'a pas de sens ;
- emojis en guise de pictogrammes ;
- rangée de badges de réassurance en icônes de trait fin ;
- compte à rebours, « plus que 3 en stock », prix barré fictif ;
- texte centré sur plus de deux lignes ;
- photo assombrie par un voile noir avec un titre blanc dessus ;
- Poppins, Montserrat, Inter par défaut.

## La performance fait partie du beau

Une page magnifique qui apparaît en quatre secondes est jugée moche : le jugement se forme
avant que le contenu soit là. Les seuils publiés par Google, mesurés au **75ᵉ centile** des
visites réelles :

| Métrique | Seuil « bon » |
|---|---|
| LCP — apparition du plus gros élément | **≤ 2,5 s** |
| INP — réactivité à l'interaction | **≤ 200 ms** |
| CLS — décalage de mise en page | **≤ 0,1** |

Le CLS est le plus lié à l'impression de qualité : une page qui saute pendant le chargement
paraît bricolée quoi qu'il y ait dessus. Réserver les dimensions des images, toujours.

## Vérifier, sinon ça ne compte pas

Le storefront est injoignable depuis cet environnement. Passer tout bloc au banc :
`tools/rendu/` mesure à 320, 375, 414 et 1280 px et sort des captures.

Aucune livraison sans : zéro débordement horizontal, zéro contenu rogné, cibles tactiles
≥ 44 px, corps de texte ≥ 16 px, contrastes vérifiés au ratio.

Sources et références complètes dans `references/sources.md`.
