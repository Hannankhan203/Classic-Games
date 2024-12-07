// Callin HTML Elements

const body = document.querySelector("body");
const check = document.querySelector(".check");
const botn = document.querySelector(".botn");
const themeCheckbox = document.querySelector("#theme-checkbox");
const frontCards = document.querySelectorAll(".front");
const backCards = document.querySelectorAll(".back");
const winningMsg = document.querySelector(".winning-msg");
const resetBtn = document.querySelector(".reset-btn");
const backBtn = document.querySelector(".back-btn");
const backBtnLink = document.querySelector(".back-btn-link");
let timeDisplay = document.querySelector(".timer");
let moveCounter = document.querySelector(".move-counter");
let cards = document.querySelectorAll(".card");

// Default Mode

body.classList.add("light-mode");
check.classList.add("light-mode");
botn.classList.add("light-mode");
frontCards.forEach((frontCard) => {
  frontCard.classList.add("light-mode");
});
backCards.forEach((backCard) => {
  backCard.classList.add("light-mode");
});
resetBtn.classList.add("light-mode");
backBtn.classList.add("light-mode");
backBtnLink.classList.add("light-mode");
winningMsg.classList.add("light-mode");

// Toggle Mode

function toggleMode() {
  body.classList.toggle("dark-mode");
  check.classList.toggle("dark-mode");
  botn.classList.toggle("dark-mode");
  frontCards.forEach((frontCard) => {
    frontCard.classList.toggle("dark-mode");
  });
  backCards.forEach((backCard) => {
    backCard.classList.toggle("dark-mode");
  });
  resetBtn.classList.toggle("dark-mode");
  backBtn.classList.toggle("dark-mode");
  backBtnLink.classList.toggle("dark-mode");
  winningMsg.classList.toggle("dark-mode");
}

themeCheckbox.addEventListener("click", toggleMode);

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let moves = 0;
let matchedPairs = 0;
let totalPairs = 8;
let timerInterval;
let startTime;

function startTimer() {
  startTime = Date.now();
  timerInterval = setInterval(() => {
    const elapsedTime = Date.now() - startTime;
    const seconds = Math.floor(elapsedTime / 1000) % 60;
    const minutes = Math.floor(elapsedTime / 1000 / 60);
    timeDisplay.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }, 1000);
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  if (moves === 0 && !startTime) startTimer();

  this.classList.add("is-flipped");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  moves++;
  moveCounter.textContent = moves;

  checkForMatch();
}

function checkForMatch() {
  const isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  isMatch ? disableCards() : unflipCards();

  if (isMatch) {
    matchedPairs++;
    if (matchedPairs === totalPairs) {
      setTimeout(showWinningMessage, 1000);
    }
  }
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("is-flipped");
    secondCard.classList.remove("is-flipped");
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function showWinningMessage() {
  clearInterval(timerInterval);
  winningMsg.classList.remove("hidden");
}

resetBtn.addEventListener("click", restartGame);

function restartGame() {
  matchedPairs = 0;
  moves = 0;
  hasFlippedCard = false;
  lockBoard = false;
  firstCard = null;
  secondCard = null;
  moveCounter.textContent = moves;
  timeDisplay.textContent = "0:00";

  clearInterval(timerInterval);
  startTime = null;

  cards.forEach((card) => {
    card.classList.remove("is-flipped");
    card.addEventListener("click", flipCard);
    let randomPos = Math.floor(Math.random() * cards.length);
    card.style.order = randomPos;
  });

  winningMsg.classList.add("hidden");
}

(function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * cards.length);
    card.style.order = randomPos;
  });
})();

cards.forEach((card) => card.addEventListener("click", flipCard));
