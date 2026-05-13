// ============================================================
// MULTOPOLI — Main Entry Point
// Bootstrap, game loop, all event handlers
// ============================================================

import {
  getState, resetState, tick, doClick, buyUpgrade, organizzaSagra,
  loadGame, saveGame, hasSave, recalcMPS, applyEventChoice,
  riceviComitato, applyComitatoAction, applyCartaChoice, calcScore,
  scopriMonumento, assignSfide, updateProfile, addNewsLog
} from './game.js';

import {
  cacheDOM, buildTownMap, buildUpgradePanel, spawnPedestrians,
  updateHUD, updateUpgrades, updatePhaseVisuals, updatePedestrians,
  animateShopClosure, showNews, showAchievement, animateFine,
  animateAutoFine, showSagra, showSichelgaita, showDrogoneView,
  showEndScreen, showStartScreen, showGameScreen, getShareText,
  applySavedState, showCombo, screenShake, spawnParticles,
  showClosureOverlay, showRandomEvent, updateVigili,
  toggleAchievementPanel, showRossoMessage, showComitatoAction,
  showCarta, fetchLeaderboard, submitScore, renderLeaderboard,
  showMonumentoPanel, hideMonumentoPanel, toggleNewsLog, showRossoUpgradeReaction
} from './render.js';

import { MONUMENTI } from './data.js';

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

  // Mute
  document.getElementById('btn-mute').addEventListener('click', () => {
    const muted = toggleMute();
    document.getElementById('btn-mute').textContent = muted ? '\u{1F507}' : '\u{1F50A}';
  });

  // Achievement panel
  document.getElementById('btn-achievements').addEventListener('click', toggleAchievementPanel);
  document.getElementById('ach-close').addEventListener('click', toggleAchievementPanel);
  document.getElementById('btn-newslog').addEventListener('click', toggleNewsLog);
  document.getElementById('newslog-close').addEventListener('click', toggleNewsLog);

  // Monumento panel close
  document.getElementById('monumento-close').addEventListener('click', hideMonumentoPanel);

  // Game event delegation
  document.getElementById('town-map').addEventListener('click', (e) => {
    // Check monument click first
    const landmark = e.target.closest('.landmark-clickable');
    if (landmark && landmark.dataset.monumento) {
      handleMonumentoClick(landmark.dataset.monumento);
      return;
    }
    const car = e.target.closest('.car');
    if (!car) return;
    handleCarClick(car);
  });

  document.getElementById('upgrade-list').addEventListener('click', (e) => {
    const item = e.target.closest('.upgrade-item');
    if (!item) return;
    handleUpgradeClick(item.dataset.upgradeId);
  });

  document.getElementById('btn-sagra').addEventListener('click', handleSagra);
  document.getElementById('btn-comitato').addEventListener('click', handleRiceviComitato);

  const toggle = document.getElementById('upgrade-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      document.getElementById('upgrade-panel').classList.toggle('open');
      toggle.classList.toggle('open');
    });
  }

  // Random event buttons
  document.getElementById('event-btn-a').addEventListener('click', () => handleEventChoice('a'));
  document.getElementById('event-btn-b').addEventListener('click', () => handleEventChoice('b'));

  // Carta azione buttons
  document.getElementById('carta-btn-a').addEventListener('click', () => handleCartaChoice('a'));
  document.getElementById('carta-btn-b').addEventListener('click', () => handleCartaChoice('b'));

  // Save record
  document.getElementById('btn-save-record').addEventListener('click', handleSaveRecord);
}

function startGame() {
  showGameScreen();
  buildTownMap();
  buildUpgradePanel();
  recalcMPS();
  applySavedState();
  const s = getState();
  if (s.sfideAssegnate.length === 0) assignSfide();
  startGameLoop();
  updateHUD();
  updateUpgrades();
  updatePhaseVisuals(true);
  updateVigili();
}

// ----- Click Handler -----
function handleCarClick(carEl) {
  const result = doClick();
  if (!result) return;

  playClick();
  if (result.comboLevel >= 2) {
    playCoin();
    playCombo(result.comboLevel);
  }

  animateFine(carEl, result.guadagno);
  screenShake(Math.min(result.comboLevel, 3));
  if (result.comboLevel >= 2) spawnParticles(carEl, result.comboLevel);
  showCombo(result.comboCount, result.comboMultiplier);
  updateHUD();

  // Hide hint
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
  showRossoUpgradeReaction(upgradeId);
  const el = document.getElementById('upgrade-' + upgradeId);
  if (el) {
    el.classList.add('just-bought');
    setTimeout(() => el.classList.remove('just-bought'), 300);
  }
}

function handleSagra() {
  if (!organizzaSagra()) return;
  playSagra();
  showSagra();
  updateHUD();
  updateUpgrades();
}

function handleRiceviComitato() {
  if (!riceviComitato()) return;
  showNews({ text: "Il sindaco riceve il Comitato Commercianti. Rosso parla per venti minuti." });
  updateHUD();
}

function handleMonumentoClick(monumentoId) {
  const monumento = MONUMENTI.find(m => m.id === monumentoId);
  if (!monumento) return;
  const isNew = scopriMonumento(monumentoId);
  if (isNew) {
    playAchievement();
    updateHUD();
  }
  showMonumentoPanel(monumento, isNew);

  // Torre easter egg still works (counts behind the scenes)
  if (monumentoId === 'torre') {
    const state = getState();
    state.clicksSuTorre++;
    if (state.clicksSuTorre >= 50) {
      showDrogoneView();
      state.clicksSuTorre = 0;
    }
  }
}

// ----- Random Event -----
let currentEvent = null;
function handleRandomEvent(event) {
  currentEvent = event;
  showRandomEvent(event);
}

function handleEventChoice(choice) {
  if (!currentEvent) return;
  const option = choice === 'a' ? currentEvent.optionA : currentEvent.optionB;
  applyEventChoice(option);
  const responseEl = document.getElementById('event-response');
  responseEl.textContent = option.response;
  responseEl.classList.add('show');
  if (option.vitalita > 0) playSagra(); else playSaracinesca();
  setTimeout(() => {
    document.getElementById('event-modal').classList.remove('active');
    responseEl.classList.remove('show');
    currentEvent = null;
    updateHUD();
  }, 2500);
}

// ----- Carta Azione -----
let currentCarta = null;
function handleCarta(carta) {
  currentCarta = carta;
  showCarta(carta);
}

function handleCartaChoice(choice) {
  if (!currentCarta) return;
  const option = choice === 'a' ? currentCarta.optionA : currentCarta.optionB;
  applyCartaChoice(option.effetto);
  const responseEl = document.getElementById('carta-response');
  responseEl.textContent = option.response;
  responseEl.classList.add('show');
  playBuy();
  setTimeout(() => {
    document.getElementById('carta-modal').classList.remove('active');
    responseEl.classList.remove('show');
    currentCarta = null;
    updateHUD();
  }, 2500);
}

// ----- Leaderboard -----
async function handleSaveRecord() {
  const nameInput = document.getElementById('end-name');
  const name = (nameInput.value || '').trim();
  if (!name) { nameInput.focus(); return; }

  const stats = { ...getState() };
  const score = calcScore();
  const ok = await submitScore(name, score, {
    multe: Math.floor(stats.multeTotali),
    cassa: stats.cassaTotale,
    durata: Math.floor((Date.now() - stats.startTime) / 1000),
  });

  const msg = document.getElementById('record-saved-msg');
  if (ok) {
    msg.textContent = 'Record salvato!';
    msg.style.color = '#27AE60';
    document.getElementById('btn-save-record').disabled = true;
    // Refresh leaderboard
    const entries = await fetchLeaderboard();
    renderLeaderboard(entries);
  } else {
    msg.textContent = 'Errore. Riprova.';
    msg.style.color = '#E74C3C';
  }
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

// ----- Closure queue (with 5s cooldown — no other popups during closures) -----
let closureQueue = [];
let closureActive = false;
let closureCooldownUntil = 0;

function queueClosure(shop) {
  closureQueue.push(shop);
  if (!closureActive) processNextClosure();
}

function processNextClosure() {
  if (closureQueue.length === 0) {
    closureActive = false;
    closureCooldownUntil = Date.now() + 5000; // 5s cooldown after last closure
    return;
  }
  closureActive = true;
  const shop = closureQueue.shift();
  playSaracinesca();
  animateShopClosure(shop);
  showClosureOverlay(shop);
  setTimeout(() => processNextClosure(), 4000);
}

function isClosureCooldown() {
  return closureActive || Date.now() < closureCooldownUntil;
}

function gameTick() {
  const result = tick();

  // Shop closures
  result.closures.forEach(shop => queueClosure(shop));

  // News
  if (result.news) {
    showNews(result.news);
    addNewsLog(result.news.text);
  }

  // Achievements
  result.achievements.forEach(ach => {
    showAchievement(ach);
    playAchievement();
  });

  // Sichelgaita
  if (result.sichelgaita) { showSichelgaita(); playSichelgaita(); }

  // Comitato
  if (result.comitatoAction) {
    applyComitatoAction(result.comitatoAction);
    showComitatoAction(result.comitatoAction);
    playSaracinesca();
  }
  if (result.rossoMsg) showRossoMessage(result.rossoMsg);

  // Random events (respect closure cooldown)
  if (result.randomEvent && !isClosureCooldown()) handleRandomEvent(result.randomEvent);

  // Carte azione (respect closure cooldown)
  if (result.carta && !isClosureCooldown() && !currentEvent) handleCarta(result.carta);

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
    updateProfile();
    saveGame();
    localStorage.removeItem('multopoli_save');
    setTimeout(async () => {
      showEndScreen();
      const entries = await fetchLeaderboard();
      renderLeaderboard(entries);
    }, 2500);
  }
}
