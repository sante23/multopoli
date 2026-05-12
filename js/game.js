// ============================================================
// MULTOPOLI — Game Engine
// State management, game logic, save/load
// ============================================================

import { UPGRADES, SHOPS, NEWS, ACHIEVEMENTS } from './data.js';

// ----- Initial State -----
function createInitialState() {
  const upgrades = {};
  UPGRADES.forEach(u => { upgrades[u.id] = 0; });
  return {
    cassa: 0,
    cassaTotale: 0,
    vitalita: 100,
    multeTotali: 0,
    multePerSecondo: 0,
    upgrades,
    negoziChiusi: [],
    achievementsSbloccati: [],
    sagreOrganizzate: 0,
    sagraAttiva: false,
    sagraFine: 0,
    newsViste: [],
    lastNewsTime: 0,
    gameOver: false,
    startTime: Date.now(),
    lastTick: Date.now(),
    clicksSuTorre: 0,
    sichelgaitaVista: false,
    ultimaSichelgaita: Date.now(),
    fulloneTriggered: false,
    carClickCounts: {},
    // Combo
    comboCount: 0,
    lastClickTime: 0,
    // Random events
    lastEventTime: 0,
    eventsSeen: 0,
  };
}

export let state = createInitialState();

// ----- State Helpers -----
export function resetState() {
  state = createInitialState();
  localStorage.removeItem('multopoli_save');
  return state;
}

export function getState() {
  return state;
}

// ----- Cost Calculation -----
export function getUpgradeCost(upgradeId) {
  const def = UPGRADES.find(u => u.id === upgradeId);
  if (!def) return Infinity;
  const owned = state.upgrades[upgradeId] || 0;
  return Math.floor(def.costoBase * Math.pow(1.15, owned));
}

// ----- Sagra Cost -----
export function getSagraCost() {
  return Math.floor(100 * (1 + state.sagreOrganizzate * 0.5));
}

// ----- MPS Calculation -----
export function recalcMPS() {
  let mps = 0;
  UPGRADES.forEach(u => {
    mps += (state.upgrades[u.id] || 0) * u.multePerSec;
  });
  state.multePerSecondo = mps;
  return mps;
}

// ----- Click Handler (with combo) -----
export function doClick() {
  if (state.gameOver) return null;
  if (state.sagraAttiva) return null;

  const now = Date.now();

  // Combo tracking
  if (now - state.lastClickTime < 600) {
    state.comboCount++;
  } else {
    state.comboCount = 1;
  }
  state.lastClickTime = now;

  // Combo multiplier
  let comboMultiplier = 1;
  let comboLevel = 0;
  if (state.comboCount >= 20) { comboMultiplier = 5; comboLevel = 4; }
  else if (state.comboCount >= 10) { comboMultiplier = 3; comboLevel = 3; }
  else if (state.comboCount >= 5) { comboMultiplier = 2; comboLevel = 2; }
  else if (state.comboCount >= 3) { comboLevel = 1; }

  const guadagno = 5 * comboMultiplier;
  state.cassa += guadagno;
  state.cassaTotale += guadagno;
  state.multeTotali += 1;
  state.vitalita = Math.max(0, state.vitalita - 0.05);

  return { guadagno, comboLevel, comboCount: state.comboCount, comboMultiplier };
}

// ----- Buy Upgrade -----
export function buyUpgrade(upgradeId) {
  const cost = getUpgradeCost(upgradeId);
  if (state.cassa < cost) return false;
  if (state.gameOver) return false;

  state.cassa -= cost;
  state.upgrades[upgradeId] = (state.upgrades[upgradeId] || 0) + 1;
  recalcMPS();
  return true;
}

// ----- Organizza Sagra -----
export function organizzaSagra() {
  const cost = getSagraCost();
  if (state.cassa < cost) return false;
  if (state.sagraAttiva) return false;
  if (state.gameOver) return false;

  state.cassa -= cost;
  state.sagreOrganizzate++;
  state.vitalita = Math.min(100, state.vitalita + 8);
  state.sagraAttiva = true;
  state.sagraFine = Date.now() + 10000; // 10 seconds
  return true;
}

// ----- Vitality Decay -----
function calcDecay(mps, vitalita) {
  if (mps <= 0) return 0;
  let decay = Math.sqrt(mps) * 0.018;
  if (vitalita < 30) decay *= 1.5;
  if (vitalita < 15) decay *= 1.5;
  return decay;
}

// ----- Shop Closure Check -----
function checkShopClosures() {
  const closures = [];
  SHOPS.forEach(shop => {
    if (state.negoziChiusi.includes(shop.id)) return;
    if (state.vitalita <= shop.soglia) {
      state.negoziChiusi.push(shop.id);
      closures.push(shop);
    }
  });
  return closures;
}

// ----- News Check -----
function checkNews(now) {
  if (now - state.lastNewsTime < 8000) return null; // Min 8s between news
  if (state.gameOver) return null;

  const vit = state.vitalita;
  const available = NEWS.filter(n => {
    if (state.newsViste.includes(n.text)) return false;
    return vit >= n.minVit && vit <= n.maxVit;
  });

  if (available.length === 0) return null;

  // Pick random from available
  const news = available[Math.floor(Math.random() * available.length)];
  state.newsViste.push(news.text);
  state.lastNewsTime = now;
  return news;
}

// ----- Achievement Check -----
function checkAchievements() {
  const newAchievements = [];
  const unlocked = state.achievementsSbloccati;

  function tryUnlock(id) {
    if (unlocked.includes(id)) return;
    unlocked.push(id);
    const achDef = ACHIEVEMENTS.find(a => a.id === id);
    if (achDef) newAchievements.push(achDef);
  }

  // Apripista — prima multa
  if (state.multeTotali >= 1) tryUnlock('apripista');

  // Stipendio — 100 euro
  if (state.cassaTotale >= 100) tryUnlock('stipendio');

  // Cuginu — vigile stagista
  if (state.upgrades.vigileJunior >= 1) tryUnlock('cuginu');

  // Effetto collaterale — prima chiusura
  if (state.negoziChiusi.length >= 1) tryUnlock('effetto');

  // Pane addio — forno chiude
  if (state.negoziChiusi.includes('forno')) tryUnlock('pane');

  // Peppe se ne va — bar chiude
  if (state.negoziChiusi.includes('bar')) {
    tryUnlock('peppe');
    tryUnlock('sessantanni');
  }

  // Centro fantasma — tutti chiusi
  if (state.negoziChiusi.length >= SHOPS.length) tryUnlock('fantasma');

  // Cittadino dell'anno — vitalita < 25
  if (state.vitalita < 25) tryUnlock('cittadino');

  // Bilancio normanno — 1M euro
  if (state.cassaTotale >= 1000000) tryUnlock('normanno');

  // Bruxelles chiama — 5000 multe
  if (state.multeTotali >= 5000) tryUnlock('bruxelles');

  // Pellegrino mancato — vitalita < 30
  if (state.vitalita < 30) tryUnlock('pellegrino');

  // Pro Loco sciolta — vitalita < 20
  if (state.vitalita < 20) tryUnlock('proloco');

  // Sichelgaita
  if (state.sichelgaitaVista) tryUnlock('sichelgaita');

  // U' Magnifico — vigile predittivo
  if (state.upgrades.vigilePredittivo >= 1) tryUnlock('magnifico');

  // Vittoria — vitalita = 0
  if (state.vitalita <= 0) tryUnlock('vittoria');

  // L'ultimo della Calabria — 5+ sagre
  if (state.sagreOrganizzate >= 5) tryUnlock('ultimo');

  // Sagra annullata — game over senza sagre
  if (state.gameOver && state.sagreOrganizzate === 0) tryUnlock('sagra_annullata');

  return newAchievements;
}

// ----- Random Events -----
const RANDOM_EVENTS = [
  {
    text: "Un turista chiede dove parcheggiare.",
    optionA: { label: "Aiutalo", cassa: 0, vitalita: 3, response: "Il turista visita tre negozi e compra olio locale." },
    optionB: { label: "Multalo!", cassa: 100, vitalita: -2, response: "Il turista se ne va. Recensione: 1 stella." },
  },
  {
    text: "La scuola chiede di sospendere le multe durante l'uscita.",
    optionA: { label: "Concedi", cassa: 0, vitalita: 4, response: "Le mamme tornano a fare la spesa in centro." },
    optionB: { label: "Rifiuta", cassa: 200, vitalita: -3, response: "Tre famiglie iscrivono i figli a Roggiano." },
  },
  {
    text: "Un corriere in doppia fila scarica pacchi per il negozio.",
    optionA: { label: "Lascia stare", cassa: 0, vitalita: 2, response: "Il negoziante ti ringrazia con un caffe'." },
    optionB: { label: "Verbale!", cassa: 75, vitalita: -1, response: "Il corriere non consegnera' piu' in centro." },
  },
  {
    text: "Il parroco chiede parcheggio libero per un funerale.",
    optionA: { label: "Concedi", cassa: 0, vitalita: 5, response: "La comunita' apprezza. Qualcuno torna al bar." },
    optionB: { label: "Regolamento!", cassa: 150, vitalita: -4, response: "I funerali si faranno a Roggiano." },
  },
  {
    text: "Il medico parcheggia sul marciapiede per un'emergenza.",
    optionA: { label: "E' un'emergenza", cassa: 0, vitalita: 3, response: "La signora Maria e' salva. Il paese respira." },
    optionB: { label: "Nessuna eccezione", cassa: 50, vitalita: -3, response: "Il medico si trasferisce a Cosenza." },
  },
  {
    text: "Furgone della sagra del cinghiale in divieto di sosta.",
    optionA: { label: "Aiuta a scaricare", cassa: -20, vitalita: 4, response: "La sagra e' un successo! Gente da tutto il circondario." },
    optionB: { label: "Verbale!", cassa: 100, vitalita: -2, response: "La sagra e' annullata. Di nuovo." },
  },
  {
    text: "Nonna Concetta parcheggia la Panda storta. Di nuovo.",
    optionA: { label: "Fai finta di niente", cassa: 0, vitalita: 2, response: "Ti porta le melanzane sott'olio la prossima settimana." },
    optionB: { label: "Nonna, mi dispiace...", cassa: 30, vitalita: -2, response: "'U nipote d'u sindacu! Vergogna!' Tutto il rione lo sa." },
  },
  {
    text: "La processione di San Marco blocca il corso per due ore.",
    optionA: { label: "E' tradizione!", cassa: 0, vitalita: 6, response: "Il paese si riunisce. Per un attimo sembra tutto come prima." },
    optionB: { label: "Multa a tutti i carri", cassa: 300, vitalita: -5, response: "Il vescovo scrive al prefetto. I giornali ne parlano." },
  },
];

function checkRandomEvent(now) {
  if (state.gameOver) return null;
  if (state.sagraAttiva) return null;
  if (state.multeTotali < 20) return null; // Need some progress
  if (now - state.lastEventTime < 45000) return null; // Min 45s between events

  // ~2% chance per tick at 10Hz
  if (Math.random() > 0.002) return null;

  state.lastEventTime = now;
  const idx = state.eventsSeen % RANDOM_EVENTS.length;
  state.eventsSeen++;
  return RANDOM_EVENTS[idx];
}

export function applyEventChoice(choice) {
  state.cassa += choice.cassa;
  if (choice.cassa < 0) state.cassa = Math.max(0, state.cassa);
  state.cassaTotale += Math.max(0, choice.cassa);
  state.vitalita = Math.max(0, Math.min(100, state.vitalita + choice.vitalita));
}

// ----- Sichelgaita Easter Egg -----
function checkSichelgaita(now) {
  if (state.gameOver) return false;
  if (state.sagraAttiva) return false;
  if (now - state.ultimaSichelgaita < 480000) return false; // Min 8 minutes
  if (state.multeTotali < 50) return false; // Need some progress

  // Random chance: ~1% per tick (called at 10Hz)
  if (Math.random() > 0.001) return false;

  state.ultimaSichelgaita = now;
  state.vitalita = Math.min(100, state.vitalita + 2);
  state.sichelgaitaVista = true;
  return true;
}

// ----- Main Tick -----
export function tick() {
  if (state.gameOver) return { closures: [], news: null, achievements: [], sichelgaita: false, gameOver: false };

  const now = Date.now();
  const deltaMs = Math.min(now - state.lastTick, 1000); // Cap delta to 1s
  state.lastTick = now;

  const deltaSec = deltaMs / 1000;

  // Check sagra expiry
  if (state.sagraAttiva && now >= state.sagraFine) {
    state.sagraAttiva = false;
  }

  // Auto-generate fines (if no sagra active)
  if (!state.sagraAttiva && state.multePerSecondo > 0) {
    const multe = state.multePerSecondo * deltaSec;
    const guadagno = multe * 5;
    state.cassa += guadagno;
    state.cassaTotale += guadagno;
    state.multeTotali += multe;

    // Vitality decay
    const decay = calcDecay(state.multePerSecondo, state.vitalita);
    state.vitalita = Math.max(0, state.vitalita - decay * deltaSec);
  }

  // Check events
  const closures = checkShopClosures();
  const news = checkNews(now);
  const achievements = checkAchievements();
  const sichelgaita = checkSichelgaita(now);
  const randomEvent = checkRandomEvent(now);

  // Game over
  if (state.vitalita <= 0 && !state.gameOver) {
    state.gameOver = true;
    state.vitalita = 0;
    const finalAch = checkAchievements();
    achievements.push(...finalAch);
    return { closures, news, achievements, sichelgaita, randomEvent: null, gameOver: true };
  }

  return { closures, news, achievements, sichelgaita, randomEvent, gameOver: false };
}

// ----- Save / Load -----
const SAVE_KEY = 'multopoli_save';

export function saveGame() {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(state));
  } catch (e) {
    // Storage full or unavailable
  }
}

export function loadGame() {
  try {
    const saved = localStorage.getItem(SAVE_KEY);
    if (!saved) return false;
    const parsed = JSON.parse(saved);
    // Merge saved state into current state
    Object.assign(state, parsed);
    state.lastTick = Date.now(); // Reset tick to prevent huge delta
    recalcMPS();
    return true;
  } catch (e) {
    return false;
  }
}

export function hasSave() {
  return !!localStorage.getItem(SAVE_KEY);
}

// ----- Get Phase (for visual rendering) -----
export function getPhase() {
  const v = state.vitalita;
  if (v > 70) return 1;
  if (v > 40) return 2;
  if (v > 15) return 3;
  return 4;
}

// ----- Get End Game Stats -----
export function getEndStats() {
  return {
    cassa: state.cassaTotale,
    multe: Math.floor(state.multeTotali),
    negoziChiusi: state.negoziChiusi.length,
    sagre: state.sagreOrganizzate,
    achievements: state.achievementsSbloccati.length,
    durata: Math.floor((Date.now() - state.startTime) / 1000),
    hasAlternateEnding: state.sagreOrganizzate >= 3,
  };
}
