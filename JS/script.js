// Calling HTML Elements

const body = document.querySelector("body");
const check = document.querySelector(".check");
const botn = document.querySelector(".botn");
const themeCheckbox = document.querySelector("#theme-checkbox");

// Default Mode

body.classList.add("light-mode");
check.classList.add("light-mode");
botn.classList.add("light-mode");

// Toggle Function

function toggleMode() {
  body.classList.toggle("dark-mode");
  check.classList.toggle("dark-mode");
  botn.classList.toggle("dark-mode");
}

themeCheckbox.addEventListener("click", toggleMode);