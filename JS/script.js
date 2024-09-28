// Calling elements from html file
let h1 = document.querySelector("h1");
let games = document.querySelectorAll(".game");
let modeBtn = document.querySelector("#mode");
let body = document.querySelector("body");

// Setting default mode to light mode
let mode = "Light mode";

// Dark mode function
const darkMode = () => {
    modeBtn.innerText = "Activate Light Mode!";
    body.classList.add("body-dark-mode");
    h1.classList.add("dark-mode-bg");
    modeBtn.classList.add("dark-mode-bg");
    games.forEach((game) => {
        game.classList.add("dark-mode-bg");
    });
}

// Light mode function
const lightMode = () => {
    modeBtn.innerText = "Activate Dark Mode!";
    body.classList.remove("body-dark-mode");
    h1.classList.remove("dark-mode-bg");
    modeBtn.classList.remove("dark-mode-bg");
    games.forEach((game) => {
        game.classList.remove("dark-mode-bg");
    });
}

// Mode toggle function
const toggleMode = () => {
    if (mode === "Light mode"){
        mode = "Dark mode";
        darkMode();
    } else {
        mode = "Light mode";
        lightMode();
    }
}

modeBtn.addEventListener("click", toggleMode);
