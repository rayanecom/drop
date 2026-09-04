# DENTINA — Identité visuelle

> 2026-09-04 · Étape 13. Produite avec le skill `direction-artistique`.
> Valeurs exactes : elles doivent pouvoir être implémentées sans réinterprétation.

---

## 1. Le monde matériel du produit

Avant toute référence esthétique. C'est de là que sort la direction, pas d'un moodboard.

| | |
|---|---|
| **La matière** | De l'eau du robinet dans une cuve en inox. Un plastique thermoformé, transparent, moulé sur une mâchoire |
| **Le geste** | Remplir, poser, appuyer, attendre. Cinq minutes. Tous les soirs |
| **Ce qui se passe** | **L'eau claire devient laiteuse.** C'est le seul événement visuel du produit |
| **Le lieu** | Le lavabo, le soir. Carrelage, verre à dents, buée, une seule lampe |
| **La sensation** | Un dégoût léger, puis un soulagement. Remettre en bouche quelque chose de propre |
| **Le son** | Un bourdonnement aigu — et c'est une critique documentée du marché |

**Le sujet visuel unique, que personne d'autre n'a :** la **transparence qui se dégrade**.
La gouttière est transparente puis se voile. L'eau est transparente puis se voile.

Et c'est aussi la métaphore de la marque : la transparence au sens de l'honnêteté, contre
Zima qui vend la peur médicale et Lyra qui revendique « 99,9 % des bactéries ».

---

## 2. La direction : ÉDITORIAL

> **Parce que notre argument n'est pas la performance de l'appareil mais un raisonnement —
> ce que vous avez payé, ce que vous risquez de perdre — et qu'un raisonnement se lit ;
> parce qu'aucun concurrent de la niche n'y est ; et parce que c'est la seule direction
> émotionnelle qui tienne debout sans photographie de studio irréprochable.**

Le filtre du skill, appliqué :

1. **Émotion ou comparaison ?** Émotion — dégoût puis soulagement. → directions 1, 3, 5, 7.
2. **Les visuels sont-ils bons ?** **On n'a pas encore le produit.** → écarter 3 (sobriété
   haut de gamme) et 7 (immersif sombre), qui reposent entièrement sur la photographie.
3. Restent 1 (éditorial) et 5 (organique). **5 est écartée** : son mode d'échec est « le
   beige générique de la cosmétique », et notre objet est un appareil électrique en inox,
   pas une crème.
4. **Et le concurrent direct ne l'utilise pas** : Zima fait du tech-clinique, Lyra du promo
   agressif, les génériques Amazon de la fiche produit.

Un traitement éditorial dit **« ceci est un sujet, pas un gadget »** — ce qui est exactement
notre positionnement : l'entretien est un sujet sérieux, lié à plusieurs milliers d'euros.

---

## 3. Les cinq décisions

### 3.1 Typographie

| Rôle | Police | Pourquoi |
|---|---|---|
| **Affichage** | **Instrument Serif** — Regular 400 uniquement | Serif à fort contraste, vrai caractère en très grand, quasi absente de l'e-commerce. Sur Google Fonts, donc chargeable proprement |
| **Texte** | **Archivo** — 400 / 500 / 600 | Grotesque neutre, chasse légèrement étroite qui tient en mobile. Ni Inter, ni Poppins, ni Montserrat |

**Échelle — mobile d'abord, base 16 px**

| Niveau | Mobile | Desktop | Interlignage | Approche |
|---|---|---|---|---|
| Display XL (héros) | 44 px | 88 px | 1,02 | −0,02 em |
| Display L | 32 px | 56 px | 1,08 | −0,015 em |
| Titre de section | 24 px | 36 px | 1,15 | −0,01 em |
| **Corps** | **17 px** | 18 px | 1,6 | 0 |
| Légende | 14 px | 14 px | 1,5 | 0 |
| Sur-titre / étiquette | 12 px | 12 px | 1,2 | **+0,12 em**, majuscules |

**Règles fermes.** Le corps ne descend jamais sous 16 px. Les majuscules sont réservées aux
sur-titres de **1 à 3 mots** — jamais un titre en capitales. Deux familles, pas trois.

### 3.2 Couleur — un fond, un texte, UNE accentuation

| Rôle | Valeur | Usage |
|---|---|---|
| **Papier** (fond) | `#F6F3EE` | Fond dominant partout |
| **Encre** (texte) | `#14201F` | Tout le texte principal |
| **Eau** (accentuation) | `#0E5C55` | **Uniquement** : bouton d'achat, liens, soulignements, sections inversées |
| Gris de lavabo | `#5C6664` | Texte secondaire, légendes |
| Filet | `#DCD6CC` | Séparateurs de 1 px |

**Contrastes calculés, pas affirmés :**

| Paire | Ratio | |
|---|---|---|
| Encre / Papier | **15,10:1** | AAA |
| Eau / Papier (liens) | **7,08:1** | AAA |
| Blanc / Eau (libellé du bouton) | **7,83:1** | AAA |
| Papier / Eau (section inversée) | **7,08:1** | AAA |
| Gris de lavabo / Papier | **5,36:1** | AA |
| ~~Encre / Eau~~ | **2,13:1** | ⛔ **INTERDIT** — jamais de texte encre sur le vert |

Le fond n'est **ni gris moyen** (liste noire) **ni blanc clinique** — le blanc médical est le
territoire de Zima et de toute la pharmacie. Le papier chaud nous en sort par le fond.

### 3.3 Traitement d'image — le même partout

- **Le héros visuel est l'eau, pas l'appareil.** Toute la niche photographie le boîtier.
- **Deux ratios sur tout le site, pas un de plus :** `4:5` en vertical, `3:2` en horizontal.
- **Une seule lumière**, latérale, naturelle, chaude (~4000 K). Ombres portées douces et
  longues. Jamais de flash frontal.
- **Noirs relevés** — pas de noir pur : on est sur du papier, pas sur un écran.
- **Fond** : le papier `#F6F3EE` prolongé, ou la matière réelle (inox, carrelage, verre).
  **Jamais de détourage sur blanc pur.**
- **Jamais de texte posé sur une image.** Le texte vit à côté, dans la grille.
- **Une image en situation obligatoire** : le lavabo, le soir, une main qui pose.

### 3.4 Mise en page

- Grille 12 colonnes. Gouttière 20 px mobile / 24 px desktop.
- Marge extérieure 20 px mobile / 64 px desktop. Contenu max **1160 px**.
- **Alignement à gauche par défaut.** Seul le bloc prix + bouton est centré.
- Mesure de texte : **62 à 68 caractères**, jamais plus.
- **Rythme alterné** : sections denses (48 px de padding vertical) et sections aérées
  (112 px mobile / 160 px desktop). **Jamais deux aérées de suite.**
- **Rayon 0 partout.** Boutons compris. C'est tranché, pas mou.
- **Aucune ombre portée.** Séparation par le vide et par un filet de 1 px `#DCD6CC`.

### 3.5 Mouvement — deux gestes, pas un de plus

1. **Le trouble.** Sur la seule section démonstration : l'eau claire se fond vers l'eau
   trouble, **900 ms**, `ease-in-out`, déclenché une seule fois au défilement. C'est le geste
   signature — il raconte le produit.
2. **Le soulignement des liens** se dessine de gauche à droite, **180 ms**.

Rien d'autre. **Aucun fade-in au défilement.** `prefers-reduced-motion` : le trouble devient
un changement d'image sans transition.

### 3.6 Le bloc-marque

```
DENTINA                    Instrument Serif 400, approche +0,06 em
soin des appareils dentaires   Archivo 600, 11 px, majuscules, +0,14 em, gris de lavabo
```

Le descripteur est **verrouillé au nom** sur tout support d'acquisition. « Dentina » seul ne
paraît jamais dans une publicité. C'est exactement le mécanisme de Zima : « Zima » seul ne
veut rien dire, « Zima Dental » dit tout.

---

## 4. Ce qu'on ne fera pas — liste noire passée ligne par ligne

| Cliché | Notre décision |
|---|---|
| Poppins / Montserrat / Inter en affichage | Instrument Serif + Archivo |
| Dégradé violet → rose | Une seule accentuation, `#0E5C55`, tirée de la couleur de l'eau |
| Gris moyen en fond | Papier chaud `#F6F3EE`, choix franc |
| Rouge promo | **Zéro rouge sur tout le site** |
| Emojis en guise d'icônes | Lucide, une seule famille, trait 1,5 px |
| Rangée « Livraison offerte · Paiement sécurisé · Satisfait ou remboursé » | Une phrase précise et vérifiable : le délai réel, la garantie réelle |
| Logos de paiement en grand | Pied de page, en niveaux de gris |
| Compte à rebours, compteur de stock, « 12 personnes regardent » | **Rien.** Le silence vaut mieux que le mensonge |
| Faux avis, avatars de banque d'images | Vrais avis uniquement, même peu nombreux |
| Prix barré fictif | 89,99 € assumé. Le prix barré n'existe que sur les lots, où l'économie est réelle et calculable |
| Photos fournisseur brutes, fonds incohérents | Un seul traitement, deux ratios |
| Ordre de sections standard | Réordonné selon la logique d'achat — voir §6 |
| Tout centré | Alignement à gauche, sauf le bloc prix |
| Héros pleine largeur, texte centré sur photo assombrie | Composition asymétrique, texte à côté de l'image |
| Arrondis de 12 px partout | **Rayon 0** |
| Ombres portées | Aucune |
| Densité uniforme | Alternance dense / aérée |
| Fade-in au défilement | Deux gestes seulement |
| Carrousel automatique | Un message unique |

---

## 5. Les trois choix que personne d'autre n'aurait faits

1. **Une serif éditoriale à fort contraste pour un appareil électrique.** Toute la niche est
   en grotesque tech ou en promo. Instrument Serif en 88 px dit « ceci est un sujet ».
2. **Fond papier chaud au lieu du blanc clinique.** Zima et tous les génériques sont en blanc
   médical. On sort du registre pharmacie par le fond, sans rien perdre en propreté — et ça
   corrige le seul défaut du nom « Dentina ».
3. **L'eau trouble en héros, pas l'appareil.** Toute la niche photographie le boîtier. Nous
   photographions le résultat : c'est le sujet réel, et la seule image que personne ne montre
   en pleine page.

Quatrième, en prime : **rayon 0 partout**, quand 12 px est le défaut universel.

### Test de distinctivité

> *Sans le logo, cette maquette pourrait-elle appartenir à une autre boutique ?*

Non : fond papier + serif à fort contraste + rayon 0 + zéro ombre + l'eau comme sujet. Cette
combinaison n'existe nulle part dans la niche, et elle est **directement tirée de la matière
du produit** — donc unique par construction.

---

## 6. Ordre des sections — la logique d'achat, pas le gabarit du thème

Le visiteur arrive en pensant « ma gouttière est à peu près propre ». Chaque section a un job.

| # | Section | À quelle pensée elle répond |
|---|---|---|
| 1 | **Héros** — image de l'eau trouble, texte à gauche | « Qu'est-ce que c'est ? » |
| 2 | **La démonstration** — le geste signature | « Ma gouttière est propre, non ? » → **non** |
| 3 | **Le mécanisme d'abandon** — le tiroir | « Pourquoi ça me concerne ? » |
| 4 | **L'enjeu** — l'orthodontie adulte n'est pas remboursée | « Pourquoi maintenant ? » |
| 5 | **Trois étapes** — remplir, poser, appuyer | « C'est compliqué ? » |
| 6 | **Pensé pour les appareils dentaires** — compatibilités testées, dimensions internes | « Est-ce que ça va abîmer ma gouttière ? Mon appareil rentre ? » |
| 7 | **La garantie 2 ans** — traitée comme un argument produit, pas une icône | « Et si ça casse ? » ← **peur n°1 du marché** |
| 8 | **« Et Amazon à 30 € ? »** — la comparaison affrontée de face | L'objection économique n°1 |
| 9 | **Preuve** — vrais avis, vraies photos | « Je peux les croire ? » |
| 10 | **Les offres** | « Laquelle je prends ? » |
| 11 | **FAQ** | Le reste |

**Deux ruptures avec le gabarit standard :** la garantie remonte en position 7 au lieu d'être
une icône sous le bouton, et **l'objection Amazon est traitée dans une section à elle**,
avant les avis. Personne ne fait ça — tout le monde espère que le visiteur n'y pense pas.
