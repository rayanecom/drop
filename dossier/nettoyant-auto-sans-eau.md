# Dossier produit — Nettoyant auto/moto sans eau

> Ouvert le 2026-09-03 · Statut : **candidat, porte 1 ouverte**
> Méthode : `.claude/skills/methode-ecommerce/`
> Étiquettes : `FAIT` (source citée) · `ESTIMATION` (calcul montré) · `HYPOTHÈSE` · `[À CONFIRMER]`

---

## PORTE 1 — Produit

### 1. La douleur

| | |
|---|---|
| Problème | Nettoyer une voiture ou une moto sans point d'eau ni nettoyeur haute pression |
| Intensité | 4/5 `HYPOTHÈSE` — à confirmer par des verbatims (porte 4) |
| Fréquence | Hebdomadaire pour un motard en saison `HYPOTHÈSE` |
| Recherche active | `[À CONFIRMER]` — aucun volume de recherche mesuré |
| Alternative actuelle | Rouleau de station (~8 €/passage), seau interdit en copropriété |

### 2. La cible

> L'automobiliste ou le motard **en immeuble, sans garage ni robinet**, qui paie au rouleau
> pour un véhicule qu'il soigne, et qui le vit mal.

Segmentation observée chez le leader — `FAIT` (`search_shops` sur `vulcanet.shop`) : le même
produit est décliné en **trois marchés d'usage**, tous à 47,90 € — Auto/Moto, Vélo, TP/Agri.
La segmentation par identité d'usage, pas par produit.

### 3. Le produit

| Critère | Constat |
|---|---|
| Compréhension en 3 s, son coupé | **Oui** — jante noire de cambouis → miroir en un passage |
| Démontrable | Oui, c'est le meilleur du panel étudié |
| Potentiel UGC | Fort — le geste est reproductible par n'importe qui |
| Logistique | Léger, compact, incassable |
| Risque de retour | Faible — consommable |
| Risque réglementaire | **Nettoyant chimique** : étiquetage CLP (règlement CE 1272/2008) + fiche de données de sécurité fournisseur. **Veto tant que non chiffré.** |

### 4. L'économie

| Poste | Montant | Étiquette |
|---|---|---|
| Prix de vente TTC visé | 47,90 € | `FAIT` — prix du leader |
| Coût d'achat débarqué | **`[À CONFIRMER]` — BLOQUANT** | |
| Frais de paiement | 1,4 % + 0,25 € | `[À CONFIRMER]` selon PSP |
| Apps / SAV par commande | 0,30 € / 0,40 € | `HYPOTHÈSE` |
| Régime de TVA | `[À CONFIRMER]` — réel ou franchise | |

**Plafond de sourcing** — `ESTIMATION` (`scripts/economie.py`, régime réel) :

| Lecture du ×4 | Coût d'achat débarqué max |
|---|---|
| ×4 sur le prix TTC | 11,97 € |
| **×4 sur le CA net** | **9,98 €** |
| Bénéfice = 4 × le coût | 7,66 € |

### Score porte 1

| Critère | Poids | Note | Points |
|---|---|---|---|
| Intensité de la douleur | ×4 | 3 | 12 |
| Récurrence | ×3 | 4 | 12 |
| Précision de la cible | ×3 | 4 | 12 |
| Compréhension en 3 s | ×3 | 5 | 15 |
| Économie | ×3 | `[À CONFIRMER]` | — |
| Recherche active existante | ×2 | `[À CONFIRMER]` | — |
| Valeur perçue vs prix | ×1 | 3 | 3 |
| Logistique et retours | ×1 | 5 | 5 |
| **Partiel** | | | **59 / 75 notés** |

**DÉCISION PORTE 1 : EN ATTENTE.** Deux critères sur huit ne sont pas notables sans le coût
fournisseur et sans donnée de recherche. Le veto CLP n'est pas levé.

---

## PORTE 2 — Marché

### Trafic — `FAIT` (`search_shops`, vérifié directement le 2026-09-03)

| Concurrent | Domaine | Fév | Mars | Avr | Mai | Juin | **Juil** | FR |
|---|---|---|---|---|---|---|---|---|
| Vulcanet | `vulcanet.shop` | 1 591 | 3 773 | 6 485 | 6 609 | 4 400 | **44 597** | 100 % |
| Cleaners Motors | `cleanersmotors.com` | 0 | 4 836 | 3 840 | 12 241 | 20 725 | **69 347** | 85 % |

> ⚠️ **Les chiffres de juillet sont douteux.** Les deux boutiques bondissent le même mois
> (×10,1 et ×3,3) sans hausse publicitaire correspondante — Vulcanet passe même de 25 à 21
> publicités sur la période. Deux boutiques indépendantes qui décollent simultanément, c'est
> un changement de mesure, pas une croissance. **Ne pas fonder de décision sur ces valeurs.**
> Les données de trafic s'arrêtent à juillet 2026 dans la base.

### Publicités — `FAIT` (26 semaines, du 2026-03-09 au 2026-08-31)

| Concurrent | Min | Max | Actuel | Continuité | Annonceurs liés |
|---|---|---|---|---|---|
| Vulcanet | 21 | 36 | 37 | **26 semaines sans coupure** | 10 |
| Cleaners Motors | 25 | 139 | 139 | 26 semaines, ×5,6 | 7 |

La croissance de Cleaners Motors **n'est pas monotone** — 4 baisses vérifiées (61→46,
46→45, 65→64, 70→67). Correction d'une affirmation erronée du rapport initial.

**Google Ads** — Vulcanet : 21 annonces actives, portée déclarée 602 000. Cleaners
Motors : 6 annonces, portée 15 500.

**Ciblage publicitaire de Cleaners Motors** : réparti à parts égales sur **7 pays**
(BE, DE, ES, FR, IT, LU, PT), alors que son trafic est à 85 % français. Il teste
l'Europe francophone et au-delà.

### Prix pratiqués — `FAIT`

| Concurrent | Produit | Prix | Plafond ×4 net |
|---|---|---|---|
| Cleaners Motors | Serviette 40×40 | 19,00 € | 3,96 € |
| Cleaners Motors | Serviette 70×90 | 39,00 € | 8,12 € |
| Cleaners Motors | **Pack Intérieur & Extérieur** | **99,00 €** | 20,62 € |
| Vulcanet | Auto/Moto · Vélo · TP/Agri | 47,90 € | 9,98 € |

### Ce que la vérification a ajouté

1. **Cleaners Motors est sur Shopify Plus** (`isShopifyPlus: true`). Ce n'est pas un
   dropshipper qui démarre : c'est une structure financée. Le combat n'est pas symétrique.
2. **Il a un canal TikTok que le rapport initial avait manqué** : 19 100 abonnés,
   116 publications, **15,2 M de vues**, 175 876 likes, 32 publicités TikTok actives.
   Son acquisition n'est pas seulement payante.
3. **Son échelle de prix 19 / 39 / 99 €** est déjà la structure de bundle de l'étape 17.
   Seul le pack à 99 € passe le seuil des 40 €.
4. Sa croissance de trafic sur 30 jours n'est que de **+2,3 %** — ça plafonne.

**DÉCISION PORTE 2 : en attente.** Le marché est vivant et deux acteurs indépendants y
investissent depuis 26 semaines. Mais l'ancienneté des créas individuelles n'est pas
mesurée, et les cinq angles libres ne sont pas identifiés.

---

## Ce qui n'a pas pu être vérifié

| Donnée | Pourquoi | Comment la vérifier | Bloquant ? |
|---|---|---|---|
| Coût d'achat débarqué | Alibaba, CJ, AliExpress renvoient 403 au proxy | Devis fournisseur, 100 pièces + fret | **Oui** |
| Régime de TVA | Non communiqué | Comptable | **Oui** — déplace tous les plafonds de 20 % |
| Volume de recherche FR | Non mesuré | Outil de mots-clés | Oui, pour la porte 1 |
| Ancienneté des créas individuelles | Hors budget du scan | `search_ads` sur les 2 domaines | Oui, pour la porte 2 |
| Faisabilité CLP / FDS | Dépend du fournisseur | Demander la FDS au devis | **Oui** — veto |
| Trafic après juillet 2026 | Base arrêtée là | — | Non |

---

## Journal des décisions

| Date | Décision | Sur quelles données |
|---|---|---|
| 2026-09-03 | Retenu comme candidat n°1 sur 12 | 26 semaines de diffusion continue chez 2 acteurs indépendants, démo muette la plus lisible, logistique compatible avec le ×4 |
| 2026-09-03 | Données brutes recontrôlées à la source | `search_shops` exact sur les 2 domaines — 3 erreurs du rapport initial corrigées |
