# LATEST — Start Here

**[Browse the latest editable source — 4-LATEST-Source/](https://github.com/sd5913/Misery-Co./tree/main/4-LATEST-Source)** · [Source structure, run and packaging instructions](https://github.com/sd5913/Misery-Co./tree/main/4-LATEST-Source/README.md)

The latest source is now extracted into a normal repository directory. The single-file game and matching ZIP remain available.

**Current test build: Iteration 04 — Integrated Garden Demo**  
**Current main build: 26 November 2026 · Branch: `main`**

- **[Download the latest game: 4-LATEST-Start-Game.html](https://github.com/sd5913/Misery-Co./raw/refs/heads/main/4-LATEST-Start-Game.html)**
- [Download its matching editable source: 4-LATEST-Source.zip](https://github.com/sd5913/Misery-Co./raw/refs/heads/main/4-LATEST-Source.zip)
- [Original play guide: 4-LATEST-Play-Guide.txt](https://github.com/sd5913/Misery-Co./blob/main/4-LATEST-Play-Guide.txt)

Download the HTML, then open it in desktop Chrome. GitHub's file preview does not run the game. If a download link opens a file page, use **Download raw file**. Camera gestures require camera permission and an internet connection to load the recognition engine/model.

## File numbers — 1 → 2 → 3 → 4 (LATEST)

Files with the same starting number belong together: game, source ZIP and guide. **Open `4-LATEST-Start-Game.html` for the latest version.**

## Iteration order — oldest to newest

Iteration 04 and its editable source are available on `main`. Archived iterations 01–03 remain on `demo/orchard-animation`; their links below point to that branch. These numbers identify prototype iterations, not semantic release tags.

| Order | Status | Build / game file | Matching source | Main changes |
| --- | --- | --- | --- | --- |
| **01** | **ARCHIVED** | **Orchard Demo** — [1-Orchard-Demo.html](https://github.com/sd5913/Misery-Co./blob/demo/orchard-animation/1-Orchard-Demo.html) | [1-Orchard-Source.zip](https://github.com/sd5913/Misery-Co./blob/demo/orchard-animation/1-Orchard-Source.zip) | Shop, manual alchemy, town, separate ingredient cabinet, orchard gathering and daily management. |
| **02** | **ARCHIVED** | **Residents & Cat Demo** — [2-Residents-and-Cat-Demo.html](https://github.com/sd5913/Misery-Co./blob/demo/orchard-animation/2-Residents-and-Cat-Demo.html) | [2-Residents-and-Cat-Source.zip](https://github.com/sd5913/Misery-Co./blob/demo/orchard-animation/2-Residents-and-Cat-Source.zip) | Builds on 01 with animated town residents, rotating customer appearances and clickable cat reactions. |
| **03** | **ARCHIVED** | **Visual UI Demo** — [3-Visual-UI-Demo.html](https://github.com/sd5913/Misery-Co./blob/demo/orchard-animation/3-Visual-UI-Demo.html) | [3-Visual-UI-Source.zip](https://github.com/sd5913/Misery-Co./blob/demo/orchard-animation/3-Visual-UI-Source.zip) | Builds on 02 with icon-led UI, visual-novel dialogue, smoother cat transitions, revised portraits, simplified ingredient use, corrected pouring and delayed next-action glow. |
| **04** | **LATEST — START HERE** | **Integrated Garden Demo** — [4-LATEST-Start-Game.html](https://github.com/sd5913/Misery-Co./blob/main/4-LATEST-Start-Game.html) | [4-LATEST-Source.zip](https://github.com/sd5913/Misery-Co./blob/main/4-LATEST-Source.zip) | Builds on 03 with six camera-gesture planting beds, three flowers per bed, harvests deposited in the shared material cabinet, garden persistence and the existing shop/crafting/day loop. |

**Sequence: 01 Orchard → 02 Residents & Cat → 03 Visual UI → 04 Integrated Garden.**

Iterations 01–03 were uploaded on 12 November 2026. Iteration 04 was developed locally after them and uploaded on 26 November 2026. Use 04 for current playtests; the earlier files are retained for comparison and development history. Repository filenames now start with 1, 2, 3 or 4 so the file list shows the iteration order. Older filenames remain accessible in Git history; use the updated links below for the current branch.

## Latest build: how to play

1. Download **4-LATEST-Start-Game.html** and open it in Chrome.
2. Serve customers, use the ingredient cabinet and recipe book, heat/stir/pour a recipe, then return to the counter to deliver it.
3. Select the **✿** entry in the town, orchard or ingredient cabinet to enter the garden.
4. Point at a bed to select it. Pinch and release to sow; open your palm to water; raise your hand to accelerate growth; pinch and lift to harvest.
5. Each harvested bed supplies three flowers to the shared cabinet. Return to the shop/workshop to use them. End the business day to view settlement and continue to the next day.

**Watch Demo** demonstrates the garden without adding real inventory or replacing the player's saved garden.

## Source and verification

The source archive for 04 extracts to `misery-complete/`. Its packaging script is `tools/package_complete.py`; it generates `开始游戏.html`, published in this repository as `4-LATEST-Start-Game.html`. Numbered archive names identify their repository versions; the extracted source folder names are unchanged. The archives listed beside 01–03 belong to those earlier builds.

The integration revision passed automated model checks for the existing management loop, garden-to-stock transfers, duplicate-message handling, full-stock overflow, save restoration and the garden → crafting → customer → municipal task → next-day path. Script parsing, message-bridge checks and ZIP integrity were also checked. These checks do not establish a complete browser playtest: embedded camera permissions, final visual layout and live hand tracking in the integrated build still need real-device verification.

The latest build is a playable prototype, not a declaration that all planned narrative, art and management-risk mechanics are finished.
