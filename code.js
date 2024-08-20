const display = document.getElementById("display");
const lapsContainer = document.getElementById("laps");
let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;

function start() {
    document.getElementById("controls").innerHTML = /*HTML*/`
    <button id="stopBtn" onclick="stop()">stop</button>
    <button id="lapBtn" onclick="doLap()">lap</button>
    <button id="resetBtn" onclick="reset()">reset</button>
    `;
    if (!isRunning) {
        startTime = Date.now() - elapsedTime
        timer = setInterval(update, 10);
        isRunning = true;
    }
}
function stop() {
    document.getElementById("controls").innerHTML = /*HTML*/`
    <button id="startBtn" onclick="start()">start</button>
    <button id="stopBtn" onclick="stop()">stop</button>
    <button id="resetBtn" onclick="reset()">reset</button>
    `;
    if (isRunning) {
        clearInterval(timer);
        elapsedTime = Date.now() - startTime;
        isRunning = false;
    }
}
function reset() {
    document.getElementById("controls").innerHTML = /*HTML*/`
    <button id="startBtn" onclick="start()">start</button>
    <button id="stopBtn" onclick="stop()">stop</button>
    <button id="resetBtn" onclick="reset()">reset</button>
    `;
    clearInterval(timer);
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;
    display.textContent = "00:00:00:00";
    lapsContainer.innerHTML = "";
}
function update() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;

    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
    let seconds = Math.floor(elapsedTime / 1000 % 60);
    let milliseconds = Math.floor(elapsedTime % 1000 / 10);

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(2, "0");

    display.textContent = `${hours}:${minutes}:${seconds}:${milliseconds}`;
}
function doLap() {
    const lapTime = display.textContent;
    const lapElement = document.createElement("div");
    lapElement.textContent = lapTime;
    lapsContainer.appendChild(lapElement);
    lapsContainer.scrollTop = lapsContainer.scrollHeight;
}