---
name: methode-ecommerce
description: Méthode complète de lancement e-commerce en 20 étapes et 6 portes — recherche produit, analyse de concurrence, fournisseur, avatar client, positionnement, branding, site, preuve, copywriting, offre irrésistible, tests publicitaires et scaling. Utilise ce skill dès qu'il s'agit de choisir un produit, valider une niche, analyser des concurrents, construire un avatar client, définir un positionnement, bâtir une offre, ou décider quoi faire ensuite sur une boutique. À déclencher AVANT tout travail de design, de code ou de copy : la méthode dit dans quel ordre travailler et à quel moment s'arrêter.
---

Tu ne construis pas une boutique. Tu construis une **machine commerciale rentable**, et tu
la construis dans un ordre précis. L'ordre est ce qui a de la valeur ici — pas les
conseils, qui sont partout.

## Pourquoi un ordre, et pourquoi des portes

L'échec typique en dropshipping n'est pas un mauvais site. C'est **un site parfait pour un
produit qui ne pouvait pas être rentable**. Le travail a été fait dans le désordre : design
avant économie, publicité avant avatar, offre avant concurrence.

Chaque étape ci-dessous coûte du temps. Les portes existent pour arrêter la dépense **avant**
qu'elle ne soit engagée. Une porte fermée n'est pas un échec : c'est une semaine sauvée.

**Règle dure : on ne franchit pas une porte fermée en promettant de revenir plus tard.**
On revient au produit, ou on change de produit.

## Le process — 20 étapes, 6 portes

| # | Étape | Référence |
|---|---|---|
| 1 | Trouver une douleur aiguë et récurrente | `references/01-produit.md` |
| 2 | Identifier une cible identitaire précise | `references/01-produit.md` |
| 3 | Trouver un produit simple à forte valeur perçue | `references/01-produit.md` |
| 4 | Vérifier que l'économie est saine | `references/01-produit.md` + `scripts/economie.py` |
| | **PORTE 1 — le produit mérite-t-il qu'on y travaille ?** | |
| 5 | Identifier les concurrents | `references/02-concurrence.md` |
| 6 | Mesurer leur trafic et leurs publicités | `references/02-concurrence.md` |
| 7 | Extraire les angles marketing et trouver les places libres | `references/02-concurrence.md` |
| | **PORTE 2 — le marché est-il vivant ET attaquable ?** | |
| 8 | Trouver un fournisseur fiable | `references/03-fournisseur.md` |
| | **PORTE 3 — la chaîne d'approvisionnement tient-elle ?** | |
| 9 | Étudier le client en profondeur | `references/04-avatar.md` |
| 10 | Construire l'avatar client | `references/04-avatar.md` |
| 11 | Trouver un positionnement différent | `references/05-positionnement.md` |
| | **PORTE 4 — connaît-on le client mieux que les concurrents ?** | |
| 12 | Construire le branding | `references/05-positionnement.md` + skill `direction-artistique` |
| 13 | Écrire la proposition de valeur | `references/06-site-offre-copy.md` |
| 14 | Construire le site autour de la confiance | `references/06-site-offre-copy.md` + skill `mobile-ecommerce` |
| 15 | Ajouter la preuve | `references/06-site-offre-copy.md` |
| 16 | Travailler le copywriting | `references/06-site-offre-copy.md` |
| 17 | Construire une offre irrésistible | `references/07-offre.md` |
| | **PORTE 5 — le site répond-il aux 11 questions d'achat ?** | |
| 18 | Créer et tester plusieurs angles publicitaires | `references/08-test-scale.md` |
| 19 | Analyser les résultats | `references/08-test-scale.md` |
| 20 | Améliorer ce qui marche, puis scaler | `references/08-test-scale.md` |

## Les 6 portes — critères de passage

Une porte se franchit sur des **critères écrits**, pas sur une impression. Écris la décision
dans le dossier produit (`templates/dossier-produit.md`), avec la date et les données qui
l'ont motivée.

### Porte 1 — Produit

Les quatre doivent être vrais. Un seul manquant = NO-GO.

- [ ] La douleur est **aiguë** (elle gêne vraiment) **et récurrente** (elle revient).
- [ ] La cible est **identitaire** : quelqu'un peut se dire « c'est exactement moi ».
- [ ] L'économie tient : **×4 minimum** sur le coût débarqué, **prix de vente ≥ 40 €**
      (ou panier moyen ≥ 40 € via bundle), marge de contribution positive au CPA réaliste
      du marché. Chiffré avec `scripts/economie.py`, jamais à l'estime.
- [ ] Le bénéfice se comprend **en moins de 3 secondes** sur une vidéo muette.

### Porte 2 — Marché

- [ ] Au moins **2 concurrents** avec un trafic significatif et **stable ou en hausse** sur
      3 mois. Zéro concurrent n'est pas une opportunité, c'est le plus souvent une absence
      de demande.
- [ ] Au moins un concurrent diffuse la **même publicité depuis plus de 30 jours** — un
      annonceur ne paie pas 30 jours pour une publicité qui perd de l'argent. C'est le seul
      signal de rentabilité observable de l'extérieur.
- [ ] Il reste **au moins un angle marketing crédible** que personne n'occupe correctement.
      Si les 10 angles sont tenus par des marques mieux financées, le marché est fermé.

### Porte 3 — Fournisseur

- [ ] Délai de livraison réel connu et **annonçable sans mentir**.
- [ ] Échantillon commandé ou qualité vérifiable autrement.
- [ ] Suivi de colis fourni.
- [ ] Capacité à absorber une montée en charge (100 → 1 000 commandes).

### Porte 4 — Client & positionnement

- [ ] **20 verbatims clients réels minimum**, collectés (avis, commentaires, groupes), avec
      leur source.
- [ ] **5 objections** identifiées dans les mots du client, pas dans les tiens.
- [ ] Le positionnement s'énonce en **une phrase** qui ne marche pour aucun concurrent.

### Porte 5 — Site

- [ ] Les **11 questions d'achat** (`references/06-site-offre-copy.md`) ont chacune une
      réponse visible sur la fiche produit.
- [ ] Les pages légales existent (marché France : CGV, mentions légales, confidentialité,
      rétractation, livraison, contact).
- [ ] L'offre est compréhensible en une lecture, et honnête.
- [ ] Testé sur **mobile réel** ou banc de rendu (`tools/rendu/`), pas seulement imaginé.

### Porte 6 — Test

- [ ] Une hypothèse écrite, **une seule variable** par test.
- [ ] Un budget et une durée décidés **avant** de lancer.
- [ ] Un seuil de décision écrit **avant** de voir les résultats.

## Comment travailler avec cette méthode

### 1. Un dossier par produit candidat

Copie `templates/dossier-produit.md` vers `dossier/<produit>.md` et remplis-le au fil des
étapes. C'est le seul endroit où vivent les données. Un raisonnement qui n'est pas dans le
dossier n'existe pas : il sera refait dans deux semaines.

### 2. Étiqueter chaque affirmation

Sans étiquette, une estimation devient une donnée en trois relectures. Donc :

| Étiquette | Sens |
|---|---|
| `FAIT` | Sorti d'un outil ou d'une source, avec la source citée |
| `ESTIMATION` | Calculé par toi à partir de faits — montre le calcul |
| `HYPOTHÈSE` | Non vérifié, à tester |
| `[À CONFIRMER]` | Manquant, et bloquant tant que ça manque |

Ne jamais présenter une `ESTIMATION` comme un `FAIT`. Ne jamais inventer un chiffre de
trafic, de marge, de délai ou de CPA pour compléter un tableau.

### 3. Vérifier après avoir agi

Règle du repo : **un « c'est fait » n'est pas une preuve.** Après toute modification, relire
l'état réel (fichier écrit, `updatedAt` du thème, sortie du script). Après tout calcul,
refaire le calcul avec le script plutôt que de tête.

### 4. Déléguer les phases lourdes

| Phase | Agent |
|---|---|
| Étapes 1-4 | `recherche-produit` |
| Étapes 5-7 | `analyse-concurrence` |
| Étapes 9-10 | `avatar-client` |
| Étape 17 | `offre-irresistible` |
| Étapes 12-14 | `designer-boutique`, `theme-shopify` |
| Étapes 13-16 | `fiche-produit` |
| Étape 18 | `creas-ads` |
| Contrôle porte 5 | `audit-boutique` |

Les agents rendent des données et des propositions. **Les portes, c'est toi qui les
franchis** — et tu revérifies leurs chiffres avant de les inscrire au dossier.

## Ce que la méthode interdit

Ces interdits ne sont pas moraux, ils sont économiques : chacun coûte plus cher qu'il ne
rapporte.

- **Travailler le design avant la porte 1.** Un beau site sur une économie négative perd de
  l'argent plus vite.
- **Lancer des publicités avant la porte 4.** Sans avatar, le créatif est un pari.
- **Scaler une machine déficitaire** parce que le chiffre d'affaires monte.
- **Fausses preuves** : faux avis, faux compteurs, fausse rareté, prix barré fictif, délai
  de livraison optimiste. Ça convertit à court terme, puis ça produit des litiges, des
  remboursements et un compte publicitaire fermé.
- **Modifier 15 choses puis se demander ce qui a marché.**
