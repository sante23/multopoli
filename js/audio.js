// ============================================================
// MULTOPOLI — Procedural Audio (Web Audio API)
// No external files needed — all sounds are synthesized
// ============================================================

let ctx = null;
let muted = false;

function getCtx() {
  if (!ctx) {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

export function toggleMute() {
  muted = !muted;
  return muted;
}

export function isMuted() {
  return muted;
}

// ----- MULTA CLICK: percussive "tac" of the ticket pad -----
export function playClick() {
  if (muted) return;
  const c = getCtx();
  const t = c.currentTime;

  // Short noise burst (paper slap)
  const bufSize = c.sampleRate * 0.04;
  const buf = c.createBuffer(1, bufSize, c.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < bufSize; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufSize, 8);
  }
  const noise = c.createBufferSource();
  noise.buffer = buf;

  // Filter to make it sound like a tap
  const filter = c.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.value = 3000;
  filter.Q.value = 1.5;

  const gain = c.createGain();
  gain.gain.setValueAtTime(0.3, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(c.destination);
  noise.start(t);
  noise.stop(t + 0.06);

  // Subtle "click" tone
  const osc = c.createOscillator();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(1200, t);
  osc.frequency.exponentialRampToValueAtTime(600, t + 0.03);
  const oscGain = c.createGain();
  oscGain.gain.setValueAtTime(0.15, t);
  oscGain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
  osc.connect(oscGain);
  oscGain.connect(c.destination);
  osc.start(t);
  osc.stop(t + 0.05);
}

// ----- COIN: satisfying money sound -----
export function playCoin() {
  if (muted) return;
  const c = getCtx();
  const t = c.currentTime;

  [1400, 1800, 2200].forEach((freq, i) => {
    const osc = c.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, t + i * 0.05);

    const gain = c.createGain();
    gain.gain.setValueAtTime(0, t + i * 0.05);
    gain.gain.linearRampToValueAtTime(0.08, t + i * 0.05 + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.05 + 0.15);

    osc.connect(gain);
    gain.connect(c.destination);
    osc.start(t + i * 0.05);
    osc.stop(t + i * 0.05 + 0.15);
  });
}

// ----- COMBO: ascending arpeggio -----
export function playCombo(level) {
  if (muted) return;
  const c = getCtx();
  const t = c.currentTime;
  const baseFreq = 400 + level * 100;

  const osc = c.createOscillator();
  osc.type = 'square';
  osc.frequency.setValueAtTime(baseFreq, t);
  osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, t + 0.1);

  const gain = c.createGain();
  gain.gain.setValueAtTime(0.1, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);

  osc.connect(gain);
  gain.connect(c.destination);
  osc.start(t);
  osc.stop(t + 0.15);
}

// ----- SARACINESCA: metallic rumble -----
export function playSaracinesca() {
  if (muted) return;
  const c = getCtx();
  const t = c.currentTime;

  // Low rumble
  const osc = c.createOscillator();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(80, t);
  osc.frequency.linearRampToValueAtTime(40, t + 0.8);

  // Metallic rattle (noise through resonant filter)
  const bufSize = c.sampleRate * 0.8;
  const buf = c.createBuffer(1, bufSize, c.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < bufSize; i++) {
    data[i] = (Math.random() * 2 - 1) * 0.5;
  }
  const noise = c.createBufferSource();
  noise.buffer = buf;

  const filter = c.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(800, t);
  filter.Q.value = 5;

  const gain = c.createGain();
  gain.gain.setValueAtTime(0.2, t);
  gain.gain.linearRampToValueAtTime(0.05, t + 0.3);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.8);

  const oscGain = c.createGain();
  oscGain.gain.setValueAtTime(0.1, t);
  oscGain.gain.exponentialRampToValueAtTime(0.001, t + 0.8);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(c.destination);
  osc.connect(oscGain);
  oscGain.connect(c.destination);

  noise.start(t);
  noise.stop(t + 0.8);
  osc.start(t);
  osc.stop(t + 0.8);
}

// ----- ACHIEVEMENT: triumphant chime -----
export function playAchievement() {
  if (muted) return;
  const c = getCtx();
  const t = c.currentTime;

  const notes = [523, 659, 784, 1047]; // C5 E5 G5 C6
  notes.forEach((freq, i) => {
    const osc = c.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = freq;

    const gain = c.createGain();
    gain.gain.setValueAtTime(0, t + i * 0.08);
    gain.gain.linearRampToValueAtTime(0.12, t + i * 0.08 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.08 + 0.4);

    osc.connect(gain);
    gain.connect(c.destination);
    osc.start(t + i * 0.08);
    osc.stop(t + i * 0.08 + 0.4);
  });
}

// ----- BUY UPGRADE: cash register -----
export function playBuy() {
  if (muted) return;
  const c = getCtx();
  const t = c.currentTime;

  // Ka-ching!
  const osc = c.createOscillator();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(2000, t);
  osc.frequency.exponentialRampToValueAtTime(4000, t + 0.05);
  osc.frequency.exponentialRampToValueAtTime(2500, t + 0.15);

  const gain = c.createGain();
  gain.gain.setValueAtTime(0.15, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);

  osc.connect(gain);
  gain.connect(c.destination);
  osc.start(t);
  osc.stop(t + 0.2);
}

// ----- SAGRA: festive burst -----
export function playSagra() {
  if (muted) return;
  const c = getCtx();
  const t = c.currentTime;

  // Happy ascending scale
  const notes = [392, 440, 494, 523, 587, 659, 784];
  notes.forEach((freq, i) => {
    const osc = c.createOscillator();
    osc.type = 'triangle';
    osc.frequency.value = freq;
    const gain = c.createGain();
    gain.gain.setValueAtTime(0, t + i * 0.06);
    gain.gain.linearRampToValueAtTime(0.08, t + i * 0.06 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.06 + 0.2);
    osc.connect(gain);
    gain.connect(c.destination);
    osc.start(t + i * 0.06);
    osc.stop(t + i * 0.06 + 0.2);
  });
}

// ----- GAME OVER: dramatic low tone -----
export function playGameOver() {
  if (muted) return;
  const c = getCtx();
  const t = c.currentTime;

  // Descending ominous tone
  const osc = c.createOscillator();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(400, t);
  osc.frequency.exponentialRampToValueAtTime(80, t + 2);

  const gain = c.createGain();
  gain.gain.setValueAtTime(0.15, t);
  gain.gain.linearRampToValueAtTime(0.1, t + 1);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 2.5);

  osc.connect(gain);
  gain.connect(c.destination);
  osc.start(t);
  osc.stop(t + 2.5);

  // Bell toll
  const bell = c.createOscillator();
  bell.type = 'sine';
  bell.frequency.value = 220;
  const bellGain = c.createGain();
  bellGain.gain.setValueAtTime(0.1, t + 0.5);
  bellGain.gain.exponentialRampToValueAtTime(0.001, t + 3);
  bell.connect(bellGain);
  bellGain.connect(c.destination);
  bell.start(t + 0.5);
  bell.stop(t + 3);
}

// ----- SICHELGAITA: ethereal whisper -----
export function playSichelgaita() {
  if (muted) return;
  const c = getCtx();
  const t = c.currentTime;

  // Ethereal chord
  [330, 415, 494].forEach(freq => {
    const osc = c.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = freq;
    const gain = c.createGain();
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.06, t + 1);
    gain.gain.linearRampToValueAtTime(0.06, t + 3);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 5);
    osc.connect(gain);
    gain.connect(c.destination);
    osc.start(t);
    osc.stop(t + 5);
  });

  // Wind noise
  const bufSize = c.sampleRate * 5;
  const buf = c.createBuffer(1, bufSize, c.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < bufSize; i++) d[i] = (Math.random() * 2 - 1);
  const noise = c.createBufferSource();
  noise.buffer = buf;
  const filter = c.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.value = 600;
  filter.Q.value = 3;
  const nGain = c.createGain();
  nGain.gain.setValueAtTime(0, t);
  nGain.gain.linearRampToValueAtTime(0.04, t + 1);
  nGain.gain.linearRampToValueAtTime(0.02, t + 3.5);
  nGain.gain.exponentialRampToValueAtTime(0.001, t + 5);
  noise.connect(filter);
  filter.connect(nGain);
  nGain.connect(c.destination);
  noise.start(t);
  noise.stop(t + 5);
}
