# Misery & Co. — English presentation source

This is the integrated garden prototype localized for the class presentation. See [PLAY_GUIDE_EN.md](PLAY_GUIDE_EN.md) for controls and [VALIDATION.md](VALIDATION.md) for the scope of checks.

## Run source

From this directory:

```sh
python3 -m http.server 8776 --bind 127.0.0.1
```

Open http://localhost:8776/ in desktop Chrome. Camera tracking needs permission and network access for the MediaPipe engine/model. No video upload is implemented.

## Source map

- `game.js`: state, inventory, recipes, customers and daily management.
- `ui.js`, `icons.js`, `index.html`, CSS: main interface.
- `orchard.js`: orchard movement and gathering; full-cell collector animation.
- `residents.js`: town residents and the shop cat.
- `garden-bridge.js`: shared inventory and garden messaging.
- `field/*.mjs`: garden state, gestures and camera loading.
- `tools/package_complete.py`: build the English standalone game and editable source ZIP.

Run all included checks with `node tools/verify.cjs`, `node tools/verify-garden.cjs`, `node tools/verify-bridge.cjs` and `node tools/verify-presentation.cjs`.

The generated `field/garden-standalone.html` is a build artifact; edit `field/index.html`, `field/app.mjs`, `field/engine.mjs`, `field/recognition.mjs` and `field/style.css` instead. The main downloadable game is `4-LATEST-Start-Game.html` at the build output path `dist/4-LATEST-Start-Game.html` (published as root `Start-Game.html`). The English edition keeps the existing save key and gameplay rules.
