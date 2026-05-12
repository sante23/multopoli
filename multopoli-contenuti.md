# Multopoli — Tutti i contenuti del gioco

> Questo file raccoglie tutte le frasi, eventi, achievement e contenuti testuali del gioco.
> Puoi modificare/aggiungere frasi e inviarle per l'aggiornamento.

---

## 1. FRASI DI ROSSO (Comitato Commercianti)

Rosso e' il capo dei commercianti di San Marco. Parla in un misto di italiano e calabrese.
Le frasi appaiono come messaggi "WhatsApp" durante il gioco, in base al livello di pressione del Comitato.

### Pressione bassa (0-20%) — Rosso brontola

- "Sinda', ma che stai facennu? 'U paese se sta svuotannu!"
- "Si stava meglio quando si stava peggio."
- "Chivanu multe ca para na tempesta."
- "Ma tu 'u sai ca 'a gente non vene cchiu' ccane?"

### Pressione media (20-50%) — Rosso si organizza

- "Hanno fatto 'a multa a unu pure alla montagna. Divieto di sosta alla casetta di cacciatori!"
- "Ho parlato col Prefetto. Ti conviene calmarti."
- "Abbiamo raccolto 200 firme. Duecento. Ci sono piu' firme che abitanti rimasti."
- "Stasera riunione al Convento. Viene tutto il rione."
- "'U bar e' chiusu, 'a libreria e' chiusa... mo' chi vi paga le multe, i piccioni?"
- "Mi dicono ca pure 'u parroco ha pigliatu 'a multa. Vergogna!"

### Pressione alta (50-80%) — Rosso e' furioso

- "Sinda', mi stai facendo perdere 'a pacienza. E io 'a pacienza l'ho lunga."
- "L'ultima volta che ho visto cosi' tante divise era al funerale di mio padre."
- "Ho chiamato 'u TG3 Calabria. Arrivano domani con le telecamere."
- "A' piazza Selvaggi non si parcheggia, non si cammina, non si respira. Si multa e basta."
- "Mo' basta. Porto i commercianti in piazza. Tutti."
- "Pure 'a signora Concetta ca porta i fiori al cimitero ha pigliatu 'a multa. 'A vergogna!"

### Pressione massima (80-100%) — Rosso dichiara guerra

- "Sinda', questo e' l'ultimo avvertimento. Poi blocchiamo tutto."
- "Chiamu 'u giornale, chiamu 'a televisione, chiamu pure 'u Papa!"
- "Da domani sciopero generale. Nessuno apre. Nessuno compra. Vediamo chi vince."
- "Hai voluto la bicicletta? Mo' pedalare... ma attento alla multa per sosta vietata della bici!"
- "Il paese e' morto, sinda'. E l'hai ammazzato tu cu' 'u taccuino."

### SPAZIO PER NUOVE FRASI DI ROSSO:

> Aggiungi qui le nuove frasi. Indica il livello di pressione (bassa/media/alta/massima).
>
> Esempio:
> - [media] "'A multa l'ha pigliata pure 'u gatto. E mancu 'a patente tene."
>

---

## 2. AZIONI DEL COMITATO (trigger automatici)

| Pressione | Azione | Effetto nel gioco |
|---|---|---|
| 20% | Volantini in piazza | Compare una news satirica |
| 40% | Petizione al Prefetto | Multe rallentate del 30% per 20s |
| 60% | Protesta in piazza | Multe bloccate per 20s |
| 80% | Servizio del TG3 Calabria | Il giocatore deve scegliere (intervista o silenzio) |
| 95% | Sciopero generale | Zero income per 30 secondi |

---

## 3. EVENTI RANDOM (popup con scelta)

Appaiono ogni ~45 secondi. Il giocatore sceglie tra opzione A (altruista) e opzione B (avida).

| Evento | Opzione A | Opzione B |
|---|---|---|
| Un turista chiede dove parcheggiare | Aiutalo (+3 vit) | Multalo! (+100 EUR, -2 vit) |
| La scuola chiede sospensione multe | Concedi (+4 vit) | Rifiuta (+200 EUR, -3 vit) |
| Corriere in doppia fila | Lascia stare (+2 vit) | Verbale! (+75 EUR, -1 vit) |
| Parroco chiede parcheggio per funerale | Concedi (+5 vit) | Regolamento! (+150 EUR, -4 vit) |
| Medico parcheggia per emergenza | E' emergenza (+3 vit) | Nessuna eccezione (+50 EUR, -3 vit) |
| Furgone sagra del cinghiale | Aiuta a scaricare (+4 vit) | Verbale! (+100 EUR, -2 vit) |
| Nonna Concetta parcheggia storta | Fai finta (+2 vit) | Nonna mi dispiace (+30 EUR, -2 vit) |
| Processione di San Marco | E' tradizione! (+6 vit) | Multa ai carri (+300 EUR, -5 vit) |

### SPAZIO PER NUOVI EVENTI:

> Formato: Situazione | Opzione buona (effetti) | Opzione cattiva (effetti)
>

---

## 4. CARTE AZIONE DEL SINDACO (ogni ~60 secondi)

| Carta | Opzione A | Opzione B |
|---|---|---|
| Pattugliamento personale | Vai! (x2 multe 15s, +press) | Resta in ufficio (niente) |
| Ricevi i cittadini | Ascoltali (+4 vit, -15 press, blocca 10s) | Non ho tempo (+10 press) |
| Conferenza stampa | Difendi le multe (+500 EUR, +12 press) | Prometti moderazione (-20 press, +2 vit) |
| Cena col Prefetto | Vai a cena (prossimo upgrade -30%) | Declina (+2 vit) |
| Pisolino pomeridiano | Riposati (+5 vit, blocca 8s) | Caffe' e avanti (x1.5 multe 10s) |
| Inaugurazione rotonda | Gran cerimonia (+300 EUR, +8 press) | Inaugurazione sobria (+2 vit, -5 press) |
| Richiesta dalla Diocesi | Concedi (+6 vit, -10 press) | Regolamento! (+200 EUR, +15 press) |
| Gita a Cosenza | Vai (blocca 15s, -8 press, +3 vit) | Resta al comando (x1.5 multe 12s) |

### SPAZIO PER NUOVE CARTE:

>

---

## 5. ACHIEVEMENT (18)

| Nome | Come si sblocca | Hint (mostrato quando bloccato) |
|---|---|---|
| Apripista | Prima multa | "Ogni viaggio comincia con un singolo passo." |
| Stipendio del mese | 100 EUR | "Anche un vigile deve mangiare." |
| Cuginu d'u Sindacu | Assumi Vigile Stagista | "Il sangue non e' acqua." |
| Effetto collaterale | Prima chiusura negozio | "Non tutte le porte restano aperte." |
| Pane addio | Chiude il Forno | "L'odore del forno non si sente piu'." |
| Peppe se ne va | Chiude il Bar Centrale | "Sessant'anni di caffe'..." |
| Sessant'anni buttati | Chiude il Bar Da Peppe | "...buttati." |
| Centro fantasma | Tutti i negozi chiusi | "Chi e' l'ultimo spenga la luce." |
| Cittadino dell'Anno | Vitalita sotto 25 | "Nessun altro candidato." |
| Bilancio normanno | 1.000.000 EUR | "Non si vedevano cifre cosi' dai tempi del Guiscardo." |
| Bruxelles chiama | 5.000 multe | "L'Europa apprezza la tua efficienza." |
| Pellegrino mancato | Vitalita sotto 30 | "San Francesco avrebbe qualcosa da dire." |
| Pro Loco sciolta | Vitalita sotto 20 | "Non c'e' piu' locale." |
| Spirito di Sichelgaita | Vedi il fantasma | "Il vento porta sussurri..." |
| U' Magnifico | Acquisti Vigile Predittivo | "Il futuro e' adesso." |
| Vittoria amministrativa | Vitalita a 0 | "Ce l'hai fatta. A che prezzo?" |
| L'ultimo della Calabria | 5+ sagre | "C'e' ancora speranza?" |
| Sagra annullata | Vinci senza sagre | "Zero sagre, massima efficienza." |

### SPAZIO PER NUOVI ACHIEVEMENT:

>

---

## 6. NEWS TICKER (53 messaggi)

### Fase 0 — Primissime (vit 100-95)
- "'Ndo u parcheggi, cumpa?' Un passante schiva il vigile."
- "Nuova iniziativa comunale: potenziamento della polizia municipale."
- "Primi verbali del mese. Il sindaco annuisce compiaciuto."

### Fase 1 — Prime multe (vit 95-85)
- "Comune incassa cifra record dalle multe. Sindaco soddisfatto."
- "Nuova ordinanza: divieto di sosta esteso anche a Piazza Selvaggi."
- "Vigile Sganga premiato come Impiegato del Mese."
- "Comitato cittadini chiede chiarimenti al Consiglio. Ignorato."
- "Il comandante: 'Stiamo solo applicando il regolamento.'"
- "ZTL temporanea in Piazza Umberto I durante la processione."

### Fase 2 — Prime chiusure (vit 85-60)
- "Storica Edicola Manfredi chiude dopo 40 anni."
- "Cartolibreria 'Il Guiscardo' abbassa la saracinesca."
- "Pellegrini di San Francesco dirottati su Paola."
- "Comune vince il premio 'Borgo piu Sanzionatorio della Calabria.'"
- "Sagra dell'Olio Bruzio DOP rinviata."
- "Anziani: 'Per ritirare la pensione devo prendere il taxi fino a Roggiano.'"
- "Inaugurato nuovo parcheggio multipiano. A 3 km dal centro storico."
- "Diocesi preoccupata: visite al Convento dei Riformati dimezzate."
- "La Pro Loco: 'Stiamo lavorando.' (Bilancio annuale a -82%)"

### Fase 3 — Meta partita (vit 60-35)
- "Frantoio Bruzio DOP chiude."
- "Il vigile capo nominato Cittadino dell'Anno (unico candidato)."
- "Confcommercio Cosenza: 'San Marco e' un caso scuola di disastro commerciale.'"
- "Forno Pane Antico spegne i forni dopo tre generazioni."
- "Scuola elementare: cinque iscritti per la prima."
- "Sindaco: 'Le casse comunali non sono mai state cosi piene dai tempi normanni.'"
- "Festa di San Marco Evangelista: 12 multe emesse durante la processione."
- "Mostra fotografica 'San Marco com'era' in Villa Comunale. Nessun visitatore."
- "Macelleria Le Carni del Pollino chiude."
- "Bilancio comunale in attivo per la prima volta dal 1985."

### Fase 4 — Crisi profonda (vit 35-15)
- "Trattoria 'U' Guiscardo' chiude. Ultimo piatto: pasta e patate."
- "Demolita una panchina di Piazza Selvaggi per due stalli a pagamento."
- "Olio Bruzio DOP invenduto in cantina."
- "Pellegrinaggio a La Benedetta cancellato."
- "Comune vince bando europeo: 'Eccellenza nella gestione del traffico.'"
- "Bar 'Da Peppe' chiude dopo 60 anni. 'Sessant'anni buttati.'"
- "Il sindaco non commenta. Ha vinto il terzo mandato con 47 voti."
- "ISTAT: San Marco sotto i 6.000 abitanti per la prima volta dal 1861."
- "Gelateria Sichelgaita chiude. 'Pure Sichelgaita s'e' scocciata.'"
- "Parrucchiere Tony saluta: 'Vado a Cosenza.'"

### Fase 5 — Fantasma (vit sotto 15)
- "Serenata in dialetto sotto il municipio. Cinque presenti, tutti vigili."
- "Diocesi sospende le visite al Convento dei Riformati."
- "Ultima farmacia minaccia chiusura."
- "La Pro Loco si scioglie. 'Non c'e' piu paese.'"
- "Zero nascite registrate quest'anno."
- "Comune intitola la nuova rotatoria al Vigile Ignoto."
- "La fontana di Sichelgaita circondata da strisce blu."
- "L'ultimo abitante lascia il paese. 'Almeno mo parcheggio dove voglio.'"
- "Sindaco resta in carica. 'Qualcuno deve amministrare.'"
- "Le casse sono piene. Non c'e' nessuno da servire."

### Fase 6 — Finale (vit = 0)
- "San Marco premiato a Bruxelles: 'Modello di efficienza amministrativa.'"
- "La Torre di Drogone illuminata a giorno. Sola, come 900 anni fa."
- "Il vigile capo inaugura il monumento al Vigile Ignoto."
- "Sichelgaita avvistata in piazza alle 3 di notte. Multata."

### SPAZIO PER NUOVE NEWS:

> Formato: "Testo della news" (indicare la fase: 0/1/2/3/4/5/6)
>

---

## 7. NEGOZI (10, chiudono in ordine di vitalita)

| Vitalita | Negozio | Messaggio chiusura |
|---|---|---|
| 92 | Edicola Manfredi | "L'ultima copia del giornale resta invenduta." |
| 84 | Cartolibreria Il Guiscardo | "I quaderni si comprano a Cosenza, adesso." |
| 76 | Gelateria Sichelgaita | "Pure Sichelgaita s'e' scocciata." |
| 68 | Parrucchiere Tony | "Tony va a Cosenza. Almeno la' tagliano i capelli." |
| 60 | Macelleria Le Carni del Pollino | "Le Carni del Pollino emigrano. In pianura." |
| 52 | Frantoio Bruzio DOP | "L'olio Bruzio DOP si vende solo online." |
| 44 | Forno Pane Antico | "Tre generazioni di pane. Finite." |
| 36 | Trattoria U' Guiscardo | "Ultimo piatto servito: pasta e patate." |
| 28 | Bar Centrale "Da Peppe" | "Sessant'anni. Buttati." |
| 15 | Farmacia Comunale | "L'ultimo presidio. Se ne va anche quello." |

---

## 8. UPGRADE (9 livelli)

| Livello | Nome | Costo | Multe/s | Flavor |
|---|---|---|---|---|
| 1 | Vigile Stagista | 50 | 1 | "Cuginu d'u sindacu, fa pratica" |
| 2 | Vigile Senior | 250 | 5 | "Trent'anni di servizio, conosce ogni macchina" |
| 3 | Motorino Piaggio | 1.000 | 15 | "Risale i vicoli del centro storico" |
| 4 | Panda dei Vigili | 5.000 | 50 | "Iconica, blu navy con stemma" |
| 5 | Autovelox | 25.000 | 200 | "Per la sicurezza dei pellegrini" |
| 6 | Telecamere ZTL | 100.000 | 800 | "Anche di notte, anche a Pasqua" |
| 7 | Drone Fiscale | 500.000 | 3.000 | "Sorvola la Torre di Drogone H24" |
| 8 | AI Argo 3000 | 2.500.000 | 12.000 | "Riconoscimento targhe UniCal" |
| 9 | Vigile Predittivo | 15.000.000 | 60.000 | "Ti multa prima che parcheggi" |

---

*File generato automaticamente. Ultimo aggiornamento: v2.0*
*Aggiungere nuovi contenuti nelle sezioni "SPAZIO PER..." e inviarli per l'aggiornamento.*
