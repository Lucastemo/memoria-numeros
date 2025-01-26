const textBox = document.getElementById("textBox");
const timeH2 = document.getElementById("time");
const scoreHtml = document.getElementById("score");
const missesHtml = document.getElementById("misses");
const averageTimeHtml = document.getElementById("averageTime");

const playButton = document.getElementById("playButton");
const readyButton = document.getElementById("readyButton");
const verifyButton = document.getElementById("verifyButton");

const difficultyRadioBoxes = document.getElementsByName("difficulty");

let difficulty = "easy";
let score = 0;
let misses = 0;
let averageTime = 0;
let timePassed = 0;
let visualizationTimeArray = [];
let generatedRandomNumber = "";
let gameTimer;

function getDifficulty(){
    for(i = 0; i < difficultyRadioBoxes.length; i++){
        if(difficultyRadioBoxes[i].checked){
            difficulty = difficultyRadioBoxes[i].value;
            break;
        }
    }
    resetStatus();
    if(generatedRandomNumber){
        gameLoop();
    }
}

function updateStatusOnHtmlTable(){
    scoreHtml.innerHTML = score;
    missesHtml.innerHTML = misses;
    averageTimeHtml.innerHTML = `${averageTime.toFixed(2)} segundo(s)`;
}

function resetStatus(){
    score = 0;
    misses = 0;
    averageTime = 0;
    visualizationTimeArray = [];
    clearInterval(gameTimer);
    updateStatusOnHtmlTable();
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

function generateRandomNumber(numberSize = 1){
    let number = "";
    for(i = 0; i < numberSize; i++){
        const randomNumber = Math.floor(Math.random() * 10);
        number += randomNumber;
    }
    return number;
}

function startConfig(){
    textBox.disabled = false;
    playButton.style.display = "none";
}

function gameLoop(guess = undefined){
    textBox.readOnly = true;
    textBox.style.userSelect = "none";
    textBox.style.pointerEvents = "none";
    verifyButton.style.display = "none";
    readyButton.style.display = "block";
    if(guess != undefined){
        if(generatedRandomNumber == guess){
            score++;
        }else{
            misses++;
        }
        averageTime = calculateAverageTime();
        updateStatusOnHtmlTable();
    }
    let numberAmount = 5;
    switch(difficulty){
        case "easy":
            numberAmount = 5;
            break;
        case "medium":
            numberAmount = 10;
            break;
        case "hard":
            numberAmount = 15;
            break;
    }
    generatedRandomNumber = generateRandomNumber(numberAmount);
    textBox.value = generatedRandomNumber;
    const startingTime = new Date();
    timeH2.innerHTML = "Tempo: 0 segundos";
    gameTimer = setInterval(timer, 1000, startingTime);
    timePassed = 0;
    timeH2.style.color = "green";
}

function ready(){
    readyButton.style.display = "none";
    verifyButton.style.display = "block";
    textBox.value = "";
    clearInterval(gameTimer);
    visualizationTimeArray.push(timePassed);
    timeH2.style.color = "red";
    textBox.readOnly = false;
    textBox.style.userSelect = "initial";
    textBox.style.pointerEvents = "initial";
    textBox.focus();
}