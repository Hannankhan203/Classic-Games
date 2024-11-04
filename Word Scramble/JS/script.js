const body = document.querySelector("body");
const h1 = document.querySelector("h1");
const container = document.querySelector(".container");
const scrambledWord = document.querySelector(".scrambled-word");
const userInput = document.querySelector(".user-input");
const submitBtn = document.querySelector(".submit-btn");
const result = document.querySelector(".result");
const newGame = document.querySelector(".new-game");
const modeBtn1 = document.querySelector("#mode1");
const modeBtn2 = document.querySelector("#mode2");
const back = document.querySelector(".back");
const backLink = document.querySelector(".back-link");
modeBtn2.classList.add("toggle");

const words = ["javascript", "programming", "compiler", "keyboard", "hacking", "computer", "laptop", "development"];
let currentWord = "";
let scramble = "";

function scrambleWord(word) {
    return word.split('').sort(() => Math.random() - 0.5).join('');
}

function loadNewWord() {
    userInput.value = '';
    result.innerText = '';
    newGame.classList.add("hide")

    currentWord = words[Math.floor(Math.random() * words.length)];
    scramble = scrambleWord(currentWord);
    scrambledWord.textContent = scramble;
}

submitBtn.addEventListener('click', () => {
    const userAnswer = userInput.value.toLowerCase();

    if (userAnswer === currentWord) {
        result.innerText = 'Correct!';
        result.classList.add("win");
        result.classList.remove("lose");
        newGame.classList.remove("hide")
    } else {
        result.innerText = 'Try Again!';
        result.classList.add("lose");
        result.classList.remove("win");
    }
});

// Event listener for loading the next word
newGame.addEventListener('click', loadNewWord);

// Load the first word when the page loads
window.onload = loadNewWord;
  
let mode = "Light mode";

const darkMode = () => {
    modeBtn1.classList.add("toggle");
    modeBtn2.classList.remove("toggle");
    h1.classList.add("dark-layout", "dark-layout-2");
    submitBtn.classList.add("dark-layout", "dark-layout-2");
    newGame.classList.add("dark-layout", "dark-layout-2");
    userInput.classList.add("dark-layout", "dark-layout-2");
    container.classList.add("dark-container");
    scrambledWord.classList.add("dark-scramble-result");
    body.classList.add("dark-body");
    backLink.classList.add("dark-layout");
    back.classList.add("dark-layout-2");
}

const lightMode = () => {
    modeBtn1.classList.remove("toggle");
    modeBtn2.classList.add("toggle");
    h1.classList.remove("dark-layout", "dark-layout-2");
    submitBtn.classList.remove("dark-layout", "dark-layout-2");
    newGame.classList.remove("dark-layout", "dark-layout-2");
    userInput.classList.remove("dark-layout", "dark-layout-2");
    container.classList.remove("dark-container");
    scrambledWord.classList.remove("dark-scramble-result");
    body.classList.remove("dark-body");
    backLink.classList.remove("dark-layout");
    back.classList.remove("dark-layout-2");
}


const toggleMode = () => {
    if (mode === "Light mode") {
        mode = "Dark mode";
        darkMode();
        updatePlayerClasses();
    } else {
        mode = "Light mode";
        lightMode();
        updatePlayerClasses();
    }
    updatePlayerClasses();
}


modeBtn1.addEventListener("click", toggleMode);
modeBtn2.addEventListener("click", toggleMode);
