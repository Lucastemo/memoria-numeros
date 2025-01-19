const question = document.getElementById("question");

const optionA = document.getElementById("optionA");
const optionB = document.getElementById("optionB");
const optionC = document.getElementById("optionC");
const optionD = document.getElementById("optionD");
const optionE = document.getElementById("optionE");

const options = [optionA, optionB, optionC, optionD, optionE];

const scoreHtml = document.getElementById("score");
const missesHtml = document.getElementById("misses");

const answers = [
    "s, z",
    "t, d, th",
    "n",
    "m",
    "r",
    "l",
    "j, ch, sh",
    "c, k, g, q, ck",
    "v, f, ph",
    "p, b"
]

let score = 0;
let misses = 0;

let currentCorrectAnswer = undefined;

function newWrongAnswer(...usedNumbers){
    let randomNumber = 0;
    let verified = false;
    while(!verified){
        randomNumber = Math.round(Math.random() * 9);
        verified = true;
        for(let i = 0; i < usedNumbers.length; i++){
            if(randomNumber === usedNumbers[i]){
                verified = false;
                break;
            }
        }
    }
    return randomNumber;
}

function gameLoop(option = undefined){
    if(option != undefined){
        if(option === currentCorrectAnswer){
            score++;
            scoreHtml.innerHTML = score;
        }else{
            misses++;
            missesHtml.innerHTML = misses;
        }
    }
    const randomNumber = Math.round(Math.random() * 9);
    question.innerHTML = `Qual o som associado ao número ${randomNumber}?`;
    const correctOption = Math.round(Math.random() * 4);
    let usedAnswers = [];
    for (i = 0; i < 5; i++) {
        if(i === correctOption){
            const correctAnswer = answers[randomNumber]
            options[i].innerHTML = correctAnswer;
            currentCorrectAnswer = i;
        }else{
            const wrongAnswer = newWrongAnswer(randomNumber, ...usedAnswers);
            options[i].innerHTML = answers[wrongAnswer];
            usedAnswers.push(wrongAnswer);
        }
    }
}

gameLoop()