# Development process

## Current delivery — 26 November 2026

The author requested the approved English team preview on `main`, with editable source and clear reviewer entry points. No new branch is created for this delivery. Earlier experiments remain on `demo/orchard-animation`.

| Observation | Decision and change | Evidence / next action |
| --- | --- | --- |
| Teacher Issue #2 could not identify one current demo or inspect ZIP-only code | Select Iteration 04 and publish a root playable HTML, a ZIP, and normal `src/` files | README links player guide, feature status, test record and source |
| Prior main README mixed concept promises with outdated operation instructions | Preserve the original brief; make current README describe the selected implementation | Do not treat weekly suspicion/closure concepts as proven runtime behavior |
| Author needs English for presentation | Translate runtime messages, labels, names and instructions while preserving supplied art | Automated runtime text scan; team review still needed |
| Feather showed a neighboring sprite fragment | CSS-only crop was insufficient; use an intrinsic SVG viewport with the original embedded PNG | Author accepted revised local preview; browser regression remains in test plan |
| Collector flashed during gathering | Replace interpolated atlas positions and brightness cycling with discrete cells and a stable collection pose | Mocked animation checks pass; repeated real-browser gathering still pending |
| Evidence mixed automated and human checks | Report each category separately and leave unperformed participant tests pending | Independent full-day playtest is next |

## Next team actions

- Project lead: assign an independent playtest facilitator and tester on the [team board](https://github.com/orgs/sd5913/projects/30/views/1). No owner has been assigned by this publication.
- Assigned facilitator: run the scenarios in [TEST_RECORDS.md](docs/TEST_RECORDS.md), record actual observations and the tested commit.
- Team: decide whether quota versus warmth has a real understandable consequence; prioritize the observed issue before adding more features.
- Developers: fix reproducible failures, rerun affected checks, then update the source and generated distribution together.

## History and provenance

The baseline integrated source is `717a03884ec370228ab5fe8ab14f7b573658282e` on `demo/orchard-animation`; the English revision retains the existing gameplay/save rules. Iterations 1–3 remain historical prototypes. The earlier brief and tutorial log are preserved in [ORIGINAL_PROJECT_BRIEF.md](docs/ORIGINAL_PROJECT_BRIEF.md); future-week plans there are not evidence of completed work.

## AI assistance

ChatGPT/Codex assisted with implementation, translation, packaging, automated checks and this documentation under the author's direction. Supplied references and feedback determined the visual constraints and revisions. Automated checks and author approval are recorded without claiming a participant test or inventing individual contribution records.
