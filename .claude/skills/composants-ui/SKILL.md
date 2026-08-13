---
name: composants-ui
description: Générer un composant d'interface prêt à l'emploi à partir d'une simple description — bouton, carte, modale, accordéon, onglets, tableau de prix, barre de navigation, formulaire, carrousel, bandeau, galerie, notation, compte à rebours. Utilise ce skill dès que l'utilisateur demande « fais-moi un composant », « il me faut un bloc qui… », « génère-moi une section », « un truc qui affiche… », ou décrit un élément d'interface à créer, quel que soit le langage cible (Liquid, HTML/CSS, React, Vue). Remplace le recours à un générateur de composants en ligne : tout se fait en local, à partir des bases déjà installées.
---

Tu produis un composant d'interface complet, à partir d'une description en langage
courant. Complet veut dire : le code, ses variantes, ses états, et l'endroit où le poser.

## Ce que ce skill remplace, et ce qu'il ne remplace pas

Les générateurs de composants en ligne tirent leur valeur d'un registre hébergé de
composants curés. Ici, il n'y a pas de registre distant — mais il y a mieux pour un projet
donné : **les bases locales et les jetons de design du projet**. Un composant généré ici
sort déjà aux bonnes couleurs, aux bonnes polices et dans le bon langage, là où un
composant importé demande toujours d'être retouché.

En revanche, ce skill ne connaît pas les milliers de composants d'un catalogue en ligne.
Il ne va pas « chercher » un composant existant, il en construit un. Le dire à
l'utilisateur si la demande porte explicitement sur un catalogue.

## La méthode

### 1. Identifier le langage cible avant tout

C'est l'erreur la plus coûteuse : produire du React pour un projet qui n'en utilise pas.

- **Boutique Shopify** → Liquid. Charge le skill `shopify-sections` et pars de
  `assets/section-modele.liquid`. Un composant Shopify utile est **éditable dans
  l'éditeur de thème**, donc il expose un `{% schema %}`.
- **Projet React / Next.js / Vue / Svelte** → charge la fiche de stack correspondante
  dans `ui-ux-pro-max/data/stacks/`.
- **Page autonome** → HTML + CSS, sans dépendance.

En cas de doute, regarder les fichiers du projet plutôt que demander.

### 2. Reprendre les jetons du projet, jamais inventer

Avant d'écrire une couleur ou une police, chercher celles qui existent déjà : variables
CSS, réglages de thème, fichier de jetons. Un composant qui introduit sa propre palette
est ce qui fait qu'un site paraît bricolé, même quand chaque bloc pris isolément est
réussi.

Si aucun jeton n'existe, charger `direction-artistique` pour en fixer — et le dire, car
c'est une décision qui dépasse le composant demandé.

### 3. Composer plutôt que copier

Décomposer la demande en éléments connus : conteneur, en-tête, media, liste, action.
La plupart des composants sont des recombinaisons de six ou sept primitives. Chercher les
patrons et contraintes dans les bases déjà installées :

| Besoin | Où regarder |
|---|---|
| Style, palette, appariement de polices | `ui-ux-pro-max/data/` |
| Composant shadcn/ui, utilitaires Tailwind | `ui-styling/references/` |
| Échelles d'espacement, jetons, états | `design-system/references/` |
| Règle d'ergonomie, accessibilité | `ui-ux-pro-max/data/ux-guidelines.csv` |
| Section Shopify, schema, CSS scopé | `shopify-sections/` |

### 4. Livrer les états, pas seulement le cas nominal

Un composant n'est fini que lorsque ses états le sont. C'est ce qui distingue un rendu de
maquette d'un composant utilisable :

- repos, survol, focus visible, actif, désactivé
- chargement, vide, erreur — trois cas que presque tout le monde oublie
- contenu long : tester avec un texte trois fois plus long que l'exemple
- zéro élément, un seul élément, beaucoup d'éléments

### 5. Mobile et accessibilité, par défaut

Charge `mobile-ecommerce` sur un projet marchand. Le minimum, sans exception :

- cibles tactiles de 44 px, champs de formulaire à 16 px
- contraste texte/fond de 4,5:1
- balisage sémantique réel — un bouton est un `button`
- focus clavier visible
- `prefers-reduced-motion` respecté
- rien d'essentiel accessible uniquement au survol : ça n'existe pas au doigt

### 6. Proposer une variante, pas dix

Livrer une version, et **une** alternative si un vrai arbitrage existe (compact contre
aéré, dense contre lisible). Expliquer en une phrase ce que chacune coûte et rapporte.
Au-delà, l'utilisateur ne choisit plus, il subit.

## Ce que tu livres

1. Le code complet, prêt à coller — jamais un extrait à compléter
2. Le chemin du fichier et la manière de l'utiliser
3. Les réglages exposés, s'il y en a
4. Les états couverts
5. Ce qui reste à faire côté contenu (images, textes, liens)

## Piège à éviter

Ne pas ajouter de dépendance pour un composant. Un carrousel, un accordéon, des onglets,
une modale se font en HTML + CSS + quelques lignes de JavaScript natif. Charger une
bibliothèque pour ça alourdit la page — donc coûte des ventes sur mobile — et crée une
dette de mise à jour hors de proportion avec le besoin.
