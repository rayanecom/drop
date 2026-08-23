---
name: tracking-conversions
description: Installer et vérifier la mesure des conversions d'une boutique Shopify — pixel Meta et TikTok, Événements clients, API Conversions côté serveur, déduplication, consentement RGPD. Utilise ce skill dès qu'il est question de pixel, tracking, suivi, mesure, événements, Purchase, ATC, CAPI, Events Manager, consentement, bandeau cookies, attribution, ou quand l'utilisateur dit que ses campagnes « n'optimisent pas », que le ROAS affiché ne colle pas aux ventes réelles, ou avant tout lancement publicitaire. À déclencher AVANT de dépenser le premier euro de publicité.
---

Tu installes et surtout tu **vérifies** la mesure des conversions. C'est le maillon qui
décide si la publicité peut fonctionner, et c'est celui qu'on découvre cassé après avoir
brûlé le budget.

## Pourquoi c'est le point le plus rentable du site

L'algorithme de Meta ou TikTok n'optimise pas vers « des ventes ». Il optimise vers
**l'événement que tu lui remontes**. Si `Purchase` n'arrive pas, ou arrive sans valeur,
ou arrive en double, l'algorithme apprend sur des données fausses et le CPA ne descend
jamais — quelle que soit la qualité de la créa ou de la fiche produit.

Un tracking cassé ne se voit pas dans le back-office Shopify : les ventes y sont
correctes. Il ne se voit que dans l'écart entre le gestionnaire de publicités et la
réalité. D'où la règle : **on vérifie avant de dépenser, pas après**.

## L'ordre d'installation

L'ordre compte. Installer le pixel avant d'avoir posé le consentement produit un site
non conforme dès la première visite.

1. **Le bandeau de consentement d'abord.** En France, le dépôt d'un cookie publicitaire
   avant consentement est une infraction, et le refus doit être aussi simple que
   l'acceptation. Shopify fournit une bannière native (Paramètres → Confidentialité des
   clients → Bannière de consentement aux cookies) : elle suffit et elle est branchée sur
   la Customer Privacy API.
2. **Le canal officiel ensuite.** L'application Facebook &amp; Instagram ou TikTok depuis le
   Shopify App Store pose le pixel proprement, y compris sur le checkout, et gère la
   remontée serveur. C'est la voie à privilégier : elle demande zéro code.
3. **Un pixel personnalisé seulement si le canal officiel ne suffit pas** — Paramètres →
   Événements clients → Ajouter un pixel personnalisé.
4. **La remontée serveur (API Conversions / Events API)** en dernier, avec déduplication.

## Ce que tu peux faire sur ce plan, et ce que tu ne peux pas

Vérifié dans la documentation Shopify — à ne pas confondre, c'est la source de la moitié
des erreurs :

| Capacité | Disponibilité |
|---|---|
| Web pixel / pixel personnalisé | **tous les plans** sauf Starter |
| Extensions de la page de remerciement et du suivi de commande | tous les plans sauf Starter |
| Extension post-achat (upsell après paiement) | tous les plans sauf Starter, **en bêta, accès à demander** pour une boutique en production |
| Shopify Functions (remises sur mesure) | tous les plans sauf Starter |
| Extensions UI sur les étapes du checkout (informations, livraison, paiement) | **Shopify Plus uniquement** |
| Modification de `checkout.liquid` | Plus, et déprécié — ne pas partir dessus |

**Conséquence pratique** : on ne colle plus de balise de suivi dans `theme.liquid`. Ça ne
capte pas le checkout, ça casse à la moindre mise à jour du thème, et ça déclenche les
alertes de performance et de confidentialité de Shopify. Le pixel passe par les
Événements clients, point.

## Les événements qui comptent

Cinq, pas quinze. Chacun doit être vérifié individuellement.

| Événement | Se déclenche | À vérifier |
|---|---|---|
| `PageView` | toute page | le plus simple, si lui manque tout est cassé |
| `ViewContent` | fiche produit | `content_ids` correspond bien au catalogue |
| `AddToCart` | ajout au panier | se déclenche aussi depuis le tiroir, pas seulement la fiche |
| `InitiateCheckout` | entrée dans le paiement | c'est lui qui mesure la friction du tunnel |
| `Purchase` | commande passée | **`value` et `currency` obligatoires**, sinon pas d'optimisation valeur |

Sur `Purchase`, deux erreurs coûteuses et fréquentes : envoyer la valeur en centimes
(`3999` au lieu de `39.99`), ce qui multiplie le ROAS par cent et fait prendre des
décisions absurdes ; et omettre `currency`, ce qui fait interpréter la valeur en dollars.

## La déduplication — le piège numéro un

Dès que tu as **à la fois** le pixel navigateur et la remontée serveur, chaque commande
est envoyée deux fois. Sans déduplication, Meta compte deux achats : le ROAS affiché
double, tu montes les enchères sur une performance imaginaire.

La déduplication repose sur un **`event_id` identique** envoyé par les deux voies pour un
même événement (Meta le nomme `event_id`, TikTok `event_id` aussi). L'application
officielle Shopify le gère seule. Si tu montes la remontée serveur à la main, c'est **le**
point à vérifier avant tout le reste.

Symptôme à connaître : ventes du gestionnaire de publicités ≈ 2 × ventes Shopify sur la
même période. Ce n'est jamais une bonne nouvelle, c'est toujours de la double-comptabilité.

## Le consentement change le comportement du pixel

Les web pixels Shopify honorent la Customer Privacy API. Dans les régions où le
consentement est requis — la France en fait partie — **les rappels ne s'exécutent
qu'après le consentement donné**, puis les événements déjà survenus sont rejoués. C'est
le comportement correct, et il a une conséquence à accepter : une partie du trafic ne sera
jamais mesurée côté navigateur. C'est la loi, pas un bug. La remontée serveur et la
modélisation de la plateforme comblent une partie du trou.

Ne jamais contourner ça en posant le pixel hors du système d'événements pour « ne pas
perdre de signal ». C'est une infraction, et c'est un motif de suspension de compte
publicitaire.

## Vérifier — la partie que tout le monde saute

Lis `references/verification.md` : la procédure complète, événement par événement, avec
ce qu'on ne peut pas vérifier depuis un environnement sans accès au storefront.

Le principe : **une commande test réelle**, passée de bout en bout, et l'événement
`Purchase` observé dans le gestionnaire d'événements avec la bonne valeur. Tant que ce
test n'est pas passé, le tracking est présumé cassé. Un « c'est installé » n'est pas une
preuve.

## Ce que tu ne fais pas

- Pas de pixel en double (l'application officielle **et** un pixel personnalisé pour la
  même plateforme). C'est la cause la plus fréquente de conversions doublées.
- Pas de balise de suivi dans `theme.liquid`.
- Pas de promesse de mesure « à 100 % » : entre iOS, le consentement et les bloqueurs, une
  partie du signal est structurellement perdue.
