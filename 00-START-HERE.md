# LATEST — Start Here

**Current test build: Iteration 04 — Integrated Garden Demo**  
**Uploaded: 26 November 2026 · Branch: `demo/orchard-animation`**

- **[Download the latest game: 开始游戏.html](https://github.com/sd5913/Misery-Co./raw/refs/heads/demo/orchard-animation/%E5%BC%80%E5%A7%8B%E6%B8%B8%E6%88%8F.html)**
- [Download its matching editable source: 完整源代码.zip](https://github.com/sd5913/Misery-Co./raw/refs/heads/demo/orchard-animation/%E5%AE%8C%E6%95%B4%E6%BA%90%E4%BB%A3%E7%A0%81.zip)
- [Original play guide: 先看这里.txt](https://github.com/sd5913/Misery-Co./blob/demo/orchard-animation/%E5%85%88%E7%9C%8B%E8%BF%99%E9%87%8C.txt)

Download the HTML, then open it in desktop Chrome. GitHub's file preview does not run the game. If a download link opens a file page, use **Download raw file**. Camera gestures require camera permission and an internet connection to load the recognition engine/model.

## Iteration order — oldest to newest

These iteration numbers are navigation labels for the four builds in this branch, not semantic release tags.

| Order | Status | Build / game file | Matching source | Main changes |
| --- | --- | --- | --- | --- |
| **01** | **ARCHIVED** | **Orchard Demo** — [Misery-Co-Orchard.html](https://github.com/sd5913/Misery-Co./blob/demo/orchard-animation/Misery-Co-Orchard.html) | [orchard-source.zip](https://github.com/sd5913/Misery-Co./blob/demo/orchard-animation/orchard-source.zip) | Shop, manual alchemy, town, separate ingredient cabinet, orchard gathering and daily management. |
| **02** | **ARCHIVED** | **Residents & Cat Demo** — [Misery-Co-Residents.html](https://github.com/sd5913/Misery-Co./blob/demo/orchard-animation/Misery-Co-Residents.html) | [residents-source.zip](https://github.com/sd5913/Misery-Co./blob/demo/orchard-animation/residents-source.zip) | Builds on 01 with animated town residents, rotating customer appearances and clickable cat reactions. |
| **03** | **ARCHIVED** | **Visual UI Demo** — [Misery-Co-Icons.html](https://github.com/sd5913/Misery-Co./blob/demo/orchard-animation/Misery-Co-Icons.html) | [icons-source.zip](https://github.com/sd5913/Misery-Co./blob/demo/orchard-animation/icons-source.zip) | Builds on 02 with icon-led UI, visual-novel dialogue, smoother cat transitions, revised portraits, simplified ingredient use, corrected pouring and delayed next-action glow. |
| **04** | **LATEST — START HERE** | **Integrated Garden Demo** — [开始游戏.html](https://github.com/sd5913/Misery-Co./blob/demo/orchard-animation/%E5%BC%80%E5%A7%8B%E6%B8%B8%E6%88%8F.html) | [完整源代码.zip](https://github.com/sd5913/Misery-Co./blob/demo/orchard-animation/%E5%AE%8C%E6%95%B4%E6%BA%90%E4%BB%A3%E7%A0%81.zip) | Builds on 03 with six camera-gesture planting beds, three flowers per bed, harvests deposited in the shared material cabinet, garden persistence and the existing shop/crafting/day loop. |

**Sequence: 01 Orchard → 02 Residents & Cat → 03 Visual UI → 04 Integrated Garden.**

Iterations 01–03 were uploaded on 12 November 2026. Iteration 04 was developed locally after them and uploaded on 26 November 2026. Use 04 for current playtests; the earlier files are retained for comparison and development history. Their original filenames are unchanged so existing links continue to work.

## Latest build: how to play

1. Download **开始游戏.html** and open it in Chrome.
2. Serve customers, use the ingredient cabinet and recipe book, heat/stir/pour a recipe, then return to the counter to deliver it.
3. Select the **✿** entry in the town, orchard or ingredient cabinet to enter the garden.
4. Point at a bed to select it. Pinch and release to sow; open your palm to water; raise your hand to accelerate growth; pinch and lift to harvest.
5. Each harvested bed supplies three flowers to the shared cabinet. Return to the shop/workshop to use them. End the business day to view settlement and continue to the next day.

**Watch Demo** demonstrates the garden without adding real inventory or replacing the player's saved garden.

## Source and verification

The source archive for 04 extracts to `misery-complete/`. Its packaging script is `tools/package_complete.py`; the generated standalone game is `开始游戏.html`. The archives listed beside 01–03 belong to those earlier builds.

The integration revision passed automated model checks for the existing management loop, garden-to-stock transfers, duplicate-message handling, full-stock overflow, save restoration and the garden → crafting → customer → municipal task → next-day path. Script parsing, message-bridge checks and ZIP integrity were also checked. These checks do not establish a complete browser playtest: embedded camera permissions, final visual layout and live hand tracking in the integrated build still need real-device verification.

The latest build is a playable prototype, not a declaration that all planned narrative, art and management-risk mechanics are finished.
