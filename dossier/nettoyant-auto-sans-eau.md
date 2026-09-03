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

### CORRECTION MAJEURE — ce ne sont pas deux concurrents du même produit

Les deux boutiques avaient été présentées comme montant ensemble sur le même marché. Les
publicités le contredisent — `FAIT` (`search_ads`, `sort_by=longestRunning`, 2026-09-03) :

| | Vulcanet | Cleaners Motors |
|---|---|---|
| Produit réellement poussé | **Lingettes de nettoyage sans eau** | **Serviette de séchage ultra-absorbante** |
| Douleur traitée | « Je n'ai pas de point d'eau » | « Après le lavage, ça laisse des traces » |
| Moment d'usage | **À la place** du lavage | **Après** le lavage |
| Prix | 47,90 € | 19 / 39 / 99 € |

Ce sont **deux marchés distincts** dans la même catégorie. L'affirmation « deux acteurs
indépendants montent simultanément sur le même produit » était fausse, et elle était le
premier argument en faveur de ce candidat.

### Vulcanet — ancienneté des créas actives `FAIT`

| Jours | Segment visé | Portée | Dépense estimée |
|---|---|---|---|
| **377** | **Vélo** — « Cyclistes, vous allez adorer entretenir votre vélo » | 203 370 | 1 830 € |
| **377** | Vélo, autre créa | 82 737 | 745 € |
| **328** | **Avion / ULM** — « Aéroclubs, pilotes privés, ULM » | 9 272 | 83 € |
| 325 | TP/Agri — « Agriculteurs, chauffeurs TP, transporteurs » | 453 874 | 4 085 € |
| 272 | TP/Agri, UGC partenaire | 136 655 | 1 230 € |
| 161 | TP/Agri | 121 717 | 1 095 € |
| 144 | Moto Harley, UGC | 6 042 | 54 € |
| 66 | Multi-segment — **rang 1 de la page** | 352 983 | 3 177 € |

**Trois lectures qui comptent :**

1. **La créa la plus ancienne ne vise pas l'auto — elle vise le vélo.** 377 jours.
2. **Le segment Avion/ULM tourne depuis 328 jours pour 83 € de dépense et 9 272 de portée.**
   Une audience minuscule, un budget dérisoire, et un an de diffusion : la preuve qu'un
   **micro-segment est rentable sur ce produit**. C'est le fait le plus exploitable du dossier.
3. **Le gros budget est sur TP/Agri**, pas sur l'auto/moto.

Segments réellement publicités : Vélo, TP/Agri, Avion/ULM, Auto/Moto, Camion.
Segments revendiqués dans la fiche produit mais **non publicités** : **bateau, drone,
camping-car**.

Page annonceur : 30 pubs actives, portée 30 j 708 074, portée cumulée 7 998 697,
14 542 mentions J'aime, 9 258 abonnés Instagram, **1 seul pays**.

### Cleaners Motors — ancienneté des créas actives `FAIT`

| Jours | Accroche | Portée | Dépense estimée |
|---|---|---|---|
| 244 | UGC — « ma carrosserie est vraiment comme neuve » | 68 418 | 616 € |
| 235 | « Jusqu'à −30% en ce moment ! » | 1 251 104 | 11 260 € |
| 234 | « Jusqu'à −30% en ce moment ! » | 701 507 | 6 314 € |
| 218 | « il n'existe aucune serviette aussi absorbante » | **1 728 752** | **15 559 €** |

**8 pubs = 45 474 € de dépense estimée et 5 052 512 de portée.** Page : 139 pubs actives,
portée cumulée **37 817 040** — soit **×4,7 la portée de Vulcanet**. 7 pays visés
(FR, BE, LU, IT, DE, ES, PT).

### Ce qu'il ne faut PAS copier chez eux

| Pratique | Problème |
|---|---|
| « Jusqu'à −30% **en ce moment** » diffusé **235 jours d'affilée** | Une remise permanente présentée comme temporaire. Le prix de référence doit être le prix le plus bas des 30 derniers jours — directive Omnibus. |
| « La serviette **n°1 en France** » | Allégation de supériorité non étayée |
| « **il n'existe aucune** serviette aussi absorbante » | Superlatif absolu, invérifiable |
| Vulcanet : « moins de 0,50 € par nettoyage » | `ESTIMATION` : 47,90 € ÷ 80 lingettes = **0,60 €**. Écart de 0,10 €. `[À CONFIRMER]` |

Ces trois marques sont exposées. Une marque honnête peut s'en différencier — c'est un angle
de confiance réel, pas un slogan.

### Verbatim client extrait d'une transcription `FAIT`

Transcription d'une vidéo UGC de Cleaners Motors, mot pour mot :

> « moi qui ai ce problème là aussi de laver la voiture au karcher et parce que je vais
> éviter les micro rayures j'aime pas les rouleaux »

Premier verbatim réel du dossier. Il dit que la douleur n'est pas seulement l'absence d'eau :
c'est **la peur des micro-rayures et le rejet du rouleau**. À creuser en porte 4.

### Risque nouveau — brevet

Une description publicitaire de Vulcanet annonce « la **solution brevetée** pour un nettoyage
intérieur efficace des cabines d'engins ». `[À CONFIRMER]` par une recherche INPI/EPO. Si le
système ou la formule est protégé, sourcer une copie expose à une contrefaçon. **À vérifier
avant tout devis.**

**DÉCISION PORTE 2 : NON FRANCHIE.** Le critère « publicité de plus de 30 jours » est
largement rempli — 377 jours chez Vulcanet, 244 chez Cleaners Motors. Mais le critère
« marché attaquable » ne l'est pas : un incumbent français avec un brevet revendiqué d'un
côté, une structure Shopify Plus à 37,8 M de portée de l'autre. Les cinq angles libres ne
sont pas encore établis.

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
