# AquaTerra — contexte projet

Repo de travail pour la boutique Shopify **AquaTerra** (dropshipping, marché France).

## Boutique

| | |
|---|---|
| Nom | AquaTerra |
| Domaine | `kznquq-5a.myshopify.com` |
| Plan | Basic |
| Devise / marché | EUR / France |

Produit principal : **Chaussures Amphibies AquaTerra** — 39,99 €, 16 variantes.
Options : `Couleur` (Noir, Bleu) en position 1, `Pointure` (37 → 44) en position 2.

## Thème

Base **Shrine** (thème payant dérivé de Dawn). Convention maison : une version par
chantier, créée par duplication — `AquaTerra v3` → `v4` → … → `v8`. Le thème publié
porte le rôle `MAIN`.

Réglage utile : le sélecteur de variantes est piloté par **`picker_types`** sur le bloc
sélecteur — une valeur par option, séparées par des virgules. Valeurs acceptées :
`pills`, `dropdown`, `swatches`, `quantity-breaks`, `hidden`. Champ vide = `pills,pills,pills`.

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

Contrastes à retenir : encre sur turquoise `#00C2A8` = **6,7:1** (du blanc n'y serait
qu'à 2,5:1, d'où le libellé foncé). Blanc sur mer profonde = 9,9:1. Blanc sur lagon
= 4,7:1, juste au-dessus du seuil. Gris de mer sur écume = 5,1:1.

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

**Skills maison** (écrits pour ce projet) :

| Skill | Rôle |
|---|---|
| `direction-artistique` | Imposer une direction artistique distinctive. Contient la liste noire des clichés dropshipping et un menu de 8 directions. À déclencher **avant** tout code. |
| `shopify-sections` | Coder des sections Liquid sur mesure. Contient un modèle de section validé dans `assets/section-modele.liquid`. |
| `mobile-ecommerce` | Rendre la boutique vendeuse sur mobile : ligne de flottaison, cibles de 44 px, seuil des 16 px, poids et décalage des images. |
| `composants-ui` | Générer un composant d'interface complet à partir d'une description, dans le bon langage cible et avec les jetons du projet. Équivalent local d'un générateur de composants en ligne. |

Ces deux-là comblent le trou laissé par les autres : `ui-ux-pro-max` est une base de
données de styles, `shopify-store-builder` couvre la structure et la copy, mais rien ne
traitait du **parti pris visuel** ni du **code de mise en page sur mesure**.

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
