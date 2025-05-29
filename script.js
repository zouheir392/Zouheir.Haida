let timer = null;
let isRunning = false;
let milliseconds = 0;
let laps = [];

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('laps');
// Funzione per formattare il tempo in mm:ss:cc
// il task viene aggiornato e la lista dei task viene renderizzata di nuovo.

function formatTime(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);
    return (
        String(minutes).padStart(2, '0') + ':' +
        String(seconds).padStart(2, '0') + ':' +
        String(centiseconds).padStart(2, '0')
    );
}
// Funzione per aggiornare il display del timer e la lista dei giri
function updateDisplay() {
    display.textContent = formatTime(milliseconds);
}
// Funzione per aggiornare la lista dei giri

function updateLaps() {
    lapsList.innerHTML = '';
    laps.forEach((lapTime, idx) => {
        const li = document.createElement('li');
        li.textContent = `Giro ${idx + 1}: ${formatTime(lapTime)}`;
        // Crea un pulsante per cancellare il giro
        const delBtn = document.createElement('button');
        delBtn.textContent = 'Cancella';
        delBtn.className = 'delete-lap';
        delBtn.onclick = function() {
            laps.splice(idx, 1);
            updateLaps();
        };

        li.appendChild(delBtn);
        lapsList.appendChild(li);
    });
}
    // Aggiungi un messaggio se non ci sono giri
function runTimer() {
    if (isRunning) {
        timer = setTimeout(() => {
            milliseconds += 10;
            updateDisplay();
            runTimer();
        }, 10);
    }
}
// Se non ci sono giri, mostra un messaggio
function startTimer() {
    if (!isRunning) {
        isRunning = true;
        runTimer();
    }
}
// Se ci sono giri, mostra il numero di giri
function stopTimer() {
    isRunning = false;
    clearTimeout(timer);
}
// Se non ci sono giri, mostra un messaggio
function resetTimer() {
    stopTimer();
    milliseconds = 0;
    laps = [];
    updateDisplay();
    updateLaps();
}
// Se non ci sono giri, mostra un messaggio
function lapTimer() {
    if (isRunning) {
        laps.push(milliseconds);
        updateLaps();
    }
}
// Aggiungi gli event listener ai pulsanti
startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', lapTimer);

// Inizializza display e lista giri all'avvio
updateDisplay();
updateLaps();