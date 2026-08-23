---
name: visuels-produit
description: Produire et normaliser les visuels d'une fiche produit e-commerce — nettoyage des images fournisseur, ratio et résolution, ordre des images, textes alternatifs, scènes d'ambiance générées, droits d'usage. Utilise ce skill dès qu'il est question de photos produit, images, visuels, galerie, mockup, détourage, fond blanc, watermark, image floue, « mes photos font cheap », ou quand on monte une fiche produit et qu'il faut décider quelles images mettre et dans quel ordre.
---

Tu produis les visuels d'une fiche produit. C'est le premier signal que lit un visiteur,
avant le prix et avant le texte, et c'est le marqueur numéro un du site de dropshipping :
des images fournisseur brutes, de tailles différentes, avec un filigrane et du texte
incrusté.

Charge `direction-artistique` si l'identité visuelle n'est pas encore fixée — les visuels
en découlent, ils ne la précèdent pas.

## Ce qui trahit une boutique, dans l'ordre où ça se voit

1. **Des ratios différents d'une image à l'autre.** La galerie saute en hauteur à chaque
   glissement. C'est le défaut le plus visible et le plus facile à corriger.
2. **Un filigrane**, un logo de fournisseur, du texte dans une autre langue.
3. **Du texte incrusté dans l'image.** Un visuel de 1000 px avec une accroche dedans
   tombe sous 7 px de corps sur un écran de 375 px. Le texte se code en HTML, il ne se
   dessine pas dans un PNG.
4. **Des fonds et des lumières incohérents** : une image sur fond blanc surexposé, la
   suivante sur une plage, la troisième sur un parquet.
5. **Une image trop petite** qui devient floue au zoom. En dessous de 1000 px sur le
   grand côté, le zoom mobile est inutilisable.

## Les décisions à prendre une fois, et à tenir partout

**Un seul ratio.** Carré `1:1` ou portrait `4:5`. Le portrait occupe plus de hauteur
d'écran sur mobile, donc il vend mieux, mais il coupe la ligne de flottaison plus vite —
arbitrer selon ce qui doit rester visible au-dessus. Une fois choisi, **toutes** les
images du produit s'y conforment, sans exception.

**Une résolution généreuse.** Viser 1600 à 2000 px sur le grand côté. Ne pas compresser à
la main : Shopify redimensionne et sert du WebP automatiquement selon l'écran. Envoyer une
image déjà compressée ne fait qu'ajouter des artefacts à ceux du CDN.

**Un fond et une lumière constants.** Si les visuels viennent de sources différentes, le
travail utile n'est pas d'ajouter des effets, c'est de les **uniformiser** : même fond,
même température, même échelle du produit dans le cadre.

## L'ordre des images

L'ordre est une décision de vente, pas de rangement. Chaque image répond à une question
que le visiteur se pose, dans l'ordre où il se la pose.

| Rang | Image | Question à laquelle elle répond |
|---|---|---|
| 1 | Produit seul, fond neutre, cadrage large | c'est quoi, exactement ? |
| 2 | En situation réelle d'usage | ça sert à quoi, pour qui ? |
| 3 | Détail de matière ou de finition | c'est de la camelote ou pas ? |
| 4 | Échelle — le produit tenu, porté, ou à côté d'un objet connu | c'est quelle taille ? |
| 5 | Ce qu'on reçoit dans le colis | qu'est-ce que je reçois vraiment ? |

La première image est la seule que verront beaucoup de visiteurs. Elle ne se choisit pas
parce qu'elle est jolie, mais parce qu'elle rend le produit **identifiable en un quart de
seconde sur une vignette**.

## Les textes alternatifs

Chaque image porte un `alt` qui décrit la scène, pas une liste de mots-clés. Une image
purement décorative prend un `alt` vide (`alt=""`), jamais un `alt` absent — l'absence
fait lire le nom du fichier par le lecteur d'écran.

## Générer plutôt que photographier

Les outils disponibles ici couvrent deux besoins bien distincts, et il ne faut pas les
confondre :

- **Les scènes d'ambiance, les fonds, les textures** — génération assumée. Une plage, un
  plan d'eau, un plan de travail : personne ne prétend que c'est une photo du produit.
- **Le produit lui-même** — jamais généré. L'image doit correspondre à ce qui arrive dans
  le colis. Un produit embelli par génération est une pratique trompeuse, et se paie en
  litiges et en demandes de remboursement dès la première livraison.

Le mockup fait exception quand il est honnête : présenter un produit réel dans un cadre
propre est légitime, inventer une finition qu'il n'a pas ne l'est pas.

## Droits d'usage — le point qu'on saute

Les visuels d'une fiche AliExpress **ne sont pas libres de droits**. Les reprendre est un
risque réel, en plus d'être le marqueur qui rend une boutique interchangeable avec cent
autres. Trois sorties propres :

1. Demander au fournisseur l'autorisation écrite et ses fichiers sources — souvent
   accordé, rarement demandé.
2. Commander un échantillon et photographier soi-même. C'est aussi la seule façon de
   vérifier ce qu'on vend.
3. Produire des visuels d'ambiance et des mises en scène originales autour du produit.

Ne jamais reprendre les visuels d'une **marque** concurrente : là ce n'est plus une zone
grise, c'est de la contrefaçon.

## Vérifier avant de livrer

Une galerie se juge à l'écran, pas dans un dossier. Passer la fiche au banc de rendu
(`tools/rendu/`) pour contrôler à 320, 375, 414 et 1280 px :

- la galerie ne saute pas en hauteur d'une image à l'autre,
- rien n'est rogné,
- la première image et le prix tiennent au-dessus de la ligne de flottaison,
- aucun texte incrusté ne descend sous 16 px de rendu.

Charger `mobile-ecommerce` pour les seuils exacts.
