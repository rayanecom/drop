#!/usr/bin/env python3
"""Calculateur d'économie unitaire pour un produit e-commerce (marché France).

Sort la marge de contribution, le CPA d'équilibre et le ROAS d'équilibre — les trois
nombres qui décident si un produit peut être rentable. Aucune dépendance externe.

Exemple :
    python3 economie.py --prix-ttc 39.99 --cout-produit 6.50 --livraison 3.20

Comparer trois prix :
    python3 economie.py --prix-ttc 39.99 --cout-produit 6.50 --livraison 3.20 \
        --scenarios 29.99,39.99,49.99

Auto-test :
    python3 economie.py --test
"""

import argparse
import sys
from dataclasses import dataclass


@dataclass
class Hypotheses:
    """Tous les montants sont en euros, tous les taux en pourcentage."""

    prix_ttc: float
    cout_produit: float
    livraison: float = 0.0
    tva: float = 20.0
    frais_paiement_pct: float = 1.4
    frais_paiement_fixe: float = 0.25
    apps_par_commande: float = 0.0
    sav_par_commande: float = 0.0
    taux_retour: float = 0.0
    cout_retour: float = 0.0
    quantite: int = 1
    droits_douane: float = 0.0
    regime: str = "reel"          # "reel" (TVA déductible) ou "franchise"
    multiple_cible: float = 4.0


@dataclass
class Resultat:
    ca_net: float
    cout_marchandise: float
    fret: float
    droits: float
    tva_import: float
    cout_achat_debarque: float
    frais_paiement: float
    couts_variables: float
    mc_commande_reussie: float
    perte_commande_remboursee: float
    marge_contribution: float
    marge_contribution_pct: float
    multiple_ttc: float
    multiple_net: float
    cpa_equilibre: float
    roas_equilibre: float
    achat_max_ttc: float
    achat_max_net: float
    achat_max_benefice: float
    fournisseur_max_ttc: float
    fournisseur_max_net: float
    fournisseur_max_benefice: float


def calculer(h: Hypotheses) -> Resultat:
    if h.prix_ttc <= 0:
        raise ValueError("Le prix TTC doit être strictement positif.")
    if h.quantite < 1:
        raise ValueError("La quantité doit valoir au moins 1.")
    if not 0 <= h.taux_retour <= 100:
        raise ValueError("Le taux de retour est un pourcentage entre 0 et 100.")
    if h.tva < 0 or h.droits_douane < 0:
        raise ValueError("Les taux de TVA et de douane ne peuvent pas être négatifs.")
    if h.regime not in ("reel", "franchise"):
        raise ValueError("Le régime vaut 'reel' ou 'franchise'.")
    if h.multiple_cible <= 0:
        raise ValueError("Le multiple cible doit être strictement positif.")

    assujetti = h.regime == "reel"

    # Au régime réel, la TVA collectée sur la vente est reversée à l'État : elle
    # n'appartient pas à l'entreprise. En franchise en base, elle n'est pas facturée,
    # donc tout le prix encaissé reste.
    ca_net = h.prix_ttc / (1 + h.tva / 100) if assujetti else h.prix_ttc

    # Le coût marchandise suit la quantité ; un bundle part dans un seul colis,
    # donc le fret ne se multiplie pas.
    cout_marchandise = h.cout_produit * h.quantite
    fret = h.livraison

    # Les droits de douane portent sur la valeur en douane : marchandise + fret.
    base_douane = cout_marchandise + fret
    droits = base_douane * h.droits_douane / 100

    # La TVA à l'import porte sur la valeur en douane majorée des droits. Au régime
    # réel elle est déductible : ce n'est pas un coût, seulement une avance de
    # trésorerie. En franchise en base elle ne se récupère pas : c'est un coût sec.
    tva_import_brute = (base_douane + droits) * h.tva / 100
    tva_import = 0.0 if assujetti else tva_import_brute

    cout_achat_debarque = base_douane + droits + tva_import

    # Les frais du prestataire de paiement portent sur le montant TTC encaissé.
    frais_paiement = h.prix_ttc * h.frais_paiement_pct / 100 + h.frais_paiement_fixe
    autres_frais = frais_paiement + h.apps_par_commande + h.sav_par_commande

    couts_variables = cout_achat_debarque + autres_frais

    mc_ok = ca_net - couts_variables

    # Sur une commande remboursée, le chiffre d'affaires repart mais les coûts restent.
    # En dropshipping le produit n'est en général pas récupéré : il est perdu.
    perte_remboursee = couts_variables + h.cout_retour

    r = h.taux_retour / 100
    marge_contribution = (1 - r) * mc_ok - r * perte_remboursee

    inf = float("inf")
    multiple_ttc = h.prix_ttc / cout_achat_debarque if cout_achat_debarque > 0 else inf
    multiple_net = ca_net / cout_achat_debarque if cout_achat_debarque > 0 else inf

    # Le gestionnaire de publicités compte la valeur de conversion au moment de l'achat,
    # donc avant remboursement : le ROAS d'équilibre se calcule sur le prix TTC brut.
    roas_eq = h.prix_ttc / marge_contribution if marge_contribution > 0 else inf

    # --- Objectifs de sourcing : quel coût d'achat débarqué maximum viser ---
    c = h.multiple_cible
    achat_max_ttc = h.prix_ttc / c
    achat_max_net = ca_net / c
    # « bénéfice × N » au sens littéral : ce qui reste après TOUS les coûts variables
    # doit valoir N fois le coût d'achat. Donc ca_net - achat - autres = N × achat.
    achat_max_benefice = max((ca_net - autres_frais) / (1 + c), 0.0)

    # Remonter du coût débarqué au prix négociable chez le fournisseur, fret compris,
    # avant droits de douane et avant TVA à l'import.
    coef = (1 + h.droits_douane / 100) * (1 + (0 if assujetti else h.tva / 100))

    return Resultat(
        ca_net=ca_net,
        cout_marchandise=cout_marchandise,
        fret=fret,
        droits=droits,
        tva_import=tva_import,
        cout_achat_debarque=cout_achat_debarque,
        frais_paiement=frais_paiement,
        couts_variables=couts_variables,
        mc_commande_reussie=mc_ok,
        perte_commande_remboursee=perte_remboursee,
        marge_contribution=marge_contribution,
        marge_contribution_pct=marge_contribution / ca_net * 100 if ca_net else 0.0,
        multiple_ttc=multiple_ttc,
        multiple_net=multiple_net,
        cpa_equilibre=marge_contribution,
        roas_equilibre=roas_eq,
        achat_max_ttc=achat_max_ttc,
        achat_max_net=achat_max_net,
        achat_max_benefice=achat_max_benefice,
        fournisseur_max_ttc=achat_max_ttc / coef,
        fournisseur_max_net=achat_max_net / coef,
        fournisseur_max_benefice=achat_max_benefice / coef,
    )


def euro(x: float) -> str:
    return f"{x:,.2f}".replace(",", " ").replace(".", ",") + " €"


def nb(x: float, dec: int = 2) -> str:
    """Nombre au format français : séparateur décimal virgule."""
    return f"{x:.{dec}f}".replace(".", ",")


def afficher(h: Hypotheses, r: Resultat) -> None:
    q = f" × {h.quantite}" if h.quantite > 1 else ""
    regime = ("régime réel — TVA collectée reversée, TVA à l'import déductible"
              if h.regime == "reel"
              else "franchise en base — pas de TVA sur les ventes, "
                   "TVA à l'import NON déductible")
    print()
    print(f"  PRIX DE VENTE {euro(h.prix_ttc)}{q}")
    print(f"  {regime}")
    print()
    print("  COÛT D'ACHAT DÉBARQUÉ")
    print("  " + "─" * 54)
    for libelle, montant in (
        ("Fournisseur", r.cout_marchandise),
        ("Fret", r.fret),
        (f"Droits de douane ({h.droits_douane:g} %)", r.droits),
        (f"TVA à l'import ({h.tva:g} %, non déductible)", r.tva_import),
    ):
        if montant:
            print(f"  {libelle:<38}{euro(montant):>16}")
    print(f"  {'= COÛT D_ACHAT DÉBARQUÉ':<38}{euro(r.cout_achat_debarque):>16}"
          .replace("D_ACHAT", "D'ACHAT"))
    print()
    print("  COMPTE D'EXPLOITATION PAR COMMANDE")
    print("  " + "─" * 54)
    print(f"  {'Chiffre d_affaires net':<38}{euro(r.ca_net):>16}"
          .replace("d_affaires", "d'affaires"))
    for libelle, montant in (
        ("Coût d'achat débarqué", -r.cout_achat_debarque),
        ("Frais de paiement", -r.frais_paiement),
        ("Applications", -h.apps_par_commande),
        ("SAV", -h.sav_par_commande),
    ):
        if montant:
            print(f"  {libelle:<38}{euro(montant):>16}")
    if h.taux_retour:
        cout_r = r.marge_contribution - r.mc_commande_reussie
        print(f"  {'Provision retours (' + f'{h.taux_retour:g}' + ' %)':<38}"
              f"{euro(cout_r):>16}")
    print("  " + "─" * 54)
    print(f"  {'MARGE DE CONTRIBUTION':<38}{euro(r.marge_contribution):>16}")
    print(f"  {'soit, du CA net':<38}{nb(r.marge_contribution_pct, 1):>14} %")
    print()

    c = h.multiple_cible
    print(f"  MULTIPLE RÉEL SUR LE COÛT D'ACHAT DÉBARQUÉ")
    print("  " + "─" * 54)
    for libelle, valeur in (
        ("Sur le prix affiché (TTC)", r.multiple_ttc),
        ("Sur ce qui te revient (CA net)", r.multiple_net),
    ):
        if valeur >= c:
            etat = "OK"
        elif round(valeur, 2) >= c:
            # L'arrondi afficherait la cible alors qu'on est dessous : le dire.
            etat = f"tout juste SOUS ×{c:g}"
        else:
            etat = f"sous la cible de ×{c:g}"
        print(f"  {libelle:<38}{'×' + nb(valeur):>10}   {etat}")
    print()

    print(f"  OBJECTIF DE SOURCING POUR ATTEINDRE ×{c:g}")
    print("  " + "─" * 54)
    print(f"  {'Lecture':<30}{'coût débarqué':>16}{'chez le fournisseur':>21}")
    for libelle, debarque, fournisseur in (
        (f"×{c:g} sur le prix TTC", r.achat_max_ttc, r.fournisseur_max_ttc),
        (f"×{c:g} sur le CA net", r.achat_max_net, r.fournisseur_max_net),
        (f"bénéfice = {c:g} × le coût", r.achat_max_benefice, r.fournisseur_max_benefice),
    ):
        print(f"  {libelle:<30}{euro(debarque):>16}{euro(fournisseur):>21}")
    print("  Colonne de droite : ce qu'il faut négocier fournisseur + fret compris,")
    print("  avant droits de douane et avant TVA à l'import.")
    print()

    if r.marge_contribution <= 0:
        print("  MARGE DE CONTRIBUTION NÉGATIVE — ce produit perd de l'argent")
        print("  avant même d'avoir dépensé un euro de publicité. NO-GO.")
        return

    print("  ACQUISITION")
    print("  " + "─" * 54)
    print(f"  {'CPA d_équilibre':<38}{euro(r.cpa_equilibre):>16}"
          .replace("d_équilibre", "d'équilibre"))
    print(f"  {'ROAS d_équilibre':<38}{nb(r.roas_equilibre):>14}"
          .replace("d_équilibre", "d'équilibre"))
    print()
    print("  Profit par commande selon le CPA réel")
    print("  " + "─" * 54)
    for part in (0.4, 0.6, 0.8, 1.0, 1.2):
        cpa = r.cpa_equilibre * part
        profit = r.marge_contribution - cpa
        roas = h.prix_ttc / cpa if cpa else float("inf")
        etat = "profit" if profit > 0 else ("équilibre" if abs(profit) < 0.005 else "PERTE")
        print(f"  CPA {euro(cpa):>10}  (ROAS {nb(roas):>5})   {euro(profit):>10}   {etat}")
    print()


def afficher_scenarios(h: Hypotheses, prix_list: list) -> None:
    print()
    print(f"  {'Prix TTC':>10} {'×TTC':>7} {'×net':>7} {'Marge contrib.':>15} "
          f"{'CPA équil.':>12} {'ROAS':>7}")
    print("  " + "─" * 62)
    for p in prix_list:
        hp = Hypotheses(**{**h.__dict__, "prix_ttc": p})
        rp = calculer(hp)
        roas = nb(rp.roas_equilibre) if rp.marge_contribution > 0 else "—"
        print(f"  {euro(p):>10} {'×' + nb(rp.multiple_ttc):>7} "
              f"{'×' + nb(rp.multiple_net):>7} "
              f"{euro(rp.marge_contribution):>15} {euro(rp.cpa_equilibre):>12} {roas:>7}")
    print()
    print("  Un prix plus élevé améliore toujours ces colonnes. Il dégrade le taux de")
    print("  conversion, que ce tableau ne connaît pas. Arbitrer avec un test réel.")
    print()


def auto_test() -> int:
    echecs = []

    def verifier(nom, obtenu, attendu, tol=0.01):
        if abs(obtenu - attendu) > tol:
            echecs.append(f"{nom}: obtenu {obtenu:.4f}, attendu {attendu:.4f}")

    # Cas 1 — sans frais annexes ni retours, la chaîne se vérifie à la main.
    h = Hypotheses(prix_ttc=120.0, cout_produit=10.0, livraison=5.0, tva=20.0,
                   frais_paiement_pct=0.0, frais_paiement_fixe=0.0)
    r = calculer(h)
    verifier("ca_net", r.ca_net, 100.0)
    verifier("marge_contribution", r.marge_contribution, 85.0)
    verifier("cpa_equilibre", r.cpa_equilibre, 85.0)
    verifier("roas_equilibre", r.roas_equilibre, 120.0 / 85.0)
    verifier("multiple", r.multiple_ttc, 8.0)

    # Cas 2 — les frais de paiement portent sur le TTC, pas sur le CA net.
    h = Hypotheses(prix_ttc=100.0, cout_produit=0.0, livraison=0.0, tva=0.0,
                   frais_paiement_pct=2.0, frais_paiement_fixe=0.30)
    r = calculer(h)
    verifier("frais_paiement", r.frais_paiement, 2.30)
    verifier("mc_sans_tva", r.marge_contribution, 97.70)

    # Cas 3 — un taux de retour de 100 % ne laisse que des pertes.
    h = Hypotheses(prix_ttc=50.0, cout_produit=10.0, livraison=5.0, tva=20.0,
                   frais_paiement_pct=0.0, frais_paiement_fixe=0.0, taux_retour=100.0)
    r = calculer(h)
    verifier("mc_retour_total", r.marge_contribution, -15.0)

    # Cas 4 — 50 % de retours = moyenne exacte des deux issues.
    h = Hypotheses(prix_ttc=50.0, cout_produit=10.0, livraison=5.0, tva=20.0,
                   frais_paiement_pct=0.0, frais_paiement_fixe=0.0, taux_retour=50.0)
    r = calculer(h)
    attendu = 0.5 * (50 / 1.2 - 15.0) + 0.5 * (-15.0)
    verifier("mc_retour_moitie", r.marge_contribution, attendu)

    # Cas 5 — la quantité multiplie la marchandise, pas la livraison.
    h = Hypotheses(prix_ttc=60.0, cout_produit=10.0, livraison=5.0, tva=0.0,
                   frais_paiement_pct=0.0, frais_paiement_fixe=0.0, quantite=3)
    r = calculer(h)
    verifier("cout_marchandise_bundle", r.cout_marchandise, 30.0)
    verifier("mc_bundle", r.marge_contribution, 25.0)

    # Cas 6 — marge négative : le ROAS d'équilibre n'existe pas.
    h = Hypotheses(prix_ttc=10.0, cout_produit=20.0, livraison=5.0)
    r = calculer(h)
    if r.marge_contribution >= 0:
        echecs.append("marge_negative: la marge devrait être négative")
    if r.roas_equilibre != float("inf"):
        echecs.append("roas_negatif: devrait valoir l'infini")

    # Cas 7 — les entrées aberrantes sont rejetées.
    for mauvais in (
        {"prix_ttc": 0.0, "cout_produit": 1.0},
        {"prix_ttc": 10.0, "cout_produit": 1.0, "quantite": 0},
        {"prix_ttc": 10.0, "cout_produit": 1.0, "taux_retour": 150.0},
    ):
        try:
            calculer(Hypotheses(**mauvais))
            echecs.append(f"validation: {mauvais} aurait dû lever une erreur")
        except ValueError:
            pass

    # Cas 8 — droits de douane : ils portent sur marchandise + fret.
    h = Hypotheses(prix_ttc=100.0, cout_produit=10.0, livraison=5.0, tva=0.0,
                   droits_douane=10.0, frais_paiement_pct=0.0, frais_paiement_fixe=0.0)
    r = calculer(h)
    verifier("droits", r.droits, 1.50)
    verifier("debarque_avec_droits", r.cout_achat_debarque, 16.50)

    # Cas 9 — régime réel : la TVA à l'import est déductible, donc hors coût.
    h = Hypotheses(prix_ttc=120.0, cout_produit=10.0, livraison=5.0, tva=20.0,
                   regime="reel", frais_paiement_pct=0.0, frais_paiement_fixe=0.0)
    r = calculer(h)
    verifier("tva_import_reel", r.tva_import, 0.0)
    verifier("debarque_reel", r.cout_achat_debarque, 15.0)
    verifier("ca_net_reel", r.ca_net, 100.0)
    verifier("multiple_ttc_reel", r.multiple_ttc, 8.0)
    verifier("multiple_net_reel", r.multiple_net, 100.0 / 15.0)

    # Cas 10 — franchise en base : pas de TVA collectée, TVA import à la charge.
    h = Hypotheses(prix_ttc=120.0, cout_produit=10.0, livraison=5.0, tva=20.0,
                   regime="franchise", frais_paiement_pct=0.0, frais_paiement_fixe=0.0)
    r = calculer(h)
    verifier("tva_import_franchise", r.tva_import, 3.0)
    verifier("debarque_franchise", r.cout_achat_debarque, 18.0)
    verifier("ca_net_franchise", r.ca_net, 120.0)
    verifier("mc_franchise", r.marge_contribution, 102.0)

    # Cas 11 — cohérence des objectifs de sourcing : en s'approvisionnant au coût
    # maximum annoncé, on doit retomber exactement sur le multiple cible.
    for regime in ("reel", "franchise"):
        for douane in (0.0, 8.0):
            base = Hypotheses(prix_ttc=59.90, cout_produit=0.0, livraison=0.0,
                              tva=20.0, droits_douane=douane, regime=regime,
                              apps_par_commande=0.30, sav_par_commande=0.40,
                              multiple_cible=4.0)
            ref = calculer(base)
            # ×4 sur le TTC
            h2 = Hypotheses(**{**base.__dict__, "cout_produit": ref.fournisseur_max_ttc})
            verifier(f"sourcing_ttc_{regime}_{douane:g}", calculer(h2).multiple_ttc, 4.0)
            # ×4 sur le CA net
            h3 = Hypotheses(**{**base.__dict__, "cout_produit": ref.fournisseur_max_net})
            verifier(f"sourcing_net_{regime}_{douane:g}", calculer(h3).multiple_net, 4.0)
            # bénéfice = 4 × le coût d'achat
            h4 = Hypotheses(**{**base.__dict__,
                               "cout_produit": ref.fournisseur_max_benefice})
            r4 = calculer(h4)
            verifier(f"sourcing_benef_{regime}_{douane:g}",
                     r4.marge_contribution, 4.0 * r4.cout_achat_debarque)

    # Cas 12 — un régime ou un multiple invalide est rejeté.
    for mauvais in (
        {"prix_ttc": 10.0, "cout_produit": 1.0, "regime": "micro"},
        {"prix_ttc": 10.0, "cout_produit": 1.0, "multiple_cible": 0.0},
        {"prix_ttc": 10.0, "cout_produit": 1.0, "droits_douane": -5.0},
    ):
        try:
            calculer(Hypotheses(**mauvais))
            echecs.append(f"validation: {mauvais} aurait dû lever une erreur")
        except ValueError:
            pass

    if echecs:
        print("ÉCHECS :")
        for e in echecs:
            print("  -", e)
        return 1
    print("Auto-test : 12 cas, tous conformes.")
    return 0


def main() -> int:
    p = argparse.ArgumentParser(
        description="Économie unitaire d'un produit e-commerce (France).",
        formatter_class=argparse.ArgumentDefaultsHelpFormatter,
    )
    p.add_argument("--prix-ttc", type=float, help="Prix de vente TTC, en euros")
    p.add_argument("--cout-produit", type=float, help="Coût d'une unité, hors livraison")
    p.add_argument("--livraison", type=float, default=0.0, help="Livraison vers le client")
    p.add_argument("--tva", type=float, default=20.0, help="Taux de TVA en %%")
    p.add_argument("--frais-paiement-pct", type=float, default=1.4,
                   help="Commission du prestataire de paiement en %% du TTC")
    p.add_argument("--frais-paiement-fixe", type=float, default=0.25,
                   help="Part fixe de la commission, par transaction")
    p.add_argument("--apps-par-commande", type=float, default=0.0,
                   help="Abonnements d'applications ramenés à la commande")
    p.add_argument("--sav-par-commande", type=float, default=0.0, help="Coût du SAV")
    p.add_argument("--taux-retour", type=float, default=0.0,
                   help="Part des commandes remboursées, en %%")
    p.add_argument("--cout-retour", type=float, default=0.0,
                   help="Coût de traitement d'un retour, au-delà des coûts déjà engagés")
    p.add_argument("--qte", "--quantite", dest="quantite", type=int, default=1,
                   help="Nombre d'unités dans l'offre (bundle)")
    p.add_argument("--droits-douane", type=float, default=0.0,
                   help="Droits de douane en %% de la valeur marchandise + fret")
    p.add_argument("--regime", choices=("reel", "franchise"), default="reel",
                   help="reel = TVA collectée reversée et TVA import déductible ; "
                        "franchise = pas de TVA sur les ventes, TVA import non déductible")
    p.add_argument("--multiple-cible", type=float, default=4.0,
                   help="Multiple visé sur le coût d'achat débarqué")
    p.add_argument("--scenarios", type=str,
                   help="Prix TTC à comparer, séparés par des virgules")
    p.add_argument("--test", action="store_true", help="Lancer l'auto-test et sortir")
    a = p.parse_args()

    if a.test:
        return auto_test()

    if a.prix_ttc is None or a.cout_produit is None:
        p.error("--prix-ttc et --cout-produit sont requis (ou utilise --test).")

    h = Hypotheses(
        prix_ttc=a.prix_ttc, cout_produit=a.cout_produit, livraison=a.livraison,
        tva=a.tva, frais_paiement_pct=a.frais_paiement_pct,
        frais_paiement_fixe=a.frais_paiement_fixe,
        apps_par_commande=a.apps_par_commande, sav_par_commande=a.sav_par_commande,
        taux_retour=a.taux_retour, cout_retour=a.cout_retour, quantite=a.quantite,
        droits_douane=a.droits_douane, regime=a.regime,
        multiple_cible=a.multiple_cible,
    )

    try:
        r = calculer(h)
    except ValueError as e:
        print(f"Erreur : {e}", file=sys.stderr)
        return 2

    afficher(h, r)

    if a.scenarios:
        try:
            prix = [float(x.strip().replace(",", ".")) for x in a.scenarios.split(",")]
        except ValueError:
            print("Erreur : --scenarios attend des nombres séparés par des virgules.",
                  file=sys.stderr)
            return 2
        afficher_scenarios(h, prix)

    return 0


if __name__ == "__main__":
    sys.exit(main())
