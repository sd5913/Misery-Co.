# Misery & Co.

A hand-drawn dark-fairytale shop-management prototype: sell gloomy goods, craft comforting products, and bring warmth to a rainy town. Course project: [SD5913](https://canvas.polyu.edu.hk/courses/4750).

## Play the current version

**Current version: Iteration 04 — English integrated garden demo, 26 November 2026.**

**[Download the playable English ZIP](https://github.com/sd5913/Misery-Co./raw/refs/heads/main/Misery-Co-English-Team-Preview.zip)**

1. Download and extract the ZIP.
2. Open **Start-Game.html** in desktop Chrome. No installation or build is needed.
3. Allow camera access only if you want to try the gesture garden. Its recognition engine/model needs an internet connection; a demonstration mode is also available.

Alternatively, [download the standalone HTML](https://github.com/sd5913/Misery-Co./raw/refs/heads/main/Start-Game.html). GitHub's code preview does not run HTML. The package is the English feather-fix revision approved by the project author for team review.

## Reviewer and teammate entry points

| Need | Open |
| --- | --- |
| Controls, recipes, garden | [Player guide](src/PLAY_GUIDE_EN.md) |
| Implemented features and limitations | [Feature status](docs/FEATURE_STATUS.md) |
| Actual checks and pending playtests | [Test record](docs/TEST_RECORDS.md) |
| Development decisions and next actions | [Process](PROCESS.md) |
| Editable implementation | [Source directory](src/) · [Source map](src/README.md) |
| Team task board | [Scrum board](https://github.com/orgs/sd5913/projects/30/views/1) |
| Original concept and credits | [Original project brief](docs/ORIGINAL_PROJECT_BRIEF.md) |

## Run editable source

Python 3 serves the source; Node.js runs the automated checks. No npm dependencies are required for these checks.

```sh
git clone https://github.com/sd5913/Misery-Co..git misery-co
cd misery-co
python3 -m http.server 8776 --bind 127.0.0.1 --directory src
```

Open **http://localhost:8776/** in Chrome. HTTPS or localhost is recommended for camera use. Camera permission and model loading are separate from the core shop game.

## Check and reproduce the package

From the repository root:

```sh
node src/tools/verify.cjs
node src/tools/verify-garden.cjs
node src/tools/verify-bridge.cjs
node src/tools/verify-presentation.cjs
python3 src/tools/package_complete.py
```

The packager creates `dist/4-LATEST-Start-Game.html`, a play guide and editable-source ZIP. Its playable HTML corresponds to root `Start-Game.html`; the latter is the generated distribution, not the editing entry point. The downloaded team ZIP contains that same playable HTML and a short guide. Edit `src/`, rebuild, and replace the distribution when publishing a new revision.

## Current scope

Shop sales, inventory, three recipes, hold-to-heat/stir/pour crafting, orchard gathering, municipal tasks, resident interactions, daily settlement, save/restore and a six-plot gesture garden are connected. This is a prototype, not a claim of a fully balanced final game. Automated tests exercise state and mocked interfaces; they do not establish visual quality, camera reliability or first-time player understanding. In particular, the intended quota-versus-warmth dilemma still needs an independent full-day playtest. See the linked status and test records.

## Iteration order

1. **Orchard Demo** — earlier gathering prototype.
2. **Residents and Cat Demo** — earlier residents and cat interactions.
3. **Visual UI Demo** — earlier icon-led UI and workbench refinements.
4. **LATEST: English integrated garden demo** — use the root download above. Includes English runtime UI, the feather viewport correction and stable collection animation.

Earlier builds are retained on [demo/orchard-animation](https://github.com/sd5913/Misery-Co./tree/demo/orchard-animation); they are historical versions, not the current presentation download.

## Concept art, credits and AI assistance

[Storyboard](storyboard.jpg) · [Workflow](workflow.jpg)

The team directs the concept, supplied character references, visual choices, feedback and acceptance. HTML/CSS/JavaScript and visual iterations used generative AI assistance (ChatGPT/Gemini), as disclosed in the preserved original brief. The runtime uses MediaPipe for hand tracking; see [asset and dependency notes](docs/CREDITS.md). Tests run by an assistant are labeled automated and are not presented as participant testing.
