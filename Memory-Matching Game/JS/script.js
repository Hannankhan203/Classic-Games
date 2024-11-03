const body = document.querySelector("body");
const h1 = document.querySelector("h1");
const mainContainer = document.querySelector(".main-container");
const gameInfo = document.querySelector(".game-info");
const infos = document.querySelectorAll(".info");
const gameContainer = document.querySelector(".game-container");
const fronts = document.querySelectorAll(".front");
const backs = document.querySelectorAll(".back");
const back = document.querySelector(".go-back");
let modeBtn1 = document.querySelector("#mode1");
let modeBtn2 = document.querySelector("#mode2");
const backLink = document.querySelector(".back-link");
let timeDisplay = document.querySelector("#timer");
let moveCounter = document.querySelector("#move-counter");
let winningMessage = document.querySelector("#winning-message");
let restartButton = document.querySelector("#restart-button");
const cards = document.querySelectorAll(".card");

let mode = "Light mode";

const darkMode = () => {
  body.classList.add("dark-body");
  h1.classList.add("dark-layout", "dark-layout-2");
  restartButton.classList.add("dark-layout", "dark-layout-2");
  backLink.classList.add("dark-layout");
  modeBtn1.classList.add("toggle");
  modeBtn2.classList.remove("toggle");
  back.classList.add("dark-layout-2");
  gameInfo.classList.add("dark-layout");
  fronts.forEach((front) => {
    front.classList.add("dark-layout-2");
  });
  backs.forEach((back) => {
    back.classList.add("dark-layout-3");
  });
  winningMessage.classList.add("dark-layout", "dark-layout-2");
};

const lightMode = () => {
  body.classList.remove("dark-body");
  h1.classList.remove("dark-layout", "dark-layout-2");
  restartButton.classList.remove("dark-layout", "dark-layout-2");
  backLink.classList.remove("dark-layout");
  modeBtn1.classList.remove("toggle");
  modeBtn2.classList.add("toggle");
  back.classList.remove("dark-layout-2");
  gameInfo.classList.remove("dark-layout");
  fronts.forEach((front) => {
    front.classList.remove("dark-layout-2");
  });
  backs.forEach((back) => {
    back.classList.remove("dark-layout-3");
  });
  winningMessage.classList.remove("dark-layout", "dark-layout-2");
};

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
};

modeBtn1.addEventListener("click", toggleMode);
modeBtn2.addEventListener("click", toggleMode);

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
  winningMessage.classList.remove("hidden");
}

restartButton.addEventListener("click", restartGame);

function restartGame() {
  matchedPairs = 0;
  moves = 0;
  moveCounter.textContent = moves;
  timeDisplay.textContent = "0:00";

  clearInterval(timerInterval);
  startTime = null;

  cards.forEach((card) => {
    card.classList.remove("is-flipped");
    card.addEventListener("click", flipCard);
    let randomPos = Math.floor(Math.random() * 6);
    card.style.order = randomPos;
  });

  winningMessage.classList.add("hidden");
}

(function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 6);
    card.style.order = randomPos;
  });
})();

cards.forEach((card) => card.addEventListener("click", flipCard));
