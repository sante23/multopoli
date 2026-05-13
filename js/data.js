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
  { text: "Turista svizzero multato in piazza: 'Ho portato la cioccolata e m'anu multatu! Me ne torno in Svizzera!'", minVit: 85, maxVit: 95 },
  { text: "Multato un passante con la carriola piena di fichi. Infrazione: veicolo non immatricolato.", minVit: 85, maxVit: 95 },

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
  { text: "Asinello legato in Piazza Selvaggi multato per divieto di sosta. Il proprietario: 'Ma e' un asino!'", minVit: 60, maxVit: 85 },
  { text: "Tre capre dalla Motta bloccano il Corso. Il vigile non sa a chi intestare il verbale.", minVit: 60, maxVit: 85 },
  { text: "Sedia a rotelle multata sulle strisce blu. Il video fa il giro d'Italia.", minVit: 60, maxVit: 85 },

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
  { text: "Bambino multato per aver lasciato la bici al palo della sosta. La mamma fa un video virale.", minVit: 35, maxVit: 60 },
  { text: "Due vecchietti multati per 'occupazione abusiva di stallo' con un tavolo da briscola.", minVit: 35, maxVit: 60 },
  { text: "Il pizzaiolo non consegna piu' in centro. 'Ogni consegna mi costa una multa.'", minVit: 35, maxVit: 60 },
  { text: "Contadino multato col trattore in piazza. 'L'anno prossimo le olive le portu a Roggiano.'", minVit: 35, maxVit: 60 },

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
  { text: "Camper tedesco di 9 metri bloccato in Via Roberto il Guiscardo. Il navigatore diceva 'strada percorribile'.", minVit: 15, maxVit: 35 },
  { text: "Un gatto randagio dorme su uno stallo a pagamento. Il vigile valuta il verbale.", minVit: 15, maxVit: 35 },
  { text: "Famiglia in partenza multata col furgone trasloco. 'Pure l'ultima multa. Grazie di tutto, sinda'.'", minVit: 15, maxVit: 35 },

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
  { text: "L'unico essere vivente in centro e' un gatto. Multato.", minVit: 1, maxVit: 15 },
  { text: "Il vigile multa la propria auto di servizio per errore. Nessuno ride.", minVit: 1, maxVit: 15 },

  // Phase 6 — Schermata finale (vitalita = 0)
  { text: "San Marco Argentano premiato a Bruxelles: 'Modello di efficienza amministrativa.'", minVit: 0, maxVit: 0 },
  { text: "La Torre di Drogone illuminata a giorno. Sola, come 900 anni fa.", minVit: 0, maxVit: 0 },
  { text: "Il vigile capo inaugura il monumento al Vigile Ignoto in Piazza Selvaggi.", minVit: 0, maxVit: 0 },
  { text: "Sichelgaita avvistata in piazza alle 3 di notte. Multata.", minVit: 0, maxVit: 0 },
];

export const ACHIEVEMENTS = [
  { id: 'apripista',       nome: 'Apripista',                desc: 'Prima multa emessa',           icon: '\u{1F4CB}', hint: 'Ogni viaggio comincia con un singolo passo.' },
  { id: 'stipendio',       nome: 'Stipendio del mese',       desc: '100 \u20AC accumulati',        icon: '\u{1F4B0}', hint: 'Anche un vigile deve mangiare.' },
  { id: 'cuginu',          nome: "Cuginu d'u Sindacu",       desc: 'Assumi il Vigile Stagista',    icon: '\u{1F476}', hint: 'Il sangue non e\' acqua.' },
  { id: 'effetto',         nome: 'Effetto collaterale',      desc: 'Prima chiusura',               icon: '\u{1F6AA}', hint: 'Non tutte le porte restano aperte.' },
  { id: 'pane',            nome: 'Pane addio',               desc: 'Il Forno chiude',              icon: '\u{1F35E}', hint: 'L\'odore del forno non si sente piu\'.' },
  { id: 'peppe',           nome: 'Peppe se ne va',           desc: 'Chiude il Bar Centrale',       icon: '\u{2615}', hint: 'Sessant\'anni di caffe\'...' },
  { id: 'sessantanni',     nome: "Sessant'anni buttati",     desc: 'Il Bar Da Peppe chiude',       icon: '\u{1F622}', hint: '...buttati.' },
  { id: 'fantasma',        nome: 'Centro fantasma',          desc: 'Tutti i negozi chiusi',        icon: '\u{1F47B}', hint: 'Chi e\' l\'ultimo spenga la luce.' },
  { id: 'cittadino',       nome: "Cittadino dell'Anno",      desc: 'Vitalita sotto 25',            icon: '\u{1F3C5}', hint: 'Nessun altro candidato.' },
  { id: 'normanno',        nome: 'Bilancio normanno',        desc: '1.000.000 \u20AC totali',      icon: '\u{1F3F0}', hint: 'Non si vedevano cifre cosi\' dai tempi del Guiscardo.' },
  { id: 'bruxelles',       nome: 'Bruxelles chiama',         desc: '5.000 multe totali',           icon: '\u{1F1EA}\u{1F1FA}', hint: 'L\'Europa apprezza la tua efficienza.' },
  { id: 'pellegrino',      nome: 'Pellegrino mancato',       desc: 'Vitalita sotto 30',            icon: '\u{1F64F}', hint: 'San Francesco avrebbe qualcosa da dire.' },
  { id: 'proloco',         nome: 'Pro Loco sciolta',         desc: 'Vitalita sotto 20',            icon: '\u{1F4C9}', hint: 'Non c\'e\' piu\' locale.' },
  { id: 'sichelgaita',     nome: 'Spirito di Sichelgaita',   desc: 'Hai visto il fantasma',        icon: '\u{2728}', hint: 'Il vento porta sussurri...' },
  { id: 'magnifico',       nome: "U' Magnifico",             desc: 'Acquisti il Vigile Predittivo', icon: '\u{1F52E}', hint: 'Il futuro e\' adesso.' },
  { id: 'vittoria',        nome: 'Vittoria amministrativa',  desc: 'Vitalita a 0',                 icon: '\u{1F3C6}', hint: 'Ce l\'hai fatta. A che prezzo?' },
  { id: 'ultimo',          nome: "L'ultimo della Calabria",  desc: '5+ sagre organizzate',          icon: '\u{1F3AA}', hint: 'C\'e\' ancora speranza?' },
  { id: 'sagra_annullata', nome: 'Sagra annullata',          desc: 'Vinci senza mai organizzare una sagra', icon: '\u{1F6AB}', hint: 'Zero sagre, massima efficienza.' },
];

// ============================================================
// COMITATO DI RESISTENZA PAESANO
// Rosso: 50 anni, ex attivista di estrema sinistra, ora commerciante.
// Sarcastico, polemico, ha sempre ragione. Mescola retorica politica
// e dialetto sammarchese. La lotta di classe applicata ai parcheggi.
// ============================================================

export const ROSSO_MESSAGES = [
  // Pressione bassa (0-20%) — Rosso brontola dal bancone, sarcasmo leggero
  { text: "Sinda', si stava meglio quando si stava peggio. E si stava peggio assai.", minPress: 0, maxPress: 20 },
  { text: "Chiovanu multe ca para na tempesta. E ppe' 'u populu non c'e' mancu l'ombrello.", minPress: 0, maxPress: 20 },
  { text: "Io a vent'anni occupavo le fabbriche. Mo' devo occupare un parcheggio ppe' campare.", minPress: 0, maxPress: 20 },
  { text: "Ma tu 'u sai ca 'a gente non vene cchiu' ccane? O ti 'u deve dire Marx?", minPress: 0, maxPress: 20 },
  { text: "Questa non e' amministrazione, e' esproprio proletario al contrario. Rubare ai poveri ppe' dare alla cassa.", minPress: 0, maxPress: 20 },
  { text: "Hanno fatto 'a multa a unu pure alla montagna. Divieto di sosta alla casetta di cacciatori!", minPress: 0, maxPress: 20 },

  // Pressione media (20-50%) — Rosso si organizza, tira fuori la dialettica
  { text: "Ho parlato cu' 'u Prefetto. Ti conviene calmarti, cumpa'. Io 'a pacienza l'haiu lunga, ma non eterna.", minPress: 20, maxPress: 50 },
  { text: "Abbiamo raccolto 200 firme. Duecento. Ci su' cchiu' firme che abitanti rimasti. Pensa un po'.", minPress: 20, maxPress: 50 },
  { text: "'U bar e' chiusu, 'a libreria e' chiusa... mo' chi vi paga le multe, i piccioni? Questa e' la vostra economia.", minPress: 20, maxPress: 50 },
  { text: "Mi dicunu ca pure 'u parroco ha pigliatu 'a multa. Vergogna! Mancu 'a chiesa vi ferma.", minPress: 20, maxPress: 50 },
  { text: "Stasera assemblea al Convento. Viene tutto 'u rione. Come nel '77, ma cu' meno capelli e cchiu' ragione.", minPress: 20, maxPress: 50 },
  { text: "Gramsci diceva: 'Istruitevi, organizzatevi, agitatevi.' Noi ci stiamo organizzando, sinda'.", minPress: 20, maxPress: 50 },
  { text: "'A multa l'ha pigliata pure 'u gatto. E mancu 'a patente tene. Bell'amministrazione.", minPress: 20, maxPress: 50 },
  { text: "Trent'anni fa lottavamo ppe' i diritti dei lavoratori. Mo' lottiamo ppe' parcheggiare davanti al negozio. Che progresso.", minPress: 20, maxPress: 50 },

  // Pressione alta (50-80%) — Rosso e' in modalita' comizio, furioso e lucido
  { text: "Sinda', mi stai facennu perdere 'a pacienza. E io sugno unu ca ha fatto i picchetti alla Fiat, figurati.", minPress: 50, maxPress: 80 },
  { text: "L'ultima volta che ho visto cosi' tante divise era al G8. E la' almeno avevamo ragione. Pure ccane.", minPress: 50, maxPress: 80 },
  { text: "Ho chiamatu 'u TG3 Calabria. Arrivanu domani cu' le telecamere. Vediamo si parli cosi' bene davanti a Ferrara.", minPress: 50, maxPress: 80 },
  { text: "'A piazza Selvaggi non si parcheggia, non si cammina, non si respira. Si multa e basta. Questa la chiami democrazia?", minPress: 50, maxPress: 80 },
  { text: "Mo' basta. Porto i commercianti in piazza. Tutti. Come si faceva una volta, sinda'. Occupazione permanente.", minPress: 50, maxPress: 80 },
  { text: "Pure 'a signura Concetta ca porta i fiori al cimitero ha pigliatu 'a multa. Complimenti. Multate pure i morti, no?", minPress: 50, maxPress: 80 },
  { text: "Il capitale si accumula nelle casse del Comune. I lavoratori perdono il negozio. Marx aveva ragione, anche a San Marco.", minPress: 50, maxPress: 80 },
  { text: "Voi proteggete il regolamento. Noi proteggiamo il paese. Vediamo chi vince alla lunga.", minPress: 50, maxPress: 80 },

  // Pressione massima (80-100%) — Rosso dichiara guerra, comizio finale
  { text: "Sinda', questo e' l'ultimo avvertimento. Poi blocchiamo tutto. E io 'i blocchi li sacciu fare.", minPress: 80, maxPress: 100 },
  { text: "Chiamu 'u giornale, chiamu 'a televisione, chiamu 'u sindacato. Vuoi la lotta? Hai la lotta.", minPress: 80, maxPress: 100 },
  { text: "Da domani sciopero generale. Nessuno apre. Nessuno compra. Come ai tempi belli, sinda'. Solidarieta' di classe.", minPress: 80, maxPress: 100 },
  { text: "Hai voluto la bicicletta? Mo' pedalare... ma attento alla multa per sosta vietata della bici!", minPress: 80, maxPress: 100 },
  { text: "'U paese e' morto, sinda'. E l'hai ammazzato tu cu' 'u taccuinu. La storia ti giudichera'. E io pure.", minPress: 80, maxPress: 100 },
  { text: "Io ho fatto le barricate a Cosenza nel '94. Tu pensi ca mi fanno paura i vigili? Scendiamo in piazza.", minPress: 80, maxPress: 100 },
  { text: "Quando l'ultimo negozio chiude, vieni a bussare da me. Ti offro un caffe'. Se trovo ancora chi me lo vende.", minPress: 80, maxPress: 100 },
];

export const COMITATO_ACTIONS = [
  { soglia: 20, tipo: 'volantini',  nome: 'Volantini del Comitato',        effetto: 'news',     desc: 'Il Comitato di Resistenza Paesano distribuisce volantini.' },
  { soglia: 40, tipo: 'petizione',  nome: 'Petizione al Prefetto',         effetto: 'slowdown', desc: 'Rosso consegna 200 firme. Multe rallentate per 20s.' },
  { soglia: 60, tipo: 'protesta',   nome: 'Occupazione di Piazza Selvaggi', effetto: 'block',   desc: 'Il Comitato occupa la piazza. Multe bloccate per 20s!' },
  { soglia: 80, tipo: 'tg3',        nome: 'Servizio del TG3 Calabria',     effetto: 'choice',   desc: 'Le telecamere sono in piazza. Rosso parla al microfono.' },
  { soglia: 95, tipo: 'sciopero',   nome: 'Sciopero generale',             effetto: 'shutdown', desc: 'Rosso chiama lo sciopero. Il paese si ferma. Zero income per 30s.' },
];

// ============================================================
// CARTE AZIONE DEL SINDACO — micro-scelte ogni 60s
// ============================================================

export const CARTE_AZIONE = [
  {
    titolo: 'Pattugliamento personale',
    desc: 'Esci con i vigili per un giro di ispezione.',
    optionA: { label: 'Vai!', effetto: { multeBonus: 2, durata: 15, pressione: 8 }, response: 'Multe raddoppiate per 15s. Rosso ti vede passare e scuote la testa: "Pare \'a Gestapo."' },
    optionB: { label: 'Resta in ufficio', effetto: {}, response: 'Una mattinata tranquilla. Nessun danno, nessun guadagno.' },
  },
  {
    titolo: 'Ricevi i cittadini',
    desc: 'Una fila di persone aspetta fuori dal municipio. Rosso e\' in prima fila.',
    optionA: { label: 'Ascoltali', effetto: { vitalita: 4, pressione: -15, blockMulte: 10 }, response: 'Rosso parla per venti minuti. Il Che Guevara, i diritti, le strisce blu. Ma la tensione scende.' },
    optionB: { label: 'Non ho tempo', effetto: { pressione: 10 }, response: 'Li ignori. Rosso dal corridoio: "Tipico. Il potere non ascolta mai il popolo."' },
  },
  {
    titolo: 'Conferenza stampa',
    desc: 'I giornalisti locali vogliono una dichiarazione.',
    optionA: { label: 'Difendi le multe', effetto: { cassa: 500, pressione: 12 }, response: '"Le casse non sono mai state cosi\' piene!" Rosso in fondo alla sala ride amaro.' },
    optionB: { label: 'Prometti moderazione', effetto: { pressione: -20, vitalita: 2 }, response: 'Prometti di rallentare. Rosso annuisce scettico: "\'U lupo perde \'u pilu ma non \'u viziu."' },
  },
  {
    titolo: 'Cena col Prefetto',
    desc: 'Il Prefetto di Cosenza vuole conoscerti.',
    optionA: { label: 'Vai a cena', effetto: { upgradeSconto: 0.3 }, response: 'Serata lunga. Prossimo upgrade scontato del 30%. Rosso: "Cene cu\' \'u potere. Classico."' },
    optionB: { label: 'Declina', effetto: { vitalita: 2 }, response: 'Resti a San Marco. Mangi da Nonna Rosa. Se e\' ancora aperta.' },
  },
  {
    titolo: 'Pisolino pomeridiano',
    desc: 'La giornata e\' lunga. Il divano dell\'ufficio chiama.',
    optionA: { label: 'Riposati', effetto: { vitalita: 5, blockMulte: 8 }, response: 'Un pisolino rigenerante. Ma Rosso ti becca e manda la foto al TG3: "Dorme mentre \'u paese more."' },
    optionB: { label: 'Caffe\' e avanti', effetto: { multeBonus: 1.5, durata: 10 }, response: 'Doppio espresso. Energie rinnovate, multe potenziate per 10s.' },
  },
  {
    titolo: 'Inaugurazione rotonda',
    desc: 'La nuova rotonda e\' pronta. Con 6 nuovi stalli a pagamento.',
    optionA: { label: 'Gran cerimonia', effetto: { cassa: 300, pressione: 8 }, response: 'Taglio del nastro. Rosso dalla folla: "Bravi, na rotonda! Mo\' ci giriamo intorno come \'a vita nostra."' },
    optionB: { label: 'Inaugurazione sobria', effetto: { vitalita: 2, pressione: -5 }, response: 'Niente fanfara. Rosso apprezza: "Almeno non ci prendi pure ppe\' fessi."' },
  },
  {
    titolo: 'Richiesta dalla Diocesi',
    desc: 'Il vescovo chiede parcheggio libero per la messa della domenica.',
    optionA: { label: 'Concedi', effetto: { vitalita: 6, pressione: -10 }, response: 'La messa e\' piena. Rosso: "Io sugno ateo, ma almeno \'u Padreterno non fa le multe."' },
    optionB: { label: 'Regolamento!', effetto: { cassa: 200, pressione: 15 }, response: 'Rosso al megafono: "Ha multato pure \'u Padreterno! Non c\'e\' cchiu\' religione!"' },
  },
  {
    titolo: 'Gita a Cosenza',
    desc: 'Una giornata fuori da San Marco. Shopping e relax.',
    optionA: { label: 'Vai a Cosenza', effetto: { blockMulte: 15, pressione: -8, vitalita: 3 }, response: 'Ti godi Corso Mazzini. Le multe si fermano. Rosso: "Almeno a Cosenza si parcheggia."' },
    optionB: { label: 'Resta al comando', effetto: { multeBonus: 1.5, durata: 12 }, response: 'Rimani al posto. Produttivita\' massima. Rosso: "\'U stakanovista delle multe."' },
  },
];

// ============================================================
// MONUMENTI — Schede storiche cliccabili
// ============================================================

export const MONUMENTI = [
  {
    id: 'torre',
    nome: 'Torre di Drogone',
    anno: '1048',
    storia: 'Costruita da Drogone d\'Altavilla, primo Conte normanno di Puglia, intorno al 1048. Alta 22 metri, sorge su una motta artificiale — il tipico sistema difensivo normanno. Suo fratello Roberto il Guiscardo fece di San Marco la capitale del suo Contado. Da qui parti\' la conquista normanna del Sud Italia. Ha quasi 1000 anni e ha visto passare re, terremoti, guerre. E\' ancora in piedi.',
    curiosita: 'Il nome "Guiscardo" significa "l\'astuto" in normanno antico. Roberto era famoso per i suoi stratagemmi in battaglia — una volta fece finta di essere morto per sorprendere i nemici.',
  },
  {
    id: 'fontana',
    nome: 'Fontana di Sichelgaita',
    anno: 'XI sec.',
    storia: 'Dedicata a Sichelgaita di Salerno, principessa longobarda e seconda moglie di Roberto il Guiscardo. Non era una moglie decorativa: combatteva in armatura accanto al marito. Nella battaglia di Durazzo (1081) rallento\' la ritirata dei normanni insultando i soldati in fuga. Anna Comnena, storica bizantina, la descrisse come "una seconda Atena".',
    curiosita: 'La leggenda dice che chi pronuncia il nome di Sichelgaita a San Marco sente un soffio di vento freddo sulla pelle. Anche d\'estate. Nel gioco, il suo spirito appare ogni tanto e regala vitalita\'.',
  },
  {
    id: 'convento',
    nome: 'Convento dei Riformati',
    anno: '1429',
    storia: 'Convento francescano che nel 1429 ospito\' San Francesco da Paola, allora ragazzo di soli 13 anni. Visse per un anno in una piccola cella, oggi chiamata "La Benedetta", in preghiera e penitenza. Da qui parti\' per fondare l\'Ordine dei Minimi, diventando il santo patrono della Calabria e della gente di mare.',
    curiosita: 'Francesco arrivo\' a San Marco a piedi da Paola, attraversando le montagne della Catena Costiera. Aveva 13 anni e camminava scalzo. Oggi quel percorso e\' un sentiero escursionistico di 60 km.',
  },
  {
    id: 'cattedrale',
    nome: 'Cattedrale di San Nicola',
    anno: 'XI sec.',
    storia: 'Cattedrale normanna dell\'XI secolo, voluta da Roberto il Guiscardo. Conserva un portale scolpito e capitelli romanici unici in Calabria. Per secoli fu il centro religioso di un\'ampia diocesi. Il campanile domina lo skyline del borgo ed e\' visibile da tutta la valle del Crati.',
    curiosita: 'Il nome "Argentano" potrebbe derivare da antiche miniere d\'argento nella zona, oppure dal fiume Argentino che scorre nelle vicinanze. San Marco fu sede vescovile dal 1000 circa fino alla fusione con la diocesi di Scalea.',
  },
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
