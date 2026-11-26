# Feature status — English team preview

Selected build: root `Start-Game.html`, Iteration 04, 26 November 2026. Editable source: `src/`. These descriptions distinguish implementation from validation.

| Feature | Implementation | Evidence / remaining work |
| --- | --- | --- |
| Shop, workbench and town navigation | Implemented | UI handlers present; browser regression pending |
| Inventory and traditional sales | Implemented | State checks pass |
| Three raw-ingredient recipes, one of each | Implemented | Recipe and batch checks pass |
| Heat, stir, pour and finished products | Implemented | State tests pass; drag/hold feel needs browser testing |
| Failed recipe consumes ingredients | Implemented | Automated failure/recovery state checks pass |
| Municipal task and daily settlement | Implemented | Automated day/task checks pass |
| Resident/cat interactions and animations | Implemented | Visual/animation quality is not independently certified |
| Orchard gathering and sky rainwater | Implemented | Gathering/day reset state checks pass |
| Collector flicker correction | Revised | Discrete atlas cells and stable collecting pose tested in a mocked DOM; real-browser follow-up pending |
| Feather neighboring-art fragment | Revised | Intrinsic SVG viewport replaces ineffective CSS-only crop; author accepted revised local preview |
| Six-plot gesture garden and shared inventory | Implemented | Model/bridge tests pass, including duplicate and overflow handling |
| Live camera gestures | Implemented, device-dependent | Needs network, camera permission and real-device validation |
| Persistent progress | Implemented | Automated restore/malformed-save checks pass; close/reopen browser route pending |
| English runtime interface | Implemented | Runtime Han-character scan passes; illustrated source art retained |
| Quota–warmth choice understood by new player | Not validated | Teacher-prioritized first-time player study remains pending |
| Full enforcement of every concept rule | Not claimed | Weekly suspicion/closure mechanics in the original brief are design intent, not certified implementation |

Do not interpret a successful logic test as a completed visual, touch, camera or usability test.
