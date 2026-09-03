# Protocole de vérification

Une erreur non détectée coûte plus cher qu'une donnée manquante, parce qu'elle se propage :
un coût produit faux fausse la marge, qui fausse le CPA cible, qui fausse la décision de
couper ou de scaler une campagne.

## Les quatre étiquettes

Toute affirmation dans un dossier porte l'une de ces quatre étiquettes. Sans étiquette,
l'affirmation est réputée non vérifiée.

| Étiquette | Condition d'emploi |
|---|---|
| `FAIT` | Sorti d'un outil ou d'une source **nommée**. Écrire l'outil et la requête. |
| `ESTIMATION` | Calculé à partir de faits. **Montrer le calcul**, pas seulement le résultat. |
| `HYPOTHÈSE` | Raisonnement non vérifié. Doit indiquer comment on le vérifierait. |
| `[À CONFIRMER]` | Donnée manquante. Bloquante si elle conditionne une décision. |

Une case vide vaut mieux qu'un chiffre plausible. Un chiffre plausible et faux est
indétectable trois jours plus tard.

## Vérifier le travail d'un agent

Un agent rend un rapport, pas une vérité. Avant d'intégrer son résultat :

1. **Recalculer les nombres dérivés.** Toute marge, tout pourcentage, toute évolution qu'il
   a calculés se refont indépendamment. Les erreurs d'arithmétique sont fréquentes et
   invisibles dans un tableau bien présenté.
2. **Vérifier la cohérence des ordres de grandeur.** Un trafic, un prix ou un nombre de
   publicités qui détonne est probablement une mauvaise lecture de champ.
3. **Contrôler les étiquettes.** Un chiffre sans source dans un rapport d'agent est à
   traiter comme absent, pas comme vrai.
4. **Chercher ce qui manque.** Un rapport qui ne dit pas ce qu'il n'a pas pu obtenir est un
   rapport incomplet : la lacune existe quand même, elle est juste cachée.

## Vérifier après avoir agi

| Action | Vérification |
|---|---|
| Fichier écrit | Le relire, vérifier la taille et le contenu attendu |
| Script modifié | Le lancer, y compris son auto-test |
| Calcul économique | `scripts/economie.py`, jamais de tête |
| Modification de thème | Relire le fichier écrit et l'`updatedAt` du thème |
| Bloc visuel livré | Le mesurer au banc de rendu (`tools/rendu/`) à 320/375/414/1280 px |
| Donnée annoncée au client | Vérifier qu'elle est vraie **avant** de l'écrire sur le site |

## Ce qui ne compte pas comme une vérification

- « J'ai fait la modification » — ce n'est pas une preuve, c'est une intention.
- « Ça devrait marcher » — le conditionnel signale qu'on n'a pas regardé.
- Un test qu'on n'a pas lancé. Ne jamais écrire qu'une chose est testée si elle ne l'est pas.
- Un chiffre repris d'un rapport sans l'avoir recalculé.
- Une source citée de mémoire.

## Le cas particulier des chiffres avancés au client

Un délai de livraison, un pourcentage d'efficacité, un nombre de clients, un prix barré, un
avis : ce sont des affirmations commerciales opposables en France. Elles se vérifient avant
publication, pas après réclamation.

Si la donnée n'est pas vérifiable, elle ne va pas sur le site. Il n'y a pas de troisième
option.
