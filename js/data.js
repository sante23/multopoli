// ============================================================
// MULTOPOLI — San Marco Argentano Edition
// Game Data: upgrades, shops, news, achievements
// ============================================================

export const UPGRADES = [
  {
    id: 'vigileJunior',
    nome: 'Vigile Stagista',
    costoBase: 50,
    multePerSec: 1,
    flavor: "Cuginu d'u sindacu, fa pratica",
    icon: '\u{1F46E}'
  },
  {
    id: 'vigileSenior',
    nome: 'Vigile Senior',
    costoBase: 250,
    multePerSec: 5,
    flavor: "Trent'anni di servizio, conosce ogni macchina",
    icon: '\u{1F575}'
  },
  {
    id: 'motorino',
    nome: 'Motorino Piaggio',
    costoBase: 1000,
    multePerSec: 15,
    flavor: 'Risale i vicoli del centro storico',
    icon: '\u{1F6F5}'
  },
  {
    id: 'panda',
    nome: 'Panda dei Vigili',
    costoBase: 5000,
    multePerSec: 50,
    flavor: 'Iconica, blu navy con stemma',
    icon: '\u{1F697}'
  },
  {
    id: 'autovelox',
    nome: 'Autovelox',
    costoBase: 25000,
    multePerSec: 200,
    flavor: 'Per la sicurezza dei pellegrini',
    icon: '\u{1F4F8}'
  },
  {
    id: 'ztl',
    nome: 'Telecamere ZTL',
    costoBase: 100000,
    multePerSec: 800,
    flavor: 'Anche di notte, anche a Pasqua',
    icon: '\u{1F4F9}'
  },
  {
    id: 'drone',
    nome: 'Drone Fiscale',
    costoBase: 500000,
    multePerSec: 3000,
    flavor: 'Sorvola la Torre di Drogone H24',
    icon: '\u{1F6F8}'
  },
  {
    id: 'aiArgo',
    nome: 'AI Argo 3000',
    costoBase: 2500000,
    multePerSec: 12000,
    flavor: 'Riconoscimento targhe UniCal',
    icon: '\u{1F916}'
  },
  {
    id: 'vigilePredittivo',
    nome: "Vigile Predittivo",
    costoBase: 15000000,
    multePerSec: 60000,
    flavor: "Ti multa prima che parcheggi",
    icon: '\u{1F52E}'
  },
];

export const SHOPS = [
  { id: 'edicola',       nome: 'Edicola Manfredi',               tipo: 'Edicola',       piazza: 'selvaggi', soglia: 92, slot: 0 },
  { id: 'cartolibreria', nome: 'Cartolibreria Il Guiscardo',     tipo: 'Cartolibreria', piazza: 'umberto',  soglia: 84, slot: 1 },
  { id: 'gelateria',     nome: 'Gelateria Sichelgaita',          tipo: 'Gelateria',     piazza: 'umberto',  soglia: 76, slot: 0 },
  { id: 'parrucchiere',  nome: "Parrucchiere Tony",              tipo: 'Parrucchiere',  piazza: 'selvaggi', soglia: 68, slot: 1 },
  { id: 'macelleria',    nome: 'Macelleria Le Carni del Pollino', tipo: 'Macelleria',    piazza: 'umberto',  soglia: 60, slot: 2 },
  { id: 'frantoio',      nome: 'Frantoio Bruzio DOP',            tipo: 'Frantoio',      piazza: 'riforma',  soglia: 52, slot: 0 },
  { id: 'forno',         nome: 'Forno Pane Antico',              tipo: 'Forno',         piazza: 'selvaggi', soglia: 44, slot: 2 },
  { id: 'trattoria',     nome: "Trattoria U' Guiscardo",         tipo: 'Trattoria',     piazza: 'umberto',  soglia: 36, slot: 3 },
  { id: 'bar',           nome: 'Bar Centrale "Da Peppe"',        tipo: 'Bar storico',   piazza: 'selvaggi', soglia: 28, slot: 3 },
  { id: 'farmacia',      nome: 'Farmacia Comunale',              tipo: 'Farmacia',      piazza: 'riforma',  soglia: 15, slot: 1 },
];

export const NEWS = [
  // Phase 0 — Primissime multe (vitalita 100-95)
  { text: "'Ndo u parcheggi, cumpa?' Un passante schiva il vigile.", minVit: 95, maxVit: 100 },
  { text: "Nuova iniziativa comunale: potenziamento della polizia municipale.", minVit: 95, maxVit: 100 },
  { text: "Primi verbali del mese. Il sindaco annuisce compiaciuto.", minVit: 95, maxVit: 100 },

  // Phase 1 — Prime multe (vitalita 95-85)
  { text: "Comune incassa cifra record dalle multe. Sindaco soddisfatto.", minVit: 85, maxVit: 95 },
  { text: "Nuova ordinanza: divieto di sosta esteso anche a Piazza Selvaggi.", minVit: 85, maxVit: 95 },
  { text: "Vigile Sganga premiato come Impiegato del Mese.", minVit: 85, maxVit: 95 },
  { text: "Comitato cittadini chiede chiarimenti al Consiglio. Ignorato.", minVit: 85, maxVit: 95 },
  { text: "Il comandante: 'Stiamo solo applicando il regolamento.'", minVit: 85, maxVit: 95 },
  { text: "ZTL temporanea in Piazza Umberto I durante la processione.", minVit: 85, maxVit: 95 },

  // Phase 2 — Prime chiusure (85-60)
  { text: "Storica Edicola Manfredi chiude dopo 40 anni. 'I clienti non si fermavano piu.'", minVit: 60, maxVit: 85 },
  { text: "Cartolibreria 'Il Guiscardo' abbassa la saracinesca. Le mamme: 'I quaderni li compriamo a Cosenza.'", minVit: 60, maxVit: 85 },
  { text: "Pellegrini di San Francesco dirottati su Paola: 'Qui non si scarica nemmeno la valigia.'", minVit: 60, maxVit: 85 },
  { text: "Comune vince il premio 'Borgo piu Sanzionatorio della Calabria.'", minVit: 60, maxVit: 85 },
  { text: "Sagra dell'Olio Bruzio DOP rinviata: nessuno e' riuscito a parcheggiare.", minVit: 60, maxVit: 85 },
  { text: "Anziani: 'Per ritirare la pensione devo prendere il taxi fino a Roggiano.'", minVit: 60, maxVit: 85 },
  { text: "Inaugurato nuovo parcheggio multipiano. A 3 km dal centro storico.", minVit: 60, maxVit: 85 },
  { text: "Diocesi preoccupata: visite al Convento dei Riformati dimezzate.", minVit: 60, maxVit: 85 },
  { text: "La Pro Loco: 'Stiamo lavorando.' (Bilancio annuale a -82%)", minVit: 60, maxVit: 85 },

  // Phase 3 — Meta partita (60-35)
  { text: "Frantoio Bruzio DOP chiude. 'L'olio si vende online, qui non viene piu nessuno.'", minVit: 35, maxVit: 60 },
  { text: "Il vigile capo nominato Cittadino dell'Anno (unico candidato).", minVit: 35, maxVit: 60 },
  { text: "Confcommercio Cosenza: 'San Marco e' un caso scuola di disastro commerciale.'", minVit: 35, maxVit: 60 },
  { text: "Forno Pane Antico spegne i forni dopo tre generazioni.", minVit: 35, maxVit: 60 },
  { text: "Scuola elementare: cinque iscritti per la prima.", minVit: 35, maxVit: 60 },
  { text: "Sindaco: 'Le casse comunali non sono mai state cosi piene dai tempi normanni.'", minVit: 35, maxVit: 60 },
  { text: "Festa di San Marco Evangelista: 12 multe emesse durante la processione.", minVit: 35, maxVit: 60 },
  { text: "Mostra fotografica 'San Marco com'era' in Villa Comunale. Nessun visitatore.", minVit: 35, maxVit: 60 },
  { text: "Macelleria Le Carni del Pollino chiude. Il titolare emigra a Cosenza.", minVit: 35, maxVit: 60 },
  { text: "Bilancio comunale in attivo per la prima volta dal 1985.", minVit: 35, maxVit: 60 },

  // Phase 4 — Crisi profonda (35-15)
  { text: "Trattoria 'U' Guiscardo' chiude. Ultimo piatto servito: pasta e patate.", minVit: 15, maxVit: 35 },
  { text: "Demolita una panchina di Piazza Selvaggi per due nuovi stalli a pagamento.", minVit: 15, maxVit: 35 },
  { text: "Olio Bruzio DOP invenduto in cantina. La DOP a rischio.", minVit: 15, maxVit: 35 },
  { text: "Pellegrinaggio a La Benedetta cancellato: 'I pullman non possono fermarsi.'", minVit: 15, maxVit: 35 },
  { text: "Comune vince bando europeo: 'Eccellenza nella gestione del traffico urbano.'", minVit: 15, maxVit: 35 },
  { text: "Bar Centrale 'Da Peppe' chiude dopo 60 anni. Peppe: 'Sessant'anni buttati.'", minVit: 15, maxVit: 35 },
  { text: "Il sindaco non commenta. Ha vinto il terzo mandato con 47 voti.", minVit: 15, maxVit: 35 },
  { text: "ISTAT: San Marco sotto i 6.000 abitanti per la prima volta dal 1861.", minVit: 15, maxVit: 35 },
  { text: "Gelateria Sichelgaita chiude. 'Pure Sichelgaita s'e' scocciata.'", minVit: 15, maxVit: 35 },
  { text: "Parrucchiere Tony saluta: 'Vado a Cosenza.'", minVit: 15, maxVit: 35 },

  // Phase 5 — Fantasma (sotto 15)
  { text: "Serenata in dialetto sotto il municipio. Cinque presenti, tutti vigili.", minVit: 1, maxVit: 15 },
  { text: "Diocesi sospende le visite al Convento dei Riformati: 'Nessuno arriva.'", minVit: 1, maxVit: 15 },
  { text: "Ultima farmacia minaccia chiusura. Il Comune valuta un 'sussidio multe.'", minVit: 1, maxVit: 15 },
  { text: "La Pro Loco si scioglie. Verbale finale: 'Non c'e' piu paese.'", minVit: 1, maxVit: 15 },
  { text: "Zero nascite registrate quest'anno.", minVit: 1, maxVit: 15 },
  { text: "Comune intitola la nuova rotatoria al Vigile Ignoto.", minVit: 1, maxVit: 15 },
  { text: "La fontana di Sichelgaita e' ancora li. Ma e' circondata da strisce blu.", minVit: 1, maxVit: 15 },
  { text: "L'ultimo abitante lascia il paese. 'Almeno mo parcheggio dove voglio.'", minVit: 1, maxVit: 15 },
  { text: "Sindaco resta in carica. 'Qualcuno deve amministrare.'", minVit: 1, maxVit: 15 },
  { text: "Le casse sono piene. Non c'e' nessuno da servire.", minVit: 1, maxVit: 15 },

  // Phase 6 — Schermata finale (vitalita = 0)
  { text: "San Marco Argentano premiato a Bruxelles: 'Modello di efficienza amministrativa.'", minVit: 0, maxVit: 0 },
  { text: "La Torre di Drogone illuminata a giorno. Sola, come 900 anni fa.", minVit: 0, maxVit: 0 },
  { text: "Il vigile capo inaugura il monumento al Vigile Ignoto in Piazza Selvaggi.", minVit: 0, maxVit: 0 },
  { text: "Sichelgaita avvistata in piazza alle 3 di notte. Multata.", minVit: 0, maxVit: 0 },
];

export const ACHIEVEMENTS = [
  { id: 'apripista',       nome: 'Apripista',                desc: 'Prima multa emessa',           icon: '\u{1F4CB}' },
  { id: 'stipendio',       nome: 'Stipendio del mese',       desc: '100 \u20AC accumulati',        icon: '\u{1F4B0}' },
  { id: 'cuginu',          nome: "Cuginu d'u Sindacu",       desc: 'Assumi il Vigile Stagista',    icon: '\u{1F476}' },
  { id: 'effetto',         nome: 'Effetto collaterale',      desc: 'Prima chiusura',               icon: '\u{1F6AA}' },
  { id: 'pane',            nome: 'Pane addio',               desc: 'Il Forno chiude',              icon: '\u{1F35E}' },
  { id: 'peppe',           nome: 'Peppe se ne va',           desc: 'Chiude il Bar Centrale',       icon: '\u{2615}' },
  { id: 'sessantanni',     nome: "Sessant'anni buttati",     desc: 'Il Bar Da Peppe chiude',       icon: '\u{1F622}' },
  { id: 'fantasma',        nome: 'Centro fantasma',          desc: 'Tutti i negozi chiusi',        icon: '\u{1F47B}' },
  { id: 'cittadino',       nome: "Cittadino dell'Anno",      desc: 'Vitalita sotto 25',            icon: '\u{1F3C5}' },
  { id: 'normanno',        nome: 'Bilancio normanno',        desc: '1.000.000 \u20AC totali',      icon: '\u{1F3F0}' },
  { id: 'bruxelles',       nome: 'Bruxelles chiama',         desc: '5.000 multe totali',           icon: '\u{1F1EA}\u{1F1FA}' },
  { id: 'pellegrino',      nome: 'Pellegrino mancato',       desc: 'Vitalita sotto 30',            icon: '\u{1F64F}' },
  { id: 'proloco',         nome: 'Pro Loco sciolta',         desc: 'Vitalita sotto 20',            icon: '\u{1F4C9}' },
  { id: 'sichelgaita',     nome: 'Spirito di Sichelgaita',   desc: 'Hai visto il fantasma',        icon: '\u{2728}' },
  { id: 'magnifico',       nome: "U' Magnifico",             desc: 'Acquisti il Vigile Predittivo', icon: '\u{1F52E}' },
  { id: 'vittoria',        nome: 'Vittoria amministrativa',  desc: 'Vitalita a 0',                 icon: '\u{1F3C6}' },
  { id: 'ultimo',          nome: "L'ultimo della Calabria",  desc: '5+ sagre organizzate',          icon: '\u{1F3AA}' },
  { id: 'sagra_annullata', nome: 'Sagra annullata',          desc: 'Vinci senza mai organizzare una sagra', icon: '\u{1F6AB}' },
];

// Car colors for visual variety
export const CAR_COLORS = [
  '#C0392B', '#2980B9', '#27AE60', '#F39C12', '#8E44AD',
  '#1ABC9C', '#D35400', '#7F8C8D', '#2C3E50', '#E74C3C',
  '#3498DB', '#E67E22', '#9B59B6', '#16A085', '#F1C40F',
];

// Piazza definitions for rendering
export const PIAZZAS = [
  { id: 'umberto',  nome: 'Piazza Umberto I',  label: 'Piazza Umberto I',  carSlots: 4 },
  { id: 'selvaggi', nome: 'Piazza Selvaggi',   label: 'Piazza Selvaggi',   carSlots: 4 },
  { id: 'riforma',  nome: 'Piazza Riforma',    label: 'Piazza Riforma',    carSlots: 3 },
];
