# Assets and dependencies

The original [project brief and AI disclosure](ORIGINAL_PROJECT_BRIEF.md) is preserved. The team supplied and directed the game concept, character references, storyboard and visual requirements. ChatGPT/Gemini image-generation and coding assistance were used during iteration; no claim of entirely manual artwork is made.

The English revision retains the baseline hand-drawn assets. `material-feather-clean.svg` embeds the original feather PNG and clips the neighboring fragment; it does not redraw the feather. The shop's English label is a code overlay.

Hand tracking loads MediaPipe Tasks Vision and its hand-landmarker model over the network. The source URLs are visible in [recognition.mjs](../src/field/recognition.mjs). Upstream: [MediaPipe](https://github.com/google-ai-edge/mediapipe), Apache-2.0 project; model and distribution terms remain those of their respective upstream artifacts. No hand-tracking library/model authorship is claimed by the team.

No additional third-party art provenance or individual contribution credit is invented. The team should confirm its final asset rights and actual contributor records before final submission.
