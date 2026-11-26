# Test record — 26 November 2026

Build under review: English Iteration 04, feather-fixed standalone distribution. Baseline source: `demo/orchard-animation@717a03884ec370228ab5fe8ab14f7b573658282e`. Test commands below run against the published `src/` snapshot; source and distribution are linked by the build/hash checks.

## Automated checks

| Command / check | Result | What it establishes |
| --- | --- | --- |
| `node src/tools/verify.cjs` | PASS | Recipes, failure consumption, stock, coins, customer preferences, tasks, day reset and malformed-save handling |
| `node src/tools/verify-garden.cjs` | PASS | Garden stock integration, overflow, duplicate protection and model craft/deliver/day route |
| `node src/tools/verify-bridge.cjs` | PASS | Mocked iframe handshake, source validation, save-and-return and DOM ordering |
| `node src/tools/verify-presentation.cjs` | PASS | English runtime scan, SVG crop reference, discrete walking cells, stable collection pose and return to idle |
| Packaged inline script syntax | PASS | Each extracted script parses in Node; not browser execution |
| ZIP integrity and playable-file comparison | PASS | Archive readable; ZIP HTML matches selected standalone HTML |
| Source rebuild / packaged HTML comparison | See evidence JSON | Reproduction result captured during publication preparation |

Machine-readable output: [publication-checks.json](publication-checks.json).

## Observed author feedback

The author reported a stray shell fragment beside the feather and collection flicker. The first CSS-only crop was rejected because the fragment remained visible. The revised intrinsic SVG crop was accepted for team preview (author: “我觉得可以”). This is author acceptance, not a new participant study or proof of all gameplay routes.

## Pending independent browser playtest

Ask someone who did not build the game to play one whole day without guidance. Record tester, date, browser/device, commit, steps, observed result and severity.

1. Make an ordinary sale and explain its effect on the municipal target.
2. Craft/deliver a warm product and explain why it is worth doing and what risk actually exists.
3. Deliberately fail a recipe; recover without developer help.
4. Run short of a material; find a valid way to continue.
5. End the day and explain coins, quota and warmth in settlement.
6. Close/reopen the same browser and check progress.
7. Gather repeatedly: watch the character for flashes and check feather artwork in cabinet, tray and recipe view.
8. Test camera loading, recognition, plot selection, harvest and camera shutdown on return.

No tester identity, satisfaction score, browser pass, live-camera success or team contribution is invented in this record. Teacher Issue #2 remains open until evidence supports its playtest questions.
