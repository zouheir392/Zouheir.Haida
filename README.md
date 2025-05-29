# Task Manager

## Descrizione

Questa applicazione web consente di gestire una lista di attività (to-do list) in modo semplice e intuitivo.  
Puoi aggiungere, modificare, eliminare, filtrare e cercare le attività, oltre a gestirne lo stato (Da fare, In corso, Completata).

## Funzionalità

- **Aggiunta attività:** Inserisci una nuova attività tramite il campo di input e premi "Aggiungi".
- **Eliminazione attività:** Ogni attività può essere rimossa tramite l'apposito pulsante.
- **Modifica attività:** Puoi modificare il nome di ogni attività.
- **Gestione stato:** Ogni attività può essere impostata come "Da fare", "In corso" o "Completata".
- **Filtro per stato:** Puoi visualizzare solo le attività di uno stato specifico tramite il menu a tendina.
- **Ricerca attività:** Puoi cercare rapidamente un’attività per nome tramite la barra di ricerca.

## Modalità di utilizzo

1. Apri `index.html` in un browser moderno.
2. Inserisci il nome di una nuova attività e premi "Aggiungi".
3. Usa i pulsanti accanto a ciascuna attività per modificarla o eliminarla.
4. Cambia lo stato di un’attività tramite il menu a tendina accanto ad essa.
5. Filtra la lista delle attività per stato o cerca un’attività per nome usando la barra di ricerca.

---

## Documentazione tecnica

### Struttura dei file

- `index.html`: struttura della pagina e interfaccia utente.
- `styles.css`: stile grafico dell’applicazione.
- `script.js`: logica JavaScript per la gestione delle attività.

### Logica principale (`script.js`)

```js
/**
 * Rende la lista delle attività in base a filtri e ricerca.
 */
function renderTasks() { ... }

/**
 * Gestisce l'aggiunta di una nuova attività.
 * @param {Event} e - Evento submit del form
 */
taskForm.onsubmit = function(e) { ... }

/**
 * Gestisce il cambio di stato di una attività.
 * @param {Event} e - Evento change del select
 */
statusFilter.onchange = function(e) { ... }

/**
 * Gestisce la ricerca delle attività per nome.
 * @param {Event} e - Evento input del campo ricerca
 */
searchInput.oninput = function(e) { ... }
```

- Le attività sono memorizzate in un array di oggetti JS.
- Ogni attività ha: nome, stato (`todo`, `doing`, `done`), e flag di editing.
- Le funzioni principali sono commentate secondo la notazione JSDoc.

---

## Esempio di attività

```
{
  "name": "Studiare per l'esame",
  "status": "doing",
  "editing": false
}
```

---

## Autore

Zouheir Haida  
UF07:WEB 2 – Task Manager

# Meteo App Avanzata

## Descrizione

Questa applicazione web permette di visualizzare le condizioni meteo attuali di una località specifica, utilizzando le API di [Open-Meteo](https://open-meteo.com/en/docs).  
L’utente può inserire manualmente latitudine e longitudine oppure utilizzare la geolocalizzazione del browser per ottenere le previsioni della propria posizione attuale.

## Funzionalità

- Inserimento manuale delle coordinate geografiche (latitudine e longitudine)
- Recupero automatico delle coordinate tramite il pulsante "Usa la mia posizione"
- Visualizzazione delle principali informazioni meteo: temperatura, umidità, precipitazioni, pioggia, copertura nuvolosa, vento
- Visualizzazione di un’icona meteo e descrizione in base al parametro `weather_code`
- Legenda dei codici meteo utilizzati dall’API
- Link diretto alla documentazione ufficiale Open-Meteo

## Modalità di utilizzo

1. Apri la pagina `index.html` in un browser moderno.
2. Inserisci la latitudine e la longitudine della località desiderata **oppure** clicca su "Usa la mia posizione" per usare la geolocalizzazione.
3. Premi "Cerca Meteo" per visualizzare le condizioni meteo attuali.
4. Consulta la legenda per interpretare il codice meteo e l’icona visualizzata.

---

## Documentazione tecnica

### Struttura dei file

- `index.html`: struttura della pagina e interfaccia utente.
- `styles.css`: stile grafico dell’applicazione.
- `script.js`: logica JavaScript per chiamate API, gestione eventi e visualizzazione dati.

### Logica principale (`script.js`)

```js
/**
 * Restituisce l’icona e la descrizione associate a un weather_code.
 * @param {number} code - Codice meteo restituito dall’API Open-Meteo
 * @returns {{icon: string, desc: string}} Oggetto con icona e descrizione
 */
function getWeatherIcon(code) { ... }

/**
 * Gestisce la richiesta meteo e aggiorna la pagina con i dati ricevuti.
 * @param {Event} e - Evento di submit del form
 * @returns {Promise<void>}
 */
form.addEventListener('submit', async function(e) { ... });

/**
 * Recupera la posizione geografica dell’utente tramite le API di geolocalizzazione.
 * Aggiorna i campi latitudine e longitudine nel form.
 */
geoBtn.addEventListener('click', function() { ... });
```

- L’app utilizza la funzione `navigator.geolocation.getCurrentPosition` per ottenere le coordinate locali.
- I dati meteo vengono richiesti tramite `fetch` all’endpoint Open-Meteo, con i parametri richiesti dal progetto.
- I dati ricevuti vengono visualizzati in modo chiaro e minimale, con icone e legenda per una migliore comprensione.

### Weather Code

Il parametro `weather_code` rappresenta lo stato del tempo secondo la codifica WMO.  
La legenda dei principali codici è riportata nella pagina e nel codice.

---

## Esempio di chiamata API

```
https://api.open-meteo.com/v1/forecast?latitude=46.0679&longitude=11.1211&current=temperature_2m,relative_humidity_2m,precipitation,rain,cloud_cover,wind_speed_10m,weather_code
```

---

## Note

- L’app funziona solo se il browser supporta JavaScript moderno e la Geolocalizzazione.
- Per maggiori dettagli sui codici meteo, consulta la [documentazione Open-Meteo](https://open-meteo.com/en/docs#api_form).

---

## Autore

Zouheir Haida  
UF07:WEB 2 – Meteo App Avanzata

# Cronometro Digitale Avanzato

## Descrizione

Questa applicazione web è un cronometro digitale avanzato che permette di misurare il tempo in formato MM:SS:MS, registrare i giri (lap), visualizzare la lista dei giri e cancellarli singolarmente.  
L’interfaccia è semplice e intuitiva, con pulsanti per avviare, fermare, resettare e registrare i giri.

## Funzionalità

- **Avvio, stop e reset del cronometro**
- **Visualizzazione del tempo in formato MM:SS:MS**
- **Registrazione dei giri (lap)**
- **Visualizzazione dinamica della lista dei giri**
- **Cancellazione singola dei giri**

## Modalità di utilizzo

1. Apri `index.html` in un browser moderno.
2. Premi "Start" per avviare il cronometro.
3. Premi "Stop" per fermare il conteggio.
4. Premi "Reset" per azzerare il tempo e la lista dei giri.
5. Premi "Giro" per registrare il tempo attuale nella lista dei giri.
6. Ogni giro può essere cancellato singolarmente tramite il pulsante "Cancella" accanto ad esso.

---

## Documentazione tecnica

### Struttura dei file

- `index.html`: struttura della pagina e interfaccia utente.
- `styles.css`: stile grafico dell’applicazione.
- `script.js`: logica JavaScript per la gestione del cronometro e dei giri.

### Logica principale (`script.js`)

```js
/**
 * Formatta il tempo in millisecondi nel formato MM:SS:MS.
 * @param {number} ms - Tempo in millisecondi
 * @returns {string} Tempo formattato
 */
function formatTime(ms) { ... }

/**
 * Aggiorna la visualizzazione del cronometro.
 */
function updateDisplay() { ... }

/**
 * Aggiorna la lista dei giri.
 */
function updateLaps() { ... }

/**
 * Avvia il cronometro utilizzando setTimeout per la precisione sui millisecondi.
 */
function runTimer() { ... }

/**
 * Gestisce l'aggiunta di un nuovo giro.
 */
function lapTimer() { ... }
```

- Il cronometro utilizza `setTimeout` per aggiornare il tempo ogni 10 millisecondi.
- I giri sono memorizzati in un array e visualizzati dinamicamente.
- Ogni giro può essere cancellato singolarmente tramite un pulsante dedicato.
- Le funzioni principali sono commentate secondo la notazione JSDoc.

---

## Esempio di giro

```
{
  "lapTime": 12345 // millisecondi
}
```

---

## Autore

Zouheir Haida  
UF07:WEB 1 – Cronometro Digitale Avanzato
