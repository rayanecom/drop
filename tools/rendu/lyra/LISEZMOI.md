# Dentina — accueil + fiche produit, structure calquée sur Lyra

`accueil.html` et `produit.html`, autonomes, polices Figtree en local dans `../fonts/`.

## Structure relevée sur les captures de lyra-officiel.fr et reproduite à l'identique

### Accueil
1. Barre d'annonce · 2. Header nav centrée · 3. Héros (pastille, H1 3 lignes, sous-titre,
bouton pilule à flèche, carte vidéo, image à droite) · 4. Quatre cartes de réassurance ·
5. Section sombre (sur-titre, H2 centré 2 lignes, bouton pilule clair, trois cartes) ·
6. Bandeau défilant · 7. Bloc produit (galerie + vignettes, note, titre, puces, prix, CTA) ·
8. Avis clients (pastille note, H2 2 lignes, quatre cartes photo) · 9. Trois cartes basses ·
10. Pied bleu, liens empilés centrés, logos de paiement.

### Fiche produit
1. Annonce + header · 2. Bloc achat (galerie, H1, prix, note, sous-titre, quatre puces, CTA,
avis mis en avant, bandeau garantie, accordéon 5 questions) · 3. Quatre cartes ·
4. Comment ça marche (titre + texte, trois vidéos, encart de validation) · 5. Quatre étapes
numérotées · 6. Témoignages professionnels · 7. FAQ (image + accordéon 6) · 8. Avis
utilisateurs (liste + pagination) · 9. Trois cartes basses · 10. À découvrir aussi · 11. Pied.

## AIDA — où chaque étape est jouée

| Étape | Accueil | Fiche produit |
|---|---|---|
| **Attention** | Annonce + héros : bénéfice, durée, effort supprimé | Bloc achat : titre, prix, image |
| **Intérêt** | Quatre cartes + section sombre : le mécanisme | Puces, accordéon, « Comment ça marche » |
| **Désir** | Bloc produit + avis clients | Quatre étapes, témoignages, FAQ, avis |
| **Action** | Bouton + prix + réassurance | CTA, garantie, réassurance, « À découvrir aussi » |

## Relevé — 2026-09-04

| Page | 320 | 375 | 414 | 1280 |
|---|---|---|---|---|
| accueil | 6 482 px | 6 609 px | 6 656 px | 3 833 px |
| produit | 8 691 px | 8 554 px | 8 646 px | 6 025 px |

**Huit cas : aucun débordement horizontal, aucune cible tactile sous 44 px, aucun texte
sous 16 px hors étiquettes.**

Corrections appliquées après la première mesure : `.lg` 15 → 16 px (elle portait du texte
de vente, pas des légendes), descriptifs des quatre étapes 15 → 16 px, prix des accessoires
15 → 16 px, liens de navigation 14 → 44 px de hauteur cliquable, bandeau défilant 15 → 16 px.

## Emplacements laissés vides, volontairement

Tout ce qui est hachuré avec une étiquette orange est un emplacement à remplir : photos
produit, photos clients, avis, note globale, témoignages professionnels, vidéos.
**Rien n'est inventé.** Les mentions `à confirmer` / `à mesurer` marquent les chiffres
qu'on ne connaît pas encore.

## Ce qui n'a pas été repris de Lyra, et pourquoi

| Chez eux | Chez nous |
|---|---|
| « Élimine 99,9 % des bactéries » | Rien — revendication chiffrée = règlement biocides UE 528/2012 |
| « 4.8 / +10 164 avis vérifiés » pour 72 avis affichés | Emplacement vide |
| « +10 904 clients satisfaits » | Emplacement vide |
| « Approuvé par des dentistes », carrousel de chirurgiens | Section conservée, emplacements vides, accord écrit exigé |
| « Technologie médicale » | « Conçu pour un seul objet » — pas de sous-entendu de dispositif médical |
| Prix barré 99,99 € permanent | Aucun prix barré |
| « Offre d'été : réduction de 30 € » en permanence | « Garantie 2 ans · Livraison offerte » |
