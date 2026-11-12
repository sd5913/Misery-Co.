# Misery & Co. — Orchard Animation Demo

Branch: `demo/orchard-animation`. This prototype is added separately from the existing course documentation.

## Play

Download **Misery-Co-Orchard.html** using GitHub's **Download raw file** button, then open the downloaded file in desktop Chrome. The HTML includes its scripts, styles and images and runs offline. GitHub's file preview does not run the game. No hosted play URL is configured by this upload.

In the game, select **前往小镇 → 旧果园** to try orchard gathering.

## Source

Download and extract **orchard-source.zip**, then open `misery-orchard/index.html`. Editable HTML, CSS, JavaScript, required artwork, packaging scripts, the Chinese play guide and validation notes are included. No dependency installation is required.

Run the state-logic checks with:

```sh
cd misery-orchard
node tools/verify.cjs
```

## Included prototype

- Shop, crafting workbench, town, separate ingredient cabinet and old orchard.
- Three recipes; persistent intermediate ingredients; heating, stirring, pouring, filtering and sealing.
- Walkable orchard paths; flower cutting, ripe-berry collection and uncovering mushrooms beneath leaves.
- Customer requests, traditional sales, daily municipal task, warmth threshold activity and daily settlement.
- 1920×1080 logical canvas with proportional scaling.
- Transparent character layers, breathing, blinking, subtle head tracking, ribbon movement, environmental rain, leaves and local plant motion.

The animation is a lightweight layered 2D implementation inspired by Live2D presentation. It does not include the Cubism SDK or an editable `.cmo3` model. AI-assisted code and artwork iteration were used, as documented in the existing project materials and included guide.

## Validation and limits

The three gathering interactions were completed in desktop Chrome using their click alternatives. State tests cover recipes, failure consumption, coins/tips, inventory, tasks, activity thresholds, saving and day changes. Drag/touch paths and every recipe have not all been manually retested in this revision. Movement follows a small path graph; the prototype does not implement unrestricted terrain pathfinding or a full narrative campaign.

The HTML package deduplicates embedded image data; image pixels and game behavior are unchanged from the orchard prototype. Progress is browser-local and is not shared with teammates.
