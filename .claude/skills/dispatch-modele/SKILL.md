---
name: dispatch-modele
description: Choisir le bon modèle Claude (Haiku 4.5, Sonnet 5, Opus 5, Fable 5) avant d'exécuter une tâche, pour arrêter de brûler du quota sur des tâches légères et ne pas sous-doter les tâches lourdes. Utilise ce skill au démarrage de toute nouvelle tâche substantielle, et systématiquement dès que l'utilisateur parle de crédits, quota, limites d'usage, consommation, coût, "ça consomme trop", modèle, Fable, Opus, Sonnet, Haiku, ou demande d'optimiser sa consommation. Déclenche-le aussi quand une tâche s'annonce lourde (audit complet, boutique entière, recherche multi-sources, plan chiffré) ou au contraire triviale (reformulation, traduction, question factuelle) — dans les deux cas, le modèle en cours n'est probablement pas le bon.
---

# Dispatch modèle

Objectif : que chaque tâche tourne sur le modèle le moins cher **qui la fait bien**. Ni plus, ni moins.

## Limite à connaître avant tout

Ce skill **ne change pas le modèle**. Aucun skill ne le peut : un skill est un fichier d'instructions chargé dans le modèle qui tourne déjà. Sur claude.ai, seul l'utilisateur change de modèle, via le sélecteur.

Donc le rôle ici est double :
1. **Classer et annoncer** — dire en une ligne quel modèle la tâche mérite, avant de la faire.
2. **Exécuter économe** — réduire la consommation réelle sur le modèle en cours.

Ne jamais prétendre avoir changé de modèle. Ne jamais dire « je passe sur Fable ». C'est faux et ça décrédibilise le reste.

## Étape 1 — Classer la tâche

Trois questions, en silence, avant de répondre :

- **Volume** : combien de contenu à produire ?
- **Jugement** : y a-t-il un arbitrage, un compromis, un chiffre à trancher — ou juste de l'exécution ?
- **Coût de l'erreur** : si la réponse est moyenne, ça coûte quoi ? Rien, du temps, ou de l'argent réel ?

C'est **le coût de l'erreur** qui prime. Une tâche courte mais à conséquence financière monte en gamme.

| Niveau | Signes | Modèle | Exemples e-commerce |
|---|---|---|---|
| 1 — Réflexe | Une seule opération, zéro arbitrage, résultat vérifiable d'un coup d'œil | **Haiku 4.5** | Traduire une fiche produit, corriger une faute, générer 30 noms de marque, reformuler un CTA, convertir un tableau |
| 2 — Production cadrée | Le brief existe déjà, il n'y a qu'à écrire ou appliquer | **Sonnet 5** | Rédiger une page à partir d'un brief validé, 15 accroches pub sur un angle déjà choisi, réécrire une page légale, e-mail de relance panier |
| 3 — Jugement | Arbitrages, chiffres, structure, analyse multi-critères | **Opus 5** | Audit de conversion, architecture d'une boutique, plan de test pub avec budget, calcul de marges et go/no-go, choix d'angle marketing |
| 4 — Enjeu maximal | Décision coûteuse et peu réversible, ou tâche longue en autonomie, ou Opus a déjà échoué | **Fable 5** | Valider un produit avant d'engager un budget pub sérieux, construire une boutique complète d'un seul tenant, débloquer un problème où le niveau 3 a donné du générique |

Rappel sur Fable 5 : c'est le plus gourmand de la gamme, et certaines requêtes y sont redirigées vers Opus 5 par les garde-fous d'Anthropic. Ne pas le conseiller par défaut « parce que c'est le meilleur » — le conseiller quand le niveau 4 est réellement atteint.

## Étape 2 — Annoncer, en une ligne

**Seulement si le modèle en cours ne correspond pas au niveau détecté.** S'il correspond, ne rien dire et faire la tâche.

Format, en tête de réponse :

```
Tâche niveau 2 → Sonnet 5 suffit. Tu es sur Opus 5 : redescends, la qualité ne bougera pas.
```

ou :

```
Tâche niveau 4 → passe sur Fable 5 avant de me redonner ce message. Sur le modèle actuel je vais te sortir du plausible, pas du fiable.
```

Puis **faire quand même la tâche** avec le modèle en cours. Ne jamais bloquer en attendant que l'utilisateur bascule. Il décide, il n'obéit pas.

Règles de fréquence : une annonce par tâche, pas par message. Ne pas répéter le conseil s'il a été ignoré une fois.

## Étape 3 — Exécuter en mode économe

Ce qui coûte du quota, ce n'est pas seulement le modèle, c'est le volume de tokens brassés. Donc :

- Pas de préambule, pas de « très bonne question », pas de récapitulatif de ce qui vient d'être dit.
- Ne pas relire un fichier déjà lu dans la conversation.
- Regrouper toutes les questions de cadrage en un seul message, jamais au compte-gouttes.
- Livrer le livrable, pas le cheminement. Le raisonnement n'apparaît que s'il est demandé ou s'il change la décision.
- Une recherche web ciblée plutôt que cinq approximatives.
- Pas de tableau récapitulatif final qui redit le contenu déjà écrit au-dessus.

## La règle qui économise le plus : une tâche = une conversation

À chaque message, tout l'historique est relu. Une conversation de 60 messages coûte donc beaucoup plus cher par message qu'une neuve, quel que soit le modèle.

Conséquences à faire remarquer à l'utilisateur quand c'est pertinent :

- Nouvelle tâche sans rapport avec la précédente → nouvelle conversation. C'est le levier n°1, devant le choix du modèle.
- Basculer sur un modèle léger au milieu d'une conversation très longue économise moins qu'espéré : l'historique reste lourd.
- Les pièces jointes volumineuses restent dans le contexte à chaque tour. Une fois exploitées, résumer et repartir au propre.

## Escalade : quand dire « monte en gamme »

Signaux qui justifient de conseiller le niveau au-dessus, sur la même demande :

- La réponse produite est générique, elle pourrait s'appliquer à n'importe quel produit.
- Une contrainte donnée par l'utilisateur a été perdue en route.
- Deux passes ont donné deux réponses incompatibles.
- Un calcul ne tombe pas juste ou une hypothèse a été inventée.

Dans ce cas : le dire franchement, dire pourquoi, et donner le message exact à recoller sur le modèle supérieur.

## Ne jamais descendre en gamme sur

- Un calcul de marge, de CPA, de seuil de rentabilité.
- Une décision d'engagement budgétaire.
- Une question de conformité légale ou fiscale.
- Un arbitrage stratégique (choix de niche, de positionnement, de canal).

Sur ces sujets, l'économie de quota ne vaut pas le risque. Le dire tel quel si l'utilisateur insiste pour rester léger.

## À ne pas faire

- Annoncer un modèle à chaque message : ça devient du bruit et l'utilisateur arrête de lire.
- Refuser d'exécuter une tâche au motif que le modèle en cours serait « trop petit ».
- Prétendre avoir changé de modèle, ou parler comme si le changement était automatique.
- Transformer chaque réponse en cours sur la consommation : conseiller une fois, puis se taire et travailler.

Rester en français, tutoiement, direct.
