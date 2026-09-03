# Étapes 5 à 7 — Concurrence, trafic, publicités, angles

Objectif : savoir **si le marché est vivant**, et **quelle place y est libre**. Deux
questions distinctes — un marché peut être vivant et totalement verrouillé.

## Ce que l'analyse de concurrence n'est pas

Ce n'est pas de la copie. Copier la boutique n°1 d'un marché, c'est arriver deuxième sur sa
propre proposition, avec moins de budget et moins d'antériorité. On ne gagne jamais ce
combat.

L'analyse sert à **cartographier les positions occupées** pour trouver celle qui ne l'est
pas. Voir `05-positionnement.md`.

## Étape 5 — Identifier les concurrents

Cherche trois catégories, elles ne se valent pas :

| Catégorie | Définition | Ce qu'elle t'apprend |
|---|---|---|
| **Directs** | Même produit, même promesse | Les prix, les angles, l'offre du marché |
| **Indirects** | Autre produit, même douleur | La vraie alternative du client, donc la vraie objection |
| **Le statu quo** | Ne rien faire, ou une solution maison gratuite | Le concurrent le plus fort, presque toujours |

Sources : bibliothèque publicitaire Meta, TikTok Creative Center, Google (requêtes
commerciales), Amazon (les best-sellers de la catégorie), TrendTrack.

Vise **5 à 8 concurrents**. En dessous, la carte est trop pauvre pour décider. Au-dessus,
tu passes une journée à documenter au lieu de vendre.

## Étape 6 — Le trafic

| Concurrent | Domaine | Visiteurs M-2 | M-1 | Mois courant | Évolution | Source |
|---|---|---|---|---|---|---|
| | | | | | | |

### Comment lire ce tableau

Le chiffre absolu ne dit presque rien : les estimateurs de trafic sont imprécis, surtout sous
50 000 visites. **C'est la trajectoire qui compte**, et surtout la comparaison entre
concurrents mesurés par le même outil.

| Observation | Lecture |
|---|---|
| Plusieurs concurrents en hausse | Marché en expansion — le meilleur cas |
| Trafic stable et élevé | Marché mûr : il faudra un angle, pas un prix |
| Tout le monde s'effondre | Tendance passée. Ne pas entrer. |
| Un seul acteur, énorme, les autres à zéro | Marché verrouillé par une marque installée |
| Personne n'a de trafic | **Le plus souvent : pas de demande.** Pas une opportunité. |

Le fantasme du « marché sans concurrence » coûte cher. L'absence de concurrent signifie
presque toujours que d'autres ont essayé et arrêté. Avant de conclure à l'inverse, il faut
une explication précise de pourquoi ils ont échoué et de ce que tu fais différemment.

## Étape 7 — Les publicités

| Annonceur | Pubs actives | Plus ancienne encore diffusée | Nb de créas | Format dominant | Hook | Promesse | Angle |
|---|---|---|---|---|---|---|---|
| | | | | | | | |

### Le seul signal de rentabilité observable de l'extérieur

**L'ancienneté d'une publicité encore diffusée.** Un annonceur coupe une publicité qui perd
de l'argent en quelques jours. Une publicité qui tourne depuis 45 jours est donc, avec une
quasi-certitude, rentable.

| Ancienneté | Lecture |
|---|---|
| < 7 jours | Aucune information — c'est un test |
| 15-30 jours | Signal correct |
| > 30 jours | **Publicité gagnante.** Étudier son hook en détail. |
| > 90 jours | Angle structurellement solide sur ce marché |

Le **nombre** de créas dit autre chose : beaucoup de créas récentes = l'annonceur cherche
encore. Peu de créas anciennes = il a trouvé et exploite.

### Ce qu'il faut relever sur chaque publicité gagnante

1. Les **3 premières secondes**, décrites plan par plan.
2. La **première phrase** du texte, mot pour mot.
3. Ce qui est **montré** vs ce qui est **dit** — l'écart est souvent l'idée.
4. L'**offre** affichée (remise, bundle, livraison, garantie).
5. La **page d'atterrissage** : fiche produit, page dédiée, ou advertorial.

Recopie les mots exacts. Une paraphrase perd précisément ce qui fait fonctionner l'accroche.

## Les 10 angles — cartographier les positions

| Angle | Ce qu'il promet | Signe qu'il est saturé |
|---|---|---|
| Douleur | « Ce problème disparaît » | Tout le monde ouvre sur le même symptôme |
| Esthétique | « C'est beau » | Les visuels sont interchangeables |
| Confiance | « On est sérieux, garantis » | Tous affichent la même garantie 30 jours |
| Gain de temps | « Plus vite » | — |
| Économie | « Moins cher que X » | Guerre des prix déjà engagée |
| Transformation | « Avant / après » | Les mêmes photos partout |
| Identité | « C'est pour les gens comme toi » | Rarement saturé — souvent la place libre |
| Peur | « Le risque si tu ne fais rien » | Terrain glissant, jamais d'allégation santé |
| Simplicité | « Trois secondes, c'est tout » | — |
| Statut | « Ce que ça dit de toi » | Réservé aux marques établies |

### La synthèse qui compte

Une fois le tableau rempli, produis **5 angles encore disponibles**, chacun avec :

- Le **verbatim client** qui le justifie (issu de l'avatar, `04-avatar.md`).
- Pourquoi aucun concurrent ne l'occupe correctement aujourd'hui.
- L'accroche de 6 mois maximum qu'il produit.
- Ce qu'il faudrait pour le tenir (visuels, preuve, offre).

Un angle « libre » sans verbatim client n'est pas un angle libre : c'est une idée. Vérifie
qu'un client réel formule la chose ainsi avant d'y engager un budget.

## Outils TrendTrack — correspondance

Charger les schémas avec `ToolSearch` avant appel. **Toujours `check_credits` en premier** :
ces appels sont facturés, et un scan mal cadré consomme le budget d'un mois.

| Besoin | Outil |
|---|---|
| Solde de crédits | `check_credits`, `usage_get` |
| Identifiants de filtres (pays, catégorie) | `lookup_filter_ids` |
| Boutiques d'un marché + trafic | `search_shops` |
| Boutiques similaires à une connue | `find_similar_shops` |
| Publicités actives d'un marché | `search_ads` |
| Publicités TikTok | `search_tiktok_library` |
| Publicités Google | `search_google_ads_library` |
| Fiche d'un annonceur | `search_advertisers`, `brief_competitor` |
| Créas d'un concurrent suivi | `get_brandtracker_scaling_ads` |
| Transcriptions de vidéos publicitaires | `get_brandtracker_transcripts` |
| Séquences e-mail d'un concurrent | `search_emails`, `analyze_shop_emails` |
| Produits en tendance | `find_winning_products`, `daily_radar` |

**Discipline de budget** : fixer le nombre d'appels payants **avant** de commencer, et s'y
tenir. Un scan utile tient en 5 à 8 appels.

## Règle de restitution

Chaque chiffre du tableau porte sa source et son étiquette. Un tableau de concurrence dont
les colonnes sont remplies « au jugé » est pire que pas de tableau : il donne une fausse
assurance pour décider d'engager un budget publicitaire.

Case vide + `[À CONFIRMER]` > chiffre inventé.
