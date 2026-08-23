# Estran — contexte projet

Repo de travail pour la boutique Shopify **Estran** (dropshipping, marché France).

## Le nom : Estran remplace AquaTerra

Décidé par l'utilisateur le 22/08/2026. **Estran** — la bande de côte découverte à marée
basse, donc exactement la zone amphibie du produit. AquaTerra était générique et
interchangeable ; le nouveau nom porte une image sans avoir à l'expliquer.

La décision est prise, elle n'est pas à rouvrir. En revanche **la migration n'est pas
faite** : côté Shopify, la boutique et le produit portent encore l'ancien nom. Ne jamais
supposer que le renommage est appliqué quelque part — le vérifier.

Ce que le renommage touche, et son état :

| Emplacement | État |
|---|---|
| Nom de la boutique (Paramètres → Détails) | à faire, par l'utilisateur |
| Titre et `handle` du produit | **déjà fait** — `estran-ouvre-huitres` porte le nouveau nom |
| Versions du thème (`AquaTerra v8` → `Estran v9`) | à faire à la prochaine duplication |
| Préfixes de fichiers `at-*` dans le thème | **à conserver** — les renommer casserait tous les `render` pour un gain nul |
| Logo, visuels, favicon | dépend de `identite-visuelle` |
| Copy des pages et de la fiche produit | à faire après le logo |
| Domaine | à décider par l'utilisateur |

## Boutique

| | |
|---|---|
| Nom | Estran (la boutique s'appelle encore « AquaTerra » côté Shopify) |
| Domaine | `kznquq-5a.myshopify.com` |
| Plan | Basic |
| Devise / marché | EUR / France |

## Le produit : un ouvre-huîtres

Confirmé par l'utilisateur le 23/08/2026, et vérifié dans le catalogue. **Le produit vendu
est un ouvre-huîtres**, pas une chaussure.

Les « Chaussures Amphibies » que décrivaient les versions précédentes de ce fichier
**n'existent pas dans le catalogue**. Ne pas les réintroduire. Le nom Estran reste juste :
l'estran est aussi le lieu où l'on élève les huîtres.

État réel du catalogue, lu par l'API le 23/08/2026 — un seul produit :

| | |
|---|---|
| Titre | `Estran ouvre huitres` (à réécrire, c'est une référence, pas une promesse) |
| `handle` | `estran-ouvre-huitres` |
| Statut | `ACTIVE` |
| Prix | 39,99 € — `compareAtPrice` 59,99 € |
| Variantes | **une seule**, `Default Title` |
| Description | **vide** |
| SEO title / description | `null` / `null` |
| `productType`, `tags` | vides |
| Images | 5, toutes avec un `altText` vide ; l'une ne fait que **480 × 480** |
| Stock | 0 |

### Ce qui a été fait le 23/08/2026, et vérifié par relecture API

| | |
|---|---|
| Titre, description, SEO, type, étiquettes | réécrits pour l'ouvre-huîtres |
| `compareAtPrice` 59,99 € | **vidé** — jamais pratiqué, directive Omnibus |
| Produit rangé dans `frontpage` et `meilleures-ventes` | fait, les deux passent à 1 |
| Remises de volume | **reconstruites et actives** : −25 % dès 2, −33 % dès 3. Elles étaient expirées *et* rattachées au produit chaussures supprimé |
| `alt` de l'image principale | posé |
| Thème `Estran v10 - ouvre-huitres` | créé par duplication de v9, page d'accueil réécrite, mesurée au banc |

### Ce qui reste, et pourquoi je ne l'ai pas fait

1. **Publier le thème** — l'API le refuse, et c'est très bien : la décision appartient à
   l'utilisateur. Prévisualiser `Estran v10`, puis publier.
2. **Les `alt` des images 2 à 5.** Le proxy bloque `cdn.shopify.com` : je ne peux pas
   voir les images, donc je ne peux pas décrire ce qu'elles montrent. Les inventer serait
   une fabrication. À faire par l'utilisateur, ou depuis un poste qui accède au CDN.
3. **Les caractéristiques du produit** — matière, longueur, manche, garde, entretien,
   pays de fabrication. Marquées `[À COMPLÉTER]` dans la fiche. Tant qu'elles manquent,
   ni le tableau comparatif ni la section « détails techniques » ne peuvent être écrits
   sans inventer.
4. **Le délai de livraison réel du fournisseur.** Toute mention de délai a été retirée
   de la page d'accueil plutôt que de reconduire le « 24 à 48 h » non vérifié.
5. **L'image de 480 × 480**, floue au zoom. À remplacer par une version ≥ 1000 px.
6. **Les 4 collections « chaussures »**, vides et hors sujet. Suppression volontairement
   laissée à l'utilisateur — c'est irréversible.
7. **Les pages légales** : ni CGV, ni remboursement, ni expédition, ni mentions légales.
   `show_policy` est à `false` dans le pied de page. C'est le prochain gros chantier,
   et il exige la raison sociale et le SIRET.

### Ce que le produit change par rapport aux chaussures

- **Une seule option** aujourd'hui, donc `picker_types` n'a pas d'objet en l'état. Les
  paliers de quantité (1 / 2 / 3) sont la façon naturelle d'ouvrir l'AOV ici, et la seule
  qui justifie la bannière `at-promo`.
- **Antériorité INPI à vérifier en classe 8** (coutellerie et ustensiles), pas en 25.
- **Descripteur du lockup de marque : « OUVRE-HUÎTRES »**, jamais le nom seul en
  acquisition.

## Thème

Base **Shrine** (thème payant dérivé de Dawn). Convention maison : une version par
chantier, créée par duplication — `AquaTerra v3` → `v4` → … → `v8`, puis `Estran v9`
et suivants. Le thème publié
porte le rôle `MAIN`.

Réglage utile : le sélecteur de variantes est piloté par **`picker_types`** sur le bloc
sélecteur — une valeur par option, séparées par des virgules. Valeurs acceptées :
`pills`, `dropdown`, `swatches`, `quantity-breaks`, `hidden`. Champ vide = `pills,pills,pills`.
Sans objet tant que le produit n'a qu'une option — à garder pour le jour où des variantes
de quantité seront créées, où `quantity-breaks` devient le bon réglage.

### Palette — lagon & sable

**Une seule famille chromatique.** C'est la règle qui compte, plus que les valeurs.
Une tentative précédente associait un teal saturé à un terracotta désaturé : deux
couleurs de force égale s'annulent au lieu de se hiérarchiser, et leur voisinage vire
au pêche. La terre s'exprime donc par des **neutres chauds** (sable, ivoire), jamais par
une couleur d'accent.

| Rôle | Valeur | Réglage de thème |
|---|---|---|
| Encre (texte) | `#0B2A31` | `colors_text` |
| Mer profonde (accent 1) | `#0C4A56` | `colors_accent_1`, `colors_outline_button_labels`, `scrollbar_thumb_color`, `checkout_button_color`, fond du pied de page |
| Lagon (accent 2) | `#00808A` | `colors_accent_2`, pastilles de remise, soulignages |
| Turquoise vif | `#00C2A8` | **unique couleur vive** : « Acheter maintenant », bouton du pied de page |
| Ivoire (fond) | `#FCFAF7` | `colors_background_1` |
| Écume (fond secondaire) | `#DFEFF1` | `colors_background_2` |
| Sable | `#F7F1E8` | fond de la fiche produit, dans `at-palette` |
| Gris de mer (texte secondaire) | `#4A666F` | dans les snippets |

Un seul élément saturé sur toute la page : le bouton d'achat. C'est ce qui le rend
impossible à manquer sans recourir au rouge-orange d'urgence de tous les dropshipping.

Contrastes recalculés et vérifiés deux fois (WCAG 2.x, seuil 4,5:1 en texte courant,
3:1 pour un titre d'au moins 24 px) :

| Combinaison | Ratio | |
|---|---|---|
| Encre sur ivoire / sable / écume | 14,50 · 13,46 · 12,78 | confortable partout |
| Encre sur turquoise | **6,68** | d'où le libellé foncé — du blanc n'y serait qu'à 2,5:1 |
| Blanc sur mer profonde | 9,86 | |
| Ivoire sur mer profonde | 9,47 | |
| Blanc sur lagon | 4,71 | juste au-dessus du seuil |
| Gris de mer sur ivoire / sable / écume | 5,89 · 5,47 · 5,19 | |
| Lagon sur ivoire | 4,52 | passe de justesse |

**Trois combinaisons échouent, et ce sont des voisinages naturels — d'où le piège :**

| Combinaison interdite en texte | Ratio | Pourquoi c'est piégeux |
|---|---|---|
| Lagon sur **sable** | **4,20** | le sable est le fond de la fiche produit |
| Lagon sur **écume** | **3,99** | l'écume est `colors_background_2` |
| Turquoise sur **mer profonde** | **4,36** | la mer profonde est le fond du pied de page |

Dans ces trois cas : titres d'au moins 24 px et filets seulement (le seuil de 3:1 est
atteint), jamais de texte courant. Pour du texte sur sable ou sur écume, prendre l'encre
ou le gris de mer. Le bouton turquoise du pied de page reste valide — c'est un fond, avec
un libellé encre à 6,68:1 ; c'est du **texte** turquoise sur mer profonde qui est exclu.

### Typographie

Deux familles, pas trois. Le contraste entre titre et texte se fait par l'**axe de
largeur**, pas par une fonte supplémentaire.

| Famille | Rôle | Licence |
|---|---|---|
| **Archivo** | affichage **et** texte courant (`wght 100→900`, `wdth 62→125`) | OFL |
| **IBM Plex Mono** | données uniquement : dimensions, quantités, références, sur-titres | OFL |

Ni Poppins, ni Montserrat, ni Inter. La hauteur d'x d'Archivo (526/1000) la rend lisible
à 16 px sur mobile, ce qui est la contrainte réelle ici.

**Héberger les deux fichiers dans `assets/`**, ne pas appeler `fonts.googleapis.com` :
l'appel direct transmet l'IP du visiteur à Google sans consentement — risque RGPD réel sur
le marché France, et une requête tierce de moins.

**Le piège de l'espace fine.** Vérifié sur les fichiers de fonte : l'espace fine
insécable `U+202F` est **absente des deux familles**. Ne jamais écrire `&#8239;` — le
navigateur ferait un repli de fonte sur ce seul caractère et la largeur de l'espace
sauterait. Utiliser `&nbsp;` (U+00A0), présent partout. Ça confirme la convention déjà en
place : `{{ prix | money | remove: '€' | strip }}&nbsp;€`.

### Préfixe des fichiers : `at-*` reste `at-*`

Le préfixe vient d'AquaTerra, mais **il ne change pas**. Renommer en `es-*` casserait tous
les `render` du thème pour un gain nul : personne ne voit un nom de snippet. La règle est
donc : **un seul préfixe, `at-*`, y compris pour les nouveaux fichiers.** Un repo qui
porterait les deux serait pire que celui qui garde l'ancien.

### Emblèmes et logos

Seuls deux types de marques réelles ont leur place sur la fiche :

- **Les logos de paiement**, rendus par Shopify via `payment_type_svg_tag` sur
  `shop.enabled_payment_types`. La liste suit ce qui est réellement activé, donc elle
  ne peut pas mentir. Si rien n'est activé, rien ne s'affiche.
- **Le drapeau français** pour le SAV : bleu `#002395`, blanc, rouge `#ED2939`,
  trois bandes égales.

Pas de logo de transporteur : le transporteur réel n'est pas connu, et afficher
Colissimo sur un colis qui part autrement est une fausse promesse.

Les autres pictogrammes sont **pleins**, jamais en trait fin — un contour de 1,6 px
se délave à 22 px sur un téléphone et fait bricolé.

**Les vrais logos de marque vivent dans `assets/`**, préfixés `at-pay-*` (Visa, Mastercard,
American Express, PayPal, Maestro, Apple Pay, Google Pay) et `at-ship-*` (DHL, UPS, FedEx,
DPD). Ce sont les fichiers officiels, pas des reproductions.

Pour en ajouter un sans le retaper : `themeFilesUpsert` accepte un corps de type **`URL`**
— Shopify télécharge le fichier lui-même, donc les octets sont identiques à la source.
Le proxy sortant laisse passer `raw.githubusercontent.com` ; `upload.wikimedia.org` et
`cdn.jsdelivr.net` sont bloqués. Colissimo, Mondial Relay et Chronopost n'ont de fichier
officiel sur aucune source atteignable : il faut que l'utilisateur les dépose dans
Contenu → Fichiers.

### Format monétaire — le piège

`moneyFormat` de la boutique vaut `€{{amount_with_comma_separator}}`, donc tout le site
affiche « €39,99 » au lieu de « 39,99 € ». **L'API Admin n'expose pas ce réglage en
écriture** : il se corrige dans Paramètres → Général → Devise → Modifier le format.

Dans un snippet, ne pas compter sur `money_without_currency` (son séparateur décimal ne
suit pas toujours le réglage). Écrire `{{ prix | money | remove: '€' | strip }}&nbsp;€` :
le résultat est correct avec l'ancien comme avec le nouveau réglage.

Répartition des fichiers : `aquaterra-mobile` tient la **géométrie**, `at-palette` tient
la **couleur**. Une couleur définie aux deux endroits finit toujours par diverger.

## Contraintes d'environnement — à lire avant de promettre quoi que ce soit

1. **L'API Shopify refuse toute écriture sur le thème publié.** `themeFilesUpsert` ne
   passe que sur un thème non publié, et la publication est bloquée côté API. Procédure :
   `themeDuplicate` → écrire sur la copie → l'utilisateur prévisualise → l'utilisateur
   publie.
2. **Le réseau sortant est filtré.** La boutique elle-même renvoie un 403 au CONNECT du
   proxy, `narelya.fr` et `cdn.shopify.com` aussi. Impossible de charger une page du
   storefront pour vérifier un rendu. Ne pas conclure d'un échec réseau que la
   configuration ou une clé d'API est fautive : vérifier d'abord
   `curl -sS "$HTTPS_PROXY/__agentproxy/status"`.

   **Mais ce n'est pas une excuse pour livrer sans regarder.** Chromium est installé
   localement : `tools/rendu/` rend le bloc seul, le mesure à 320/375/414/1280 px et
   sort des captures. C'est ce qui aurait attrapé la bannière rognée par
   `aspect-ratio` + `overflow:hidden`. À utiliser avant toute livraison d'un bloc
   visuel, et **resynchroniser le banc après chaque retouche** : ce qui est livré doit
   être exactement ce qui a été mesuré.
3. **`templates/product.json` pèse ~68 Ko.** Le réécrire intégralement via l'API pour
   changer un seul réglage est disproportionné et risque de le corrompre. Préférer
   l'éditeur de code Shopify (recherche directe du réglage) ou une modification ciblée
   d'un snippet.

## Règles de travail

- **Vérifier, ne pas croire.** Après toute modification annoncée, relire l'état réel :
  `updatedAt` du thème, relecture du fichier écrit, taille cohérente avec le delta
  attendu. Un « c'est fait » n'est pas une preuve.
- **Français, tutoiement, direct.** Livrables prêts à coller, jamais de conseils vagues.
- **Honnêteté commerciale non négociable** : délais de livraison réels, aucune allégation
  santé, pas de fausses preuves sociales, pas de prix barré fictif. Détail dans le skill
  `shopify-store-builder`.

## Skills installés dans ce repo

**Plugin ui-ux-pro-max** — 7 skills de référence (`ui-ux-pro-max`, `design`,
`design-system`, `ui-styling`, `brand`, `banner-design`, `slides`).
Source : <https://github.com/nextlevelbuilder/ui-ux-pro-max-skill>

Attention au doublon de nom : ce plugin fournit déjà un skill nommé `design`. Ne pas
activer un second `design` venu d'ailleurs, ça dégrade le déclenchement des deux.

**Socle vendorisé** — `shopify-store-builder` (structure, copy, légal France, SEO,
fournisseur, ads, grille d'audit sur 100 points) et `dispatch-modele` (choix du modèle).
Ils venaient de la synchronisation du compte claude.ai, donc ils n'existaient **pas** dans
le repo alors que cinq agents les chargent explicitement. Une session lancée depuis un
terminal sur une autre machine se serait retrouvée avec des agents cassés. Ils sont
maintenant dans `.claude/skills/`.

**Skills maison** (écrits pour ce projet) :

| Skill | Rôle |
|---|---|
| `direction-artistique` | Imposer une direction artistique distinctive. Contient la liste noire des clichés dropshipping et un menu de 8 directions. À déclencher **avant** tout code. |
| `shopify-sections` | Coder des sections Liquid sur mesure. Contient un modèle de section validé dans `assets/section-modele.liquid`. |
| `mobile-ecommerce` | Rendre la boutique vendeuse sur mobile : ligne de flottaison, cibles de 44 px, seuil des 16 px, poids et décalage des images. |
| `composants-ui` | Générer un composant d'interface complet à partir d'une description, dans le bon langage cible et avec les jetons du projet. |
| `tracking-conversions` | Poser et surtout **vérifier** la mesure : pixel, Événements clients, remontée serveur, déduplication, consentement. Contient la procédure de vérification événement par événement. |
| `tunnel-paiement` | Du panier à la commande : paiements express, tiroir, franco de port, paliers de quantité, upsell, relance. |
| `design-remarquable` | **Exécuter** le design pour qu'il frappe : échelle typo, rythme d'espacement, profondeur, mouvement, seuils de performance. L'aval de `direction-artistique`. Sourcé. |
| `strategie-marketing` | Décider quoi dire et à qui **avant** d'écrire : niveau de conscience, offre, persuasion, croissance de marque. Sourcé. |
| `visuels-produit` | Normaliser et produire les images : ratio unique, ordre des 5 images, textes alternatifs, droits d'usage, ce qui se génère et ce qui ne se génère jamais. |

Ce que chacun comble : `ui-ux-pro-max` est une base de données de styles et
`shopify-store-builder` couvre la structure, la copy et le légal — mais rien ne traitait
du **parti pris visuel**, du **code de mise en page sur mesure**, de la **mesure des
conversions**, du **tunnel de paiement** ni de la **production des visuels**.

### Le résultat de recherche qui commande le design

Deux études, citées dans `design-remarquable/references/sources.md` :

- le jugement esthétique d'une page se forme en **50 ms** et reste stable (Lindgaard et
  coll., 2006) ;
- dans cette fenêtre, les pages jugées les plus belles sont celles à **faible complexité
  visuelle** et **forte prototypicalité** — c'est-à-dire qui ressemblent à ce qu'on attend
  de leur catégorie (Tuch et coll., Google / Université de Bâle, 2012).

**Conséquence, contre-intuitive et à ne jamais oublier : une mise en page inhabituelle ne
produit pas l'effet waouh, elle produit de la friction.** La règle est donc **structure
familière, exécution singulière** — emplacements et parcours conventionnels, typographie,
couleur, images, rythme et finitions singuliers.

Trois limites de plan vérifiées dans la documentation Shopify, à ne pas réapprendre à
chaque fois (plan Basic) :

- **web pixel / pixel personnalisé** : disponible ;
- **upsell dans les étapes du checkout** : Shopify **Plus uniquement** ;
- **upsell post-achat** : disponible mais **en bêta, accès à demander** pour une boutique
  en production. Les extensions de page de remerciement, elles, sont ouvertes.

## Agents

`.claude/agents/` :

| Agent | Rôle |
|---|---|
| `designer-boutique` | Direction artistique **puis** implémentation. Le chef d'orchestre du design. |
| `theme-shopify` | Modifier le thème en sécurité : dupliquer, écrire, vérifier, laisser publier. |
| `audit-boutique` | Audit scoré et priorisé de la boutique. |
| `fiche-produit` | Copywriting de page produit orienté conversion. |
| `creas-ads` | Angles et briefs de créas Meta/TikTok. |
| `identite-visuelle` | Nom, logo, palette, typographie, ton. Le positionnement avant le dessin. |
| `controle-rendu` | Contrôle qualité visuel au banc Chromium avant livraison. Le seul œil sur le rendu. |
| `pages-annexes` | Pages de confiance : CGV, livraison, retours, RGPD, FAQ, à propos. |
| `seo-boutique` | Référencement : balises, structure, données structurées, maillage. |

## Bannière d'offre — `at-promo`

Reprend le visuel Canva « Plus vous prenez, plus vous économisez », placé comme chez
Narelya : **toute la largeur de la colonne produit, 16:9, collée au-dessus du bouton
d'achat**. Rendue depuis `at-buybox` (seul endroit où `product` est garanti), puis
déplacée par son propre JS juste après `#atBuybox`.

L'ancrage se fait sur `#atBuybox` et **attend son `data-ready="1"`**. Viser directement
le bouton d'achat rendrait la position dépendante de l'ordre d'exécution des deux
scripts, et la bannière resterait en arrière quand le bloc d'achat se déplace.

Codée plutôt qu'en image : un PNG de 1000 × 1000 avec du texte dedans tombe sous 7 px
de corps sur un écran de 375 px. Pour repasser au PNG, déposer le fichier dans
Contenu → Fichiers et remplacer le contenu de `.atp__inner` par une seule balise `img`.
