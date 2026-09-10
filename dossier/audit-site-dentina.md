# Audit du site Dentina — thème `dentina-v9-chatbot-v8`

> 2026-09-10 · Lecture seule sur le zip fourni. Aucune modification en dehors des deux
> demandées (promesse d'accueil, prix barré).

---

## VERDICT EN UNE LIGNE

**Le site est bien construit et proche de convertir — mais il ne doit pas rester en ligne
en l'état, parce qu'il affiche des avis clients et des professionnels de santé inventés.**

---

## 1. Ce qui va bien

| Point | Constat |
|---|---|
| **Construction** | 87 sections, 81 snippets, thème Shrine complet. Sections sur mesure `dentina-home`, `dentina-product`, `dentina-chatbot`. C'est du travail sérieux, pas un template posé |
| **Visuels** | 74 fichiers Dentina produits : photos produit blanc et noir, lifestyle, unboxing, UGC salle de bain, bannière ultrasons. Déclinés en `mobile` / `display` / `thumb` — le responsive images est fait correctement |
| **Vidéos de démonstration** | 7 vidéos, dont le cycle complet et trois plans de résidus. C'est l'atout de conversion n° 1 de cette catégorie, et il est là |
| **Prix barré** | La fiche produit lit déjà `compare_at_price` et rend un `<s>` correctement stylé. Rien à coder |
| **Variantes couleur** | Blanc / Noir gérés avec bascule de prix, d'image et de disponibilité |
| **Structure de page** | Héros, 4 cartes, bloc technologie, produit, avis, réassurance, pied. C'est la structure qui convertit sur ce marché |
| **Accessibilité de base** | `aria-label` sur les boutons, `alt` sur les images du héros, `role="note"`, navigation clavier prévue |
| **Panier** | Tiroir de panier personnalisé, compteur, ajout sans rechargement |

---

## 2. Ce qui ne va pas

### 🔴 BLOQUANT — Avis clients inventés, affichés en ce moment

`FAIT`, vérifié dans le code : `templates/index.json` déclare la section `dentina-home`
avec **0 bloc d'avis**. Le code bascule donc sur son repli, qui contient **quatre avis
écrits en dur**, avec prénom, nom d'initiale, étoiles et la mention **« ✓ Achat vérifié »** :

> ★★★★★ ✓ Achat vérifié — **Jeanne M.** « Je remplis la cuve, je pose mon dentier… »
> ★★★★★ ✓ Achat vérifié — **André B.** « Le modèle noir reste sur mon meuble… »
> ★★★★★ ✓ Achat vérifié — **Claire V.** « Les gestes sont faciles à retenir… »
> ★★★★☆ ✓ Achat vérifié — **Françoise L.** « Je l'utilise pour ma gouttière du soir… »

Ces personnes n'existent pas. La mention « Achat vérifié » est fausse.

### 🔴 BLOQUANT — Trois professionnels de santé inventés

`FAIT` : `templates/product.json` ne remplit **aucun** réglage `professional_*`. Le repli
affiche donc trois praticiens fictifs, avec nom, spécialité, ville **et photo générée**
(`dentina-mock-pro-dentist-v4.webp`, `-hygienist-`, `-technician-`) :

> **Dr Camille L.** — Chirurgienne-dentiste · Lyon
> **Julien M.** — Prothésiste dentaire · Bordeaux
> **Sophie B.** — Hygiéniste dentaire · Lille

Sous un titre « **L'avis des professionnels** ». Aucun de ces praticiens n'existe.

### 🔴 BLOQUANT — Note et volume d'avis fabriqués

Affiché sur l'accueil **et** sur la fiche : **« 4,8/5 · +1 000 avis vérifiés »**, plus une
répartition détaillée — 86 % de 5 étoiles, 10 % de 4, 3 % de 3, 1 % de 2, 0 % de 1.
Aucun avis réel n'alimente ces chiffres.

### Pourquoi c'est bloquant et pas cosmétique

Le Code de la consommation range les faux avis de consommateurs parmi les **pratiques
commerciales trompeuses réputées telles en toutes circonstances** — il n'y a pas de
discussion sur le caractère trompeur, il est présumé. La peine encourue est lourde, et
le fait d'inventer des professionnels de santé aggrave la qualification.

`[À CONFIRMER par un avocat]` pour le détail des sanctions applicables à ta situation.
Mais sur le principe, il n'y a pas de zone grise : **ça doit sortir avant toute publicité.**

### 🟠 Sérieux — Le prix barré à 99,99 €

Tu m'as demandé de l'afficher, je l'ai fait. Mais la directive Omnibus impose que le prix
de référence barré soit **le prix le plus bas pratiqué dans les 30 jours précédents**.
Si le produit n'a jamais été vendu 99,99 €, le barré est une fausse réduction — même
famille d'infraction que les faux avis. **Vérifie que tu as bien vendu à 99,99 € pendant
30 jours avant d'afficher ce barré.**

### 🟠 Sérieux — Poids des ressources

| Fichier | Poids |
|---|---|
| `dentina-cycle-full-v8.mp4` | **8,3 Mo** |
| `dentina-review-approved-5-v2.png` | **2,3 Mo** |
| `dentina-cycle-step-2-v7.mp4` | 2,3 Mo |
| `dentina-cycle-step-3-v7.mp4` | 2,0 Mo |
| `dentina-photo-routine-man-v3.png` | 1,8 Mo |
| **Dossier `assets` complet** | **24 Mo** |

Sur du trafic Meta mobile en 4G, une vidéo de 8,3 Mo posée en autoplay coûte des visiteurs
avant même la première image. Les deux PNG lourds devraient être en WebP comme le reste.

### 🟡 À corriger — 13 fichiers morts dans `assets`

Aucun n'est référencé nulle part : les 7 `dentina-mock-review-*` et les 6
`dentina-review-approved-*`. Ils alourdissent le thème sans rien afficher.
**Note au passage : tu as six photos d'avis nommées « approved » qui ne sont pas
utilisées** — s'il s'agit de vrais avis clients, c'est exactement ce qui manque pour
remplacer les faux.

### 🟡 À corriger — Le repli de prix affiche 69,99 €

`sections/dentina-home.liquid` ligne 13 : si le produit n'est pas trouvé, le prix affiché
est `69,99 €` — l'ancien prix de Lyra, pas le tien. Sans conséquence tant que le produit
existe, mais c'est un reste de copie à nettoyer.

### 🟡 À vérifier — Pages légales

Mentions légales, CGV, politique de retour, de livraison et de confidentialité sont des
**pages Shopify**, pas des fichiers de thème : elles ne sont pas dans le zip. **Je ne peux
pas les auditer d'ici.** Sans elles correctement rédigées, tu n'as pas le droit de vendre
à distance en France.

---

## 3. Peut-il déjà générer de l'argent ?

**Techniquement oui. Légalement non. Économiquement, ça dépend d'un chiffre que tu n'as
pas encore.**

| Condition | État |
|---|---|
| Le tunnel fonctionne (panier, variantes, paiement) | ✓ oui |
| Les visuels et vidéos existent | ✓ oui |
| La page convertit structurellement | ✓ probable |
| **Les preuves affichées sont vraies** | ⛔ **non** |
| Les pages légales sont en place | ? non vérifiable |
| **La marge est connue** | ⛔ **non — pas de devis fournisseur** |

**Sur la marge.** Tout mon modèle repose sur un coût fournisseur de 14,00 € que
**personne n'a encore confirmé**. À ce coût, l'appareil à 89,99 € donne 49,48 € de marge
de contribution et un ROAS d'équilibre de 1,82 — le plan tient. **À 22 € de coût, le
multiple tombe à ×3,5 et il faut remonter le prix ou changer de fournisseur.** Tant que
le devis de ton agent n'est pas revenu, tu ne sais pas si chaque vente te rapporte ou te
coûte.

---

## TOP 3 DES PRIORITÉS

**1. Retirer les faux avis et les faux professionnels — aujourd'hui.**
Trois blocs à vider : le carrousel de l'accueil, la section « L'avis des professionnels »
de la fiche, et la pastille « 4,8/5 · +1 000 avis ». Tant qu'ils sont là, chaque euro de
publicité augmente ton exposition. Et tu as six photos d'avis « approved » inutilisées :
s'il s'agit de vrais clients, mets-les à la place.

**2. Obtenir le devis fournisseur.**
C'est le seul chiffre qui décide si ce site est une machine à gagner ou à perdre de
l'argent. Rien d'autre ne compte tant qu'il n'est pas là.

**3. Alléger la vidéo de 8,3 Mo et les deux PNG.**
Le plus gros gain de conversion mobile disponible immédiatement, sans rien changer au
design.

**Ce qu'on ne fait pas maintenant :** ni nouvelles sections, ni nouvelles fonctionnalités,
ni publicité. Le site n'a pas besoin d'être plus riche, il a besoin d'être vrai.

---

## Les deux modifications demandées

### La promesse de l'accueil

| | |
|---|---|
| Avant | « Les ultrasons délogent les dépôts en 5 minutes. » |
| **Après** | **« Vous le remettez en bouche sans hésiter. »** |
| Sous-titre avant | « Un nettoyage ciblé dans l'eau, jusque dans les reliefs difficiles d'accès de votre dentier. » |
| **Sous-titre après** | **« Cinq minutes dans l'eau. Les ultrasons délogent les dépôts jusque dans les reliefs. »** |

**Pourquoi.** L'ancienne accroche décrivait la machine. La nouvelle nomme le moment exact
que vit le client : **l'hésitation avant de remettre l'appareil en bouche.** C'est le
mécanisme d'abandon identifié dans l'angle marketing — on n'arrête pas de porter son
appareil parce qu'on l'oublie, on arrête parce qu'on n'a plus envie de le remettre.
Le mécanisme ultrasonique n'est pas perdu : il descend au sous-titre, à sa place de preuve.

**Mesuré, avant / après, mobile 390 px et desktop 1440 px :**

| | Avant | Après | Écart |
|---|---|---|---|
| Hauteur du héros | 651 px | 651 px | **0** |
| Largeur de l'image | 869 px | 869 px | **0** |
| Hauteur de l'image | 651 px | 651 px | **0** |
| Position de l'image | 126 px | 126 px | **0** |
| Hauteur du document | 3 321 px | 3 321 px | **0** |
| Vidéo du héros | ok | ok | — |
| Débordement horizontal | non | non | — |

**L'image n'a pas bougé d'un pixel.** Le titre tient sur deux lignes dans les deux versions.

### Le prix barré

La **fiche produit** le gérait déjà : elle lit `compare_at_price` et rend un `<s>`.
**L'accueil ne le faisait pas.** Ajouté à l'identique, plus la règle de style manquante,
placée dans `dentina-polish-v9.css` pour ne pas toucher au CSS principal.

Rendu vérifié : « ~~99,99 €~~ 89,99 € », barré à 17 px sur ordinateur et 16 px sur mobile,
aligné sur le style de la fiche produit.
