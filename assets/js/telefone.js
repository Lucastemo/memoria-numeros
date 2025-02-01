const telInput = document.getElementById("telInput");
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
let generatedRandomPhoneNumber;
let gameTimer;

telInput.addEventListener("input", (event) =>{
    let value = event.target.value.toString();
    value = value.replace(/\D/g, "");
    value = formatValue(value);
    event.target.value = value;
});

function formatValue(value){
    if(value.length >= 11){
        value = value.replace(/(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
    }else if(value.length >= 8){
        value = value.replace(/(\d{2})(\d{5})/, "($1) $2-");
    }else if(value.length >= 3){
        value = value.replace(/(\d{2})/, "($1) ");
    }
    return value;
}

function updateStatusOnHtmlTable(){
    scoreHtml.innerHTML = score;
    missesHtml.innerHTML = misses;
    averageTimeHtml.innerHTML = `${averageTime.toFixed(2)} segundo(s)`;
}

function enableInput(enable = true){
    if(enable){
        telInput.readOnly = false;
        telInput.style.userSelect = "initial";
        telInput.style.pointerEvents = "initial";
    }else{
        telInput.readOnly = true;
        telInput.style.userSelect = "none";
        telInput.style.pointerEvents = "none";
    }
}

function startTimer(){
    timeH2.innerHTML = "Tempo: 0 segundos";
    timeH2.style.color = "green";
    gameTimer = setInterval(timer, 1000, new Date());
}

function endTimer(){
    clearInterval(gameTimer);
    visualizationTimeArray.push(timePassed);
    timePassed = 0;
    timeH2.style.color = "red";
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

function startConfig(){
    telInput.disabled = false;
    playButton.style.display = "none";
}

function randomIntegerBetween(min = 1, max = 5){
    if(min > max){
        const trueMin = max;
        max = min;
        min = trueMin;
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateNewRandomPhoneNumber(){
    let randomPhoneNumber = randomIntegerBetween(11, 99).toString();
    for(i = 0; i < 9; i++){
        randomPhoneNumber += Math.floor(Math.random() * 10).toString();
    }
    return randomPhoneNumber;
}

function gameLoop(guess = undefined){
    enableInput(false);
    if(guess != undefined){
        guess = guess.replace(/\D/g, "");
        if(guess == generatedRandomPhoneNumber){
            score++;
        }else{
            misses++;
        }
        averageTime = calculateAverageTime();
        updateStatusOnHtmlTable();
    }
    readyButton.style.display = "block";
    verifyButton.style.display = "none";
    generatedRandomPhoneNumber = generateNewRandomPhoneNumber();
    formattedPhoneNumber = formatValue(generatedRandomPhoneNumber);
    telInput.value = formattedPhoneNumber;
    startTimer();
}

function ready(){
    enableInput(true);
    readyButton.style.display = "none";
    verifyButton.style.display = "block";
    telInput.value = "";
    telInput.focus();
    endTimer();
}