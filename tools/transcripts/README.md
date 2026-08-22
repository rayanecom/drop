# Retrouver une conversation Claude Code passée

Claude Code garde les transcripts en clair sur la machine qui a lancé la session,
sous `~/.claude/projects/<chemin-du-projet-encodé>/<id-de-session>.jsonl`,
**30 jours par défaut** (réglable via `cleanupPeriodDays` dans les settings).

Une session lancée depuis un terminal n'existe que sur cette machine-là : elle
n'apparaît nulle part côté serveur, et aucune autre session ne peut la lire.

## Retrouver la bonne session

```bash
# les transcripts les plus récents, tous projets confondus
ls -lt ~/.claude/projects/*/*.jsonl | head -20

# chercher un mot dans toutes les conversations
grep -ril "mon-mot-clé" ~/.claude/projects/
```

## La lire

```bash
python3 tools/transcripts/extraire-session.py ~/.claude/projects/*/ID.jsonl
```

Sans argument, le script traite tous les transcripts, du plus ancien au plus récent.
Il ne garde que les tours humains et les réponses de Claude ; les appels d'outils
sont réduits à `[outil : Nom]` et les sous-agents sont ignorés.

Pour en sortir un fichier :

```bash
python3 tools/transcripts/extraire-session.py ~/.claude/projects/*/ID.jsonl > conversation.txt
```

## Reprendre la session au lieu de la lire

Depuis le dossier du projet concerné :

```bash
claude -r        # sélecteur interactif des conversations passées
claude -c        # reprend directement la plus récente
```
