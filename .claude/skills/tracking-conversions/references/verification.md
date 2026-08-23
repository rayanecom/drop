# Vérifier le tracking — procédure

Ordre imposé. Chaque étape échoue de façon distincte : ne pas les mélanger.

## 0. Avant de commencer

Relever ce qui est censé être installé :

```
Paramètres → Événements clients        → la liste des pixels actifs
Paramètres → Applications              → Facebook & Instagram ? TikTok ?
Paramètres → Confidentialité des clients → la bannière est-elle active ?
```

**Un doublon se voit ici** : si l'application officielle Facebook est installée *et*
qu'un pixel personnalisé envoie vers le même identifiant, chaque événement part deux
fois. Supprimer le pixel personnalisé, garder l'application.

## 1. Le bandeau de consentement

- Il apparaît à la première visite, avant tout dépôt de cookie publicitaire.
- **Refuser est aussi simple qu'accepter** — un bouton « Tout refuser » au même niveau
  visuel que « Tout accepter ». Un lien « paramètres » caché ne suffit pas.
- Après refus, les événements marketing ne partent pas.

Ce point ne se vérifie qu'en chargeant le site dans un navigateur, en navigation privée.

## 2. Les événements, un par un

Dans le gestionnaire d'événements de la plateforme, onglet **Test des événements** (Meta)
ou **Test Event** (TikTok). Coller l'URL de la boutique, puis dérouler le parcours réel :

| Action sur le site | Événement attendu | Erreur typique si absent |
|---|---|---|
| Ouvrir la page d'accueil | `PageView` | pixel non chargé, ou consentement refusé |
| Ouvrir la fiche produit | `ViewContent` | `content_ids` vide ou non aligné sur le catalogue |
| Ajouter au panier | `AddToCart` | le tiroir de panier n'émet pas l'événement |
| Cliquer « Passer la commande » | `InitiateCheckout` | pixel absent du checkout — cas classique d'une balise posée dans `theme.liquid` |
| Payer | `Purchase` | **le plus important, et le plus souvent manquant** |

## 3. La commande test

Il n'y a pas de raccourci : il faut une vraie commande.

- Soit avec le mode test de la passerelle de paiement (Shopify Payments → mode test),
- soit une vraie commande à 1 € via un code de remise, remboursée ensuite.

Ce qu'on contrôle sur l'événement `Purchase` reçu :

- `value` = le montant réel, **en unités, pas en centimes** (`39.99`, jamais `3999`)
- `currency` = `EUR`, présent
- `content_ids` = les identifiants du catalogue, pas des libellés
- **un seul** événement `Purchase` pour une commande — deux signifie une déduplication
  absente

## 4. Le contrôle qui se refait chaque semaine

Comparer, sur la même fenêtre de dates :

```
commandes Shopify   vs   achats du gestionnaire de publicités
```

| Écart observé | Cause la plus probable |
|---|---|
| Publicité ≈ 2 × Shopify | déduplication absente, ou pixel en double |
| Publicité ≫ Shopify sans être un multiple net | fenêtre d'attribution, pas forcément une panne |
| Publicité ≪ Shopify | perte de signal (consentement, iOS, bloqueurs) — normal jusqu'à un certain point |
| Publicité = 0 alors que Shopify vend | `Purchase` ne remonte pas — arrêter les campagnes et corriger |

## Ce qui n'est pas vérifiable sans navigateur

Depuis un environnement où le storefront est injoignable (proxy filtré), **rien de ce qui
précède ne peut être coché**. On peut lire la configuration via l'API, pas le
comportement.

Ce qui reste faisable en lecture :

- la liste des pixels déclarés,
- les applications installées,
- l'existence de la bannière de consentement dans les réglages.

Le reste doit être fait par l'utilisateur, dans son navigateur. Le dire clairement plutôt
que de conclure d'un silence que tout va bien.
