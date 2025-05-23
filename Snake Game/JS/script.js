// Calling all HTML Elements
const body = document.querySelector("body");
const themeCheckbox = document.querySelector("#theme-checkbox");
const check = document.querySelector(".check");
const botn = document.querySelector(".botn");
const gameBoard = document.querySelector(".game-board");
const score = document.querySelector(".score");
const highestScore = document.querySelector(".highest-score");
const upButton = document.querySelector(".up");
const downButton = document.querySelector(".down");
const leftButton = document.querySelector(".left");
const rightButton = document.querySelector(".right");
const gameOverScreen = document.querySelector(".game-over-screen");
const restartBtn = document.querySelector(".restart-btn");
const finalScore = document.querySelector(".final-score");
const gameStartScreen = document.querySelector(".game-start-screen");
const startBtn = document.querySelector(".start-btn");
const backBtn = document.querySelector(".back-btn");
const backBtnLink = document.querySelector(".back-btn-link");

// Adding Light Mode
body.classList.add("light-mode");
check.classList.add("light-mode");
botn.classList.add("light-mode");
gameBoard.classList.add("light-mode");
score.classList.add("light-mode");
highestScore.classList.add("light-mode");
gameOverScreen.classList.add("light-mode");
restartBtn.classList.add("light-mode");
gameStartScreen.classList.add("light-mode");
startBtn.classList.add("light-mode");
backBtn.classList.add("light-mode");
backBtnLink.classList.add("light-mode");

// Dark Mode Toggle Function
function toggleMode() {
  body.classList.toggle("dark-mode");
  check.classList.toggle("dark-mode");
  botn.classList.toggle("dark-mode");
  gameBoard.classList.toggle("dark-mode");
  score.classList.toggle("dark-mode");
  highestScore.classList.toggle("dark-mode");
  gameOverScreen.classList.toggle("dark-mode");
  restartBtn.classList.toggle("dark-mode");
  gameStartScreen.classList.toggle("dark-mode");
  startBtn.classList.toggle("dark-mode");
  backBtn.classList.toggle("dark-mode");
  backBtnLink.classList.toggle("dark-mode");
}

// Toggle Button Event
themeCheckbox.addEventListener("click", toggleMode);

// Main Game
// Declaring Variables
let snake = [{ x: 13, y: 13 }];
let direction = { x: 0, y: -1 };
let currentScore = 0;
let food = randomFoodPosition();
let highScore = localStorage.getItem("highest-score") || 0;
highestScore.innerHTML = `Highscore: ${highScore}`;

// Making Keyboard Buttons Functional
window.addEventListener("keydown", function (e) {
  const key = e.key;
  let newDirection;
  if (key === "ArrowUp") {
    newDirection = { x: 0, y: -1 };
  } else if (key === "ArrowDown") {
    newDirection = { x: 0, y: 1 };
  } else if (key === "ArrowLeft") {
    newDirection = { x: -1, y: 0 };
  } else if (key === "ArrowRight") {
    newDirection = { x: 1, y: 0 };
  }
  if (
    newDirection &&
    (newDirection.x !== -direction.x || newDirection.y !== -direction.y)
  ) {
    direction = newDirection;
  }
});

// Generating Food Randomly
function randomFoodPosition() {
  let newFoodPosition;
  do {
    newFoodPosition = {
      x: Math.floor(Math.random() * 25 + 1),
      y: Math.floor(Math.random() * 25 + 1),
    };
  } while (
    snake.some(
      (segment) =>
        segment.x === newFoodPosition.x && segment.y === newFoodPosition.y
    )
  );
  return newFoodPosition;
}

// Drawing Elements
function drawElement(position, className) {
  let element = document.createElement("div");
  element.style.gridRowStart = position.y;
  element.style.gridColumnStart = position.x;
  element.classList.add(className);
  gameBoard.appendChild(element);
}

// Drawing Game
function drawGame() {
  gameBoard.innerHTML = "";
  drawElement(food, "food");
  for (let i = 0; i < snake.length; i++) {
    let item = snake[i];
    if (i == 0) {
      drawElement(item, "head");
    } else {
      drawElement(item, "tail");
    }
  }
}

// Moving the Snake
function moveSnake() {
  gameStartScreen.style.display = "none";
  let newHead = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
  if (
    newHead.x < 1 ||
    newHead.x > 25 ||
    newHead.y < 1 ||
    newHead.y > 25 ||
    snake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)
  ) {
    gameOver();
    return;
  }

  snake.unshift(newHead);

  if (newHead.x === food.x && newHead.y === food.y) {
    food = randomFoodPosition();
    currentScore += 10;
    score.innerHTML = `Score: ${currentScore}`;
    if (currentScore > highScore) {
      highScore = currentScore;
      localStorage.setItem("highest-score", highScore);
      highestScore.innerHTML = `highscore ${highScore}`;
    }
  } else {
    snake.pop();
  }
}

// Reset Game
function resetGame() {
  snake = [{ x: 13, y: 13 }];
  direction = { x: 0, y: -1 };
  currentScore = 0;
  score.innerHTML = `Score: ${currentScore}`;
  // gameOverScreen.classList.add("hidden");
  gameOverScreen.style.display = "none";
  // finalScore.innerHTML = "";
  food = randomFoodPosition();
  clearInterval(gameInterval);
  gameInterval = setInterval(function () {
    drawGame();
    moveSnake();
  }, 300);
  
}

restartBtn.addEventListener("click", resetGame);

// Making the Game Loop
let gameInterval;
function startGame() {
  gameInterval = setInterval(function () {
    drawGame();
    moveSnake();
  }, 300);
}

startBtn.addEventListener("click", startGame);

// Game Over Function
function gameOver() {
  gameOverScreen.style.display = "flex";
  clearInterval(gameInterval);
  finalScore.innerHTML = currentScore;
}

// Controls for touch screen devices
upButton.addEventListener("click", () => {
  const newDirection = { x: 0, y: -1 };
  if (newDirection.x !== -direction.x || newDirection.y !== -direction.y) {
    direction = newDirection;
  }
});

downButton.addEventListener("click", () => {
  const newDirection = { x: 0, y: 1 };
  if (newDirection.x !== -direction.x || newDirection.y !== -direction.y) {
    direction = newDirection;
  }
});

leftButton.addEventListener("click", () => {
  const newDirection = { x: -1, y: 0 };
  if (newDirection.x !== -direction.x || newDirection.y !== -direction.y) {
    direction = newDirection;
  }
});

rightButton.addEventListener("click", () => {
  const newDirection = { x: 1, y: 0 };
  if (newDirection.x !== -direction.x || newDirection.y !== -direction.y) {
    direction = newDirection;
  }
});
