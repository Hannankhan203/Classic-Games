// Calling HTML Elements

const body = document.querySelector("body");
const themeCheckbox = document.querySelector("#theme-checkbox");
const check = document.querySelector(".check");
const botn = document.querySelector(".botn");
const mainGame = document.querySelector(".main-game");
const scrambleWord = document.querySelector("#scrambled-word");
const userInput = document.querySelector("#user-input");
const result = document.querySelector("#result");
const submitBtn = document.querySelector(".submit-btn");
const newBtn = document.querySelector(".new-btn");
const backBtn = document.querySelector(".back-btn");
const backBtnLink = document.querySelector(".back-btn-link");

// Default Mode

body.classList.add("light-mode");
check.classList.add("light-mode");
botn.classList.add("light-mode");
mainGame.classList.add("light-mode");
userInput.classList.add("light-mode");
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
  userInput.classList.toggle("dark-mode");
  submitBtn.classList.toggle("dark-mode");
  newBtn.classList.toggle("dark-mode");
  backBtn.classList.toggle("dark-mode");
  backBtnLink.classList.toggle("dark-mode");
}

themeCheckbox.addEventListener("click", toggleMode);

// Main Game

const words = [
  "javascript",
  "programming",
  "compiler",
  "keyboard",
  "hacking",
  "computer",
  "laptop",
  "development",
];
let currentWord = "";
let scramble = "";

function scrambledWord(word) {
  return word
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
}

function loadNewWord() {
  userInput.value = "";
  result.innerText = "";
  newBtn.classList.add("hidden");
  currentWord = words[Math.floor(Math.random() * words.length)];
  scramble = scrambledWord(currentWord);
  scrambleWord.textContent = scramble;
}

submitBtn.addEventListener("click", () => {
  const userAnswer = userInput.value.toLowerCase();
  if (userAnswer === currentWord) {
    result.innerText = `Correct!`;
    result.classList.add("win");
    result.classList.remove("lose");
    newBtn.classList.remove("hidden");
  } else {
    result.innerText = `Incorrect!`;
    result.classList.add("lose");
    result.classList.remove("win");
  }
});

newBtn.addEventListener("click", loadNewWord);

window.onload = loadNewWord;
