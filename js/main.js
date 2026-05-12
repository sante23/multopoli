// ============================================================
// MULTOPOLI — Main Entry Point
// Bootstrap, game loop, event handlers, audio integration
// ============================================================

import {
  getState, resetState, tick, doClick, buyUpgrade, organizzaSagra,
  loadGame, saveGame, hasSave, recalcMPS, applyEventChoice
} from './game.js';

import {
  cacheDOM, buildTownMap, buildUpgradePanel, spawnPedestrians,
  updateHUD, updateUpgrades, updatePhaseVisuals, updatePedestrians,
  animateShopClosure, showNews, showAchievement, animateFine,
  animateAutoFine, showSagra, showSichelgaita, showDrogoneView,
  showEndScreen, showStartScreen, showGameScreen, getShareText,
  applySavedState, showCombo, screenShake, spawnParticles,
  showClosureOverlay, showRandomEvent, updateVigili
} from './render.js';

import {
  playClick, playCoin, playCombo, playSaracinesca, playAchievement,
  playBuy, playSagra, playGameOver, playSichelgaita, toggleMute, isMuted
} from './audio.js';

// ----- Bootstrap -----
document.addEventListener('DOMContentLoaded', () => {
  cacheDOM();
  setupGlobalEvents();
  init();
});

function init() {
  const saved = hasSave();
  showStartScreen(saved);
}

function setupGlobalEvents() {
  document.getElementById('btn-start').addEventListener('click', () => {
    resetState();
    startGame();
  });

  document.getElementById('btn-continue').addEventListener('click', () => {
    loadGame();
    startGame();
  });

  document.getElementById('btn-restart').addEventListener('click', () => {
    resetState();
    document.getElementById('end-screen').style.display = 'none';
    startGame();
  });

  document.getElementById('btn-share').addEventListener('click', () => {
    const text = getShareText();
    const url = window.location.href;
    const whatsappUrl = 'https://wa.me/?text=' + encodeURIComponent(text + '\n' + url);
    window.open(whatsappUrl, '_blank');
  });

  // Mute button
  document.getElementById('btn-mute').addEventListener('click', () => {
    const muted = toggleMute();
    document.getElementById('btn-mute').textContent = muted ? '\u{1F507}' : '\u{1F50A}';
  });

  // Game event delegation (set once, works with rebuilt DOM)
  document.getElementById('town-map').addEventListener('click', (e) => {
    const car = e.target.closest('.car');
    if (!car) {
      const torre = e.target.closest('.torre');
      if (torre) handleTorreClick();
      return;
    }
    handleCarClick(car);
  });

  document.getElementById('upgrade-list').addEventListener('click', (e) => {
    const item = e.target.closest('.upgrade-item');
    if (!item) return;
    handleUpgradeClick(item.dataset.upgradeId);
  });

  document.getElementById('btn-sagra').addEventListener('click', handleSagra);

  const toggle = document.getElementById('upgrade-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const panel = document.getElementById('upgrade-panel');
      panel.classList.toggle('open');
      toggle.classList.toggle('open');
    });
  }

  // Random event buttons
  document.getElementById('event-btn-a').addEventListener('click', () => handleEventChoice('a'));
  document.getElementById('event-btn-b').addEventListener('click', () => handleEventChoice('b'));
}

function startGame() {
  showGameScreen();
  buildTownMap();
  buildUpgradePanel();
  recalcMPS();

  applySavedState();

  startGameLoop();

  updateHUD();
  updateUpgrades();
  updatePhaseVisuals(true);
  updateVigili();
}

// ----- Event Handlers -----
function handleCarClick(carEl) {
  const result = doClick();
  if (!result) return;

  // Audio
  playClick();
  if (result.comboLevel >= 2) {
    playCoin();
    playCombo(result.comboLevel);
  }

  // Visual feedback
  animateFine(carEl, result.guadagno);
  screenShake(Math.min(result.comboLevel, 3));
  if (result.comboLevel >= 2) {
    spawnParticles(carEl, result.comboLevel);
  }
  showCombo(result.comboCount, result.comboMultiplier);
  updateHUD();

  // Hide hint on first click
  const hint = document.getElementById('click-hint');
  if (hint) {
    hint.style.opacity = '0';
    setTimeout(() => { if (hint.parentNode) hint.remove(); }, 500);
  }

  // Fullone easter egg
  const state = getState();
  const carId = carEl.dataset.carId;
  state.carClickCounts[carId] = (state.carClickCounts[carId] || 0) + 1;
  if (state.carClickCounts[carId] >= 30 && !state.fulloneTriggered) {
    state.fulloneTriggered = true;
    triggerFullone(carEl);
  }
}

function handleUpgradeClick(upgradeId) {
  const bought = buyUpgrade(upgradeId);
  if (!bought) return;

  playBuy();
  updateHUD();
  updateUpgrades();
  updateVigili();

  const el = document.getElementById('upgrade-' + upgradeId);
  if (el) {
    el.classList.add('just-bought');
    setTimeout(() => el.classList.remove('just-bought'), 300);
  }
}

function handleSagra() {
  const result = organizzaSagra();
  if (!result) return;
  playSagra();
  showSagra();
  updateHUD();
  updateUpgrades();
}

function handleTorreClick() {
  const state = getState();
  state.clicksSuTorre++;
  if (state.clicksSuTorre >= 50) {
    showDrogoneView();
    state.clicksSuTorre = 0;
  }
}

// ----- Random Event Handling -----
let currentEvent = null;

function handleRandomEvent(event) {
  currentEvent = event;
  showRandomEvent(event);
}

function handleEventChoice(choice) {
  if (!currentEvent) return;
  const option = choice === 'a' ? currentEvent.optionA : currentEvent.optionB;
  applyEventChoice(option);

  // Show response
  const responseEl = document.getElementById('event-response');
  responseEl.textContent = option.response;
  responseEl.classList.add('show');

  // Play appropriate sound
  if (option.vitalita > 0) playSagra();
  else playSaracinesca();

  // Close modal after delay
  setTimeout(() => {
    document.getElementById('event-modal').classList.remove('active');
    responseEl.classList.remove('show');
    currentEvent = null;
    updateHUD();
  }, 2500);
}

// ----- Fullone Easter Egg -----
function triggerFullone(carEl) {
  carEl.classList.add('fullone-fall');
  setTimeout(() => {
    carEl.style.opacity = '0';
    const splash = document.createElement('div');
    splash.className = 'splash-text';
    splash.textContent = 'SPLASH! (Fiume Fullone)';
    carEl.parentElement.appendChild(splash);
    setTimeout(() => splash.remove(), 3000);
  }, 600);
}

// ----- Game Loop -----
let gameLoopInterval = null;
let saveInterval = null;
let autoFineInterval = null;
let renderFrame = null;
let lastPedestrianUpdate = 0;

function startGameLoop() {
  stopGameLoop();

  gameLoopInterval = setInterval(gameTick, 100);
  saveInterval = setInterval(saveGame, 5000);

  autoFineInterval = setInterval(() => {
    const state = getState();
    if (state.multePerSecondo > 0 && !state.sagraAttiva && !state.gameOver) {
      animateAutoFine();
    }
  }, 500);

  function renderLoop() {
    updateHUD();
    renderFrame = requestAnimationFrame(renderLoop);
  }
  renderFrame = requestAnimationFrame(renderLoop);
}

function stopGameLoop() {
  if (gameLoopInterval) clearInterval(gameLoopInterval);
  if (saveInterval) clearInterval(saveInterval);
  if (autoFineInterval) clearInterval(autoFineInterval);
  if (renderFrame) cancelAnimationFrame(renderFrame);
}

// ----- Closure queue (dramatic, one at a time) -----
let closureQueue = [];
let closureActive = false;

function queueClosure(shop) {
  closureQueue.push(shop);
  if (!closureActive) processNextClosure();
}

function processNextClosure() {
  if (closureQueue.length === 0) {
    closureActive = false;
    return;
  }
  closureActive = true;
  const shop = closureQueue.shift();

  playSaracinesca();
  animateShopClosure(shop);
  showClosureOverlay(shop);

  setTimeout(() => processNextClosure(), 4000);
}

function gameTick() {
  const result = tick();

  // Shop closures (dramatic queue)
  result.closures.forEach(shop => queueClosure(shop));

  // News
  if (result.news) showNews(result.news);

  // Achievements
  result.achievements.forEach(ach => {
    showAchievement(ach);
    playAchievement();
  });

  // Sichelgaita
  if (result.sichelgaita) {
    showSichelgaita();
    playSichelgaita();
  }

  // Random events
  if (result.randomEvent && !closureActive) {
    handleRandomEvent(result.randomEvent);
  }

  updateUpgrades();
  updatePhaseVisuals();

  const now = Date.now();
  if (now - lastPedestrianUpdate > 2000) {
    updatePedestrians();
    lastPedestrianUpdate = now;
  }

  if (result.gameOver) {
    stopGameLoop();
    playGameOver();
    saveGame();
    localStorage.removeItem('multopoli_save');
    setTimeout(() => showEndScreen(), 2500);
  }
}
