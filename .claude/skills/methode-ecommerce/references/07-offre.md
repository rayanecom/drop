# Étape 17 — Construire une offre irrésistible

Le produit est ce qu'on fabrique. **L'offre est ce qu'on vend.** Deux marques peuvent
vendre le même objet et n'avoir aucun des mêmes résultats, parce que l'une vend un produit
et l'autre une offre.

L'objectif : que le client se dise **« ce serait dommage de ne pas en profiter »** — sans
qu'on ait eu besoin d'inventer une fausse urgence pour l'y pousser.

## L'équation

```
Produit + bénéfice + preuve + bonus + prix + livraison + garantie + réduction du risque
```

Chaque terme manquant est une objection qui survit jusqu'au paiement.

## Les bundles — l'effet de contraste

Un prix seul n'a pas de sens pour le client : il n'a rien à quoi le comparer. Trois options
lui donnent un cadre, et **c'est le cadre qui vend**, pas le prix.

| Offre | Rôle | Ce qu'elle dit |
|---|---|---|
| 1 unité | Ancrage bas | « Pour essayer » |
| 2 unités — **recommandée** | Cible réelle | « Le meilleur rapport » |
| 3 unités | Ancrage haut | « Meilleure valeur au litre / à l'unité » |

### Les règles qui font que ça marche

1. **L'offre du milieu est celle qu'on veut vendre.** Elle est mise en avant visuellement,
   étiquetée, présélectionnée.
2. **L'économie s'affiche en euros ET en pourcentage.** « Vous économisez 14 € (−23 %) »
   agit plus fort que l'un des deux seul.
3. **Le prix unitaire est affiché sur chaque palier.** C'est lui qui rend la montée en
   quantité évidente.
4. **La remise doit avoir une raison.** « Un seul colis à expédier » ou « la cure complète
   dure 3 mois » justifie le prix. Une remise sans raison suggère que le prix de départ
   était gonflé.
5. **Trois paliers, pas cinq.** Au-delà, le client ne compare plus, il reporte.

### La condition de bon sens

Un bundle ne fonctionne que si **le client a une raison réelle d'en vouloir plusieurs** :
consommable qui s'épuise, usage dans plusieurs pièces, un pour soi et un pour offrir,
paire à remplacer. Sur un objet durable et unique, le bundle ne se vend pas — il faut un
complément, pas un doublon.

### Vérifier l'économie de chaque palier

Chaque palier a sa propre marge et son propre CPA d'équilibre. Un palier 3 mal calculé peut
être moins rentable qu'un palier 1.

```
python3 scripts/economie.py --prix-ttc 79.90 --cout-produit 6.50 --livraison 3.20 --qte 3
```

Le script tient compte du fait que la marchandise se multiplie mais **pas la livraison** :
c'est précisément là que le bundle gagne de la marge.

## Les bonus

Un bonus augmente la valeur perçue sans augmenter proportionnellement le coût. Le bon bonus
a trois propriétés :

| Propriété | Sinon |
|---|---|
| **Utile** au moment où le produit sert | Le client le perçoit comme du remplissage |
| **Coût marginal faible** | Il mange la marge qu'il devait protéger |
| **Difficile à trouver ailleurs** | Il ne différencie rien |

Bons candidats : un guide d'utilisation réellement écrit pour la cible, un accessoire qui
complète l'usage, une garantie étendue, un accès à un suivi ou à un service.

Mauvais candidats : un e-book générique de 4 pages, une « formation » sans valeur, un
accessoire que le client jettera. Un bonus perçu comme sans valeur **abaisse** la valeur
perçue de l'ensemble : il suggère qu'on cherche à gonfler artificiellement.

## Les arguments difficiles à copier

Ces quatre-là, tout le monde les écrit, donc ils ne portent plus rien :

- « Efficace »
- « Haute qualité »
- « Livraison rapide »
- « Satisfait ou remboursé »

Un argument qui a de la force est **spécifique, vérifiable, et coûteux à copier**.

| Générique | Spécifique |
|---|---|
| Haute qualité | Testé sur 200 cycles de lavage, la couture tient |
| Livraison rapide | Expédié de Lyon, reçu en 48 h ouvrées ou remboursé |
| Satisfait ou remboursé | 60 jours, retour prépayé, sans avoir à renvoyer le produit |
| Efficace | Fonctionne sur les surfaces poreuses, là où les autres glissent |

D'où sortir ces arguments : le produit lui-même, sa composition, son fonctionnement, son
usage, le service, la garantie, l'expérience. **Le dossier avatar (`04-avatar.md`) en
contient déjà : ce sont les frustrations que les concurrents ne traitent pas.**

## La garantie — le déplacement du risque

Au moment de payer, le risque est entièrement du côté du client : il paie maintenant, il
reçoit plus tard, et il ne sait pas si ça marche. Une garantie déplace ce risque vers le
vendeur, et c'est ce déplacement qui débloque l'achat.

Force croissante :

1. « Satisfait ou remboursé 14 jours » — c'est le droit légal de rétractation, donc ce
   n'est pas une garantie, c'est la loi. L'afficher comme un avantage est perçu comme tel.
2. 30 à 60 jours — commence à compter.
3. Retour gratuit — retire le dernier frein concret.
4. Garantie de résultat, conditionnée et explicite — la plus forte, et la plus exigeante :
   elle n'a de sens que si on est prêt à l'honorer sans discuter.

**Une garantie qu'on n'honore pas coûte infiniment plus cher que pas de garantie** : litiges,
avis, remontées sur le compte de paiement.

## Garder l'offre simple

Le client doit pouvoir répondre à six questions en une lecture :

1. Qu'est-ce que j'achète ?
2. Qu'est-ce que je reçois exactement ?
3. Combien j'économise ?
4. Quels bonus sont inclus ?
5. Quand je le reçois ?
6. Qu'est-ce qui me protège si ça ne va pas ?

Si une de ces réponses demande de chercher, l'offre est trop complexe. Une offre complexe
ne se compare pas — elle se reporte, et un achat reporté est un achat perdu.

## Contrôle avant de lancer

- [ ] Le palier du milieu est le plus visible et le plus rentable.
- [ ] L'économie est affichée en euros et en pourcentage, sur chaque palier.
- [ ] La remise a une raison énoncée.
- [ ] Chaque bonus a une utilité réelle au moment de l'usage.
- [ ] Aucun argument de la liste générique n'est utilisé seul.
- [ ] La garantie est tenable telle qu'elle est écrite.
- [ ] Chaque palier a été passé au script d'économie, **y compris au CPA réel constaté**.
- [ ] Aucun prix barré fictif : le prix de référence est le prix le plus bas des 30 derniers
      jours (directive Omnibus).
