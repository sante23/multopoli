# Multopoli — Game Design & Development Documentation

> *"Idle game satirico sulla repressione del parcheggio nei piccoli comuni italiani."*

**Versione:** 1.0
**Titoli alternativi:** *Comune Virtuoso*, *L'Ultima Multa*, *Borgo Fantasma*, *Centro Chiuso*

---

## 1. Overview

| | |
|---|---|
| **Genere** | Idle / management satirico |
| **Piattaforma** | Web (browser desktop + mobile) |
| **Stack** | HTML / CSS / JS vanilla, single repo |
| **Durata partita** | 5–15 minuti |
| **Target** | Cittadini e commercianti di paesi piccoli/medi, condivisione virale via WhatsApp |
| **Pitch** | Amministri un piccolo borgo e fai cassa con le multe… mentre il paese si svuota sotto i tuoi occhi. |

### Messaggio satirico

Una rendita amministrativa basata sulla repressione del parcheggio è un'esternalità negativa che distrugge l'economia locale che pretende di finanziare. Il gioco rende il meccanismo **visibile e viscerale**: ogni multa è dopamine, ma il paese intorno si spegne.

### Tono

Ironia mediterranea, mai lamentoso. Lo humor passa dal *cortocircuito tra trionfo amministrativo e disastro umano*. Riferimenti riconoscibili (sagra, pro loco, sindaco, vigile capo) senza scadere nella macchietta.

---

## 2. Core Game Design

### Loop principale

```
[Click su macchina] → [+ Multa, + Cassa, − Vitalità]
       ↓
[Reinvesti in upgrade] → [Multe automatiche]
       ↓
[Negozi chiudono, pedoni spariscono, palette desatura]
       ↓
[Vitalità = 0] → [Schermata finale "Vittoria"]
```

### Risorse

| Risorsa | Simbolo | Cresce con | Cala con |
|---|---|---|---|
| Cassa comunale | 💰 | Ogni multa emessa | Acquisto upgrade, "Organizza Sagra" |
| Vitalità | 🏘️ | Tempo (recupero lento), Sagra | Multe (impatto crescente) |
| Multe totali | 📋 | Cumulativo | Mai |
| Rabbia cittadini | 😡 | Multe rapide | Tempo (decadimento) |

### Azioni del giocatore

- **Click manuale** su una macchina parcheggiata → +1 multa
- **Acquista upgrade** → genera multe automatiche al secondo
- **Organizza Sagra** (opzionale, ricorrente) → spende cassa, recupera vitalità, blocca multe per 10 secondi
- **Premi achievement / news** per condivisione

### Condizione di fine partita

- **"Vittoria":** vitalità raggiunge 0 → schermata finale
- Nessuna sconfitta classica: il gioco è un trionfo amministrativo *ironico*

### Twist morale

Il bottone **"Organizza Sagra"** mette il giocatore davanti a una scelta esplicita: rallentare la corsa al disastro spendendo soldi, oppure ignorare e continuare a multare. È il cuore della satira: il sistema di achievement e dopamine loop spinge naturalmente a *non* usarlo, esattamente come un'amministrazione che insegue la rendita facile.

---

## 3. Economia & Bilanciamento

### Valori iniziali

```js
cassa: 0
vitalità: 100
multeTotali: 0
multePerSecondo: 0
negozi: 10 (tutti aperti)
pedoni: 50 (animati sulla mappa)
```

### Bilanciamento multe

| Azione | + Cassa | − Vitalità |
|---|---|---|
| Click manuale | 5 € | 0.05 |
| Multa automatica (vigile junior) | 5 € | 0.05 |
| Multa automatica (upgrade alti) | 5–50 € | scaling |

> **Curva non lineare:** la vitalità scende più velocemente sotto la soglia 30, per accelerare il finale e renderlo drammatico.

### Tabella upgrade (cookie-clicker style, costi esponenziali)

| Livello | Nome | Costo | Multe/sec | Note |
|---|---|---|---|---|
| 1 | Vigile Junior | 50 € | 1 | Stagista in prova |
| 2 | Vigile Senior | 250 € | 5 | Anzianità di servizio |
| 3 | Motorino dei Vigili | 1.000 € | 15 | Mobilità urbana |
| 4 | Panda dei Vigili | 5.000 € | 50 | Iconica |
| 5 | Autovelox in Zona 30 | 25.000 € | 200 | "Per la sicurezza" |
| 6 | Telecamere ZTL | 100.000 € | 800 | Centro chiuso H24 |
| 7 | Drone Fiscale | 500.000 € | 3.000 | Sorvolo continuo |
| 8 | AI Argo 3000 | 2.500.000 € | 12.000 | Riconoscimento targhe |
| 9 | Vigile Algoritmico Predittivo | 15.000.000 € | 60.000 | "Ti multa prima che parcheggi" |

Ogni upgrade aumenta proporzionalmente anche il **decadimento vitalità**.

### Chiusura negozi

I 10 negozi chiudono a soglie di vitalità decrescenti:

| Vitalità | Negozio che chiude |
|---|---|
| 92 | Edicola di Piazza |
| 84 | Cartoleria Scuola e Sogni |
| 76 | Libreria Il Segnalibro |
| 68 | Gelateria La Dolce Vita |
| 60 | Parrucchiere Tony |
| 52 | Macelleria Buon Gusto |
| 44 | Panificio Aurora |
| 36 | Trattoria Da Nonna Rosa |
| 28 | Bar Centrale "Da Peppino" |
| 15 | Farmacia Comunale (ultimo presidio) |

Ogni chiusura genera: pop-up news + saracinesca grigia + cartello "VENDESI/AFFITTASI" + achievement.

---

## 4. Visual Design

### Stile

Flat 2D illustrativo, vista top-down semi-isometrica. Estetica "borgo italiano contemporaneo". Niente pixel art rigida — meglio CSS/SVG per fluidità e responsive.

### Palette progressiva (4 fasi)

**Fase 1 — Vivo (vitalità 100–70)**
- Cielo `#87CEEB`, edifici `#E8C39E` `#D4A373` `#B08968`
- Vegetazione `#6B9080`, strade `#8A8A8A`
- Saturazione 100%, pedoni colorati che camminano

**Fase 2 — Inquieto (70–40)**
- Stessi colori, saturazione 70%
- Primi cartelli VENDESI, meno pedoni
- Cielo leggermente più grigio

**Fase 3 — Spento (40–15)**
- Saturazione 30%, viraggio freddo
- Graffiti compaiono sui muri, erbacce nelle aiuole
- Lampioni cominciano a spegnersi

**Fase 4 — Fantasma (15–0)**
- Quasi monocromatico (`#9CA3AF` dominante)
- Solo vigili mantengono blu/bianco delle uniformi
- Atmosfera spaghetti western

### Layout schermo

```
┌────────────────────────────────────────────────┐
│  💰 12.350 €    🏘️ 67    📋 2.473    😡 ▓▓▓░░  │  ← HUD
├──────────────────────────────────────┬─────────┤
│                                      │ UPGRADE │
│                                      │ ─────── │
│         [ VISTA DEL PAESE ]          │ Vigile  │
│                                      │  50 €   │
│      (negozi, vigili, pedoni,        │ ─────── │
│       macchine cliccabili)           │ Motor.  │
│                                      │ 1.000 € │
│                                      │ ─────── │
│                                      │  ...    │
├──────────────────────────────────────┴─────────┤
│ 📰 "Bar Centrale chiude dopo 60 anni..."   ▶   │  ← News ticker
└────────────────────────────────────────────────┘
```

Su mobile: HUD compatto in alto, mappa centrale full-width, upgrade in bottom sheet espandibile.

### Animazioni chiave

- Vigile che si avvicina alla macchina e scrive (3 frame)
- Saracinesca che si abbassa con CSS transform + suono
- Pedoni che fanno fade-out uscendo dalla schermata
- Erbacce che crescono via CSS animation
- Lampioni che si spengono (filter brightness)
- Pop-up news che entra da destra
- Flash dorato quando si emette una multa

---

## 5. Content

### Lista negozi (10)

1. Bar Centrale "Da Peppino"
2. Panificio Aurora
3. Gelateria La Dolce Vita
4. Parrucchiere Tony
5. Farmacia Comunale
6. Libreria Il Segnalibro
7. Edicola di Piazza
8. Trattoria Da Nonna Rosa
9. Macelleria Buon Gusto
10. Cartoleria Scuola e Sogni

### News ticker (40+ messaggi)

**Trigger: prime multe (vitalità 95–85)**
- "Comune incassa cifra record dalle multe: sindaco soddisfatto."
- "Nuova ordinanza: divieto di sosta esteso anche ai marciapiedi."
- "Comitato cittadini chiede chiarimenti. Ignorato."
- "Il vigile capo: 'Stiamo solo applicando il regolamento.'"

**Trigger: prime chiusure (85–60)**
- "Storica edicola chiude dopo 40 anni. 'I clienti non riescono a fermarsi.'"
- "Anziani: 'Per ritirare la pensione devo prendere il taxi.'"
- "Premio: comune più virtuoso d'Italia per multe pro capite."
- "Turisti dimezzati. Pro loco: 'Stiamo lavorando.'"
- "Sindaco inaugura nuovo parcheggio multipiano. A 4 km dal centro."

**Trigger: metà partita (60–35)**
- "Bar Centrale 'Da Peppino' chiude. Peppino: 'Sessant'anni buttati.'"
- "Casse comunali mai così piene. Bilancio in attivo."
- "Il vigile capo nominato Cittadino dell'Anno (unico candidato)."
- "Crisi del commercio: cinque saracinesche abbassate in un mese."
- "Sagra del cinghiale annullata. 'Non c'è più gente.'"
- "Scuola elementare: solo tre iscritti per la prima."
- "Sindaco: 'Le casse non sono mai state così piene.'"

**Trigger: fase terminale (35–10)**
- "Demolita la fontana di piazza per fare spazio a un autovelox."
- "Ultima farmacia minaccia chiusura. Comune valuta 'sussidio multe.'"
- "Pro loco sospesa per mancanza di iscritti."
- "Zero nascite registrate quest'anno."
- "Indagine ISTAT: 'Borgo a rischio scomparsa.'"
- "Comune vince bando europeo: 'Eccellenza nella gestione del traffico.'"

**Trigger: finale (sotto 10)**
- "Ultimo abitante lascia il paese. 'Almeno parcheggio dove voglio.'"
- "Il sindaco resta. 'Qualcuno deve amministrare.'"
- "Inaugurato monumento al Vigile Ignoto."
- "Le casse sono piene. Non c'è nessuno da servire."

### Achievement (18)

| # | Nome | Trigger |
|---|---|---|
| 1 | Apripista | Prima multa |
| 2 | Stipendio del mese | 100 € accumulati |
| 3 | Pugno di ferro | 100 multe totali |
| 4 | Effetto collaterale | Prima chiusura |
| 5 | Promosso sul campo | Acquista Vigile Senior |
| 6 | Mobilità sostenibile | Acquista Motorino |
| 7 | Iconico | Acquista Panda |
| 8 | Tecnologia al servizio | Acquista Autovelox |
| 9 | Sorveglianza moderna | Acquista ZTL |
| 10 | Cielo controllato | Acquista Drone |
| 11 | Il futuro è qui | Acquista AI Argo |
| 12 | Distopia completata | Acquista Vigile Predittivo |
| 13 | Mezzo paese | 50% negozi chiusi |
| 14 | Centro fantasma | 100% negozi chiusi |
| 15 | Cittadino dell'Anno | Vitalità sotto 25 |
| 16 | Bilancio in attivo | 1.000.000 € totali |
| 17 | Vittoria amministrativa | Vitalità a 0 |
| 18 | Pro Loco | Hai usato "Organizza Sagra" almeno 3 volte |

### Schermata finale

```
              ┌─────────────────────────────┐
              │                             │
              │     🏆 HAI VINTO 🏆         │
              │                             │
              │   €847.320 incassati        │
              │   Popolazione: 0            │
              │   Negozi aperti: 0          │
              │   Multe totali: 12.847      │
              │                             │
              │   "Ma le casse comunali     │
              │   non sono mai state        │
              │   così piene."              │
              │                             │
              │   [Condividi su WhatsApp]   │
              │   [Ricomincia]              │
              │                             │
              └─────────────────────────────┘
```

Sfondo: paese desaturato a colori grigi, lampione singolo che pulsa.

---

## 6. Architettura tecnica

### Stack

- **HTML5** semantic
- **CSS3** + Tailwind via CDN per styling rapido
- **JavaScript vanilla** ES6+, nessun framework
- **LocalStorage** per persistenza
- **Web Audio API** per SFX leggeri (opzionali)
- **GitHub Pages** per deploy

### File structure

```
multopoli/
├── index.html                # Entry point
├── style.css                 # Styling principale (oltre Tailwind)
├── README.md                 # Questa documentazione
├── LICENSE
├── og-image.png              # Anteprima social
├── js/
│   ├── main.js               # Bootstrap + game loop
│   ├── state.js              # Game state singleton
│   ├── upgrades.js           # Definizioni e logica upgrade
│   ├── shops.js              # Stato negozi
│   ├── events.js             # News ticker, random events
│   ├── achievements.js       # Sistema achievement
│   ├── render.js             # Rendering DOM, animazioni
│   ├── save.js               # LocalStorage handler
│   └── utils.js              # Helpers (formatNumber, etc.)
└── content/
    ├── news.json             # Database messaggi news
    ├── upgrades.json         # Database upgrade
    ├── shops.json            # Database negozi
    └── achievements.json     # Database achievement
```

### State model

```javascript
const initialState = {
  // Risorse
  cassa: 0,
  vitalita: 100,
  multeTotali: 0,
  multePerSecondo: 0,
  rabbiaCittadini: 0,

  // Upgrade
  upgrades: {
    vigileJunior: { posseduti: 0, costoBase: 50 },
    vigileSenior: { posseduti: 0, costoBase: 250 },
    motorino:     { posseduti: 0, costoBase: 1000 },
    // ...
  },

  // Negozi
  negozi: [
    { id: 1, nome: "Edicola di Piazza", aperto: true, soglia: 92 },
    { id: 2, nome: "Cartoleria Scuola e Sogni", aperto: true, soglia: 84 },
    // ...
  ],

  // Eventi
  newsRecenti: [],
  achievementsSbloccati: [],
  sagreOrganizzate: 0,

  // Meta
  startTime: Date.now(),
  lastTick: Date.now(),
  saved: Date.now()
}
```

### Game loop

```javascript
function tick(deltaMs) {
  // 1. Genera multe automatiche
  const multe = state.multePerSecondo * (deltaMs / 1000);
  state.cassa += multe * 5;
  state.multeTotali += multe;

  // 2. Decadimento vitalità
  const decay = calcDecay(state.multePerSecondo, state.vitalita);
  state.vitalita = Math.max(0, state.vitalita - decay * (deltaMs / 1000));

  // 3. Trigger chiusure negozi
  checkShopClosures();

  // 4. Trigger news ed eventi
  rollEvents(deltaMs);

  // 5. Check achievement
  checkAchievements();

  // 6. Check fine partita
  if (state.vitalita <= 0) endGame();

  // 7. Render
  render();
}

// Loop a 10 Hz (sufficiente per idle)
setInterval(() => tick(100), 100);
```

### Save system

```javascript
// Auto-save ogni 5 secondi
setInterval(() => {
  localStorage.setItem('multopoli_save', JSON.stringify(state));
}, 5000);

// Load on boot
const saved = localStorage.getItem('multopoli_save');
if (saved) Object.assign(state, JSON.parse(saved));
```

### Performance

- Tick logico a 10 Hz, render DOM solo su cambio reale
- Animazioni via CSS transitions, non JS
- Pedoni come `<div>` posizionati assolutamente con `will-change: transform`
- Lazy-load di asset audio

### Responsive

- Mobile-first
- Breakpoint 768px: mappa full-width, upgrade in bottom sheet
- Touch events nativi (no jQuery, no hammer.js)

---

## 7. Roadmap di sviluppo

| Fase | Durata stimata | Deliverable |
|---|---|---|
| **MVP** | 6–8 ore | Click → multa → cassa, 3 upgrade, vitalità che scende, 1 chiusura visibile, schermata finale base |
| **Polish core** | 6–8 ore | Tutti 9 upgrade, 10 negozi con chiusure progressive, news ticker (20 msg), save/load, achievement base |
| **Satira completa** | 4–6 ore | 40+ news, "Organizza Sagra", schermata finale ricca con stats e condivisione, audio FX |
| **Mobile + deploy** | 3–4 ore | Responsive, GitHub Pages, OG image, share buttons |
| **Bonus** | variabile | Easter egg con nomi vie reali del tuo paese, varianti (paese balneare/montano), leaderboard |

**Totale stimato MVP completo:** ~20–25 ore di lavoro

---

## 8. Deploy & Distribuzione

### Hosting

- **GitHub Pages** (gratis, custom domain opzionale)
- Repo pubblico: `multopoli` o `comune-virtuoso`
- Branch `main` → autodeploy

### SEO & social

- `<meta>` description: "Il gioco satirico che ogni cittadino e commerciante italiano dovrebbe provare."
- Open Graph image: paese desaturato + claim "Hai vinto. Il paese è vuoto."
- Twitter card large
- Schema.org Game

### Sharing

- Pulsante "Condividi su WhatsApp" con prefilled message:
  > "Ho appena distrutto un intero paese con le multe. Provaci anche tu 👉 [link]"
- Pulsante "Copia screenshot" della schermata finale (html2canvas)

### Analytics (opzionale)

- Plausible o Umami (privacy-friendly)
- Track: start partita, fine partita, condivisioni, durata media

---

## 9. Marketing & Diffusione

Note da chi fa marketing di mestiere:

### Audience primaria
- **Commercianti** di paesi piccoli/medi (forte motivazione condivisione)
- **Cittadini** che subiscono il problema parcheggi
- **Pagine social locali** ("Sei di [paese] se…") e gruppi FB di quartiere

### Canali
1. **WhatsApp** — il vero motore virale per questa fascia. Open Graph curato.
2. **Facebook gruppi locali** — post con screenshot finale + link
3. **Instagram Reel** — gameplay accelerato 30 sec con caption sarcastica
4. **TikTok** — variante con voice-over dialettale
5. **Telegram** — gruppi di paese e canali di informazione locale

### Hook di lancio
- Pubblicare in coincidenza con una notizia locale di "boom multe"
- Post-it: "Se anche nel tuo paese non si parcheggia più, questo gioco è per te."

### Possibile estensione commerciale
- Versione white-label per associazioni di categoria (Confcommercio locale, ecc.)
- Versione "il tuo paese" personalizzata (nomi vie reali, vigile capo locale) — servizio a pagamento

---

## 10. Apertura per evoluzioni

Idee parcheggiate per dopo:

- **Varianti tematiche:** paese balneare (multe per asciugamani fuori posto), montano (multe per parcheggio in pendenza), città media
- **Modalità "Cittadino"** — giochi dall'altra parte, cerchi di parcheggiare schivando vigili (mini-game arcade)
- **Multiplayer asincrono** — confronti il tuo "score di disastro" con altri sindaci
- **Editor paese** — l'utente costruisce il proprio borgo e lo distrugge

---

## Appendice A — Riferimenti & ispirazioni

- *Cookie Clicker* (struttura idle)
- *Universal Paperclips* (escalation narrativa + finale ironico)
- *Reigns* (decisioni binarie con esiti grotteschi)
- *Frostpunk* (palette che peggiora visivamente)
- *A Dark Room* (testo + economy minimale)

## Appendice B — Note legali

- Satira pura, nessun riferimento a comuni reali specifici nel testo (a meno che la "versione personalizzata" venga commissionata)
- Codice MIT
- Asset originali o creative commons
- Nessun dato personale raccolto (no login, no account)

---

*Documento di lavoro — v1.0. Da iterare durante lo sviluppo.*
