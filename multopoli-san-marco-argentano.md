# Multopoli — San Marco Argentano Edition

> *Addendum di localizzazione al game design document principale.*
> *Versione 1.0 — Sostituisce sezioni 4 (Visual), 5 (Content) e parti di 2 (Game Design).*

---

## Premessa

Il gioco diventa ambientato nel **centro storico di San Marco Argentano (CS)**. La satira colpisce *il sistema delle multe e l'eccesso di sanzionatorio*, **non** il patrimonio storico-culturale. Anzi: Torre di Drogone, Sichelgaita, San Francesco da Paola, Convento dei Riformati e olio Bruzio DOP sono trattati con rispetto — sono ciò che il paese **rischia di perdere** quando i vigili svuotano il centro.

Il tono resta: ironia calabrese, affettuosa, mai sprezzante. La voce del paese che ride amaro di sé stesso.

---

## 1. Setting & Ambientazione

### Layout urbano nel gioco

Il centro storico è strutturato su tre **piazze interconnesse** lungo il Corso principale (asse Vittorio Emanuele III), in salita verso la Torre normanna:

```
            🗼 Torre di Drogone
                  │
                  │ Via Roberto il Guiscardo
                  ▼
       ┌────── Piazza Umberto I ──────┐    (ex "Piazza di Sopra")
       │                              │
       │       Corso principale       │
       │                              │
       ├────── Piazza Selvaggi ───────┤    (ex "Piazza Inferiore")
       │                              │
       │                              │
       └────── Piazza Riforma ────────┘    (porta del centro storico)
                  │
              Convento dei Riformati
              + La Benedetta
              + Villa Comunale Dalla Chiesa
              + Fontana di Sichelgaita
```

### Landmark sempre visibili sulla mappa

- 🗼 **Torre di Drogone** — sullo sfondo, in alto, iconica. Quando il paese si svuota resta lei sola illuminata.
- ⛲ **Fontana di Sichelgaita** — in Piazza Riforma / Villa Comunale.
- ⛪ **Convento dei Riformati** — adiacente a Piazza Riforma.
- 🏛️ **Cattedrale di San Nicola** — visibile sullo skyline.

### Zone giocabili (le 3 piazze)

Ogni piazza è una sub-area con i propri stalli, le proprie attività e i propri eventi:

| Piazza | Carattere | Attività affacciate |
|---|---|---|
| **Piazza Riforma** | Porta del centro, monumentale | Pasticceria, Frantoio, edicola votiva |
| **Piazza Selvaggi** | Cuore commerciale storico | Bar storico, forno, tabacchi, parrucchiere |
| **Piazza Umberto I** | Salita verso la Torre, raffinata | Trattoria, libreria, gelateria, macelleria |

La macchina del giocatore (e quelle dei "cittadini-target da multare") si muove sul Corso e si ferma a turno nelle tre piazze.

---

## 2. Visual Design localizzato

### Estetica

Centro storico calabrese in pietra e mattoni, vicoli stretti, scalinate, palazzi nobiliari (eco del Palazzo Conti-Selvaggi). Materiali: mattoni cotti, pietra grigia, intonaci ocra/giallo paglierino scrostati dal tempo. Tetti in coppi rossi.

### Palette progressiva — versione mediterranea

**Fase 1 — Vivo (vitalità 100–70)**
- Cielo `#9DD9F3` (cielo di Calabria)
- Pietra `#C9A776`, mattone `#A0522D`, intonaco `#E8C39E`
- Ombre verdi olivo `#7B8E5A`
- Bandierine festa patronale colorate appese tra i palazzi

**Fase 2 — Inquieto (70–40)**
- Saturazione 60%
- Bandierine scolorite e mezze strappate
- Primi cartelli CHIUSO / VENDESI

**Fase 3 — Spento (40–15)**
- Toni grigio-ocra desaturati
- Saracinesche graffitate, erbacce nei sanpietrini
- I lampioni in stile retrò si spengono uno a uno

**Fase 4 — Fantasma (15–0)**
- Quasi monocromo grigio pietra
- Solo le uniformi blu/bianche dei vigili mantengono colore
- La Torre di Drogone resta illuminata: spettatrice silenziosa dell'addio al paese
- Vento e suono di campanelle lontane

---

## 3. Le 10 attività del paese

Tutti **nomi di fantasia plausibili** (volutamente non riferiti a esercizi reali per non urtare nessuno). Soglie di chiusura in ordine inverso di "resistenza":

| # | Nome | Tipologia | Piazza | Soglia chiusura |
|---|---|---|---|---|
| 1 | **Edicola Manfredi** | Edicola-tabacchi | Selvaggi | 92 |
| 2 | **Cartolibreria Il Guiscardo** | Cartolibreria | Umberto I | 84 |
| 3 | **Gelateria Sichelgaita** | Gelateria artigianale | Umberto I | 76 |
| 4 | **Parrucchiere Tony "U' Magnificu"** | Parrucchiere | Selvaggi | 68 |
| 5 | **Macelleria Le Carni del Pollino** | Macelleria | Umberto I | 60 |
| 6 | **Frantoio Bruzio DOP** | Vendita olio + alimentari | Riforma | 52 |
| 7 | **Forno Pane Antico** | Forno tradizionale | Selvaggi | 44 |
| 8 | **Trattoria U' Guiscardo** | Trattoria locale | Umberto I | 36 |
| 9 | **Bar Centrale "Da Peppe"** | Bar storico | Selvaggi | 28 |
| 10 | **Farmacia Comunale** | Ultima difesa civica | Riforma | 15 |

Cuore narrativo: il **Bar Da Peppe** è il simbolo dell'intero paese. Quando chiude, il giocatore deve *sentire* che è successo qualcosa di irreversibile (animazione lenta, musica che si abbassa, news in primo piano per 5 secondi).

---

## 4. Upgrade (riadattati localmente)

Stessa struttura del doc principale, ma con nomi e flavor text calabresi:

| Liv. | Nome | Costo | Multe/s | Flavor |
|---|---|---|---|---|
| 1 | **Vigile Stagista** | 50 € | 1 | "Cuginu d'u sindacu, fa pratica" |
| 2 | **Vigile Senior** | 250 € | 5 | Trent'anni di servizio, conosce ogni macchina |
| 3 | **Motorino Piaggio del Comando** | 1.000 € | 15 | Risale i vicoli del centro storico |
| 4 | **Panda dei Vigili** | 5.000 € | 50 | Iconica, blu navy con stemma |
| 5 | **Autovelox in Via Vittorio Emanuele** | 25.000 € | 200 | "Per la sicurezza dei pellegrini di Paola" |
| 6 | **Telecamere ZTL Piazza Umberto I** | 100.000 € | 800 | Anche di notte, anche a Pasqua |
| 7 | **Drone Fiscale sulla Motta** | 500.000 € | 3.000 | Sorvola la Torre di Drogone H24 |
| 8 | **AI Argo 3000 — riconoscimento targhe** | 2.500.000 € | 12.000 | Sviluppata in collaborazione con UniCal |
| 9 | **Vigile Algoritmico Predittivo "U' Magnifico"** | 15.000.000 € | 60.000 | Ti multa appena entri in tangenziale |

---

## 5. News ticker — 50 messaggi localizzati

### Fase 1 — Prime multe (vitalità 95–85)

1. "Comune incassa cifra record dalle multe. Sindaco soddisfatto."
2. "Nuova ordinanza: divieto di sosta esteso anche a Piazza Selvaggi."
3. "Vigile Sganga premiato come Impiegato del Mese."
4. "Comitato cittadini chiede chiarimenti al Consiglio. Ignorato."
5. "Il comandante: 'Stiamo solo applicando il regolamento.'"
6. "ZTL temporanea in Piazza Umberto I durante la processione."

### Fase 2 — Prime chiusure (85–60)

7. "Storica Edicola Manfredi chiude dopo 40 anni. 'I clienti non si fermavano più.'"
8. "Cartolibreria 'Il Guiscardo' abbassa la saracinesca. Le mamme: 'I quaderni li compriamo a Cosenza.'"
9. "Pellegrini di San Francesco di Paola dirottati su Paola e Fagnano: 'Qui non si scarica nemmeno la valigia.'"
10. "Comune di San Marco Argentano vince il premio 'Borgo più Sanzionatorio della Calabria.'"
11. "Sagra dell'Olio Bruzio DOP rinviata: nessuno è riuscito a parcheggiare."
12. "Anziani: 'Per ritirare la pensione devo prendere il taxi fino a Roggiano.'"
13. "Inaugurato nuovo parcheggio multipiano. A 3 km dal centro storico."
14. "Diocesi di San Marco–Scalea preoccupata: visite al Convento dei Riformati dimezzate."
15. "La Pro Loco: 'Stiamo lavorando.' (Bilancio annuale a -82%)"

### Fase 3 — Metà partita (60–35)

16. "Frantoio Bruzio DOP chiude. La cooperativa: 'L'olio si vende online, qui non viene più nessuno.'"
17. "Il vigile capo nominato Cittadino dell'Anno (unico candidato)."
18. "Confcommercio Cosenza: 'San Marco è un caso scuola di disastro commerciale.'"
19. "Forno Pane Antico spegne i forni dopo tre generazioni. 'Il pane si consegna a domicilio.'"
20. "Scuola elementare: cinque iscritti per la prima."
21. "Sindaco: 'Le casse comunali non sono mai state così piene dai tempi normanni.'"
22. "Festa di San Marco Evangelista: 12 multe emesse durante la processione."
23. "Mostra fotografica 'San Marco com'era' inaugurata in Villa Comunale. Nessun visitatore."
24. "Macelleria Le Carni del Pollino chiude. Il titolare emigra a Cosenza."
25. "Bilancio comunale in attivo per la prima volta dal 1985."

### Fase 4 — Crisi profonda (35–15)

26. "Trattoria 'U' Guiscardo' abbassa la saracinesca. Ultimo piatto servito: pasta e patate."
27. "Demolita una panchina di Piazza Selvaggi per ricavare due nuovi stalli a pagamento."
28. "Olio Bruzio DOP invenduto in cantina. La DOP a rischio."
29. "Pellegrinaggio annuale a La Benedetta cancellato: 'I pullman non possono fermarsi.'"
30. "Comune vince bando europeo: 'Eccellenza nella gestione del traffico urbano.'"
31. "Bar Centrale 'Da Peppe' chiude dopo 60 anni. Peppe: *'Sessant'anni d'u cazz' buttati.'*"
32. "Il sindaco non commenta. Ha vinto il terzo mandato con 47 voti."
33. "Indagine ISTAT: San Marco Argentano sotto i 6.000 abitanti per la prima volta dal 1861."
34. "Gelateria Sichelgaita chiude. Il titolare: 'Mi sa che pure Sichelgaita s'è scocciata.'"
35. "Parrucchiere Tony saluta: 'Vado a Cosenza. Almeno là mi tagliano i capelli, non gli stipendi.'"

### Fase 5 — Finale fantasma (sotto 15)

36. "Cantata serenata in dialetto sotto il municipio. Cinque presenti, tutti vigili."
37. "Diocesi sospende le visite al Convento dei Riformati: 'Nessuno arriva.'"
38. "Ultima farmacia minaccia chiusura. Il Comune valuta un 'sussidio multe.'"
39. "La Pro Loco si scioglie. Verbale finale di una riga: 'Non c'è più paese.'"
40. "Zero nascite registrate quest'anno. Una in via Roberto il Guiscardo, ma a Cosenza."
41. "Comune intitola la nuova rotatoria al Vigile Ignoto."
42. "Demolita la fontana di Sichelgaita? *No, fortunatamente è ancora lì*. Ma è circondata da strisce blu."
43. "L'ultimo abitante del centro storico lascia il paese. 'Almeno mò parcheggio dove voglio.'"
44. "Sindaco resta in carica. 'Qualcuno deve amministrare.'"
45. "Le casse sono piene. Non c'è nessuno da servire."

### Fase 6 — Schermata finale (vitalità = 0)

46. "San Marco Argentano premiato a Bruxelles: 'Modello di efficienza amministrativa.'"
47. "La Torre di Drogone illuminata a giorno. Sola, come 900 anni fa."
48. "Il vigile capo 'U' Magnifico' inaugura il monumento al Vigile Ignoto in Piazza Selvaggi."
49. "Sichelgaita avvistata in piazza alle 3 di notte. Multata."
50. *(easter egg finale — vedi sezione 7)*

---

## 6. Achievement localizzati (18)

| # | Nome | Trigger | Note |
|---|---|---|---|
| 1 | **Apripista** | Prima multa | "Battesimo del taccuino" |
| 2 | **Stipendio del mese** | 100 € | |
| 3 | **U' Magnifico** | Acquisti il Vigile Predittivo | Boss finale |
| 4 | **Cuginu d'u Sindacu** | Acquisti il Vigile Stagista | |
| 5 | **Effetto collaterale** | Prima chiusura (Edicola) | |
| 6 | **Pane addio** | Chiude il Forno | |
| 7 | **Peppe se ne va** | Chiude il Bar Centrale | Momento emotivo |
| 8 | **Centro fantasma** | Tutti i negozi chiusi | |
| 9 | **Cittadino dell'Anno** | Vitalità sotto 25 | Premio al vigile capo |
| 10 | **Bilancio normanno** | 1 milione € | "Non si vedevano cifre così dai tempi di Roberto il Guiscardo" |
| 11 | **Vittoria amministrativa** | Vitalità = 0 | Finale |
| 12 | **Sagra annullata** | Tre sagre rifiutate consecutive | |
| 13 | **Bruxelles chiama** | 5.000 multe totali | |
| 14 | **Pro Loco sciolta** | Vitalità sotto 20 | |
| 15 | **Spirito di Sichelgaita** | Easter egg (vedi §7) | Trovato per caso |
| 16 | **Pellegrino mancato** | Chiusura del Convento ai visitatori | Vitalità 30 |
| 17 | **Sessant'anni buttati** | Chiusura Bar Da Peppe | |
| 18 | **L'ultimo della Calabria** | Hai usato "Organizza Sagra" 5+ volte | Premio "buon amministratore" |

---

## 7. Easter eggs (anima del gioco)

### 🌬️ Lo spirito di Sichelgaita

Riferimento alla **leggenda popolare**: si dice che chi pronuncia il nome di Sichelgaita (seconda moglie di Roberto il Guiscardo) senta sfiorarsi la pelle o i capelli.

**Nel gioco:** ogni 8-12 minuti reali, un alone bianco passa rapido sullo schermo. Una voce sussurra *"Sichelgaita…"*. Per 5 secondi **tutti i vigili sono congelati**. Compare un piccolo ✨ accanto al contatore vitalità: +2 vitalità ripristinata.

Sblocca l'achievement **"Spirito di Sichelgaita"**.

### 🙏 San Francesco da Paola

Se le multe superano 100.000, appare brevemente nel cielo un cartello sbiadito: *"Beata Calabria"* (riferimento al Santo che visse qui dal 1429 al 1430, a 13 anni, nella cella della Benedetta).

Nessuna ricompensa meccanica: è un *momento di silenzio* prima del precipizio finale.

### 🌊 Il fiume Fullone

Easter egg comico: se il giocatore clicca 30 volte sulla stessa macchina senza prenderla, l'auto "fugge" e cade nel **Fullone**. Animazione di tonfo. Il fiume era usato fin dall'800 per usi irrigui e industriali — qui diventa cimitero d'auto.

### 🗣️ Dialetto cosentino nelle news

Alcune news sono in dialetto, sempre fra virgolette, come citazione dei cittadini:
- *"'Ndo' u parcheggi, cumpa?"* — il commerciante
- *"'A multa è 'a multa."* — il vigile
- *"Mò ca arrivu, vi dugnu 'na multa pure!"* — il vigile algoritmico
- *"Sessant'anni d'u cazz' buttati."* — Peppe del Bar Centrale
- *"Beata Calabria, ma fino a 'nu certu puntu."* — voice-over finale

### 🗼 La motta della Torre

Click 50 volte sulla Torre di Drogone: si attiva la **modalità Drogone**. Camera che zooma sulla motta (il cono di terra alla base) e mostra una panoramica del paese intero. Dura 8 secondi. Solo estetica.

### 💍 Schermata finale segreta (news #50)

Se completi il gioco con almeno 3 "Sagre organizzate", la schermata finale è diversa:

> "Il paese è quasi vuoto. Ma qualcuno è rimasto a organizzare la sagra. Forse l'anno prossimo qualcuno tornerà."

(*Una piccola luce accesa al Convento dei Riformati. Una sola.*)

---

## 8. Audio (opzionale ma fortemente consigliato)

- **Musica di sottofondo:** organetto + chitarra battente, melodia calabrese tradizionale (creative commons). Si desatura nel sound design man mano che la vitalità cala — strumenti che spariscono uno a uno.
- **SFX:**
  - Multa emessa: "tac" del taccuino + monetina
  - Saracinesca: rumore metallico iconico
  - Sichelgaita: vento + sussurro femminile
  - Campane lontane (Cattedrale): si sentono ogni 4 minuti, ma si fanno più rare
  - Tonfo nel Fullone: splash

---

## 9. Marketing localizzato

Audience primaria: **i sammarchesi e i comuni limitrofi (Roggiano, Cervicati, Fagnano, Mongrassano)**. Network di paese.

### Canali

1. **WhatsApp** — il vero motore. Open Graph: "Hai vinto: hai svuotato San Marco." con la Torre di Drogone illuminata sullo sfondo grigio.
2. **Gruppi Facebook locali** — "Sei di San Marco Argentano se…", "San Marco Argentano news", gruppi della Diocesi.
3. **Pro Loco e associazioni di categoria** — Confcommercio Cosenza, associazioni produttori olio Bruzio DOP.
4. **Quotidiani locali** — Gazzetta del Sud Cosenza, CosenzaChannel, Calabria.live: il taglio "marketer cosentino crea videogioco satirico sul suo paese" è una storia.

### Disclaimer in homepage

Footer chiaro per evitare polemiche:

> *Multopoli è un gioco satirico di fantasia. Personaggi, esercizi commerciali e situazioni sono inventati. Il patrimonio storico citato (Torre di Drogone, Sichelgaita, Convento dei Riformati, San Francesco da Paola) è trattato con il rispetto che merita: è proprio ciò che il paese rischia di non poter più mostrare al mondo quando il centro si svuota.*

### Possibile evoluzione

**Versione white-label.** Stesso motore, scenari diversi: Roggiano Gravina, Acri, Rende, Castrovillari, qualsiasi comune calabrese (o italiano) con il medesimo problema. Servizio a pagamento per associazioni di commercianti locali. Tempi di personalizzazione: 1-2 giornate per cambio asset, palette, nomi, dialetto.

---

## 10. Modifiche al file structure

Aggiungere al repo (rispetto al doc base):

```
content/
├── shops-san-marco.json
├── news-san-marco.json
├── upgrades-san-marco.json
└── achievements-san-marco.json

assets/
├── img/
│   ├── torre-drogone.svg
│   ├── fontana-sichelgaita.svg
│   ├── convento-riformati.svg
│   ├── piazza-riforma.svg
│   ├── piazza-selvaggi.svg
│   └── piazza-umberto.svg
└── sfx/
    ├── sichelgaita-whisper.mp3
    ├── campane-cattedrale.mp3
    └── musica-calabrese-loop.mp3
```

---

*Fine addendum. Versione 1.0 — San Marco Argentano edition.*
*Da iterare con il documento principale durante lo sviluppo.*
