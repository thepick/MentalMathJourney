# Mental Math Journey

Mental Math Journey is a classroom-friendly mental math practice app for elementary students. It turns addition, subtraction, and two-digit mental calculation strategies into a six-stage adventure with short timed sprints, strategy lesson slides, smart review, and local progress tracking.

## What the app does

Students move through a guided map of math strategy stops. Each stop introduces a specific mental math idea, gives a short explanation and example, then lets students practice with a 1-minute sprint.

During practice, the app tracks each fact or question by accuracy, response time, and recent performance. Facts that are slow, missed, or still developing appear more often. Facts that are fluent appear less often, but can still come back for review.

Progress is saved in the browser using `localStorage`. The app does not require Google sign-in, Google Drive sync, a database, or a custom backend.

## Key features

- Six adventure stages from anchor facts to two-digit mental math strategies
- 28 lesson and review stops across the full journey
- Strategy lesson slides with examples and step-by-step thinking prompts
- 1-minute timed sprints for each unlocked strategy stop
- Smart review engine that gives more practice to facts that need support
- Hidden fact status tracking for teacher/debug review
- Star rewards based on the selected speed target
- Journey map showing unlocked, locked, and mastered stops
- All Lessons view for reviewing every strategy slide
- Best speed and best streak tracking for each stop
- Student-friendly visual feedback for correct and incorrect answers
- Settings panel for speed target and progress reset
- Printable completion certificates for stage completion and full journey completion
- Static production build that can run from the top-level `index.html`
- Editable React/Vite source included in the `source/` folder

## How students use it

1. Open `index.html`.
2. Choose an unlocked stop on the Adventure Map.
3. Read or review the strategy slide.
4. Start the 1-minute sprint.
5. Type answers using the on-screen keypad or keyboard.
6. Review the sprint results, speed score, accuracy, and unlock message.
7. Continue to the next lesson after a passing sprint, practice again, or return to the map.

## Main student screens

### Adventure Map Stages

The map shows the six stages of the journey. Each stage contains a set of strategy stops. Students unlock new stops by completing a passing 1-minute sprint on the current stop.

### All Math Lessons

This screen lists all 28 strategy slides. It works like a teacher and student guide, letting students review explanations, examples, and thinking steps before practicing.

### Practice Game

This is the active sprint screen. Students answer as many questions as they can in 60 seconds. The app records correct answers, incorrect answers, speed, streaks, and fact-level progress.

### Sprint completion screen

After each sprint, students see:

- Speed Score: how many facts were answered correctly in 1 minute
- Accuracy: the percentage of attempted answers that were correct
- Star reward: bronze, silver, or gold based on the speed target
- A clear unlock message when the next lesson is available
- A Continue to Next Lesson button after a passing sprint

Unlocking is based on a strong sprint sample, not on turning every generated fact green. This keeps progression moving at a reasonable classroom pace while the review engine still brings back facts that need support over time.

## Stages and content

Mental Math Journey groups practice by strategy rather than by traditional number families. Cumulative quiz and mega review stops reuse facts from earlier strategy pools, so the counts below describe the unique generated base questions introduced in each stage.

| Stage | World | Main content | Strategy stops | Unique base questions |
|---:|---|---|---:|---:|
| 1 | Starter Island | Zero facts, one more/less, two more/less, make-10 pairs, subtract from 10 | 6 | 183 |
| 2 | Counting Trail | Count-on addition, count-back subtraction, count-up subtraction | 5 | 92 |
| 3 | Doubles Forest | Doubles, halves, near doubles, near-double subtraction | 5 | 44 |
| 4 | Bridge Town | Make-10 addition and bridge-back subtraction | 4 | 42 |
| 5 | Family Village | Inverse thinking and fact families to 20 | 3 | 20 |
| 6 | Big Number Mountain | Compensation, partitioning, and bridging across tens | 5 | 588 |
|  | Total |  | 28 | 969 |

## Strategy stops

| Stop | Stage | Strategy |
|---:|---|---|
| 1 | Starter Island | Same Number Facts |
| 2 | Starter Island | One More and One Less |
| 3 | Starter Island | Two More and Two Less |
| 4 | Starter Island | Make 10 Pairs |
| 5 | Starter Island | Subtract from 10 |
| 6 | Starter Island | Starter Island Cumulative Quiz |
| 7 | Counting Trail | Count On to Add |
| 8 | Counting Trail | Count Back to Subtract |
| 9 | Counting Trail | Count Up to Subtract |
| 10 | Counting Trail | Counting Trail Cumulative Quiz |
| 11 | Counting Trail | Mega Review (Stages 1-2) |
| 12 | Doubles Forest | Doubles and Half Facts |
| 13 | Doubles Forest | Near Doubles to Add |
| 14 | Doubles Forest | Near Doubles Backwards |
| 15 | Doubles Forest | Doubles Forest Cumulative Quiz |
| 16 | Doubles Forest | Mega Review (Stages 1-3) |
| 17 | Bridge Town | Make 10 Addition |
| 18 | Bridge Town | Bridge Back Subtraction |
| 19 | Bridge Town | Bridge Town Cumulative Review |
| 20 | Bridge Town | Mega Review (Stages 1-4) |
| 21 | Family Village | Think Inverse |
| 22 | Family Village | Family Village Cumulative Quiz |
| 23 | Family Village | Mega Review (Stages 1-5) |
| 24 | Big Number Mountain | Make a Friendly Number |
| 25 | Big Number Mountain | Split Tens and Ones |
| 26 | Big Number Mountain | Bridge Across Tens |
| 27 | Big Number Mountain | Big Mountain Cumulative Review |
| 28 | Big Number Mountain | Mega Review (ALL STAGES 1-6) |

## Smart review and mastery

The app tracks each fact or question individually. For each attempt, it records whether the answer was correct, how long the student took, and whether the fact has been slow or missed recently.

The review engine uses this information to choose what appears next. Facts that need support receive higher weight. Ready facts receive lower weight, so students spend more time on what still needs practice.

A strategy stop unlocks the next stop when the student completes a passing sprint. The passing rule is intentionally based on a strong sample from the stop instead of requiring every generated fact to become fluent. This keeps the journey moving at a classroom-friendly pace, especially for stops with large question pools.

The current pass check looks for:

- The Silver speed target or better for the selected speed setting
- At least 80% accuracy in the sprint
- Enough attempted answers to make the sprint meaningful
- A small sample of different facts seen from the stop
- No large cluster of facts that recently needed extra support

Individual fact tracking still matters for smart review. Slow or missed facts continue to appear more often, even after the next lesson is unlocked.

## Hidden fact status labels

| Hidden engine state | Teacher/debug label | What it means |
|---|---|---|
| Needs support | Extra practice | The fact has been missed, slow, or weak recently |
| Building | Building | The fact has started but is not ready yet |
| Almost ready | Almost ready | The fact is improving but needs more evidence |
| Review soon | Review soon | The fact is mostly ready but should return for review |
| Ready | Ready | The fact is accurate and quick enough for now |
| Not started | Not started yet | The fact has not appeared yet |

## Stars and speed targets

Each sprint lasts 60 seconds, so the number of correct answers is also the student's facts-per-minute score for that sprint.

The speed target can be changed in the settings menu.

| Speed target | Bronze | Silver | Gold |
|---:|---:|---:|---:|
| 10 correct/min | 3 | 6 | 10 |
| 15 correct/min | 5 | 9 | 15 |
| 20 correct/min | 6 | 12 | 20 |
| 30 correct/min | 9 | 18 | 30 |
| 40 correct/min | 12 | 24 | 40 |

The default speed target in the rebuilt app is 20 correct facts per minute.

## Progress storage

Progress is stored locally in the browser.

Main storage key:

```text
mental_math_journey_progress
```

Stored progress includes:

- Viewed strategy stops
- Mastered strategy stops
- Total stars earned
- Current speed target
- Best streaks by strategy stop
- Best speeds by strategy stop
- Fact-level learning statistics hidden under the settings debug area

Because the app uses browser storage, progress is tied to the device and browser profile. Clearing site data, using a different browser, or changing devices may remove or hide existing progress.

## Privacy and classroom use

Mental Math Journey does not require students to sign in. It does not send student progress to Google Drive and does not require a remote database.

For classroom use, this makes the app simple to open and practice. The trade-off is that progress is local to the browser. If long-term cross-device records are required, sync would need to be added separately.

## File structure

The distributed rebuild includes a ready-to-open production build and the editable source.

```text
index.html                  Production entry file
assets/                     Built CSS and JavaScript assets
source/                     Editable React/Vite project
source/src/App.tsx          Main app UI and game flow
source/src/strategies.ts    Stages, strategies, and question generation
source/src/adaptiveEngine.ts Smart review and mastery logic
source/src/index.css        App CSS
source/package.json         Development scripts and dependencies
README_OPEN_FIRST.txt       Quick start notes for the packaged build
```

## Running the packaged app

Open the top-level file:

```text
index.html
```

The top-level `index.html` is the production build. It can be opened directly from the extracted folder because the asset paths are relative.

Keep the `assets/` folder beside `index.html`. If the assets folder is moved or renamed, the app will not load correctly.

## Local development

Prerequisites:

- Node.js
- npm

From the project root:

```bash
cd source
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal.

To check TypeScript:

```bash
npm run lint
```

To rebuild the production files:

```bash
npm run build
```

The current Vite configuration uses relative asset paths, so the rebuilt files can be copied into the package root for local static use.

## Deployment

For simple static hosting, deploy the production build files:

```text
index.html
assets/
```

For GitHub Pages, Netlify, Cloudflare Pages, or similar static hosts, make sure the built `assets/` folder stays beside `index.html`.

No OAuth setup, Google Cloud project, Google Drive API, backend server, or database is required for the rebuilt app.

## Testing checklist

After changing the app, test:

- Opening the top-level `index.html` after extracting the package
- Adventure Map stage display
- All Lessons strategy slide display
- Starting a 1-minute sprint from an unlocked stop
- Correct answer handling
- Incorrect answer handling
- On-screen keypad input
- Keyboard input, including Enter and Backspace
- Timer countdown and sprint completion
- Speed Score and accuracy display
- Sprint completion messages and next-lesson button behavior
- Bronze, silver, and gold star rewards
- Strategy stop unlocking
- Best speed and best streak updates
- Speed target settings: 10, 15, 20, 30, and 40 correct/min
- Progress persistence after refreshing the page
- Reset progress from the settings menu
- Stage completion certificate printing
- Full journey completion certificate printing
- Mobile and tablet layout during active practice

## Notes for future improvements

Possible future additions:

- Teacher dashboard or exportable progress summary
- Class roster support
- Optional cloud sync
- More detailed teacher settings panel
- Separate student profiles on shared classroom devices
- More print-friendly progress reports

## License

MIT
