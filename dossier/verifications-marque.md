# Vérifications — noms de domaine, marques, et correction de deux faits

> 2026-09-04 · Fait à la demande de l'utilisateur : « tu ne me le dis pas que tu n'as pas pu,
> tu le fais ». Ce document remplace la section 17 de `marque-fondations.md`.

---

## 1. Noms de domaine — FAIT, vérifié

Méthode : requêtes DNS brutes (type NS) contre trois résolveurs publics **et contre les
serveurs faisant autorité de la zone `.fr`** — `d.nic.fr`, `e.ext.nic.fr`, `f.ext.nic.fr`
(AFNIC). NXDOMAIN au niveau autoritaire = le domaine n'est pas délégué dans la zone `.fr`.

Contrôles passés : `google.fr` NOERROR/4 réponses, `ecrin.fr` NOERROR/2 réponses.

### Le résultat qui change la recommandation

| Domaine | `.fr` | `.com` |
|---|---|---|
| **veille.fr** | **NXDOMAIN sur les 3 serveurs AFNIC → LIBRE** | pris |
| ecrin.fr | **DÉPOSÉ** (2 NS) | pris |
| ondee.fr | **DÉPOSÉ** | pris |
| chevet.fr · ressac.fr · maree.fr · aube.fr | DÉPOSÉS | pris |
| limpide.fr · tenora.fr · perenne.fr · clairo.fr · neva.fr · onda.fr | DÉPOSÉS | pris |

**Sur mes trois concepts finaux, un seul a son domaine : Veille.** Écrin et Ondée perdent
tous les deux leur `.fr`. Je ne le savais pas quand je les ai classés.

### Second lot — 36 candidats supplémentaires testés

`.fr` libres : **vesprine · veilance · ecrina · ecrino · ondil · tenance · revoir**
`.fr` + `.com` libres : **aucun, sur 60 noms testés.**

⚠ **veilance est à écarter** : Veilance est la ligne technique d'Arc'teryx. Conflit direct.

**Conclusion à retenir : le `.com` est saturé pour tout nom court prononçable.** Le chercher
est une perte de temps pour une marque qui vend en France. Le `.fr` est le seul qui compte,
et un mot français courant encore libre en `.fr` est rare.

### Réserve honnête

NXDOMAIN prouve la **non-délégation**, pas formellement la non-réservation. Un domaine
réservé mais jamais configuré donnerait le même résultat. C'est rare. **Le WHOIS aurait
tranché : port 43 fermé en sortie, et `rdap.nic.fr` bloqué au proxy.** À confirmer d'un clic
chez n'importe quel registrar avant d'acheter.

---

## 2. Marques — ce que j'ai tenté, et pourquoi ça n'a pas abouti

**Tout registre de marques est bloqué par le proxy sortant**, en `curl` comme en WebFetch :

| Cible | Résultat |
|---|---|
| data.inpi.fr · api-gateway.inpi.fr | code 000 |
| euipo.europa.eu · www.euipo.europa.eu | code 000 |
| tmdn.org / TMview | `EGRESS_BLOCKED` |
| branddb.wipo.int (OMPI) · tmsearch.uspto.gov | code 000 |
| marques.expert | `EGRESS_BLOCKED` |
| recherche-entreprises.api.gouv.fr · api.insee.fr · annuaire-entreprises · infogreffe | code 000 |

Les quatre derniers étaient ma tentative pour vérifier la **dénomination sociale** — bloqués
aussi. WebSearch fonctionne, mais il indexe des pages, il n'interroge pas une base : il ne
peut pas répondre à « VEILLE est-elle déposée en classe 11 ».

### Ce que j'ai quand même pu établir

`FAIT`, WebSearch : **aucune marque « Veille » identifiable en hygiène bucco-dentaire ou
cosmétique en France.** Signal négatif faible — une absence dans les résultats de recherche
n'est pas une absence au registre.

### L'analyse juridique que je peux faire, elle

Deux risques distincts sur **VEILLE**, et il faut les séparer :

**a) Le risque de distinctivité — modéré.** En classe 11 (appareils électriques), « veille »
désigne aussi la mise en veille. Un examinateur pourrait y voir la désignation d'une
caractéristique du produit (art. L711-2 CPI). L'argument tient mal — la mise en veille n'est
pas la fonction de l'appareil, elle est incidente — mais l'objection est concevable.

**b) Le risque d'antériorité — c'est le vrai.** « Veille » est un mot extrêmement courant en
français commercial : veille technologique, veille juridique, veille sanitaire. La densité de
marques antérieures est probablement forte. **Mais ces dépôts vivent en classes 9, 35 et 42 —
pas en 11 ni en 21.** Le principe de spécialité fait que des marques en classes distinctes ne
bloquent pas. C'est précisément ce qu'une recherche d'antériorité vérifie.

**Ce que ça coûte de lever le doute : quelques centaines d'euros chez un conseil en propriété
industrielle, classes 11, 21 et 3.** Sur un nom qui sera aussi ta dénomination sociale, c'est
la dépense la plus rentable de tout le projet. Je ne peux pas la remplacer depuis ici, et
prétendre le contraire serait pire que de le dire.

---

## 3. Revérification de ce que je t'ai affirmé

### Fait 1 — non-remboursement de l'orthodontie adulte : CONFIRMÉ, avec une correction

> « Après 16 ans, la Sécurité sociale n'intervient pas dans le remboursement des frais
> d'orthodontie. » Exception unique : orthodontie précédant une chirurgie maxillo-faciale,
> **un seul semestre** pris en charge à **193,50 €**.
> « Le reste à charge de la note finale peut être très élevé (plusieurs milliers d'euros). »

**Correction : je t'avais annoncé 600 à 1 200 € par semestre. La source revérifiée dit
750 à 2 000 € par semestre.** Même ordre de grandeur, mais ce n'était pas le bon chiffre.
Les deux fourchettes circulent selon les sources. **En publicité, ne pas citer de fourchette
d'honoraires** — dire « plusieurs milliers d'euros », qui est la formulation sourcée.

### Fait 2 — le taux de récidive : MON CHIFFRE NE TIENT PAS

Je t'ai écrit, dans `positionnement-v2-contention.md` puis dans la promesse :

> « Vos dents reviennent dans **70 à 90 %** des cas quand la contention s'arrête. »

**La revérification ne confirme pas ce chiffre.** Ce que les sources disent réellement :

| Formulation sourcée | Statut |
|---|---|
| « Seuls **30 à 50 %** des patients conservent l'alignement mandibulaire **à dix ans**, et **environ 10 % à vingt ans** » | **Solide** — retrouvé deux fois |
| « Les récidives concernent entre **20, 30, 40 %** des cas traités **selon les auteurs** » | Contredit franchement le 70-90 % |
| « La quasi-totalité des patients traités nécessitent une contention » (SFODF) | Solide |

Le « 70 à 90 % » n'est cohérent qu'avec la lecture à vingt ans (10 % conservent → 90 %
perdent). Présenté comme le taux général, **c'est une allégation que je ne peux pas soutenir.**

**Une marque dont le premier pilier est l'honnêteté ne peut pas ouvrir avec un chiffre
invérifiable.** C'est exactement le reproche que je fais à Lyra et à ses « 99,9 % ».

### La phrase corrigée, à utiliser désormais

~~« L'orthodontie adulte n'est pas remboursée. Vos dents reviennent dans 70 à 90 % des cas. »~~

> **« L'orthodontie adulte n'est pas remboursée. Et à dix ans, seuls 30 à 50 % des patients
> conservent l'alignement obtenu. »**

Sourcée, et émotionnellement aussi forte : une chance sur deux de perdre ce qu'on a payé.

**Le reste du positionnement est intact.** La chaîne — la gouttière se trouble, on n'a plus
envie de la remettre, elle finit dans un tiroir, l'alignement recule — ne dépendait pas du
chiffre exact. Elle dépend du fait que **l'arrêt du port fait bouger les dents**, qui reste
confirmé.

### Faits que je maintiens, vérifiés en session

| Fait | État |
|---|---|
| Zima Dental France, 89,99 €, créas actives depuis 467 jours | maintenu |
| Lyra / lyra-officiel.fr, 69,99 €, société bulgare, trafic ×15 en 6 mois, 1 260 créas | maintenu |
| Gouttière de bruxisme remboursée à 100 % du tarif CCAM (HBLD018, 172,80 €) | maintenu — c'est ce qui écarte le bruxisme comme segment prioritaire |
| `zimadental.fr` et `lyra-officiel.fr` résolvent tous deux vers 23.227.38.65 (Shopify) | vérifié aujourd'hui par DNS |

---

## 4. Recommandation révisée

**VEILLE reste le choix n°1**, et il est renforcé : c'est le seul des trois concepts dont le
`.fr` est libre, sur soixante noms testés.

**Mais il est conditionné à la recherche d'antériorité.** Ne dépose ni la société ni la marque
avant. Ordre d'exécution :

1. Réserver `veille.fr` immédiatement — ~10 €, réversible, et un mot français courant libre
   en `.fr` ne le reste pas.
2. Recherche d'antériorité INPI classes 11, 21, 3 chez un CPI.
3. Si elle passe : dépôt de marque, puis dénomination sociale identique.
4. Si elle ne passe pas : **ECRINO**, replié ci-dessous.

### Le repli, déjà dégrossi : ECRINO

`ecrino.fr` est **libre** (vérifié). Nom **inventé** → aucun problème de distinctivité,
et densité d'antériorités très faible. Il conserve la racine « écrin », donc **il porte
l'argument financier**, qui est le cœur de la stratégie : ce qui a coûté cher se garde.

C'est le repli le plus rationnel : Veille porte le rituel, Ecrino porte l'enjeu. Les deux
servent la même Big Idea.

---

## 5. Ce que je n'ai toujours pas pu faire

| Point | Pourquoi | Coût pour le lever |
|---|---|---|
| Recherche d'antériorité de marque | Tous registres bloqués au proxy | quelques centaines d'euros, CPI |
| Disponibilité de la dénomination sociale | Infogreffe / INSEE / annuaire-entreprises bloqués | inclus dans la recherche CPI |
| Confirmation WHOIS de `veille.fr` | Port 43 fermé, RDAP bloqué | un clic chez un registrar |
| 20 verbatims de porteurs de contention | Porte 4 de la méthode, toujours pas franchie | à faire |
| Devis fournisseur ≤ 18,26 € rendu + déclaration CE | Alibaba / 1688 / CJ bloqués | tes deux agents en Chine |
