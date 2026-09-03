# Étapes 1 à 4 — Douleur, cible, produit, économie

Objectif de cette phase : **éliminer vite**. La plupart des produits candidats doivent
mourir ici, en une heure, pas après trois semaines de site.

## 1. La douleur

Un produit ne se vend pas parce qu'il est bien. Il se vend parce qu'il retire quelque chose
de désagréable, ou qu'il donne accès à quelque chose de désiré et hors de portée.

### Les deux axes qui comptent

| Axe | Question | Bon signal |
|---|---|---|
| **Intensité** | À quel point ça gêne, sur le moment ? | La personne interrompt ce qu'elle fait à cause du problème |
| **Récurrence** | À quelle fréquence ça revient ? | Au moins une fois par semaine en saison |

Une douleur intense et rare (le déménagement) se vend une fois et n'a pas de bouche-à-oreille.
Une douleur faible et fréquente (« c'est un peu moche ») ne déclenche pas d'achat impulsif.
**Il faut les deux.**

### Le test de la recherche active

La question qui tranche : **est-ce que quelqu'un tape déjà une requête pour résoudre ça ?**

- Si oui → demande existante, tu n'as qu'à capter et convaincre.
- Si non → tu dois créer la demande. C'est beaucoup plus cher, et ce n'est pas un premier
  produit.

Vérifie avec des recherches réelles (volume de recherche, questions sur les forums, avis
Amazon qui décrivent le problème). Pas d'intuition.

### Hiérarchie des douleurs, de la plus chère à la moins chère

1. Douleur physique / santé / sommeil — attention, terrain réglementé, **aucune allégation
   santé** sans base légale.
2. Douleur sociale / image / regard des autres.
3. Perte d'argent récurrente.
4. Perte de temps récurrente.
5. Inconfort d'usage.
6. Esthétique pure — la plus faible, sauf marché identitaire fort.

## 2. La cible identitaire

« Tout le monde » est une cible qui ne convertit pas : le créatif ne peut ressembler à
personne en particulier, donc personne ne se reconnaît.

Le test : **une seule image doit pouvoir faire dire « c'est exactement moi »**.

Écris la cible sous cette forme :

> `[qui]` qui `[fait quoi, dans quelle situation]` et qui `[ressent quoi]`.

Exemple faible : « les gens qui vont à la plage ».
Exemple utilisable : « les parents qui emmènent des enfants de 3 à 10 ans sur les plages de
galets du Sud et qui passent leur journée à gérer des pieds coupés et des chaussures
trempées ».

La seconde formulation produit des créatifs, des accroches, un décor, un casting. La
première ne produit rien.

**Une niche identitaire vaut mieux qu'un grand marché indifférencié** : le coût
d'acquisition y est plus bas et le bouche-à-oreille y circule.

## 3. Le produit

| Critère | Ce qu'on cherche | Rédhibitoire |
|---|---|---|
| Compréhension | Bénéfice compris en < 3 s, son coupé | Il faut lire pour comprendre |
| Démonstration | Le produit se montre en action | Rien à filmer |
| Valeur perçue | Paraît valoir plus que son prix | Ressemble à un objet à 5 € |
| Potentiel UGC | Un client peut le filmer facilement | Usage intime ou invisible |
| Logistique | Léger, compact, robuste | Fragile, volumineux, électrique/batterie |
| Retours | Peu de raisons de renvoyer | Taille/ajustement critique → prévoir le taux de retour |
| Réglementaire | Aucun agrément nécessaire | Cosmétique, alimentaire, médical, électrique sans CE |

**Le piège du produit à taille.** Chaussures, vêtements, bagues : le taux de retour et
d'échange est structurellement plus élevé. Ce n'est pas éliminatoire, mais ça doit entrer
dans le calcul économique (compter un taux de retour réaliste, pas 0 %) et ça impose un
guide des tailles sérieux dès le premier jour.

## 4. L'économie — la seule étape non négociable

C'est ici que 80 % des produits meurent, et c'est tant mieux : ils mourraient de toute façon,
mais plus tard et plus cher.

### La chaîne de coûts, dans l'ordre

```
COÛT D'ACHAT DÉBARQUÉ
   prix fournisseur
 + fret
 + droits de douane             (sur marchandise + fret)
 + TVA à l'import               (voir le point sur le régime, ci-dessous)
 = coût d'achat débarqué        ← c'est CE montant qui sert de base au ×4

COMPTE D'EXPLOITATION
   Prix de vente TTC
 − TVA collectée                (régime réel : CA net = TTC / 1,20)
 = Chiffre d'affaires net
 − coût d'achat débarqué
 − frais de paiement            [À CONFIRMER selon le plan et le PSP]
 − frais d'applications ramenés à la commande
 − coût du SAV
 − provision retours / remboursements / colis perdus
 = MARGE DE CONTRIBUTION avant publicité
 − coût d'acquisition (CPA)
 = PROFIT PAR COMMANDE
```

### Le régime de TVA change les nombres, pas un peu

| | Régime réel (assujetti) | Franchise en base |
|---|---|---|
| TVA sur les ventes | Collectée puis reversée → **20 % du prix ne t'appartient pas** | Non facturée → tu gardes tout le prix |
| TVA à l'import | **Déductible** → simple avance de trésorerie, pas un coût | **Non déductible** → coût sec, +20 % sur l'achat |

Les deux régimes donnent des marges et des plafonds d'achat différents. Le script prend
`--regime reel` ou `--regime franchise`. **Le choix du régime relève d'un comptable** — la
méthode se contente d'exiger qu'il soit connu avant de calculer.

### Les deux nombres à connaître par cœur

**CPA d'équilibre** = marge de contribution avant publicité.
Au-delà, chaque commande fait perdre de l'argent.

**ROAS d'équilibre** = prix de vente TTC ÷ marge de contribution.
C'est le ROAS affiché dans le gestionnaire de publicités en dessous duquel on perd. Il ne
se devine pas : `python3 scripts/economie.py` le calcule.

### ×4 sur quoi, exactement

C'est là que la plupart des calculs mentent, sans que personne ne le fasse exprès.

| Lecture | Formule | Ce qu'elle vaut |
|---|---|---|
| ×4 sur le prix affiché | `PV TTC / coût débarqué` | La lecture courante du métier. **Flatteuse** : elle compare un prix dont 20 % ira à l'État à un coût qui, lui, est bien réel. |
| ×4 sur ce qui te revient | `CA net / coût débarqué` | La lecture honnête au régime réel. Elle exige un coût d'achat **17 % plus bas** que la première. |
| Bénéfice = 4 × le coût | `MC = 4 × coût débarqué` | La lecture littérale de « faire du ×4 de bénéfice ». La plus exigeante : coût d'achat encore ~22 % plus bas. |

Le script affiche les trois, et surtout **le coût d'achat maximum à ne pas dépasser** pour
chacune — c'est le seul chiffre exploitable face à un fournisseur.

Exemple, produit à 79,99 € au régime réel : `20,00 €` de coût débarqué pour un ×4 sur le
TTC, `16,66 €` pour un ×4 sur le CA net, `12,92 €` pour un bénéfice quadruple. Entre la
lecture flatteuse et la lecture littérale, l'écart est de **7 € par unité** — soit, sur
1 000 commandes, 7 000 €.

### Pourquoi « ×4 » et pas « ×2 »

Un ×2 laisse 50 % de marge brute, mais la publicité coûte typiquement entre 30 % et 50 % du
chiffre d'affaires en acquisition payante froide. À ×2, le ROAS d'équilibre dépasse
largement ce qu'un compte publicitaire jeune atteint. À ×4, il reste de la place pour
apprendre, rater des créatifs et absorber les remboursements.

Le ×4 est un **filtre grossier**, pas une garantie. Le vrai juge est le ROAS d'équilibre
calculé — un produit à ×4 avec 12 € de livraison peut être pire qu'un ×3 léger.

### Pourquoi 40 € minimum

En dessous, la marge de contribution absolue devient trop petite pour payer un CPA réel sur
Meta ou TikTok en France. Si le produit ne peut pas dépasser 40 € seul, la seule sortie est
le **panier moyen** : bundle, quantité, upsell — voir `07-offre.md`. Et il faut alors que le
bundle soit désirable, pas seulement rentable.

### Utiliser le calculateur

```
python3 .claude/skills/methode-ecommerce/scripts/economie.py \
  --prix-ttc 79.99 --cout-produit 13.00 --livraison 7.00 \
  --regime reel --tva 20 --droits-douane 0 \
  --frais-paiement-pct 1.4 --frais-paiement-fixe 0.25 \
  --apps-par-commande 0.30 --sav-par-commande 0.40 --taux-retour 3 \
  --multiple-cible 4
```

Le script sort la marge de contribution, le CPA d'équilibre, le ROAS d'équilibre, et le
profit à plusieurs CPA. `--scenarios` compare trois prix de vente d'un coup.

**Ne jamais présenter une économie produit sans avoir fait tourner le script.** Un calcul
mental sur cette chaîne de coûts est faux une fois sur deux, et l'erreur va toujours dans le
sens optimiste.

## Grille de score — Porte 1

Note chaque ligne de 0 à 5, multiplie par le poids. **Les poids somment à 20, donc le
maximum est exactement 100.**

| Critère | Poids | Max | 0 | 5 |
|---|---|---|---|---|
| Intensité de la douleur | ×4 | 20 | Confort | Bloque une activité |
| Récurrence | ×3 | 15 | Une fois dans la vie | Chaque semaine |
| Précision de la cible | ×3 | 15 | « Tout le monde » | Identité nette |
| Compréhension en 3 s | ×3 | 15 | Il faut expliquer | Évident, son coupé |
| Économie | ×3 | 15 | ×4 impossible, ROAS d'équilibre > 3,0 | ×4 tenu sur le CA net, ROAS d'équilibre < 1,8 |
| Recherche active existante | ×2 | 10 | Personne ne cherche | Volume net et constant |
| Valeur perçue vs prix | ×1 | 5 | Paraît cher | Paraît donné |
| Logistique et retours | ×1 | 5 | Fragile, lourd, à pointures | Léger, robuste, taille unique |
| **TOTAL** | **20** | **100** | | |

### Le risque réglementaire n'est pas une note, c'est un veto

On ne met pas « 2 points sur 5 » à une obligation légale : soit on peut vendre, soit on ne
peut pas. Trois issues, et aucune autre :

| Situation | Décision |
|---|---|
| Aucune obligation particulière | On continue |
| Obligation identifiée **et** moyen de la remplir chiffré (document fournisseur, prestataire, coût) | On continue, en portant ce coût dans le calcul économique |
| Obligation identifiée sans moyen de la remplir | **NO-GO**, quel que soit le score |

Catégories qui déclenchent le veto tant que le moyen n'est pas chiffré : cosmétique
(Personne Responsable dans l'UE, dossier produit, notification), complément alimentaire,
dispositif médical, biocide et antiparasitaire, électrique et électronique (marquage CE,
DEEE, notice en français), contact alimentaire, jouet, puériculture porteuse d'un enfant,
équipement radio.

### Seuils

| Score | Décision |
|---|---|
| **≥ 70** | GO |
| **55 à 69** | GO conditionnel — la faiblesse doit être nommée, et compensée explicitement |
| **< 55** | NO-GO, on change de produit |

Un score n'est pas une décision automatique. Mais un produit sous 55 qu'on lance quand même
doit avoir une raison écrite, datée, et une condition de sortie fixée à l'avance.
