const categoryBtns = document.querySelectorAll(".category-btn");
const resetBtn = document.querySelector(".reset-btn");
const h1 = document.querySelector("h1");
const consequenceBox = document.querySelector(".consequence-box");
const keyboardKeys = document.querySelector(".keyboard");
const endMsg = document.querySelector(".end-message");
const body = document.querySelector("body");
let modeBtn1 = document.querySelector("#mode1");
let modeBtn2 = document.querySelector("#mode2");
const back = document.querySelector(".back");
const backLink = document.querySelector(".back-link");
const guessedContainer = document.querySelector(".guessed-container");
const categorySelection = document.querySelector(".category-selection");
const gameContainer = document.querySelector(".game-container");
const remainingAttempts = document.querySelector(".attempts-left");
const catBtns = document.querySelectorAll(".cat-btn");
modeBtn2.classList.add("toggle");


let mode = "Light mode";

const darkMode = () => {
    modeBtn1.classList.add("toggle");
    modeBtn2.classList.remove("toggle");
    resetBtn.classList.add("dark-layout", "dark-layout-2");
    body.classList.add("body-dark");
    h1.classList.add("dark-layout");
    back.classList.add("dark-layout-2");
    backLink.classList.add("dark-layout");
    consequenceBox.classList.add("dark-border", "dark-layout");
    catBtns.forEach((catBtn) => {
        catBtn.classList.add("dark-layout", "dark-layout-2");
    });
    guessedContainer.classList.add("dark-layout", "dark-layout-2");
    endMsg.classList.add("dark-layout", "dark-layout-2");
    keyboardKeys.querySelectorAll(".key").forEach((key) => {
        key.classList.add("dark-layout", "dark-layout-2");
    });
}

const lightMode = () => {
    modeBtn2.classList.add("toggle");
    modeBtn1.classList.remove("toggle");
    resetBtn.classList.remove("dark-layout", "dark-layout-2");
    body.classList.remove("body-dark");
    h1.classList.remove("dark-layout");
    back.classList.remove("dark-layout-2");
    backLink.classList.remove("dark-layout");
    consequenceBox.classList.remove("dark-border", "dark-layout");
    catBtns.forEach((catBtn) => {
        catBtn.classList.remove("dark-layout", "dark-layout-2");
    });
    guessedContainer.classList.remove("dark-layout", "dark-layout-2");
    endMsg.classList.remove("dark-layout", "dark-layout-2");
    keyboardKeys.querySelectorAll(".key").forEach((key) => {
        key.classList.remove("dark-layout", "dark-layout-2");
    });
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

const fruits = ['apple', 'banana', 'grape', 'mango', 'orange'];
const animals = ['elephant', 'tiger', 'lion', 'giraffe', 'monkey'];
const countries = ['brazil', 'france', 'germany', 'canada', 'japan'];


consequenceBox.classList.add("hidden");
guessedContainer.classList.add("hidden");
endMsg.classList.add("hidden");

let chosenWord = '';
let guessedWord = [];
let attemptsLeft = 6;
guessedContainer.innerText = "_ _ _ _ _ _ _ _";

function startGame(category) {
    let wordArray = [];
    if (category === 'fruits') {
        wordArray = fruits;
    } else if (category === 'animals') {
        wordArray = animals;
    } else if (category === 'countries') {
        wordArray = countries;
    }

    guessedContainer.innerText = "_ _ _ _ _ _ _ _";


    chosenWord = wordArray[Math.floor(Math.random() * wordArray.length)].toUpperCase();
    guessedWord = Array(chosenWord.length).fill('_');
    attemptsLeft = 6;

    categorySelection.classList.add('hidden');
    gameContainer.classList.remove('hidden');
    remainingAttempts.textContent = attemptsLeft;
    document.getElementsByClassName('guessed-letter').textContent = guessedWord.join(' ');
    consequenceBox.classList.remove("hidden");
    guessedContainer.classList.remove("hidden");
    endMsg.classList.add("hidden");

    disableOptionButtons();
    createKeyboard();
}

function createKeyboard() {
    const keyboard = document.getElementById('keyboard');
    keyboard.innerHTML = '';
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    
    letters.forEach(letter => {
        const buttonKeys = document.createElement('button');
        buttonKeys.textContent = letter;
        buttonKeys.classList.add('key');
        buttonKeys.onclick = () => handleGuess(letter, buttonKeys);
        keyboard.appendChild(buttonKeys);
    });
    if (mode === "Dark mode") {
        keyboardKeys.querySelectorAll(".key").forEach((key) => {
            key.classList.add("dark-layout", "dark-layout-2");
        });
    } else {
        keyboardKeys.querySelectorAll(".key").forEach((key) => {
            key.classList.remove("dark-layout", "dark-layout-2");
        });
    }
    endMsg.classList.add('hidden');
}

function handleGuess(letter, buttonKeys) {
    buttonKeys.disabled = true;
    buttonKeys.classList.add('disabled');
    buttonKeys.style.transform = "none";
    buttonKeys.style.cursor = "not-allowed";

    
    if (chosenWord.includes(letter)) {
        for (let i = 0; i < chosenWord.length; i++) {
            if (chosenWord[i] === letter) {
                guessedWord[i] = letter;
            }
        }
        document.getElementById('guessed-container').textContent = guessedWord.join(' ');
        checkWin();
    } else {
        attemptsLeft--;
        document.getElementById('attempts-left').textContent = attemptsLeft;
        checkLose();
    }
}

function checkWin() {
    if (!guessedWord.includes('_')) {
        endGame(true);
    }
}

function checkLose() {
    if (attemptsLeft === 0) {
        endGame(false);
    }
}

function endGame(won) {
    document.getElementById('game-container').classList.add('hidden');
    endMsg.classList.remove("hidden");
    
    if (won) {
        endMsg.textContent = `Congratulations! Your guess was right! The word was "${chosenWord}"! Play again.`;
    } else {
        endMsg.textContent = `You guessed the wrong word! The correct word was "${chosenWord}". Try again.`;
    }
}

function resetGame() {
    document.getElementById('category-selection').classList.remove('hidden');
    document.getElementById('game-container').classList.add('hidden');
    document.getElementById('end-message').classList.add('hidden');
    enableOptionButtons();
    consequenceBox.classList.add("hidden");
    guessedContainer.classList.add("hidden");
    endMsg.classList.add('hidden');
    buttonKeys.style.transform = "";
    buttonKeys.style.cursor = "none";
}

resetBtn.addEventListener("click", resetGame);

function disableOptionButtons() {
    const buttons = document.querySelectorAll('.category-btn');
    buttons.forEach(button => {
        button.disabled = true;
        button.classList.add('disabled');
        button.style.transform = "none";
    });
}

function enableOptionButtons() {
    const buttons = document.querySelectorAll('.category-btn');
    buttons.forEach(button => {
        button.disabled = false;
        button.classList.remove('disabled');
        button.style.transform = "";
    });
}