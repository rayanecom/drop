---
name: direction-artistique
description: Imposer une direction artistique distinctive à une boutique e-commerce, au lieu du rendu générique que produisent les thèmes par défaut. Utilise ce skill dès qu'il s'agit de concevoir ou refondre l'apparence d'un site marchand — page d'accueil, fiche produit, landing, identité visuelle, choix de polices, de couleurs, de photos, de mise en page — et systématiquement quand l'utilisateur dit que son site fait « comme tout le monde », « générique », « template », « pas pro », ou demande quelque chose d'« époustouflant », « unique », « haut de gamme ». À déclencher AVANT d'écrire la moindre ligne de CSS ou de Liquid : la direction artistique se décide en amont, pas en retouche.
---

Tu conçois l'apparence d'une boutique. Ton objectif n'est pas qu'elle soit jolie — c'est
qu'elle soit **reconnaissable**. Une boutique jolie et interchangeable a échoué.

## Pourquoi les boutiques se ressemblent toutes

Ce n'est pas un manque de goût, c'est un problème de **défauts**. Le thème propose une
police, un ordre de sections, un rayon d'arrondi, une rangée de badges de réassurance. Le
fournisseur fournit des photos sur fond blanc. Chacun de ces défauts est raisonnable pris
isolément. Le problème, c'est que tout le monde part des mêmes défauts, donc tout le monde
arrive au même endroit.

La conséquence est directe : une boutique interchangeable n'a aucun argument autre que le
prix. Sur un produit dropshipping, c'est un combat perdu d'avance contre Amazon.

**Sortir du lot ne demande pas plus de travail, ça demande des choix délibérés.** Chaque
fois que tu acceptes un défaut sans le questionner, tu ressembles un peu plus à tout le
monde.

## La méthode

### 1. Interroger le monde matériel du produit

Avant toute référence esthétique, décris ce que le produit *est* et le monde dans lequel
il vit. Matière, texture, usage, environnement, gestes, contraintes, sensations.

Un ouvre-huîtres, ce n'est pas « un ustensile ». C'est une coquille rugueuse et
imprévisible, une lame courte qu'on force, un torchon plié dans la paume, le risque réel de
se blesser, l'eau de mer qui gicle, et un geste qu'on répète douze fois d'affilée un soir
de fête. Cette matière-là est ta source. Elle est spécifique à ce produit, donc elle
produit une direction que personne d'autre n'aura.

Le test : si ta description s'appliquerait aussi bien au produit d'un concurrent, tu n'es
pas encore descendu au niveau qui compte.

Une direction artistique tirée du produit est unique par construction. Une direction tirée
d'un moodboard Pinterest est générique par construction.

### 1 bis. Où s'arrête ce skill

Ce skill choisit le **parti pris**. Il ne l'exécute pas. Une fois la direction arrêtée,
enchaîner sur `design-remarquable`, qui tient l'échelle typographique, le rythme
d'espacement, la profondeur, le mouvement et les seuils de performance.

Une direction jamais exécutée ne vaut rien, et une exécution sans direction produit
exactement le générique qu'on cherche à éviter.

### 2. Choisir UNE direction et l'assumer

Lis `references/directions.md` et choisis-en une. Une seule.

Le réflexe qui tue, c'est de mélanger : un peu d'éditorial, un peu de tech, un peu de
luxe. Le mélange donne toujours le même résultat neutre — c'est exactement comme ça qu'on
retombe sur le rendu générique en croyant faire riche.

Justifie ton choix en une phrase reliant la direction à la cible et au produit. Si tu n'y
arrives pas, c'est que tu as choisi par goût, pas par stratégie. Recommence.

### 3. Commettre les cinq décisions

Une direction artistique n'existe que si elle est écrite noir sur blanc :

| Décision | Ce qu'il faut trancher |
|---|---|
| **Typographie** | Une police d'affichage à caractère + une police de texte neutre et lisible. Échelle et graisses précises. |
| **Couleur** | Un fond dominant, une couleur de texte, **une** accentuation. Pas plus. |
| **Traitement d'image** | Un cadrage, un étalonnage, un fond, une lumière — **les mêmes partout**. |
| **Système de mise en page** | Grille, rythme vertical, alignements, densité. |
| **Mouvement** | Un ou deux gestes signature, pas de l'animation partout. |

Ce qui fait qu'un site paraît « fait par un pro », ce n'est jamais un effet spectaculaire.
C'est la **répétition rigoureuse** de ces cinq décisions sur toutes les pages. L'œil lit la
cohérence comme de l'intention, et l'intention comme du sérieux.

### 4. Passer la liste noire

Lis `references/cliches-dropshipping.md` et vérifie ta proposition ligne par ligne. Ce
sont les signaux qui font dire « encore une boutique dropshipping » en une demi-seconde,
avant même d'avoir lu un mot.

Chaque cliché y est accompagné du remplacement à faire. Ne te contente pas de retirer,
remplace — un vide n'est pas une direction.

### 5. Le test de distinctivité

Avant de livrer, réponds honnêtement :

> Si je retire le logo et le nom du produit, est-ce que cette maquette pourrait appartenir
> à n'importe quelle autre boutique ?

Si oui, tu n'as pas fait de direction artistique, tu as fait de la décoration. Reprends à
l'étape 1.

Deuxième test, plus dur : **nomme les trois choix que personne d'autre dans cette niche
n'aurait faits.** Si tu n'en trouves pas trois, la proposition est encore trop sage.

## Utiliser les ressources déjà installées

Le skill `ui-ux-pro-max` contient des bases de styles, palettes et appariements de
polices. Sers-t'en comme **matière première**, jamais comme réponse finale : ces bases
donnent des points de départ solides, et le premier résultat d'une recherche est par
définition celui que tout le monde prend.

Prends-en trois, écarte le plus évident, et pousse les deux autres plus loin.

## Ce que tu livres

Une direction artistique écrite, pas une vague intention :

1. **Le nom de la direction** et la phrase qui la justifie
2. **Les cinq décisions**, avec des valeurs exactes — noms de polices, codes hexadécimaux,
   tailles, ratios de cadrage, durées d'animation
3. **Ce qu'on ne fera pas** — les clichés explicitement écartés
4. **Les trois choix distinctifs** que personne d'autre n'aurait faits
5. Si la demande porte sur une page : la structure section par section, avec le rôle de
   chaque section

Des valeurs exactes, sinon la personne qui implémente retombera sur les défauts du thème
— et on aura tourné en rond.

## Une limite à respecter

Le distinctif ne doit jamais coûter la conversion. Un contraste texte/fond sous 4,5:1, une
zone de clic minuscule, une police d'affichage illisible en corps de texte, un mouvement
qui retarde l'accès au bouton d'achat : c'est de la mauvaise direction artistique, pas de
l'audace.

L'audace se joue sur la typographie, la couleur, le cadrage et le rythme. Jamais sur la
lisibilité ni sur le chemin vers le paiement.
