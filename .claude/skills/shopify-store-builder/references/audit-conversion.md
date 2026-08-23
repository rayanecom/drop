# Audit conversion — grille de notation

À utiliser dans deux situations : avant de livrer un travail (auto-test), et pour auditer une boutique existante.

## Grille — 100 points

### A. Fiche produit — 30 points
| # | Critère | Pts |
|---|---|---|
| A1 | Prix + CTA visibles sans scroller sur mobile (390 px) | 5 |
| A2 | Galerie de 5+ visuels, dont usage réel, détail et échelle | 4 |
| A3 | Titre orienté bénéfice, pas référence fournisseur | 3 |
| A4 | Variantes cliquables avec image par couleur | 3 |
| A5 | Paliers de quantité ou bundle présents | 4 |
| A6 | 15+ avis dont avec photos, note moyenne < 5,0 | 4 |
| A7 | FAQ produit répondant à 5 objections réelles | 3 |
| A8 | Guide des tailles (si produit porté) | 2 |
| A9 | Garantie / retours affichés près du CTA | 2 |

### B. Confiance — 20 points
| # | Critère | Pts |
|---|---|---|
| B1 | CGV, mentions légales, confidentialité, retours accessibles au pied de page | 5 |
| B2 | Délai de livraison réel affiché sur la fiche produit | 4 |
| B3 | E-mail de contact visible + page contact fonctionnelle | 3 |
| B4 | Page À propos substantielle (pas de texte générique) | 3 |
| B5 | Logos de moyens de paiement au pied de page | 2 |
| B6 | Aucune fausse urgence, aucun faux avis, aucun faux compteur | 3 |

### C. Technique et vitesse — 20 points
| # | Critère | Pts |
|---|---|---|
| C1 | LCP mobile < 2,5 s | 5 |
| C2 | Images compressées, WebP, chargement différé | 4 |
| C3 | Moins de 12 applications actives | 3 |
| C4 | Aucun lien mort, aucune page 404 dans le menu ou le pied de page | 3 |
| C5 | Bouton d'achat collant sur mobile | 3 |
| C6 | Panier en tiroir + paiement express activé | 2 |

### D. Offre et panier moyen — 15 points
| # | Critère | Pts |
|---|---|---|
| D1 | Marge brute ≥ 65 % après coût produit rendu | 5 |
| D2 | Seuil de livraison offerte défini au-dessus du panier moyen | 3 |
| D3 | Upsell panier ou post-achat en place | 4 |
| D4 | Produits complémentaires sur la fiche | 3 |

### E. Parcours et acquisition — 15 points
| # | Critère | Pts |
|---|---|---|
| E1 | Menu de 4 à 6 entrées, produit star atteignable en 1 clic | 3 |
| E2 | Homepage suivant l'ordre hero → réassurance → produit → preuve → bénéfices → FAQ | 3 |
| E3 | Pixel(s) installés et événements Achat/ATC/InitiateCheckout vérifiés | 4 |
| E4 | Séquence panier abandonné active | 3 |
| E5 | Cohérence pub → page de destination (même promesse, même visuel) | 2 |

## Lecture du score

- **90-100** — prêt à recevoir du trafic payant.
- **80-89** — lançable, corriger les points manquants en parallèle.
- **60-79** — ne pas dépenser en publicité avant correction : chaque euro sera gaspillé.
- **< 60** — refonte des points bloquants avant toute autre chose.

## Format du rapport d'audit

```
Score : XX/100

BLOQUANT (à corriger avant toute pub)
1. [Critère] — constat → correction exacte à appliquer

FORT IMPACT (fait dans la semaine)
...

CONFORT (quand il y aura des ventes)
...

Prochaine action unique : ...
```

Classer par **impact × facilité**, pas par ordre de la grille. Une correction à 5 points qui prend 2 minutes passe avant une correction à 5 points qui prend 2 jours.

## Diagnostic par symptôme

Quand l'utilisateur décrit un problème plutôt qu'une page, partir de là :

| Symptôme | Cause la plus probable | Où regarder |
|---|---|---|
| Du trafic, aucun ajout au panier | Décalage promesse pub / page, ou prix perçu trop élevé | E5, A1, A3 |
| Des ajouts au panier, pas de paiement | Frais ou délai découverts trop tard, manque de confiance | B1, B2, C6 |
| Paiement démarré, non finalisé | Paiement express absent, frais surprise, bug mobile | C5, C6, B5 |
| Taux de conversion correct, pas rentable | Panier moyen trop bas ou marge trop faible | D1 à D4 |
| Ventes puis remboursements en masse | Délai mal annoncé ou produit non conforme aux visuels | B2, règle n°1 |
| Beaucoup de tickets support | FAQ, suivi de commande et guide des tailles absents | A7, A8 |

Les taux de référence utiles : ajout au panier 5-10 % du trafic, paiement démarré 2-4 %, conversion finale 1,5-3 % sur trafic froid payant. En dessous de 1 %, le problème est structurel, pas cosmétique.
