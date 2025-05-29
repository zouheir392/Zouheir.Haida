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

function updateDisplay() {
    display.textContent = formatTime(milliseconds);
}

function updateLaps() {
    lapsList.innerHTML = '';
    laps.forEach((lapTime, idx) => {
        const li = document.createElement('li');
        li.textContent = `Giro ${idx + 1}: ${formatTime(lapTime)}`;

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

function runTimer() {
    if (isRunning) {
        timer = setTimeout(() => {
            milliseconds += 10;
            updateDisplay();
            runTimer();
        }, 10);
    }
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        runTimer();
    }
}

function stopTimer() {
    isRunning = false;
    clearTimeout(timer);
}

function resetTimer() {
    stopTimer();
    milliseconds = 0;
    laps = [];
    updateDisplay();
    updateLaps();
}

function lapTimer() {
    if (isRunning) {
        laps.push(milliseconds);
        updateLaps();
    }
}
