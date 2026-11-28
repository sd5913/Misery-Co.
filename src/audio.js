/* Background music: loop after the first player interaction, with a mute toggle. */
(function () {
  'use strict';
  var audio = document.getElementById('bgm');
  var button = document.getElementById('bgmToggle');
  if (!audio || !button) return;

  audio.volume = 0.22;
  audio.loop = true;

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
  button.addEventListener('click', function (event) {
    event.stopPropagation();
    start();
    muted = !muted;
    audio.muted = muted;
    button.style.opacity = muted ? '.45' : '1';
    button.style.textDecoration = muted ? 'line-through' : 'none';
    button.setAttribute('aria-label', muted ? 'Unmute background music' : 'Mute background music');
    button.title = muted ? 'Music off' : 'Music on';
  });
})();
