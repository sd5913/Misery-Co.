# English presentation revision — validation

Date: 26 November 2026 (Asia/Hong_Kong). Based on the 52 source files in `demo/orchard-animation@717a03884ec370228ab5fe8ab14f7b573658282e`; their Git blob hashes were matched before editing.

Changes: English runtime text and accessible labels across the shop, workshop, town, pantry, orchard and camera garden; an English text overlay on the shop sign; a code-native viewport mask for the feather's neighboring shell fragment; an explicit collector sprite-cell selector and stable collection pose with subtle breathing, replacing sliding atlas animation and brightness changes.

Automated checks run successfully:

- `tools/verify.cjs`: existing recipe, failure, money, customer, task and day rules.
- `tools/verify-garden.cjs`: garden snapshot to stock, overflow, duplicate handling and the model's craft/deliver/day route.
- `tools/verify-bridge.cjs`: mocked garden handshake, save/return and DOM ordering.
- `tools/verify-presentation.cjs`: no Han characters in runtime HTML/CSS/JS/MJS, intrinsic SVG crop viewport, discrete walking cells, stationary collecting cell, cancel-to-idle and no inventory change from animation alone.
- All runtime and test scripts parsed with Node.

The automatic animation check samples whole cells; it does not independently prove browser rendering or hand-tracking comfort. The author reviewed the local revision and accepted it for team preview; no independent full-day browser playtest has been recorded. Live-camera gestures require a real player and are not certified by these automatic checks.

Earlier qualitative feedback and acceptance records remain attached to their original versions. No new first-time participant study or management-risk mechanic is claimed by this revision.
