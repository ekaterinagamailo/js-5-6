var startTime;
var pauseStartTime;
var pauseTime;
var isPause;

function addZero(i) {
    if (i < 10) {
        i = "0" + i
    }
    return i;
}

function initTimer() {
    var hours = addZero(0);
    var minutes = addZero(0);
    var seconds = addZero(0);
    var milliSeconds = addZero(0);
    var timer = document.getElementById('container__time');
    var timerMilliSeconds = document.getElementById('container__milliseconds');
    var startButton = document.getElementById('start');
    var pauseButton = document.getElementById('pause');
    var continueButton = document.getElementById('continue');

    startTime = 0;
    pauseStartTime = 0;
    pauseTime = 0;
    isPause = true;
    pauseButton.style.display = "none";
    continueButton.style.display = "none";
    timer.innerHTML = hours + ":" + minutes + ":" + seconds;
    timerMilliSeconds.innerHTML = milliSeconds;
}

function timerSetTimeout(enable, timeMs, cb) {

    if (enable)
        setTimeout(cb, timeMs);
}

function startTimerCb() {
    var milliSeconds = addZero(Math.floor(( Date.now() - startTime - pauseTime ))% 1000);
    var seconds = addZero(Math.floor(( Date.now() - startTime - pauseTime) / 1000) % 60);
    var minutes = addZero(Math.floor((( Date.now() - startTime - pauseTime ) / 1000) / 60 ) % 60);
    var hours = addZero(Math.floor(((( Date.now() - startTime - pauseTime) / 1000) / 60) / 60));
    var timer = document.getElementById('container__time');
    var timerMilliSeconds = document.getElementById('container__milliseconds');

    if (!isPause) {
        timer.innerHTML = hours + ":" + minutes + ":" + seconds;
        timerMilliSeconds.innerHTML = milliSeconds;
        timerSetTimeout(!isPause, 1, startTimerCb);
    }
}

function startTimer() {
    var pauseButton = document.getElementById('pause');

    pauseButton.style.display = "block";
    startTime = new Date();
    isPause = false;
    timerSetTimeout(!isPause, 1, startTimerCb);
}

var startButton = document.getElementById('start');
startButton.addEventListener('click', startTimer);

function pauseTimer() {
    var continueButton = document.getElementById('continue');

    continueButton.style.display = "block";
    pauseStartTime = new Date();
    isPause = true;
}

var startButton = document.getElementById('pause');
startButton.addEventListener('click', pauseTimer);

function continueTimer() {
    var continueButton = document.getElementById('continue');
    var pauseButton = document.getElementById('pause');

    continueButton.style.display = "none";
    pauseButton.style.display = "block";
    pauseTime = pauseTime + (new Date() - pauseStartTime);
    isPause = false;
    timerSetTimeout(!isPause, 1, startTimerCb);
}

var continueButton = document.getElementById('continue');
continueButton.addEventListener('click', continueTimer);

var clearButton = document.getElementById('clear');
clearButton.addEventListener('click', initTimer);

initTimer();
