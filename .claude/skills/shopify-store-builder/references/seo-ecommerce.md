# SEO e-commerce

Le SEO ne remplace pas la publicité au démarrage : il met 3 à 6 mois à produire. Mais il fait baisser le coût d'acquisition moyen sur la durée et il rend l'activité moins dépendante des plateformes publicitaires. À construire en parallèle, pas à la place.

## Structure d'URL Shopify

Shopify impose ses préfixes (`/products/`, `/collections/`, `/pages/`, `/blogs/`). Ne pas lutter contre, travailler avec :

- Handles courts, en minuscules, avec tirets, sans mots vides : `/products/chaussures-amphibies-antiderapantes`
- Un produit accessible depuis plusieurs collections crée des URL dupliquées : vérifier que la balise canonique pointe bien vers `/products/handle`
- Ne jamais modifier une URL qui reçoit du trafic sans mettre en place une redirection 301 (Shopify le propose automatiquement — accepter)

## Ce qui se travaille sur chaque page

**Balise titre** (55-60 caractères) : mot-clé principal + bénéfice ou différenciateur + marque.
`Chaussures amphibies antidérapantes — sèchent en 15 min | Marque`

**Méta description** (150-155 caractères) : ce n'est pas un facteur de classement, mais c'est ce qui décide du clic. Écrire une promesse + un élément de réassurance + un appel à l'action.

**H1 unique** par page, contenant le mot-clé principal, formulé naturellement.

**Texte** : 300 mots minimum sur une fiche produit, 150 sur une collection. Écrit pour l'humain d'abord — un texte bourré de mots-clés convertit mal, et Google le détecte de toute façon.

**Attributs alt des images** : décrire ce qu'on voit, avec le mot-clé quand c'est pertinent. Ça sert l'accessibilité, la recherche d'images, et c'est affiché si l'image ne charge pas.

**Balisage de données structurées** : Product (avec prix, disponibilité, note), FAQ sur les blocs questions, Organization sur l'accueil. La plupart des thèmes récents le font ; les notes en étoiles dans les résultats de recherche augmentent nettement le taux de clic.

## Stratégie de mots-clés pour une boutique de niche

Trois familles, trois types de pages :

| Intention | Exemple | Page cible |
|---|---|---|
| Transactionnelle | « acheter chaussures amphibies » | Fiche produit / collection |
| Comparative | « meilleures chaussures amphibies 2026 » | Article de blog comparatif |
| Informationnelle | « comment choisir des chaussures d'eau » | Guide d'achat |

Le guide d'achat est la page la plus rentable d'une boutique de niche : elle capte l'intention avant l'achat, se référence bien, et se transforme en page de destination publicitaire pour les audiences froides.

Viser des expressions longues au départ. Se positionner sur un mot générique très concurrentiel demande des années ; se positionner sur « chaussures amphibies pour randonnée en rivière » demande un bon article.

## Blog — ce qui vaut le coup

Quatre à six articles suffisent pour démarrer, s'ils sont les bons :

1. Guide d'achat de la catégorie (le pilier)
2. Comparatif des types/modèles
3. Erreurs fréquentes / comment choisir sa taille
4. Usage saisonnier ou contextuel
5. Entretien et durabilité
6. Comparaison avec l'alternative habituelle

Chaque article renvoie vers 2 à 3 fiches produits par des liens contextuels. Un article sans lien vers un produit ne rapporte rien.

Mieux vaut six articles utiles et mis à jour que quarante articles creux : depuis les mises à jour sur la qualité des contenus, les fermes de contenu générique sont pénalisées, pas récompensées.

## Points techniques à vérifier

- Boutique non protégée par mot de passe (sinon aucune indexation)
- Sitemap soumis dans la Search Console
- Aucune page 404 dans le menu ou le pied de page
- Vitesse mobile : c'est un facteur de classement, voir `design-et-vitesse.md`
- Pas de contenu dupliqué avec le fournisseur : réécrire intégralement les descriptions importées, c'est un des rares travaux SEO qui paie vite
- Un seul domaine, en HTTPS, avec redirection depuis les variantes

## Ce qui ne sert à rien

Les mots-clés cachés, le bourrage de mots-clés en bas de page, l'achat de liens en masse, les descriptions dupliquées sur 30 produits. Au mieux c'est inutile, au pire ça déclasse.
