// Declaring variables for scroe board and setting them to 0 as default
let userScore = 0;
let compScore = 0;

// Calling elements from html file
let body = document.querySelector("body");
const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const modeBtn = document.querySelector("#mode");
const h1 = document.querySelector("h1");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const scoreBoard = document.querySelector("score-board");
const divs = document.querySelectorAll(".score");
const back = document.querySelector(".back");

// Setting default mode to light mode
let mode = "Light mode";

// Dark mode function
const darkMode = () => {
    modeBtn.innerText = "Activate Light Mode!";
    body.classList.add("body-dark");
    msg.classList.add("darkBg");
    modeBtn.classList.add("darkBg");
    h1.classList.add("darkBg");
    divs.forEach((div) => {
        div.classList.add("darkScore");
    });
    back.classList.add("darkBg");
}

// Light mode function
const lightMode = () => {
    modeBtn.innerText = "Activate Dark Mode!";
    body.classList.remove("body-dark");
    msg.classList.remove("darkBg");
    modeBtn.classList.remove("darkBg");
    h1.classList.remove("darkBg");
    divs.forEach((div) => {
        div.classList.add("darkScore");
    });
    back.classList.remove("darkBg");
}

// Toggle mode function
const toggleMode = () => {
    if (mode === "Light mode") {
        mode = "Dark mode";
        darkMode();
    } else {
        mode = "Light mode";
        lightMode();
    }
        
}

modeBtn.addEventListener("click", toggleMode);

// generating computer's random choice
let genCompChoice = () => {
    const options = ["rock", "paper", "scissors"];
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];
}

// Draw game scenario
const drawGame = (userChoice, compChoice) => {
    msg.innerText = "Game was draw! Play again.";
    msg.style.backgroundColor = "#26547c";
}

// Showing winner
const showWinner = (userWin, userChoice, compChoice) => {
    if (userWin) {
        msg.innerText = `You won! your ${userChoice} beats ${compChoice}!`;
        msg.style.backgroundColor = "green";
        userScore++;
        userScorePara.innerText = userScore;
    } else {
        msg.innerText = `You lost! ${compChoice} beats your ${userChoice}!`;
        msg.style.backgroundColor = "red";
        compScore++;
        compScorePara.innerText = compScore;
    }
}

// Playing game
let playGame = (userChoice) => {
    const compChoice = genCompChoice();
    if ( userChoice === compChoice) {
        drawGame();
    } else {
        let userWin = true;
        if (userChoice === "rock") {
            userWin = compChoice === "paper" ? false : true;
        } else if (userChoice === "paper") {
            userWin = compChoice === "scissors" ? false : true;
        } else {
            userWin = compChoice === "rock" ? false : true;
        }
        showWinner(userWin, userChoice, compChoice);
    }
}

// Selecting and saving choice 
choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    })
})