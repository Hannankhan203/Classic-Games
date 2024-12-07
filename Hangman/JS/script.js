// Calling HTML Elements

const body = document.querySelector("body");
const themeCheckbox = document.querySelector("#theme-checkbox");
const check = document.querySelector(".check");
const botn = document.querySelector(".botn");
const categoryBtns = document.querySelectorAll(".category-btn");
const gameContainer = document.querySelector(".game-container");
const guessBox = document.querySelector(".guess-box");
const consequenceBox = document.querySelector(".consequence-box");
const lives = document.querySelectorAll(".life");
const life1 = document.querySelector(".life1");
const life2 = document.querySelector(".life2");
const life3 = document.querySelector(".life3");
const life4 = document.querySelector(".life4");
const life5 = document.querySelector(".life5");
const life6 = document.querySelector(".life6");
const keyboard = document.querySelector(".keyboard");
const endMsg = document.querySelector(".end-msg");
const resetBtn = document.querySelector(".reset-btn");
const backBtn = document.querySelector(".back-btn");
const backBtnLink = document.querySelector(".back-btn-link");

// Default Mode

body.classList.add("light-mode");
check.classList.add("light-mode");
botn.classList.add("light-mode");
categoryBtns.forEach((categoryBtn) => {
  categoryBtn.classList.add("light-mode");
});
guessBox.classList.add("light-mode");
consequenceBox.classList.add("light-mode");
keyboard.classList.add("light-mode");
resetBtn.classList.add("light-mode");
backBtn.classList.add("light-mode");
backBtnLink.classList.add("light-mode");

// Toggle Mode

function toggleMode() {
  body.classList.toggle("dark-mode");
  check.classList.toggle("dark-mode");
  botn.classList.toggle("dark-mode");
  categoryBtns.forEach((categoryBtn) => {
    categoryBtn.classList.toggle("dark-mode");
  });
  guessBox.classList.toggle("dark-mode");
  consequenceBox.classList.toggle("dark-mode");
  keyboard.classList.toggle("dark-mode");
  resetBtn.classList.toggle("dark-mode");
  backBtn.classList.toggle("dark-mode");
  backBtnLink.classList.toggle("dark-mode");
  keyboard.querySelectorAll(".key").forEach((key) => {
    key.classList.toggle("dark-mode");
  });
}

themeCheckbox.addEventListener("click", toggleMode);

const fruits = ["apple", "banana", "grape", "mango", "orange"];
const animals = ["elephant", "tiger", "lion", "giraffe", "monkey"];
const countries = ["brazil", "france", "germany", "canada", "japan"];

let chosenWord = "";
let guessWord = [];
let attemptsLeft = 6;
guessBox.innerText = `_ `;

function startGame(category) {
  let wordArray = [];
  if (category === "fruits") {
    wordArray = fruits;
  } else if (category === "animals") {
    wordArray = animals;
  } else if (category === "countries") {
    wordArray = countries;
  }
  guessBox.textContent = `_ `.repeat(chosenWord.length).trim();
  chosenWord =
    wordArray[Math.floor(Math.random() * wordArray.length)].toUpperCase();
  guessWord = Array(chosenWord.length).fill("_");
  attemptsLeft = 6;
  categoryBtns.forEach((categoryBtn) => {
    categoryBtn.classList.add("hidden");
  });
  guessBox.textContent = guessWord.join(" ");
  gameContainer.classList.remove("hidden");
  createKeyboard();

  lives.forEach((life) => {
    life.classList.remove("lost-life");
  });
}

function createKeyboard() {
  keyboard.innerHTML = "";
  const isDarkMode = body.classList.contains("dark-mode");
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach((letter) => {
    const button = document.createElement("button");
    button.textContent = letter;
    button.classList.add("key");
    button.classList.add(isDarkMode ? "dark-mode" : "light-mode");
    button.onclick = () => handleGuess(letter, button);
    keyboard.appendChild(button);
  });
  keyboard.querySelectorAll(".key").forEach((key) => {
    key.classList.add("light-mode");
  });
}

function handleGuess(letter, buttonKeys) {
  buttonKeys.disabled = true;
  buttonKeys.style.transform = "none";
  buttonKeys.style.cursor = "not-allowed";
  if (chosenWord.includes(letter)) {
    for (let i = 0; i < chosenWord.length; i++) {
      if (chosenWord[i] === letter) {
        guessWord[i] = letter;
      }
    }
    guessBox.textContent = guessWord.join(" ");
    checkWin();
  } else {
    attemptsLeft--;
    if (attemptsLeft === 5) {
      life6.classList.add("lost-life");
    } else if (attemptsLeft === 4) {
      life5.classList.add("lost-life");
    } else if (attemptsLeft === 3) {
      life4.classList.add("lost-life");
    } else if (attemptsLeft === 2) {
      life3.classList.add("lost-life");
    } else if (attemptsLeft === 1) {
      life2.classList.add("lost-life");
    } else if (attemptsLeft === 0) {
      life1.classList.add("lost-life");
    }
    checkLose();
  }
}

function checkWin() {
  if (!guessWord.includes("_")) {
    endGame(true);
  }
}

function checkLose() {
  if (attemptsLeft === 0) {
    endGame(false);
  }
}

function endGame(won) {
  gameContainer.classList.add("hidden");
  endMsg.classList.remove("hidden");
  if (won) {
    endMsg.textContent = `Congratulations! Your guess was right! The word was "${chosenWord}"! Play again.`;
  } else {
    endMsg.textContent = `You guessed the wrong word! The correct word was "${chosenWord}". Try again.`;
  }
}

function resetGame() {
  categoryBtns.forEach((categoryBtn) => {
    categoryBtn.classList.remove("hidden");
  });
  gameContainer.classList.add("hidden");
  endMsg.classList.add("hidden");
  enableOptionsButton();
  keyboard.innerHTML = "";
  guessBox.textContent = "";
}

resetBtn.addEventListener("click", resetGame);

function disableOptionsBtn() {
  categoryBtns.forEach((categoryBtn) => {
    categoryBtn.disabled = true;
    buttonKeys.style.transform = "none";
    buttonKeys.style.cursor = "not-allowed";
  });
}

function enableOptionsButton() {
  categoryBtns.forEach((categoryBtn) => {
    categoryBtn.disabled = false;
    buttonKeys.style.transform = "";
    buttonKeys.style.cursor = "pointer";
  });
}
