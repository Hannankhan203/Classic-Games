// Calling HTML Elements

const body = document.querySelector("body");
const check = document.querySelector(".check");
const botn = document.querySelector(".botn");
const themeCheckBox = document.querySelector("#theme-checkbox");
const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const backBtn = document.querySelector(".back-btn");
const backBtnLink = document.querySelector(".back-btn-link");
const userScoreDis = document.querySelector("#user-score");
const compScoreDis = document.querySelector("#comp-score");

// Default Mode

body.classList.add("light-mode");
check.classList.add("light-mode");
botn.classList.add("light-mode");
msg.classList.add("light-mode");
backBtn.classList.add("light-mode");
backBtnLink.classList.add("light-mode");
choices.forEach((choice) => {
  choice.classList.add("light-mode");
});

function toggleMode() {
  body.classList.toggle("dark-mode");
  check.classList.toggle("dark-mode");
  botn.classList.toggle("dark-mode");
  msg.classList.toggle("dark-mode");
  backBtn.classList.toggle("dark-mode");
  backBtnLink.classList.toggle("dark-mode");
  choices.forEach((choice) => {
    choice.classList.toggle("dark-mode");
  });
}

themeCheckBox.addEventListener("click", toggleMode);

// Main Game

let userScore = 0;
let compScore = 0;

function genCompChoice() {
  const options = ["rock", "paper", "scissors"];
  const randIdx = Math.floor(Math.random() * 3);
  return options[randIdx];
}

function draw(userChoice, compChoice) {
  msg.innerText = `Game Was Draw. Play Again!`;
  msg.classList.remove("win");
  msg.classList.remove("lose");
}

function winner(userWin, userChoice, compChoice) {
  if (userWin) {
    msg.innerText = `You Won! Your ${userChoice} beats ${compChoice}!`;
    userScore++;
    userScoreDis.innerText = userScore;
    msg.classList.add("win");
    msg.classList.remove("lose");
  } else {
    msg.innerText = `You Lost! ${compChoice} beats ${userChoice}!`;
    compScore++;
    compScoreDis.innerText = compScore;
    msg.classList.remove("win");
    msg.classList.add("lose");
  }
}

function playGame(userChoice) {
  const compChoice = genCompChoice();
  if (userChoice === compChoice) {
    draw();
  } else {
    let userWin = true;
    if (userChoice === "rock") {
      userWin = compChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
      userWin = compChoice === "scissors" ? false : true;
    } else {
      userWin = compChoice === "rock" ? false : true;
    }
    winner(userWin, userChoice, compChoice);
  }
}

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});
