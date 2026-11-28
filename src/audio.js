/* Background music and UI click sound, with a shared mute toggle. */
(function () {
  'use strict';
  var audio = document.getElementById('bgm');
  var sfx = document.getElementById('sfx');
  var button = document.getElementById('bgmToggle');
  if (!audio || !button) return;

  audio.volume = 0.22;
  audio.loop = true;
  if (sfx) sfx.volume = 0.3;

  var started = false;
  function start() {
    if (started) return;
    started = true;
    var promise = audio.play();
    if (promise && typeof promise.catch === 'function') promise.catch(function () {});
  }
  document.addEventListener('pointerdown', start, { once: true });
  document.addEventListener('keydown', start, { once: true });

  var muted = false;
  function playSfx() {
    if (muted || !sfx) return;
    sfx.pause();
    sfx.currentTime = 0;
    var promise = sfx.play();
    if (promise && typeof promise.catch === 'function') promise.catch(function () {});
  }
  var clickable = 'button,[data-action],[data-scene],[data-drag],[data-drop],[role="button"],[tabindex="0"]';
  document.addEventListener('pointerdown', function (event) {
    var t = event.target;
    if (!t || !t.closest) return;
    if (t.closest('#bgmToggle')) return;
    if (t.closest(clickable)) playSfx();
  }, true);

  button.addEventListener('click', function (event) {
    event.stopPropagation();
    start();
    muted = !muted;
    audio.muted = muted;
    if (sfx) sfx.muted = muted;
    button.style.opacity = muted ? '.45' : '1';
    button.style.textDecoration = muted ? 'line-through' : 'none';
    button.setAttribute('aria-label', muted ? 'Unmute sound' : 'Mute sound');
    button.title = muted ? 'Sound off' : 'Sound on';
  });
})();
