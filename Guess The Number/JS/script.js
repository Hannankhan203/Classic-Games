const h1 = document.querySelector("h1");
const container = document.querySelector(".container");
const guessInput = document.querySelector(".guess-input");
const buttons = document.querySelector(".buttons");
const submitBtn = document.querySelector(".submit-guess")
const resetBtn = document.querySelector(".reset-btn")
const feedback = document.querySelector(".feedback");
const resultMsg = document.querySelector(".result-message");
const guessCountDisplay = document.querySelector(".guess-count");
const modeBtn1 = document.querySelector("#mode1");
const modeBtn2 = document.querySelector("#mode2");
const body = document.querySelector("body");
const range = document.querySelector(".range");
const guessText = document.querySelector(".guess-text");
const back = document.querySelector(".back");
const backLink = document.querySelector(".back-link");
modeBtn2.classList.add("toggle");


let randomNumber = Math.floor(Math.random() * 100) + 1;
let guessCount = 0;

let mode = "Light mode";

const darkMode = () => {
    modeBtn1.classList.add("toggle");
    modeBtn2.classList.remove("toggle");
    body.classList.add("dark-body");
    h1.classList.add("dark-layout", "dark-layout-2");
    submitBtn.classList.add("dark-layout", "dark-layout-2");
    resetBtn.classList.add("dark-layout", "dark-layout-2");
    guessInput.classList.add("dark-layout", "dark-layout-2");
    container.classList.add("dark-container");
    range.classList.add("dark-text");
    guessCountDisplay.classList.add("dark-text");
    guessText.classList.add("dark-text");
    backLink.classList.add("dark-layout");
    back.classList.add("dark-layout-2");
}

const lightMode = () => {
    modeBtn1.classList.remove("toggle");
    modeBtn2.classList.add("toggle");
    body.classList.remove("dark-body");
    h1.classList.remove("dark-layout", "dark-layout-2");
    submitBtn.classList.remove("dark-layout", "dark-layout-2");
    resetBtn.classList.remove("dark-layout", "dark-layout-2");
    guessInput.classList.remove("dark-layout", "dark-layout-2");
    container.classList.remove("dark-container");
    range.classList.remove("dark-text");
    guessCountDisplay.classList.remove("dark-text");
    guessText.classList.remove("dark-text");
    backLink.classList.remove("dark-layout");
    back.classList.remove("dark-layout-2");
}

const toggleMode = () => {
    if (mode === "Light mode") {
        mode = "Dark mode";
        darkMode();
    } else {
        mode = "Light mode";
        lightMode();
    }
}

modeBtn1.addEventListener("click", toggleMode);
modeBtn2.addEventListener("click", toggleMode);

const checkGuess = () => {
    const userGuess = Number(guessInput.value);
    guessCount++;

    if (userGuess === randomNumber) {
        resultMsg.innerText = `Congratulations! You guessed the right number! The number was ${randomNumber}`;
        resultMsg.classList.add("win");
        resultMsg.classList.remove("lose");
        submitBtn.disabled = true;
    } else if (userGuess > randomNumber) {
        resultMsg.innerText = "Too high! Try again.";
        resultMsg.classList.add("lose");
        resultMsg.classList.remove("win");
    } else if (userGuess < randomNumber) {
        resultMsg.innerText = "Too low! Try again.";
        resultMsg.classList.add("lose");
        resultMsg.classList.remove("win");
    }
    guessCountDisplay.innerText = guessCount;
}

const resetGame = () => {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    guessCount = 0;
    guessInput.value = "";
    resultMsg.innerText = "";
    guessCountDisplay.innerText = "0";
    submitBtn.disabled = false;
}

submitBtn.addEventListener("click", checkGuess);
resetBtn.addEventListener("click", resetGame);