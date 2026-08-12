---
name: shopify-sections
description: Concevoir et coder des sections Shopify Liquid sur mesure, au lieu de se limiter aux sections fournies par le thème. Utilise ce skill dès qu'il faut une mise en page que l'éditeur de thème ne permet pas — section personnalisée, bloc répétable, comparatif, guide des tailles, bandeau, galerie, page d'accueil ou fiche produit sur mesure — et systématiquement quand l'utilisateur veut une boutique qui ne ressemble pas à un template, quand une direction artistique doit être implémentée, ou quand il dit « le thème ne le permet pas ». Couvre le Liquid, le schema JSON, le CSS scopé, les images responsives et l'accessibilité.
---

Tu écris des sections Shopify sur mesure, éditables dans l'éditeur de thème.

## Pourquoi coder plutôt que régler

Les réglages d'un thème ne peuvent recombiner que ce que son auteur a imaginé. C'est une
limite dure : tant qu'on reste dans l'éditeur, on ne peut produire que des variantes du
même gabarit — celui que tous les autres clients du thème utilisent aussi.

Une section sur mesure lève cette limite tout en restant **modifiable par le marchand**,
parce qu'elle expose ses propres réglages. C'est le seul moyen d'implémenter une direction
artistique sans transformer la boutique en site figé que son propriétaire ne peut plus
faire évoluer seul.

Si une direction artistique a été définie (skill `direction-artistique`), l'implémenter
telle quelle : valeurs de polices, couleurs, ratios et durées exactes. Le travail de
direction ne sert à rien s'il est réinterprété au moment du code.

## Avant d'écrire

Deux réflexes qui évitent de perdre du temps :

1. **Regarder ce que le thème fournit déjà.** Un thème payant comme Shrine embarque
   souvent la brique cherchée. Réutiliser un snippet existant coûte moins cher à
   maintenir que doublonner.
2. **Travailler sur un thème non publié.** L'API Shopify refuse toute écriture sur le
   thème publié, et une section cassée sur la boutique en ligne coûte des ventes réelles.
   La procédure sûre est décrite dans l'agent `theme-shopify` : dupliquer, écrire,
   relire pour vérifier, laisser publier.

## Anatomie

Une section est un seul fichier dans `sections/`, en trois parties :

    balisage Liquid     ce qui s'affiche
    {% style %}         le CSS, scopé à cette section
    {% schema %}        les réglages exposés dans l'éditeur

Le détail des types de réglages, des blocs et des pièges du schema est dans
`references/schema-liquid.md`. Un modèle complet et fonctionnel est dans
`assets/section-modele.liquid` — partir de là plutôt que d'écrire de zéro.

## Les règles qui comptent vraiment

### Scoper le CSS, toujours

Shopify enveloppe chaque section dans `#shopify-section-{{ section.id }}`. Préfixer tout
le CSS avec ce sélecteur. Sans ça, deux instances de la même section sur une page se
marchent dessus, et les styles fuient sur le reste du thème — un bug pénible à
diagnostiquer des semaines plus tard.

Faire passer les réglages par des variables CSS définies sur ce sélecteur : le Liquid
n'écrit alors qu'une poignée de valeurs, et le CSS reste lisible.

### Rendre la section réellement éditable

Une section sans réglages est un cul-de-sac : le marchand devra revenir voir un
développeur pour changer un mot. Exposer les textes, les images, les couleurs et les
espacements.

Sur chaque bloc, poser `{{ block.shopify_attributes }}` — c'est ce qui permet à l'éditeur
de surligner le bon élément quand on clique dessus. Sans cet attribut, l'édition devient
une devinette.

Ajouter un `presets` dans le schema, sinon la section n'apparaît pas dans la liste
« Ajouter une section ».

### Les images

Ne jamais servir l'image d'origine : les fichiers fournisseur pèsent souvent plusieurs
mégaoctets, et sur mobile c'est du taux de rebond direct.

Utiliser `image_url` avec un `srcset`, renseigner `width` et `height` pour réserver la
place (sinon la page saute pendant le chargement), et `loading="lazy"` sauf pour la
première image visible — celle-là doit charger tout de suite.

### L'accessibilité, en pratique

Ce ne sont pas des cases à cocher, ce sont des ventes :

- Du balisage sémantique réel : un titre est un `h2`, un bouton est un `button` ou un `a`.
- Un état de focus visible — sans lui, la navigation au clavier est impossible.
- Un contraste texte/fond d'au moins 4,5:1.
- `prefers-reduced-motion` respecté : certains utilisateurs ont physiquement mal avec les
  animations.
- Des `alt` réels sur les images porteuses de sens, vides sur les images décoratives.

### La performance

Pas de bibliothèque JavaScript pour une section. Ce qui se fait en CSS se fait en CSS.
Si du JavaScript est indispensable, l'écrire en natif dans la section, et le charger en
`defer`.

## Vérifier avant de livrer

Une section qui casse la boutique coûte plus cher que l'absence de section :

1. Le CSS est scopé — deux instances sur la même page ne se perturbent pas.
2. La section apparaît bien dans l'éditeur, et tous ses réglages fonctionnent.
3. Testée à 375 px, 768 px et 1440 px.
4. Aucun texte en dur qui devrait être un réglage.
5. Les images ont `width`, `height` et un `srcset`.
6. Le focus clavier est visible, le contraste passe.
7. Le fichier écrit a été **relu** depuis le thème après écriture — taille cohérente,
   fin de fichier présente.

## Ce que tu livres

Le fichier de section complet, plus : où le déposer, quels réglages il expose, et comment
l'ajouter dans l'éditeur. Une section livrée sans mode d'emploi finit inutilisée.
