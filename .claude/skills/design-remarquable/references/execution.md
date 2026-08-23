# Exécution — les valeurs chiffrées

## Échelle typographique

Partir du corps de texte, jamais du titre. 16 px minimum sur mobile — en dessous, iOS
zoome au focus d'un champ de formulaire.

Rapport de progression entre 1,20 (mineure tierce, sobre) et 1,333 (quarte, expressif).
Exemple à 17 px de base, rapport 1,333, plafonné :

| Rôle | Mobile | Ordinateur |
|---|---|---|
| Sur-titre / étiquette | 11 px, capitales, interlettrage 0,14em | 12 px |
| Petit texte | 14 px | 14 px |
| Corps | 17 px | 17 px |
| H3 | 21 px | 24 px |
| H2 | 30 px | 44 px |
| H1 | 38 px | 62 px |

**Le rapport H1 / corps doit dépasser 2,5.** En dessous, la page paraît plate quelle que
soit la qualité de la fonte.

Interligne : 1,5 à 1,6 pour le corps ; 1,0 à 1,1 pour les grands titres. Un grand titre à
1,5 d'interligne se désagrège.

Interlettrage : négatif sur les grands titres (−0,01 à −0,02em), positif sur les capitales
(+0,1 à +0,15em), nul sur le corps.

Longueur de ligne : 45 à 75 caractères. `max-width: 65ch` règle le problème une fois pour
toutes.

## Échelle d'espacement

`4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128`

Aucune valeur hors échelle. Un `padding: 22px` isolé est le signe qu'on a ajusté à l'œil
au lieu de construire un système.

| Séparation | Valeur |
|---|---|
| Entre une étiquette et sa valeur | 4 à 8 |
| Entre deux éléments d'une même carte | 12 à 16 |
| Intérieur d'une carte | 24 à 32 |
| Entre deux cartes | 16 à 24 |
| Entre deux sections | 56 à 96 mobile, 96 à 128 ordinateur |

**La règle qui décide tout** : l'espace autour d'un groupe doit être franchement supérieur
à l'espace à l'intérieur. Un rapport de 2 minimum. C'est la loi de proximité de Gestalt, et
c'est ce qui permet de lire une page sans la lire.

## Couleur

Une famille chromatique dominante. **Un seul élément saturé par écran** — le bouton d'achat.
Deux couleurs vives de force égale s'annulent au lieu de se hiérarchiser.

Contrastes WCAG 2.x à respecter : **4,5:1** pour le texte courant, **3:1** pour un titre
d'au moins 24 px ou un élément d'interface. Calculer, ne pas estimer : deux couleurs de
luminosité voisine peuvent sembler contrastées et échouer.

Les neutres ne sont jamais gris pur. Un neutre teinté vers la dominante (ivoire chaud, gris
bleuté) fait toute la différence entre une page qui a l'air pensée et une page par défaut.

## Profondeur sans ombre

Par ordre de préférence :

1. **Différence de valeur** — fonds superposés de la même famille, écart de luminosité
   faible mais net.
2. **Filet de 1 px** à 10-16 % d'opacité de la couleur d'encre. Plus net qu'une bordure
   grise, qui salit.
3. **Décalage de bloc** — un élément qui déborde volontairement de sa grille.
4. **Ombre** en dernier recours, et alors : très diffuse, très faible opacité, teintée de
   la dominante, jamais grise.

## Mouvement

| Geste | Durée | Courbe |
|---|---|---|
| État pressé, survol | 120 à 140 ms | `ease-out` |
| Ouverture d'un contenu | 180 à 220 ms | `ease-out` |
| Apparition au défilement | 300 à 400 ms, décalage de 60 ms entre éléments | `ease-out` |

Jamais de `ease-in` seul sur une entrée : l'élément a l'air de coller au départ.
Jamais de rebond sur une interface marchande.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .01ms !important;
    scroll-behavior: auto !important;
  }
}
```

## Images

Ratio unique sur toute une galerie. `1:1` ou `4:5`. Le portrait occupe plus de hauteur
d'écran mobile, donc il vend mieux, mais il repousse le prix sous la ligne de flottaison —
arbitrer selon ce qui doit rester visible.

Toujours déclarer `width` et `height`, ou un `aspect-ratio`. Une image sans dimensions
réservées provoque un décalage de mise en page, et le CLS est ce qui fait le plus
« bricolé » à l'usage.

Attention au piège documenté dans ce repo : `aspect-ratio` combiné à `overflow:hidden`
rogne le contenu sans prévenir. Le banc de rendu le détecte avec `clipped`.
