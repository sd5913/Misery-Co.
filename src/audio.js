/* Sound settings: independent BGM / UI-sound toggles and volumes, remembered locally. */
(function () {
  'use strict';
  var audio = document.getElementById('bgm');
  var sfx = document.getElementById('sfx');
  var button = document.getElementById('bgmToggle');
  var panel = document.getElementById('soundPanel');
  var bgmSwitch = document.getElementById('bgmSwitch');
  var sfxSwitch = document.getElementById('sfxSwitch');
  var bgmVolume = document.getElementById('bgmVolume');
  var sfxVolume = document.getElementById('sfxVolume');
  var bgmValue = document.getElementById('bgmValue');
  var sfxValue = document.getElementById('sfxValue');
  var closeBtn = document.getElementById('soundPanelClose');
  if (!audio || !button) return;

  var KEY = 'misery-sound';
  var config = { bgmOn: true, sfxOn: true, bgmVol: 22, sfxVol: 30 };
  try {
    var saved = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (saved) {
      if (typeof saved.bgmOn === 'boolean') config.bgmOn = saved.bgmOn;
      if (typeof saved.sfxOn === 'boolean') config.sfxOn = saved.sfxOn;
      if (typeof saved.bgmVol === 'number') config.bgmVol = Math.min(100, Math.max(0, saved.bgmVol));
      if (typeof saved.sfxVol === 'number') config.sfxVol = Math.min(100, Math.max(0, saved.sfxVol));
    }
  } catch (e) {}

  audio.loop = true;

  function persist() {
    try { localStorage.setItem(KEY, JSON.stringify(config)); } catch (e) {}
  }
  function apply() {
    audio.volume = config.bgmVol / 100;
    audio.muted = !config.bgmOn;
    if (sfx) { sfx.volume = config.sfxVol / 100; sfx.muted = !config.sfxOn; }
    if (bgmVolume) bgmVolume.value = config.bgmVol;
    if (sfxVolume) sfxVolume.value = config.sfxVol;
    if (bgmValue) bgmValue.textContent = config.bgmVol + '%';
    if (sfxValue) sfxValue.textContent = config.sfxVol + '%';
    if (bgmSwitch) {
      bgmSwitch.classList.toggle('off', !config.bgmOn);
      bgmSwitch.setAttribute('aria-pressed', String(config.bgmOn));
    }
    if (sfxSwitch) {
      sfxSwitch.classList.toggle('off', !config.sfxOn);
      sfxSwitch.setAttribute('aria-pressed', String(config.sfxOn));
    }
    var anyOn = config.bgmOn || config.sfxOn;
    button.style.opacity = anyOn ? '1' : '.45';
    button.setAttribute('aria-label', 'Sound settings: music ' + (config.bgmOn ? 'on' : 'off') + ', UI sound ' + (config.sfxOn ? 'on' : 'off'));
    button.title = anyOn ? 'Sound settings' : 'Sound off';
  }
  apply();

  var started = false;
  function start() {
    if (!config.bgmOn) return;
    if (started && !audio.paused) return;
    var promise = audio.play();
    if (promise && typeof promise.catch === 'function') {
      promise.then(function () { started = true; }).catch(function () { started = false; });
    } else {
      started = true;
    }
  }
  document.addEventListener('pointerdown', start);
  document.addEventListener('keydown', start);

  function playSfx() {
    if (!config.sfxOn || !sfx) return;
    sfx.pause();
    sfx.currentTime = 0;
    var promise = sfx.play();
    if (promise && typeof promise.catch === 'function') promise.catch(function () {});
  }
  var clickable = 'button,[data-action],[data-scene],[data-drag],[data-drop],[role="button"],[tabindex="0"]';
  document.addEventListener('pointerdown', function (event) {
    var t = event.target;
    if (!t || !t.closest) return;
    if (t.closest('#soundPanel') || t.closest('#bgmToggle')) return;
    if (t.closest(clickable)) playSfx();
  }, true);

  function setPanel(open) {
    if (!panel) return;
    panel.hidden = !open;
    button.setAttribute('aria-expanded', String(open));
  }
  button.addEventListener('click', function (event) {
    event.stopPropagation();
    setPanel(panel ? panel.hidden : false);
    start();
  });
  if (closeBtn) closeBtn.addEventListener('click', function (event) {
    event.stopPropagation();
    setPanel(false);
  });
  document.addEventListener('click', function (event) {
    if (!event.target || !event.target.closest) return;
    if (!event.target.closest('.sound-wrap')) setPanel(false);
  });

  if (bgmSwitch) bgmSwitch.addEventListener('click', function (event) {
    event.stopPropagation();
    config.bgmOn = !config.bgmOn;
    if (config.bgmOn) start(); else audio.pause();
    apply(); persist();
  });
  if (sfxSwitch) sfxSwitch.addEventListener('click', function (event) {
    event.stopPropagation();
    config.sfxOn = !config.sfxOn;
    apply(); persist();
  });
  if (bgmVolume) bgmVolume.addEventListener('input', function () {
    config.bgmVol = Number(this.value);
    apply(); persist();
  });
  if (sfxVolume) sfxVolume.addEventListener('input', function () {
    config.sfxVol = Number(this.value);
    apply(); persist();
  });
})();
