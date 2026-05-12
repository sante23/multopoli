// ============================================================
// MULTOPOLI — Rendering System
// DOM updates, animations, visual degradation
// ============================================================

import { UPGRADES, SHOPS, PIAZZAS, CAR_COLORS, ACHIEVEMENTS } from './data.js';
import { getState, getUpgradeCost, getSagraCost, getPhase, getEndStats } from './game.js';

// ----- Cached DOM refs -----
let els = {};

export function cacheDOM() {
  els = {
    startScreen: document.getElementById('start-screen'),
    gameScreen: document.getElementById('game-screen'),
    endScreen: document.getElementById('end-screen'),
    btnStart: document.getElementById('btn-start'),
    btnContinue: document.getElementById('btn-continue'),
    btnRestart: document.getElementById('btn-restart'),
    btnShare: document.getElementById('btn-share'),
    hudCassa: document.getElementById('hud-cassa'),
    hudVitalita: document.getElementById('hud-vitalita'),
    hudVitalitaBar: document.getElementById('hud-vitalita-fill'),
    hudMulte: document.getElementById('hud-multe'),
    hudMps: document.getElementById('hud-mps'),
    townMap: document.getElementById('town-map'),
    townFilter: document.getElementById('town-filter'),
    upgradeList: document.getElementById('upgrade-list'),
    btnSagra: document.getElementById('btn-sagra'),
    newsTicker: document.getElementById('news-ticker'),
    newsText: document.getElementById('news-text'),
    achievementContainer: document.getElementById('achievement-container'),
    pedestriansLayer: document.getElementById('pedestrians-layer'),
    endStats: document.getElementById('end-stats'),
    endQuote: document.getElementById('end-quote'),
    endTitle: document.getElementById('end-title'),
    sagraOverlay: document.getElementById('sagra-overlay'),
    sichelgaitaOverlay: document.getElementById('sichelgaita-overlay'),
    upgradeToggle: document.getElementById('upgrade-toggle'),
    upgradePanel: document.getElementById('upgrade-panel'),
  };
}

// ----- Number Formatting -----
function formatNumber(n) {
  if (n >= 1000000000) return (n / 1000000000).toFixed(1) + ' Mld';
  if (n >= 1000000) return (n / 1000000).toFixed(1) + ' M';
  if (n >= 10000) return (n / 1000).toFixed(1) + 'k';
  return Math.floor(n).toLocaleString('it-IT');
}

function formatDuration(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  if (min === 0) return sec + 's';
  return min + 'm ' + sec + 's';
}

// ----- Build Town Map -----
export function buildTownMap() {
  const map = els.townFilter;
  if (!map) return;
  map.innerHTML = '';

  // Torre di Drogone
  const torre = document.createElement('div');
  torre.className = 'landmark torre';
  torre.id = 'torre-drogone';
  torre.innerHTML = `
    <div class="torre-structure">
      <div class="torre-top"></div>
      <div class="torre-body"></div>
      <div class="torre-base"></div>
    </div>
    <span class="landmark-label">Torre di Drogone</span>
  `;
  map.appendChild(torre);

  // Via connecting
  const via1 = document.createElement('div');
  via1.className = 'via-segment';
  via1.innerHTML = '<span class="via-label">Via Roberto il Guiscardo</span>';
  map.appendChild(via1);

  // Three piazzas
  PIAZZAS.forEach((piazza, pi) => {
    const piazzaEl = document.createElement('div');
    piazzaEl.className = 'piazza';
    piazzaEl.id = 'piazza-' + piazza.id;

    const label = document.createElement('div');
    label.className = 'piazza-label';
    label.textContent = piazza.label;
    piazzaEl.appendChild(label);

    const row = document.createElement('div');
    row.className = 'buildings-row';

    // Left buildings
    const leftCol = document.createElement('div');
    leftCol.className = 'building-col left';
    const shopsLeft = SHOPS.filter(s => s.piazza === piazza.id && s.slot % 2 === 0);
    shopsLeft.forEach(shop => {
      leftCol.appendChild(createBuilding(shop));
    });
    row.appendChild(leftCol);

    // Street with cars
    const street = document.createElement('div');
    street.className = 'street-area';
    for (let i = 0; i < piazza.carSlots; i++) {
      const carSlot = document.createElement('div');
      carSlot.className = 'car-slot';
      carSlot.dataset.piazza = piazza.id;
      carSlot.dataset.slot = i;
      const car = createCar(piazza.id + '-' + i);
      carSlot.appendChild(car);
      street.appendChild(carSlot);
    }
    row.appendChild(street);

    // Right buildings
    const rightCol = document.createElement('div');
    rightCol.className = 'building-col right';
    const shopsRight = SHOPS.filter(s => s.piazza === piazza.id && s.slot % 2 === 1);
    shopsRight.forEach(shop => {
      rightCol.appendChild(createBuilding(shop));
    });
    row.appendChild(rightCol);

    piazzaEl.appendChild(row);
    map.appendChild(piazzaEl);

    // Corso between piazzas
    if (pi < PIAZZAS.length - 1) {
      const corso = document.createElement('div');
      corso.className = 'corso-segment';
      corso.innerHTML = '<span class="corso-label">Corso Vittorio Emanuele III</span>';
      map.appendChild(corso);
    }
  });

  // Bottom landmarks
  const bottom = document.createElement('div');
  bottom.className = 'bottom-landmarks';
  bottom.innerHTML = `
    <div class="landmark fontana">
      <div class="fontana-body"></div>
      <span class="landmark-label">Fontana di Sichelgaita</span>
    </div>
    <div class="landmark convento">
      <div class="convento-body"></div>
      <span class="landmark-label">Convento dei Riformati</span>
    </div>
  `;
  map.appendChild(bottom);

  // Click hint (for new players)
  const oldHint = document.getElementById('click-hint');
  if (oldHint) oldHint.remove();
  const hint = document.createElement('div');
  hint.id = 'click-hint';
  hint.textContent = 'Clicca sulle macchine per multare!';
  els.townMap.appendChild(hint);

  // Festive bunting (phase 1)
  const bunting = document.createElement('div');
  bunting.className = 'bunting';
  bunting.id = 'bunting';
  for (let i = 0; i < 20; i++) {
    const flag = document.createElement('div');
    flag.className = 'bunting-flag';
    flag.style.setProperty('--hue', (i * 37) % 360);
    bunting.appendChild(flag);
  }
  map.appendChild(bunting);
}

function createBuilding(shop) {
  const el = document.createElement('div');
  el.className = 'building';
  el.id = 'building-' + shop.id;
  el.dataset.shopId = shop.id;

  // Windows
  const windowsRow = document.createElement('div');
  windowsRow.className = 'building-windows';
  for (let i = 0; i < 3; i++) {
    const w = document.createElement('div');
    w.className = 'building-window';
    windowsRow.appendChild(w);
  }
  el.appendChild(windowsRow);

  // Sign
  const sign = document.createElement('div');
  sign.className = 'shop-sign';
  sign.textContent = shop.tipo;
  el.appendChild(sign);

  // Name
  const name = document.createElement('div');
  name.className = 'shop-name';
  name.textContent = shop.nome;
  el.appendChild(name);

  // Door
  const door = document.createElement('div');
  door.className = 'building-door';
  el.appendChild(door);

  // Saracinesca (hidden initially)
  const saracinesca = document.createElement('div');
  saracinesca.className = 'saracinesca';
  el.appendChild(saracinesca);

  // CHIUSO/VENDESI label (hidden)
  const chiuso = document.createElement('div');
  chiuso.className = 'chiuso-label';
  chiuso.textContent = 'CHIUSO';
  el.appendChild(chiuso);

  return el;
}

function createCar(id) {
  const car = document.createElement('div');
  car.className = 'car';
  car.dataset.carId = id;
  const color = CAR_COLORS[Math.floor(Math.random() * CAR_COLORS.length)];
  car.style.backgroundColor = color;

  // Windshield
  const windshield = document.createElement('div');
  windshield.className = 'car-windshield';
  car.appendChild(windshield);

  return car;
}

// ----- Build Upgrade Panel -----
export function buildUpgradePanel() {
  const list = els.upgradeList;
  if (!list) return;
  list.innerHTML = '';

  UPGRADES.forEach(upg => {
    const item = document.createElement('div');
    item.className = 'upgrade-item';
    item.id = 'upgrade-' + upg.id;
    item.dataset.upgradeId = upg.id;
    item.innerHTML = `
      <div class="upgrade-header">
        <span class="upgrade-icon">${upg.icon}</span>
        <div class="upgrade-info">
          <span class="upgrade-name">${upg.nome}</span>
          <span class="upgrade-flavor">${upg.flavor}</span>
        </div>
      </div>
      <div class="upgrade-footer">
        <span class="upgrade-cost">${formatNumber(upg.costoBase)} \u20AC</span>
        <span class="upgrade-owned">x0</span>
        <span class="upgrade-mps">+${upg.multePerSec}/s</span>
      </div>
    `;
    list.appendChild(item);
  });
}

// ----- Spawn Pedestrians -----
let pedestrians = [];
export function spawnPedestrians(count) {
  const layer = els.pedestriansLayer;
  if (!layer) return;
  layer.innerHTML = '';
  pedestrians = [];

  for (let i = 0; i < count; i++) {
    const ped = document.createElement('div');
    ped.className = 'pedestrian';
    ped.style.left = (10 + Math.random() * 80) + '%';
    ped.style.top = (5 + Math.random() * 90) + '%';
    ped.style.animationDuration = (3 + Math.random() * 4) + 's';
    ped.style.animationDelay = (Math.random() * 3) + 's';
    const colors = ['#E8C39E', '#D4A373', '#B08968', '#8B6F47', '#6B4226', '#F5DEB3'];
    ped.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    layer.appendChild(ped);
    pedestrians.push(ped);
  }
}

// ----- Update HUD -----
export function updateHUD() {
  const s = getState();
  els.hudCassa.textContent = formatNumber(s.cassa) + ' \u20AC';
  els.hudVitalita.textContent = Math.ceil(s.vitalita);
  els.hudMulte.textContent = formatNumber(Math.floor(s.multeTotali));
  els.hudMps.textContent = formatNumber(s.multePerSecondo) + '/s';

  // Vitalita bar
  const pct = Math.max(0, s.vitalita);
  els.hudVitalitaBar.style.width = pct + '%';

  // Bar color
  if (pct > 60) els.hudVitalitaBar.style.backgroundColor = '#27AE60';
  else if (pct > 30) els.hudVitalitaBar.style.backgroundColor = '#F39C12';
  else els.hudVitalitaBar.style.backgroundColor = '#E74C3C';
}

// ----- Update Upgrades -----
export function updateUpgrades() {
  const s = getState();
  UPGRADES.forEach(upg => {
    const el = document.getElementById('upgrade-' + upg.id);
    if (!el) return;
    const cost = getUpgradeCost(upg.id);
    const owned = s.upgrades[upg.id] || 0;
    el.querySelector('.upgrade-cost').textContent = formatNumber(cost) + ' \u20AC';
    el.querySelector('.upgrade-owned').textContent = 'x' + owned;

    if (s.cassa >= cost) {
      el.classList.add('affordable');
      el.classList.remove('too-expensive');
    } else {
      el.classList.remove('affordable');
      el.classList.add('too-expensive');
    }
  });

  // Sagra button
  const sagraCost = getSagraCost();
  els.btnSagra.textContent = 'Organizza Sagra (' + formatNumber(sagraCost) + ' \u20AC)';
  if (s.cassa >= sagraCost && !s.sagraAttiva) {
    els.btnSagra.classList.add('affordable');
    els.btnSagra.disabled = false;
  } else {
    els.btnSagra.classList.remove('affordable');
    els.btnSagra.disabled = s.sagraAttiva;
  }
  if (s.sagraAttiva) {
    const remaining = Math.max(0, Math.ceil((s.sagraFine - Date.now()) / 1000));
    els.btnSagra.textContent = 'Sagra in corso! (' + remaining + 's)';
  }
}

// ----- Update Phase Visuals -----
let currentPhase = 1;
export function updatePhaseVisuals(force) {
  const phase = getPhase();
  if (!force && phase === currentPhase) return;
  currentPhase = phase;

  const map = els.townMap;
  map.dataset.phase = phase;

  map.classList.remove('phase-1', 'phase-2', 'phase-3', 'phase-4');
  map.classList.add('phase-' + phase);
}

// ----- Apply Saved State (on load) -----
export function applySavedState() {
  const s = getState();

  // Apply closed shops visually
  s.negoziChiusi.forEach(shopId => {
    const building = document.getElementById('building-' + shopId);
    if (building) building.classList.add('closed');
  });

  // Spawn pedestrians proportional to vitality
  const pedCount = Math.max(0, Math.floor(s.vitalita / 2));
  spawnPedestrians(pedCount);
}

// ----- Update Pedestrians -----
export function updatePedestrians() {
  const s = getState();
  const targetCount = Math.max(0, Math.floor(s.vitalita / 2));
  const layer = els.pedestriansLayer;
  if (!layer) return;

  // Remove excess pedestrians
  while (pedestrians.length > targetCount && pedestrians.length > 0) {
    const ped = pedestrians.pop();
    ped.classList.add('fading');
    setTimeout(() => ped.remove(), 1000);
  }
}

// ----- Shop Closure Animation -----
export function animateShopClosure(shop) {
  const building = document.getElementById('building-' + shop.id);
  if (!building) return;

  building.classList.add('closing');

  setTimeout(() => {
    building.classList.remove('closing');
    building.classList.add('closed');
  }, 800);

  // Special treatment for Bar Da Peppe
  if (shop.id === 'bar') {
    building.classList.add('emotional-closure');
  }
}

// ----- News Ticker -----
let newsQueue = [];
let newsAnimating = false;

export function showNews(newsItem) {
  newsQueue.push(newsItem.text);
  if (!newsAnimating) processNewsQueue();
}

function processNewsQueue() {
  if (newsQueue.length === 0) {
    newsAnimating = false;
    return;
  }
  newsAnimating = true;
  const text = newsQueue.shift();

  els.newsText.textContent = text;
  els.newsTicker.classList.remove('news-hidden');
  els.newsTicker.classList.add('news-visible');

  setTimeout(() => {
    els.newsTicker.classList.remove('news-visible');
    els.newsTicker.classList.add('news-hidden');
    setTimeout(() => processNewsQueue(), 500);
  }, 6000);
}

// ----- Achievement Popup -----
let achievementQueue = [];
let achievementAnimating = false;

export function showAchievement(ach) {
  achievementQueue.push(ach);
  if (!achievementAnimating) processAchievementQueue();
}

function processAchievementQueue() {
  if (achievementQueue.length === 0) {
    achievementAnimating = false;
    return;
  }
  achievementAnimating = true;
  const ach = achievementQueue.shift();

  const popup = document.createElement('div');
  popup.className = 'achievement-popup';
  popup.innerHTML = `
    <div class="achievement-icon">${ach.icon}</div>
    <div class="achievement-body">
      <div class="achievement-title">${ach.nome}</div>
      <div class="achievement-desc">${ach.desc}</div>
    </div>
  `;
  els.achievementContainer.appendChild(popup);

  requestAnimationFrame(() => popup.classList.add('show'));

  setTimeout(() => {
    popup.classList.remove('show');
    popup.classList.add('hide');
    setTimeout(() => {
      popup.remove();
      processAchievementQueue();
    }, 400);
  }, 3000);
}

// ----- Fine (multa) Animation -----
export function animateFine(carEl, amount) {
  if (!carEl) return;

  carEl.classList.add('fined');
  setTimeout(() => carEl.classList.remove('fined'), 300);

  // Floating +euro (shows actual amount with combo)
  const floater = document.createElement('div');
  floater.className = 'float-text';
  floater.textContent = '+' + (amount || 5) + '\u20AC';
  if (amount > 5) floater.classList.add('float-combo');
  const rect = carEl.getBoundingClientRect();
  const mapRect = els.townMap.getBoundingClientRect();
  floater.style.left = (rect.left - mapRect.left + rect.width / 2) + 'px';
  floater.style.top = (rect.top - mapRect.top + els.townMap.scrollTop) + 'px';
  els.townMap.appendChild(floater);

  setTimeout(() => floater.remove(), 800);
}

// ----- Auto-fine Visual -----
export function animateAutoFine() {
  const cars = els.townMap.querySelectorAll('.car');
  if (cars.length === 0) return;
  const car = cars[Math.floor(Math.random() * cars.length)];
  car.classList.add('auto-fined');
  setTimeout(() => car.classList.remove('auto-fined'), 200);
}

// ----- Sagra Overlay -----
export function showSagra() {
  els.sagraOverlay.classList.add('active');
  setTimeout(() => els.sagraOverlay.classList.remove('active'), 10000);
}

// ----- Sichelgaita Effect -----
export function showSichelgaita() {
  els.sichelgaitaOverlay.classList.add('active');
  setTimeout(() => els.sichelgaitaOverlay.classList.remove('active'), 5000);
}

// ----- Torre Click -----
export function showDrogoneView() {
  const torre = document.getElementById('torre-drogone');
  if (!torre) return;
  torre.classList.add('zoomed');
  setTimeout(() => torre.classList.remove('zoomed'), 8000);
}

// ----- End Screen -----
export function showEndScreen() {
  const stats = getEndStats();
  const s = getState();

  els.gameScreen.style.display = 'none';
  els.endScreen.style.display = 'flex';

  const durStr = formatDuration(stats.durata);

  els.endStats.innerHTML = `
    <div class="stat-row"><span class="stat-label">Cassa totale</span><span class="stat-value">${formatNumber(stats.cassa)} \u20AC</span></div>
    <div class="stat-row"><span class="stat-label">Multe emesse</span><span class="stat-value">${formatNumber(stats.multe)}</span></div>
    <div class="stat-row"><span class="stat-label">Negozi chiusi</span><span class="stat-value">${stats.negoziChiusi} / ${SHOPS.length}</span></div>
    <div class="stat-row"><span class="stat-label">Sagre organizzate</span><span class="stat-value">${stats.sagre}</span></div>
    <div class="stat-row"><span class="stat-label">Achievements</span><span class="stat-value">${stats.achievements} / ${ACHIEVEMENTS.length}</span></div>
    <div class="stat-row"><span class="stat-label">Durata</span><span class="stat-value">${durStr}</span></div>
  `;

  if (stats.hasAlternateEnding) {
    els.endTitle.textContent = 'HAI VINTO... QUASI';
    els.endQuote.textContent = 'Il paese e\' quasi vuoto. Ma qualcuno e\' rimasto a organizzare la sagra. Forse l\'anno prossimo qualcuno tornera\'.';
  } else {
    els.endTitle.textContent = 'HAI VINTO';
    els.endQuote.textContent = 'Ma le casse comunali non sono mai state cosi piene.';
  }
}

// ----- Screen Management -----
export function showStartScreen(hasSave) {
  els.startScreen.style.display = 'flex';
  els.gameScreen.style.display = 'none';
  els.endScreen.style.display = 'none';
  els.btnContinue.style.display = hasSave ? 'block' : 'none';
}

export function showGameScreen() {
  els.startScreen.style.display = 'none';
  els.gameScreen.style.display = 'flex';
  els.endScreen.style.display = 'none';
}

// ----- Share -----
export function getShareText() {
  const stats = getEndStats();
  return `Ho svuotato San Marco Argentano con ${formatNumber(stats.multe)} multe e incassato ${formatNumber(stats.cassa)}\u20AC. Le casse non sono mai state cosi piene. Provaci anche tu!`;
}

// ----- Screen Shake -----
export function screenShake(intensity) {
  if (!intensity) return;
  const px = intensity * 2;
  els.townMap.style.animation = 'none';
  els.townMap.offsetHeight; // force reflow
  els.townMap.style.setProperty('--shake-px', px + 'px');
  els.townMap.style.animation = 'shake 0.15s ease';
  setTimeout(() => { els.townMap.style.animation = ''; }, 150);
}

// ----- Particle Burst -----
export function spawnParticles(carEl, intensity) {
  const count = 3 + intensity * 2;
  const rect = carEl.getBoundingClientRect();
  const mapRect = els.townMap.getBoundingClientRect();
  const cx = rect.left - mapRect.left + rect.width / 2;
  const cy = rect.top - mapRect.top + els.townMap.scrollTop;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.textContent = ['\u20AC', '\u{1F4B0}', '\u2728', '\u{1F4B5}'][i % 4];
    const angle = (Math.PI * 2 * i) / count;
    const dist = 30 + Math.random() * 40;
    p.style.left = cx + 'px';
    p.style.top = cy + 'px';
    p.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
    p.style.setProperty('--dy', Math.sin(angle) * dist - 20 + 'px');
    els.townMap.appendChild(p);
    setTimeout(() => p.remove(), 600);
  }
}

// ----- Combo Display -----
let comboTimeout = null;
export function showCombo(count, multiplier) {
  const el = document.getElementById('combo-display');
  if (!el) return;

  if (multiplier <= 1 && count < 3) {
    return;
  }

  clearTimeout(comboTimeout);
  el.textContent = multiplier > 1
    ? 'COMBO x' + multiplier + '!'
    : 'x' + count;
  el.className = 'combo-show combo-level-' + Math.min(multiplier, 5);

  comboTimeout = setTimeout(() => {
    el.className = 'combo-hidden';
  }, 800);
}

// ----- Dramatic Shop Closure Overlay -----
const CLOSURE_MESSAGES = {
  edicola: "L'ultima copia del giornale resta invenduta.",
  cartolibreria: "I quaderni si comprano a Cosenza, adesso.",
  gelateria: "Pure Sichelgaita s'e' scocciata.",
  parrucchiere: "Tony va a Cosenza. Almeno la' tagliano i capelli.",
  macelleria: "Le Carni del Pollino emigrano. In pianura.",
  frantoio: "L'olio Bruzio DOP si vende solo online.",
  forno: "Tre generazioni di pane. Finite.",
  trattoria: "Ultimo piatto servito: pasta e patate.",
  bar: "Sessant'anni. Buttati.",
  farmacia: "L'ultimo presidio. Se ne va anche quello.",
};

export function showClosureOverlay(shop) {
  const overlay = document.getElementById('closure-overlay');
  const nameEl = document.getElementById('closure-name');
  const msgEl = document.getElementById('closure-msg');

  nameEl.textContent = shop.nome;
  msgEl.textContent = CLOSURE_MESSAGES[shop.id] || 'Abbassa la saracinesca per sempre.';

  overlay.classList.add('active');
  if (shop.id === 'bar') overlay.classList.add('emotional');

  setTimeout(() => {
    overlay.classList.remove('active', 'emotional');
  }, 3500);
}

// ----- Random Event Modal -----
export function showRandomEvent(event) {
  const modal = document.getElementById('event-modal');
  document.getElementById('event-text').textContent = event.text;
  document.getElementById('event-btn-a').textContent = event.optionA.label;
  document.getElementById('event-btn-b').textContent = event.optionB.label;
  document.getElementById('event-response').textContent = '';
  document.getElementById('event-response').classList.remove('show');
  modal.classList.add('active');
}

// ----- Vigili in Town -----
export function updateVigili() {
  const s = getState();
  let totalVigili = 0;
  totalVigili += (s.upgrades.vigileJunior || 0);
  totalVigili += (s.upgrades.vigileSenior || 0);
  totalVigili += (s.upgrades.motorino || 0);
  // Cap at 12 visible
  totalVigili = Math.min(totalVigili, 12);

  // Remove old vigili
  const oldVigili = els.townMap.querySelectorAll('.vigile-figure');
  oldVigili.forEach(v => v.remove());

  // Spawn new ones
  const piazzas = els.townMap.querySelectorAll('.piazza');
  for (let i = 0; i < totalVigili; i++) {
    const v = document.createElement('div');
    v.className = 'vigile-figure';
    v.style.left = (15 + Math.random() * 70) + '%';
    v.style.animationDelay = (Math.random() * 3) + 's';
    v.style.animationDuration = (4 + Math.random() * 3) + 's';
    const piazza = piazzas[i % piazzas.length];
    if (piazza) piazza.appendChild(v);
  }
}
