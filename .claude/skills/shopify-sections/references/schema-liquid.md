# Schema et Liquid — référence pratique

## Structure du schema

Le `{% schema %}` est du **JSON strict** : pas de commentaire, pas de virgule finale. Une
erreur de syntaxe et la section disparaît de l'éditeur sans message clair — c'est la
première chose à vérifier quand une section « ne s'affiche pas ».

```json
{
  "name": "Nom affiché dans l'éditeur",
  "tag": "section",
  "class": "ma-section",
  "settings": [],
  "blocks": [],
  "max_blocks": 12,
  "presets": [{ "name": "Nom dans la liste d'ajout" }]
}
```

Sans `presets`, la section n'apparaît pas dans « Ajouter une section ». C'est l'oubli le
plus fréquent.

## Types de réglages utiles

| Type | Usage | Lecture |
|---|---|---|
| `text` | Ligne courte | `section.settings.id` |
| `textarea` | Texte multiligne | idem |
| `inline_richtext` | Texte avec gras/italique inline | idem |
| `richtext` | Paragraphes formatés | idem |
| `image_picker` | Image | objet image |
| `url` | Lien | chaîne |
| `product` / `collection` | Ressource | objet |
| `color` | Couleur | chaîne hex |
| `range` | Valeur numérique bornée | nombre |
| `select` | Choix parmi une liste | chaîne |
| `checkbox` | Booléen | booléen |
| `video_url` | YouTube / Vimeo | objet |

Exemple de `range` — `min`, `max`, `step` et `default` sont obligatoires, et le défaut
doit tomber exactement sur un pas, sinon la section est rejetée :

```json
{
  "type": "range",
  "id": "padding_block",
  "min": 24, "max": 160, "step": 8,
  "unit": "px",
  "label": "Espacement vertical",
  "default": 96
}
```

## Blocs répétables

Les blocs permettent au marchand d'ajouter, retirer et réordonner des éléments.

```json
"blocks": [
  {
    "type": "item",
    "name": "Élément",
    "settings": [
      { "type": "text", "id": "title", "label": "Titre" }
    ]
  }
]
```

Côté Liquid :

```liquid
{%- for block in section.blocks -%}
  <li {{ block.shopify_attributes }}>
    {{ block.settings.title }}
  </li>
{%- endfor -%}
```

`{{ block.shopify_attributes }}` est ce qui relie l'élément affiché à son bloc dans
l'éditeur. Sans lui, cliquer sur un bloc ne surligne rien et l'édition devient pénible.

Pour préremplir la section à l'ajout :

```json
"presets": [
  {
    "name": "Éditorial — deux colonnes",
    "blocks": [{ "type": "item" }, { "type": "item" }]
  }
]
```

## Images responsives

```liquid
{%- assign img = section.settings.image -%}
{%- if img != blank -%}
  <img
    src="{{ img | image_url: width: 900 }}"
    srcset="{{ img | image_url: width: 450 }} 450w,
            {{ img | image_url: width: 900 }} 900w,
            {{ img | image_url: width: 1400 }} 1400w"
    sizes="(min-width: 750px) 50vw, 100vw"
    width="{{ img.width }}"
    height="{{ img.height }}"
    alt="{{ img.alt | escape }}"
    loading="lazy"
    decoding="async"
  >
{%- endif -%}
```

`width` et `height` réservent l'espace avant le chargement : sans eux la page saute et
Google le sanctionne (Cumulative Layout Shift). Passer `loading="eager"` sur la première
image visible — la retarder dégrade la vitesse perçue.

## Scoper le CSS

```liquid
{% style %}
  #shopify-section-{{ section.id }} {
    --pad: {{ section.settings.padding_block }}px;
    --accent: {{ section.settings.accent_color }};
  }
  #shopify-section-{{ section.id }} .sec__grid {
    padding-block: var(--pad);
  }
{% endstyle %}
```

Faire passer les réglages par des variables CSS évite d'interpoler du Liquid dans chaque
règle : le CSS reste lisible et le rendu Liquid plus léger.

## Pièges fréquents

**La section n'apparaît pas dans l'éditeur.** Presque toujours du JSON invalide dans le
schema, ou l'absence de `presets`.

**Les styles fuient sur le reste du site.** CSS non scopé. Tout préfixer par
`#shopify-section-{{ section.id }}`.

**Deux instances se perturbent.** Même cause. Ne jamais utiliser d'`id` HTML fixe :
les suffixer par `{{ section.id }}`.

**`default` refusé sur un `range`.** La valeur ne tombe pas sur un multiple de `step`
entre `min` et `max`.

**Le texte du marchand casse la mise en page.** Toujours tester avec un texte trois fois
plus long que l'exemple. Les titres courts mentent.

**Une image vide casse l'affichage.** Toujours encadrer par `{%- if img != blank -%}` et
prévoir un état sans image.

**Traduction.** Un libellé peut pointer vers une clé de traduction (`"label": "t:..."`),
mais une chaîne littérale fonctionne et reste plus simple à maintenir sur une boutique
monolingue.
