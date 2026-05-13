// ============================================================
// MULTOPOLI — Game Engine
// State management, game logic, save/load
// ============================================================

import { UPGRADES, SHOPS, NEWS, ACHIEVEMENTS, ROSSO_MESSAGES, COMITATO_ACTIONS, CARTE_AZIONE } from './data.js';

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
    // Comitato di Resistenza
    pressione: 0,
    lastRossoTime: 0,
    comitatoAzioniViste: [],
    comitatoBlockFine: 0,
    multeSlowdown: 1,
    multeSlowdownFine: 0,
    // Carte Azione
    lastCartaTime: 0,
    carteSeen: 0,
    // Monumenti scoperti (primo click = +1 vitalita')
    monumentiScoperti: [],
    // Bonus temporanei
    multeBonus: 1,
    multeBonusFine: 0,
    upgradeSconto: 0,
    blockClicksFine: 0,
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
  let cost = Math.floor(def.costoBase * Math.pow(1.15, owned));
  if (state.upgradeSconto > 0) {
    cost = Math.floor(cost * (1 - state.upgradeSconto));
    state.upgradeSconto = 0; // one-time
  }
  return cost;
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
  if (Date.now() < state.blockClicksFine) return null;

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
  // --- Turisti e forestieri ---
  {
    text: "Un turista svizzero con la cioccolata in mano cerca parcheggio in piazza.",
    optionA: { label: "Aiutalo", cassa: 0, vitalita: 4, response: "Il turista visita tre negozi e compra olio. 'Wunderbar!' Lascia la cioccolata a Rosso." },
    optionB: { label: "Multalo!", cassa: 120, vitalita: -3, response: "'Me ne torno in Svizzera! Ho portato la cioccolata e m\'anu multatu!' Recensione: 1 stella." },
  },
  {
    text: "Un camper tedesco di 9 metri prova a entrare nel centro storico.",
    optionA: { label: "Dirottalo al parcheggio", cassa: 0, vitalita: 3, response: "Il tedesco ringrazia e torna a piedi. Compra 6 bottiglie di olio Bruzio." },
    optionB: { label: "Multa e rimozione!", cassa: 200, vitalita: -3, response: "Il camper blocca Via Roberto il Guiscardo per due ore. TripAdvisor: 'Never again.'" },
  },
  // --- Animali e mezzi improbabili ---
  {
    text: "Un asinello e' legato al palo della sosta in Piazza Selvaggi.",
    optionA: { label: "E' folklore!", cassa: 0, vitalita: 3, response: "I turisti fanno le foto. L\'asinello diventa virale su TikTok. San Marco trending." },
    optionB: { label: "Divieto di sosta!", cassa: 40, vitalita: -2, response: "Il vigile scrive il verbale. Intestatario: l\'asino. Rosso: 'Avete multatu pure 'u ciucciu!'" },
  },
  {
    text: "Zi' Peppino attraversa la piazza cu' 'a carriola chiena di fichi.",
    optionA: { label: "Lascialo passare", cassa: 0, vitalita: 2, response: "Ti lascia un cestino di fichi sulla scrivania. Ancora caldi di sole." },
    optionB: { label: "Veicolo non assicurato!", cassa: 25, vitalita: -2, response: "Rosso dal bar: 'Avete multato unu cu' 'a carriola! State fuori!' Il video fa 50mila views." },
  },
  {
    text: "Tre capre scendono dalla Motta e bloccano il Corso.",
    optionA: { label: "Aspetta che passano", cassa: 0, vitalita: 3, response: "Le capre se ne vanno. Nessun danno. Un momento di pace bucolica nel caos." },
    optionB: { label: "Multa al proprietario!", cassa: 60, vitalita: -1, response: "Il pastore: 'Ma le capre \'ndo parcheggianu?' Rosso muore dal ridere." },
  },
  // --- Situazioni serie ---
  {
    text: "La scuola chiede di sospendere le multe durante l\'uscita dei bambini.",
    optionA: { label: "Concedi", cassa: 0, vitalita: 4, response: "Le mamme tornano a fare la spesa in centro. Il paese respira." },
    optionB: { label: "Rifiuta", cassa: 200, vitalita: -3, response: "Tre famiglie iscrivono i figli a Roggiano. Rosso: 'Pure i bambini vi siete mangiati.'" },
  },
  {
    text: "Il medico parcheggia sul marciapiede per un\'emergenza.",
    optionA: { label: "E\' un\'emergenza", cassa: 0, vitalita: 3, response: "La signora Maria e\' salva. Il paese respira." },
    optionB: { label: "Nessuna eccezione", cassa: 50, vitalita: -3, response: "Il medico si trasferisce a Cosenza. Rosso: 'Mo\' ppe\' morire bisogna andare a Cosenza.'" },
  },
  {
    text: "Il parroco chiede parcheggio libero per un funerale.",
    optionA: { label: "Concedi", cassa: 0, vitalita: 5, response: "La comunita\' apprezza. Qualcuno torna al bar." },
    optionB: { label: "Regolamento!", cassa: 150, vitalita: -4, response: "I funerali si fanno a Roggiano. Rosso: 'Mancu i morti lasciate in pace.'" },
  },
  // --- Situazioni assurde ---
  {
    text: "Un\'anziana ha parcheggiato la sedia a rotelle sulle strisce blu.",
    optionA: { label: "Ma figurati...", cassa: 0, vitalita: 2, response: "La signora ti benedice. Ti regala un santino di San Francesco da Paola." },
    optionB: { label: "Regolamento!", cassa: 15, vitalita: -4, response: "Il video finisce su Striscia la Notizia. Il Gabibbo arriva a San Marco. Rosso esulta." },
  },
  {
    text: "Un contadino ha parcheggiato il trattore in piazza per scaricare olive.",
    optionA: { label: "Fa\' pure", cassa: 0, vitalita: 3, response: "Ti regala 5 litri di olio nuovo. L\'odore riempie la piazza." },
    optionB: { label: "Mezzo agricolo in ZTL!", cassa: 80, vitalita: -2, response: "Il contadino: 'L\'anno prossimo le olive le portu a Roggiano.' L\'olio Bruzio piange." },
  },
  {
    text: "Nonna Concetta parcheggia la Panda storta in piazza. Di nuovo. Per la terza volta oggi.",
    optionA: { label: "Fai finta di niente", cassa: 0, vitalita: 2, response: "Ti porta le melanzane sott\'olio la prossima settimana. Nonna Concetta non dimentica." },
    optionB: { label: "Nonna, mi dispiace...", cassa: 30, vitalita: -2, response: "'U nipote d\'u sindacu! Vergogna!' Tutto il rione lo sa entro sera." },
  },
  {
    text: "Un ragazzo consegna pizze in motorino e parcheggia sul marciapiede.",
    optionA: { label: "Lascialo lavorare", cassa: 0, vitalita: 2, response: "Ti porta una margherita gratis. Ancora calda." },
    optionB: { label: "Verbale!", cassa: 50, vitalita: -1, response: "Nessuno consegna piu\' pizze in centro. Rosso: 'Mo\' mancu \'a pizza arriva cchiu\'.'" },
  },
  // --- Sagre e tradizioni ---
  {
    text: "Furgone della sagra del cinghiale in divieto di sosta.",
    optionA: { label: "Aiuta a scaricare", cassa: -20, vitalita: 4, response: "La sagra e\' un successo! Gente da tutto il circondario. Rosso ti offre un panino." },
    optionB: { label: "Verbale!", cassa: 100, vitalita: -2, response: "La sagra e\' annullata. Di nuovo. Rosso: 'Avete ammazzato pure \'u cinghiale.'" },
  },
  {
    text: "La processione di San Marco blocca il corso per due ore.",
    optionA: { label: "E\' tradizione!", cassa: 0, vitalita: 6, response: "Il paese si riunisce. Per un attimo sembra tutto come prima." },
    optionB: { label: "Multa a tutti i carri", cassa: 300, vitalita: -5, response: "Il vescovo scrive al prefetto. Rosso: 'Avete multatu pure \'u Signore. Complimenti.'" },
  },
  // --- Emergenze creative ---
  {
    text: "Un furgone di trasloco blocca Via Vittorio Emanuele. Una famiglia se ne va da San Marco.",
    optionA: { label: "Aiutali a caricare", cassa: 0, vitalita: -2, response: "Se ne vanno in silenzio. Un altro appartamento vuoto. Ma almeno non hai peggiorato le cose." },
    optionB: { label: "Multa al furgone!", cassa: 80, vitalita: -4, response: "La famiglia: 'Pure l\'ultima multa. Grazie di tutto, sinda\'.' Rosso non dice niente. Per una volta." },
  },
  {
    text: "Un bambino ha lasciato la bici legata al palo della sosta. Occupazione abusiva.",
    optionA: { label: "E\' un bambino...", cassa: 0, vitalita: 2, response: "Il bambino torna. Ti sorride. Hai ancora un\'anima." },
    optionB: { label: "Rimozione forzata!", cassa: 10, vitalita: -3, response: "La mamma filma tutto. Il video fa il giro dei gruppi WhatsApp. Rosso lo condivide 47 volte." },
  },
  {
    text: "Due vecchietti giocano a carte su un tavolo piazzato sullo stallo a pagamento.",
    optionA: { label: "Lasciali giocare", cassa: 0, vitalita: 3, response: "'Na partitella \'e scopa in piazza. Come ai tempi belli. Ti invitano." },
    optionB: { label: "Occupazione suolo pubblico!", cassa: 20, vitalita: -2, response: "I vecchietti: 'Sinda\', ccane si giocava a carte quando tu mancu eri nato.' Rosso applaude." },
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

// ----- Monumenti -----
export function scopriMonumento(id) {
  if (state.monumentiScoperti.includes(id)) return false;
  state.monumentiScoperti.push(id);
  state.vitalita = Math.min(100, state.vitalita + 1);
  return true; // primo click, bonus vitalita'
}

// ----- Comitato Pressione -----
function checkComitato(now) {
  // Pressione increases with MPS
  if (state.multePerSecondo > 0) {
    state.pressione = Math.min(100, state.pressione + state.multePerSecondo * 0.0003);
  }
  // Natural decay
  state.pressione = Math.max(0, state.pressione - 0.01);

  // Check comitato actions at thresholds
  let comitatoAction = null;
  for (const action of COMITATO_ACTIONS) {
    if (state.pressione >= action.soglia && !state.comitatoAzioniViste.includes(action.tipo)) {
      state.comitatoAzioniViste.push(action.tipo);
      comitatoAction = action;
      break;
    }
  }

  // Rosso message
  let rossoMsg = null;
  if (now - state.lastRossoTime > 25000 && state.pressione > 5) {
    if (Math.random() < 0.003) {
      const available = ROSSO_MESSAGES.filter(m =>
        state.pressione >= m.minPress && state.pressione <= m.maxPress
      );
      if (available.length > 0) {
        rossoMsg = available[Math.floor(Math.random() * available.length)];
        state.lastRossoTime = now;
      }
    }
  }

  // Apply comitato block/slowdown expiry
  if (state.comitatoBlockFine > 0 && now >= state.comitatoBlockFine) {
    state.comitatoBlockFine = 0;
  }
  if (state.multeSlowdownFine > 0 && now >= state.multeSlowdownFine) {
    state.multeSlowdown = 1;
    state.multeSlowdownFine = 0;
  }
  if (state.multeBonusFine > 0 && now >= state.multeBonusFine) {
    state.multeBonus = 1;
    state.multeBonusFine = 0;
  }

  return { comitatoAction, rossoMsg };
}

export function riceviComitato() {
  if (state.gameOver) return false;
  state.pressione = Math.max(0, state.pressione - 20);
  state.blockClicksFine = Date.now() + 10000;
  return true;
}

export function applyComitatoAction(action) {
  const now = Date.now();
  if (action.effetto === 'slowdown') {
    state.multeSlowdown = 0.7;
    state.multeSlowdownFine = now + 20000;
  } else if (action.effetto === 'block') {
    state.comitatoBlockFine = now + 20000;
  } else if (action.effetto === 'shutdown') {
    state.comitatoBlockFine = now + 30000;
  }
}

// ----- Carte Azione -----
function checkCarta(now) {
  if (state.gameOver) return null;
  if (state.multeTotali < 10) return null;
  if (now - state.lastCartaTime < 60000) return null; // Every 60s

  // ~3% chance per tick
  if (Math.random() > 0.003) return null;

  state.lastCartaTime = now;
  const idx = state.carteSeen % CARTE_AZIONE.length;
  state.carteSeen++;
  return CARTE_AZIONE[idx];
}

export function applyCartaChoice(effetto) {
  const now = Date.now();
  if (effetto.cassa) { state.cassa += effetto.cassa; state.cassaTotale += Math.max(0, effetto.cassa); }
  if (effetto.vitalita) state.vitalita = Math.max(0, Math.min(100, state.vitalita + effetto.vitalita));
  if (effetto.pressione) state.pressione = Math.max(0, Math.min(100, state.pressione + effetto.pressione));
  if (effetto.multeBonus) { state.multeBonus = effetto.multeBonus; state.multeBonusFine = now + (effetto.durata || 15) * 1000; }
  if (effetto.blockMulte) state.comitatoBlockFine = now + effetto.blockMulte * 1000;
  if (effetto.upgradeSconto) state.upgradeSconto = effetto.upgradeSconto;
}

// ----- Score Calculation -----
export function calcScore() {
  const s = state;
  const durata = Math.max(1, (Date.now() - s.startTime) / 1000);
  return Math.floor(
    Math.floor(s.multeTotali) * 1 +
    s.cassaTotale * 0.001 +
    (100 / durata) * 100 +
    s.achievementsSbloccati.length * 50 +
    (10 - s.negoziChiusi.length) * 200
  );
}

// ----- Main Tick -----
export function tick() {
  if (state.gameOver) return { closures: [], news: null, achievements: [], sichelgaita: false, gameOver: false, comitatoAction: null, rossoMsg: null, carta: null, randomEvent: null };

  const now = Date.now();
  const deltaMs = Math.min(now - state.lastTick, 1000);
  state.lastTick = now;
  const deltaSec = deltaMs / 1000;

  // Sagra expiry
  if (state.sagraAttiva && now >= state.sagraFine) {
    state.sagraAttiva = false;
  }

  // Auto-generate fines
  const blocked = state.sagraAttiva || (state.comitatoBlockFine > 0 && now < state.comitatoBlockFine);
  if (!blocked && state.multePerSecondo > 0) {
    const effectiveMPS = state.multePerSecondo * state.multeSlowdown * state.multeBonus;
    const multe = effectiveMPS * deltaSec;
    const guadagno = multe * 5;
    state.cassa += guadagno;
    state.cassaTotale += guadagno;
    state.multeTotali += multe;

    // Pressione from auto-fines
    state.pressione = Math.min(100, state.pressione + multe * 0.002);

    const decay = calcDecay(effectiveMPS, state.vitalita);
    state.vitalita = Math.max(0, state.vitalita - decay * deltaSec);
  }

  // Comitato
  const { comitatoAction, rossoMsg } = checkComitato(now);

  // Events
  const closures = checkShopClosures();
  const news = checkNews(now);
  const achievements = checkAchievements();
  const sichelgaita = checkSichelgaita(now);
  const randomEvent = checkRandomEvent(now);
  const carta = checkCarta(now);

  // Game over
  if (state.vitalita <= 0 && !state.gameOver) {
    state.gameOver = true;
    state.vitalita = 0;
    const finalAch = checkAchievements();
    achievements.push(...finalAch);
    return { closures, news, achievements, sichelgaita, randomEvent: null, gameOver: true, comitatoAction: null, rossoMsg: null, carta: null };
  }

  return { closures, news, achievements, sichelgaita, randomEvent, gameOver: false, comitatoAction, rossoMsg, carta };
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
    score: calcScore(),
  };
}
