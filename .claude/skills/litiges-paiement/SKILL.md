---
name: litiges-paiement
description: Prévenir les rétrofacturations et garder son compte de paiement ouvert — seuils de surveillance Visa et Mastercard, causes réelles des litiges, service client qui désamorce, politique de remboursement, gestion des retards de livraison. Utilise ce skill dès qu'il est question de litige, de chargeback, de rétrofacturation, de remboursement, de PayPal, de Stripe, de compte de paiement bloqué ou gelé, de client mécontent, de colis en retard ou perdu, de SAV — et avant tout lancement publicitaire, parce que le volume révèle les problèmes que dix commandes cachent.
---

Tu protèges la seule chose qui ne se rachète pas : la capacité à encaisser. Une boutique
sans passerelle de paiement est morte, quel que soit son chiffre d'affaires.

## Le risque réel, chiffré

Les réseaux de cartes surveillent les commerçants par ratio de litiges. Franchir le seuil
déclenche un programme de surveillance, des pénalités par transaction, puis la résiliation
par la banque acquéreuse.

| Programme | Déclenchement |
|---|---|
| **Visa VAMP** | ratio combiné fraude + litiges de **1,5 %**, avec un minimum de **1 500 cas** par mois pour l'enrôlement. Seuil abaissé de 2,2 % à 1,5 % au **1ᵉʳ avril 2026**. |
| **Mastercard ECM** | **100 rétrofacturations** dans le mois **et** un ratio de **1,5 %** |

Deux points à comprendre :

- **Visa compte la fraude déclarée en plus des litiges.** Un client qui signale sa
  transaction comme frauduleuse sans passer par un litige compte quand même.
- **Le dénominateur de Mastercard est le mois précédent.** Un mois de forte croissance
  suivi d'un mois calme fait mécaniquement grimper le ratio.

Un dropshipping en lancement fait très peu de volume : **le ratio explose beaucoup plus
vite qu'on ne le croit**. Trois litiges sur cent commandes, c'est déjà 3 %.

Ces seuils changent. Les revérifier avant d'en citer un comme un chiffre ferme.

## Les causes réelles, dans l'ordre

Elles ne sont presque jamais de la fraude. Ce sont des promesses non tenues.

1. **Le colis met plus longtemps que ce qui a été annoncé.** Cause numéro un en
   dropshipping, et la plus évitable : elle vient d'un délai affiché plus court que le
   délai réel.
2. **Des frais surgissent après l'achat.** Typiquement la TVA à l'import réclamée à la
   livraison faute de numéro IOSS. Le client n'a pas accepté ces frais, il refuse le colis
   et conteste.
3. **Le produit ne correspond pas aux visuels.** Photos embellies, spécifications inventées,
   taille non conforme.
4. **Le client n'arrive pas à joindre quelqu'un.** C'est le facteur multiplicateur : un
   client qui obtient une réponse ne conteste presque jamais. Il conteste quand il se sent
   ignoré.
5. **L'intitulé sur le relevé bancaire est méconnaissable.** Le client ne reconnaît pas la
   ligne et la signale comme frauduleuse.

## Ce qui les prévient, par efficacité

**Annoncer le délai réel, majoré.** Si le fournisseur livre en 12 à 20 jours, annoncer
« 12 à 20 jours ». Un client qui reçoit en 14 jours après avoir lu 20 est content ; le même
client, après avoir lu « 3 à 5 jours », ouvre un litige au huitième jour. **La promesse
crée l'attente, et c'est l'attente déçue qui déclenche la contestation, pas le délai.**

**Répondre en moins de 24 heures, toujours.** Y compris pour dire « je n'ai pas encore la
réponse, je reviens vers toi demain ». C'est le levier le plus rentable du SAV.

**Envoyer le suivi dès l'expédition**, et un message proactif au moindre retard. Un client
prévenu attend ; un client qui découvre le retard seul conteste.

**Rembourser vite quand c'est perdu.** Un remboursement coûte le produit. Une
rétrofacturation coûte le produit, des frais fixes, et un point de ratio. Sur un colis
perdu, discuter est économiquement absurde.

**Soigner l'intitulé sur le relevé bancaire** : il doit porter le nom de la boutique tel
qu'il apparaît sur le site, avec un moyen de contact si le format le permet.

**Vérifier le numéro IOSS** avant tout envoi sous 150 € depuis un pays tiers. Voir
`conformite-produit-import`.

## La politique de remboursement

Le droit de rétractation de **14 jours** est légal en France, il ne se négocie pas et il
doit être écrit clairement. Le cacher ne réduit pas les retours — ça les transforme en
litiges, qui coûtent bien plus cher.

Une politique lisible et généreuse réduit le nombre de rétrofacturations, parce qu'elle
donne au client une voie plus simple que sa banque. **C'est le calcul à faire : chaque
retour accepté sans discuter est une rétrofacturation évitée.**

## Le tableau de bord minimal

À regarder chaque semaine dès la première campagne :

| Indicateur | Seuil d'alerte |
|---|---|
| Litiges ÷ transactions du mois | **> 0,5 %** — agir avant d'approcher 1 % |
| Délai moyen de première réponse | **> 24 h** |
| Part des commandes en retard sur le délai annoncé | **> 10 %** |
| Taux de remboursement | à suivre en tendance, pas en absolu |

Le seuil interne doit être très en dessous du seuil des réseaux. Quand on atteint 1,5 %, il
est déjà trop tard : le programme se déclenche sur un mois écoulé.

Sources dans `references/sources.md`.
