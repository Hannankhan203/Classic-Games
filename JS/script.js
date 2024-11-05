// Calling elements from html file
let h1 = document.querySelector("h1");
let games = document.querySelectorAll(".game");
let modeBtn1 = document.querySelector("#mode1");
let modeBtn2 = document.querySelector("#mode2");
let body = document.querySelector("body");
modeBtn2.classList.add("toggle");

// Setting default mode to light mode
let mode = "Light mode";

// Dark mode function
const darkMode = () => {
  body.classList.add("body-dark-mode");
  body.classList.remove("body");
  games.forEach((game) => {
    game.classList.add("dark-mode-bg");
  });
  modeBtn1.classList.add("toggle");
  modeBtn2.classList.remove("toggle");
};

// Light mode function
const lightMode = () => {
  body.classList.remove("body-dark-mode");
  body.classList.add("body");
  h1.classList.remove("dark-mode-bg");
  games.forEach((game) => {
      game.classList.remove("dark-mode-bg");
    });
    modeBtn2.classList.add("toggle");
    modeBtn1.classList.remove("toggle");
};

// Mode toggle function
const toggleMode = () => {
  if (mode === "Light mode") {
    mode = "Dark mode";
    darkMode();
  } else {
    mode = "Light mode";
    lightMode();
  }
};

modeBtn1.addEventListener("click", toggleMode);
modeBtn2.addEventListener("click", toggleMode);
