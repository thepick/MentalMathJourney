# NumberFlow

Mental addition and subtraction fluency app for the classroom. Built from the FactFlow engine.

## What it does

NumberFlow helps students build automatic recall of addition and subtraction facts through short, adaptive practice rounds. It picks the items each student needs most — not random drills.

- **60-second timed rounds** with adaptive weighted selection
- **6 progressive stages** covering anchor facts through two-digit mental methods
- **Per-item mastery tracking** with 6 states (Not Started → Mastered)
- **Cluster-based unlocking** — students see new items only when they're ready
- **Google Drive sync** for persistence across devices
- **Progress graph and portfolio** for teacher review

## Stages

| Stage | Name | Content | Items |
|-------|------|---------|-------|
| 1 | Anchor Facts | Bonds to 10, ±0, ±1, ±2, subtract from 10 | 82 |
| 2 | Counting Strategies | Count on, count back, count up | 66 |
| 3 | Doubles & Near Doubles | Double facts and near-double neighbors | 38 |
| 4 | Make 10 & Bridge | Make-10 addition, bridge-back subtraction | 42 |
| 5 | Fact Families | Complements to 20, inverse thinking | 28 |
| 6 | Two-Digit Methods | Compensation, partitioning, flexible bridging | 35 |

**291 total items** across all stages.

## Architecture

Single-file HTML app (~7,300 lines). No build step, no dependencies beyond:

- [canvas-confetti](https://github.com/catdad/canvas-confetti) — celebration effects
- Google Identity Services — sign-in and Google Drive sync

All state lives in `localStorage` with optional cloud backup to Google Drive.

## Deploy to GitHub Pages

1. Set up a Google Cloud project with the Drive API enabled
2. Add your OAuth 2.0 client ID to the `GOOGLE_CLIENT_ID` variable in the HTML
3. Push `numberflow.html` (renamed to `index.html`) to a repo
4. Enable GitHub Pages on the `main` branch

The file is self-contained — no build tooling needed.

## Storage

| Key | Purpose |
|-----|---------|
| `numberflow_progress` | Student progress, item stats, session history |
| `numberflow_settings` | Speed target, daily goals, preferences |
| `numberflow_deletions` | Deletion tracking for sync conflict resolution |

Drive filename: `numberflow-backup.json`

## Local development

Open `numberflow.html` directly in a browser. No server needed. The app works fully offline except for Google Drive sync.

To test with a local server:

```
python -m http.server 8000
```

Then open `http://localhost:8000/numberflow.html`.

## License

MIT
