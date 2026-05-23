# NumberFlow

Mental addition and subtraction fluency app for the classroom. Built from the FactFlow engine.

NumberFlow is designed for young learners, especially early elementary students, who need short, encouraging practice with basic addition and subtraction facts. It keeps the practice focused, adapts to each student, and brings older facts back when they need review.

## What it does

NumberFlow helps students build automatic recall of addition and subtraction facts through short, adaptive practice rounds. It picks the items each student needs most, not random drills.

- 60-second timed rounds with adaptive weighted selection
- 6 progressive stages covering anchor facts through two-digit mental methods
- Cluster-based unlocking so students see new groups only when they are ready
- Kid-friendly mastery rules so early facts can turn green quickly
- Sub-stage and main-stage celebrations with confetti
- "Next Up" practice queue that shows the current facts and review facts clearly
- Per-item mastery tracking with 6 states: Not Started, Learning, Almost There, Review Soon, Needs Practice, Mastered
- Google Drive sync for persistence across devices
- Progress graph and portfolio data for teacher review

## Student experience

Students practice one fact at a time using a large keypad and quick feedback. The app avoids overwhelming students with too many facts at once.

The right-side progress panel includes:

- Next Up: a readable list of the facts the student is working on now
- Stage Map: a compact overview of current and locked fact groups
- Mastery Over Time: a simple progress graph for long-term growth

Facts that slip after being mastered can reappear for review, so students can move ahead without needing every item to stay perfect forever.

## Speed target

The speed target is intentionally set for young students.

Available speed targets:

| Setting | Items per minute |
|---------|------------------|
| 1 | 10 |
| 2 | 15 |
| 3 | 20 |
| 4 | 25 |
| 5 | 30 |

Default: 10 items per minute.

The speed target affects the speed bar, graph scoring, and mastery timing.

## Stages

| Stage | Name | Content | Items |
|-------|------|---------|-------|
| 1 | Anchor Facts | Bonds to 10, +/-0, +/-1, +/-2, subtract from 10 | 82 |
| 2 | Counting Strategies | Count on, count back, count up | 66 |
| 3 | Doubles and Near Doubles | Double facts and near-double neighbors | 38 |
| 4 | Make 10 and Bridge | Make-10 addition, bridge-back subtraction | 42 |
| 5 | Fact Families | Complements to 20, inverse thinking | 28 |
| 6 | Two-Digit Methods | Compensation, partitioning, flexible bridging | 35 |

291 total items across all stages.

## Mastery and unlocking

NumberFlow tracks progress per item rather than only by quiz score.

Each item stores:

- Number of times shown
- Correct and incorrect responses
- Recent response history
- Average response time
- Confidence score
- Mastery score
- Fast streaks and slow/wrong counts
- Last practice status

Early addition and subtraction facts use gentler mastery thresholds because the target users are younger students. Students can graduate through small clusters and larger stages without needing perfection. If a previously mastered fact becomes slow or incorrect later, the adaptive engine can return it to the practice queue.

Unlocking happens at two levels:

- Sub-stages or clusters unlock inside each stage.
- Main stages unlock after enough current-stage mastery.

Confetti plays for both sub-stage unlocks and main-stage graduation.

## Progress states

| State | Meaning |
|-------|---------|
| Not Started | The fact has not been practiced yet |
| Learning | The student has started practicing the fact |
| Almost There | The student is close to mastery |
| Review Soon | The fact was mastered before but should be checked again |
| Needs Practice | The student is missing or slowing down on this fact |
| Mastered | The student is accurate and quick enough for now |

## Architecture

Single-file HTML app. No build step, no local dependencies beyond externally loaded browser libraries.

External services and libraries:

- [canvas-confetti](https://github.com/catdad/canvas-confetti) for celebration effects
- Google Identity Services for sign-in
- Google Drive API for optional cloud sync

All state lives in `localStorage` with optional cloud backup to Google Drive.

## File structure

The app is self-contained in one HTML file.

Typical deployment filename:

```text
index.html
```

Development filename:

```text
numberflow.html
```

## Storage

| Key | Purpose |
|-----|---------|
| `numberflow_progress` | Student progress, item stats, session history |
| `numberflow_settings` | Speed target, daily goals, preferences |
| `numberflow_deletions` | Deletion tracking for sync conflict resolution |

Drive filename:

```text
numberflow-backup.json
```

## Google Drive sync

Google Drive sync is optional. When enabled, the app stores a backup JSON file in the user's Drive so progress can persist across devices.

To deploy with Google Drive sync:

1. Set up a Google Cloud project.
2. Enable the Google Drive API.
3. Create an OAuth 2.0 client ID.
4. Add your OAuth client ID to the `GOOGLE_CLIENT_ID` variable in the HTML.
5. Add the final GitHub Pages domain to the authorized JavaScript origins.

## Deploy to GitHub Pages

1. Rename `numberflow.html` to `index.html`.
2. Push the file to a GitHub repository.
3. Enable GitHub Pages for the repository.
4. Open the published GitHub Pages URL.
5. Confirm Google sign-in works if Drive sync is enabled.

The file is self-contained. No build tooling is required.

## Local development

Open `numberflow.html` directly in a browser. The app works fully offline except for Google Drive sync.

To test with a local server:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000/numberflow.html
```

## Testing checklist

After changing the app, test:

- Starting and finishing a round
- Correct answers, incorrect answers, and timeouts
- Speed target settings from 10 to 30 items per minute
- Next Up practice queue updates
- Stage Map color changes
- Sub-stage unlock confetti
- Main-stage graduation confetti
- Local progress saving after refresh
- Google Drive sign-in and sync, if configured
- Mobile layout during active rounds

## License

MIT
