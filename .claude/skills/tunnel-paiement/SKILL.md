---
name: tunnel-paiement
description: Optimiser le passage du panier au paiement sur Shopify — paiements express (Shop Pay, Apple Pay, Google Pay, PayPal), tiroir de panier, franco de port, remises de volume et paliers, upsell, relance de panier abandonné. Utilise ce skill dès qu'il est question de panier, checkout, paiement, bouton d'achat, Apple Pay, Shop Pay, PayPal, franco, livraison offerte, paliers de quantité, panier moyen, AOV, upsell, panier abandonné, ou quand l'utilisateur dit que les visiteurs ajoutent au panier mais n'achètent pas.
---

Tu travailles la portion du site où l'argent se perd le plus vite : entre l'ajout au
panier et la commande passée. Un visiteur qui a cliqué « ajouter au panier » a déjà été
convaincu — tout ce qu'on perd après est du gâchis pur.

## L'ordre des leviers, par rendement décroissant

### 1. Les paiements express — le plus rentable, et souvent désactivé sans le savoir

Sur du trafic Meta et TikTok, donc majoritairement mobile, Shop Pay, Apple Pay et Google
Pay suppriment la saisie de l'adresse et de la carte. C'est le levier le plus direct qui
existe sur le taux de finalisation.

Trois vérifications, dans cet ordre — les deux dernières ne servent à rien si la première
échoue :

1. **Shopify Payments est-il activé ?** Signal fiable en lecture API :
   `shop.paymentSettings.supportedDigitalWallets`. Un tableau **vide** signifie qu'aucun
   portefeuille n'est disponible, donc que rien ne s'affichera nulle part.
2. **Les portefeuilles sont-ils cochés ?** Paramètres → Paiements → Shopify Payments →
   Apple Pay, Google Pay, Shop Pay. Ajouter PayPal, très demandé sur le marché France.
3. **Le thème les affiche-t-il ?** Dans le tiroir de panier, le bloc du bouton de
   paiement porte un réglage du type `show_additional_checkout_buttons`. À `false`, les
   boutons express sont masqués alors même qu'ils sont actifs côté boutique. C'est une
   panne silencieuse classique : tout est bien configuré, rien ne s'affiche.

Les logos de paiement du pied de page suivent la même logique : ils sont rendus par
`payment_type_svg_tag` sur `shop.enabled_payment_types`. Tant que rien n'est activé au
point 1, le champ peut être rempli, il n'affichera rien. La liste ne peut donc pas mentir
— c'est une qualité, pas une limite.

### 2. Faire correspondre les promesses à la configuration réelle

C'est là qu'on trouve les incohérences les plus coûteuses, parce qu'elles se voient.

**Le franco de port.** Si le bandeau annonce « livraison offerte dès 50 € », vérifier dans
Paramètres → Livraison que le seuil existe vraiment. Deux pannes symétriques :

- Le seuil est annoncé mais la livraison est **déjà gratuite sans condition** → tu freines
  l'achat pour rien, et la barre de progression du panier reste bloquée à zéro puisqu'il
  n'y a rien à débloquer. Supprimer le seuil de la communication et **désactiver la barre
  de progression**, qui n'a plus d'objet.
- Le seuil est annoncé mais aucune méthode payante n'existe en dessous → le message est
  faux.

**Les paliers de quantité.** Avant d'afficher le moindre bloc « 2 achetées = -25 % » ou
une bannière d'offre par volume, vérifier que les **remises automatiques correspondantes
sont bien à l'état actif**. Une remise expirée derrière un palier affiché produit le pire
scénario possible : le client compose son panier pour l'offre, arrive au paiement, la
remise ne s'applique pas, il part. Vérifier avec un panier test, pas sur la foi du
back-office.

### 3. Le tiroir de panier

Le tiroir (`cart_type: drawer`) bat la page panier sur mobile : il ne fait pas quitter la
fiche produit. Ce qu'il doit contenir, et rien de plus :

- la ligne produit avec sa variante lisible et sa quantité modifiable,
- le sous-total,
- le bouton de paiement, **plus les boutons express juste en dessous**,
- au maximum une accroche de réassurance courte.

Ce qu'il ne doit pas contenir : un compte à rebours, une barre de progression sans objet,
un carrousel de produits complémentaires qui pousse le bouton hors de l'écran.

### 4. Augmenter le panier — ce qui est possible sur ce plan

Vérifié dans la documentation Shopify. À connaître avant de promettre quoi que ce soit :

| Levier | Disponibilité |
|---|---|
| Remises automatiques par volume (Shopify Functions) | tous les plans sauf Starter |
| Bloc de paliers dans la fiche produit (thème) | toujours — c'est du Liquid |
| Extension de la page de remerciement / suivi de commande | tous les plans sauf Starter |
| Upsell post-achat (page après paiement) | tous les plans sauf Starter, **en bêta, accès à demander** pour une boutique en production |
| Upsell **dans** les étapes du checkout | **Shopify Plus uniquement** |
| Modification de `checkout.liquid` | Plus, et déprécié |

Donc, sur un plan Basic : les paliers de quantité et le bump avant paiement se travaillent
**dans le thème et via les remises automatiques**, pas dans le checkout. Toute application
qui promet un upsell « dans le checkout » sans Plus travaille en réalité ailleurs — le
vérifier avant de payer un abonnement.

Ordre de rendement pour un mono-produit : **paliers de quantité** d'abord (c'est le même
produit, aucune friction de décision), produit complémentaire ensuite, upsell post-achat
en dernier.

### 5. La relance de panier abandonné

Shopify envoie une relance native (Paramètres → Notifications → Panier abandonné). Elle
est désactivée par défaut sur certaines configurations : le vérifier. Trois messages
valent mieux qu'un : à 1 h, à 24 h, à 72 h. Le premier ne contient **aucune remise** —
inutile de payer une réduction à quelqu'un qui allait revenir seul.

## Vérifier, toujours

Les écritures sur le thème passent par la procédure maison : dupliquer, écrire sur la
copie, l'utilisateur prévisualise et publie. Un réglage de tiroir annoncé modifié se
relit dans le fichier, pas dans la conversation.

Et le test qui tranche tout : **composer un panier réel et aller jusqu'à l'écran de
paiement**. Les boutons express sont-ils là ? La remise s'applique-t-elle ? Le franco
se déclenche-t-il au bon montant ? Tant que ce parcours n'a pas été fait une fois de bout
en bout, rien n'est vérifié.

## Honnêteté

Pas de faux compte à rebours, pas de « plus que 3 en stock » inventé, pas de frais
ajoutés en fin de tunnel. Une friction supprimée rapporte plus qu'une urgence fabriquée,
et ne coûte pas un litige.
