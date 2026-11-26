# Iteration 04 — Editable Source

This directory contains the exact 52 files extracted from the latest source archive, **[4-LATEST-Source.zip](https://github.com/sd5913/Misery-Co./blob/main/4-LATEST-Source.zip)**. Browse **[misery-complete/](misery-complete/)** to inspect the HTML, CSS, JavaScript, camera gesture modules, artwork and checks without unpacking a ZIP. This README is additional navigation; the extracted files are unchanged.

## Start here

- **[Game entry and scene structure](misery-complete/index.html)**
- **[Game state, inventory, recipes and daily management](misery-complete/game.js)**
- **[Main interface and crafting interactions](misery-complete/ui.js)**
- **[Orchard gathering](misery-complete/orchard.js)**
- **[Garden inventory/message bridge](misery-complete/garden-bridge.js)**
- **[Garden gesture interface](misery-complete/field/app.mjs)**
- **[Six-bed planting state](misery-complete/field/engine.mjs)**
- **[Camera recognition loader](misery-complete/field/recognition.mjs)**
- **[Art assets](misery-complete/assets/)**

## Run the editable source

From `4-LATEST-Source/misery-complete/`:

```sh
python3 -m http.server 8776 --bind 127.0.0.1
```

Open **http://localhost:8776/** in desktop Chrome. Allow the camera when using the gesture garden. The recognition engine/model still need an internet connection. Close the server with **Ctrl+C**.

## Play the packaged build

For a single-file download, use **[4-LATEST-Start-Game.html](https://github.com/sd5913/Misery-Co./blob/main/4-LATEST-Start-Game.html)** in the branch root. This upload preserves that packaged game and the original source ZIP.

## Package this source

```sh
python3 tools/package_complete.py
```

Use **`package_complete.py`** for this integrated version. The other packaging scripts were retained from earlier iterations and are not the current full-game packaging entry.

The script generates a standalone file named `开始游戏.html`; the published branch-root copy was renamed `4-LATEST-Start-Game.html` for iteration order. `field/掌心花田-直接打开.html` is a generated garden page included in the archive, not the primary editable garden source.

## Checks

Run the included checks from `4-LATEST-Source/`:

```sh
node misery-complete/tools/verify.cjs
node misery-complete/tools/verify-garden.cjs
node misery-complete/tools/verify-bridge.cjs
```

These three checks passed against the extracted files before this upload. They check state/model behavior and message handling; they are not a browser or live-camera playtest. Original artwork, guides and validation notes are retained in the extracted source.
