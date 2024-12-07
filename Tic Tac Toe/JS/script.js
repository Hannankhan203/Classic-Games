// Calling HTML Elements

const body = document.querySelector("body");
const check = document.querySelector(".check");
const botn = document.querySelector(".botn");
const themeCheckbox = document.querySelector("#theme-checkbox");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector(".msg");
const mainContainer = document.querySelector(".main-container");
const boxes = document.querySelectorAll(".box");
const playerOne = document.querySelector(".player-1");
const playerTwo = document.querySelector(".player-2");
const drawMsg = document.querySelector(".draw-msg");
const newBtn = document.querySelector(".new-btn");
const backBtn = document.querySelector(".back-btn");
const backBtnLink = document.querySelector(".back-btn-link");
const resetBtn = document.querySelector(".reset-btn");

// Default Mode

body.classList.add("light-mode");
check.classList.add("light-mode");
botn.classList.add("light-mode");
boxes.forEach((box) => {
  box.classList.add("light-mode");
});
backBtn.classList.add("light-mode");
backBtnLink.classList.add("light-mode");
resetBtn.classList.add("light-mode");
newBtn.classList.add("light-mode");

function toggleMode() {
  body.classList.toggle("dark-mode");
  check.classList.toggle("dark-mode");
  botn.classList.toggle("dark-mode");
  boxes.forEach((box) => {
    box.classList.toggle("dark-mode");
  });
  backBtn.classList.toggle("dark-mode");
  backBtnLink.classList.toggle("dark-mode");
  resetBtn.classList.toggle("dark-mode");
  newBtn.classList.toggle("dark-mode");
}

themeCheckbox.addEventListener("click", toggleMode);

// Game Logic
let turnX = true;

const winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

playerTwo.classList.add("no-turn");

function updatePlayerClass() {
  if (turnX) {
    playerOne.classList.remove("no-turn");
    playerTwo.classList.add("no-turn");
  } else {
    playerOne.classList.add("no-turn");
    playerTwo.classList.remove("no-turn");
  }
}

function resetGame() {
  turnX = true;
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
  });
  msgContainer.classList.add("hidden");
  drawMsg.classList.add("hidden");
  mainContainer.classList.remove("hidden");
  backBtn.classList.remove("hidden");
  resetBtn.classList.remove("hidden");
  resetBtn.classList.remove("draw-reset-btn");
  resetBtn.classList.add("reset-btn");
  updatePlayerClass();
}

function disableBoxes() {
  boxes.forEach((box) => {
    box.disabled = true;
  });
}

function winner(winner) {
  msg.innerText = `Congratulations! winner is ${winner}`;
  msgContainer.classList.remove("hidden");
  backBtn.classList.add("hidden");
  mainContainer.classList.add("hidden");
  resetBtn.classList.add("hidden");
  disableBoxes();
}

function draw() {
  disableBoxes();
  drawMsg.classList.remove("hidden");
  mainContainer.classList.add("hidden");
  backBtn.classList.add("hidden");
  resetBtn.classList.add("draw-reset-btn");
  resetBtn.classList.remove("reset-btn");
}

function checkWinner() {
  for (const pattern of winningPatterns) {
    const [a, b, c] = pattern;
    const pos1Val = boxes[a].innerText;
    const pos2Val = boxes[b].innerText;
    const pos3Val = boxes[c].innerText;
    if (pos1Val && pos1Val === pos2Val && pos2Val === pos3Val) {
      winner(pos1Val);
      return;
    }
  }
  if ([...boxes].every((box) => box.innerText != "")) {
    draw();
  }
}

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText !== "") return;
    box.innerText = turnX ? "X" : "O";
    box.style.color = turnX ? "#3f91a5" : "#000";
    turnX = !turnX;
    box.disabled = true;
    updatePlayerClass();
    checkWinner();
  });
});

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
