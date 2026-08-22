#!/usr/bin/env python3
"""Transforme un transcript Claude Code (.jsonl) en conversation lisible."""
import json, sys, glob, os, signal

signal.signal(signal.SIGPIPE, signal.SIG_DFL)  # tolère « | head »

def texte(contenu):
    if isinstance(contenu, str):
        return contenu
    morceaux = []
    if isinstance(contenu, list):
        for bloc in contenu:
            if not isinstance(bloc, dict):
                continue
            if bloc.get("type") == "text":
                morceaux.append(bloc.get("text", ""))
            elif bloc.get("type") == "tool_use":
                morceaux.append(f"[outil : {bloc.get('name')}]")
    return "\n".join(m for m in morceaux if m.strip())

cibles = sys.argv[1:] or sorted(
    glob.glob(os.path.expanduser("~/.claude/projects/*/*.jsonl")),
    key=os.path.getmtime)

for chemin in cibles:
    print(f"\n{'='*70}\n{chemin}\n{'='*70}")
    for ligne in open(chemin, encoding="utf-8", errors="replace"):
        try:
            ev = json.loads(ligne)
        except Exception:
            continue
        if ev.get("type") not in ("user", "assistant"):
            continue
        if ev.get("isSidechain"):
            continue
        corps = texte((ev.get("message") or {}).get("content"))
        if not corps.strip():
            continue
        qui = "MOI" if ev["type"] == "user" else "CLAUDE"
        print(f"\n--- {qui} · {ev.get('timestamp','')} ---\n{corps}")
