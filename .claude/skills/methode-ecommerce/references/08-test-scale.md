# Étapes 18 à 20 — Tester, analyser, scaler

## Étape 18 — Les angles

Un angle n'est pas une accroche. C'est **la raison pour laquelle ce produit compte**, pour
une personne précise. L'accroche en découle.

Prépare **5 angles issus du dossier avatar**, pas de ton imagination. Chacun :

| Élément | Contenu |
|---|---|
| Angle | Douleur, identité, transformation, mécanisme, économie… |
| Verbatim source | La phrase du client qui le justifie, telle qu'elle a été écrite |
| Hook | Les 3 premières secondes, décrites plan par plan |
| Promesse | Le résultat, avec l'effort et le délai |
| Preuve | Ce qui rend la promesse crédible |
| Cible | À qui, précisément |

### Pourquoi 5 et pas 1

Le meilleur angle n'est presque jamais celui qu'on aurait parié. Tester un seul angle, c'est
confondre « mon idée ne marche pas » avec « le produit ne marche pas » — et abandonner un
produit valable.

### Pourquoi pas 15

Chaque angle a besoin d'un budget suffisant pour donner un signal lisible. Diviser le budget
par 15, c'est obtenir 15 résultats dont aucun ne veut rien dire.

## Étape 19 — Le protocole de test

### La fiche de test, écrite AVANT de lancer

```
HYPOTHÈSE      Ce que je crois, et pourquoi
VARIABLE       Ce qui change — UNE SEULE chose
CONSTANTES     Ce qui ne bouge pas (page, prix, offre, ciblage)
MÉTRIQUE       La métrique de décision — une seule
SECONDAIRES    Celles qu'on regarde sans décider dessus
BUDGET         Montant total engagé
DURÉE          Nombre de jours, minimum 3
SEUIL          Au-dessus de X je continue, en dessous je coupe
```

Le seuil s'écrit **avant** de voir les résultats. Écrit après, ce n'est plus un seuil, c'est
une justification : on trouve toujours une raison de garder ce qu'on a envie de garder.

### Une seule variable

Changer la créa, le prix et la page en même temps produit un résultat ininterprétable. On
saura que ça marche mieux ou moins bien, jamais pourquoi — donc on ne pourra pas le
reproduire.

Exception raisonnable : au tout premier lancement, on ne teste pas, on **cherche un signal**.
Là, on peut lancer 5 angles d'un coup. Mais alors on ne conclut rien sur le prix ou la page.

### Combien de données avant de décider

C'est la source d'erreur la plus fréquente et la plus coûteuse.

| Décision | Volume minimum indicatif |
|---|---|
| Couper une créa sur le CTR | ~1 500 impressions |
| Juger un angle | ~50 clics sortants |
| Juger une page produit | ~200 sessions |
| Juger un prix | ~30 achats par variante |

En dessous, l'écart observé s'explique par le hasard. Deux campagnes à 3 ventes contre 1
vente ne disent **rien** — c'est un écart parfaitement banal.

Corollaire honnête : avec un petit budget, certaines questions ne sont pas testables. Mieux
vaut le savoir et décider autrement que de croire mesurer.

## Lire l'entonnoir — diagnostic

Le tunnel se lit **de haut en bas**, et on corrige le premier étage qui décroche. Corriger
un étage bas quand le problème est en haut ne change rien.

| Constat | Diagnostic le plus probable | Action |
|---|---|---|
| CPM anormalement haut | Audience trop étroite, ou créa jugée de mauvaise qualité | Élargir, changer la créa |
| **CTR faible** | Le hook n'accroche pas — les 3 premières secondes | Refaire les hooks, pas la page |
| CTR bon, **peu d'ajouts panier** | Décalage entre la pub et la page, ou prix perçu trop haut | Aligner la promesse, retravailler le premier écran |
| Ajouts panier bons, **peu de checkout** | Prix total, frais de port découverts tard, manque de confiance | Afficher les frais tôt, renforcer la réassurance |
| Checkout atteint, **peu d'achats** | Moyens de paiement, frais surprise, délai de livraison, peur | Ajouter des moyens de paiement, clarifier le délai |
| Tout est bon mais **pas rentable** | Le produit n'a pas la marge — l'économie était fausse | Revoir le prix ou l'offre, pas la créa |

Le dernier cas est le plus important : **beaucoup de problèmes lus comme des problèmes de
publicité sont des problèmes d'économie produit.** Aucun créatif ne rattrape une marge de
contribution trop faible.

## Les métriques, et ce qu'elles cachent

| Métrique | Ce qu'elle dit | Le piège |
|---|---|---|
| ROAS | Retour sur dépense publicitaire | Ne connaît ni la TVA, ni les retours, ni les coûts fixes |
| CPA | Coût d'une acquisition | À comparer au **CPA d'équilibre**, pas à un chiffre absolu |
| AOV | Panier moyen | Monte artificiellement avec les frais de port payants |
| MER | CA total / dépense pub totale | Plus fiable que le ROAS attribué, car indépendant du pixel |
| Taux de conversion | Sessions → achats | Faussé par le trafic non humain — vérifier la part directe/desktop |
| LTV | Valeur d'un client dans la durée | Inconnue avant plusieurs mois : ne pas s'en servir pour justifier une perte au premier achat |

**Un ROAS de 2 ne veut rien dire seul.** Il est excellent si le ROAS d'équilibre est de 1,6,
catastrophique s'il est de 2,8. Le seul repère est celui calculé par `scripts/economie.py`.

### Le contrôle du trafic non humain

Avant toute lecture de taux de conversion : regarder la répartition par pays, par appareil
et par source. Un trafic majoritairement **direct**, **desktop**, et **hors du pays ciblé**
n'est pas du trafic — ce sont des robots. Le taux de conversion calculé dessus est faux, et
il conduit à « optimiser » une boutique que personne ne visite.

## Étape 20 — Scaler

### Les cinq phases

| Phase | Objectif | Signal de passage |
|---|---|---|
| 1 — Validation | Prouver que ça convertit | Premières ventes à un CPA sous l'équilibre |
| 2 — Optimisation | Améliorer marge et conversion | Métriques stables sur 2 semaines |
| 3 — Scaling | Monter la dépense en gardant l'économie saine | Rentabilité tenue à budget doublé |
| 4 — Marque | Réduire la dépendance à un seul canal | Part d'acquisition organique ou e-mail qui monte |
| 5 — Expansion | Nouveaux produits, marchés, canaux | Le produit principal tient sans surveillance |

### Les règles de scaling

- **Monter par paliers**, en laissant l'algorithme se restabiliser entre deux hausses. Une
  hausse brutale casse l'apprentissage et fait remonter le CPA.
- **Surveiller la marge de contribution, pas le chiffre d'affaires.** Le CA monte toujours
  quand on dépense plus — ça ne prouve rien.
- **Ne jamais scaler une machine déficitaire.** Scaler multiplie ce qui existe : une perte
  par commande devient une perte plus grosse, plus vite.
- **Le taux de remboursement se voit en retard.** Un produit rentable au jour 7 peut être
  déficitaire au jour 45. Attendre un cycle complet avant de conclure.

### Quand arrêter

Décidé à l'avance, sinon on ne le décide jamais :

- Budget de test épuisé sans une seule vente au CPA d'équilibre.
- CPA structurellement au-dessus de l'équilibre après 3 angles réellement différents.
- Taux de remboursement ou de litige qui menace le compte de paiement.
- Marge de contribution négative une fois les coûts réels constatés.

Arrêter un produit n'est pas un échec de la méthode : c'est la méthode qui fonctionne. Le
coût d'un produit arrêté à temps est le budget de test. Le coût d'un produit gardé par
entêtement n'a pas de plafond.
