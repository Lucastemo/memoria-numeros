const dateInput = document.getElementById("dateInput");
const timeH2 = document.getElementById("time");
const scoreHtml = document.getElementById("score");
const missesHtml = document.getElementById("misses");
const averageTimeHtml = document.getElementById("averageTime");

const playButton = document.getElementById("playButton");
const readyButton = document.getElementById("readyButton");
const verifyButton = document.getElementById("verifyButton");

let score = 0;
let misses = 0;
let averageTime = 0;
let timePassed = 0;
let visualizationTimeArray = [];
let generatedRandomDateString;
let gameTimer;

function updateStatusOnHtmlTable(){
    scoreHtml.innerHTML = score;
    missesHtml.innerHTML = misses;
    averageTimeHtml.innerHTML = `${averageTime.toFixed(2)} segundo(s)`;
}

function timer(startingTime){
    const currentTime = new Date();
    timePassed = Math.floor((currentTime - startingTime) / 1000);
    timeH2.innerHTML = `Tempo: ${timePassed} segundos`;
}

function calculateAverageTime(){
    let result = 0;
    for(i = 0; i < visualizationTimeArray.length; i++){
        result += visualizationTimeArray[i];
    }
    result /= visualizationTimeArray.length;
    return result;
}

function generateRandomDate(startingDate, endingDate){
    const generatedDate = new Date(startingDate.getTime() + Math.random() * (endingDate.getTime() - startingDate.getTime()));
    const generatedDateString = `${generatedDate.getFullYear()}-${String(generatedDate.getMonth() + 1).padStart(2, "0")}-${String(generatedDate.getDate()).padStart(2, "0")}`;
    return generatedDateString;
}

function startConfig(){
    dateInput.disabled = false;
    playButton.style.display = "none";
}

function gameLoop(guess = undefined){
    if(guess != undefined){
        if(guess == generatedRandomDateString){
            score++;
        }else{
            misses++;
        }
        averageTime = calculateAverageTime();
        updateStatusOnHtmlTable();
    }
    dateInput.readOnly = true;
    verifyButton.style.display = "none";
    dateInput.style.userSelect = "none";
    dateInput.style.pointerEvents = "none";
    readyButton.style.display = "block";
    
    generatedRandomDateString = generateRandomDate(new Date("1900-01-01T00:00:00Z"), new Date());
    dateInput.value = generatedRandomDateString;
    const startingTime = new Date();
    timeH2.innerHTML = "Tempo: 0 segundos";
    timeH2.style.color = "green";
    gameTimer = setInterval(timer, 1000, startingTime);
    timePassed = 0;
}

function ready(){
    dateInput.readOnly = false;
    readyButton.style.display = "none";
    dateInput.style.userSelect = "initial";
    dateInput.style.pointerEvents = "initial";
    verifyButton.style.display = "block";
    dateInput.value = "";
    dateInput.focus();
    clearInterval(gameTimer);
    visualizationTimeArray.push(timePassed);
    timeH2.style.color = "red";
}