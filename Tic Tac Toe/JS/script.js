// Calling elements from HTML file
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let h1 = document.querySelector("h1");
let container = document.querySelector(".container");
let drawMsg = document.querySelector("#draw-msg");
let msgContDraw = document.querySelector(".msg-container-draw");
let playerOne = document.querySelector(".player-one");
let playerTwo = document.querySelector(".player-two");
let body = document.querySelector("body");
let modeBtn = document.querySelector("#mode");
let back = document.querySelector(".back");
let backLink = document.querySelector(".back-link");
let gameChange = document.querySelector(".change-game-container");
let change = document.querySelector(".change-game");
let changeLink = document.querySelector(".change-link");

playerTwo.classList.remove("turn");
gameChange.classList.add("hide");
resetBtn.classList.remove("reset-btn-2");


let mode = "Light mode";


const updatePlayerClasses = () => {
    if (mode === "Dark mode") {
        playerOne.classList.remove("turn"); // Clear light mode's turn highlighting
        playerTwo.classList.remove("turn"); // Clear light mode's turn highlighting
        
        if (turnO) {
            playerOne.classList.remove("dark-turn");
            playerTwo.classList.add("dark-turn");
        } else {
            playerOne.classList.add("dark-turn");
            playerTwo.classList.remove("dark-turn");
        }
    } else {
        playerOne.classList.remove("dark-turn"); // Clear dark mode's turn highlighting
        playerTwo.classList.remove("dark-turn"); // Clear dark mode's turn highlighting
        
        if (turnO) {
            playerOne.classList.add("turn");
            playerTwo.classList.remove("turn");
        } else {
            playerOne.classList.remove("turn");
            playerTwo.classList.add("turn");
        }
    }
}

const darkMode = () => {
    modeBtn.innerText = "Activate Light Mode!";
    boxes.forEach((box) => {
        box.classList.add("darkBox");
    });
    resetBtn.classList.add("darkLayout", "darkLayout2");
    newBtn.classList.add("darkLayout", "darkLayout2");
    msg.classList.add("darkLayout");
    h1.classList.add("darkLayout");
    drawMsg.classList.add("darkLayout");
    playerOne.classList.add("darkLayout");
    playerTwo.classList.add("darkLayout");
    body.classList.add("body-dark");
    modeBtn.classList.add("darkLayout", "darkLayout2");
    back.classList.add("darkLayout2");
    backLink.classList.add("darkLayout");
    change.classList.add("darkLayout2");
    changeLink.classList.add("darkLayout");
    updatePlayerClasses();
}

const lightMode = () => {
    modeBtn.innerText = "Activate Mode Mode!";
    boxes.forEach((box) => {
        box.classList.remove("darkBox");
    });
    resetBtn.classList.remove("darkLayout", "darkLayout2");
    newBtn.classList.remove("darkLayout", "darkLayout2");
    msg.classList.remove("darkLayout");
    h1.classList.remove("darkLayout");
    drawMsg.classList.remove("darkLayout");
    playerOne.classList.remove("darkLayout");
    playerTwo.classList.remove("darkLayout");
    body.classList.remove("body-dark");
    modeBtn.classList.remove("darkLayout", "darkLayout2");
    back.classList.remove("darkLayout2");
    backLink.classList.remove("darkLayout");
    change.classList.remove("darkLayout2");
    changeLink.classList.remove("darkLayout");
    updatePlayerClasses();
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


modeBtn.addEventListener("click", toggleMode);


// Setting who will play first
let turnO = true;

// patterns to check the winning scenario
const winPatterns = [
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6]
];

// Reset or new game fuction for button
const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    container.classList.remove("hide");
    h1.classList.remove("hide");
    resetBtn.classList.remove("hide");
    msgContDraw.classList.add("hide");
    playerTwo.classList.remove("turn");
    playerOne.classList.add("turn");
    back.classList.remove("hide");  
    gameChange.classList.add("hide");
    resetBtn.classList.remove("reset-btn-2");
    gameChange.classList.add("change-game-2");
    updatePlayerClasses();
};

// Clicking and alternating the turns then disabling the clicked buttons then checking the winner
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            box.style.color = "#3f91a5";
        } else {
            box.innerText = "X";
        }
        turnO = !turnO;
        updatePlayerClasses();

        box.disabled = true;

        checkWinner();
    });
});

// disabling boxes after the game is finished
let disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
        container.classList.add("hide");
        h1.classList.add("hide");
        resetBtn.classList.add("hide");
    };
};

// enabling boxes and removing their text
let enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    };
};

// making an arrow function to show the winner
const showWinner = (winner) => {
    msg.innerText = `Congratulations, winner is ${winner}`;
    msgContainer.classList.remove("hide");
    back.classList.add("hide");
    gameChange.classList.remove("hide");
    gameChange.classList.remove("change-game-2");
    disableBoxes();
};

// making an arrow function to make a draw scenario
const showDraw = () => {
    msgContDraw.classList.remove("hide");
    disableBoxes();
    resetBtn.classList.remove("hide");
    msgContainer.classList.add("hide");
    back.classList.add("hide");
}

// making an arrow function and using for of loop to check the winning patterns and to check the draw scenario as well
const checkWinner = () => {
    for(pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                playerOne.classList.add("turn");
            }
        };
        if ([...boxes].every(box => box.innerText != "")){
            showDraw();
            playerOne.classList.add("turn");
            resetBtn.classList.add("reset-btn-2");
            gameChange.classList.remove("hide");
        }
    };
};
// adding new and reset button using event listener
newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);


