const stats = document.getElementById("stats");
const timeDisplay = document.getElementById("time");
const settings = document.getElementById("settings");
const scrambleText = document.getElementById("scramble");
let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;

let StorageNum = 1;

let lastScramble = " "

function writeTime(){
    let newDiv = document.createElement('div');
    newDiv.textContent = `${StorageNum}: ${timeDisplay.textContent}, ${lastScramble}`;
    newDiv.id = `div${StorageNum}`;
    newDiv.className = 'divs';
    document.body.appendChild(newDiv);
    StorageNum++;
}  

document.addEventListener("keydown", event =>{
    if(event.key === " "){
        timeDisplay.style.color = "lightgreen";
        if(!isRunning){
            reset();
        }
    }

})
document.addEventListener("keyup", event =>{
    if(event.key === " "){
        start();
        timeDisplay.style.color = "white";
    }
})
timeDisplay.addEventListener("mousedown", function(){
    timeDisplay.style.color = "lightgreen";
    if(!isRunning){
        reset();
    }
})
timeDisplay.addEventListener("mouseup", function(){
    start();
    timeDisplay.style.color = "white";
})


function start(){

    if(!isRunning){
        startTime = Date.now() - elapsedTime;
        timer = setInterval(update, 10);
        lastScramble = scrambleText.textContent;
        setTimeout(() => {
            isRunning = true;
        }, 200);
    }
    if(isRunning){
        clearInterval(timer);
        elapsedTime = Date.now() - startTime;
        timeText = document.getElementById("time");
        writeScramble();
        setTimeout(() => {
            isRunning = false;
        }, 500);
        writeTime();

    }

}

function reset(){
    timer = null;
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;
    timeDisplay.textContent = '0.00';
}

function update(){

    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;

    let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
    let seconds = Math.floor(elapsedTime / 1000 % 60);
    let miliseconds = Math.floor(elapsedTime % 1000 / 10);

    miliseconds = String(miliseconds).padStart(2, "0");

    timeDisplay.textContent = `${seconds}.${miliseconds}`;

    if(elapsedTime > 60000){
        timeDisplay.textContent = `${minutes}.${seconds}.${miliseconds}`;
    }

}   

function isSameFaceMoves(move1, move2) {
    if(move1 === ' ' || move2 === ' ') {
        return false;
    }

    let face1 = move1.charAt(0);
    let face2 = move2.charAt(0);

    return face1 === face2;
}

function generateScramble(){
    let moves = ["U", "U'", "U2", "L", "L'", "L2", "F", "F'", "F2", "R", "R'", "R2", "B", "B'", "B2", "D", "D'", "D2"];
    let scramble = [];

    let lastMove = ' ';

    for(let i = 0;i < 20;i++){
        let randomMove;
        do {
            randomMove = moves[Math.floor(Math.random() * moves.length)];
        } while (isSameFaceMoves(lastMove, randomMove));

        scramble.push(randomMove);
        lastMove = randomMove
    }

    return scramble.join(' ');
}

function writeScramble(){
    let scramble = generateScramble();
    document.getElementById("scramble").textContent = scramble;
}