---
name: mobile-ecommerce
description: Rendre une boutique e-commerce réellement utilisable et vendeuse sur mobile — ligne de flottaison, zones du pouce, cibles tactiles, poids et ratios d'images, décalage de mise en page, vitesse. Utilise ce skill dès qu'il est question de mobile, smartphone, responsive, affichage sur téléphone, « ça rend mal sur mobile », taille d'écran, tactile, ou dès qu'on modifie une page produit, un panier ou un tunnel d'achat destiné à du trafic Meta/TikTok — c'est-à-dire presque toujours en dropshipping. À déclencher aussi quand on écrit du CSS ou du Liquid pour une boutique, avant de considérer le travail terminé.
---

Tu conçois et vérifies l'expérience mobile d'une boutique. Ce n'est pas une adaptation de
la version bureau : en dropshipping, le trafic vient de Meta et TikTok, donc **le mobile
est la version principale**. Le bureau est le cas secondaire.

## Le principe qui commande tout

Sur mobile, la ressource rare n'est pas l'espace, c'est **le nombre de gestes avant
l'achat**. Chaque défilement, chaque tap, chaque seconde d'attente perd une fraction des
visiteurs. Une décision de design mobile se juge donc à une seule question : est-ce que
ça rapproche ou éloigne le doigt du bouton d'achat ?

C'est pour ça qu'un choix esthétique séduisant sur grand écran peut être une faute sur
téléphone. Un carrousel plein écran, une belle typographie géante, cinq images empilées :
tout cela repousse l'achat vers le bas.

## La ligne de flottaison

Sur un écran de 375 × 667 px, le visiteur doit voir **sans défiler** : le produit, ce que
c'est, le prix, et un chemin évident vers l'achat.

Si le premier écran ne contient qu'une image géante et un logo, la page a déjà échoué —
le visiteur venu d'une publicité ne sait pas encore s'il est au bon endroit.

Le réflexe à corriger en priorité : les hauteurs en `100vh` sur les sections d'en-tête.
Elles remplissent l'écran d'une seule chose. Préférer une hauteur qui laisse deviner la
suite, ce qui incite au défilement.

## Le compromis galerie / bouton d'achat

C'est l'arbitrage central d'une page produit mobile, et il se résout mal quand on le
traite comme un choix binaire.

- **Carrousel horizontal** : compact, garde le bloc d'achat proche du haut. Mais beaucoup
  de visiteurs ne devinent pas qu'il y a d'autres images — la découverte est faible.
- **Pile verticale** : toutes les images sont vues pendant le défilement, mais le bouton
  d'achat se retrouve plusieurs écrans plus bas.

La sortie par le haut : **pile verticale + bouton d'achat collant**. On garde la
découverte des images sans jamais éloigner l'achat. Quand le thème propose une barre
d'achat collante, l'activer rend le débat caduc.

Si le collant n'est pas disponible, garder le carrousel mais rendre la pagination
franchement visible — des points discrets ne suffisent pas à signaler qu'il y a la suite.

## Les cibles tactiles

Tout élément cliquable fait au minimum **44 × 44 px**, avec au moins 8 px entre deux
cibles voisines. En dessous, l'erreur de tap devient fréquente, et une erreur de tap sur
un sélecteur de taille se traduit par un retour produit.

Attention particulière aux sélecteurs de variantes : des pastilles de pointure serrées
sont le cas typique où la zone tactile paraît suffisante à l'œil mais ne l'est pas au
doigt.

## Le texte

Le corps de texte descend rarement en dessous de **16 px** — et jamais sur les champs de
formulaire : en dessous de 16 px, iOS zoome automatiquement au focus, ce qui décale toute
la page et donne une impression de bug.

Mesure de lecture : 30 à 40 caractères par ligne sur téléphone. Au-delà, l'œil perd la
ligne.

## Les images

C'est le premier poste de lenteur d'une boutique dropshipping, parce que les visuels
fournisseur arrivent en pleine résolution.

- Servir des largeurs adaptées avec `srcset` — jamais l'original.
- Renseigner **`width` et `height`** sur chaque image. Sans eux la page saute pendant le
  chargement : c'est le décalage cumulé de mise en page, pénalisé par Google et vécu comme
  un défaut de qualité par le visiteur.
- `loading="lazy"` partout **sauf** la première image visible, qui doit charger
  immédiatement. Une première image en `lazy` retarde le rendu perçu.
- Deux ratios de cadrage maximum sur tout le site, sinon la grille tressaute.

## Ce qui casse le plus souvent

- **Débordement horizontal.** Une seule largeur fixe trop grande et toute la page glisse
  latéralement. Vérifier qu'aucun élément ne dépasse : c'est le défaut mobile le plus
  fréquent et le plus visible.
- **Tableaux et blocs de code** non encapsulés dans un conteneur qui défile seul.
- **Éléments collants qui s'empilent** : en-tête collant + barre d'achat collante +
  bandeau cookies peuvent ne plus rien laisser voir.
- **Fenêtres surgissantes** difficiles à fermer au doigt. La croix de fermeture obéit à la
  règle des 44 px comme le reste.
- **Le survol comme seul moyen d'accès.** Il n'existe pas sur tactile : toute information
  révélée au survol doit être accessible autrement.

## Vérifier

Tester à **375 px** en priorité — c'est la largeur la plus contraignante encore courante.
Puis 390 px et 414 px.

Une vérification honnête suppose de **voir** la page. Quand l'environnement ne permet pas
d'ouvrir le site, le dire clairement et demander une capture d'écran ou un outil de
navigation, plutôt que de déduire le rendu du code. Le code dit ce qui devrait s'afficher,
pas ce qui s'affiche.

Liste de contrôle avant de déclarer terminé :

1. Aucun défilement horizontal de la page
2. Produit, prix et accès à l'achat visibles sur le premier écran
3. Toutes les cibles tactiles à 44 px ou plus
4. Champs de formulaire à 16 px minimum
5. Images avec `width`, `height` et `srcset`
6. Rien d'important accessible uniquement au survol
7. Éléments collants qui ne se recouvrent pas
8. `prefers-reduced-motion` respecté
9. Contraste du texte à 4,5:1 minimum

## Une limite à ne pas franchir

Optimiser pour mobile ne veut pas dire tout retirer. Supprimer les informations qui lèvent
les objections — tailles, délais, retours, matière — pour « faire plus court » fait
baisser la conversion, pas monter. On réorganise et on hiérarchise ; on ne tronque pas.
