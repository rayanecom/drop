# Recherche produit TrendTrack — animaux & enfants
**Date : 10 septembre 2026 · Crédits consommés : ~180 unités sur 10 000 · Restant : 5 531**

---

## 0. LES DEUX PROBLÈMES, D'ABORD

### Problème 1 — Tes trois filtres ne peuvent pas cohabiter. Ils renvoient zéro.

| Combinaison testée | Résultat |
|---|---|
| Animaux + trafic 20-100k + créée < 6 mois | 33 boutiques |
| Animaux + trafic 20-100k + Ads Growth 90j > +100 % | 165 boutiques |
| **Les trois ensemble** | **0 boutique** |

Cause structurelle, pas un bug : une boutique de moins de 6 mois n'a pas
d'historique publicitaire sur 90 jours. Son `advertising.history` est vide, donc
la croissance ne peut pas être calculée, donc elle est éliminée. J'ai retesté en
30 jours : toujours 0.

**Arbitrage retenu :** j'ai gardé l'Ads Growth (elle prouve que quelqu'un dépense
et que ça tient) et lâché la date de création stricte. J'ai ensuite ajouté un
filtre que tu n'avais pas demandé — `max_products_count` — pour faire remonter la
boutique mono-produit plutôt que le bazar à 400 références.

### Problème 2 — Le trafic 20-100k/mois sélectionne des marques, pas des produits.

C'est le vrai enseignement de cette recherche. À 20-100k visites avec 100+ pubs
actives, on ne trouve pas un dropshipper qui a trouvé un produit : on trouve une
marque installée qui a développé son produit. Sur les 27 boutiques animaux et les
23 boutiques enfants remontées :

- ZeroMOUSE, Stimulicat, Stapelstein, MODU, CMY Cubes, Petoi, petTracer, Ropet →
  **produits propriétaires**, vendus sous leur propre marque sur Amazon. À étudier,
  pas à copier.
- Bullymake, Raddish Kids, Hungry Minds, Smartypals, MonkiBox → **box par
  abonnement**. Autre métier.
- ~10 boutiques animaux sur 27 vendent des **compléments ou de l'alimentation** →
  c'est le mur réglementaire que j'ai documenté dans `01-produit.md`. Éliminées.
- Inq Factory (Vsauce + MEL Science) → **marque de créateur**. Inreproductible.

J'ai donc relancé une passe avec des filtres corrigés : trafic 10-100k, Ads Growth
30 jours > +100 %, **moins de 25 produits au catalogue**, créée après juin 2024.
Résultat : 10 boutiques animaux, 12 boutiques enfants. C'est là que sont les vraies
trouvailles, et c'est de là que vient ma recommandation.

---

## 1. LE TABLEAU DES 10 PRODUITS

Notes sur 5. `Sourçable` est la colonne que tu n'as pas demandée et qui décide de
tout : un produit propriétaire n'est pas un produit, c'est un concurrent.

| # | Produit | Boutique · pays | Prix constaté | Douleur aiguë + récurrente | Cible identitaire | ×4 possible | Simple | Waouh | Sourçable | Déjà en France ? |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | **Housse de chaise anti-griffes à panneau sisal** | Felivio (ex-Happy Scratchy) · AT | 29,90 € l'unité — lot 5+1 à 149,50 € | **5** — le chat détruit les chaises, tous les jours | **5** — « j'aime mon chat ET mon intérieur » | **✅ ×4,05** à 99 € le lot de 4 | ✅ textile | 4 — avant/après imparable | **✅ oui** | **❌ NON — trou vérifié** |
| 2 | **Peluche lestée à longues pattes** | Ulgago · PL | 199 zł ≈ 47 € (taille L, 60 cm, 1 kg) | **5** — l'enfant qui ne s'endort pas, chaque soir | **5** — parent d'enfant hypersensible / TDAH | ⚠️ ×3,67 à 49,90 € — il faut 59,90 € | ✅ | 4 | ✅ oui | **❌ SATURÉE** — LeoBelo, Espace Inclusif, Ma Peluche (34,90-74,90 €), Cdiscount |
| 3 | **Litière automatique** | Purr-Pod · AU | ~450-600 € | **5** — corvée quotidienne + odeur | 4 | **❌ impossible** — COGS 150-250 € | ❌ technique | 5 | ✅ mais SAV + fret volumineux | ✅ oui (Litter-Robot, PetSafe) |
| 4 | **Capteur IA anti-proie sur chatière** | ZeroMOUSE 2.0 · DE | 199 € | **5** — la souris morte sur le tapis | **5** — « je protège la faune » | plafond 50 € — invérifiable | ❌ caméra + firmware | **5** | **❌ PROPRIÉTAIRE** — vendu sur Amazon UK et DE sous sa marque | ❌ |
| 5 | **Collier GPS chat** | petTracer · CH | ~150-200 € | **5** — le chat qui ne rentre pas | 5 | ❌ | ❌ électronique + abonnement | 4 | **❌ PROPRIÉTAIRE** | ✅ (Weenect, Tractive) |
| 6 | **Carnet à gratter « 50 aventures avec ton chien »** | Doggo Unleashed / thepawfectadventure · LT | ~35 € | **1** — aucune douleur, c'est un cadeau | **5** — « dog parent » | **✅ ×7,98** à 39,90 € | ✅ | 3 | ✅ oui | partiellement (carnets à gratter voyage) |
| 7 | **Panier à instinct pour chat d'intérieur** | Stimulicat · US | 79,95 $ ≈ 74 € | 3 — ennui, pas une douleur aiguë | 4 | plafond 18 € | ✅ | 3 | ⚠️ design déposé probable | ❌ |
| 8 | **Cible de tir football murale** | STRYKA SkillZone · GB | 35,95 $ ≈ 33 € | **1** — divertissement | 3 | ⚠️ prix trop bas | ✅ bâche + ballon | 3 | ✅ trivialement | ✅ (Décathlon) |
| 9 | **Blocs magnétiques de construction** | Click Blocks · HK | 16 à 70 $ | **1** | 3 | ⚠️ | ✅ | 3 | ✅ mais **hyper-concurrentiel** (Magna-Tiles & cie) | ✅ massivement |
| 10 | **Set couteau à sculpter enfant** | Eli der Elefant · DE | 35,99 € | 2 — « mon enfant est sur les écrans » | **5** — parent qui veut sortir l'enfant dehors | ✅ probable | ✅ | 3 | ✅ mais **jouet → EN 71 + CE + GPSR**, et une lame pour enfant = risque produit | ❌ peu présent |

### Ce que le tableau dit d'un coup d'œil

Trace deux lignes : **douleur ≥ 4** et **sourçable = oui**.
Il ne reste que **deux produits** : le n°1 et le n°2.
Puis applique le ×4 réel : **il ne reste que le n°1.**

---

## 2. POURQUOI LE N°1 GAGNE

**Le produit :** une housse de chaise extensible avec un panneau de sisal cousu dans
le dossier. Elle protège la chaise *et* donne au chat une surface à griffer au même
endroit — c'est-à-dire à l'endroit exact où il griffe déjà. On ne lui demande pas de
changer d'habitude, on habille son habitude.

**La preuve marché (FAIT, TrendTrack) :** Felivio — 12 268 visites/mois, 47 pubs
actives, Ads Growth 30 j > +100 %, boutique créée le 13 janvier 2025, moins de 25
produits au catalogue. L'origine du produit est Happy Scratchy, entreprise familiale
autrichienne fondée en avril 2023, rachetée par Felivio en mars 2025. **Trois ans
d'existence, un rachat, et de la pub qui accélère aujourd'hui** : ce n'est pas un
feu de paille TikTok, c'est un produit qui tient dans la durée.

**L'arbitrage géographique (FAIT, vérifié par recherche) :** le marché français
propose bien —
- des housses de **canapé** anti-griffes (France Housse, Animimi.fr) ;
- des **tapis griffoirs** en sisal vendus séparément (GRIFDOR, PawHut, Cdiscount) ;
- des housses de chaise extensibles **génériques** (ManoMano, Leroy Merlin, Cdiscount).

Personne ne vend l'hybride : **la housse de chaise de salle à manger avec le sisal
intégré, en lot.** C'est exactement ton Test 3 — prouvé à l'étranger, absent en
France.

**L'économie (ESTIMATION — aucun devis fournisseur à ce stade) :**

Hypothèse de sourcing : 4,50 € FOB l'unité, 5 € de fret pour le lot, 6,3 % de droits
sur les housses textiles, 6 % de retours.

| Prix TTC du lot de 4 | ×TTC | Marge de contribution | CPA d'équilibre | ROAS d'équilibre |
|---|---|---|---|---|
| 79 € | ×3,23 | 34,66 € | 34,66 € | 2,28 |
| **99 €** | **×4,05 ✅** | **50,05 €** | **50,05 €** | **1,98** |
| 119 € | ×4,87 | 65,43 € | 65,43 € | 1,82 |

**Un ROAS d'équilibre à 1,98.** C'est le chiffre le plus important de tout ce
document. Ça veut dire que tu es rentable dès que 1 € de pub rapporte 2 € de vente.
Sur le dentaire on était à un seuil bien plus exigeant.

**Objectif de négociation fournisseur** pour tenir le ×4 sur le prix affiché :
**23,28 € le lot de 4, fret compris** — soit 5,80 € la housse rendue. À 4,50 € FOB,
il y a de la marge.

**Ce qu'il faut vérifier avant de s'engager (je ne peux pas le faire d'ici) :**
1. Un devis réel de ton agent en Chine sur « stretch chair cover with sisal panel »,
   en L et S, MOQ et prix par palier.
2. La solidité de la couture sisal/tissu. C'est le seul point de casse du produit :
   un chat qui décolle le sisal en trois semaines, c'est un taux de retour à 25 %.
   **Exige un échantillon et laisse-le à un vrai chat pendant un mois.**
3. Le lot de 4 vs le lot de 6. Felivio vend 5+1. À tester.

---

## 3. POURQUOI LE N°2 PERD — ET POURQUOI C'EST INSTRUCTIF

La peluche lestée cochait tout : douleur nocturne réelle, cible identitaire
massive (parent d'enfant hypersensible), objet simple, très filmable. Ulgago l'a
lancée en juillet 2025 et fait déjà 23 875 visites/mois avec 207 pubs actives, en
se présentant comme « la première en Pologne ».

Elle échoue sur **deux points, et un seul aurait suffi** :

1. **La France est déjà servie.** LeoBelo, Espace Inclusif, Ma Peluche (34,90 à
   74,90 €), Petit Pas et Maman, Jeux-Focus, plus Cdiscount. L'arbitrage n'existe
   pas : arriver derrière eux, c'est payer le CPA le plus cher du marché.
2. **Le ×4 ne passe pas au bon prix.** À 49,90 € tu es à ×3,67. Il te faudrait
   59,90 € pour être à ×4,40 — au-dessus du plus cher des Français.

Et il y a un troisième point que je signale même si tu ne l'as pas demandé : ce
produit se vend en promettant d'apaiser l'anxiété d'un enfant. **En France, tout
glissement vers « traite l'anxiété », « aide au TDAH », « thérapeutique » te fait
basculer vers l'allégation de santé.** C'est un terrain où je t'ai déjà dit non sur
le dentaire, et je te dirais non ici aussi.

---

## 4. CE QUE CETTE RECHERCHE M'A APPRIS SUR LA MÉTHODE

À reporter dans `01-produit.md` :

> **Le trafic est un mauvais filtre de chasse.** 20-100k visites/mois sélectionne
> des marques établies, pas des produits copiables. Pour trouver un produit
> sourçable, le bon jeu de filtres est : **catalogue < 25 produits + Ads Growth 30 j
> > +100 % + créée il y a 6 à 24 mois + trafic 10-40k**. Le catalogue court est le
> filtre le plus discriminant de tous : il sépare le vendeur d'un produit du
> revendeur de mille.

---

## 5. CE QUE JE FERAIS SI C'ÉTAIT MON ARGENT

Je prends le **n°1**, la housse de chaise à panneau sisal.

Pas parce que c'est le produit le plus spectaculaire — le n°4 l'est bien davantage.
Parce que c'est le seul des dix qui réunit les cinq conditions en même temps :
une douleur que le client subit chaque jour, une cible qui s'identifie, un ×4 qui
tient au calcul, un objet qu'on peut faire fabriquer sans ingénieur, et un trou
vérifié sur le marché français.

Et je le prends aussi pour une raison que tu n'as pas listée : **c'est un produit
qui se vend en lot.** Personne n'a une seule chaise. Le panier moyen est structurel,
pas arraché avec un upsell.

### TOP 3 PRIORITÉS

1. **Fais lever le doute sur le brevet.** C'est bloquant et ça passe avant le
   sourcing — détail complet en section 8. Un conseil en propriété industrielle,
   une recherche d'antériorité, 300 à 600 € et quelques jours.
2. **En parallèle, envoie le brief de sourcing à ton agent en Chine.** « Stretch
   dining chair cover with integrated sisal scratching panel », tailles S et L,
   prix pour 100 / 300 / 500 pièces, échantillon payant. Objectif : ≤ 5,80 € rendu.
3. **Commande un échantillon et fais-le griffer par un vrai chat pendant un mois.**
   C'est le seul test qui décide si ce produit est vendable ou si c'est un piège à
   retours.

### CE QU'ON NE FAIT PAS MAINTENANT

- On ne relance pas TrendTrack. Les filtres corrigés ont donné ce qu'ils avaient à
  donner, et 5 531 crédits doivent servir à analyser les pubs de Felivio quand on
  passera à la phase créa — pas à re-chasser.
- On ne touche pas au n°4 (ZeroMOUSE). C'est le produit le plus intelligent du lot
  et c'est précisément pour ça qu'il est hors d'atteinte.

---

## 6. RAPPEL — CE QUI RESTE OUVERT SUR LE DOSSIER DENTAIRE

Cette recherche ne l'annule pas, mais elle ne le débloque pas non plus. Restent en
suspens : le devis fournisseur du nettoyeur à ultrasons, les 20 verbatims de porteurs
de contention (porte 4 jamais franchie), et l'antériorité INPI sur DENTINA.

**Et surtout, la priorité n°1 de l'audit du site, toujours pas traitée : les 4 avis
clients et les 3 professionnels dentaires fabriqués sont encore en ligne sur la
boutique publiée.** Un faux avis de consommateur est une pratique commerciale
trompeuse réputée telle en toutes circonstances. Ça passe avant toute nouvelle
chasse produit.

---

## 7. ANALYSE CONCURRENTIELLE COMPLÈTE — LE PROBLÈME « GRIFFES DU CHAT »

Toutes les données publicitaires ci-dessous sont des **FAITS** issus de la
bibliothèque Meta via TrendTrack, relevés le 10 septembre 2026.

### 7.1 Concurrence directe sur le produit exact — une seule entreprise au monde

Recherche sur le mot « Kratzhusse » dans les textes publicitaires : **190 publicités
recensées. Toutes appartiennent au même annonceur.**

| | Felivio — Premium Katzenprodukte aus Sisal |
|---|---|
| Page Facebook | 620080194502448 |
| Publicités actives | **47** |
| Reach 30 jours | **401 702** |
| Reach cumulé | **8 614 185** |
| Pays ciblés | **DE + AT uniquement — 2 pays** |
| Abonnés Instagram / likes FB | 2 709 / 777 |
| Trafic boutique | 12 268 visites/mois, créée le 13/01/2025 |
| Trustpilot (Happy Scratchy) | **5,0 / 5 sur 571 avis** |

Historique : Sabine et Roman Baumgartner cherchent en 2018 une protection de chaise,
n'en trouvent pas, la cousent eux-mêmes. Ils gagnent le concours « 120 Sekunden » de
la meilleure idée de start-up de Basse-Autriche en 2022, créent Happy Scratchy GmbH
fin 2022, lancent la vente en mai 2023 : **3 000 unités vendues en quatre mois,
quasi rupture de stock.** Rachat par Felivio en mars 2025. La société d'origine
Happy Scratchy GmbH (FN 593992v) est aujourd'hui **en liquidation** — cohérent avec
un transfert d'actifs vers Felivio, pas avec un échec commercial.

**Ce que ça veut dire pour toi :** un produit validé par trois ans de ventes, 571
avis à 5/5, et **zéro concurrent direct sur la planète**. Et il ne s'adresse
aujourd'hui qu'à deux pays germanophones.

### 7.2 Leurs angles publicitaires — ce qui marche déjà, gratuitement

Leur meilleure pub (rang 1 sur leur page, 590 564 de reach, ~5 315 € de dépense
estimée, en ligne depuis 148 jours) est un témoignage à la première personne :

> « Katzenliebhaber aufgepasst ! J'ai trouvé la solution au problème des griffes […]
> Ma chatte peut griffer sans rien abîmer. Mes chaises ont l'air neuves. […] Et le
> plus fort ? Elles épousent la chaise — comme si j'avais acheté de nouvelles chaises ! »

Leur pub la plus durable (393 jours) est un simple retour en stock. Et leur angle le
plus fin, celui que je reprendrais :

> « Ta chatte ne fait rien de mal — elle a juste besoin du bon endroit pour ça. »

Puis, dans une autre :

> « Ta chatte griffe la chaise ? Tu as essayé l'arbre à chat, le spray, l'éducation —
> et rien n'y fait. Ce n'est pas ta faute : les chats griffent instinctivement là où
> ils se sentent bien, et ça se trouve être ta chaise. »

**Les quatre bénéfices qu'ils répètent partout :**
1. protège les chaises ;
2. satisfait le besoin naturel de griffer ;
3. **remplace l'arbre à chat — gagne de la place et de l'argent** ;
4. s'adapte à presque toutes les chaises.

Le n°3 est le plus sous-estimé. Ils ne vendent pas une housse, ils vendent
**un arbre à chat qui ne prend aucune place.** C'est ça, l'angle.

**Deux mécaniques d'offre qu'ils utilisent** : jouet pour chat offert dans chaque
commande, et 30 jours satisfait ou remboursé — assumés dans la pub avec une phrase
que je trouve très bien écrite : « ces housses ne sont pratiquement jamais
retournées — malgré la garantie 30 jours ». **C'est une preuve sociale honnête, pas
une fausse rareté.** À reprendre telle quelle si nos chiffres le permettent.

### 7.3 Le marché français — chaud, disputé, et vide à cet endroit précis

Recherche sur « griffes de votre chat » en français : **86 publicités, plusieurs
annonceurs actifs.** Le problème est donc prouvé en France, avec de vrais budgets.

| Annonceur | Produit | Pubs actives | Reach 30 j | Lecture |
|---|---|---|---|---|
| **Activ'Pet** (activ-pet.com) | Lime à griffes silencieuse | **459** | **1 711 586** | Le poids lourd. 55,5 M de reach cumulé, 100 % France. |
| **Le Coin des Matous** → mongrosmatou.com | « Nid du Matou » — lit + griffoir en lin tressé | 79 | 756 818 | Publirédactionnel long ultra-travaillé, 14 pays. |
| **Oreilune** (oreilune.com) | Housse de canapé extensible anti-griffes | 9 | 218 902 | **Le plus proche de nous — mais canapé, et sans sisal.** |
| **Frolic-Off** | « NailNest » — griffoir distributeur de friandises | 11 | — | Lancé il y a 3 jours. |
| **Aquasonic** → pattedoucefr.com | « GriffeZen » — lime | 0 | — | Éteint. |
| **Purephenom** | Diffuseur apaisant anti-griffades | 0 | — | Éteint. |

**Conclusion en une ligne : en France, tout le monde attaque les griffes du chat par
l'outil (limer, couper) ou par le comportement (diffuseur). Personne ne les attaque
par le meuble.** Oreilune s'en approche avec la housse de canapé, mais sans surface
à griffer : elle cache le problème, elle ne le résout pas.

### 7.4 Distribution française — les substituts que le client trouve aujourd'hui

| Catégorie | Qui | Prix constatés |
|---|---|---|
| Housse de canapé anti-griffes | Animimi.fr, France Housse, Oreilune, ManoMano | **19,90 à 73,90 €** |
| Tapis griffoir sisal à coller | Italdos, Navaris, PawHut, GRIFDOR, Cdiscount | ~15 à 40 € |
| Housse de chaise extensible générique | Cdiscount, Leroy Merlin, Amazon, ManoMano | lot de 6, entrée de gamme |
| Griffoir d'angle artisanal | Etsy | variable |
| Arbre à chat | animaleries, Amazon | 40 à 200 € |
| Lime / coupe-griffes | Activ'Pet, Amazon | 20 à 50 € |

**Aucun de ces acteurs ne vend l'hybride.** Le client français qui veut résoudre le
problème doit aujourd'hui acheter **deux produits** : une housse pour protéger, un
griffoir pour détourner. Notre produit en est un seul.

Et le prix de référence est posé : Animimi vend jusqu'à **73,90 €** une simple housse
de canapé sans sisal. **Un lot de 4 housses de chaise à 99 € n'est pas cher dans ce
paysage — il est cohérent.**

### 7.5 Architecture de prix recommandée — dans ta fourchette 30-100 €

| Offre | Prix TTC | Prix / housse | Rôle |
|---|---|---|---|
| 1 housse | **34,90 €** | 34,90 € | Ancrage. Volontairement peu attractive. |
| Lot de 2 | **59,00 €** | 29,50 € | Le compromis. |
| **Lot de 4 — « la table »** | **99,00 €** | **24,75 €** | **Le best-seller visé.** ×4,05, marge 50,05 €. |

Le lot de 4 est le cœur de l'offre parce que **personne n'a une seule chaise de
salle à manger.** Le panier moyen est structurel, pas arraché par un upsell. Et 99 €
reste sous ta limite haute.

Ne pas descendre sous 99 € pour le lot de 4 : à 79 € on tombe à ×3,23 et la règle
du ×4 saute.

---

## 8. LE RISQUE QUI DÉCIDE DE TOUT — LE BREVET

Dans leurs publicités, Felivio écrit noir sur blanc : **« Nur bei Felivio —
patentiert & exklusiv! »** et **« Patentierte Sisal-Kratzhusse »**.

Voici exactement ce que j'ai pu établir, et ce que je n'ai pas pu :

| | |
|---|---|
| **FAIT** | La presse économique autrichienne rapporte que les Baumgartner **ont déposé une demande de brevet** sur la protection anti-griffes fin 2022, avant de créer la société. |
| **FAIT** | Ils revendiquent « patentiert » dans leurs publicités Meta actives aujourd'hui. |
| **FAIT** | Ils écrivent aussi « Made in Austria » — ils ne produisent pas en Asie. |
| **NON VÉRIFIÉ** | **Aucune publication de brevet à leur nom n'apparaît dans l'index de Google Patents auquel j'ai accès.** Ce n'est PAS une preuve d'absence : Espacenet et Google Patents sont tous deux bloqués par le proxy sortant de cet environnement, je n'ai pu interroger que l'index d'un moteur de recherche. |

### Ce qu'il faut comprendre avant de paniquer

**Un brevet est territorial.** Un brevet autrichien ne protège que l'Autriche. Pour
nous bloquer en France, il faudrait un brevet européen validé en France, ou un brevet
français. C'est une démarche coûteuse qu'une PME familiale ne fait pas toujours.

**« Déposer une demande » ≠ « avoir un brevet ».** Beaucoup de demandes sont rejetées
pour défaut de nouveauté, et l'antériorité ne manque pas ici : tapis griffoirs sisal
adhésifs, Sofa-Scratcher américain, housses de protection. Il est également fréquent
qu'une entreprise écrive « patentiert » en s'appuyant sur un **modèle d'utilité**
(Gebrauchsmuster, délivré sans examen de fond) ou un **dessin et modèle** — qui ne
protège que l'apparence exacte, contournable par un design différent.

**Mais je ne bâtis pas une entreprise sur une supposition.** Un procès en contrefaçon
te coûterait bien plus que la vérification.

### La vérification, concrètement

Va voir un **conseil en propriété industrielle** avec ces trois éléments : Happy
Scratchy GmbH, FN 593992v, dépôt fin 2022 / Sabine et Roman Baumgartner, Basse-Autriche
/ Felivio, repreneur en mars 2025. Demande une recherche d'antériorité et de liberté
d'exploitation sur la France. **Compte 300 à 600 € et quelques jours.**

Trois issues :
1. **Rien en France** → on y va, c'est un boulevard.
2. **Un dessin et modèle** → on y va avec un design différent (autre découpe du
   panneau sisal, autre finition), sur avis du conseil.
3. **Un brevet européen validé en France** → on ne touche pas au produit. On garde
   la douleur, on change de solution : ce marché français est chaud (voir 7.3), et
   la housse de canapé à panneau sisal — celle qu'Oreilune vend sans sisal — reste
   entièrement libre.

**Dans les trois cas, le travail de cette recherche n'est pas perdu :** on a
identifié une douleur quotidienne, une cible identitaire, un marché français qui
dépense déjà, et un angle que personne n'utilise en France — « ne dresse pas ton
chat, habille ton meuble ».

---

# APPROFONDISSEMENT — 10 septembre 2026, seconde passe

Chasse au **niveau des publicités** cette fois, pas des boutiques. C'est là que
vivent les produits copiables. 344 pubs animaux et 217 pubs enfants actives sur la
France, 942 pubs animaux et 193 pubs enfants sur DE/NL/ES/IT, toutes filtrées sur
des boutiques de moins de 30-40 produits.

## 9. CE QUE L'APPROFONDISSEMENT CHANGE SUR MES FINALISTES

### 9.1 Housse de chaise à panneau sisal — le sourcing est plus lourd que prévu

Vérification faite sur Alibaba et 1688 : **les composants existent en masse, le
produit fini n'existe pas.**

| Ce qui est au catalogue | Ce qui ne l'est pas |
|---|---|
| Tissu sisal pour griffoirs, 0,29 à 6,50 $ | **La housse de chaise avec panneau sisal cousu** |
| Tapis griffoirs sisal (104 000 réf. sur 1688) | |
| Housses de chaise extensibles génériques | |
| Usines OEM (Anhui KIDD, Xuzhou Miao Gongjiang, Shuimusheng Hengshui) | |

**Conséquence directe, et elle est sérieuse :** ce n'est pas un produit qu'on
commande à 20 exemplaires pour tester. C'est une **fabrication sur mesure** — MOQ
typique 300 à 500 pièces, 30 à 45 jours de délai, **2 000 à 4 000 € engagés avant
la première vente.** Ça explique aussi pourquoi Felivio produit en Autriche et
pourquoi personne ne l'a copié en trois ans : ce n'est pas seulement le brevet,
c'est la barrière à l'entrée industrielle.

Ça ne tue pas le produit. Ça change son profil : **c'est un pari, pas un test.**

### 9.2 Peluche lestée — je la sors définitivement

Deux faits nouveaux, décisifs :

| Acteur | Marché | Pubs actives | Reach 30 j | Reach cumulé |
|---|---|---|---|---|
| **Brease** (breaseworld.com) | DE | **306** | **2 033 519** | 22 400 330 |
| **Ulgago España** (es.ulgago.com) | ES | 28 | 294 694 | 793 033 |

La catégorie n'est pas une opportunité, c'est **une course européenne déjà lancée**,
avec des acteurs qui dépensent lourd. Et la France compte déjà cinq vendeurs locaux
à 34,90-74,90 €. On arriverait huitième.

Deux enseignements à garder quand même :
- **Ulgago a pivoté vers l'adulte.** Leur meilleure pub espagnole dit « la
  sur-stimulation ne demande pas l'âge » et raconte que les parents finissent par
  commander la leur. Le marché adulte anti-stress est plus grand que le marché enfant.
- **Brease écrit « recommandé par des psychologues danois ».** En France, ce type de
  formulation frôle l'allégation de santé. On ne le copierait pas.

### 9.3 Souvenir / mémorial animal — mort aussi

J'avais classé le carnet à gratter n°6. Même métier que le kit d'empreinte de patte,
qui scale en Italie (Whiskerly, 97 pubs, 170 jours en ligne, 5,6 M de reach cumulé)
et en Allemagne (Vilenu, pendentif à compartiment à poils, **638 184 de reach en
30 jours avec seulement 6 publicités**).

**La France est déjà pleine :** KitCatDog.fr, Truffe Délice, Patte-Animal, Esthima,
MemoMori, Mieux Que Des Fleurs, plus Rakuten et Cdiscount. Prix établis : 10-25 €
en encre, 20-45 € en argile avec cadre. Aucun arbitrage.

## 10. LE CONSTAT STRUCTUREL SUR LE MARCHÉ FRANÇAIS

### 10.1 Animaux — le marché français est un marché de compléments

Les six plus gros annonceurs actifs sur la France :

| Annonceur | Pubs actives | Reach 30 j | Produit |
|---|---|---|---|
| **Tipaw** (store-tipaw.com) | 326 | **9 296 481** | complément (« yeast overgrowth ») |
| **Feliway** (Ceva) | 167 | 6 695 740 | diffuseur — laboratoire pharma |
| **Vitamii** (vitamii.fr) | 161 | 6 230 963 | friandise immunité, poudre dentaire |
| **Réglo** (reglo.fr) | 166 | 3 353 252 | complément santé intestinale |
| **Activ'Pet** | 459 | 1 711 586 | **lime à griffes — produit physique** |
| **Le Coin des Matous** | 79 | 756 818 | fontaine à eau inox, nid griffoir |

**Quatre des six vendent du consommable ingéré.** C'est le mur réglementaire que
j'ai documenté, et il est infranchissable sans un dossier complément alimentaire.

Mais lis-le à l'envers : **le terrain du produit physique non consommable est
comparativement dégagé.** Activ'Pet est quasiment seul à ce volume. C'est une bonne
nouvelle pour la housse — et ça vaut d'être dit.

### 10.2 Enfants — très actif, tenu par des dropshippers français

| Annonceur | Pubs | Reach 30 j | Produit | Prix |
|---|---|---|---|---|
| **Mon Petit Curieux** | **738** | 3 092 821 | feutres acrylique | — |
| **Petiscope** | 47 | **2 121 853** | **microscope enfant 60-120×** | **29,99 à 63,99 €** |
| **Restaura / NeuroKids** | 261 | 2 048 577 | activités imprimables (numérique) | 12,99 $/mois |
| **Petit Hafiz** | 41 | 1 268 740 | univers coranique enfant | — |
| **Mon Loulou** (Grenoble) | 29 | 992 604 | livre d'activité Montessori | 39,99 € (barré 79,99 €) |
| **My Little Deen** | 121 | 655 569 | peluche veilleuse coranique | — |
| **PixiBear** | 218 | 554 172 | ours géant 43 cm à assembler, 5 000-7 000 pièces | — |

## 11. LES NOUVEAUX CANDIDATS

| Produit | Preuve de marché | Avantages | Inconvénients |
|---|---|---|---|
| **Microscope enfant 60-120×** (Petiscope) | 47 pubs → **2,12 M de reach/mois en France**, 424 avis Trustpilot | Demande énorme **déjà prouvée sur ton marché** · 29,99-63,99 €, pile dans ta fourchette · sourçable au catalogue, testable à 20 unités · ×4 facile · **le leader est détesté : 2,7/5, 51 % de 1 étoile** — logistique, délais et promos jugés trompeurs | **Aucune douleur aiguë** — c'est un achat cadeau/éducatif · jouet → EN 71 + CE + GPSR · saisonnier (Noël) · concurrent bien financé |
| **Ours géant à assembler** (PixiBear) | 218 pubs, 554 k reach/mois, FR | Effet waouh fort · tiroir secret · sourçable (briques compatibles) · cadeau à forte valeur perçue | Zéro douleur · très saisonnier · place FR déjà prise · 5 000 pièces = risque de pièces manquantes et de SAV |
| **Peluche veilleuse coranique** (My Little Deen, Petit Hafiz) | 162 pubs cumulées, 1,92 M reach/mois | **Cible identitaire parmi les plus fortes qui existent** · marché structurellement mal servi · faible concurrence · réachat et bouche-à-oreille communautaire | Niche confessionnelle : à traiter avec respect et sérieux, pas comme un créneau · calendrier religieux · jouet → EN 71 + CE |
| **Tour d'observation Montessori** (Toadly) | **19 pubs → 1,3 M de reach/mois**, 8,1 M cumulé, 89,95 € | Le meilleur ratio pub/portée de toute la recherche · prix parfait · mono-produit avec drops de couleur en édition limitée · vendu aussi sur bol.com | Bois massif = **fret prohibitif** depuis la Chine · France déjà servie · pas de douleur aiguë · risque produit (un enfant en hauteur) |
| **Sweat à poche bouillotte** (HuggHer) | 36 pubs, 292 k reach/mois, marque neuve qui décolle | **Douleur aiguë et récurrente authentique** (règles douloureuses, tous les mois) · identité très forte · sourçable (confection standard) · dans la fourchette de prix | **Hors des niches que tu as demandées** · au moins deux acteurs déjà au UK (huggercomfort, huggablehoodie) · textile = tailles, retours, stock multiplié |
| **Housse de canapé à panneau sisal** (dérivé) | Oreilune : 9 pubs, 218 902 reach/mois en FR — **sans sisal** | Même douleur et même angle que le n°1 · **aucun brevet en vue** · marché FR prouvé · sourcing plus simple qu'une housse de chaise | Marché FR déjà occupé · différenciation reposant sur le seul panneau sisal · moins « lot », donc panier moyen plus faible |

### Le cas Petiscope mérite d'être lu attentivement

Un microscope enfant coûte 3 à 8 € en Chine. Il se vend 29,99 à 63,99 € en France.
Le leader fait **2,12 M de reach par mois** — la demande n'est pas à prouver, elle
est démontrée. Et ce leader est noté **2,7/5 sur 424 avis, avec 51 % de 1 étoile** :
problèmes logistiques, délais annoncés non tenus, promotions jugées trompeuses,
note affichée sur son propre site qui ne correspond pas à la réalité.

**C'est la définition d'un concurrent battable — non pas par un meilleur produit,
mais par une meilleure exécution.** Stock réel en France, délai annoncé tenu, aucun
faux compteur, service client qui répond. C'est exactement la politique d'honnêteté
commerciale qu'on s'est fixée, transformée en avantage concurrentiel.

Ce qui l'empêche d'être mon n°1 : **il ne résout aucune douleur.** C'est un cadeau.
Le CPA d'un cadeau explose en dehors de novembre-décembre.

## 12. ARBITRAGE FINAL — deux stratégies, pas deux produits

| | **Housse à panneau sisal** | **Produit de type Petiscope** |
|---|---|---|
| Nature du pari | Pari **produit** : un produit que personne n'a | Pari **exécution** : un produit banal, mieux servi |
| Douleur | Quotidienne, aiguë | Aucune |
| Test possible | ❌ MOQ 300-500, 2-4 k€, 30-45 j | ✅ 20 unités, ~200 €, 2 semaines |
| Risque juridique | **Brevet revendiqué, non levé** | Aucun (hors EN 71 / CE) |
| Concurrence FR | **Zéro** | Forte mais mal exécutée |
| Saisonnalité | Aucune | Forte (Noël) |
| Plafond | Élevé — marque défendable | Moyen — copiable en 3 semaines |

**Ma position ne change pas : la housse.** Une entreprise se construit sur une
douleur, pas sur un cadeau. Un cadeau te fait un décembre, une douleur te fait une
marque.

Mais je change une chose dans le plan : **la recherche d'antériorité passe avant
tout, parce que le montant en jeu a doublé.** Ce n'était qu'un risque juridique la
semaine dernière ; avec un MOQ de 300 à 500 pièces, c'est 2 000 à 4 000 € qu'on
engage sur un produit peut-être breveté. On ne signe rien avant la réponse du
conseil en PI.

**Si le brevet bloque :** on bascule sur la housse de canapé à panneau sisal, même
douleur, même angle, mêmes créas, sourcing plus simple, aucun brevet en vue.

---

## 13. VÉRIFICATIONS COMPLÉMENTAIRES — les trois points que j'avais laissés ouverts

### 13.1 CORRECTION — Animimi vend déjà une housse à sisal intégré en France

Je t'avais dit que personne en France ne vendait l'hybride « housse + surface à
griffer ». **C'est faux, et la correction est importante.**

[Animimi.fr](https://animimi.fr/protection-canape-chat/) vend une **housse
d'accoudoir de canapé en sisal**, sur mesure, 4 coloris et 5 tailles. Et leur
argumentaire est mot pour mot celui que j'avais identifié comme notre angle :

> « redirige le comportement du chat plutôt que de le combattre […] le sisal est une
> fibre naturelle que les chats adorent griffer — le même matériau que la plupart des
> griffoirs, ce qui donne au chat une surface qu'il préfère naturellement. »

**Ce que ça change :**
- Le concept est **déjà validé sur le marché français**. Ce n'est plus une hypothèse.
- L'angle marketing n'est **plus vierge** : un acteur français l'utilise déjà.
- **La housse de chaise reste libre**, mais le fossé se réduit à l'application, pas
  au concept.
- Et ça confirme ma mise en garde : Animimi peut étendre son sisal du canapé à la
  chaise quand il veut. La barrière est une couture.

Ce que ça ne change pas : **personne, Animimi compris, ne vend la housse de chaise
de salle à manger à panneau sisal.** Et le lot de 4 reste un format que personne
n'a.

### 13.2 Oreilune n'est pas un concurrent — je le retire

Vérifié via la fiche TrendTrack de la boutique :

| oreilune.com | |
|---|---|
| Pays d'origine | **CN** |
| Catégorie | **Apparel** (vêtements) |
| Trafic | 18 284 visites/mois |
| Pubs actives | **5** |
| Top produits | sangle d'escalade 17,99 € · projecteur de mandalas solaire 19,99 € · jean droit femme 36,99 € · pantalon gainant 29,99 € · combinaison 26,99 € · t-shirt oversize 24,99 € · robe léopard 36,99 € · capri cargo 39,99 € |

C'est un **bazar de dropshipping chinois généraliste**, pas une boutique pour chats.
Il a passé une publicité sur une housse de canapé, c'est tout. Sept de ses dix
meilleurs produits portent « 50 % DE RÉDUCTION » **dans le titre du produit** — une
remise permanente affichée comme temporaire, exactement ce que la directive Omnibus
interdit.

Conséquence : **il n'y a aucun annonceur français sérieux sur la housse anti-griffes
pour chat.** Le terrain publicitaire est encore plus vide que je ne l'avais dit.

### 13.3 Etsy et Amazon.fr — contournement du blocage

Les deux domaines sont bloqués en accès direct par le proxy sortant. J'ai contourné
par trois voies :

**a) La bibliothèque publicitaire Meta.** Recherche sur « housse de chaise », « protège
chaise », « housse anti-griffes », « griffoir chaise » en français : **113 publicités
recensées. Aucune ne vend une housse avec surface à griffer.** Le mot « griffes »
n'apparaît qu'en bénéfice secondaire d'un tissu résistant.

| Annonceur | Pubs actives | Reach 30 j | Produit |
|---|---|---|---|
| IKEA | 249 | 52 779 472 | housse de chaise enfant GREJSIMOJS, fausse fourrure |
| **Copensunny** | **851** | **4 594 059** | lot de housses de chaise de salle à manger |
| **Savemorer.net** | 205 | 2 652 970 | housse de chaise anti-tâche imperméable |
| Solite-dweller.fr | 27 | 704 828 | housse jacquard imperméable |
| Comfy-vibes.fr, Infiniff, Enverano | éteintes | — | même créa recyclée |
| DaMaxx Events, Dj Enzo | 2-3 | — | location pour mariages (hors sujet) |

**b) Les boutiques similaires à Felivio.** 1 339 boutiques remontées par similarité,
les 20 plus proches examinées. Le plus proche conceptuellement est **Sofa-Scratcher**
(cattrees.com, US) — griffoir d'angle pour canapé, pas une housse. Une seule
boutique française apparaît, **MiaouDéco** (74 visites/mois, 0 pub) : c'est de la
décoration sur le thème du chat — lampes, mugs, statues, paniers. Pas un concurrent.

**c) Les pages catégories Etsy France.** « housse de chaise à haut dossier »,
« housse dossier chaise », « griffoir chat » existent comme catégories **séparées**.
Aucune page ne fait apparaître l'hybride.

### 13.4 Ce que la vérification révèle en plus — le marché de la housse de chaise est chaud

C'est un bénéfice inattendu de cette passe. **Copensunny fait 851 publicités actives
et 4,59 M de reach mensuel** sur un simple lot de housses de chaise de salle à manger.
Savemorer, 205 pubs et 2,65 M. Ce sont des dropshippers chinois, et leurs pratiques
sont exactement celles qu'on s'est interdites :

> Copensunny : « Taches de vin, **traces de griffes**, sièges décolorés […] *Ma
> belle-fille a cru que j'avais acheté de nouvelles chaises !* — Sylvie, 58 ans […]
> 🚨 OFFRE EXCEPTIONNELLE : **-50 % aujourd'hui** ! »

Un témoignage invérifiable avec prénom, âge et lien de parenté ; une remise
« aujourd'hui » qui tourne depuis des mois. **Deux pratiques attaquables.**

**Trois conclusions :**
1. L'audience « housse de chaise » est **déjà travaillée en France**, donc le CPM
   sera plus cher que je ne l'espérais.
2. Ces annonceurs mentionnent déjà les griffes du chat comme bénéfice — la demande
   existe et elle est nommée.
3. **Ils sont battables sur la confiance, pas sur le prix.** Un vrai stock, un délai
   tenu, aucun faux témoignage, aucune fausse promo : c'est notre différenciation
   concrète, pas un slogan.

### 13.5 Bilan honnête de la concurrence française

| Question | Réponse |
|---|---|
| Housse de **chaise** avec panneau sisal | **Personne. Vérifié par 5 angles distincts.** |
| Housse **d'accoudoir de canapé** en sisal | **Animimi.fr — existe, avec notre angle** |
| Housse de canapé anti-griffes sans sisal | ~7 vendeurs, 19,90 à 73,90 € |
| Housse de chaise anti-griffes sans sisal | ~6 vendeurs, dont Amazon et Cdiscount |
| Tapis griffoir sisal séparé | ~6 vendeurs |
| Annonceur français faisant du volume sur le sujet | **Aucun** |
| Annonceurs sur la housse de chaise générique | **Copensunny 851 pubs, Savemorer 205 pubs — dropshippers CN** |
