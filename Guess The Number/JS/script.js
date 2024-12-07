// Calling HTML Elements

const body = document.querySelector("body");
const themeCheckbox = document.querySelector("#theme-checkbox");
const check = document.querySelector(".check");
const botn = document.querySelector(".botn");
const mainGame = document.querySelector(".main-game");
const guessInput = document.querySelector("#guess-input");
const submitBtn = document.querySelector(".submit-btn");
const newBtn = document.querySelector(".new-btn");
const backBtn = document.querySelector(".back-btn");
const backBtnLink = document.querySelector(".back-btn-link");
const resultMsg = document.querySelector(".result-msg");
const guessCountDisplay = document.querySelector(".guess-count");

// Default Mode

body.classList.add("light-mode");
check.classList.add("light-mode");
botn.classList.add("light-mode");
mainGame.classList.add("light-mode");
guessInput.classList.add("light-mode");
submitBtn.classList.add("light-mode");
newBtn.classList.add("light-mode");
backBtn.classList.add("light-mode");
backBtnLink.classList.add("light-mode");

// Toggle Mode

function toggleMode() {
  body.classList.toggle("dark-mode");
  check.classList.toggle("dark-mode");
  botn.classList.toggle("dark-mode");
  mainGame.classList.toggle("dark-mode");
  guessInput.classList.toggle("dark-mode");
  submitBtn.classList.toggle("dark-mode");
  newBtn.classList.toggle("dark-mode");
  backBtn.classList.toggle("dark-mode");
  backBtnLink.classList.toggle("dark-mode");
}

themeCheckbox.addEventListener("click", toggleMode);

let randomNumber = Math.floor(Math.random() * 100) + 1;
let guessCount = 0;

function checkGuess () {
    const userGuess = Number(guessInput.value);
    guessCount++;
    if (userGuess === randomNumber) {
        resultMsg.innerText = `Congratulations! You guessed the right number! The number was ${randomNumber}`;
        resultMsg.classList.add("win");
        resultMsg.classList.remove("lose");
        submitBtn.disabled = true;
    } else if (userGuess > randomNumber) {
        resultMsg.innerText = `Too high! Try again.`;
        resultMsg.classList.remove("win");
        resultMsg.classList.add("lose");
    } else if (userGuess < randomNumber) {
        resultMsg.innerText = `Too low! Try again.`;
        resultMsg.classList.remove("win");
        resultMsg.classList.add("lose");
    }
    guessCountDisplay.innerText = guessCount;
}

function newGame () {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    guessCount = 0;
    guessInput.value = "";
    resultMsg.innerText = "";
    guessCountDisplay.innerText = "0";
    submitBtn.disabled = false;
}

submitBtn.addEventListener("click", checkGuess);
newBtn.addEventListener("click", newGame);