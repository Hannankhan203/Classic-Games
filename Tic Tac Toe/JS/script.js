// Selecting necessary elements from the HTML
const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset-btn");
const newBtn = document.querySelector("#new-btn");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");
const h1 = document.querySelector("h1");
const container = document.querySelector(".container");
const drawMsg = document.querySelector("#draw-msg");
const msgContDraw = document.querySelector(".msg-container-draw");
const playerOne = document.querySelector(".player-one");
const playerTwo = document.querySelector(".player-two");
const body = document.querySelector("body");
const themeCheckbox = document.querySelector("#theme-checkbox");
const back = document.querySelector(".back");
const check = document.querySelector(".check");
const botn = document.querySelector(".botn");

// Initial setup: light mode
body.classList.add("light-mode");
resetBtn.classList.add("light-mode");
back.classList.add("light-mode");
boxes.forEach((box) => {
    box.classList.add("light-mode");
});
botn.classList.add("light-mode");
check.classList.add("light-mode");
newBtn.classList.add("light-mode");


// Toggle between light mode and dark mode
function toggleMode() {
    body.classList.toggle("dark-mode");
    resetBtn.classList.toggle("dark-mode");
    back.classList.toggle("dark-mode");
    boxes.forEach((box) => {
        box.classList.toggle("dark-mode");
    });
    playerOne.classList.toggle("dark-mode");
    playerTwo.classList.toggle("dark-mode");
    h1.classList.toggle("dark-mode");
    msgContainer.classList.toggle("dark-mode");
    msgContDraw.classList.toggle("dark-mode");
    check.classList.toggle("dark-mode");
    botn.classList.toggle("dark-mode");
newBtn.classList.toggle("dark-mode");

}

// Add event listener for theme toggle
themeCheckbox.addEventListener("click", toggleMode);

// Game logic
let turnO = true; // Player O starts

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

const updatePlayerClasses = () => {
    playerOne.classList.toggle("turn", !turnO);
    playerTwo.classList.toggle("turn", turnO);
};

const resetGame = () => {
    turnO = true;
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
    });
    msgContainer.classList.add("hide");
    msgContDraw.classList.add("hide");
    container.classList.remove("hide");
    back.classList.remove("hide");
    playerOne.classList.add("turn");
    playerTwo.classList.remove("turn");
    h1.classList.remove("hide");
    resetBtn.classList.remove("hide");
    updatePlayerClasses();
};

const disableBoxes = () => {
    boxes.forEach((box) => (box.disabled = true));
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, winner is ${winner}`;
    msgContainer.classList.remove("hide");
    back.classList.add("hide");
    disableBoxes();
    container.classList.add("hide");
    h1.classList.add("hide");
    resetBtn.classList.add("hide");
};

const showDraw = () => {
    disableBoxes();
};

const checkWinner = () => {
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        const pos1Val = boxes[a].innerText;
        const pos2Val = boxes[b].innerText;
        const pos3Val = boxes[c].innerText;

        if (pos1Val && pos1Val === pos2Val && pos2Val === pos3Val) {
            showWinner(pos1Val);
            return;
        }
    }
    if ([...boxes].every((box) => box.innerText)) {
        showDraw();
    }
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        box.innerText = turnO ? "O" : "X";
        box.style.color = turnO ? "#3f91a5" : "#000";
        box.disabled = true;
        turnO = !turnO;
        updatePlayerClasses();
        checkWinner();
    });
});

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);