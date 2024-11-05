// Declaring variables for scroe board and setting them to 0 as default
let userScore = 0;
let compScore = 0;

// Calling elements from html file
let body = document.querySelector("body");
const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const h1 = document.querySelector("h1");
let modeBtn1 = document.querySelector("#mode1");
let modeBtn2 = document.querySelector("#mode2");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const scoreBoard = document.querySelector("score-board");
const divs = document.querySelectorAll(".score");
const back = document.querySelector(".back");
modeBtn2.classList.add("toggle");

// Setting default mode to light mode
let mode = "Light mode";

// Dark mode function
const darkMode = () => {
  body.classList.add("body-dark");
  msg.classList.add("dark-btn");
  h1.classList.add("darkBg");
  modeBtn1.classList.add("toggle");
  modeBtn2.classList.remove("toggle");
  divs.forEach((div) => {
    div.classList.add("darkScore");
  });
  back.classList.add("dark-btn");
};

// Light mode function
const lightMode = () => {
  body.classList.remove("body-dark");
  msg.classList.remove("dark-btn");
  h1.classList.remove("darkBg");
  modeBtn1.classList.remove("toggle");
  modeBtn2.classList.add("toggle");
  divs.forEach((div) => {
    div.classList.remove("darkScore");
  });
  back.classList.remove("dark-btn");
};

// Toggle mode function
const toggleMode = () => {
  if (mode === "Light mode") {
    mode = "Dark mode";
    darkMode();
  } else {
    mode = "Light mode";
    lightMode();
  }
};

modeBtn1.addEventListener("click", toggleMode);
modeBtn2.addEventListener("click", toggleMode);

// generating computer's random choice
let genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randIdx = Math.floor(Math.random() * 3);
  return options[randIdx];
};

// Draw game scenario
const drawGame = (userChoice, compChoice) => {
  msg.innerText = "Game was draw! Play again.";
  msg.classList.remove("right");
  msg.classList.remove("wrong");
  if (mode === "Light mode") {
    msg.classList.add("draw");
    msg.classList.remove("dark-btn");
  }
  else if (mode === "Dark mode") {
    msg.classList.remove("draw");
    msg.classList.add("dark-btn");
  }
};

// Showing winner
const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    msg.innerText = `You won! your ${userChoice} beats ${compChoice}!`;
    msg.classList.add("right");
    msg.classList.remove("draw");
    msg.classList.remove("wrong");
    msg.classList.remove("dark-btn");
    userScore++;
    userScorePara.innerText = userScore;
  } else {
    msg.innerText = `You lost! ${compChoice} beats your ${userChoice}!`;
    msg.classList.remove("right");
    msg.classList.remove("draw");
    msg.classList.add("wrong");
    msg.classList.remove("dark-btn");
    compScore++;
    compScorePara.innerText = compScore;
  }
};

// Playing game
let playGame = (userChoice) => {
  const compChoice = genCompChoice();
  if (userChoice === compChoice) {
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
};

// Selecting and saving choice
choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});
