let hours=0;
let minutes= 0;
let seconds=0;
let interval;

function format(val) {
    return val < 10 ? '0' + val : val.toString();
}

function showTime() {
    document.getElementById('clock').innerHTML =
        `${format(hours)}:${format(minutes)}:${format(seconds)}`;
}

function Start() {
    if (interval) return;
    interval = setInterval(() => {
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
        if (minutes === 60) {
            minutes = 0;
            hours++;
        }
        showTime();
    }, 1000);
}
function Stop() {
    clearInterval(interval);
    interval = null;
}
function Reset() {
    hours = 0;
    minutes = 0;
    seconds = 0;
    showTime();
}

showTime();